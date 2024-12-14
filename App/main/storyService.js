import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api/stories';

export const generateStory = async (keywords) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/generate`, { keywords });
    return response.data.story;
  } catch (error) {
    console.error("Hikaye oluşturma sırasında hata:", error);
    throw error;
  }
};
