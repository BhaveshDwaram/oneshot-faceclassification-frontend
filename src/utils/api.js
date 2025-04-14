// src/utils/api.js
const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
  try {
    const formData = new FormData();
    
    // Convert base64 image to blob
    const base64Data = userData.image.split(',')[1];
    const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());
    
    // Append image and user data
    formData.append('face_image', blob, 'face.jpg');
    formData.append('user_id', userData.userId);
    formData.append('name', `${userData.firstName} ${userData.lastName}`);
    formData.append('email', userData.email);
    formData.append('phone', userData.phone);

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const markAttendance = async (imageBlob) => {
  try {
    const formData = new FormData();
    formData.append('face_image', imageBlob, 'face.jpg');

    const response = await fetch(`${API_URL}/mark-attendance`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Attendance marking failed');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Attendance marking failed');
  }
};
