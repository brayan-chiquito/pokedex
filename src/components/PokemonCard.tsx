import React, { useState, useEffect } from 'react';
import {
  Box, Image, Text, Heading, List, ListItem, Flex, Grid, Progress, keyframes, Icon, Spinner
} from '@chakra-ui/react';
import Weaknesses from './Weaknesses';
import colornames from 'colornames';
import AnimatedCircle from './EvolutionImage';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PokemonDetails, PokemonProps, fetchPokemonDetails } from './fetchPokemonDetails';
import { ChevronRightIcon } from '@chakra-ui/icons';

const PokemonCard: React.FC<PokemonProps> = ({ name }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemonDetails(name)
      .then((data) => {
        setDetails(data);
        setError(false);
      })
      .catch((error) => {
        if (error.message === 'Pokemon not found') {
          setError(true);
        } else {
          console.error('Error fetching Pokémon details:', error);
        }
      });
  }, [name]);

  if (error) {
    return (
      <Box
        border="1px solid #e53e3e"
        borderRadius="10px"
        p="20px"
        backgroundColor="#fef2f2"
        color="#e53e3e"
        textAlign="center"
      >
        <Icon as={AiOutlineCloseCircle} w={8} h={8} mb={4} color="#e53e3e" /> {/* Icono de error */}
        <Heading as="h3" size="lg" mb={4}>
          Pokémon no encontrado
        </Heading>
        <Text>El Pokémon "{name}" no existe. Por favor, verifica el nombre e intenta de nuevo.</Text>
      </Box>
    );
  }

  if (!details) return null;

  const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

  const grow = (value: number) => keyframes`
    from { width: 0; }
    to { width: ${value}%; }
  `;

  const getRandomColor = () => {
    const letters = 'BCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const lightenColor = (color: string, amount: number) => {
    const hexToRgb = (hex: string) => {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
      const componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    };

    let hexColor = color.startsWith('#') ? color : colornames(color) ?? '';

    const { r, g, b } = hexToRgb(hexColor);
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);

    return rgbToHex(newR, newG, newB);
  };

  const getColor = (color: string) => lightenColor(color, 80);

  return (
    <Box
      border="1px solid #ccc"
      borderRadius="10px"
      p={{ base: "20px", md: "40px" }}
      width={{ base: "80vw", md: "70vw", lg: "60vw" }}
      maxWidth={{ base: "95vw", md: "80vw", lg: "70vw" }}
      backgroundImage="linear-gradient(to bottom, #DC2626, #ffffff)"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.8)"
      margin="auto"
      overflow="hidden"
    >
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <Box
          border="1px solid #ccc"
          borderRadius="10px"
          p={{ base: "10px", md: "20px" }}
          backgroundColor="#ffffff"
          width="100%"
          textAlign="center"
        >
          <Box
            display="inline-block"
            borderRadius="10px"
            p="10px"
            animation={`${fadeIn} 2s ease-in-out`}
            backgroundColor={getColor(details.color)}
            width="80%"
            margin="10px auto"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.8)"
          >
            <Heading as="h2" size={{ base: "md", md: "lg" }}>{details.name}</Heading>
          </Box>
          <Box
            mt="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={{ base: "150px", md: "220px" }}
            height={{ base: "150px", md: "220px" }}
            borderRadius="10px"
            animation={`${fadeIn} 2s ease-in-out`}
            p="10px"
            margin="auto"
          >
            <Image src={details.sprites} alt={details.name} boxSize={{ base: "120px", md: "200px" }} />
          </Box>
          <Box>
            <Heading as="h3" size={{ base: "sm", md: "md" }}>Stats:</Heading>
            <List>
              {Object.entries(details.stats).map(([stat, value]) => (
                <Box key={stat} mb="10px">
                  <Text fontWeight="bold" display="inline-block" width={{ base: "80px", md: "100px" }}>{stat}</Text>
                  <Text display="inline-block" width="30px" textAlign="right" marginRight="10px">{value}</Text>
                  <Progress
                    value={value > 100 ? 100 : value}
                    size="sm"
                    colorScheme="blue"
                    marginLeft="10px"
                    css={{
                      '& > div:first-of-type': {
                        animation: `${grow(value)} 2s ease-in-out`,
                      }
                    }}
                  />
                </Box>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          border="1px solid #ccc"
          borderRadius="10px"
          p={{ base: "10px", md: "20px" }}
          backgroundColor="#ffffff"
          width="100%"
        >
          <List>
            <ListItem bg={getColor(details.color)} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Text fontSize="xl"><strong>ID:</strong> {details.id}</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Text fontSize="xl"><strong>Base Experience:</strong> {details.base_experience}</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Text fontSize="xl"><strong>Height:</strong> {(details.height / 10)} m</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Text fontSize="xl"><strong>Weight:</strong> {((details.weight / 9.8)).toFixed(1)} kg</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Heading as="h3" size={{ base: "sm", md: "md" }}>Abilities:</Heading>
              <List>
                {details.abilities.map((ability, index) => (
                  <ListItem key={index}>
                    {ability.name} {ability.is_hidden ? '(Hidden)' : ''}: {ability.description}
                  </ListItem>
                ))}
              </List>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Weaknesses data={details.types} type="types" />
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Weaknesses data={details.weaknesses} type="weaknesses" />
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Heading as="h3" size={{ base: "sm", md: "md" }}>Data:</Heading>
              <Text>{details.history}</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Heading as="h3" size={{ base: "sm", md: "md" }}>First Appearance:</Heading>
              <Text>{details.first_appearance}</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Heading as="h3" size={{ base: "sm", md: "md" }}>Category:</Heading>
              <Text>{details.category}</Text>
            </ListItem>
            <ListItem bg={getRandomColor()} p={{ base: "5px", md: "10px" }} borderRadius="10px" mb="10px" animation={`${fadeIn} 2s ease-in-out`} boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
              <Heading as="h3" size={{ base: "sm", md: "md" }}>Color:</Heading>
              <Text >{details.color}</Text>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Box
        border="1px solid #ccc"
        borderRadius="10px"
        p={{ base: "10px", md: "20px" }}
        backgroundColor="#ffffff"
        mt="20px"
        width="100%"
      >
        <Heading as="h3" size="md" animation={`${fadeIn} 2s ease-in-out`}>Evolution Chain:</Heading>
        <Flex justifyContent="space-around" flexWrap="wrap">
          {details.evolution_chain.map((evolution, index) => (
            <React.Fragment key={index}>
              <Box textAlign="center" animation={`${fadeIn} 2s ease-in-out`} mb={4}>
                <AnimatedCircle src={evolution.sprites} alt={evolution.name} borderColor={details.color} />
                <Box
                  display="inline-block"
                  borderRadius="5px"
                  p="5px"
                  animation={`${fadeIn} 2s ease-in-out`}
                  backgroundColor={getColor(details.color)}
                  width="100%"
                  margin="10px auto"
                  boxShadow="0 0 10px rgba(0, 0, 0, 0.8)"
                >
                  <Heading as="h2" size={{ base: "sm", md: "md" }}>{evolution.name}</Heading>
                </Box>
                <Flex justifyContent="center" alignItems="center">
                  <Weaknesses data={evolution.types} type="types" />
                </Flex>
              </Box>
              {index < details.evolution_chain.length - 1 && (
                <ChevronRightIcon w={{ base: 5, md: 10 }} h={{ base: 5, md: 10 }} color="grey" animation={`${fadeIn} 2s ease-in-out`} />
              )}
            </React.Fragment>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default PokemonCard;
