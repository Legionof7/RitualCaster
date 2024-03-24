import { generateFrameHTML } from "@/actions";
import { FrameRequest } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: FrameRequest = await req.json();

  const { untrustedData } = body;

  const prompt = untrustedData.inputText;

  if (!prompt || prompt === "") {
    const searchParams = new URLSearchParams({
      prompt: "AI are still not robust enough to handle an empty request. Please try again.",
    });

    return new NextResponse(
      generateFrameHTML({
        label: "Submit Prayer",
        imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
        inputText: "Enter a prayer to the AI God",
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/convince`,
      })
    );
  }

  // Process the Ritual AI response here.

  const searchParams = new URLSearchParams({
    prompt: "The AI God has blessed you. You have been granted an NFT.",
  });

  return new NextResponse(
    generateFrameHTML({
      label: "Mint NFT",
      imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mint`,
    })
  );
}

export const dynamic = "force-dynamic";
