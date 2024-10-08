import OffersList from "@/components/offers-list";
import {Navbar} from "@/components/navbar";

export default async function Home() {
  return (
      <main>
          <Navbar/>
          <OffersList/>
      </main>
  );
}
