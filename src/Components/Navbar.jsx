import { Box,Icon,VStack,Text,Flex,Spacer,HStack,Link, Button} from "@chakra-ui/react";

const Navbar=()=>{
    return(
    <Box px={6} py={4} boxShadow="sm"
      //position="fixed" // Make it stick to the top
      top="0"
      left="0"
      right="0"
      zIndex="1000">
        <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color="purple.600">
                Travel planner
            </Text>
            <Spacer />
            <HStack spacing={6}>
                 <Link color="amber.500" _hover={{ color: "rose.500" }} href="#home">
            Home
          </Link>
          <Link color="amber.500" _hover={{ color: "rose.500" }} href="#about">
            About
          </Link>
          <Link color="amber.500" _hover={{ color: "rose.500" }} href="#contact">
            Contact
          </Link>
            </HStack>

             <Spacer />
             
             <Button colorScheme="purple" >
               Start Plan
            </Button>

        </Flex>
    </Box>

    )
}

export default Navbar;