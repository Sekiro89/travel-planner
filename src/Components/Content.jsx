import { useRef, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  IconButton
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import placesData from "../assets/placesdata.js"; 

const SCROLL_AMOUNT = 300;

const Content = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <Box bg="gray.50" w="100%" position="relative" overflow="hidden" p={4}>
      <Heading textAlign="center" mb={8} size="xl" color="purple.400">
        Pick Plans
      </Heading>

      <IconButton
        icon={<ChevronLeftIcon boxSize={8} />}
        onClick={() => scroll("left")}
        isDisabled={!canScrollLeft}
        position="absolute"
        left="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        aria-label="Scroll Left"
        size="lg"
        bg="white"
        boxShadow="md"
        _hover={{ bg: "gray.100" }}
      />
      <IconButton
        icon={<ChevronRightIcon boxSize={8} />}
        onClick={() => scroll("right")}
        isDisabled={!canScrollRight}
        position="absolute"
        right="0"
        top="50%"
        transform="translateY(-50%)"
        zIndex="10"
        aria-label="Scroll Right"
        size="lg"
        bg="white"
        boxShadow="md"
        _hover={{ bg: "gray.100" }}
      />

      <Box
        ref={scrollRef}
        overflowX="auto"
        overflowY="visible"
        px={8}
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        <Box display="flex" gap={6} w="max-content" overflow="visible">
          <HStack spacing={6}>
            {placesData.map((item) => (
              <Box
                key={item.id}
                flex="0 0 auto"
                w="280px"
                borderRadius="xl"
                overflow="hidden"
                bg="white"
                boxShadow="lg"
                role="group"
                cursor="pointer"
                position="relative"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  w="100%"
                  h="350px"
                  objectFit="cover"
                  transition="transform 0.3s ease"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  w="100%"
                  maxH="60px"
                  overflow="hidden"
                  bg="rgba(0,0,0,0.7)"
                  color="white"
                  transition="max-height 0.4s ease"
                  _groupHover={{ maxH: "250px" }}
                >
                  <VStack
                    align="start"
                    p={4}
                    spacing={2}
                    opacity={0.8}
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: 1 }}
                  >
                    <Heading size="md">{item.title}</Heading>
                    <Text fontSize="sm">{item.description}</Text>
                  </VStack>
                </Box>
              </Box>
            ))}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
