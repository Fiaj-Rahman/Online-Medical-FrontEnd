import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../Component/Authentication/AuthProvider/AuthProvider";
import { Card, Typography } from "@material-tailwind/react";
import { Edit, Delete } from "@mui/icons-material"; // Import Material-UI icons
import { Button, Modal, TextField } from "@material-tailwind/react";

const Blog_Management = () => {
    const { user } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [updatedBlog, setUpdatedBlog] = useState({
        title: "",
        blogCategory: "",
        content: "",
    });
    const [error, setError] = useState(null); // Error handling state

    // Fetch blogs data
    useEffect(() => {
        if (!user?.email) return; // Don't fetch if no user email

        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/blog");
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await response.json();

                // Filter blogs by the current user's email
                const userBlogs = data.filter((blog) => blog.userEmail === user?.email);
                setBlogs(userBlogs);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [user?.email]);

    const TABLE_HEAD = ["No.", "Image", "Title", "Category", "Date", "Actions"]; // Add "No." for the index

   

    // Handle form input changes
    const handleChange = (e) => {
        setUpdatedBlog({
            ...updatedBlog,
            [e.target.name]: e.target.value,
        });
    };

    // Handle save edit (PUT request to backend)
    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/blogs/${selectedBlog._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlog),
            });

            if (response.ok) {
                alert("Blog post updated successfully");
                // Update the local blogs state
                setBlogs(blogs.map((blog) => (blog._id === selectedBlog._id ? { ...blog, ...updatedBlog } : blog)));
                setEditModalOpen(false); // Close the modal
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update blog post");
            }
        } catch (error) {
            console.error("Error updating blog post:", error);
            alert("Error occurred while updating the blog post");
        }
    };

    // Handle Delete Button Click
    const handleDelete = async (blogId) => {
        const confirmation = window.confirm("Are you sure you want to delete this blog?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:5000/blogs/${blogId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Blog post deleted successfully");
                    // Remove the deleted blog from local state
                    setBlogs(blogs.filter((blog) => blog._id !== blogId));
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Failed to delete blog post");
                }
            } catch (error) {
                console.error("Error deleting blog post:", error);
                alert("Error occurred while deleting the blog post");
            }
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <h1>Blog Management</h1>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => {
                            const isLast = index === blogs.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={blog._id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {index + 1} {/* Display index number */}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <img src={blog.images[0]} alt={blog.title} className="w-12 h-12 rounded-full object-cover" />
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {blog.title || 'No Title'}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {blog.blogCategory || 'No Category'}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {blog.createdDate || 'No Date'}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex space-x-4">
                                         
                                            <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700">
                                                <Delete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>

        </div>
    );
};

export default Blog_Management;
