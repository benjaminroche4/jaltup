<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CompanyInfoController extends AbstractController
{
    #[Route('/fonctionnement', name: 'app_functioning')]
    public function functionning(): Response
    {
        return $this->render('company_info/functioning.html.twig');
    }

    #[Route('/entreprises', name: 'app_companies')]
    public function companies(): Response
    {
        return $this->render('company_info/companies.html.twig');
    }

    #[Route('/a-propos', name: 'app_about_us')]
    public function aboutUs(): Response
    {
        return $this->render('company_info/about_us.html.twig');
    }
}
