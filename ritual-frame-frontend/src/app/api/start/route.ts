import { generateFrameHTML } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return new NextResponse(generateFrameHTML({
    buttons: [{label: "Submit Prayer"}],
    imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/get-started.jpg`,
    inputText: "Enter a prayer to the AI God",
    postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/convince`,
  }));
}