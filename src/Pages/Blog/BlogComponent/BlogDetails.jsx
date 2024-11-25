import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the blog ID from the URL

const BlogDetails = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null); // State to store the blog data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch the blog post details
    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/blog/${id}`);
                const data = await response.json();
                setBlog(data); // Set the blog data in the state
            } catch (error) {
                console.error('Error fetching blog details:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchBlogDetails(); // Fetch the blog details
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">Loading...</div>
            </div>
        ); // Show loading message while data is being fetched
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg font-semibold text-gray-600">Blog not found</div>
            </div>
        ); // If no blog data is found
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-10">
            {/* Blog Header */}
            <div className="relative">
                <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                <div className="absolute bottom-4 left-6 bg-opacity-60 bg-black text-white p-4 rounded-md">
                    <h1 className="text-3xl font-extrabold">{blog.title}</h1>
                    <p className="text-sm font-medium mt-2">{blog.category}</p>
                </div>
            </div>

            {/* Blog Details */}
            <div className="mt-6">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <p>{new Date(blog.createdDate).toLocaleDateString()}</p>
                    <div className="flex items-center space-x-2">
                        <img
                            src={blog.userImage}
                            alt={blog.userName}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{blog.userName}</span>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-lg text-gray-800 leading-relaxed">{blog.description}</p>
                </div>
            </div>

           
        </div>
    );
};

export default BlogDetails;
