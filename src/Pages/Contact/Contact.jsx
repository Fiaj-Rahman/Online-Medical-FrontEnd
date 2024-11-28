import React, { useContext } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import { AuthContext } from "../../Component/Authentication/AuthProvider/AuthProvider";

// web3forms user 

const Contact = () => {
    const { user } = useContext(AuthContext);
    console.log(user?.email);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "3e90211b-6ef9-4b14-8398-f4e44f2f6de1");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            Swal.fire({
                title: "Thanks for your feedback!",
                text: "Message sent successfully!",
                icon: "success"
            });
        }
    };

    return (
        <div className="bg-gray-50 text-gray-900">
            {/* Contact Form Section */}
            <div className="h-auto mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-white text-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col justify-between space-y-4">
                    <h2 className="text-4xl font-bold text-indigo-600">Let’s Talk!</h2>
                    <p className="text-lg text-gray-600">We would love to hear from you! Drop us a message.</p>
                    <iframe
                        src="https://lottie.host/embed/936c7862-bd88-4e89-97a2-0cff3890e590/4718oB0xXx.json"
                        width="100%"  // Set iframe width to 100% of its container
                        height="400"  // Set iframe height to 400px
                        frameBorder="0"  // Optional: removes iframe border
                    ></iframe>
                </div>
                <form onSubmit={onSubmit} noValidate="" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm font-semibold text-gray-800">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="Enter your full name"
                            className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-gray-800">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm font-semibold text-gray-800">Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            name="message"
                            required
                            placeholder="Type your message"
                            className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 text-sm font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                        disabled={!user?.email} // Disable the button if user.email is not available
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Contact Info Section (Address, Email, Phone) */}
            <div className="flex flex-col bg-gray-50 md:flex-row justify-between gap-12 px-8 py-16 rounded-lg shadow-xl mt-12">
                {/* Address */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-indigo-600" />
                        <span>Our Address</span>
                    </h3>
                    <p className="text-gray-600">123 Business Avenue, City, Country</p>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                        <FaEnvelope className="text-indigo-600" />
                        <span>Email Us</span>
                    </h3>
                    <p className="text-gray-600">contact@ourcompany.com</p>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h3 className="text-xl font-semibold text-indigo-600 flex items-center space-x-2">
                        <FaPhoneAlt className="text-indigo-600" />
                        <span>Call Us</span>
                    </h3>
                    <p className="text-gray-600">+1 (234) 567-8900</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
