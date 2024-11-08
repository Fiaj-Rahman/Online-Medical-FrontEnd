import React from "react";

const BecomeDoctorBanner = () => {
  return (
    <div className="bg-gray-100">
      {/* First Section (Banner with Background Image) */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] ">
        {/* Background image and content */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-b-full"
          style={{ backgroundImage: "url('becomeDoctor.jpg')", border:"rounded-b-full" }}
        >
          <div className="flex justify-center items-center w-full h-full bg-black bg-opacity-50 rounded-b-full">
            <div className="text-center text-white px-6 md:px-12 rounded-b-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Become an Online Medical Doctor
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6">
                Join the rapidly growing field of telemedicine and make a difference in healthcare from anywhere.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg md:text-xl rounded-md hover:bg-blue-700 transition duration-300">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section (Reasons to Start) */}
      <div className="py-16 px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            So Many Reasons to Start
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Here are some of the great reasons why you should become an online medical doctor today.
          </p>
        </div>

        {/* Reasons List (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/fcd6159d-c9ee-433f-9a06-dbbd93bd2244/r9EmzYdkWx.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Work from Anywhere</h3>
            <p className="text-gray-700">
              Enjoy the flexibility of working from home, or anywhere in the world. Your patients can be anywhere, and so can you.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/cf943fab-486c-4896-9ea6-6073b49fd0ab/IkZr8vqwLP.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Expand Your Patient Reach</h3>
            <p className="text-gray-700">
              Connect with patients in different locations, even internationally. Your expertise can have a broader impact.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/2e5184e5-1bfc-4dad-9e2a-ea76b8ff73ef/7iTZ8JD5JZ.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Set Your Own Schedule</h3>
            <p className="text-gray-700">
              Have full control over your working hours. Choose when and how much you work, so you can have the perfect work-life balance.
            </p>
          </div>

          {/* Reason 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/cf943fab-486c-4896-9ea6-6073b49fd0ab/IkZr8vqwLP.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Competitive Earnings</h3>
            <p className="text-gray-700">
              Enjoy competitive compensation while doing what you love. Many online medical doctors earn more than traditional in-office doctors.
            </p>
          </div>

          {/* Reason 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/fcd6159d-c9ee-433f-9a06-dbbd93bd2244/r9EmzYdkWx.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Make a Difference</h3>
            <p className="text-gray-700">
              Provide high-quality healthcare to underserved communities and help those who may not have easy access to traditional healthcare services.
            </p>
          </div>

          {/* Reason 6 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            <div className="text-indigo-600 text-5xl mb-4">
            <iframe src="https://lottie.host/embed/cf943fab-486c-4896-9ea6-6073b49fd0ab/IkZr8vqwLP.json"></iframe>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Embrace the Future of Medicine</h3>
            <p className="text-gray-700">
              Telemedicine is the future of healthcare. By becoming an online doctor, you’re joining an innovative field that’s revolutionizing the medical industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeDoctorBanner;
