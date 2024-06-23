<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Twig;

use App\Repository\OfferRepository;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent('OfferSearch', template: 'components/OfferSearch.html.twig')]
class OfferSearch
{
    use DefaultActionTrait;

    #[LiveProp(writable: true, url: true)]
    public ?string $query = null;

    public function __construct(private readonly OfferRepository $offerRepository)
    {
    }

    public function getOffers(): array
    {
        return $this->offerRepository->findByQuery($this->query);
    }
}
