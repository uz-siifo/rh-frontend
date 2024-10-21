import React from 'react';
import { Box, Heading, Badge,Flex } from '@chakra-ui/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type EmployeePerformanceProps = {
  data: { name: string; value: number; color: string }[];
};

const EmployeePerformance: React.FC<EmployeePerformanceProps> = ({ data }) => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
      <Heading size="md" mb={4} color="brand.600">Desempenho dos Funcionários</Heading>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Flex justify="center" mt={4}>
        {data.map((entry) => (
          <Badge key={entry.name} colorScheme="brand" variant="subtle" mr={2}>
            {entry.name}: {entry.value}%
          </Badge>
        ))}
      </Flex>
    </Box>
  );
};

export default EmployeePerformance;
