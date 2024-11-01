import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Checkbox,
  Link,
  Image,
  HStack,
  FormControl,
  FormLabel,
  useToast,
  FormErrorMessage,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthoContexts';
import { LoginCredentials } from '../Types/auth';
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

// Estilo de animação
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const MotionBox = motion(Box);

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<LoginCredentials & { rememberMe: boolean }>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials & { rememberMe: boolean }>>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials & { rememberMe: boolean }> = {};
    
    if (!formState.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formState.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formState.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const userRole = await login({
        email: formState.email,
        password: formState.password,
      });

      const from = location.state?.from?.pathname;
      navigate(userRole === 'admin' ? (from || '/AdminDashboard') : (from || '/dashboard'), { replace: true });

      toast({
        title: 'Bem-vindo!',
        description: 'Login realizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      formState.rememberMe ? localStorage.setItem('rememberedEmail', formState.email) : localStorage.removeItem('rememberedEmail');

    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ocorreu um erro ao fazer login. Tente novamente.';

      toast({
        title: 'Erro no login',
        description: errorMessage,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof typeof formState]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

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
        bg="white"
      >
        <Flex>
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
                  Transforme ambientes de trabalho com soluções estratégicas de RH
                </Heading>
                <Text mt={6} fontSize="xl" fontWeight="medium">
                  Faça login para se juntar à nossa comunidade inovadora
                </Text>
              </Box>
            </VStack>

            {/* Elementos geométricos animados */}
            <MotionBox position="absolute" top="10%" left="5%" w="100px" h="100px" borderRadius="full" bg="rgba(255,255,255,0.1)" animation={`${float} 6s ease-in-out infinite`} />
            <MotionBox position="absolute" bottom="15%" right="10%" w="150px" h="150px" borderRadius="30px" bg="rgba(255,255,255,0.15)" transform="rotate(45deg)" animation={`${float} 8s ease-in-out infinite`} />
            <MotionBox position="absolute" top="40%" right="15%" w="80px" h="80px" borderRadius="20px" bg="rgba(255,255,255,0.1)" animation={`${float} 7s ease-in-out infinite`} />
            <MotionBox position="absolute" bottom="10%" left="15%" w="120px" h="120px" borderRadius="60px 20px 60px 20px" bg="rgba(255,255,255,0.12)" animation={`${float} 9s ease-in-out infinite`} />

            {/* Overlay com gradiente para profundidade */}
            <Box position="absolute" top={0} left={0} right={0} bottom={0} bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)" zIndex={1} />
          </Box>

          <Box w="50%" p={10}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <Image src="/assets/logo.png" alt="Logo" alignSelf="center" boxSize="60px" borderRadius={9} fallbackSrc="https://via.placeholder.com/60" />
                
                <Heading size="lg" textAlign="center">Olá! Bem-vindo</Heading>

                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={formState.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} isRequired>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={formState.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <HStack justify="space-between">
                  <Checkbox
                    name="rememberMe"
                    isChecked={formState.rememberMe}
                    onChange={handleInputChange}
                  >
                    Lembre-se de mim
                  </Checkbox>
                  <Link color="blue.500" href="/reset-password">Redefinir Senha</Link>
                </HStack>

                <Button type="submit" colorScheme="blue" width="full" isLoading={false} loadingText="Entrando...">Entrar</Button>

                {/* Separador */}
                <HStack justify="center">
                  <Box flex="1" h="1px" bg="gray.200" />
                  <Text px={3} color="gray.500">ou continue com</Text>
                  <Box flex="1" h="1px" bg="gray.200" />
                </HStack>

                {/* Botões de redes sociais */}
                <HStack spacing={4} justify="center">
                  <Button leftIcon={<FaGoogle />} variant="outline" onClick={() => toast({ title: "Em breve", description: "Login com Google será implementado em breve!", status: "info" })} />
                  <Button leftIcon={<FaFacebook />} variant="outline" onClick={() => toast({ title: "Em breve", description: "Login com Facebook será implementado em breve!", status: "info" })} />
                  <Button leftIcon={<FaApple />} variant="outline" onClick={() => toast({ title: "Em breve", description: "Login com Apple será implementado em breve!", status: "info" })} />
                </HStack>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginPage;
