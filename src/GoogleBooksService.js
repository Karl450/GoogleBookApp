import axios from 'axios';

const API_KEY = 'AIzaSyBPzvXGaZAFSyZKVHtWuQ-iXShnd1YYt3E'; // Replace with your API key
const BASE_URL = 'https://www.googleapis.com/books/v1';

export const searchBooks = async (query, maxResults = 10, startIndex = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};
