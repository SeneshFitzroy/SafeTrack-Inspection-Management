import axios from 'axios';

// Set up OpenAI API configuration
const openaiAPI = {
  baseURL: 'https://api.openai.com/v1',
  model: 'gpt-3.5-turbo',
  
  // Create a client with API key from environment variables
  createClient() {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('No OpenAI API key found in environment variables');
      throw new Error('OpenAI API key is not configured');
    }
    
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: 30000 // 30 second timeout
    });
  },
  
  // Send a chat completion request
  async sendChatMessage(messages) {
    try {
      const client = this.createClient();
      
      const response = await client.post('/chat/completions', {
        model: this.model,
        messages,
        temperature: 0.7,
      });
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  },
  
  // Test the API connection
  async testConnection() {
    try {
      const client = this.createClient();
      
      const response = await client.post('/chat/completions', {
        model: this.model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Hello" }
        ],
        max_tokens: 10
      });
      
      return response.status === 200;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
};

export default openaiAPI;
