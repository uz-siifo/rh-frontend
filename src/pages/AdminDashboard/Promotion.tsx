import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

interface Promocao {
  id: number;
  funcionarioId: number;
  dataPromocao: string;
  novoCargo: string;
  motivo: string;
}

interface User {
  id: number;
}

interface PromotionProps {
  currentUser: User | null;
}

const Promotion: React.FC<PromotionProps> = ({ currentUser }) => {
  const [promocoes] = useState<Promocao[]>([
    // Dados de exemplo, pode substituir por dados reais vindos da API ou banco de dados
    { id: 1, funcionarioId: 1, dataPromocao: '2023-10-01', novoCargo: 'Gerente', motivo: 'Desempenho' },
    { id: 2, funcionarioId: 2, dataPromocao: '2023-09-15', novoCargo: 'Supervisor', motivo: 'Experiência' },
    { id: 3, funcionarioId: 1, dataPromocao: '2022-08-10', novoCargo: 'Coordenador', motivo: 'Projeto concluído' },
  ]);

  // Filtra as promoções para exibir apenas as do usuário logado
  const promocoesUsuario = promocoes.filter(promo => promo.funcionarioId === currentUser?.id);

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>Promoções do Funcionário</Text>
      
      {promocoesUsuario.length === 0 ? (
        <Text color="gray.500">Nenhuma promoção encontrada para o usuário.</Text>
      ) : (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Data da Promoção</Th>
              <Th>Novo Cargo</Th>
              <Th>Motivo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {promocoesUsuario.map(promocao => (
              <Tr key={promocao.id}>
                <Td>{promocao.id}</Td>
                <Td>{new Date(promocao.dataPromocao).toLocaleDateString()}</Td>
                <Td>{promocao.novoCargo}</Td>
                <Td>{promocao.motivo}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Promotion;
