import React, { useState, useEffect } from "react";
import faqData from "./../../../Component/FileJson/FAQ.json";

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqLimit, setFaqLimit] = useState(5); // Track the number of FAQs to display

  // Handle category toggle
  const toggleCategory = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setFilteredFAQs(faqData);  // Show all FAQs when no category is active
    } else {
      setActiveCategory(category);
      // Filter FAQs by the selected category
      const faqsForCategory = faqData.filter((faq) => faq.category === category);
      setFilteredFAQs(faqsForCategory);
    }
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the FAQs based on both search query and active category
    const filtered = faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
    );
    setFilteredFAQs(filtered);
  };

  // Load more FAQs when "See more" is clicked
  const loadMoreFAQs = () => {
    setFaqLimit(faqLimit + 5); // Show 5 more FAQs each time
  };

  // Render the list of FAQ categories
  const renderCategories = () => {
    const categories = [...new Set(faqData.map(faq => faq.category))]; // Get unique categories
    return categories.map((category) => (
      <div
        key={category}
        className={`p-2 mt-4 cursor-pointer hover:bg-blue-600 transition-colors duration-200 rounded-md ${
          activeCategory === category ? "bg-blue-700" : "bg-gray-200"
        }`}
        onClick={() => toggleCategory(category)}
      >
        <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
      </div>
    ));
  };

  // Render FAQs for the selected category or search results
  const renderFAQs = () => {
    if (filteredFAQs.length === 0) {
      return (
        <div className="text-gray-600 text-center py-4">No results found for your search.</div>
      );
    }

    const displayedFAQs = filteredFAQs.slice(0, faqLimit); // Show FAQs based on faqLimit

    return displayedFAQs.map((faq, index) => (
      <div key={index} className="bg-gray-100 p-6 rounded-lg mb-6 shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
        <p className="mt-2 text-gray-800">{faq.answer}</p>
      </div>
    ));
  };

  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container flex flex-col items-center p-6 mx-auto md:p-12">
       
        {/* Search Bar */}
        <div className="relative mb-8 w-full max-w-md mx-auto ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search FAQs..."
            className="w-full py-3 pl-10 pr-12 text-sm rounded-lg bg-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <span className="absolute inset-y-0 left-3 flex items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 512 512"
              className="w-5 h-5 text-gray-800"
            >
              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
            </svg>
          </span>
        </div>

        {/* Category and FAQ Sections */}
        <div className="flex flex-col sm:flex-row w-full divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
          {/* Category List */}
          <div className="w-full sm:w-1/4 p-4 sm:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
            {renderCategories()}
          </div>

          {/* FAQ List */}
          <div className="w-full sm:w-3/4 pl-4 sm:pl-12 pt-4 sm:pt-8">
            {activeCategory && (
              <div className="text-2xl font-bold text-center text-gray-800 mt-4 mb-6">
                {activeCategory} FAQs
              </div>
            )}
            {renderFAQs()}

            {/* "See more" button if there are more FAQs to show */}
            {filteredFAQs.length > faqLimit && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMoreFAQs}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  See more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
