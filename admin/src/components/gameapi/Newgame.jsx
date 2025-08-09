import React, { useState, useRef, useEffect } from 'react';
import { FaCheck, FaEdit, FaHeart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../common/Header';

const Newgame = () => {
  const [formData, setFormData] = useState({
    gameName: '',
    providerName: '',
    gameId: '',
    category: '',
    imagePreview: null,
    imageFile: null
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axios.get(`${base_url}/admin/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#FF3333',
            color: '#fff',
          },
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [base_url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: 'Only JPG, PNG, or GIF images are allowed'
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: 'Image size must be less than 5MB'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imagePreview: reader.result,
          imageFile: file
        });
        // Clear image error if any
        if (errors.image) {
          setErrors({
            ...errors,
            image: null
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.gameName.trim()) {
      errors.gameName = 'Game name is required';
    }
    if (!formData.providerName.trim()) {
      errors.providerName = 'Provider name is required';
    }
    if (!formData.gameId.trim()) {
      errors.gameId = 'Game ID is required';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    if (!formData.imageFile) {
      errors.image = 'Game image is required';
    }
    return errors;
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('gameName', formData.gameName);
      formDataToSend.append('providerName', formData.providerName);
      formDataToSend.append('gameId', formData.gameId);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('image', formData.imageFile);

      // Make POST request to your backend API
      const response = await axios.post(`${base_url}/admin/games/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show success toast
      toast.success('Game added successfully!', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      });

      // Reset form after successful submission
      setFormData({
        gameName: '',
        providerName: '',
        gameId: '',
        category: '',
        imagePreview: null,
        imageFile: null
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding game:', error);
      
      let errorMessage = 'Failed to add game';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Validation error';
        } else if (error.response.status === 409) {
          errorMessage = 'Game with this ID already exists';
        }
      }

      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF3333',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-bai bg-gray-100 min-h-screen">
      <Header />
      <Toaster />
      <section className="p-4 w-full mx-auto">
        <div className="bg-white rounded-lg border-[1px] border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Game</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Game Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gameName">
                  Game Name *
                </label>
                <input
                  className={` appearance-none  rounded w-full py-3 border-[1px] border-gray-300 px-3 text-gray-700 leading-tight  outline-blue-600 ${
                    errors.gameName ? 'border-red-500' : ''
                  }`}
                  id="gameName"
                  name="gameName"
                  type="text"
                  placeholder="Enter game name"
                  value={formData.gameName}
                  onChange={handleChange}
                />
                {errors.gameName && (
                  <p className="text-red-500 text-xs italic">{errors.gameName}</p>
                )}
              </div>

              {/* Provider Name */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="providerName">
                  Provider Name *
                </label>
                <input
                  className={`appearance-none  rounded w-full py-3 border-[1px] border-gray-300 px-3 text-gray-700 leading-tight  outline-blue-600 ${
                    errors.providerName ? 'border-red-500' : ''
                  }`}
                  id="providerName"
                  name="providerName"
                  type="text"
                  placeholder="Enter provider name"
                  value={formData.providerName}
                  onChange={handleChange}
                />
                {errors.providerName && (
                  <p className="text-red-500 text-xs italic">{errors.providerName}</p>
                )}
              </div>

              {/* Game ID */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gameId">
                  Game ID *
                </label>
                <input
                  className={`appearance-none  rounded w-full py-3 border-[1px] border-gray-300 px-3 text-gray-700 leading-tight  outline-blue-600 ${
                    errors.gameId ? 'border-red-500' : ''
                  }`}
                  id="gameId"
                  name="gameId"
                  type="text"
                  placeholder="Enter game ID"
                  value={formData.gameId}
                  onChange={handleChange}
                />
                {errors.gameId && (
                  <p className="text-red-500 text-xs italic">{errors.gameId}</p>
                )}
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category *
                </label>
                <select
                  className={`appearance-none  rounded w-full py-3 border-[1px] border-gray-300 px-3 text-gray-700 leading-tight outline-blue-600 ${
                    errors.category ? 'border-red-500' : ''
                  }`}
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loadingCategories}
                >
                  <option value="">{loadingCategories ? 'Loading categories...' : 'Select a category'}</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs italic">{errors.category}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Game Image *
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {formData.imagePreview ? (
                      <div className="relative">
                        <img
                          src={formData.imagePreview}
                          alt="Game preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                        >
                          <AiOutlineEdit size={14} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500"
                        onClick={triggerFileInput}
                      >
                        <span className="text-gray-500 text-sm">Upload Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Recommended size: 300x300px
                      <br />
                      Formats: JPG, PNG, GIF
                      <br />
                      Max size: 5MB
                    </p>
                    {errors.image && (
                      <p className="text-red-500 text-xs italic mt-2">{errors.image}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline flex items-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Add Game'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Newgame;