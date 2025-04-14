// src/utils/helpers.js
export const generateUniqueId = () => {
    // Generate a 7-digit unique ID
    return Math.floor(1000000 + Math.random() * 9000000).toString();
  };
  
  export const dataURLtoBlob = async (dataUrl) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
