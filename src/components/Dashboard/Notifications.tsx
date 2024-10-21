import React from 'react';
import { Box, Heading, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';

const Notifications: React.FC = () => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
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
  );
};

export default Notifications;
