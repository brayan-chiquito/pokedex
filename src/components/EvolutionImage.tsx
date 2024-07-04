import React from 'react';
import { Box, Image, keyframes } from '@chakra-ui/react';

interface AnimatedCircleProps {
  src: string;
  alt: string;
  borderColor: string;
}

const drawCircle = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ src, alt, borderColor }) => {
  return (
    <Box position="relative" width="100px" height="100px" overflow="hidden" borderRadius="50%" boxShadow="0 0 10px rgba(0, 0, 0, 0.8)">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        margin="0px"
        boxSize="100px"
        borderRadius="50%"
        border="2px solid transparent"
        borderLeft={`2px solid ${borderColor}`} // Cambia el color de la línea aquí
        animation={`${drawCircle} 1s linear infinite`}
      />
      <Image src={src} alt={alt} width="100%" height="100%" objectFit="cover" />
    </Box>
  );
};

export default AnimatedCircle;
