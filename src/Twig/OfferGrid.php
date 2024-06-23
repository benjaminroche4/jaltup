<?php

namespace App\Twig;

use App\Repository\OfferRepository;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;


#[AsLiveComponent('OfferGrid')]
class OfferGrid
{
    use ComponentToolsTrait;
    use DefaultActionTrait;

    private const PER_PAGE = 2;

    #[LiveProp]
    public int $page = 1;

    public function __construct(private readonly OfferRepository $offerRepository)
    {
    }

    #[LiveAction]
    public function more(): void
    {
        ++$this->page;
    }

    public function hasMore(): bool
    {
        return \count($this->offerRepository) > ($this->page * self::PER_PAGE);
    }

    public function getItems(): array
    {
        $offers = $this->offerRepository->paginate($this->page, self::PER_PAGE);

        $items = [];
        $id = ($this->page - 1) * self::PER_PAGE;
        foreach ($offers as $offer) {
            $items[] = [
                'id' => ++$id,
                'offer' => $offer,
            ];
        }

        return array_reverse($items);
    }
}