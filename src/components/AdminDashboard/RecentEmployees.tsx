import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from '@chakra-ui/react';

const RecentEmployees: React.FC = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')} overflowX="auto">
    <Text fontSize="xl" fontWeight="bold" mb={4}>Funcionários Recentes</Text>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Cargo</Th>
          <Th>Departamento</Th>
          <Th>Data de Contratação</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>João Silva</Td>
          <Td>Desenvolvedor</Td>
          <Td>TI</Td>
          <Td>01/05/2024</Td>
        </Tr>
        <Tr>
          <Td>Maria Santos</Td>
          <Td>Designer</Td>
          <Td>Marketing</Td>
          <Td>15/04/2024</Td>
        </Tr>
        {/* Add more rows as needed */}
      </Tbody>
    </Table>
  </Box>
);

export default RecentEmployees;
