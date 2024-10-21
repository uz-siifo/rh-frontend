import React from 'react';
import { Box, Flex, Avatar, Text, VStack, Button, Icon } from '@chakra-ui/react';

type MenuItem = {
  icon: React.ElementType;
  text: string;
};

type SidebarProps = {
  items: MenuItem[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ items, selectedItem, onSelectItem }) => {
  return (
    <Box w="280px" bg="white" boxShadow="lg" p={5}>
      <Flex align="center" mb={10}>
        <Avatar size="md" src="https://bit.ly/broken-link" mr={3} />
        <Box>
          <Text fontWeight="bold" fontSize="lg">Nome do Usuário</Text>
          <Text fontSize="sm" color="gray.500">Gerente de RH</Text>
        </Box>
      </Flex>
      <VStack align="stretch" spacing={4}>
        {items.map((item) => (
          <Button
            key={item.text}
            leftIcon={<Icon as={item.icon} />}
            justifyContent="flex-start"
            variant={selectedItem === item.text ? 'solid' : 'ghost'}
            colorScheme="brand"
            onClick={() => onSelectItem(item.text)}
          >
            {item.text}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
