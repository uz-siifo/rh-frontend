import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

const WorkHours: React.FC = () => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
      <Heading size="md" mb={4} color="brand.600">Horário de Trabalho</Heading>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="bold" fontSize="2xl" color="green.500">10h</Text>
          <Text fontSize="sm" color="gray.500">Horas extras</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="2xl" color="red.500">2</Text>
          <Text fontSize="sm" color="gray.500">Faltas injustificadas</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default WorkHours;
