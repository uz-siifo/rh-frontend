import React from 'react';
import { Box, Heading, VStack, Progress, Text } from '@chakra-ui/react';

const Attendance: React.FC = () => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
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

export default Attendance;
