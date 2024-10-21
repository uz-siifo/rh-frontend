import React from 'react';
import { Box, Heading, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';

const RecentPromotions: React.FC = () => {
  return (
    <Box bg="white" borderRadius="xl" p={6} boxShadow="md">
      <Heading size="md" mb={4} color="brand.600">Promoções Recentes</Heading>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdStar} color="yellow.500" />
          Maria Silva - Analista Sênior
        </ListItem>
        <ListItem>
          <ListIcon as={MdStar} color="yellow.500" />
          João Costa - Gerente de Projetos
        </ListItem>
      </List>
    </Box>
  );
};

export default RecentPromotions;
