// src/components/DoctorDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const DoctorDetails = () => {
  const { id } = useParams();  // Fetch the doctor ID from the URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${id}`)
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch((error) => console.error("Error fetching doctor:", error));
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-400"}`}
      />
    ));
  };

  if (!doctor) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  return (
    <div className="py-12 px-6 sm:px-8 bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Doctor Image */}
          <div className="w-full h-full">
            <img
              src={doctor.profileImage}
              alt={doctor.fullName}
              className="w-full h-full object-cover rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300"
            />
          </div>

          {/* Right Column: Doctor Information */}
          <div className="w-full space-y-6">
            {/* Name and Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-blue-800">{doctor.fullName}</h1>
              
            </div>

            {/* Personal Info */}
            <div>
              <p className="text-lg text-gray-900 font-bold">{doctor.yourSelf}</p>
              <p className="text-sm text-gray-700">{doctor.specialization}</p>
              <p className="text-sm text-gray-700">{doctor.experience} years of experience</p>
              <p className="text-sm text-gray-700">{doctor.medicalSchool}</p>
              <p className="text-sm text-gray-700">{doctor.medicalDegree}</p>
              <p className="text-sm text-gray-700">{doctor.position}</p>
            </div>

            {/* Available Days & Time */}
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-gray-700">Available Days:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {doctor.availableDays.map((day, index) => (
                    <li key={index} className="text-sm">{day}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-lg font-medium text-gray-700">Available Time:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {doctor.availableTime.map((time, index) => (
                    <li key={index} className="text-sm">{time}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visit Fee */}
            <p className="text-xl font-semibold text-blue-600">{doctor.visit} BDT</p>

            {/* Book Appointment Button */}
            <div className="mt-6">
              <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
