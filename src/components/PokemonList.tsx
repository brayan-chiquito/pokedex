import React, { useState, useEffect } from 'react';
import {
  ChakraProvider, Box, Button, SimpleGrid, Image, Text, Container, Stack, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner
} from '@chakra-ui/react';
import theme from '../theme'; 
import SearchFilterBox from './SearchFilterBox'; 
import Weaknesses from './Weaknesses';
import PokemonCard from './PokemonCard';

interface PokemonDetail {
  name: string;
  id: number;
  types: string[];
  imageUrl: string;
  weight: number;
  height: number;
  base_experience: number;
  speed: number;
}

const PokemonList: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [minWeight, setMinWeight] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(1000);
  const [minHeight, setMinHeight] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(20);
  const [minBaseExperience, setMinBaseExperience] = useState<number>(0);
  const [maxBaseExperience, setMaxBaseExperience] = useState<number>(1000);
  const [minSpeed, setMinSpeed] = useState<number>(0);
  const [maxSpeed, setMaxSpeed] = useState<number>(200);
  const pokemonsPerPage = 20;

  const fetchPokemonDetails = async (url: string): Promise<PokemonDetail> => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      types: data.types.map((typeContainer: any) => typeContainer.type.name),
      imageUrl: data.sprites.front_default, 
      weight: data.weight / 10,
      height: data.height / 10,
      base_experience: data.base_experience,
      speed: data.stats[5].base_stat
    };
  };

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      const fetchPromises = [];
      for (let i = 1; i <= 1025; i++) {
        fetchPromises.push(fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const allPokemonDetails = await Promise.all(fetchPromises);
      setPokemonDetails(allPokemonDetails);
      setLoading(false);
    };

    fetchAllPokemon();
  }, []);

  const generations: Record<string, [number, number]> = {
    '1': [1, 151],
    '2': [152, 251],
    '3': [252, 386],
    '4': [387, 493],
    '5': [494, 649],
    '6': [650, 721],
    '7': [722, 809],
    '8': [810, 1025],
  };

  useEffect(() => {
    setCurrentPage(0); 
  }, [selectedGeneration, selectedType, minWeight, maxWeight, minHeight, maxHeight, minBaseExperience, maxBaseExperience, minSpeed, maxSpeed]);

  const filterByGeneration = (poke: PokemonDetail) => {
    if (!selectedGeneration) return true;
    const [start, end] = generations[selectedGeneration];
    return poke.id >= start && poke.id <= end;
  };

  const filterByType = (poke: PokemonDetail) => {
    return selectedType ? poke.types.includes(selectedType) : true;
  };

  const filterByWeight = (poke: PokemonDetail) => {
    return poke.weight >= minWeight && poke.weight <= maxWeight;
  };

  const filterByHeight = (poke: PokemonDetail) => {
    return poke.height >= minHeight && poke.height <= maxHeight;
  };

  const filterByBaseExperience = (poke: PokemonDetail) => {
    return poke.base_experience >= minBaseExperience && poke.base_experience <= maxBaseExperience;
  };

  const filterBySpeed = (poke: PokemonDetail) => {
    return poke.speed >= minSpeed && poke.speed <= maxSpeed;
  };

  const filteredPokemons = pokemonDetails.filter((poke) => {
    return (
      filterByGeneration(poke) &&
      filterByType(poke) &&
      filterByWeight(poke) &&
      filterByHeight(poke) &&
      filterByBaseExperience(poke) &&
      filterBySpeed(poke)
    );
  });

  const indexOfLastPokemon = (currentPage + 1) * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handleSearch = () => {
    setSelectedPokemon(searchTerm);
  };

  const openPokemonDetail = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  const closePokemonDetail = () => {
    setSelectedPokemon(null);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="95vw" py={10} px={{ base: 1, md: 5 }} marginLeft={"auto"} marginRight={"auto"}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 4fr" }} gap={6}>
          {/* Cuadro de búsqueda y filtros */}
          <GridItem
            colSpan={{ base: 1, md: 1 }}
            width="100%"
            height="auto"
            position="relative"
            alignSelf="start"
            
            p={{ base: 1, md: 2 }}
            border="1px solid red"
            borderRadius="10px"
            boxShadow="4px 4px 4px rgba(0, 0, 0, 0.14)"
            bg="red.500"
          >
            <SearchFilterBox 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedGeneration={selectedGeneration}
              setSelectedGeneration={setSelectedGeneration}
              minWeight={minWeight}
              setMinWeight={setMinWeight}
              maxWeight={maxWeight}
              setMaxWeight={setMaxWeight}
              minHeight={minHeight}
              setMinHeight={setMinHeight}
              maxHeight={maxHeight}
              setMaxHeight={setMaxHeight}
              minBaseExperience={minBaseExperience}
              setMinBaseExperience={setMinBaseExperience}
              maxBaseExperience={maxBaseExperience}
              setMaxBaseExperience={setMaxBaseExperience}
              minSpeed={minSpeed}
              setMinSpeed={setMinSpeed}
              maxSpeed={maxSpeed}
              setMaxSpeed={setMaxSpeed}
            />
          </GridItem>

          {/* Cuadro de lista de Pokémones */}
          <GridItem colSpan={{ base: 1, md: 1 }} width="100%" maxW="full">
            <Box bg="red.500" p={{ base: 1, md: 2 }} borderRadius="md" width="100%" borderColor="red.500" borderWidth="2px" boxShadow="8px 8px 8px rgba(0, 0, 0, .14)">
              {loading ? (
                <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.500" />
              ) : (
                <>
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
                    {currentPokemons.map(poke => (
                      <Box
                        bg="white" 
                        key={poke.id} 
                        borderWidth="2px" 
                        borderColor="black"
                        borderRadius="lg" 
                        overflow="hidden" 
                        p={5} 
                        width="100%" 
                        maxW="300px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
                        onClick={() => openPokemonDetail(poke.name)}
                      >
                        <Image
                          src={poke.imageUrl}
                          alt={poke.name}
                          mb={3}
                        />
                        <Text fontSize="xl" fontWeight="bold" width="100%">{poke.name}</Text>
                        <Text>ID: {poke.id}</Text>
                        <Box width="100%" display="flex" justifyContent="center">
                          <Weaknesses data={poke.types} type="types" />
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <Stack direction="row" spacing={4} align="center" justify="center" mt={5}>
                    <Button 
                      onClick={prevPage} 
                      isDisabled={currentPage === 0}
                      sx={{
                        '&:disabled': {
                          cursor: 'not-allowed',
                          bg: 'gray.300',
                          color: 'gray.500',
                        },
                      }}
                    >
                      Anterior
                    </Button>
                    <Button 
                      onClick={nextPage} 
                      isDisabled={indexOfLastPokemon >= filteredPokemons.length}
                      sx={{
                        '&:disabled': {
                          cursor: 'not-allowed',
                          bg: 'gray.300',
                          color: 'gray.500',
                        },
                      }}
                    > 
                      Siguiente
                    </Button>
                  </Stack>
                </>
              )}
            </Box>
          </GridItem>
          <Modal isOpen={!!selectedPokemon} onClose={closePokemonDetail}>
            <ModalOverlay />
            <ModalContent marginLeft="auto" marginRight="auto" maxWidth="90%" width="850px">
              <ModalHeader>Detail of {selectedPokemon}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedPokemon && <PokemonCard name={selectedPokemon} />}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Grid>
      </Container>
    </ChakraProvider>
  );
};

export default PokemonList;
