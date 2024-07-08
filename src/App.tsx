import React from 'react';
import { ChakraProvider, Box, Heading, Container, keyframes } from '@chakra-ui/react';
import './App.css'; // Importa tu archivo CSS
import theme from './theme';
import PokemonList from './components/PokemonList';

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
        <Heading 
          as="h1" 
          size={{ base: 'xl', md: '2xl' }} 
          mb={{ base: 3, md: 5 }}
          onClick={() => window.location.reload()} 
          className="pointer"
        >
          P<span className="pokeball"></span>kédex
        </Heading>
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
