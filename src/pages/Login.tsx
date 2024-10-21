import React from 'react';
import { motion } from 'framer-motion';
import './Login.css';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  Link,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

// Definindo o MotionBox
const MotionBox = motion(Box);

// Animação flutuante
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Componente LoginForm
const LoginForm: React.FC = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Image src="src/assets/logo.PNG" alt="Logo" alignSelf="center" boxSize="60px" borderRadius={9} />
      <Heading size="lg">Olá! Bem-vindo</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email address"  />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="••••••••••" />
      </FormControl>
      <HStack justify="space-between">
        <Checkbox>Lembre-se de mim</Checkbox>
        <Link color="blue.500">Redefinir Senha!</Link>
      </HStack>
      <Button colorScheme="blue" width="full">
        Login
      </Button>
      <Text textAlign="center">ou</Text>
      <HStack spacing={4} justify="center">
        <Button leftIcon={<FaGoogle />} variant="outline" />
        <Button leftIcon={<FaFacebook />} variant="outline" />
        <Button leftIcon={<FaApple />} variant="outline" />
      </HStack>
    </VStack>
  );
};

// Componente Pai: AuthPage
const AuthPage: React.FC = () => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="1000px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Flex>
          {/* Lado esquerdo com gradiente e animações */}
          <Box
            w="50%"
            bgGradient="linear(to-br, blue.400, purple.500)"
            color="white"
            p={10}
            borderLeftRadius="lg"
            position="relative"
            overflow="hidden"
          >
            <VStack spacing={8} align="flex-start" zIndex={2} position="relative">
              <Box>
                <Heading size="2xl" mt={20} fontWeight="bold" lineHeight="1.2">
                  Transforma ambientes de trabalho com soluções estratégicas de RH
                </Heading>
                <Text mt={6} fontSize="xl" fontWeight="medium">
                  Faça login para se juntar à nossa comunidade inovadora
                </Text>
              </Box>
            </VStack>

            {/* Elementos geométricos animados */}
            <MotionBox
              position="absolute"
              top="10%"
              left="5%"
              w="100px"
              h="100px"
              borderRadius="full"
              bg="rgba(255,255,255,0.1)"
              animation={`${float} 6s ease-in-out infinite`}
            />
            <MotionBox
              position="absolute"
              bottom="15%"
              right="10%"
              w="150px"
              h="150px"
              borderRadius="30px"
              bg="rgba(255,255,255,0.15)"
              transform="rotate(45deg)"
              animation={`${float} 8s ease-in-out infinite`}
            />
            <MotionBox
              position="absolute"
              top="40%"
              right="15%"
              w="80px"
              h="80px"
              borderRadius="20px"
              bg="rgba(255,255,255,0.1)"
              animation={`${float} 7s ease-in-out infinite`}
            />
            <MotionBox
              position="absolute"
              bottom="10%"
              left="15%"
              w="120px"
              h="120px"
              borderRadius="60px 20px 60px 20px"
              bg="rgba(255,255,255,0.12)"
              animation={`${float} 9s ease-in-out infinite`}
            />

            {/* Overlay com gradiente para profundidade */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)"
              zIndex={1}
            />
          </Box>

          {/* Lado direito com o formulário de login */}
          <Box w="50%" p={10}>
            <LoginForm />
            {/* <Text mt={4}>
              Já tem uma conta? 
              <Link color="blue.500" onClick={() => console.log("Redirect to login")}>
                Login
              </Link>
            </Text> */}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthPage;
