import React, { useState } from "react";

const BecomeDoctorForm = () => {

    const [availableDays, setAvailableDays] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);

    const handleCheckboxChange = (e, setState, state) => {
        const value = e.target.value;
        if (e.target.checked) {
            setState([...state, value]);
        } else {
            setState(state.filter((item) => item !== value));
        }
    };


    return (
        <section id="personalInformation" className="p-8 bg-gray-100 text-gray-800">
            <form noValidate="" action="" className="container flex flex-col mx-auto max-w-4xl space-y-8">
                
                {/* Personal Information Section */}
                <fieldset id className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Personal Information</p>
                        <p className="text-sm text-gray-600">Please enter your personal details below to proceed.</p>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-doctor-illustration-download-in-svg-png-gif-file-formats--medical-healthcare-appointment-consultation-pack-illustrations-6459680.png?f=webp" alt="" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="flex gap-4">
                                <input 
                                    id="firstname" 
                                    type="text" 
                                    placeholder="First name" 
                                    className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                                
                            </div>
                        </div>
                        <div>
                            <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of Birth</label>
                            <input 
                                id="dob" 
                                type="date" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender (Optional)</label>
                            <select 
                                id="gender" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</label>
                            <input 
                                id="nationality" 
                                type="text" 
                                placeholder="Enter your nationality" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalRegistration" className="text-sm font-medium text-gray-700">Medical Registration Number</label>
                            <input 
                                id="medicalRegistration" 
                                type="text" 
                                placeholder="Enter your registration number" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="specialization" className="text-sm font-medium text-gray-700">Specialization</label>
                            <input 
                                id="specialization" 
                                type="text" 
                                placeholder="Your area of specialization" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="experience" className="text-sm font-medium text-gray-700">Years of Experience</label>
                            <input 
                                id="experience" 
                                type="number" 
                                placeholder="Enter your years of experience" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input 
                                id="phone" 
                                type="tel" 
                                placeholder="Enter your phone number" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Educational Background Section */}
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Educational Background</p>
                        <p className="text-sm text-gray-600">Please provide your academic qualifications.</p>
                        <img src="https://i.pinimg.com/originals/ae/5a/e1/ae5ae16a1f8bdad663c96a699d91e646.jpg" alt="" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="highestEducation" className="text-sm font-medium text-gray-700">Highest Level of Education</label>
                            <input 
                                id="highestEducation" 
                                type="text" 
                                placeholder="e.g., Medical Degree" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalSchool" className="text-sm font-medium text-gray-700">Medical School Attended</label>
                            <input 
                                id="medicalSchool" 
                                type="text" 
                                placeholder="Enter your medical school name" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="graduationYear" className="text-sm font-medium text-gray-700">Graduation Year</label>
                            <input 
                                id="graduationYear" 
                                type="number" 
                                placeholder="Enter your graduation year" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalDegree" className="text-sm font-medium text-gray-700">Medical Degree</label>
                            <input 
                                id="medicalDegree" 
                                type="text" 
                                placeholder="M.D., M.B.B.S., or equivalent" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Motivation & Goals Section */}
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Motivation & Goals</p>
                        <p className="text-sm text-gray-600">Please share why you want to become a doctor and your career goals.</p>
                        <img src="https://static.vecteezy.com/system/resources/previews/026/333/810/non_2x/concept-of-people-running-to-their-goal-in-columns-motivation-moving-up-teamwork-to-achieve-business-goals-way-to-reach-target-flat-illustration-on-white-background-vector.jpg" alt="" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="motivation" className="text-sm font-medium text-gray-700">Why do you want to become a doctor?</label>
                            <textarea 
                                id="motivation" 
                                rows="4" 
                                placeholder="Describe your motivation in a few sentences." 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="careerGoals" className="text-sm font-medium text-gray-700">What are your career goals as a doctor?</label>
                            <textarea 
                                id="careerGoals" 
                                rows="4" 
                                placeholder="Describe your goals and aspirations." 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Work Experience Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Work Experience (কর্মক্ষেত্রের অভিজ্ঞতা)</p>
                        <p className="text-sm text-gray-600">Provide your work experience details.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="hospitalClinicName" className="text-sm font-medium text-gray-700">Hospital/Clinic Name (হাসপাতাল/ক্লিনিকের নাম)</label>
                            <input 
                                id="hospitalClinicName" 
                                type="text" 
                                placeholder="Enter hospital or clinic name" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="position" className="text-sm font-medium text-gray-700">Position (পদবি)</label>
                            <input 
                                id="position" 
                                type="text" 
                                placeholder="Your position" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration (সময়কাল)</label>
                            <input 
                                id="duration" 
                                type="text" 
                                placeholder="e.g., Jan 2020 - Dec 2022" 
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Resume/CV Upload Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Upload Resume/CV (সিভি/রেজুমে আপলোড করুন)</p>
                    </div>
                    <div className="w-full">
                        <input 
                            type="file" 
                            id="resumeUpload" 
                            className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </fieldset>

                {/* Medical License Upload Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Upload Medical License Copy (মেডিক্যাল লাইসেন্সের কপি আপলোড করুন)</p>
                    </div>
                    <div className="w-full">
                        <input 
                            type="file" 
                            id="licenseUpload" 
                            className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </fieldset>


                 {/* Availability Section */}
                 <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Availability (উপস্থিতির সময়সূচী)</p>
                        <p className="text-sm text-gray-600">Specify the days and times you're available.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Available Days (উপলব্ধ দিন)</p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                    <label key={day} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={day.toLowerCase()}
                                            onChange={(e) => handleCheckboxChange(e, setAvailableDays, availableDays)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>{day} ({day === "Monday" ? "সোমবার" : day === "Tuesday" ? "মঙ্গলবার" : day === "Wednesday" ? "বুধবার" : day === "Thursday" ? "বৃহস্পতিবার" : day === "Friday" ? "শুক্রবার" : day === "Saturday" ? "শনিবার" : "রবিবার"})</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-700">Available Time (উপলব্ধ সময়)</p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                {[
                                    "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", 
                                    "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM",
                                    "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM",
                                    "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM",
                                    "8:00 PM - 9:00 PM", "9:00 PM - 10:00 PM"
                                ].map((time) => (
                                    <label key={time} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={time}
                                            onChange={(e) => handleCheckboxChange(e, setAvailableTimes, availableTimes)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>{time}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </fieldset>


                {/* References and Additional Information Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">References & Additional Information</p>
                        <p className="text-sm text-gray-600">Provide references and any additional information.</p>
                    </div>
                    <div className="w-full">
                        <label htmlFor="references" className="text-sm font-medium text-gray-700">References (if any)</label>
                        <textarea 
                            id="references" 
                            rows="3" 
                            placeholder="Provide names, contact details, and your relationship." 
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="aboutYou" className="text-sm font-medium text-gray-700">About Yourself</label>
                        <textarea 
                            id="aboutYou" 
                            rows="5" 
                            placeholder="Share any additional information about yourself." 
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                        />
                    </div>
                </fieldset>

                {/* Submit Button */}
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="px-8 py-3 mt-6 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </section>
    );
};

export default BecomeDoctorForm;
