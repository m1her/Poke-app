"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const PokemonDetails = () => {
  const params = useParams();

  const [pokemonDetails, setPokemonDetails] = useState<any>();

  useEffect(() => {
    if (params) {
      const fetchPokemonDetails = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
          );
          setPokemonDetails(response.data);
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      };

      fetchPokemonDetails();
    }
  }, [params]);

  return (
    <div className="container mx-auto p-4">
      {pokemonDetails && (
        <>
          <h1 className="text-4xl font-bold text-center mb-4 capitalize">
            {pokemonDetails.name}
          </h1>
          <div className="flex justify-center">
            <Image
              src={pokemonDetails.sprites?.front_default}
              alt={pokemonDetails.name}
              className="w-48 h-48"
              width={1000}
              height={1000}
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-lg">Height: {pokemonDetails.height}</p>
            <p className="text-lg">Weight: {pokemonDetails.weight}</p>
            <p className="text-lg">
              Base Experience: {pokemonDetails.base_experience}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetails;
