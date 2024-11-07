import React from "react";
import { FaStethoscope, FaUserMd, FaVideo, FaAmbulance, FaHeartbeat, FaPrescriptionBottleAlt } from 'react-icons/fa';

const ServiceOffers = () => {
    const servicesData = [
        {
            title: 'General Checkups',
            description: 'Routine examinations to ensure your overall health is monitored and maintained.',
            icon: <FaStethoscope className="text-4xl mb-4 text-blue-600" />,
        },
        {
            title: 'Specialized Care',
            description: 'Expert care provided by specialists tailored to your specific health needs.',
            icon: <FaUserMd className="text-4xl mb-4 text-blue-600" />,
        },
        {
            title: 'Telemedicine',
            description: 'Convenient remote consultations through video calls with qualified healthcare professionals.',
            icon: <FaVideo className="text-4xl mb-4 text-blue-600" />,
        },
        {
            title: 'Emergency Services',
            description: 'Immediate care available 24/7 for urgent medical situations and emergencies.',
            icon: <FaAmbulance className="text-4xl mb-4 text-blue-600" />,
        },
        {
            title: 'Health Monitoring',
            description: 'Continuous tracking of your health metrics to provide timely insights and recommendations.',
            icon: <FaHeartbeat className="text-4xl mb-4 text-blue-600" />,
        },
        {
            title: 'Medication Management',
            description: 'Personalized guidance on medication usage and refills to optimize your health.',
            icon: <FaPrescriptionBottleAlt className="text-4xl mb-4 text-blue-600" />,
        },
    ];

    return (
        <div className="py-20 bg-gray-100 flex flex-col md:flex-row">
            {/* Left Section: Header and SVG Animation */}
            <div className="flex-1 text-center md:text-left mb-12 md:mb-0 p-6">
                <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center">Our Services</h2>
                <p className="text-lg text-gray-700 mb-8">
                    We offer a comprehensive range of medical services designed to meet your health needs.
                    Explore our offerings and discover how we can assist you on your healthcare journey.
                </p>
                <iframe
                    src="https://lottie.host/embed/b1102ed8-4388-4ef5-b0e9-ada3dae898e2/OohW3ODISh.json"
                    style={{ width: '100%', height: '300px', border: 'none' }}
                    title="Service Animation"
                ></iframe>
            </div>

            {/* Right Section: Services Offered */}
            <div className="flex-1 container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-50 p-3 rounded-full shadow">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-blue-600">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceOffers;
