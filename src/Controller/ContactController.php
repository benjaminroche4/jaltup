<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Service\MailerService;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    public function __construct(
        private readonly MailerService $mailerService,
    ) {}

    #[Route('/contact', name: 'app_contact')]
    public function index(
        Request $request,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer,
        LoggerInterface $logger,
    ): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            $contact->setCreatedAt(new \DateTimeImmutable());
            $contact->setEmail(filter_var($form->get('email')->getData(), FILTER_VALIDATE_EMAIL));

            $this->sendEmailToAdminContact($contact);

            $entityManager->persist($contact);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'Message envoyé'
            );

            return $this->redirectToRoute('app_contact');
        }


        return $this->render('contact/index.html.twig', [
            'form' => $form->createView(),
        ], new Response(null, $form->isSubmitted() && !$form->isValid() ? 422 : 200));
    }

    public function sendEmailToAdminContact(Contact $contact): void
    {
        $this->mailerService->sendEmail(
            $_ENV['EMAIL_ADMIN'],
            'Nouveau message de contact',
            'email/form_contact.html.twig',
            [
                'emailContact' => $contact->getEmail(),
                'fullName' => $contact->getFullName(),
                'society' => $contact->getSociety(),
                'phoneNumber' => $contact->getPhoneNumber(),
                'subject' => $contact->getSubject(),
                'message' => $contact->getMessage(),
            ]
        );
    }
}
