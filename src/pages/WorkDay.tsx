import  { useState, useCallback } from 'react';
import {
  Button,
  Input,
  Select,
  Textarea,
  Box,
  Text,
  Heading,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

// Definindo o tipo Record para os registros de presença
interface Record {
  id: number;
  employeeName: string;
  date: string;
  present: string;
  justification: string;
}

function AttendancePage() {
  // Usando o tipo Record[] para a lista de registros
  const [records, setRecords] = useState<Record[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [present, setPresent] = useState('YES');
  const [justification, setJustification] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleAddRecord = () => {
    if (employeeName && date) {
      const newRecord: Record = {
        id: Date.now(),
        employeeName,
        date,
        present,
        justification: present === 'NO' ? justification : '',
      };
      setRecords((prevRecords) => [...prevRecords, newRecord]); // Agora prevRecords é do tipo Record[]
      toast({
        title: 'Sucesso',
        description: 'Registro de presença adicionado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setEmployeeName('');
      setDate('');
      setPresent('YES');
      setJustification('');
      setIsModalOpen(false);
    } else {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este registro?')) {
      setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
      toast({
        title: 'Registro excluído',
        description: 'O registro foi excluído com sucesso',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const generateReport = useCallback(() => {
    try {
      const reportData = records.map((record) => ({
        'Nome do Funcionário': record.employeeName,
        Data: format(parseISO(record.date), 'dd/MM/yyyy'),
        Presente: record.present === 'YES' ? 'Sim' : 'Não',
        Justificativa: record.justification || '-',
      }));

      const csv = [
        Object.keys(reportData[0]).join(','),
        ...reportData.map((row) =>
          Object.values(row).map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')
        ),
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `relatorio-presenca-${format(new Date(), 'dd-MM-yyyy')}.csv`;
      link.click();

      toast({
        title: 'Sucesso',
        description: 'Relatório gerado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao gerar relatório',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [records, toast]);

  return (
    <Box p={8} maxWidth="800px" mx="auto">
      <Heading mb={6}>Controle de Presença</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
          Adicionar Registro
        </Button>
        <Button colorScheme="blue" onClick={generateReport}>
          Gerar Relatório CSV
        </Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Novo Registro de Presença</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Input
                  placeholder="Nome do Funcionário"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Data"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Select
                  value={present}
                  onChange={(e) => setPresent(e.target.value)}
                >
                  <option value="YES">Sim</option>
                  <option value="NO">Não</option>
                </Select>
                {present === 'NO' && (
                  <Textarea
                    placeholder="Justificativa de ausência"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                  />
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleAddRecord}>
                Adicionar
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box as="ul" mt={4}>
          {records.map((record) => (
            <Box
              as="li"
              key={record.id}
              p={4}
              border="1px"
              borderRadius="md"
              borderColor="gray.200"
              mb={2}
            >
              <Text>
                <strong>Nome:</strong> {record.employeeName}
              </Text>
              <Text>
                <strong>Data:</strong> {record.date}
              </Text>
              <Text>
                <strong>Presente:</strong> {record.present === 'YES' ? 'Sim' : 'Não'}
              </Text>
              {record.present === 'NO' && (
                <Text>
                  <strong>Justificativa:</strong> {record.justification}
                </Text>
              )}
              <Button
                colorScheme="red"
                size="sm"
                mt={2}
                onClick={() => handleDelete(record.id)}
              >
                Excluir
              </Button>
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
}

export default AttendancePage;
