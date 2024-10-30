import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Box bg={useColorModeValue('gray.100', 'gray.700')} py={4} textAlign="center">
    <Text fontSize="sm">© 2024 Your Company. All rights reserved.</Text>
  </Box>
);

export default Footer;
