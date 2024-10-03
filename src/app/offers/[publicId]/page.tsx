import { redirect } from "next/navigation";

async function getOffer(publicId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`, {
        // cache: 'force-cache' // Utilise la mise en cache si disponible
    });

    if (!response.ok) {
        redirect('/');
    }

    return await response.json();
}

export default async function OfferPage({ params }: { params: { publicId: string } }) {
    const offer = await getOffer(params.publicId);

    return (
        <div>
            Hello
            <h1 className="font-semibold text-red-700 capitalize">{offer.title}</h1>
        </div>
    );
}