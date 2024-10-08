import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Bookmark, MapPin, Star, TimerReset} from "lucide-react";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import { differenceInDays } from 'date-fns';
import * as React from "react";
import {Badge} from "@/components/ui/badge";

type Offer = {
    publicId: string,
    title: string,
    place: Place,
    dayLast: number,
    company: Company,
    job: job,
    slug: string,
    createdAt: string,
}

type job = {
    studyLevel: string,
    duration: number,
    remote: boolean,
}

type Company = {
    name: string,
    logo: string,
}

type Place = {
    city: string,
    zipCode: number,
}

export default async function OffersList() {
    //Remove from prod
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const offers: Offer[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers?order[createdAt]=desc&status=published`, { next: { revalidate: 1 } })
        .then(response => response.json())
        .then(data => data['hydra:member']);

    return (
        <div className="max-w-7xl mx-auto px-8 sm:px-12 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {offers.map(offer => {
                    const createdAtDate = new Date(offer.createdAt);
                    const isNew = differenceInDays(new Date(), createdAtDate) <= 5;

                    return (
                        <Card key={offer.publicId} className="relative dark:bg-dark hover:shadow-md dark:hover:shadow-gray-800 transition duration-200 flex flex-col h-full">
                            <Link href={`/offers/${offer.publicId}`} className="flex flex-col h-full">
                                <CardHeader>
                                    <div className="flex justify-between">
                                        <div className="flex flex-row gap-x-5 items-center">
                                            <Avatar>
                                                <AvatarImage
                                                    src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}/>
                                                <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {isNew && (
                                                <Badge variant="outline">Nouveau</Badge>
                                            )}
                                        </div>
                                        <div>
                                            <Star className="stroke-gray-300 hover:stroke-zinc-800 hover:fill-zinc-800 dark:stroke-zinc-700 dark:hover:fill-white dark:hover:stroke-white"/>
                                        </div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl tracking-normal font-bold mt-3">
                                            {offer.title}
                                        </CardTitle>
                                        <p className="text-sm dark:text-gray-400 text-gray-500">
                                            {offer.company.name}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardFooter className="flex justify-between mt-auto">
                                    <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1 items-center">
                                        <MapPin className="h-5 w-auto"/>
                                        {offer.place.city.length > 10 ? `${offer.place.city.substring(0, 10)}...` : offer.place.city}, {offer.place.zipCode}
                                    </div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1 items-center">
                                                    <TimerReset className="h-5 w-auto"/>
                                                    {offer.dayLast} jours restant
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Pour postuler à l&#39;offre.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </CardFooter>
                            </Link>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}