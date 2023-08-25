const express = require("express")
const router = express.Router()
const axios = require("axios");

router.get('/generate', async (req, res) => {
    const optionsMaster = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        audience: process.env.AUDIENCE,
        client_id: process.env.CARTO_CLIENT_ID,
        client_secret: process.env.CARTO_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
      method: 'POST',
      url: 'https://auth.carto.com/oauth/token',
    };
  
    try {
      const response = await axios(optionsMaster);
      const result = response.data;
      const accessToken = result.access_token;
      res.json({ token: accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });