<?php

namespace App\Entity;

use App\Repository\OfferRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * This class represents an offer
 */
#[ORM\Entity(repositoryClass: OfferRepository::class)]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    private ?string $slug = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sourceLink = null;

    #[ORM\Column(length: 100)]
    private ?string $locationCountry = null;

    #[ORM\Column(length: 100)]
    private ?string $locationCity = null;

    #[ORM\Column]
    private ?bool $remote = null;

    #[ORM\Column(length: 100)]
    private ?string $studyLevel = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?bool $visibility = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $intershipStart = null;

    #[ORM\Column]
    private ?int $intershipDuration = null;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?OfferCategory $category = null;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company = null;

    #[ORM\Column]
    private ?bool $premium = null;

    #[ORM\Column(length: 12, nullable: true)]
    private ?string $bgColor = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSourceLink(): ?string
    {
        return $this->sourceLink;
    }

    public function setSourceLink(?string $sourceLink): static
    {
        $this->sourceLink = $sourceLink;

        return $this;
    }

    public function getLocationCountry(): ?string
    {
        return $this->locationCountry;
    }

    public function setLocationCountry(string $locationCountry): static
    {
        $this->locationCountry = $locationCountry;

        return $this;
    }

    public function getLocationCity(): ?string
    {
        return $this->locationCity;
    }

    public function setLocationCity(string $locationCity): static
    {
        $this->locationCity = $locationCity;

        return $this;
    }

    public function isRemote(): ?bool
    {
        return $this->remote;
    }

    public function setRemote(bool $remote): static
    {
        $this->remote = $remote;

        return $this;
    }

    public function getStudyLevel(): ?string
    {
        return $this->studyLevel;
    }

    public function setStudyLevel(string $studyLevel): static
    {
        $this->studyLevel = $studyLevel;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isVisibility(): ?bool
    {
        return $this->visibility;
    }

    public function setVisibility(bool $visibility): static
    {
        $this->visibility = $visibility;

        return $this;
    }

    public function getIntershipStart(): ?\DateTimeImmutable
    {
        return $this->intershipStart;
    }

    public function setIntershipStart(\DateTimeImmutable $intershipStart): static
    {
        $this->intershipStart = $intershipStart;

        return $this;
    }

    public function getIntershipDuration(): ?int
    {
        return $this->intershipDuration;
    }

    public function setIntershipDuration(int $intershipDuration): static
    {
        $this->intershipDuration = $intershipDuration;

        return $this;
    }

    public function getCategory(): ?OfferCategory
    {
        return $this->category;
    }

    public function setCategory(?OfferCategory $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function isPremium(): ?bool
    {
        return $this->premium;
    }

    public function setPremium(bool $premium): static
    {
        $this->premium = $premium;

        return $this;
    }

    public function getBgColor(): ?string
    {
        return $this->bgColor;
    }

    public function setBgColor(?string $bgColor): static
    {
        $this->bgColor = $bgColor;

        return $this;
    }
}
