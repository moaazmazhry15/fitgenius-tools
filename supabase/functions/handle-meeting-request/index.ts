
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('Received request data:', requestData);

    // Forward the data to n8n webhook
    const n8nResponse = await fetch(
      'https://kabeeryosaf.app.n8n.cloud/webhook-test/get-in-touch',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!n8nResponse.ok) {
      console.error('n8n webhook failed:', {
        status: n8nResponse.status,
        statusText: n8nResponse.statusText,
      });
      throw new Error(`n8n webhook failed with status ${n8nResponse.status}`);
    }

    console.log('Successfully sent data to n8n webhook');
    
    return new Response(
      JSON.stringify({ message: 'Meeting request processed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing meeting request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process meeting request',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
