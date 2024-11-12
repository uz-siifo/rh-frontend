// src/components/Sidebar.tsx
import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { MdDashboard, MdTrendingUp, MdDateRange, MdAccessTime, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthoContexts';

type MenuItem = {
  icon: React.ElementType;
  text: string;
  path: string;
};

const sidebarItems: MenuItem[] = [
  { icon: MdDashboard, text: 'Gestão de Desempenho', path: '/dashboard' },
  { icon: MdTrendingUp, text: 'Progressões e Promoções', path: 'progressoes-promocoes' },
  { icon: MdDateRange, text: 'Controle de Dias de Trabalho', path: 'controle-dias' },
  { icon: MdAccessTime, text: 'Gestão de Horários', path: 'gestao-horarios' },
  { icon: MdPeople, text: 'Perfil dos Funcionários', path: 'perfil-funcionarios' },
];

interface SidebarProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, setSelectedItem }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Usando `currentUser` do AuthContext

  const handleNavigation = (item: MenuItem) => {
    setSelectedItem(item.text);
    navigate(item.path);
  };

  return (
    <Box w="300px" bg="white" boxShadow="lg" p={5}>
      <Flex align="center" mb={10}>
        <Avatar size="md" src="https://bit.ly/broken-link" mr={3} />
        <Box>
          <Text fontWeight="bold" fontSize="lg">{currentUser?.name || 'Nome do Usuário'}</Text>
          <Text fontSize="sm" color="gray.500">{currentUser?.role || 'Cargo do Usuário'}</Text>
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
            onClick={() => handleNavigation(item)}
          >
            {item.text}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
