import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Flex,
  Grid,
  useColorModeValue,
} from '@chakra-ui/react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/header';
import EmployeePerformanceCard from '../components/Dashboard/EmployerPerformance';
import RecentPromotionsCard from '../components/Dashboard/RecentPromotions';
import AttendanceCard from '../components/Dashboard/Attendance';
import WorkScheduleCard from '../components/Dashboard/WorkHours';
import NotificationsCard from '../components/Dashboard/Notifications';

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

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>('Gestão de Desempenho');

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <ChakraProvider theme={theme}>
      <Flex h="100vh" bg={bgColor}>
        {/* Barra lateral */}
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

        {/* Conteúdo principal */}
        <Box flex={1} p={8} ml={{ base: 0, md: 20 }} overflow="auto">
          <Header selectedItem={selectedItem} />
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {/* Renderiza apenas se na rota principal do Dashboard */}
            {location.pathname === '/dashboard' && (
              <>
                <EmployeePerformanceCard />
                <RecentPromotionsCard />
                <AttendanceCard />
                <WorkScheduleCard />
                <NotificationsCard />
              </>
            )}
          </Grid>
          <Outlet />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Dashboard;
