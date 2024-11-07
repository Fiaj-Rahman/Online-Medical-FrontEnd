import React, { useEffect, useState } from 'react';
import blogsData from '../../../Component/FileJson/Blog.json'; // Adjust the path if necessary

const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Display the latest 4 posts
    const latestBlogs = blogsData.slice(0, 4);
    setBlogs(latestBlogs);
  }, []);

  return (
    <section className="py-12 bg-gray-100 text-gray-800">
      <div className="container p-6 mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-gray-900">Latest Blog Articles</h2>
          <p className="font-serif text-lg text-gray-700">Stay updated with the latest insights and tips.</p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map(blog => (
            <article key={blog.id} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <a rel="noopener noreferrer" href="#" aria-label={blog.title}>
                <img alt={blog.title} className="object-cover w-full h-52 bg-gray-500" src={blog.image} />
              </a>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center mb-4">
                  <img src={blog.userImage} alt={blog.username} className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300" />
                  <span className="text-sm font-semibold text-gray-700">{blog.username}</span>
                </div>
                <a rel="noopener noreferrer" href="#" aria-label={blog.title}></a>
                <a rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase text-violet-400 hover:underline">{blog.category}</a>
                <h3 className="flex-1 py-2 text-xl font-semibold leading-snug text-gray-900">{blog.title}</h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-500">
                  <span>{blog.date}</span>
                  <span>{`${Math.floor(Math.random() * 3000) + 1000} views`}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
