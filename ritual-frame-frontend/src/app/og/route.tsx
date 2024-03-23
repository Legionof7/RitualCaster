import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasPrompt = searchParams.has("prompt");
    const prompt = hasPrompt ? searchParams.get("prompt") : "Default";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
            fontSize: 80,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ritual-frame-nextjs.vercel.app/assets/pfp.jpg"
            alt="hey"
            height={24}
            width={24}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "20vh",
              height: "20vh",
              marginRight: "5rem",
              borderRadius: "20rem",
              backgroundColor: "gray",
            }}
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "auto",
              minWidth: "45vw",
              maxWidth: "50vw",
              height: "auto",
              minHeight: "20vh",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem",
              paddingLeft: "4.5rem",
              paddingRight: "4.5rem",
              borderRadius: "7.5rem",
              fontSize: "4rem",
              color: "white",
              wordBreak: "break-word",
              textAlign: "left",
              backgroundColor: "rgb(8, 127, 254)",
            }}
          >
            {prompt}
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
