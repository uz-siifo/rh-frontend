import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdStar } from 'react-icons/md';

const RecentPromotionsCard: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
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

);
};

export default RecentPromotionsCard;
