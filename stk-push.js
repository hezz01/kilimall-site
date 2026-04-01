exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const INTASEND_KEY = 'ISPubKey_live_8255467f-3a20-4f9e-98a3-8f68edcc090c';

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://payment.intasend.com/api/v1/payment/mpesa-stk-push/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-IntaSend-Public-Key': INTASEND_KEY
      },
      body: JSON.stringify({
        amount: body.amount,
        phone_number: body.phone_number,
        currency: 'KES',
        comment: 'Kilimall Branch Order',
        email: body.email || 'customer@kilimall.co.ke',
        first_name: body.first_name || 'Customer',
        last_name: body.last_name || ''
      })
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
