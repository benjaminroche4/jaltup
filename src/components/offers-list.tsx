import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {HeartIcon, MapPin, TimerReset} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import { differenceInDays } from 'date-fns';

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
    contractType: string,
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
    const offers: Offer[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers?order[createdAt]=desc`, { next: { revalidate: 3600 } })
        .then(response => response.json())
        .then(data => data['hydra:member']);

    return (
        <div className="p-12 max-w-7xl">
            <div className="grid grid-cols-3 gap-4">
                {offers.map(offer => {
                    const createdAtDate = new Date(offer.createdAt);
                    const isNew = differenceInDays(new Date(), createdAtDate) <= 2;

                    return (
                        <Card key={offer.publicId} className="relative dark:bg-dark hover:shadow-md dark:hover:shadow-gray-800 transition duration-200">
                            <Link href={`/offers/${offer.publicId}`}>
                                {isNew && (
                                    <div className="-mt-3.5 absolute right-3">
                                        <div className="block px-2 py-1 rounded-full text-xs border border-gray-200 text-gray-400 bg-white dark:border-zinc-800 dark:bg-dark">
                                            Nouveau
                                        </div>
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex justify-between">
                                        <div className="flex flex-row gap-x-4 items-center">
                                            <Avatar>
                                                <AvatarImage
                                                    src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}/>
                                                <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-xl tracking-tight">
                                                    {offer.title.length > 22 ? `${offer.title.substring(0, 22)}...` : offer.title}
                                                </CardTitle>
                                                <p className="text-sm dark:text-gray-400 text-gray-500">
                                                    {offer.company.name.length > 20 ? `${offer.company.name.substring(0, 20)}...` : offer.company.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <HeartIcon
                                                className="stroke-gray-300 dark:stroke-zinc-700 hover:fill-red-500 hover:stroke-red-500 dark:hover:stroke-red-500"/>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-x-1.5">
                                    {offer.job.studyLevel && (
                                        <Badge
                                            className="bg-gradient-to-r from-green-600 to-green-800 border-none dark:text-white capitalize">
                                            {offer.job.studyLevel}
                                        </Badge>
                                    )}
                                    {offer.job.contractType && (
                                        <Badge
                                            className="bg-gradient-to-r from-cyan-600 to-cyan-800 border-none dark:text-white capitalize">
                                            {offer.job.contractType}
                                        </Badge>
                                    )}
                                    {offer.job.remote && (
                                        <Badge
                                            className="bg-gradient-to-r from-red-600 to-red-800 border-none dark:text-white capitalize">
                                            Remote
                                        </Badge>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1 items-center">
                                        <MapPin className="h-5 w-auto"/>
                                        {offer.place.city.length > 10 ? `${offer.place.city.substring(0, 10)}...` : offer.place.city}, {offer.place.zipCode}
                                    </div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div
                                                    className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1 items-center">
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