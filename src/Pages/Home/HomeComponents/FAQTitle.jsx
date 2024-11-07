import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import the CSS styles for AOS
import "./FAQTitle.css"; // Your custom CSS (if any)

const FAQTitle = () => {
  // Initialize AOS in the useEffect hook to run after the component mounts
  useEffect(() => {
    AOS.init({
      duration: 2000,   // Animation duration in ms
      once: false,      // Re-trigger animation when scrolling back to the element
      easing: "ease-in-out", // Easing function for smooth animation
      offset: 200, // Offset to trigger animation a bit earlier
    });

    // Reinitialize AOS when the window resizes
    window.addEventListener("resize", AOS.refresh);

    return () => window.removeEventListener("resize", AOS.refresh);
  }, []);

  return (
    <div
      className="relative parallax bg-cover bg-center py-20 h-96"
      style={{
        backgroundImage: "url('./FAQImage.jpg')", // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}

      {/* Title and Description Section */}
      <div className="relative z-10 text-center text-white px-4">
        <h1
          className="text-4xl font-bold mb-4"
          data-aos="fade-up" // Adds "fade-up" animation as you scroll into view
        >
          FAQ
        </h1>

        <p
          className="text-lg md:text-xl font-light max-w-2xl mx-auto text-gray-400"
          data-aos="fade-up"
          data-aos-delay="200" // Delay the animation for the description
        >
          Have questions? We have answers! Browse through our frequently asked questions to find the
          information you need. If you can't find what you're looking for, feel free to contact us!
        </p>
      </div>
    </div>
  );
};

export default FAQTitle;
