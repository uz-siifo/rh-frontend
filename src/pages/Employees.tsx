import React, { useState } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  dataContratacao: string; 
}

const Employees: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const [modo, setModo] = useState<'view' | 'edit'>('view');
  const [mensagem, setMensagem] = useState<string>('');

  const handleEditClick = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModo('edit');
  };

  const handleSave = (valores: Funcionario) => {
    if (!valores.nome || !valores.cargo || !valores.departamento) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    if (funcionarioSelecionado) {
      // Atualiza o funcionário selecionado
      setFuncionarios(prev => prev.map(func => 
        func.id === funcionarioSelecionado.id ? valores : func
      ));
      setMensagem('Funcionário atualizado com sucesso!');
    } else {
      // Adiciona novo funcionário
      const novoFuncionario = { ...valores, id: funcionarios.length + 1 };
      setFuncionarios(prev => [...prev, novoFuncionario]);
      setMensagem('Funcionário adicionado com sucesso!');
    }
    resetForm();
  };

  const resetForm = () => {
    setModo('view');
    setFuncionarioSelecionado(null);
    setMensagem('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (funcionarioSelecionado) {
      const { name, value } = e.target;
      setFuncionarioSelecionado(prev => (prev ? { ...prev, [name]: value } : null));
    }
  };

  return (
    <Box p={4}>
      <Button onClick={() => { setFuncionarioSelecionado(null); setModo('edit'); }}>Adicionar Funcionário</Button>
      {mensagem && <Text color="red.500" mt={2}>{mensagem}</Text>}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Cargo</Th>
            <Th>Departamento</Th>
            <Th>Data de Contratação</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {funcionarios.map(funcionario => (
            <Tr key={funcionario.id}>
              <Td>{funcionario.id}</Td>
              <Td>{funcionario.nome}</Td>
              <Td>{funcionario.cargo}</Td>
              <Td>{funcionario.departamento}</Td>
              <Td>{funcionario.dataContratacao}</Td>
              <Td>
                <Button onClick={() => handleEditClick(funcionario)}>Editar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {modo === 'edit' && (
        <Box mt={4} borderWidth={1} borderRadius="lg" p={4}>
          {/* Campos de entrada para editar os dados do funcionário */}
          <Input 
            name="nome" 
            placeholder="Nome" 
            value={funcionarioSelecionado?.nome || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Input 
            name="cargo" 
            placeholder="Cargo" 
            value={funcionarioSelecionado?.cargo || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <Input 
            name="departamento" 
            placeholder="Departamento" 
            value={funcionarioSelecionado?.departamento || ''} 
            onChange={handleInputChange} 
            mb={2}
          />
          <DatePicker
            selected={funcionarioSelecionado ? new Date(funcionarioSelecionado.dataContratacao) : null}
            onChange={(date: Date | null) => {
              if (funcionarioSelecionado) {
                setFuncionarioSelecionado(prev => ({
                  ...prev!,
                  dataContratacao: date?.toISOString() || '',
                }));
              }
            }}
            placeholderText="Data de Contratação"
            className="react-datepicker"
            
          />
          <Button onClick={() => handleSave(funcionarioSelecionado!)} mt={2}>Salvar</Button>
        </Box>
      )}
    </Box>
  );
};

export default Employees;
