"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    publishedAt: "",
  });
  const router = useRouter();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const newsResponse = await fetch("/api/news");
      const newsData = await newsResponse.json();
      setNews(newsData);
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit for create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id ? "/api/news" : "/api/news";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedNewsResponse = await fetch("/api/news");
      const updatedNewsData = await updatedNewsResponse.json();
      setNews(updatedNewsData); // Update the news state
      setFormData({
        id: "",
        title: "",
        description: "",
        image: "",
        publishedAt: "",
      }); // Clear the form
    } else {
      alert("Error saving news");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const response = await fetch("/api/news", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setNews(news.filter((item) => item.id !== id));
    } else {
      alert("Error deleting news");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-4xl font-extrabold text-center mb-10">
        Admin - Manage News
      </h2>

      {/* News Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="date"
          name="publishedAt"
          value={formData.publishedAt}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save News
        </button>
      </form>

      {/* News List as Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border text-left">Description</th>
              <th className="px-4 py-2 border text-left">Image</th>
              <th className="px-4 py-2 border text-left">Published Date</th>
              <th className="px-4 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setFormData(item)}
                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNews;
