// src/components/DoctorDetails.js

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../Component/Authentication/AuthProvider/AuthProvider";

const DoctorDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();  // Fetch the doctor ID from the URL
  const [doctor, setDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
  const [paymentAmount, setPaymentAmount] = useState('');  // State to handle payment input

  useEffect(() => {
    fetch(`https://medconnect-eta.vercel.app/doctors/${id}`)
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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePaymentChange = (e) => {
    setPaymentAmount(e.target.value);
  };




  const handlePaymentSubmit = () => {
    const paymentData = {
      doctorId: doctor._id,         // Assuming each doctor has a unique ID
      doctorName: doctor.fullName,
      doctorEmail: doctor.userEmail,
      specialization: doctor.specialization,
      visitFee: doctor.visit,
      availableDays: doctor.availableDays,
      availableTime: doctor.availableTime,
      userEmail: user?.email,       // User's email from context
      paymentAmount: paymentAmount, // Payment amount (you may want to get this value)
      appointmentStatus:"false",
    };
  
    // Log the payment data to the console
    console.log('Payment Submitted:', paymentData);
  
    // You can then send this data to the backend
    fetch("https://medconnect-eta.vercel.app/order", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    })
     
      .then((res) =>res.json())
      .then((result) => {
        window.location.replace(result.url)
        console.log(result)
      })
      .catch(error => {
        console.error("Error submitting payment:", error);
      });
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
              src={doctor.userImage}
              alt={doctor.fullName}
              className="w-full h-full object-cover rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300"
            />
          </div>

          {/* Right Column: Doctor Information */}
          <div className="w-full space-y-6">
            {/* Name and Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-blue-800">{doctor.fullName}</h1>
              {/* <div className="flex">{renderStars(doctor.rating)}</div> */}
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
              <button
                onClick={handleModalToggle}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-800">Book Appointment</h2>
              <button
                onClick={handleModalToggle}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>
            <div className="mt-4">
              <p className="text-lg">Doctor: {doctor.fullName}</p>
              <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
              <p className="text-sm text-gray-600 font-bold">Fee: {doctor.visit} BDT</p>
            </div>
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

      \

            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePaymentSubmit}
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
              >
                Payment
              </button>
              <button
                onClick={handleModalToggle}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
