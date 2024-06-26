<?php

namespace App\DataFixtures;

use App\Entity\Contact;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ContactFixtures extends Fixture
{
    /**
     * This method loads some fake data in the database
     *
     * @param ObjectManager $manager
     * @return void
     */
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 20; $i++) {
            $contact = new Contact();
            $contact->setFullName($faker->name);
            $contact->setEmail($faker->email);
            $contact->setPhoneNumber($faker->phoneNumber);
            $contact->setSociety($faker->company);
            $contact->setSubject($faker->sentence(5));
            $contact->setMessage($faker->paragraph(5));
            $contact->setCreatedAt(new \DateTimeImmutable());

            $manager->persist($contact);
        }

        $manager->flush();
    }

}
