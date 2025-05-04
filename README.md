# Express Activity Demo

A simple Express.js application that demonstrates how to submit activity data and display API responses.

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/express-activity-demo.git
   cd express-activity-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Features

- Simple Express.js server setup
- EJS templating for the frontend
- API endpoint for activity submission
- Clean, responsive UI

## API Documentation

### Submit Activity

Submits an activity payload to the server.

**Endpoint:** `POST /api/activity`

**Request Body:** None required (payload is generated server-side)

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "user123",
    "session_id": "session456",
    "activity_id": "Demo Activity",
    "rendering_type": "inline",
    "type": "submit_practice",
    "name": "Demo",
    "config": {
      "regions": "main"
    },
    "items": [
      "MANGA-DEMO-1",
      "MANGA-DEMO-2",
      "MANGA-DEMO-4",
      "MANGA-DEMO-5"
    ]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message details"
}
```

## Configuration

The application uses a simple configuration object in `app.js`:

```javascript
const config = {
  userId: 'user123',
  sessionId: 'session456'
};
```

In a production environment, you would typically load these values from environment variables or a configuration file.

## Extending the Application

### Adding Real API Integration

To connect to a real API, modify the `/api/activity` route in `app.js`:

```javascript
const axios = require('axios');

app.post('/api/activity', async (req, res) => {
  try {
    const payload = {
      user_id: config.userId,
      session_id: config.sessionId,
      activity_id: "Demo Activity",
      rendering_type: "inline",
      type: "submit_practice",
      name: "Demo",
      config: { regions: "main" },
      items: ["MANGA-DEMO-1", "MANGA-DEMO-2", "MANGA-DEMO-4", "MANGA-DEMO-5"]
    };
    
    // Make the actual API call
    const response = await axios.post('https://your-api-endpoint.com/activity', payload);
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Adding Authentication

To add basic authentication:

1. Install passport:
   ```
   npm install passport passport-local
   ```

2. Implement authentication in your app.js file.

## License

MIT
