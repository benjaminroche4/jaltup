<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SubscriptionController extends AbstractController
{
    #[IsGranted("ROLE_USER")]
    #[Route('/abonnement/individuel', name: 'app_subscription')]
    public function index(): Response
    {


        return $this->render('subscription/index.html.twig', [
            'controller_name' => 'SubscriptionController',
        ]);
    }
}
