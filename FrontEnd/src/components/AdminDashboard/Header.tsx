import React from 'react';
import { Box, Flex, Text, Button, HStack, useColorModeValue, Icon } from '@chakra-ui/react';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => (
  <Box bg={useColorModeValue('blue.500', 'blue.200')} px={4} py={3}>
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('white', 'gray.800')}>
        Admin Dashboard
      </Text>
      <HStack spacing={4}>
        <Button leftIcon={<Icon as={LogOut} />} colorScheme="whiteAlpha" variant="ghost">
          Logout
        </Button>
      </HStack>
    </Flex>
  </Box>
);

export default Header;
