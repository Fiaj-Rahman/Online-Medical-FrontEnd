import React, { useState } from "react";

// Assuming you have the blog data in a `Blog.json` file in the public directory or a local import.
import blogData from './../../../Component/FileJson/Blog.json'; // Adjust the path if necessary

const BlogPost = () => {
  const [blogs, setBlogs] = useState(blogData); // Store all blog data
  const [filteredBlogs, setFilteredBlogs] = useState(blogData); // Store filtered blog data
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [selectedCategory, setSelectedCategory] = useState("All"); // For category filtering
  const [sortOrder, setSortOrder] = useState("date"); // For sorting by date or views
  const [viewAll, setViewAll] = useState(false); // Track whether "View All" was clicked

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
    const filtered = blogData.filter((blog) => {
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
        return new Date(b.date) - new Date(a.date); // Sort by date descending
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
  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

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
          {filteredBlogs.slice(0, viewAll ? filteredBlogs.length : 8).map((blog) => (
            <article key={blog.id} className="flex flex-col bg-gray-200">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label={blog.title}
              >
                <img
                  alt={blog.title}
                  className="object-cover w-full h-52 bg-gray-500"
                  src={blog.image}
                />
              </a>
              <div className="flex flex-col flex-1 p-6">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  aria-label={blog.title}
                ></a>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs tracking-wider uppercase hover:underline text-violet-400"
                >
                  {blog.category}
                </a>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.description}
                </p>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
                  <span>{blog.date}</span>
                  <span>{blog.views} views</span>
                </div>
                <a
                  href="#"
                  className="mt-4 text-sm text-violet-400 hover:underline"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Show 'View All' button if there are more than 8 blogs */}
        {!viewAll && filteredBlogs.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleViewAll}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPost;
