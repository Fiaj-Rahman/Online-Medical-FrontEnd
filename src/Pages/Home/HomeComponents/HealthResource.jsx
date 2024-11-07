import React, { useState } from "react";

const HealthResource = () => {
  // State for BMI calculation
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState(''); // Height in feet
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [idealWeight, setIdealWeight] = useState('');

  // BMI ক্যালকুলেট ফাংশন
  const calculateBMI = () => {
    if (weight > 0 && heightFeet > 0) {
      const heightInMeters = heightFeet * 0.3048;  // Convert height from feet to meters
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      // BMI শ্রেণীবিভাগ এবং আদর্শ ওজন নির্ধারণ
      if (bmiValue < 18.5) {
        setCategory('Underweight');
        setIdealWeight(`Your ideal weight should be between ${(18.5 * heightInMeters * heightInMeters).toFixed(2)} kg and ${(24.9 * heightInMeters * heightInMeters).toFixed(2)} kg.`);
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setCategory('Normal weight');
        setIdealWeight(`Your weight is ideal. Keep it between ${(18.5 * heightInMeters * heightInMeters).toFixed(2)} kg and ${(24.9 * heightInMeters * heightInMeters).toFixed(2)} kg.`);
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setCategory('Overweight');
        setIdealWeight(`Your ideal weight should be between ${(18.5 * heightInMeters * heightInMeters).toFixed(2)} kg and ${(24.9 * heightInMeters * heightInMeters).toFixed(2)} kg.`);
      } else {
        setCategory('Obesity');
        setIdealWeight(`Your ideal weight should be between ${(18.5 * heightInMeters * heightInMeters).toFixed(2)} kg and ${(24.9 * heightInMeters * heightInMeters).toFixed(2)} kg.`);
      }
    } else {
      alert('Please enter valid values for weight and height');
    }
  };

  return (
    <div className="py-10 bg-gray-100">
      {/* Title */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold leading-none text-center mb-8 text-gray-800">Health Resources</h1>
      </div>

      <div className="flex flex-wrap justify-between p-8">
        {/* Left Side: BMI Calculator */}
        <div className="w-full md:w-1/2 p-6 bg-white shadow-xl rounded-lg overflow-hidden transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">BMI Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Height (feet):</label>
              <input
                type="number"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height in feet"
              />
            </div>
            <button
              onClick={calculateBMI}
              className="w-full p-4 mt-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform transition-all"
            >
              Calculate BMI
            </button>

            {bmi && (
              <div className="mt-6 text-center text-gray-800">
                <h3 className="text-2xl font-semibold">Your BMI: {bmi}</h3>
                <p className="text-lg mt-2">Category: <span className="font-semibold text-blue-600">{category}</span></p>
                <p className="mt-4 text-gray-600">{idealWeight}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: YouTube Video */}
        <div className="w-full md:w-1/2 p-6  rounded-lg overflow-hidden transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Learn about BMI</h2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/QIsWHKFTA4M?si=1Bd9Gb_arfGMZQwA" // Replace with your video URL
            title="BMI Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HealthResource;
