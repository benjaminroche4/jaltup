<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A form to create a contact
 */
class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fullName', TextType::class, [
                'label' => 'Nom complet',
                'constraints' => [
                    new Assert\Length([
                        'min' => 2,
                        'max' => 50,
                        'minMessage' => 'Votre nom doit comporter au moins {{ limit }} caractères',
                        'maxMessage' => 'Votre nom ne peut pas dépasser {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => 'Adresse email',
                'constraints' => [
                    new Assert\Email([
                        'message' => 'Veuillez saisir une adresse email valide',
                    ]),
                ],
            ])
            ->add('society', TextType::class, [
                'label' => 'Société',
                'required' => false,
                'constraints' => [
                    new Assert\Length([
                        'max' => 50,
                        'maxMessage' => 'Votre société ne peut pas dépasser {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('subject', ChoiceType::class, [
                'choices'  => [
                    '1 A' => 'Demande de devis',
                    '2 A' => 'Demande d\'infos',
                ],
                'placeholder' => '',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Veuillez choisir un sujet.',
                    ]),
                ],
            ])
            ->add('phoneNumber', TelType::class, [
                'required' => false,
                'constraints' => [
                    new Assert\Regex([
                        'pattern' => '/^[\d+]+$/',
                        'message' => 'Le numéro de téléphone doit contenir uniquement des chiffres ou +.',
                    ]),
                    new Assert\Length([
                        'max' => 13,
                        'exactMessage' => 'Le numéro de téléphone doit comporter {{ limit }} numéros.',
                    ]),
                ],
            ])
            ->add('message', TextType::class, [
                'required' => false,
                'label' => 'Message',
                'constraints' => [
                    new Assert\Length([
                        'min' => 8,
                        'max' => 500,
                        'minMessage' => 'Votre message doit comporter au moins {{ limit }} caractères',
                        'maxMessage' => 'Votre message ne peut pas dépasser {{ limit }} caractères',
                    ]),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
