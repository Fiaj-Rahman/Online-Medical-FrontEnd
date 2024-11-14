import React, { useState, useEffect } from "react";
import { Parallax } from 'react-parallax';
import doctorData from './../../../Component/FileJson/Doctor.json';
import { FaSearch, FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";

const FindDoctorBanner = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(6);
    const [sortByRating, setSortByRating] = useState(false);
    const [ratingFilter, setRatingFilter] = useState("All");
    const { doctorId } = useParams();  // Fetch the doctorId from the URL params
    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        navigate(`/doctor-details/${id}`);
    };
    useEffect(() => {
        setDoctors(doctorData);
        setFilteredDoctors(doctorData);

        const uniqueCategories = [
            'All',
            ...new Set(doctorData.map((doctor) => doctor.category))
        ];
        setCategories(uniqueCategories);
    }, []);

    useEffect(() => {
        // Reset filters when component mounts to show all doctors
        setSelectedCategory('All');
        setSearchQuery('');
        setMinPrice(0);
        setMaxPrice(10000);
        setSortByRating(false);
        setRatingFilter("All");
    }, []); // Empty dependency array ensures this only runs on component mount

    useEffect(() => {
        filterDoctors(); // Reapply filters whenever any of the filter criteria change
    }, [selectedCategory, searchQuery, minPrice, maxPrice, sortByRating, ratingFilter]);

    const filterDoctors = () => {
        let filtered = doctors;

        // Apply category filter (only if a category is selected, otherwise show all)
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(doctor => doctor.category === selectedCategory);
        }

        // Apply price range filter
        filtered = filtered.filter(doctor => {
            const doctorPrice = parseInt(doctor.price, 10);
            return doctorPrice >= minPrice && doctorPrice <= maxPrice;
        });

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(doctor =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply rating filter
        if (ratingFilter !== "All") {
            const [minRating, maxRating] = ratingFilter.split("-").map(Number);
            filtered = filtered.filter(doctor => doctor.rating >= minRating && doctor.rating <= (maxRating || minRating));
        }

        // Apply sort by rating
        if (sortByRating) {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredDoctors(filtered);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePriceRangeChange = (event) => {
        const { name, value } = event.target;
        if (name === "minPrice") {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    };

    const handleSortByRatingChange = (event) => {
        setSortByRating(event.target.checked);
    };

    const handleRatingFilterChange = (event) => {
        setRatingFilter(event.target.value);
    };

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredDoctors.length / doctorsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar key={i} className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            );
        }
        return stars;
    };

    return (
        <div className="bg-gray-100 overflow-hidden">
            <Parallax
                className="parallax-banner h-screen"
                bgImage="./slider02.jpg"
                strength={300}
            >
                <div className="py-20 text-center text-white relative h-screen bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center px-4 md:px-10">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                            Find a Doctor That Fits Your Needs
                        </h1>
                        <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-300 mb-6 max-w-xl mx-auto">
                            Search from a wide range of doctors across various specialties to find the best care for you and your loved ones.
                        </p>
                        <div className="flex justify-center items-center max-w-md mx-auto mt-5 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search for doctors..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="p-4 pl-10 w-full rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </Parallax>

            <div className="flex py-8 px-4 sm:px-6 md:px-12">
                <div className="w-full sm:w-1/4  px-2 mb-6 sm:mb-0">
                    <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mt-6 mb-4">Sort by Rating</h2>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="sortByRating"
                            checked={sortByRating}
                            onChange={handleSortByRatingChange}
                            className="mr-2"
                        />
                        <label htmlFor="sortByRating" className="text-sm sm:text-lg">Sort by rating (highest first)</label>
                    </div>

                    <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mt-6 mb-4">Price Range</h2>
                    <div className="mb-6">
                        <label htmlFor="minPrice" className="text-sm sm:text-lg md:text-xl block mb-2">Min Price: {minPrice} BDT</label>
                        <input
                            type="range"
                            id="minPrice"
                            name="minPrice"
                            min="0"
                            max="10000"
                            value={minPrice}
                            onChange={handlePriceRangeChange}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="maxPrice" className="text-sm sm:text-lg md:text-xl block mb-2">Max Price: {maxPrice} BDT</label>
                        <input
                            type="range"
                            id="maxPrice"
                            name="maxPrice"
                            min="0"
                            max="10000"
                            value={maxPrice}
                            onChange={handlePriceRangeChange}
                            className="w-full"
                        />
                    </div>

                    <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mb-4">Categories</h2>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div key={category} className="flex items-center">
                                <input
                                    type="radio"
                                    id={category}
                                    name="category"
                                    checked={selectedCategory === category}
                                    onChange={() => handleCategoryChange(category)}
                                    className="mr-2"
                                />
                                <label htmlFor={category} className="text-sm sm:text-lg md:text-xl">{category}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full sm:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentDoctors.length > 0 ? currentDoctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg sm:text-xl">{doctor.name}</h3>
                                    <p className="text-sm sm:text-md text-gray-600">{doctor.specialty}</p>
                                    <div className="flex items-center my-2">
                                        {renderStars(doctor.rating)}
                                    </div>
                                    <p className="text-sm sm:text-md text-gray-500 mb-3">{doctor.experience} years of experience</p>
                                    <p className="text-lg sm:text-xl font-semibold">{doctor.price} BDT</p>
                                    <button
                                        onClick={() => handleDetailsClick(doctor.id)}
                                        className="px-6 w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="flex justify-center w-full h-screen items-center text-center m-auto">
                                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="relative">
                                        <iframe
                                            src="https://lottie.host/embed/4ee38469-2579-4d50-85b6-64d504e32831/uBSFYrb58r.json"
                                            frameBorder="0"
                                            className="w-full h-72 sm:h-96 rounded-lg"
                                            title="Animation"
                                        ></iframe>
                                        <div className="absolute inset-0 bg-black bg-opacity-25 rounded-lg"></div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-center text-lg sm:text-xl text-gray-600">No doctors found based on the filters.</p>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                    <div className="flex justify-center mt-8">
                        <nav>
                            <ul className="flex list-style-none">
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item">
                                        <button
                                            onClick={() => paginate(number)}
                                            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindDoctorBanner;
