// Netlify serverless function to proxy guest pass submissions
// This bypasses CORS restrictions by making the API call server-side

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Forward the request to CityFitness API
    const response = await fetch('https://kiosk.cityfitness.co.nz/kiosk/guestaccessform', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: event.body
    });

    // Get response text
    const responseText = await response.text();
    
    console.log('CityFitness API Response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    });

    // Return the response from CityFitness
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: responseText
    };

  } catch (error) {
    console.error('Error calling CityFitness API:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to submit guest pass',
        message: error.message 
      })
    };
  }
};
