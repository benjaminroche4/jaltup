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
        <main>
            <div className="px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-5 border border-gray-200 flex justify-between">
                <div>
                    <h1 className="text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {offer.title}
                    </h1>
                </div>
                <div>
                    <p>Offre premium</p>
                </div>
            </div>
        </main>
    );
}