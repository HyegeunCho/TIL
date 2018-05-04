const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'html', 'main.html'));	
});

router.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'html', 'about.html'));	
});

module.exports = router;