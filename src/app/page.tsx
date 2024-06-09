"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((poke: { name: string }) =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Pokémon Information
      </h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="p-2 border rounded w-full mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((poke: { name: any }) => (
          <Link key={poke.name} href={`/${poke.name}`}>
            <div className="bg-white rounded shadow p-4 text-center hover:bg-gray-100">
              <h3 className="text-xl font-bold capitalize">{poke.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
