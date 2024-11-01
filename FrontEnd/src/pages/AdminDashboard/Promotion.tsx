import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Text } from '@chakra-ui/react';

interface Promocao {
  id: number;
  funcionarioId: number;
  dataPromocao: string;
  novoCargo: string;
  motivo: string;
}

const Promotion: React.FC = () => {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [promocaoSelecionada, setPromocaoSelecionada] = useState<Promocao | null>(null);
  const [modo, setModo] = useState<'view' | 'edit'>('view');
  const [mensagem, setMensagem] = useState<string>('');

  const handleEditClick = (promocao: Promocao) => {
    setPromocaoSelecionada(promocao);
    setModo('edit');
  };

  const handleSave = (valores: Promocao) => {
    if (!valores.novoCargo || !valores.motivo) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (promocaoSelecionada) {
      // Atualiza a promoção selecionada
      setPromocoes(prev => prev.map(promocao => 
        promocao.id === promocaoSelecionada.id ? valores : promocao
      ));
      setMensagem('Promoção atualizada com sucesso!');
    } else {
      // Adiciona nova promoção
      const novaPromocao = { ...valores, id: promocoes.length + 1, dataPromocao: new Date().toISOString() };
      setPromocoes(prev => [...prev, novaPromocao]);
      setMensagem('Promoção adicionada com sucesso!');
    }
    resetForm();
  };

  const resetForm = () => {
    setModo('view');
    setPromocaoSelecionada(null);
    setMensagem('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (promocaoSelecionada) {
      const { name, value } = e.target;
      setPromocaoSelecionada(prev => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <Box p={4}>
      <Button onClick={() => { setPromocaoSelecionada(null); setModo('edit'); }}>Iniciar Nova Promoção</Button>
      {mensagem && <Text color="red.500" mt={2}>{mensagem}</Text>}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Data da Promoção</Th>
            <Th>ID Funcionário</Th>
            <Th>Novo Cargo</Th>
            <Th>Motivo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {promocoes.map(promocao => (
            <Tr key={promocao.id}>
              <Td>{promocao.id}</Td>
              <Td>{new Date(promocao.dataPromocao).toLocaleDateString()}</Td>
              <Td>{promocao.funcionarioId}</Td>
              <Td>{promocao.novoCargo}</Td>
              <Td>{promocao.motivo}</Td>
              <Td>
                <Button onClick={() => handleEditClick(promocao)}>Editar</Button>
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
            value={promocaoSelecionada?.funcionarioId || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Input 
            name="novoCargo" 
            placeholder="Novo Cargo" 
            value={promocaoSelecionada?.novoCargo || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Input 
            name="motivo" 
            placeholder="Motivo da Promoção" 
            value={promocaoSelecionada?.motivo || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Button onClick={() => handleSave(promocaoSelecionada!)} mt={2}>Salvar Promoção</Button>
        </Box>
      )}
    </Box>
  );
};

export default Promotion;
