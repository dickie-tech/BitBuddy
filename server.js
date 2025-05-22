const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getTogetherResponse } = require('./services/together-api'); // ✅ Updated import

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route for Together AI chatbot
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const reply = await getTogetherResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error('Together API error:', error.message);
    res.status(500).json({ error: 'Failed to get response from Together AI' });
  }
});

// Serve static frontend files (if any)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
