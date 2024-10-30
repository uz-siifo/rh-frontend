import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Text, Textarea } from '@chakra-ui/react';

interface Avaliacao {
  id: number;
  funcionarioId: number;
  dataAvaliacao: string;
  nota: number;
  feedback: string;
}

const PerformanceEvaluation: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState<Avaliacao | null>(null);
  const [modo, setModo] = useState<'view' | 'edit'>('view');
  const [mensagem, setMensagem] = useState<string>('');

  const handleEditClick = (avaliacao: Avaliacao) => {
    setAvaliacaoSelecionada(avaliacao);
    setModo('edit');
  };

  const handleSave = (valores: Avaliacao) => {
    if (!valores.nota || !valores.feedback) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (avaliacaoSelecionada) {
      // Atualiza a avaliação selecionada
      setAvaliacoes(prev => prev.map(avaliacao => 
        avaliacao.id === avaliacaoSelecionada.id ? valores : avaliacao
      ));
      setMensagem('Avaliação atualizada com sucesso!');
    } else {
      // Adiciona nova avaliação
      const novaAvaliacao = { ...valores, id: avaliacoes.length + 1, dataAvaliacao: new Date().toISOString() };
      setAvaliacoes(prev => [...prev, novaAvaliacao]);
      setMensagem('Avaliação adicionada com sucesso!');
    }
    resetForm();
  };

  const resetForm = () => {
    setModo('view');
    setAvaliacaoSelecionada(null);
    setMensagem('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (avaliacaoSelecionada) {
      const { name, value } = e.target;
      setAvaliacaoSelecionada(prev => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <Box p={4}>
      <Button onClick={() => { setAvaliacaoSelecionada(null); setModo('edit'); }}>Iniciar Nova Avaliação</Button>
      {mensagem && <Text color="red.500" mt={2}>{mensagem}</Text>}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Data da Avaliação</Th>
            <Th>ID Funcionário</Th>
            <Th>Nota</Th>
            <Th>Feedback</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {avaliacoes.map(avaliacao => (
            <Tr key={avaliacao.id}>
              <Td>{avaliacao.id}</Td>
              <Td>{new Date(avaliacao.dataAvaliacao).toLocaleDateString()}</Td>
              <Td>{avaliacao.funcionarioId}</Td>
              <Td>{avaliacao.nota}</Td>
              <Td>{avaliacao.feedback}</Td>
              <Td>
                <Button onClick={() => handleEditClick(avaliacao)}>Editar</Button>
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
            value={avaliacaoSelecionada?.funcionarioId || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Input 
            name="nota" 
            placeholder="Nota" 
            value={avaliacaoSelecionada?.nota || ''} 
            onChange={handleInputChange} 
            mb={2}
            type="number"
            min="0"
            max="10"
          />
          <Textarea 
            name="feedback" 
            placeholder="Feedback" 
            value={avaliacaoSelecionada?.feedback || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Button onClick={() => handleSave(avaliacaoSelecionada!)} mt={2}>Salvar Avaliação</Button>
        </Box>
      )}
    </Box>
  );
};

export default PerformanceEvaluation;
