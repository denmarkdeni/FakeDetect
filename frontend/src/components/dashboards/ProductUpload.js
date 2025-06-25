import React, { useState, useRef } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image);

    axios
      .post("http://127.0.0.1:8000/api/seller/product/", formDataToSend, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSuccess(true);
        setError("");
        setFormData({
          name: "",
          brand: "",
          description: "",
          price: "",
          category: "",
          image: null,
        });

        // ✅ Clear the file input manually
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch((err) => {
        setError("Failed to upload product. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-form p-8 rounded-form shadow-md max-w-lg margin-lt">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Upload Product</h2>

        {success && (
          <p className="text-green-600 mb-4 text-center">Product uploaded successfully!</p>
        )}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-blue">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-blue">Brand (optional)</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-blue">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="text-white bg-form w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-blue">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-blue">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-blue">Product Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              ref={fileInputRef}
              accept="image/*"
              className="text-white w-full mt-1 p-2 border rounded-md "
            />
          </div><br />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProductUpload;
