import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  Button,
  Icon,
  Avatar,
  Progress,
  List,
  ListItem,
  ListIcon,
  Grid,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  MdDashboard, 
  MdTrendingUp, 
  MdDateRange, 
  MdAccessTime, 
  MdPeople, 
  MdNotifications, 
  MdArrowForward,
  MdStar,
} from 'react-icons/md';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Tema personalizado
const theme = extendTheme({
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    brand: {
      50: '#E6E6FF',
      100: '#C4C6FF',
      200: '#A2A5FC',
      300: '#8888FC',
      400: '#6D6AFA',
      500: '#5D5FEF',
      600: '#4B4ACE',
      700: '#3B3AAE',
      800: '#2C2A8F',
      900: '#1E1B70',
    },
  },
});

// Tipos
type MenuItem = {
  icon: React.ElementType;
  text: string;
};

type EmployeePerformance = {
  name: string;
  value: number;
  color: string;
};

// Dados mock
const sidebarItems: MenuItem[] = [
  { icon: MdDashboard, text: 'Gestão de Desempenho' },
  { icon: MdTrendingUp, text: 'Progressões e Promoções' },
  { icon: MdDateRange, text: 'Controle de Dias de Trabalho' },
  { icon: MdAccessTime, text: 'Gestão de Horários' },
  { icon: MdPeople, text: 'Perfil dos Funcionários' },
];

const employeePerformance: EmployeePerformance[] = [
  { name: 'Excelente', value: 60, color: '#5D5FEF' },
  { name: 'Bom', value: 30, color: '#A2A5FC' },
  { name: 'Regular', value: 10, color: '#E6E6FF' },
];

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('Gestão de Desempenho');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <ChakraProvider theme={theme}>
      <Flex h="100vh" bg={bgColor}>
        {/* Barra lateral */}
        <Box w="280px" bg={cardBg} boxShadow="lg" p={5}>
          <Flex align="center" mb={10}>
            <Avatar size="md" src="https://bit.ly/broken-link" mr={3} />
            <Box>
              <Text fontWeight="bold" fontSize="lg">Nome do Usuário</Text>
              <Text fontSize="sm" color="gray.500">Gerente de RH</Text>
            </Box>
          </Flex>
          <VStack align="stretch" spacing={4}>
            {sidebarItems.map((item) => (
              <Button
                key={item.text}
                leftIcon={<Icon as={item.icon} />}
                justifyContent="flex-start"
                variant={selectedItem === item.text ? 'solid' : 'ghost'}
                colorScheme="brand"
                bg={selectedItem === item.text ? 'brand.500' : 'transparent'}
                color={selectedItem === item.text ? 'white' : textColor}
                _hover={{
                  bg: 'brand.100',
                  color: 'brand.800',
                }}
                onClick={() => setSelectedItem(item.text)}
              >
                {item.text}
              </Button>
            ))}
          </VStack>
        </Box>

        {/* Conteúdo principal */}
        <Box flex={1} p={8} overflowY="auto">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading size="lg" color="brand.600">{selectedItem}</Heading>
            <Flex>
              <Button leftIcon={<MdNotifications />} variant="ghost" colorScheme="brand" mr={4}>
                Notificações
              </Button>
              <Button rightIcon={<MdArrowForward />} colorScheme="brand" variant="outline">
                Sair
              </Button>
            </Flex>
          </Flex>

          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {/* Desempenho dos Funcionários */}
            <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
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

            {/* Promoções Recentes */}
            <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
              <Heading size="md" mb={4} color="brand.600">Promoções Recentes</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdStar} color="yellow.500" />
                  <Text as="span" fontWeight="bold">Maria Silva</Text> - Analista Sênior
                </ListItem>
                <ListItem>
                  <ListIcon as={MdStar} color="yellow.500" />
                  <Text as="span" fontWeight="bold">João Costa</Text> - Gerente de Projetos
                </ListItem>
              </List>
            </Box>

            {/* Presenças e Faltas */}
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

            {/* Horário de Trabalho */}
            <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
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

            {/* Notificações */}
            <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
              <Heading size="md" mb={4} color="brand.600">Notificações</Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdNotifications} color="blue.500" />
                  Reunião agendada para amanhã às 10h.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdNotifications} color="blue.500" />
                  Prazo para entrega do relatório: Sexta-feira.
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Dashboard;
