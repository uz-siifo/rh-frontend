import React from 'react';
import {
  Box, Flex, VStack, HStack, Text, Button, Table, Thead, Tbody, Tr, Th, Td,
  useColorModeValue, Icon, SimpleGrid, Container
} from '@chakra-ui/react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Settings, FileText, Clock, Award, Users, Home, LogOut } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom'; // Importa o Link e o Outlet

// Header component
const Header = () => (
  <Box bg={useColorModeValue('blue.500', 'blue.200')} px={4} py={3}>
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('white', 'gray.800')}>
        Admin Dashboard
      </Text>
      <HStack spacing={4}>
        <Button leftIcon={<Icon as={LogOut} />} colorScheme="whiteAlpha" variant="ghost">
          Logout
        </Button>
      </HStack>
    </Flex>
  </Box>
);

// Sidebar component
const Sidebar = () => (
  <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    w={{ base: 'full', md: 64 }}
    pos="fixed"
    h="full"
    py={4}
  >
    <VStack spacing={1} align="stretch">
      {[
        { icon: Home, label: 'Dashboard', path: '/AdminDashboard' }, // Corrigido
        { icon: Users, label: 'Funcionários', path: '/AdminDashboard/Employees' },
        { icon: FileText, label: 'Avaliações', path: 'performance-evaluation' },
        { icon: Award, label: 'Promoções', path: 'promotion' },
        { icon: Clock, label: 'Presença', path: 'attendance' },
        { icon: Settings, label: 'Configurações', path: 'settings' },
      ].map((item, index) => (
        <Link to={item.path} key={index}>
          <Button
            leftIcon={<Icon as={item.icon} />}
            justifyContent="flex-start"
            variant="ghost"
            size="lg"
            w="full"
            pl={8}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </VStack>
  </Box>
);

// Footer component
const Footer = () => (
  <Box bg={useColorModeValue('gray.100', 'gray.700')} py={4} textAlign="center">
    <Text fontSize="sm">© 2024 Your Company. All rights reserved.</Text>
  </Box>
);

// Chart data
const employeeData = [
  { name: 'Ativos', value: 300 },
  { name: 'Férias', value: 50 },
  { name: 'Afastados', value: 20 },
];

const performanceData = [
  { name: 'Jan', concluídas: 65, pendentes: 35 },
  { name: 'Fev', concluídas: 59, pendentes: 41 },
  { name: 'Mar', concluídas: 80, pendentes: 20 },
  { name: 'Abr', concluídas: 81, pendentes: 19 },
  { name: 'Mai', concluídas: 56, pendentes: 44 },
  { name: 'Jun', concluídas: 55, pendentes: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Chart components
const EmployeeChart = () => (
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

const PerformanceChart = () => (
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

const QuickActions = () => (
  <Box p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
    <Text fontSize="xl" fontWeight="bold" mb={4}>Ações Rápidas</Text>
    <VStack spacing={3}>
      <Button colorScheme="blue" width="full">Adicionar Funcionário</Button>
      <Button colorScheme="green" width="full">Iniciar Nova Avaliação</Button>
      <Button colorScheme="purple" width="full">Gerar Relatório</Button>
    </VStack>
  </Box>
);

const RecentEmployees = () => (
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

const AdminDashboard: React.FC = () => {
    const location = useLocation();

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex flex={1} overflow="hidden">
        <Box display={{ base: 'none', md: 'block' }} w={64}>
          <Sidebar />
        </Box>
        <Box flex={1} p={8} ml={{ base: 0, md: 64 }} overflow="auto">
          <Container maxW="container.xl">
            {/* Renderiza apenas se não for uma rota filha */}
            {!location.pathname.startsWith('/AdminDashboard/') && (
              <>
                <Text fontSize="3xl" fontWeight="bold" mb={6}>Painel de Administração</Text>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
                  <EmployeeChart />
                  <PerformanceChart />
                  <QuickActions />
                </SimpleGrid>
                <RecentEmployees />
              </>
            )}

            {/* Renderiza o Outlet apenas se a rota for uma das rotas filhas */}
            <Outlet />
          </Container>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};


export default AdminDashboard;
