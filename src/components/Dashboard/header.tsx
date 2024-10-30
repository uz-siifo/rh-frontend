import React from 'react';
import {
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import { MdNotifications, MdArrowForward } from 'react-icons/md';

interface HeaderProps {
  selectedItem: string;
}

const Header: React.FC<HeaderProps> = ({ selectedItem }) => {
  return (
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
  );
};

export default Header;
