import { useState } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { SimpleGrid, Box} from "@chakra-ui/react";

const itineraries = {
  Paris: [
    "Day 1: Visit Eiffel Tower",
    "Day 2: Louvre Museum and Seine Cruise",
    "Day 3: Montmartre and Sacré-Cœur",
    "Day 4: Palace of Versailles",
    "Day 5: Latin Quarter and Notre-Dame",
    "Day 6: Shopping at Champs-Élysées",
    "Day 7: Relax at Luxembourg Gardens",
  ],
  Tokyo: [
    "Day 1: Senso-ji Temple",
    "Day 2: Tokyo Skytree and Asakusa",
    "Day 3: Shibuya Crossing & Harajuku",
    "Day 4: Day trip to Mt. Fuji",
    "Day 5: Akihabara Electronics Town",
    "Day 6: Meiji Shrine and Yoyogi Park",
    "Day 7: Tsukiji Outer Market",
  ],
  NewYork: [
    "Day 1: Times Square and Broadway",
    "Day 2: Central Park",
    "Day 3: Statue of Liberty",
    "Day 4: Metropolitan Museum of Art",
    "Day 5: Brooklyn Bridge",
    "Day 6: 9/11 Memorial & Museum",
    "Day 7: High Line and Chelsea Market",
  ],
};

const ItinerarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const cityKey = searchTerm.trim().toLowerCase();
    const matchedCity = Object.keys(itineraries).find(
      (key) => key.toLowerCase() === cityKey
    );
    if (matchedCity) {
      setResult({ city: matchedCity, plan: itineraries[matchedCity] });
    } else {
      setResult(null);
    }
  };

  return (
    <Box py={12} bg="gray.50">
      <VStack spacing={8} w="70%" mx="auto">
        <HStack spacing={4} w="100%">
          <Input
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            size="lg"
            boxShadow="md"
          />
          <Button
            colorScheme="purple"
            size="lg"
            boxShadow="md"
            onClick={handleSearch}
          >
            Search
          </Button>
        </HStack>

        {result ? (
          <Box
            w="100%"
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="lg" mb={4} color="purple.500">
              7-Day Itinerary for {result.city}
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {result.plan.map((item, idx) => (
                        <Box
                        key={idx}
                        p={5}
                        bg="white"
                        borderRadius="md"
                        boxShadow="md"
                        border="1px solid"
                        borderColor="gray.200"
                        _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "all 0.3s" }}
                        >
                        <Heading size="md" color="purple.400" mb={2}>
                            Day {idx + 1}
                        </Heading>
                        <Text fontSize="md">{item}</Text>
                        </Box>
                    ))}
                    </SimpleGrid>
          </Box>
        ) : searchTerm ? (
          <Text color="red.500">No itinerary found for "{searchTerm}"</Text>
        ) : null}
      </VStack>
    </Box>
  );
};

export default ItinerarySearch;
