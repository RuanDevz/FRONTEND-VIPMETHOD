import React, { useState } from "react";
import axios from "axios";

const RecommendContent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("Token");
  const email = localStorage.getItem("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar a recomendação para a API
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/recommendations`,
        {
          title,
          description,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setTitle("");
      setDescription("");

      
      window.location.reload();  
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      setMessage("There was an error submitting your recommendation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Recommend Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
            placeholder="Enter the content title"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mt-1 border rounded"
            placeholder="Enter a brief description of the content"
          ></textarea>
        </div>
        {message && <p className="text-sm text-red-500">{message}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Recommendation"}
        </button>
      </form>
    </div>
  );
};

export default RecommendContent;
