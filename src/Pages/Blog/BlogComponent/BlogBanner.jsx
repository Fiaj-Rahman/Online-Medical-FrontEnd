import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const BlogBanner = () => {
    const [latestBlogs, setLatestBlogs] = useState([]); // State to store the latest blogs
    const [randomBlog, setRandomBlog] = useState(null); // State to store the random blog for the background
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch the blog posts from the API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/blog');
                const data = await response.json();

                // Sort blogs by createdDate and createdTime
                const sortedBlogs = data
                    .sort((a, b) => {
                        const dateA = new Date(`${a.createdDate} ${a.createdTime}`);
                        const dateB = new Date(`${b.createdDate} ${b.createdTime}`);
                        return dateB - dateA; // Sort descending by date and time
                    })
                    .slice(0, 3); // Get the top 3 latest blogs

                // Randomly select a blog for the background
                const randomIndex = Math.floor(Math.random() * sortedBlogs.length);
                setRandomBlog(sortedBlogs[randomIndex]); // Set the random blog for the background

                setLatestBlogs(sortedBlogs); // Set the latest blogs in the state
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchBlogs(); // Call the function to fetch data
    }, []);

    // Function to truncate text to 10 words
    const truncateDescription = (description, wordLimit = 10) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...'; // Append '...' if description exceeds word limit
        }
        return description;
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 p-3">
            {/* Left side - Background image with text (taking 70% width) */}
            {randomBlog && (
                <div
                    className="w-full md:w-[70%] min-h-[400px] md:min-h-screen bg-gray-200 rounded-lg shadow-lg bg-cover bg-center relative mb-4 md:mb-0"
                    style={{
                        backgroundImage: `url(${randomBlog.images[0]})`, // Use the random blog's first image as background
                        backgroundPosition: 'center', // Ensure the background stays centered
                        backgroundSize: 'cover', // Ensure the image covers the whole area
                    }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-white text-center px-6 md:px-12">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                {randomBlog.title} {/* Random blog's title */}
                            </h2>
                            <p className="text-base md:text-lg max-w-lg md:max-w-2xl mx-auto">
                                {randomBlog.description} {/* Random blog's description */}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Right side - Latest Blogs (taking 30% width) */}
            <div className="w-full md:w-[30%] md:ml-8">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Latest Blogs</h3>
                <div className="space-y-6">
                    {latestBlogs.map((blog) => (
                        <div key={blog._id} className="flex flex-col md:flex-row items-start bg-white p-4 md:p-6 rounded-lg shadow-xl hover:bg-gray-100 transition-all">
                            {/* Blog Title and Description */}
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">{blog.title}</h4>
                                <p className="text-gray-600 text-sm md:text-base mb-2">
                                    {truncateDescription(blog.description)} {/* Truncate to 10 words */}
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm mb-2">
                                    By <span className="font-medium">{blog.userName}</span> | {blog.createdDate} {blog.createdTime}
                                </p>
                                {/* "Read More" link */}
                                <Link
                                    to={`/blog/${blog._id}`} // Assuming you're using the blog ID to generate the URL
                                    className="text-blue-500 text-sm font-medium hover:underline"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogBanner;
