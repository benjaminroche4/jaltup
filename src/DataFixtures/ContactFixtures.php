<?php

namespace App\DataFixtures;

use App\Entity\Contact;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ContactFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 20; $i++) {
            $contact = new Contact();
            $contact->setEmail($faker->email);
            $contact->setSubject($faker->sentence(5));
            $contact->setMessage($faker->paragraph(5));
            $contact->setCreatedAt(new \DateTimeImmutable());
            $contact->setPhoneNumber($faker->phoneNumber);
            $contact->setFullName($faker->name);
            $contact->setSociety($faker->company);

            $manager->persist($contact);
        }

        $manager->flush();
    }
}
