<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CategoryFoodRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CategoryFoodRepository::class)
 */
class CategoryFood
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(max=255)
     * @Assert\NotBlank
     * @Groups("foodtruck_get")
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="food_like")
     */
    private $users;

    /**
     * @ORM\ManyToMany(targetEntity=Foodtruck::class, mappedBy="sell_type_food")
     */
    private $foodtrucks;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->foodtrucks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addFoodLike($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeFoodLike($this);
        }

        return $this;
    }

    /**
     * @return Collection|Foodtruck[]
     */
    public function getFoodtrucks(): Collection
    {
        return $this->foodtrucks;
    }

    public function addFoodtruck(Foodtruck $foodtruck): self
    {
        if (!$this->foodtrucks->contains($foodtruck)) {
            $this->foodtrucks[] = $foodtruck;
            $foodtruck->addSellTypeFood($this);
        }

        return $this;
    }

    public function removeFoodtruck(Foodtruck $foodtruck): self
    {
        if ($this->foodtrucks->removeElement($foodtruck)) {
            $foodtruck->removeSellTypeFood($this);
        }

        return $this;
    }
}