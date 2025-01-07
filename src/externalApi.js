// src/externalApi.js

import axios from 'axios';

class ExternalAPI {
    async fetchPriceFeed() {
        const response = await axios.get('https://api.example.com/price');
        return response.data;
    }

    async fetchNews() {
        const response = await axios.get('https://api.example.com/news');
        return response.data;
    }
}

export default new ExternalAPI();
