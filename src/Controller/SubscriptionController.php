<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SubscriptionController extends AbstractController
{
    /**
     * The public subscription page
     *
     * @return Response
     */
    #[Route('/abonnement', name: 'app_subscription')]
    public function subscribe(): Response
    {
        return $this->render('subscription/index.html.twig');
    }


    /**
     * The subscription page
     *
     * @return Response
     */
    #[IsGranted("ROLE_USER")]
    #[Route('/abonnement/individuel', name: 'app_subscription_user')]
    public function userSubscribe(): Response
    {
        return $this->render('subscription/index.html.twig', [
            'controller_name' => 'SubscriptionController',
        ]);
    }
}
