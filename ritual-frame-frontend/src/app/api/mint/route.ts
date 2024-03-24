import { generateFrameHTML } from "@/actions";
import { init } from "@airstack/airstack-react";
import { validateFramesMessage } from "@airstack/frames";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const body = await req.json();
  const { isValid, message } = await validateFramesMessage(body);

  if (!isValid) {
    const searchParams = new URLSearchParams({
      prompt: "You have not been granted an NFT.",
    });return new NextResponse(
      generateFrameHTML({
        imageSrc: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
      })
    );
  }

  const addr = message?.data?.frameActionBody.address ?? '0x0';
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
