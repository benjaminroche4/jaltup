<?php

namespace App\Controller;

use App\Repository\OfferRepository;
use App\Service\DateCalculatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class OfferController extends AbstractController
{
    /**
     * The constructor
     *
     * @param OfferRepository $offerRepository
     * @param Security $security
     * @param DateCalculatorService $dateCalculatorService
     */
    public function __construct(
        private readonly OfferRepository $offerRepository,
        private readonly Security $security,
        private readonly DateCalculatorService $dateCalculatorService
    ){}

    /**
     * The offers page / HomePage
     *
     * @param Request $request
     * @return Response
     */
    #[Route('/', name: 'app_offer')]
    public function offers(Request $request): Response
    {
        //Retrieve the latest offer date modification
        $latestOffer = $this->offerRepository->findLatestOffer();
        $daySinceLastEdit = $this->dateCalculatorService->calculateDaysSinceCreation($latestOffer);

        return $this->render('offer/index.html.twig', [
            'daySinceLastEdit' => $daySinceLastEdit,
        ]);
    }

    /**
     * The offer detail page
     *
     * @param string $slug
     * @return Response
     */
    #[Route('/offre/{slug}', name: 'app_offer_details')]
    public function offerDetail(string $slug): Response
    {
        $offer = $this->offerRepository->findOneBy(['slug' => $slug]);

        if (!$offer || !$offer->isVisibility()) {
            throw $this->createNotFoundException('Cette offre n\'existe pas ou n\'est plus active.');
        }

        if($offer->isPremium()) {
            $user = $this->security->getUser();

            //Si le User n'est pas connecté
            if(!$user) {
                return $this->redirectToRoute('app_subscription');
            }

            //Si le User n'est pas abonné à l'offre Premium
            if (!in_array('ROLE_PREMIUM', $user->getRoles())) {
                return $this->redirectToRoute('#TODO: Route vers la page d\'abonnement Premium');
            }
        }

        $daysSinceCreation = $this->dateCalculatorService->calculateDaysSinceCreation($offer);


        return $this->render('offer/offer_details.html.twig', [
            'offer' => $offer,
            'daysSinceCreation' => $daysSinceCreation,
        ]);
    }
}