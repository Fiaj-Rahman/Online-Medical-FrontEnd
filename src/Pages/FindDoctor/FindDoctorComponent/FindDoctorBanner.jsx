import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { FaSearch, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FindDoctorBanner = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [ratingFilter, setRatingFilter] = useState("All");
    const [priceSortOrder, setPriceSortOrder] = useState("asc");

    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 6;

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://medconnect-eta.vercel.app/doctors")
            .then((response) => response.json())
            .then((data) => {
                const approvedDoctors = data.filter((doctor) => doctor.approval === "true");
                setDoctors(approvedDoctors);
                setFilteredDoctors(approvedDoctors);

                const uniqueCategories = ["All", ...new Set(approvedDoctors.map((doc) => doc.specialization))];
                setCategories(uniqueCategories);
            })
            .catch((error) => console.error("Error fetching doctors:", error));
    }, []);

    useEffect(() => {
        let filtered = [...doctors];

        if (selectedCategory !== "All") {
            filtered = filtered.filter((doc) => doc.specialization === selectedCategory);
        }

        filtered = filtered.filter((doc) => {
            const doctorPrice = parseFloat(doc.visit) || 0;
            return doctorPrice >= minPrice && doctorPrice <= maxPrice;
        });

        if (ratingFilter !== "All") {
            const [minRating] = ratingFilter.split("-").map(Number);
            filtered = filtered.filter((doc) => doc.rating >= minRating);
        }

        if (searchQuery.trim()) {
            filtered = filtered.filter(
                (doc) =>
                    doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (priceSortOrder === "asc") {
            filtered.sort((a, b) => parseFloat(a.visit) - parseFloat(b.visit));
        } else if (priceSortOrder === "desc") {
            filtered.sort((a, b) => parseFloat(b.visit) - parseFloat(a.visit));
        }

        setFilteredDoctors(filtered);
    }, [doctors, selectedCategory, searchQuery, minPrice, maxPrice, ratingFilter, priceSortOrder]);

    const handleDetailsClick = (id) => navigate(`/doctor-details/${id}`);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            />
        ));
    };

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gray-100 overflow-hidden">
            <Parallax className="parallax-banner h-screen" bgImage="./slider02.jpg" strength={300}>
                <div className="h-screen flex flex-col justify-center items-center bg-black bg-opacity-50 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Find Your Doctor</h1>
                    <p className="text-gray-300 text-sm sm:text-lg mb-6 max-w-lg">
                        Search from a wide range of doctors across various specialties.
                    </p>
                    <div className="relative w-3/4 sm:w-1/2">
                        <FaSearch className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pl-10 rounded-lg shadow-md text-black focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </Parallax>

            <div className="py-10 px-4 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <h3 className="text-lg font-medium mb-2">Specialization</h3>
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    className={`cursor-pointer p-2 rounded ${
                                        selectedCategory === cat ? "bg-blue-100 text-blue-700" : "bg-gray-100"
                                    }`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-medium mt-6 mb-2">Price Range</h3>
                        <div className="flex flex-col gap-2">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                className="p-2 border rounded"
                                placeholder="Min Price"
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="p-2 border rounded"
                                placeholder="Max Price"
                            />
                        </div>

                        <h3 className="text-lg font-medium mt-6 mb-2">Sort by Price</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPriceSortOrder("asc")}
                                className={`px-4 py-2 rounded ${priceSortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            >
                                Low to High
                            </button>
                            <button
                                onClick={() => setPriceSortOrder("desc")}
                                className={`px-4 py-2 rounded ${priceSortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            >
                                High to Low
                            </button>
                        </div>

                        <h3 className="text-lg font-medium mt-6 mb-2">Rating</h3>
                        <select
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="w-full p-2 rounded border"
                        >
                            <option value="All">All Ratings</option>
                            <option value="4-5">4 stars & above</option>
                            <option value="3-5">3 stars & above</option>
                            <option value="2-5">2 stars & above</option>
                        </select>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentDoctors.length > 0 ? (
                                currentDoctors.map((doc) => (
                                    <div key={doc._id} className="bg-white rounded-lg shadow-md p-4">
                                        <img
                                            src={doc.userImage}
                                            alt={doc.fullName}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <h3 className="text-lg font-bold mt-4">{doc.fullName}</h3>
                                        <p className="text-gray-500">{doc.specialization}</p>
                                        <div className="flex items-center mt-2">{renderStars(doc.rating)}</div>
                                        <p className="mt-2 text-gray-600">{doc.visit} BDT</p>
                                        <button
                                            onClick={() => handleDetailsClick(doc._id)}
                                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">
                                    No doctors found matching the criteria.
                                </p>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`mx-1 px-3 py-1 rounded ${
                                            currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindDoctorBanner;
