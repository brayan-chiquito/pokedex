import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, SimpleGrid, Image, Text, Container, Stack, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner } from '@chakra-ui/react';
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
  speed: number; // Añadido para el filtro de velocidad
}

const PokemonList: React.FC = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>(''); // Estado para el tipo seleccionado
  const [selectedGeneration, setSelectedGeneration] = useState<string>(''); // Estado para la generación seleccionada
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [minWeight, setMinWeight] = useState<number>(0); // Estado para el peso mínimo
  const [maxWeight, setMaxWeight] = useState<number>(1000); // Estado para el peso máximo
  const [minHeight, setMinHeight] = useState<number>(0); // Estado para la altura mínima
  const [maxHeight, setMaxHeight] = useState<number>(20); // Estado para la altura máxima
  const [minBaseExperience, setMinBaseExperience] = useState<number>(0); // Estado para la experiencia base mínima
  const [maxBaseExperience, setMaxBaseExperience] = useState<number>(1000); // Estado para la experiencia base máxima
  const [minSpeed, setMinSpeed] = useState<number>(0); // Estado para la velocidad mínima
  const [maxSpeed, setMaxSpeed] = useState<number>(200); // Estado para la velocidad máxima
  const pokemonsPerPage = 20; // 4 pokemones horizontalmente x 5 verticalmente

  const fetchPokemonDetails = async (url: string): Promise<PokemonDetail> => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      name: data.name,
      id: data.id,
      types: data.types.map((typeContainer: any) => typeContainer.type.name),
      imageUrl: data.sprites.front_default, 
      weight: data.weight / 10,  // Convertir a kg
      height: data.height / 10,  // Convertir a metros
      base_experience: data.base_experience,
      speed: data.stats[5].base_stat // Usando el índice 5 para velocidad
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
      <Container maxW="container.xl" py={10}>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          {/* Cuadro de búsqueda y filtros */}
          <GridItem
            colSpan={1}
            ml={{ base: -20, md: -380 }}
            width={{ base: "auto", md: "270px" }}
            height={{ base: "auto", md: "1060px" }}
            position="relative"
            top={{ base: "0", md: "0px" }}
            p="10px"
            border="1px solid red"
            borderRadius="10px"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.8)"
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
          <GridItem colSpan={5} ml={{ base: -10, md: -180 }} width="100%" maxW="full">
            <Box bg="red.500" p={5} borderRadius="md" width="960px" borderColor="red.500" borderWidth="2px" boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              {loading ? (
                <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="red.500" />
              ) : (
                <>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
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
            <ModalContent marginLeft="auto" marginRight="auto" maxWidth="90%" width="500px" left="-40">
              <ModalHeader>Detalle de {selectedPokemon}</ModalHeader>
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