import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      as="section"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      textAlign="center"
      py={{ base: 20, md: 36 }}
      px={4}
      position="relative"
    >
      <Box
        position="absolute"
        inset={0}
      />

      <Stack
        position="relative"
        maxW="3xl"  
        mx="auto"
        spacing={6}
      >
        <Heading as="h1" size="2xl" color="purple.300">
          Plan Your Perfect Trip
        </Heading>
        <Text fontSize="xl" color="cyan.500">
          Discover destinations, customize itineraries, and make travel planning effortless.
        </Text>
        <Button
          colorScheme="purple"
          size="lg"
          variant="solid"
          width="auto"
          alignSelf="center"
        >
          Start Planning
        </Button>
      </Stack>  
    </Box>
  );
};

export default HeroSection;