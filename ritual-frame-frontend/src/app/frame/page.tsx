import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Convince Ritual AI to mint NFT!",
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/get-started.jpg`,
  },
  postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/start`,
});

export const metadata: Metadata = {
  title: "Advanced Frame",
  description: "Another, more advanced frame example",
  openGraph: {
    title: "Advanced Frame",
    description: "Another, more advanced frame example",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Advanced Frame</h1>
    </>
  );
}
