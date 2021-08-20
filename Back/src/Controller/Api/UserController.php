<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    /**
     * Get a user by id
     *
     * @Route("/api/user/{id<\d+>}", name="api_user_get_item", methods="GET")
     */
    public function show(User $user = null): Response
    {
        if ($user === null) {
            return new JsonResponse(
                ["message" => "User non trouvée !"],
                Response::HTTP_NOT_FOUND
            );
        }
        // /!\ JSON Hijacking
        // @see https://symfony.com/doc/current/components/http_foundation.html#creating-a-json-response
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user_get_by_id']);
    }

    /**
     * @Route("/api/user/create", name="api_user_create", methods="POST")
     */
    public function create(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ValidatorInterface $validator, UserPasswordHasherInterface $hasher): Response
    {

        
        // On récupère le contenu de la requête (du JSON)
        $jsonContent = $request->getContent();

        // On désérialise le JSON vers une entité User
        $user = $serializer->deserialize($jsonContent, User::class, 'json');
        $user->setPassword($hasher->hashPassword($user,$user->getPassword()));

        // On valide l'entité avec le service Validator
        $errors = $validator->validate($user);


        if (count($errors) > 0) {
            $newErrors = [];

            foreach ($errors as $error) {
                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
      
        // Affichage des erreurs
        if (count($errors) > 0) {

            $newErrors = [];

            foreach ($errors as $error) {
 
                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // On persist, on flush
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($user, Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/user/edit/{id<\d+>}", name="api_user_edit", methods={"PUT", "PATCH"})
     */
    public function itemEdit(User $user = null, SerializerInterface $serializer, ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response
    {

        // Film non trouvé
        if ($user === null) {
            return new JsonResponse(
                ["message" => "User non trouvé"],
                Response::HTTP_NOT_FOUND
            );
        }


        $data = $request->getContent();

        $user = $serializer->deserialize($data, User::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $user]);

        // On valide l'entité
        $errors = $validator->validate($user);

        // Affichage des erreurs
        if (count($errors) > 0) {
            $newErrors = [];

            foreach ($errors as $error) {
                $newErrors[$error->getPropertyPath()][] = $error->getMessage();
            }

            return new JsonResponse(["errors" => $newErrors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Enregistrement en BDD
        $entityManager->flush();

        return new JsonResponse(["message" => "User modifié"], Response::HTTP_OK);
    }
    /**
     * Delete a movie
     * 
     * @Route("/api/user/delete/{id<\d+>}", name="api_user_delete", methods="DELETE")
     */
    public function delete(User $user = null, EntityManagerInterface $em)
    {
        if (null === $user) {

            $error = 'Cette Utilisateur n\'existe pas';

            return $this->json(['error' => $error], Response::HTTP_NOT_FOUND);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'L\'Utilisateur a bien été supprimé.'], Response::HTTP_OK);
    }
}