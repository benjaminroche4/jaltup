<?php

namespace App\Repository;

use App\Entity\Offer;
use App\Model\OfferSearchData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Offer>
 */
class OfferRepository extends ServiceEntityRepository implements \Countable
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Offer::class);
    }

    /**
     * Find all offers by date desc and visibility
     *
     * @return Offer[]
     */
    public function findAllByDateDescAndVisibility()
    {
        return $this->createQueryBuilder('o')
            ->where('o.visibility = :visibility')
            ->setParameter('visibility', true)
            ->orderBy('o.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Search by Location City / Title / Company Name
     *
     * @param OfferSearchData $searchData
     * @return mixed
     */
    public function findBySearch(OfferSearchData $searchData): mixed
    {
        $offers = $this->createQueryBuilder('o')
            ->join('o.company', 'c')
            ->where('o.visibility = :visibility')
            ->setParameter('visibility', true)
            ->orderBy('o.createdAt', 'DESC');

        if(!empty($searchData->query)) {
            $offers = $offers
                ->andWhere(
                    $offers->expr()->orX(
                        $offers->expr()->like('o.locationCity', ':query'),
                        $offers->expr()->like('o.title', ':query'),
                        $offers->expr()->like('c.name', ':query')
                    )
                )
                ->setParameter('query', '%' . $searchData->query . '%');
        }

        return $offers->getQuery()
            ->getResult();
    }

    public function paginate(int $page, int $perPage): array
    {
        $offset = ($page - 1) * $perPage;

        return $this->createQueryBuilder('o')
            ->where('o.visibility = :visibility')
            ->setParameter('visibility', true)
            ->orderBy('o.createdAt', 'DESC')
            ->setMaxResults($perPage)
            ->setFirstResult($offset)
            ->getQuery()
            ->getResult();
    }

    public function findByQuery(?string $query): array
    {
        $qb = $this->createQueryBuilder('o')
            ->join('o.company', 'c')
            ->where('o.visibility = :visibility')
            ->setParameter('visibility', true);

        if ($query) {
            $qb->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->like('o.title', ':query'),
                    $qb->expr()->like('o.locationCity', ':query'),
                    $qb->expr()->like('c.name', ':query')
                )
            )
                ->setParameter('query', '%' . $query . '%');
        }

        return $qb->getQuery()->getResult();
    }
}
