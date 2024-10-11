import { redirect } from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
    BriefcaseBusiness,
    Crown,
    GraduationCap,
    LucideHome,
    MapPin, Star
} from "lucide-react";
import * as React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

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
        <main className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
            <Card>
                <CardHeader>
                    <div className="mb-5 flex justify-between items-center">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Offres</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{offer.company.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex gap-x-2">
                            {offer.premium && (
                                <Badge variant='outline'
                                       className="bg-yellow-100/10 border border-yellow-500 text-yellow-600 flex gap-x-1 text-sm">
                                    <Crown className="h-3 w-auto"/>
                                    Premium
                                </Badge>
                            )}
                            <Star className="stroke-gray-300 hover:stroke-zinc-800 hover:fill-zinc-800 dark:stroke-zinc-700 dark:hover:fill-white dark:hover:stroke-white"/>
                        </div>
                    </div>
                    <div className="sm:max-w-3xl">
                        <h1 className="font-bold text-3xl tracking-normal sm:text-4xl whitespace-pre-wrap">{offer.title}</h1>
                    </div>
                </CardHeader>
                <CardFooter>
                    <div
                        className="items-center sm:gap-x-8 text-sm grid grid-cols-2 gap-5 mt-3 sm:flex w-full sm:w-auto">
                        <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1.5 items-center">
                            <MapPin className="h-5 w-auto"/>
                            {offer.place.city}
                        </div>
                        <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1.5 items-center">
                            <GraduationCap className="h-5 w-auto"/>
                            {offer.job.studyLevel}
                        </div>
                        <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1.5 items-center">
                            <BriefcaseBusiness className="h-5 w-auto"/>
                            {offer.job.contractType}
                        </div>
                        <div className="dark:text-gray-400 text-gray-500 text-sm flex gap-x-1.5 items-center">
                            <LucideHome className="h-5 w-auto"/>
                            {offer.job.remote ? "Télétravail" : "Sur site"}
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <div className="grid grid-cols-3 mt-8 gap-8">
                <div className="col-span-3 md:col-span-2">
                    <Card>
                        <CardHeader>
                            Description du poste
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {offer.job.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8 col-span-3 md:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex gap-x-4 items-center">
                                <Avatar>
                                    <AvatarImage
                                        src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}/>
                                    <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold tracking-wide">{offer.company.name}</h3>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            Postuler
                            <Button variant="default" size="lg">Postuler à l'offre</Button>
                        </CardHeader>
                    </Card>
                </div>
            </div>

        </main>
);
}