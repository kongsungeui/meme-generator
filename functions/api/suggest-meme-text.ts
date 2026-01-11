import Anthropic from "@anthropic-ai/sdk";

interface Env {
  ANTHROPIC_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { memeName, textBoxCount } = await context.request.json();

    if (!memeName || !textBoxCount) {
      return new Response(
        JSON.stringify({ error: "memeName and textBoxCount are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = context.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const anthropic = new Anthropic({
      apiKey,
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a programmer humor meme expert. Generate funny programming-related text for the "${memeName}" meme template.

Rules:
- This meme has ${textBoxCount} text boxes
- Focus on programmer humor, software development jokes, coding situations, tech culture
- Keep each text short and punchy (max 10-12 words per text)
- Make it relevant to the "${memeName}" meme format
- Be creative and funny!

Respond with ONLY a JSON array of ${textBoxCount} strings, nothing else. Example format:
["First text", "Second text", "Third text"]`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    // Parse the JSON response from Claude
    let suggestions = JSON.parse(content.text);

    if (!Array.isArray(suggestions) || suggestions.length !== textBoxCount) {
      throw new Error("Invalid response format from Claude");
    }

    // Special handling for Distracted Boyfriend meme - swap text 1 and 2
    if (memeName.toLowerCase().includes("distracted boyfriend") && suggestions.length >= 2) {
      [suggestions[0], suggestions[1]] = [suggestions[1], suggestions[0]];
    }

    // Special handling for Epic Handshake meme - swap text 1 and 3
    if (memeName.toLowerCase().includes("epic handshake") && suggestions.length >= 3) {
      [suggestions[0], suggestions[2]] = [suggestions[2], suggestions[0]];
    }

    return new Response(JSON.stringify({ suggestions }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating meme text:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate meme text suggestions" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
