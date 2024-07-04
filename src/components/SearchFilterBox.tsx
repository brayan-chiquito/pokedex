import React from 'react';
import { Box, Heading, Input, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from '@chakra-ui/react';

interface SearchFilterBoxProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
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
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
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
    <Box bg="white" p={5} borderRadius="md">
      <Heading as="h2" size="md" mb={5}>
        Búsqueda y Filtros
      </Heading>
      <Input
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        mb={5}
      />
      <Select
        placeholder="Seleccionar tipo"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        mb={5}
      >
        {/* Opciones de tipos */}
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
      <Heading as="h3" size="sm" mb={2}>
        Velocidad
      </Heading>
      <Text fontSize="sm" mb={2}>Velocidad mínima</Text>
      <NumberInput value={minSpeed} onChange={handleMinSpeedChange} min={0} mb={2}>
        <NumberInputField placeholder="Velocidad mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Velocidad máxima</Text>
      <NumberInput value={maxSpeed} onChange={handleMaxSpeedChange} min={0} mb={5}>
        <NumberInputField placeholder="Velocidad máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Select
        placeholder="Seleccionar generación"
        value={selectedGeneration}
        onChange={(e) => setSelectedGeneration(e.target.value)}
        mb={5}
      >
        {/* Opciones de generaciones */}
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
        Peso (kg)
      </Heading>
      <Text fontSize="sm" mb={2}>Peso mínimo</Text>
      <NumberInput value={minWeight} onChange={handleMinWeightChange} min={0} mb={2}>
        <NumberInputField placeholder="Peso mínimo" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Peso máximo</Text>
      <NumberInput value={maxWeight} onChange={handleMaxWeightChange} min={0} mb={5}>
        <NumberInputField placeholder="Peso máximo" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading as="h3" size="sm" mb={2}>
        Altura (m)
      </Heading>
      <Text fontSize="sm" mb={2}>Altura mínima</Text>
      <NumberInput value={minHeight} onChange={handleMinHeightChange} min={0} mb={2}>
        <NumberInputField placeholder="Altura mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Altura máxima</Text>
      <NumberInput value={maxHeight} onChange={handleMaxHeightChange} min={0} mb={5}>
        <NumberInputField placeholder="Altura máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Heading as="h3" size="sm" mb={2}>
        Experiencia Base
      </Heading>
      <Text fontSize="sm" mb={2}>Experiencia base mínima</Text>
      <NumberInput value={minBaseExperience} onChange={handleMinBaseExperienceChange} min={0} mb={2}>
        <NumberInputField placeholder="Experiencia base mínima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="sm" mb={2}>Experiencia base máxima</Text>
      <NumberInput value={maxBaseExperience} onChange={handleMaxBaseExperienceChange} min={0} mb={5}>
        <NumberInputField placeholder="Experiencia base máxima" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
};

export default SearchFilterBox;
