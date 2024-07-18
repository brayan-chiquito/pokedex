import React from 'react';
import {
  Box, Heading, Input, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text, InputGroup, InputRightElement, IconButton, Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchFilterBoxProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (clearSearchTerm?: () => void) => void;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedGeneration: string;
  setSelectedGeneration: React.Dispatch<React.SetStateAction<string>>;
  minWeight: number;
  setMinWeight: React.Dispatch<React.SetStateAction<number>>;
  maxWeight: number;
  setMaxWeight: React.Dispatch<React.SetStateAction<number>>;
  minHeight: number;
  setMinHeight: React.Dispatch<React.SetStateAction<number>>;
  maxHeight: number;
  setMaxHeight: React.Dispatch<React.SetStateAction<number>>;
  minBaseExperience: number;
  setMinBaseExperience: React.Dispatch<React.SetStateAction<number>>;
  maxBaseExperience: number;
  setMaxBaseExperience: React.Dispatch<React.SetStateAction<number>>;
  minSpeed: number;
  setMinSpeed: React.Dispatch<React.SetStateAction<number>>;
  maxSpeed: number;
  setMaxSpeed: React.Dispatch<React.SetStateAction<number>>;
  onReset: () => void; // Añadir esta línea
}

const SearchFilterBox: React.FC<SearchFilterBoxProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  selectedType,
  setSelectedType,
  selectedGeneration,
  setSelectedGeneration,
  minWeight,
  setMinWeight,
  maxWeight,
  setMaxWeight,
  minHeight,
  setMinHeight,
  maxHeight,
  setMaxHeight,
  minBaseExperience,
  setMinBaseExperience,
  maxBaseExperience,
  setMaxBaseExperience,
  minSpeed,
  setMinSpeed,
  maxSpeed,
  setMaxSpeed,
  onReset, 
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(() => setSearchTerm(''));
    }
  };

  const handleMinWeightChange = (value: string) => {
    setMinWeight(value ? parseInt(value) : 0);
  };

  const handleMaxWeightChange = (value: string) => {
    setMaxWeight(value ? parseInt(value) : 0);
  };

  const handleMinHeightChange = (value: string) => {
    setMinHeight(value ? parseInt(value) : 0);
  };

  const handleMaxHeightChange = (value: string) => {
    setMaxHeight(value ? parseInt(value) : 0);
  };

  const handleMinBaseExperienceChange = (value: string) => {
    setMinBaseExperience(value ? parseInt(value) : 0);
  };

  const handleMaxBaseExperienceChange = (value: string) => {
    setMaxBaseExperience(value ? parseInt(value) : 0);
  };

  const handleMinSpeedChange = (value: string) => {
    setMinSpeed(value ? parseInt(value) : 0);
  };

  const handleMaxSpeedChange = (value: string) => {
    setMaxSpeed(value ? parseInt(value) : 0);
  };

  return (
    <Box bg="white" p={5} borderRadius="md" width={{ base: "100%", md: "auto" }}>
      <Heading as="h2" size="md" mb={5}>
        Search and Filters
      </Heading>
      <InputGroup mb={5}>
        <Input
          placeholder="Search name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputRightElement>
          <IconButton
            aria-label="Buscar"
            icon={<SearchIcon />}
            onClick={() => onSearch(() => setSearchTerm(''))}
          />
        </InputRightElement>
      </InputGroup>
      <Select
        placeholder="Select type"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        mb={5}
      >
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
      </Select>
      <Select
        placeholder="Select generation"
        value={selectedGeneration}
        onChange={(e) => setSelectedGeneration(e.target.value)}
        mb={5}
      >
        <option value="1">Generation I</option>
        <option value="2">Generation II</option>
        <option value="3">Generation III</option>
        <option value="4">Generation IV</option>
        <option value="5">Generation V</option>
        <option value="6">Generation VI</option>
        <option value="7">Generation VII</option>
        <option value="8">Generation VIII</option>
      </Select>
      <Heading as="h3" size="sm" mb={2}>
        Speed
      </Heading>
      <Text fontSize="sm" mb={2}>Minimum speed</Text>
      <NumberInput value={minSpeed} onChange={handleMinSpeedChange} min={0} mb={2}>
        <NumberInputField placeholder="Velocidad mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Maximum speed</Text>
      <NumberInput value={maxSpeed} onChange={handleMaxSpeedChange} min={0} mb={5}>
        <NumberInputField placeholder="Velocidad máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading as="h3" size="sm" mb={2}>
        Weight (kg)
      </Heading>
      <Text fontSize="sm" mb={2}>Minimum weight</Text>
      <NumberInput value={minWeight} onChange={handleMinWeightChange} min={0} mb={2}>
        <NumberInputField placeholder="Peso mínimo" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Maximum weight</Text>
      <NumberInput value={maxWeight} onChange={handleMaxWeightChange} min={0} mb={5}>
        <NumberInputField placeholder="Peso máximo" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading as="h3" size="sm" mb={2}>
        Height (m)
      </Heading>
      <Text fontSize="sm" mb={2}>Minimun height</Text>
      <NumberInput value={minHeight} onChange={handleMinHeightChange} min={0} mb={2}>
        <NumberInputField placeholder="Altura mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Maximum height</Text>
      <NumberInput value={maxHeight} onChange={handleMaxHeightChange} min={0} mb={5}>
        <NumberInputField placeholder="Altura máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading as="h3" size="sm" mb={2}>
        Base Experience
      </Heading>
      <Text fontSize="sm" mb={2}>Minimum base experience</Text>
      <NumberInput value={minBaseExperience} onChange={handleMinBaseExperienceChange} min={0} mb={2}>
        <NumberInputField placeholder="Experiencia base mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Maximum base experience</Text>
      <NumberInput value={maxBaseExperience} onChange={handleMaxBaseExperienceChange} min={0} mb={5}>
        <NumberInputField placeholder="Experiencia base máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button mt={4} colorScheme="teal" onClick={onReset}>
        Reset Filters
      </Button>
    </Box>
  );
};

export default SearchFilterBox;
