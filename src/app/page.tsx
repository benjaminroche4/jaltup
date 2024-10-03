import OffersList from "@/components/offers-list";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {Navbar} from "@/components/navbar";

export default async function Home() {
  return (
      <main>
          <Navbar/>
          <ModeToggle/>
          <OffersList/>
      </main>
  );
}
