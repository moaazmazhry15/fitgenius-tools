
import { serve } from "https://deno.fresh.runtime.dev";

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
    const { name, email, date, time, notes } = await req.json();

    // Forward the data to n8n webhook
    const n8nResponse = await fetch(
      'https://kabeeryosaf.app.n8n.cloud/webhook-test/1cc6c5d0-72a5-4fbd-93fd-daf5d4c08ae1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, date, time, notes }),
      }
    );

    if (!n8nResponse.ok) {
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
      JSON.stringify({ error: 'Failed to process meeting request' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
