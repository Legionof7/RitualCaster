import { generateFrameHTML } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { addr } = body;
  const searchParams = new URLSearchParams({
    prompt: "You have been granted an NFT.",
  });

  fetch(`https://ritualcaster-thirdweb.vercel.app/mint?addr=${addr}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const mintData = await mintTxn.json();
  // console.log(mintData);

  return new NextResponse(
    generateFrameHTML({
      imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
    })
  );
}
