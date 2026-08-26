import { notFound } from "next/navigation"
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb"
import { gamesList } from "@/lib/gamesnquiz"

export const dynamicParams = false;

export async function generateStaticParams() {
  return gamesList.map((game) => ({
    slug: game.id.toString(),
  }));
}

// Helper function to fetch oEmbed data from Wordwall
async function getWordwallEmbedHtml(playUrl: string) {
  try {
    const oembedUrl = `https://wordwall.net/api/oembed?url=${encodeURIComponent(playUrl)}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) return null;

    const data = await res.json();
    return data.html; // Returns string like "<iframe src='...' width='500' height='380' ...></iframe>"
  } catch (error) {
    console.error("Failed to fetch Wordwall oEmbed:", error);
    return null;
  }
}

export default async function SatguruDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const game = gamesList.find(
    (g) => g.id === Number(slug)
  );

  if (!game) return notFound();

  // Fetch the official embed HTML using the game link
  const embedHtml = await getWordwallEmbedHtml(game.link);

  return (
    <>
      <div className="max-w-370 mx-auto px-4 lg:px-8 py-24 pt-25">
        <DynamicBreadcrumb currentTitle={game.gameName} />

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          <div className="lg:col-span-2 h-full">
            <div className="h-full bg-white rounded-2xl shadow-sm p-4 flex justify-center items-center">
              {embedHtml ? (
                /* Cropping container to hide external iframe banners */
                <div className="w-full h-[calc(100vh-220px)] overflow-hidden relative rounded-2xl">
                  <div
                    className="w-full absolute top-5 left-0 h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                </div>
              ) : (
                /* Fallback cropping container if API fails */
                <div className="w-full h-[calc(100vh-220px)] overflow-hidden relative rounded-2xl">
                  <iframe
                    src={game.link}
                    className="w-full absolute top-5 left-0 h-full bg-white border-0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}