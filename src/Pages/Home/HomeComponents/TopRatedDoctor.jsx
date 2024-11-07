import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Assuming you have a JSON or data file containing doctors info
import doctorsData from './../../../Component/FileJson/TopRatedDoctor.json'; // Adjust the path if necessary

const TopRatedDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        setDoctors(doctorsData);
    }, []);

    return (
        <div className="bg-gray-100 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Top Rated Doctors</h1>

            {/* Swiper Section */}
            <div className="flex justify-center">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true} // Enable looping
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 2, // 2 slides on small screens
                        },
                        768: {
                            slidesPerView: 2, // 2 slides on medium screens
                        },
                        1024: {
                            slidesPerView: 4, // 4 slides on large screens
                        },
                    }}
                >
                    {doctors.map((doctor) => (
                        <SwiperSlide key={doctor.id} className="flex flex-col max-w-sm mx-auto my-6 shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                            {/* Doctor Card Content */}
                            <div className="bg-white rounded-t-lg p-6 relative">
                                {/* Doctor Image */}
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-32 h-32 rounded-full mx-auto border-4 border-violet-600 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover"
                                />
                                {/* Doctor's Information */}
                                <div className="text-center mt-4">
                                    <h3 className="text-2xl font-semibold text-gray-800">{doctor.name}</h3>
                                    <p className="text-lg text-gray-600 mt-2">{doctor.specialization}</p>

                                    {/* Rating Section */}
                                    <div className="flex justify-center mt-2">
                                        {[...Array(doctor.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-500 text-xl">★</span>
                                        ))}
                                        {[...Array(5 - doctor.rating)].map((_, i) => (
                                            <span key={i} className="text-gray-300 text-xl">★</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Contact Information */}
                            <div className="bg-gradient-to-r from-violet-600 to-purple-500 text-gray-800 font-bold rounded-b-lg p-4">
                                
                                <p className="text-sm text-center">{doctor.location}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopRatedDoctor;
