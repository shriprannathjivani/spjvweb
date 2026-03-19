
import Aatmadarshan from "@/components/aatmadarshan";
import BooksCarousel from "@/components/books-carousel";
import PrannathCTA from "@/components/cta";
import Earticle from "@/components/e-article";
import Events from "@/components/events";
import Hero from "@/components/hero";
import LiveSessions from "@/components/live-sessions";
import Stats from "@/components/stats";
import ReviewsCarousel from "@/components/reviews";
import QuickLinks from "@/components/quicklinks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Stats/>
      <LiveSessions/>
      <BooksCarousel/>
      <PrannathCTA/>
      <Earticle/>
      <ReviewsCarousel/>
    </>
  );
}
