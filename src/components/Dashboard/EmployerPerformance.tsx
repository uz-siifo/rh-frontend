import React from 'react';
import {
  Box,
  Heading,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const employeePerformance = [
  { name: 'Excelente', value: 60, color: '#5D5FEF' },
  { name: 'Bom', value: 30, color: '#A2A5FC' },
  { name: 'Regular', value: 10, color: '#E6E6FF' },
];

const EmployeePerformanceCard: React.FC = () => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
      <Heading size="md" mb={4} color="brand.600">Desempenho dos Funcionários</Heading>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={employeePerformance}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {employeePerformance.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Flex justify="center" mt={4}>
        {employeePerformance.map((entry) => (
          <Badge key={entry.name} colorScheme="brand" variant="subtle" mr={2}>
            {entry.name}: {entry.value}%
          </Badge>
        ))}
      </Flex>
    </Box>
  );
};

export default EmployeePerformanceCard;
