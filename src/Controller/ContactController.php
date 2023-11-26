<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(Request $request, EntityManagerInterface $entityManager,
                          MailerInterface $mailer, LoggerInterface $logger): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $contact->setCreatedAt(new \DateTimeImmutable());
            $contact->setContactId(uniqid('C_') . '_' . date('d-m-Y_H:i:s'));
            $entityManager->persist($contact);
            $entityManager->flush();

            $emailContact = (new TemplatedEmail())
                ->from($contact->getEmail())
                /** TODO: Email address to change */
                ->to(new Address('contact@uniflow.agency'))
                ->subject('[Jaltup] Nouvelle demande de contact')
                ->htmlTemplate('emails/contact.html.twig')
                ->context([
                    'createdAt' => new \DateTimeImmutable(),
                    'contactId' => $contact->getContactId(),
                    'fullName' => $contact->getFullName(),
                    'emailContact' => $contact->getEmail(),
                    'phoneNumber' => $contact->getPhoneNumber(),
                    'society' => $contact->getSociety(),
                    'subject' => $contact->getSubject(),
                    'message' => $contact->getMessage(),
                ])
            ;

            try {
                $mailer->send($emailContact);
            } catch (TransportExceptionInterface $e) {
                $logger->error('Erreur lors de l\'envoi de l\'email :'. $e->getMessage());
            }

            $this->addFlash('contactSuccess', 'Message envoyé. Un conseiller va vous recontacter rapidement.');
            return $this->redirectToRoute('app_contact');
        }

        return $this->render('contact/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
