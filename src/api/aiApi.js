import axios from 'axios';
import { APP } from '../constants/appConstants';

const BASE_URL = `${APP.API_BASE_URL}/api/ai`;

const aiApi = {

  // Send a message and get AI response
  // conversationHistory maintains multi-turn context
  chat: async (message, conversationHistory = []) => {
    const response = await axios.post(`${BASE_URL}/chat`, {
      message,
      conversationHistory
    });
    return response.data;
  },

  // Get personalized suggestions based on user's expense history
  getSuggestions: async () => {
    const response = await axios.get(`${BASE_URL}/suggestions`);
    return response.data;
  },

  // Analyze spending against user-defined budget goals
  analyzeBudget: async (budgetData) => {
    const response = await axios.post(`${BASE_URL}/analyze-budget`, budgetData);
    return response.data;
  }
};

export default aiApi;