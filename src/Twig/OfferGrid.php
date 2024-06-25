<?php

namespace App\Twig;

use App\Repository\OfferRepository;
use App\Service\DateCalculatorService;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

/**
 * The offer grid
 */
#[AsLiveComponent('OfferGrid')]
class OfferGrid
{
    use ComponentToolsTrait;
    use DefaultActionTrait;

    private const PER_PAGE = 9;

    #[LiveProp]
    public int $page = 1;

    /**
     * The constructor.
     */
    public function __construct(
        private readonly OfferRepository $offerRepository,
        private readonly DateCalculatorService $dateCalculatorService
    )
    {
    }

    /**
     * Load more offers
     *
     * @return void
     */
    #[LiveAction]
    public function more(): void
    {
        ++$this->page;
    }

    /**
     * Has more offers
     *
     * @return bool
     */
    public function hasMore(): bool
    {
        return \count($this->offerRepository) > ($this->page * self::PER_PAGE);
    }

    /**
     * Get the items
     *
     * @return array
     */
    public function getItems(): array
    {
        $offers = $this->offerRepository->paginate($this->page, self::PER_PAGE);

        $items = [];
        $id = ($this->page - 1) * self::PER_PAGE;
        foreach ($offers as $offer) {
            $daysSinceCreation = $this->dateCalculatorService->calculateDaysSinceCreation($offer);
            $items[] = [
                'id' => ++$id,
                'offer' => $offer,
                'daysSinceCreation' => $daysSinceCreation,
            ];
        }

        return $items;
    }
}