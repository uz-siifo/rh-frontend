import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Text } from '@chakra-ui/react';

interface Presenca {
  id: number;
  funcionarioId: number;
  dataPresenca: string;
  status: 'Presente' | 'Faltando';
}

const Attendance: React.FC = () => {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [presencaSelecionada, setPresencaSelecionada] = useState<Presenca | null>(null);
  const [modo, setModo] = useState<'view' | 'edit'>('view');
  const [mensagem, setMensagem] = useState<string>('');

  const handleEditClick = (presenca: Presenca) => {
    setPresencaSelecionada(presenca);
    setModo('edit');
  };

  const handleSave = (valores: Presenca) => {
    if (!valores.status) {
      setMensagem('Por favor, selecione o status de presença.');
      return;
    }

    if (presencaSelecionada) {
      // Atualiza a presença selecionada
      setPresencas(prev => prev.map(presenca => 
        presenca.id === presencaSelecionada.id ? valores : presenca
      ));
      setMensagem('Presença atualizada com sucesso!');
    } else {
      // Adiciona nova presença
      const novaPresenca = { ...valores, id: presencas.length + 1, dataPresenca: new Date().toISOString() };
      setPresencas(prev => [...prev, novaPresenca]);
      setMensagem('Presença registrada com sucesso!');
    }
    resetForm();
  };

  const resetForm = () => {
    setModo('view');
    setPresencaSelecionada(null);
    setMensagem('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (presencaSelecionada) {
      const { name, value } = e.target;
      setPresencaSelecionada(prev => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleStatusChange = (status: 'Presente' | 'Faltando') => {
    if (presencaSelecionada) {
      setPresencaSelecionada(prev => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <Box p={4}>
      <Button onClick={() => { setPresencaSelecionada(null); setModo('edit'); }}>Registrar Nova Presença</Button>
      {mensagem && <Text color="red.500" mt={2}>{mensagem}</Text>}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Data de Presença</Th>
            <Th>ID Funcionário</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {presencas.map(presenca => (
            <Tr key={presenca.id}>
              <Td>{presenca.id}</Td>
              <Td>{new Date(presenca.dataPresenca).toLocaleDateString()}</Td>
              <Td>{presenca.funcionarioId}</Td>
              <Td>{presenca.status}</Td>
              <Td>
                <Button onClick={() => handleEditClick(presenca)}>Editar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {modo === 'edit' && (
        <Box mt={4} borderWidth={1} borderRadius="lg" p={4}>
          <Input 
            name="funcionarioId" 
            placeholder="ID Funcionário" 
            value={presencaSelecionada?.funcionarioId || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Text mb={2}>Status de Presença:</Text>
          <Button 
            colorScheme={presencaSelecionada?.status === 'Presente' ? 'green' : 'gray'} 
            onClick={() => handleStatusChange('Presente')}
            mr={2}
          >
            Presente
          </Button>
          <Button 
            colorScheme={presencaSelecionada?.status === 'Faltando' ? 'red' : 'gray'} 
            onClick={() => handleStatusChange('Faltando')}
          >
            Faltando
          </Button>
          <Button onClick={() => handleSave(presencaSelecionada!)} mt={2}>Salvar Presença</Button>
        </Box>
      )}
    </Box>
  );
};

export default Attendance;
