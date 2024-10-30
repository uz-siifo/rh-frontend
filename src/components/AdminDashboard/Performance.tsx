import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const performanceData = [
  { name: 'Jan', concluídas: 65, pendentes: 35 },
  { name: 'Fev', concluídas: 59, pendentes: 41 },
  { name: 'Mar', concluídas: 80, pendentes: 20 },
  { name: 'Abr', concluídas: 81, pendentes: 19 },
  { name: 'Mai', concluídas: 56, pendentes: 44 },
  { name: 'Jun', concluídas: 55, pendentes: 45 },
];

const PerformanceChart: React.FC = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
    <Text fontSize="xl" fontWeight="bold" mb={4}>Avaliações de Desempenho</Text>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="concluídas" fill="#8884d8" />
        <Bar dataKey="pendentes" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

export default PerformanceChart;
