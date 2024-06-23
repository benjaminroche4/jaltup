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

    public function countVisible(): int
    {
        return $this->createQueryBuilder('o')
            ->select('count(o.id)')
            ->where('o.visibility = :visibility')
            ->setParameter('visibility', true)
            ->getQuery()
            ->getSingleScalarResult();
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
