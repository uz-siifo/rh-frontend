import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import { MdNotifications, MdArrowForward } from 'react-icons/md';

interface HeaderProps {
  selectedItem: string;
}

const Header: React.FC<HeaderProps> = ({ selectedItem }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleNavigateToNotifications = () => {
    navigate('/notifications');
  };

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica de logout
    // Por exemplo, limpar o token de autenticação do localStorage
    localStorage.removeItem('authToken');
    
    toast({
      title: 'Logout realizado com sucesso',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    // Redireciona para a página de login
    navigate('/');
  };

  return (
    <Flex justify="space-between" align="center" mb={8}>
      <Heading size="lg" color="brand.600">{selectedItem}</Heading>
      <Flex>
        <Button 
          leftIcon={<MdNotifications />} 
          variant="ghost" 
          colorScheme="brand" 
          mr={4}
          onClick={handleNavigateToNotifications}
        >
          Notificações
        </Button>
        <Button 
          rightIcon={<MdArrowForward />} 
          colorScheme="brand" 
          variant="outline"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;