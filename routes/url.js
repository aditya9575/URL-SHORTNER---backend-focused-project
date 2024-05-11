const express = require('express');

const {handleGenerateNewShortURL,handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

// defining our routes 
router.post("/" , handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

