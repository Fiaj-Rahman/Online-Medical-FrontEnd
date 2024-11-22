import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Component/Authentication/AuthProvider/AuthProvider";

const BecomeDoctorForm = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        userEmail: user?.email || "",
        fullName: "",
        dob: "",
        gender: "",
        nationality: "",
        medicalRegistration: "",
        specialization: "",
        experience: "",
        email: "",
        visit:"",
        phone: "",
        highestEducation: "",
        medicalSchool: "",
        graduationYear: "",
        medicalDegree: "",
        motivation: "",
        careerGoals: "",
        hospitalClinicName: "",
        position: "",
        duration: "",
        availableDays: [],
        resume: "",
        medicalLicense: "",
        availableTime: [],
        references: "",
        yourSelf: "",
        approval:"false"
    });
   console.log(user?.email)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prevState => {
            const updatedArray = checked
                ? [...prevState[name], value] // Add the value if checked
                : prevState[name].filter(item => item !== value); // Remove the value if unchecked
            return {
                ...prevState,
                [name]: updatedArray,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Prepare data to be sent as JSON
        const data = { ...formData };
    
        try {
            const response = await axios.post("http://localhost:5000/doctors", data, {
                headers: {
                    'Content-Type': 'application/json', // Ensure you're sending JSON
                },
            });
            
            if (response.data.success) {
                alert("Doctor added successfully!");
            } else {
                alert("Failed to add doctor.");
            }
        } catch (error) {
            console.error("Error adding doctor:", error);
            alert("Failed to add doctor.");
        }
    };
    

    return (
        <section id="personalInformation" className="p-8 bg-gray-100 text-gray-800">
            <form onSubmit={handleSubmit} action="" className="container flex flex-col mx-auto max-w-4xl space-y-8">
                {/* Personal Information Section */}
                <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Personal Information</p>
                        <p className="text-sm text-gray-600">Please enter your personal details below to proceed.</p>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-doctor-illustration-download-in-svg-png-gif-file-formats--medical-healthcare-appointment-consultation-pack-illustrations-6459680.png?f=webp" alt="Online doctor illustration" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                name="fullName"  // Use name instead of id
                                type="text"
                                placeholder="Enter your FullName here..."
                                value={formData.fullName}  // Bind value to state
                                onChange={handleChange}  // Call handleChange
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                name="dob"  // Use name instead of id
                                type="date"
                                value={formData.dob}  // Bind value to state
                                onChange={handleChange}  // Call handleChange
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender (Optional)</label>
                            <select
                                name="gender"  // Use name instead of id
                                value={formData.gender}  // Bind value to state
                                onChange={handleChange}  // Call handleChange
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Nationality */}
                        <div>
                            <label htmlFor="nationality" className="text-sm font-medium text-gray-700">Nationality</label>
                            <input
                                id="nationality"
                                type="text"
                                value={formData.nationality}
                                onChange={handleChange}
                                name="nationality"
                                placeholder="Enter your nationality"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Medical Registration */}
                        <div>
                            <label htmlFor="medicalRegistration" className="text-sm font-medium text-gray-700">Medical Registration Number</label>
                            <input
                                id="medicalRegistration"
                                type="text"
                                value={formData.medicalRegistration}
                                onChange={handleChange}
                                name="medicalRegistration"
                                placeholder="Enter your registration number"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Specialization */}
                        <div>
                            <label htmlFor="specialization" className="text-sm font-medium text-gray-700">Specialization</label>
                            <input
                                id="specialization"
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="Your area of specialization"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Years of Experience */}
                        <div>
                            <label htmlFor="experience" className="text-sm font-medium text-gray-700">Years of Experience</label>
                            <input
                                id="experience"
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Enter your years of experience"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Visit */}
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Patient Visiting Price</label>
                            <input
                                id="visit"
                                type="number"
                                value={formData.visit}
                                onChange={handleChange}
                                name="visit"
                                placeholder="Enter your patient visiting price"
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
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
                        <img src="https://i.pinimg.com/originals/ae/5a/e1/ae5ae16a1f8bdad663c96a699d91e646.jpg" alt="Educational background illustration" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="highestEducation" className="text-sm font-medium text-gray-700">Highest Level of Education</label>
                            <input
                                id="highestEducation"
                                type="text"
                                value={formData.highestEducation}
                                onChange={handleChange}
                                name="highestEducation"
                                placeholder="e.g., Medical Degree"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalSchool" className="text-sm font-medium text-gray-700">Medical School Attended</label>
                            <input
                                id="medicalSchool"
                                type="text"
                                value={formData.medicalSchool}
                                onChange={handleChange}
                                name="medicalSchool"
                                placeholder="e.g., Harvard Medical School"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="graduationYear" className="text-sm font-medium text-gray-700">Graduation Year</label>
                            <input
                                id="graduationYear"
                                type="number"
                                value={formData.graduationYear}
                                onChange={handleChange}
                                name="graduationYear"
                                placeholder="e.g., 2020"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalDegree" className="text-sm font-medium text-gray-700">Medical Degree</label>
                            <input
                                id="medicalDegree"
                                type="text"
                                value={formData.medicalDegree}
                                onChange={handleChange}
                                name="medicalDegree"
                                placeholder="e.g., M.D., M.B.B.S., or equivalent"
                                required
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
                        <img src="https://static.vecteezy.com/system/resources/previews/026/333/810/non_2x/concept-of-people-running-to-their-goal-in-columns-motivation-moving-up-teamwork-to-achieve-business-goals-way-to-reach-target-flat-illustration-on-white-background-vector.jpg" alt="Concept of people running to their goal" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div>
                            <label htmlFor="motivation" className="text-sm font-medium text-gray-700">Why do you want to become a doctor?</label>
                            <textarea
                                id="motivation"
                                rows="4"
                                value={formData.motivation}
                                onChange={handleChange}
                                name="motivation"
                                placeholder="Why do you want to make a difference in the world?"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="careerGoals" className="text-sm font-medium text-gray-700">What are your career goals as a doctor?</label>
                            <textarea
                                id="careerGoals"
                                rows="4"
                                value={formData.careerGoals}
                                onChange={handleChange}
                                name="careerGoals"
                                placeholder="What impact do you hope to have in the medical field?"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
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
                                value={formData.hospitalClinicName}
                                onChange={handleChange}
                                name="hospitalClinicName"
                                placeholder="Enter hospital or clinic name"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="position" className="text-sm font-medium text-gray-700">Position (পদবি)</label>
                            <input
                                id="position"
                                type="text"
                                value={formData.position}
                                onChange={handleChange}
                                name="position"
                                placeholder="Your position"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration (সময়কাল)</label>
                            <input
                                id="duration"
                                type="text"
                                value={formData.duration}
                                onChange={handleChange}
                                name="duration"
                                placeholder="e.g., Jan 2020 - Dec 2022"
                                required
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Work Description (কর্মের বর্ণনা)</label>
                            <textarea
                                id="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                name="description"
                                placeholder="Describe your key responsibilities or achievements."
                                className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            />
                        </div>
                    </div>
                </fieldset>


                {/* Resume/CV Upload Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Drive Link Resume/CV (সিভি/রেজুমে আপলোড করুন)</p>
                    </div>
                    <div className="w-full">
                        <input
                            type="url"  // Keeping the type as URL for the Drive link
                            id="resumeUpload"
                            name="resume"
                            value={formData.resume}
                            onChange={handleChange}  // Custom change handler
                            required
                            placeholder="Paste your Drive link here"
                            className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        {formData.resume && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Selected Link: {formData.resume}</p>
                            </div>
                        )}
                    </div>
                </fieldset>

                {/* Medical License Upload Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Drive Link Medical License Copy (মেডিক্যাল লাইসেন্সের কপি আপলোড করুন)</p>
                    </div>
                    <div className="w-full">
                        <input
                            type="url"  // Keeping the type as URL for the Drive link
                            id="licenseUpload"
                            name="medicalLicense"
                            value={formData.medicalLicense}
                            onChange={handleChange}  // Custom change handler
                            required
                            placeholder="Paste your Drive link here"
                            className="w-full mt-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        {formData.medicalLicense && (
                            <div className="mt-2 text-sm text-gray-700">
                                <p>Selected Link: {formData.medicalLicense}</p>
                            </div>
                        )}
                    </div>
                </fieldset>



                {/* Availability Section */}
                <fieldset className="grid grid-cols-1 gap-6 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-gray-900">Availability (উপস্থিতির সময়সূচী)</p>
                        <p className="text-sm text-gray-600">Specify the days and times you're available.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {/* Available Days Section */}
                        <div>
                            <p className="text-sm font-medium text-gray-700">Available Days (উপলব্ধ দিন)</p>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                    <label key={day} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="availableDays"
                                            value={day}
                                            checked={formData.availableDays.includes(day)}
                                            onChange={handleCheckboxChange}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>{day} ({day === "Monday" ? "সোমবার" : day === "Tuesday" ? "মঙ্গলবার" : day === "Wednesday" ? "বুধবার" : day === "Thursday" ? "বৃহস্পতিবার" : day === "Friday" ? "শুক্রবার" : day === "Saturday" ? "শনিবার" : "রবিবার"})</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Available Time Section */}
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
                                            name="availableTime"
                                            value={time}
                                            checked={formData.availableTime.includes(time)}
                                            onChange={handleCheckboxChange}
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
                            value={formData.references}
                            onChange={handleChange}
                            name="references"
                            placeholder="Provide names, contact details, and your relationship."
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="aboutYou" className="text-sm font-medium text-gray-700">About Yourself</label>
                        <textarea
                            id="aboutYou"
                            rows="5"
                            value={formData.yourSelf}
                            onChange={handleChange}
                            name="yourSelf"
                            placeholder="Share any additional information about yourself."
                            className="w-full mt-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                </fieldset>








                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                    <button type="submit" onClick={() => console.log(formData)} className="bg-indigo-600 text-white py-2 px-6 rounded-full text-xl">Submit</button>
                </div>
            </form>
        </section>
    );
};

export default BecomeDoctorForm;






