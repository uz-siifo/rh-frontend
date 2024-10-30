import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const employeeData = [
  { name: 'Ativos', value: 300 },
  { name: 'Férias', value: 50 },
  { name: 'Afastados', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EmployeeChart: React.FC = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
    <Text fontSize="xl" fontWeight="bold" mb={4}>Total de Funcionários</Text>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={employeeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {employeeData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Box>
);

export default EmployeeChart;
