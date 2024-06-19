<?php

namespace App\DataFixtures;

use App\Entity\Offer;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class OfferFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 20; $i++) {
            $offer = new Offer();
            $offer->setTitle($faker->sentence(5));
            $offer->setSlug($faker->slug);
            $offer->setCreatedAt(new \DateTimeImmutable());
            $offer->setSourceLink($faker->url);
            $offer->setLocationCountry($faker->country);
            $offer->setLocationCity($faker->city);
            $offer->setRemote($faker->boolean);
            $offer->setStudyLevel($faker->randomElement(['Bac', 'Bac+2', 'Bac+3', 'Bac+5']));
            $offer->setDescription($faker->paragraph(5));
            $offer->setVisibility($faker->boolean);
            $offer->setIntershipStart(new \DateTimeImmutable());
            $offer->setIntershipDuration($faker->numberBetween(1, 6));
            $offer->setPremium($faker->boolean);
            $offer->setCategory($this->getReference(OfferCategoryFixtures::OFFER_CATEGORY_REFERENCE));
            $offer->setCompany($this->getReference(CompanyFixtures::COMPANY_REFERENCE));

            $manager->persist($offer);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
            OfferCategoryFixtures::class,
        ];
    }
}
