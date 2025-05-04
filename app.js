const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const Learnosity = require('learnosity-sdk-nodejs');

const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Config (in a real app, this would be in a separate file)
const config = {
  graderId: 'b70cc674-9e06-4405-b326-3de3fd9450b3',
  graderSessionId: '5b2c168d-6873-434b-9cd4-d4cb97e287b2',
  consumerKey: 'yis0TYCu7U9V4o7M',
  consumerSecret: '74c5fd430cf1242a527f6223aebd42d30464be22',
  items: ['MANGA-DEMO-1'],
};

// Routes
app.get('/', (req, res) => {
  res.render('index');
});


// API endpoint to generate signed request
app.post('/sign-request', (req, res) => {
  try {
    const { consumerKey, consumerSecret, graderId, graderSessionId } = config;
    
    // Create assessment config
    const assessmentConfig = {
      user_id: graderId,
      session_id: graderSessionId,
      activity_id: "Demo Activity",
      rendering_type: "inline",
      type: "submit_practice",
      name: "Demo",
      config: {
        regions: "main",
      }
    };
    
    // Instantiate the SDK
    const learnositySdk = new Learnosity();
    
    // Generate the signed request
    const signedRequest = learnositySdk.init(
      'items',
      {
        consumer_key: consumerKey,
        domain: req.hostname || 'localhost',
      },
      consumerSecret,
      assessmentConfig
    );
    
    // Return the signed request to the client
    res.json({ success: true, signedRequest });
  } catch (error) {
    console.error('Error generating signed request:', error);
    res.status(500).json({ success: false, error: error.message });
  }
  
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});