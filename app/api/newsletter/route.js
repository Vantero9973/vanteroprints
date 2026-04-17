// Uses Resend — install with: npm install resend
// Get API key at resend.com, add to .env.local as RESEND_API_KEY

export async function POST(req) {
  const { email } = await req.json();
  if (!email)
    return Response.json({ error: "Email required" }, { status: 400 });

  try {
    // Uncomment when Resend is set up:
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({ email, audienceId: 'your-audience-id' })

    console.log("Newsletter signup:", email);
    return Response.json({ success: true });
  } catch (err) {
    console.error("Newsletter error:", err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
