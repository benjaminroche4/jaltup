<?php

namespace App\DataFixtures;

use App\Entity\OfferCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class OfferCategoryFixtures extends Fixture
{
    public const OFFER_CATEGORY_REFERENCE = 152;

    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 20; $i++) {
            $category = new OfferCategory();
            $category->setName($faker->randomElement(['Développement web', 'Développement mobile','Design', 'Marketing',
                'Communication', 'Vente', 'Ressources humaines', 'Comptabilité', 'Finance', 'Juridique', 'Management',
                'Administration', 'Logistique', 'Achats', 'Production', 'Qualité', 'Maintenance', 'Sécurité',
                'Environnement', 'Recherche et développement', 'Innovation', 'Conseil', 'Formation', 'Enseignement',
                'Social', 'Santé', 'Médical', 'Paramédical', 'Pharmaceutique', 'Industrie', 'BTP', 'Transport', 'Logistique',
                'Tourisme', 'Hôtellerie', 'Restauration', 'Sport', 'Culture', 'Loisirs', 'Mode', 'Textile', 'Beauté',
                'Esthétique', 'Coiffure', 'Automobile', 'Mécanique', 'Électrique', 'Électronique', 'Énergie', 'Environnement',
                'Agriculture', 'Agroalimentaire', 'Chimie', 'Biotechnologies', 'Cosmétique', 'Luxe', 'Défense', 'Sécurité',
                'Aéronautique', 'Spatial', 'Naval', 'Ferroviaire', 'Équipementier', 'Informatique', 'Télécoms', 'Édition',
                'Presse', 'Audiovisuel', 'Publicité', 'Événementiel', 'Immobilier', 'Bureaux', 'Commerce', 'E-commerce',
                'Distribution', 'Grande distribution', 'Commerce de détail', 'Commerce de gros', 'Commerce international']));

            $manager->persist($category);
        }

        $manager->flush();

        $this->addReference(self::OFFER_CATEGORY_REFERENCE, $category);
    }
}
