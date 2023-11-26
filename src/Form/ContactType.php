<?php

namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints as Assert;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fullName', TextType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Ce champ ne ne doit pas être vide',
                    ]),
                    new Length([
                        'min' => 3,
                        'max' => 255,
                        'minMessage' => 'Le champ nom/prénom doit faire au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le champ nom/prénom doit faire au maximum {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new Assert\Email([
                        'message' => 'Le champ e-mail doit contenir une adresse email valide.',
                    ]),
                    new Assert\NotBlank([
                        'message' => 'Le champ e-mail ne doit pas être vide.',
                    ]),
                    new Length([
                        'min' => 6,
                        'max' => 255,
                        'minMessage' => 'Votre e-amil doit faire au minimum {{ limit }} caractères',
                        'maxMessage' => 'Votre e-amil doit faire au maximum {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('phoneNumber', TextType::class, [
                'constraints' => [
                    new Length([
                        'min' => 8,
                        'max' => 16,
                        'minMessage' => 'Votre numéro doit faire au minimum {{ limit }} caractères',
                        'maxMessage' => 'Votre numéro doit faire au maximum {{ limit }} caractères',
                    ]),
                ],
                'required' => false,
            ])
            ->add('society', TextType::class, [
                'constraints' => [
                    new Length([
                        'min' => 3,
                        'max' => 40,
                        'minMessage' => 'Le champ société doit faire au minimum {{ limit }} caractères',
                        'maxMessage' => 'Le champ société doit faire au maximum {{ limit }} caractères',
                    ]),
                ],
                'required' => false,
            ])
            ->add('subject', ChoiceType::class, [
                'choices'  => [
                    'Problème de création de compte' => 'Problème de création de compte',
                ],
                'placeholder' => '',
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Ce champ ne ne doit pas être vide.',
                    ]),
                ],
            ])
            ->add('message', TextAreaType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Ce champ ne ne doit pas être vide.',
                    ]),
                    new Length([
                        'min' => 10,
                        'minMessage' => 'Votre message doit faire au minimum {{ limit }} caractères',
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
