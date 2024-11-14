import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import doctorData from '../../../Component/FileJson/Doctor.json';
import { FaCircleArrowLeft } from "react-icons/fa6";

// Modal component for booking appointment
const AppointmentModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [phone, setPhone] = useState('');

    if (!isOpen) return null;  // Don't render if modal is closed

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, phone, appointmentDate });
        onClose();  // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Book an Appointment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-600">Your Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-600">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-600">Your Phone</label>
                        <input 
                            type="text" 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="appointmentDate" className="block text-gray-600">Preferred Date</label>
                        <input 
                            type="date" 
                            id="appointmentDate" 
                            value={appointmentDate} 
                            onChange={(e) => setAppointmentDate(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DoctorDetailsPage = () => {
    const { id } = useParams();  // Fetch the doctorId from the URL params
    const navigate = useNavigate();
    
    // Find the doctor by id
    const doctor = doctorData.find(d => d.id === parseInt(id));
    const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility

    if (!doctor) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <h2 className="text-lg sm:text-xl text-gray-600">Doctor not found</h2>
            </div>
        );
    }

    // Handle appointment submission
    const handleAppointmentSubmit = (appointmentData) => {
        console.log("Appointment Submitted:", appointmentData);
        alert("Appointment booked successfully!");
    };

    return (
        <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/Find_a_Doctor')} 
                className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition ease-in-out duration-200 flex items-center space-x-2"
            >
               <FaCircleArrowLeft />
               <span>Back to Doctor List</span>
            </button>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
                {/* Doctor Image */}
                <div className="flex justify-center mb-4 md:mb-0">
                    <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-72 h-72 object-cover rounded-xl shadow-lg border-4 border-indigo-200"
                    />
                </div>

                {/* Doctor Details */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold text-gray-900">{doctor.name}</h1>
                    <p className="text-xl text-indigo-600">{doctor.specialty}</p>
                    <div className="flex items-center space-x-2">
                        {renderStars(doctor.rating)}
                        <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                    </div>

                    {/* Doctor Price */}
                    <p className="text-lg text-gray-800 mt-4">
                        <span className="font-semibold">Consultation Fee:</span> ${doctor.price}
                    </p>

                    {/* Doctor Availability */}
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Available on:</span> {doctor.availability.days.join(', ')} 
                        from {doctor.availability.hours}
                    </p>

                    {/* Doctor Contact Info */}
                    <div className="space-y-2">
                        <p className="text-md text-gray-700"><span className="font-semibold">Contact:</span></p>
                        <p className="text-md text-gray-700">Phone: {doctor.contact.phone}</p>
                        <p className="text-md text-gray-700">Email: <a href={`mailto:${doctor.contact.email}`} className="text-indigo-600 hover:underline">{doctor.contact.email}</a></p>
                    </div>

                    {/* Doctor Location */}
                    <p className="text-md text-gray-700">Location: {doctor.location}</p>

                    {/* Appointment Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition ease-in-out duration-200"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Modal for booking appointment */}
            <AppointmentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleAppointmentSubmit}
            />
        </div>
    );
};

// Helper function to render the star ratings
const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
        );
    }
    return stars;
};

export default DoctorDetailsPage;
