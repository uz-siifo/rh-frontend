import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  useColorModeValue,
  ListIcon,  
} from '@chakra-ui/react';

import {
  MdNotifications,
} from 'react-icons/md';

const NotificationsCard: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={cardBg} borderRadius="xl" p={6} boxShadow="md" transition="all 0.3s" _hover={{ boxShadow: "xl" }}>
    <Heading size="md" mb={4} color="brand.600">Notificações</Heading>
    <List spacing={3}>
      <ListItem>
        <ListIcon as={MdNotifications} color="blue.500" />
        Avaliação de desempenho próxima
      </ListItem>
      <ListItem>
        <ListIcon as={MdNotifications} color="blue.500" />
        Férias de João Costa em breve
      </ListItem>
    </List>
  </Box>
);
};

export default NotificationsCard;
