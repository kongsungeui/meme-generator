import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { memeName, textBoxCount } = await req.json();

    if (!memeName || !textBoxCount) {
      return NextResponse.json(
        { error: "memeName and textBoxCount are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 500 }
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

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error generating meme text:", error);
    return NextResponse.json(
      { error: "Failed to generate meme text suggestions" },
      { status: 500 }
    );
  }
}
