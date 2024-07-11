// Weaknesses.tsx
import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

interface TypeColors {
  [key: string]: string;
}

interface WeaknessesProps {
  data: string[];
  type?: 'weaknesses' | 'types'; // Prop opcional para determinar si se muestran debilidades o tipos
}

// Colores asignados manualmente para cada tipo
const typeColors: TypeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#e332df',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

const Weaknesses: React.FC<WeaknessesProps> = ({ data, type = 'weaknesses' }) => {
  return (
    <Box>
      <Heading as="h3" size="md" marginBottom="10px">{type === 'weaknesses' ? 'Weaknesses' : 'Types'}:</Heading>
      <Box display="flex" flexWrap="wrap" gap="10px">
        {data.map((item, index) => (
          <Box
            key={index}
            borderRadius="10px"
            padding="3px 5px"
            backgroundColor={typeColors[item.toLowerCase()] || 'gray.200'} 
            textAlign="center"
          >
            <Text>{item}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Weaknesses;
