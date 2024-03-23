import { generateFrameHTML } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const searchParams = new URLSearchParams({
        prompt: "You have minted successfully!",
      });

    return new NextResponse(generateFrameHTML({
        imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
    }))
}