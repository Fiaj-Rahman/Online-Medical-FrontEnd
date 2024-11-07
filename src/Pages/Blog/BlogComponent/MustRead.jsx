import React from "react";
import blogData from './../../../Component/FileJson/Blog.json'; // Adjust path as needed

const MustRead = () => {
  // Sort the blog data by views in descending order and slice to get top 4
  const sortedBlogs = [...blogData]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4); // Get top 4 blogs with highest views

  return (
    <div className="bg-gray-100 dark:text-gray-800 py-6 sm:py-12">
      <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">Must Read Blogs</h2>

        {/* Top 4 Most Viewed Blogs */}
        <div className="space-y-8">
          {sortedBlogs.map((blog) => (
            <div key={blog.id} className="bg-gray-200 dark:bg-gray-800 text-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-6">
                <span className="text-sm dark:text-gray-600">{blog.date}</span>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="px-2 py-1 font-bold rounded dark:bg-violet-600 dark:text-gray-50"
                >
                  {blog.category}
                </a>
              </div>

              <div className="mt-3 px-6">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-2xl font-bold hover:underline"
                >
                  {blog.title}
                </a>
                <p className="mt-2">{blog.description}</p>
              </div>

              <div className="flex items-center justify-between mt-4 p-6">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline dark:text-violet-600"
                >
                  Read more
                </a>

                <div>
                  <a rel="noopener noreferrer" href="#" className="flex items-center">
                    <img
                      src={blog.userImage} // User image from the JSON data
                      alt="avatar"
                      className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"
                    />
                    <span className="hover:underline dark:text-gray-600">{blog.username}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MustRead;
