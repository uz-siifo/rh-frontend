import React from 'react';
import { Box, VStack, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Settings, FileText, Clock, Award, Users, Home } from 'lucide-react';

const Sidebar: React.FC = () => (
  <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    w={{ base: 'full', md: 64 }}
    pos="fixed"
    h="full"
    py={4}
  >
    <VStack spacing={1} align="stretch">
      {[
        { icon: Home, label: 'Dashboard', path: '/AdminDashboard' },
        { icon: Users, label: 'Funcionários', path: 'Employees' },
        { icon: FileText, label: 'Avaliações', path: 'performance-evaluation' },
        { icon: Award, label: 'Promoções', path: 'promotion' },
        { icon: Clock, label: 'Presença', path: 'attendance' },
        { icon: Settings, label: 'Configurações', path: 'settings' },
      ].map((item, index) => (
        <Link to={item.path} key={index}>
          <Button
            leftIcon={<Icon as={item.icon} />}
            justifyContent="flex-start"
            variant="ghost"
            size="lg"
            w="full"
            pl={8}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </VStack>
  </Box>
);

export default Sidebar;
