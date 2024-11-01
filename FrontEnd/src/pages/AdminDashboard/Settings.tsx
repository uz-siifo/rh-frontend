import React, { useState } from 'react';
import { Box, Button, Input, Text, Switch, Stack, FormControl, FormLabel } from '@chakra-ui/react';

const Settings: React.FC = () => {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  const handleSaveSettings = () => {
    // Simular o salvamento das configurações
    setMensagem('Configurações salvas com sucesso!');
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>Configurações do Usuário</Text>
      {mensagem && <Text color="green.500" mb={4}>{mensagem}</Text>}

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email" 
          placeholder="Digite seu email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Senha</FormLabel>
        <Input 
          type="password" 
          placeholder="Digite sua senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel htmlFor="notificacoes" mb="0">
          Notificações Ativas
        </FormLabel>
        <Switch 
          id="notificacoes" 
          isChecked={notificacoesAtivas} 
          onChange={() => setNotificacoesAtivas(!notificacoesAtivas)} 
        />
      </FormControl>

      <Stack spacing={4}>
        <Button colorScheme="blue" onClick={handleSaveSettings}>
          Salvar Configurações
        </Button>
      </Stack>
    </Box>
  );
};

export default Settings;
