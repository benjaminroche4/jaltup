import { redirect } from "next/navigation";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
    BriefcaseBusiness,
    CheckCircle,
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
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

async function getOffer(publicId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offers/${publicId}`, {
        next: { revalidate: 1 }
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
                    <div className="items-center sm:gap-x-8 text-sm grid grid-cols-2 gap-5 mt-3 sm:flex w-full sm:w-auto">
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
            <div className="grid grid-cols-3 mt-6 gap-6 md:mt-8 md:gap-8">
                <div className="col-span-3 lg:col-span-2">
                    <Card>
                        <CardHeader>
                            Description du poste
                        </CardHeader>
                        <CardContent>
                            <ReactMarkdown className="text-md text-muted-foreground">{offer.job.description}</ReactMarkdown>
                            <CardDescription className="mt-5">Publié le {new Date(offer.createdAt).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <div className="text-muted-foreground text-sm space-x-2 space-y-2">
                            {offer.tag.map((tag: string, index: number) => (
                                    <Badge key={index} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="space-y-6 md:space-y-8 col-span-3 lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <div className="flex gap-x-4 items-center justify-center">
                                <Avatar>
                                    <AvatarImage
                                        src={`${process.env.NEXT_PUBLIC_APP_URL}/company/logos/${offer.company.logo}`}/>
                                    <AvatarFallback>{offer.company.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold tracking-wide">{offer.company.name}</h3>
                            </div>
                        </CardHeader>
                        <CardFooter className="grid grid-cols-3 text-center divide-x">
                            <Link href={offer.company.websiteUrl}  target="_blank" className="underline underline-offset-4 text-sm text-muted-foreground">Voir le site</Link>
                            <p className="text-sm text-muted-foreground">
                                {offer.company.offerNumber} {offer.company.offerNumber > 1 ? 'offres' : 'offre'}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center justify-center gap-x-1">
                                {offer.company.verified ? (
                                    <>
                                        Vérifié
                                        <CheckCircle className="h-4 w-auto" />
                                    </>
                                ) : (
                                    "Non Vérifié"
                                )}
                            </p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="bg-muted rounded-2xl text-center px-2 py-4 space-y-1">
                                    <p className="text-2xl font-semibold">44</p>
                                    <p className="text-sm text-muted-foreground">candidatures</p>
                                </div>
                                <div className="bg-muted rounded-2xl text-center px-2 py-4 space-y-1">
                                    <p className="text-2xl font-semibold">{offer.dayLast}</p>
                                    <p className="text-sm text-muted-foreground">jours restant</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardFooter>
                        <Button variant="default" size="xl" className="w-full">
                                <Link href={offer.url} target="_blank">
                                    Postuler à l&apos;offre
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </main>
);
}