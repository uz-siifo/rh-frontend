import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Progress,
} from '@chakra-ui/react';

const AttendanceCard: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
    <Heading size="md" mb={4} color="brand.600">Presenças e Faltas</Heading>
    <VStack align="stretch" spacing={4}>
      <Box>
        <Text mb={2}>Semana Atual</Text>
        <Progress value={80} colorScheme="green" borderRadius="full" />
      </Box>
      <Box>
        <Text mb={2}>Mês Atual</Text>
        <Progress value={90} colorScheme="green" borderRadius="full" />
      </Box>
    </VStack>
  </Box>
);
};

export default AttendanceCard;
