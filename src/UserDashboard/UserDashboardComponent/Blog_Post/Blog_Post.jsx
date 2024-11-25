import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Component/Authentication/AuthProvider/AuthProvider";

const Blog_Post = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        blogCategory: "",
        images: [],
    });

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                setLoading(true);
                try {
                    const { data } = await axios.get("http://localhost:5000/signup");
                    const matchedUser = data.find((u) => u.email === user.email);
                    setUserData(matchedUser || {});
                } catch (error) {
                    setError("Failed to fetch user data.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUserData();
    }, [user]);



    // Update image preview on image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreview(previewUrls);
        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle checkbox for multi-select features
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => {
            const updatedFeatures = checked
                ? [...prev[name], value]
                : prev[name].filter((feature) => feature !== value);
            return { ...prev, [name]: updatedFeatures };
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setLoading(true);

            // Upload images to ImgBB
            const imageUrls = await Promise.all(
                formData.images.map(async (image) => {
                    const formData = new FormData();
                    formData.append("image", image);
                    const { data } = await axios.post(
                        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
                        formData
                    );
                    return data.data.display_url;
                })
            );

            // Extract current date and time separately
            const currentDate = new Date();
            const createdDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            // const createdTime = currentDate.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format
            // Convert to 12-hour format (AM/PM)
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
        const view = 0;

            // Submit property data
            const propertyData = {
                ...formData,
                images: imageUrls,
                userEmail: user?.email,
                userName: userData?.fullName,
                userImage: userData?.image || "",
                createdDate: createdDate, // Save date separately
                createdTime: formattedTime, // Save time separately
                views: view,
            };

            await axios.post("http://localhost:5000/blog", propertyData, {
                withCredentials: true,
            });


            setFormData({
                title: "",
                description: "",
                blogCategory: "",
                images: [],
               
            });
            setImagePreview(null);
            navigate("/"); // Navigate to home page
            toast.success("Property added successfully!"); // Show success toast
        } catch (error) {
            toast.error("Failed to add property."); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8 bg-gray-100 text-gray-800">
            <form onSubmit={handleSubmit} className="container mx-auto space-y-8 max-w-4xl">
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg my-24 max-h-screen">


                    <div>
                        <label htmlFor="title" className="font-bold text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter property title"
                            className="w-full mt-1 px-4 py-2 rounded-lg border"
                        />
                    </div>


                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="text-sm font-bold text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter property description"
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>


                    {/* Furnishing Status */}
                    <div>
                        <label htmlFor="furnishingStatus" className="text-sm font-bold text-gray-700">Blog Category</label>
                        <select
                            name="blogCategory"
                            value={formData.blogCategory}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                            <option value="" disabled>Select Blog Category</option>
                            <option value="Furnished">Health Tips</option>
                            <option value="Unfurnished">Diseases & Conditions</option>
                            <option value="Semi-furnished">Preventive Healthcare</option>
                            <option value="Semi-furnished">Nutrition & Diet</option>
                            <option value="Semi-furnished">Fitness & Exercise</option>
                            <option value="Semi-furnished">Mental Health & Well-being</option>
                            <option value="Semi-furnished">Pregnancy & Parenting</option>
                            <option value="Semi-furnished">Women's Health</option>
                            <option value="Semi-furnished">Men's Health</option>
                            <option value="Semi-furnished">Skin Care</option>
                            <option value="Semi-furnished">Healthy Aging</option>
                            <option value="Semi-furnished">Treatment Options</option>
                            <option value="Semi-furnished">Pharmaceuticals & Medications</option>
                            <option value="Semi-furnished">Medical Research & Innovations</option>
                            <option value="Semi-furnished">Healthcare Systems & Policies</option>
                            <option value="Semi-furnished">Emergency Medicine</option>
                            <option value="Semi-furnished">Patient Stories</option>
                            <option value="Semi-furnished">Children's Health</option>
                            <option value="Semi-furnished">Alternative Medicine</option>
                            <option value="Semi-furnished">Health Technology</option>
                            
                        </select>
                    </div>


                    {/* Property Images */}
                    <div>
                        <label htmlFor="images" className="text-sm font-bold text-gray-700">Property Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    images: [...formData.images, ...e.target.files],
                                });
                            }}
                            multiple
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>



                </fieldset>

                {imagePreview && (
                    <div className="flex flex-wrap gap-4">
                        {imagePreview.map((src, idx) => (
                            <img key={idx} src={src} alt="Preview" className="w-20 h-20 object-cover" />
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Add Property"}
                </button>
            </form>
        </section>
    );
};

export default Blog_Post;
