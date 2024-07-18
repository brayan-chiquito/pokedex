import React from 'react';
import { ChakraProvider, Box, Heading, Container, keyframes, Image, Flex } from '@chakra-ui/react';
import './App.css'; 
import theme from './theme';
import PokemonList from './components/PokemonList';
import imagenLeft from './imagenes/pikachu-png-transparent.png';
import imagenRigth from './imagenes/lugia.png';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        bg="red.500"
        color="white"
        textAlign="center"
        p={{ base: 3, md: 5 }}
        position="relative"
        borderRadius="lg"
        bgGradient="radial(blue.500, purple.500)"
        boxShadow="xl"
        animation={`${fadeIn} 1s ease-in-out`}
      >
        <Flex align="center" justify="space-between" px={{ base: 3, md: 5 }}>
          <Image 
            src={imagenLeft} 
            alt="Left Image"
            boxSize={{ base: '50px', md: '80px' }} 
            objectFit="contain"
          />
          <Heading 
            as="h1" 
            size={{ base: 'xl', md: '2xl' }} 
            mb={{ base: 3, md: 5 }}
            onClick={() => window.location.reload()} 
            className="pointer"
            flex="1"
            textAlign="center"
          >
            P<span className="pokeball"></span>kédex
          </Heading>
          <Image 
            src={imagenRigth} 
            alt="Right Image"
            boxSize={{ base: '50px', md: '80px' }} 
            objectFit="contain"
            bg="transparent" 
          />
        </Flex>
      </Box>
      <Container 
        centerContent 
        animation={`${fadeIn} 1s ease-in-out`} 
        maxW={{ base: '100%', md: 'container.lg' }} 
        p={{ base: 3, md: 5 }}
      >
        <PokemonList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
