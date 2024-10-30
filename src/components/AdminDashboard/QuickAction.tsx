import React from 'react';
import { Box, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react';

const QuickActions: React.FC = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
    <Text fontSize="xl" fontWeight="bold" mb={4}>Ações Rápidas</Text>
    <VStack spacing={3}>
      <Button colorScheme="blue" width="full">Adicionar Funcionário</Button>
      <Button colorScheme="green" width="full">Iniciar Nova Avaliação</Button>
      <Button colorScheme="purple" width="full">Gerar Relatório</Button>
    </VStack>
  </Box>
);

export default QuickActions;
