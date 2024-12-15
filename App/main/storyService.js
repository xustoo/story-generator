import axios from 'axios';
const BACKEND_URL = 'http://192.168.20.169:5000';  // Replace with your computer's IP

const fake_BACKEND_URL = 'http://localhost:3000/api/stories';

export const generateStory = async (keywords) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/generate`, { keywords });
    return response.data.story;
  } catch (error) {
    console.error("Error generating story:", error.response || error.message || error);
    throw error;
  }
};
