<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\OfferCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CompanyFixtures extends Fixture
{
    public const COMPANY_REFERENCE = 52;

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 20; $i++) {
            $company = new Company();
            $company->setName($faker->company);
            $company->setLogo('https://i.pravatar.cc/100');
            $company->setShortDescription($faker->sentence(10));
            $company->setEmployeeCount($faker->numberBetween(10, 1000));
            $company->setVerified($faker->boolean);
            $company->setWebsite($faker->url);

            $manager->persist($company);
        }

        $manager->flush();

        $this->addReference(self::COMPANY_REFERENCE, $company);
    }
}
