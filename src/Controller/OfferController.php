<?php

namespace App\Controller;

use App\Form\OfferSearchType;
use App\Model\OfferSearchData;
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
    public function index(Request $request): Response
    {
        $offers = $this->offerRepository->findAllByDateDescAndVisibility();

        $offerSearchData = new OfferSearchData();
        $form = $this->createForm(OfferSearchType::class, $offerSearchData);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $offerSearchData->page = $request->query->getInt('page', 1);
            $offers = $this->offerRepository->findBySearch($offerSearchData);

            return $this->render('offer/index.html.twig', [
                'form' => $form->createView(),
                'offers' => $offers
            ]);
        }

        return $this->render('offer/index.html.twig', [
            'form' => $form->createView(),
            'offers' => $offers
        ]);
    }

    #[Route('/offre/{slug}', name: 'app_offer_details')]
    public function offerDetail(string $slug): Response
    {
        $offer = $this->offerRepository->findOneBy(['slug' => $slug]);

        if (!$offer || !$offer->isVisibility()) {
            throw $this->createNotFoundException('Cette offre n\'existe pas ou n\'est plus active.');
        }

        if($offer->isPremium()) {
            return $this->redirectToRoute('#TODO: route to premium offer page');
        }

        return $this->render('offer/offer_details.html.twig', [
            'offer' => $offer,
        ]);
    }
}
