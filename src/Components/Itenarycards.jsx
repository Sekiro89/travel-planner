import { useState } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Heading,
  SimpleGrid,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { geocodeCity, getNearbyPlaces, getWeather } from "../src.js";

const ItinerarySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setLoading(true);
    setPlaces([]);
    setWeather(null);

    try {
      // 1. Geocode city
      const { lat, lon } = await geocodeCity(searchTerm);

      // 2. Get places & weather in parallel
      const [placesData, weatherData] = await Promise.all([
        getNearbyPlaces(lat, lon),
        getWeather(lat, lon),
      ]);

      setPlaces(placesData);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            isLoading={loading}
          >
            Search
          </Button>
        </HStack>

        {error && <Text color="red.500">{error}</Text>}

        {places.length > 0 && (
          <Box
            w="100%"
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="lg" mb={4} color="purple.500">
              Top Places of Interest
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {places.map((place, idx) => (
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
                    {place.name || place.street || place.formatted}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">{place.address_line2 || place.country}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {weather && weather.list && (
          <Box
            w="100%"
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="lg" mb={4} color="purple.500">
              7-Day Weather Forecast
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              {weather.list.slice(0, 7).map((day, idx) => (
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
                    {new Date(day.dt * 1000).toDateString()}
                  </Heading>
                  <Text fontSize="md">
                    {day.main.temp}°C, {day.weather[0].description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ItinerarySearch;
