import { generateFrameHTML } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return new NextResponse(generateFrameHTML({
    label: "Submit",
    imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/get-started.jpg`,
    inputText: "Convince Ritual AI to mint NFT!",
    postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/convince`,
  }));
}