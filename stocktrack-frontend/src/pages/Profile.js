import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { auth } = useContext(AuthContext);
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    if (auth.token) {
      fetchProfileData();
    }
  }, [auth.token]); // Fetch profile data when token changes

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL 
      ? process.env.REACT_APP_API_URL 
      : (window.location.origin.includes('localhost') 
          ? 'http://localhost:8000' 
          : 'https://stocktrack-react.onrender.com');
      const response = await axios.get(`${apiUrl}/api/user/${userId}/`, {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      });

      const { first_name, last_name, email } = response.data;
      setFormData({
        firstName: first_name,
        lastName: last_name,
        email: email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL 
      ? process.env.REACT_APP_API_URL 
      : (window.location.origin.includes('localhost') 
          ? 'http://localhost:8000' 
          : 'https://stocktrack-react.onrender.com');

      const response = await axios.put(`${apiUrl}/api/user/${userId}/update/`, formData, {
        headers: {
          'Authorization': `Token ${auth.token}`
        }
      });

      console.log('Profile updated:', response.data);
      setIsEditing(false); // Close the edit form after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword === formData.confirmPassword) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL 
        ? process.env.REACT_APP_API_URL 
        : (window.location.origin.includes('localhost') 
            ? 'http://localhost:8000' 
            : 'https://stocktrack-react.onrender.com');

        const response = await axios.put(`${apiUrl}/api/user/${userId}/update/`, formData, {
          headers: {
            'Authorization': `Token ${auth.token}`
          }
        });

        console.log('Password updated:', response.data);
        setIsChangingPassword(false);
      } catch (error) {
        console.error('Error changing password:', error);
      }
    } else {
      console.error('Passwords do not match');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    const apiUrl = process.env.REACT_APP_API_URL
      ? process.env.REACT_APP_API_URL
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8000'
      : 'https://stocktrack-react.onrender.com';

    try {
      const response = await axios.delete(`${apiUrl}/api/user/${userId}/delete/`, {
        headers: { Authorization: `Token ${auth.token}` },
      });
      if (response.status === 204) {
        alert('Account deleted successfully. Redirecting to login.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gray-800 rounded-2xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-8 pb-8">
            <div className="pt-5">
              <h1 className="text-2xl font-bold text-white">
                {formData.firstName} {formData.lastName}
              </h1>
              <p className="text-gray-400">{formData.email}</p>
            </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-white">{formData.email}</p>
                )}
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Password Change */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isChangingPassword ? 'Cancel' : 'Change'}
            </button>
          </div>

          {isChangingPassword ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
            </form>
          ) : (
            <p className="text-gray-400">
              Click 'Change' to update your password.
            </p>
          )}
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Danger Zone</h2>
          <div className="space-y-4">
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
