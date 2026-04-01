exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const INTASEND_KEY = 'ISPubKey_live_8255467f-3a20-4f9e-98a3-8f68edcc090c';

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://payment.intasend.com/api/v1/payment/status/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IntaSend-Public-Key': INTASEND_KEY
      },
      body: JSON.stringify({ invoice_id: body.invoice_id })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
