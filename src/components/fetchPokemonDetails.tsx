
export interface PokemonProps {
  name: string;
}

export interface Ability {
  name: string;
  is_hidden: boolean;
  description: string;
}

export interface Stat {
  [key: string]: number;
}

export interface Evolution {
  name: string;
  sprites: string;
  types: string[];
}

export interface PokemonDetails {
  name: string;
  id: number;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Ability[];
  types: string[];
  sprites: string;
  stats: Stat;
  evolution_chain: Evolution[];
  weaknesses: string[];
  history: string;
  first_appearance: string;
  category: string;
  color: string;
}


export async function fetchPokemonDetails(name: string): Promise<PokemonDetails | null> {
    try {
      name = name.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pokemon not found'); 
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      const data = await response.json();
      
      const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        const evolutionChain: Evolution[] = [];
        let chain = evolutionData.chain;
        
        while (chain) {
          const namesSpecies = chain.species.name;
          const speciesName = chain.species.url;
          const matches = speciesName.match(/(\d+)\/?$/);
          const evolutionPokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${matches[1]}`);
          const evolutionPokemonData = await evolutionPokemonResponse.json();
          evolutionChain.push({
            name: namesSpecies,
            sprites: evolutionPokemonData.sprites.front_default,
            types: evolutionPokemonData.types.map((typeInfo: any) => typeInfo.type.name),
          });
          if (chain.evolves_to.length > 0) {
            chain = chain.evolves_to[0];
          } else {
            break;
          }
        }

        const abilities = await Promise.all(
          data.abilities.map(async (abilityInfo: any) => {
            const abilityResponse = await fetch(abilityInfo.ability.url);
            const abilityData = await abilityResponse.json();
            const description = abilityData.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text;
            return {
              name: abilityInfo.ability.name,
              is_hidden: abilityInfo.is_hidden,
              description,
            };
          })
        );

        const types = data.types.map((typeInfo: any) => typeInfo.type.name);
        
        const weaknessesPromises = data.types.map((typeInfo: any) => {
          return fetch(typeInfo.type.url)
            .then(response => response.json())
            .then(typeData => {
              return typeData.damage_relations.double_damage_from.map((type: any) => type.name);
            });
        });
        
        const weaknessesArray = await Promise.all(weaknessesPromises);
        const weaknesses = Array.from(new Set(weaknessesArray.flat()));

        const pokemonDetails: PokemonDetails = {
          name: data.name,
          id: data.id,
          base_experience: data.base_experience,
          height: data.height,
          weight: data.weight,
          abilities,
          types,
          sprites: data.sprites.front_default,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            'special-attack': data.stats[3].base_stat,
            'special-defense': data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
          evolution_chain: evolutionChain,
          weaknesses,
          history: speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text,
          first_appearance: speciesData.generation.name,
          category: speciesData.genera.find((genus: any) => genus.language.name === 'en').genus,
          color: speciesData.color.name,
        };
      return pokemonDetails; 
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      throw error;
    }
  }