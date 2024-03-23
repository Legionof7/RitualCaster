import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  getPreviousFrame,
  useFramesReducer,
  validateActionSignature,
} from "frames.js/next/server";
import type { Metadata } from "next";

// const frameMetadata = getFrameMetadata({
//   buttons: [
//     {
//       label: "Convince Ritual AI to mint NFT!",
//     },
//   ],
//   image: {
//     src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/get-started.jpg`,
//   },
//   postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/start`,
// });

export const metadata: Metadata = {
  title: "Advanced Frame",
  description: "Another, more advanced frame example",
  openGraph: {
    title: "Advanced Frame",
    description: "Another, more advanced frame example",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/site-preview.jpg`],
  },
  // other: {
  //   ...frameMetadata,
  // },
};

const reducer: FrameReducer = (state, action) => ({});

export default async function Page(props: any) {
  const previousFrame = getPreviousFrame(props.searchParams);
  await validateActionSignature(previousFrame.postBody);
  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame
  );

  return (
    <FrameContainer
      postUrl="/api/start"
      pathname={`${process.env.NEXT_PUBLIC_SITE_URL}`}
      state={state}
      previousFrame={previousFrame}
    >
      <FrameImage
        src={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/get-started.jpg`}
      />
      {/* <FrameInput text="NA" /> */}
      <FrameButton>Convince Ritual AI to mint NFT!</FrameButton>
    </FrameContainer>
  );
}
