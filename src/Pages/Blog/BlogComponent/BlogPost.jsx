import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]); // State to store all blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State to store filtered blogs
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [selectedCategory, setSelectedCategory] = useState("All"); // For category filtering
  const [sortOrder, setSortOrder] = useState("date"); // For sorting by date or views
  const [viewAll, setViewAll] = useState(false); // Track whether "View All" was clicked
  const [loading, setLoading] = useState(true); // Loading state

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const blogsPerPage = 8; // Number of blogs per page

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/blog");
        const data = await response.json();

        setBlogs(data); // Set all blogs data
        setFilteredBlogs(data); // Set filtered blogs data
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchBlogs(); // Fetch data when component mounts
  }, []);

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterBlogs(query, selectedCategory, sortOrder);
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterBlogs(searchQuery, category, sortOrder);
  };

  // Handle sorting selection
  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortOrder(sortValue);
    filterBlogs(searchQuery, selectedCategory, sortValue);
  };

  // Filter and sort blogs based on search query, category, and sort order
  const filterBlogs = (searchQuery, category, sortOrder) => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery) ||
        blog.description.toLowerCase().includes(searchQuery);

      const matchesCategory =
        category === "All" || blog.category === category;

      return matchesSearch && matchesCategory;
    });

    // Sorting the blogs based on the selected sort option
    const sortedBlogs = filtered.sort((a, b) => {
      if (sortOrder === "date") {
        return new Date(b.createdDate) - new Date(a.createdDate); // Sort by date descending
      } else if (sortOrder === "views") {
        return b.views - a.views; // Sort by views descending
      }
      return 0; // No sorting if sortOrder is not set
    });

    setFilteredBlogs(sortedBlogs);
  };

  // Handle "View All" button click
  const handleViewAll = () => {
    setViewAll(true); // Set to true when "View All" is clicked
  };

  // Get unique categories for dropdown options
  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  // Pagination logic: Determine the blogs to show on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <section className="py-6 sm:py-12 bg-gray-100 text-gray-800">
      <div className="container p-6 mx-auto space-y-8">
        {/* Search, Sorting, and Category Filter */}
        <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 md:space-y-0">
          {/* View Sorting */}
          <div className="flex space-x-4 w-full md:w-auto">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-lg w-full md:w-48"
            >
              <option value="date">Sort by Date</option>
              <option value="views">Sort by Views</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center space-x-4 w-full md:w-96">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="ml-auto w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-lg w-full md:w-48"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Map through the filtered blog data and render each post dynamically */}
          {currentBlogs.map((blog) => (
            <article key={blog._id} className="flex flex-col bg-gray-200">
              <Link
                to={`/blog/${blog._id}`} // Use Link to navigate to the detailed blog page
                className="relative block"
                aria-label={blog.title}
              >
                <img
                  alt={blog.title}
                  className="object-cover w-full h-52 bg-gray-500"
                  src={blog.images[0]} // Assuming the first image is the blog's cover image
                />
              </Link>
              <div className="flex flex-col flex-1 p-6">
                <Link
                  to={`/blog/${blog._id}`} // Use Link for the category and title to navigate to the blog
                  className="text-xs tracking-wider uppercase hover:underline text-violet-400"
                >
                  {blog.category}
                </Link>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">{blog.description}</p>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                  {/* Created Date */}
                  <span className="flex items-center space-x-1">
                    <i className="far fa-calendar-alt text-gray-500"></i> {/* Optional: Calendar icon */}
                    <span>{new Date(blog.createdDate).toLocaleDateString()}</span> {/* Format the date */}
                  </span>

                  {/* User Info */}
                  <div className="flex items-center space-x-2">
                    {/* User Image */}
                    <img
                      src={blog.userImage}
                      alt={blog.userName}
                      className="w-6 h-6 rounded-full object-cover" // Rounded user image
                    />
                    <span className="font-medium text-gray-600">{blog.userName}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${blog._id}`} // Link to blog details
                  className="mt-4 text-sm text-violet-400 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} rounded-md`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
