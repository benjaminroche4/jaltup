<?php

namespace App\Service;

use App\Entity\Offer;
use DateTime;

/**
 * The date calculator service
 */
class DateCalculatorService
{
    /**
     * Calculate the days since the creation of an offerL
     *
     * @param Offer $offer
     * @return int
     */
    public function calculateDaysSinceCreation(Offer $offer): int
    {
        $now = new DateTime();
        $interval = $offer->getCreatedAt()->diff($now);

        return $interval->days;
    }
}