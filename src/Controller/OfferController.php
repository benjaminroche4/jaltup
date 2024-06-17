<?php

namespace App\Controller;

use App\Repository\OfferRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class OfferController extends AbstractController
{
    public function __construct(
        private OfferRepository $offerRepository
    )
    {
    }

    #[Route('/', name: 'app_offer')]
    public function index(): Response
    {
        $offers = $this->offerRepository->findAllByDateDescAndVisibility();

        return $this->render('offer/index.html.twig', [
            'offers' => $offers
        ]);
    }

    #[Route('/offre/{slug}', name: 'app_offer_details')]
    public function offerDetail(string $slug, Request $request): Response
    {
        $offer = $this->offerRepository->findOneBy(['slug' => $slug]);

        if (!$offer || !$offer->isVisibility()) {
            throw $this->createNotFoundException('Cette offre n\'existe pas ou n\'est plus active.');
        }

        return $this->render('offer/offer_details.html.twig', [
            'offer' => $offer,
        ]);
    }
}
