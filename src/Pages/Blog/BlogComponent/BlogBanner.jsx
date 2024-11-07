import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import blogData from './../../../Component/FileJson/Blog.json'; // Assuming your blog.json file is in the same directory.

const BlogBanner = () => {
    // Sorting the blogs by date and selecting the latest 3 blogs
    const latestBlogs = blogData
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by latest date first
        .slice(0, 3); // Get the top 3 latest blogs

    // Function to truncate text to 10 words
    const truncateDescription = (description, wordLimit = 10) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...'; // Append '...' if description exceeds word limit
        }
        return description;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 p-3">
            {/* Left side - Background image with text (taking 70% width) */}
            <div
                className="w-full md:w-[70%] min-h-[400px] md:min-h-screen bg-gray-200 rounded-lg shadow-lg bg-cover bg-center relative mb-4 md:mb-0"
                style={{
                    backgroundImage: 'url(./blogBanner.jpg)', // Replace with your background image URL
                    backgroundPosition: 'center', // Ensures the background stays centered
                    backgroundSize: 'cover', // Ensures the image covers the whole area
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-6 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Online Medical Treatments</h2>
                        <p className="text-base md:text-lg max-w-lg md:max-w-2xl mx-auto">
                            Discover various types of online medical treatments that can help you stay healthy. Get expert advice from professionals and find the best solutions for your health needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Latest Blogs (taking 30% width) */}
            <div className="w-full md:w-[30%] md:ml-8">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Latest Blogs</h3>
                <div className="space-y-6">
                    {latestBlogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col md:flex-row items-start bg-white p-4 md:p-6 rounded-lg shadow-xl hover:bg-gray-100 transition-all">
                            {/* Blog Title and Description */}
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">{blog.title}</h4>
                                <p className="text-gray-600 text-sm md:text-base mb-2">
                                    {truncateDescription(blog.description)} {/* Truncate to 10 words */}
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm mb-2">
                                    By <span className="font-medium">{blog.username}</span> | {blog.date}
                                </p>
                                {/* "Read More" link */}
                                <Link
                                    to={`/blog/${blog.id}`} // Assuming you're using the blog ID to generate the URL
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
