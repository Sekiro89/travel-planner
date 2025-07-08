import React from "react";
import { HStack, Input, Button} from "@chakra-ui/react";

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search..." }) => {
  return (
    <HStack 
    spacing={4}
    w="70%"
    mx="auto"
    px={4}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        bg="white"
        boxShadow="sm"
      />
      <Button colorScheme="purple" onClick={onSearch}>
        Check Plan
      </Button>
    </HStack>
  );
};

export default SearchBar;
