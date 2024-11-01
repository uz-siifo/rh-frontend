import React, { useState,} from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { format, parseISO, differenceInMinutes, setHours, setMinutes } from 'date-fns';
import { SearchIcon } from '@chakra-ui/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface WorkHoursRecord {
  id: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakStart?: string;
  breakEnd?: string;
  totalWorkedHours: number;
  overtimeHours: number;
}

interface WorkHoursFormData {
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  breakStart: string;
  breakEnd: string;
}

// Constants
const INITIAL_FORM_STATE: WorkHoursFormData = {
  employeeName: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  checkIn: '09:00',
  checkOut: '18:00',
  breakStart: '12:00',
  breakEnd: '13:00',
};

const REGULAR_WORK_HOURS = 8;

const WorkHoursPage: React.FC = () => {
  const [records, setRecords] = useState<WorkHoursRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<WorkHoursFormData>(INITIAL_FORM_STATE);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const calculateHours = (data: WorkHoursFormData) => {
    const baseDate = parseISO(data.date);
    const checkIn = setMinutes(setHours(baseDate, parseInt(data.checkIn.split(':')[0])), parseInt(data.checkIn.split(':')[1]));
    const checkOut = setMinutes(setHours(baseDate, parseInt(data.checkOut.split(':')[0])), parseInt(data.checkOut.split(':')[1]));

    const breakStart = data.breakStart ? setMinutes(setHours(baseDate, parseInt(data.breakStart.split(':')[0])), parseInt(data.breakStart.split(':')[1])) : null;
    const breakEnd = data.breakEnd ? setMinutes(setHours(baseDate, parseInt(data.breakEnd.split(':')[0])), parseInt(data.breakEnd.split(':')[1])) : null;

    let totalMinutes = differenceInMinutes(checkOut, checkIn);
    if (breakStart && breakEnd) {
      totalMinutes -= differenceInMinutes(breakEnd, breakStart);
    }
    const totalWorkedHours = totalMinutes / 60;
    const overtimeHours = Math.max(0, totalWorkedHours - REGULAR_WORK_HOURS);

    return { totalWorkedHours, overtimeHours };
  };

  const handleInputChange = (name: keyof WorkHoursFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { totalWorkedHours, overtimeHours } = calculateHours(formData);
    const newRecord: WorkHoursRecord = {
      id: Date.now(),
      ...formData,
      totalWorkedHours,
      overtimeHours,
    };
    setRecords((prev) => [...prev, newRecord]);
    setFormData(INITIAL_FORM_STATE);
    setIsModalOpen(false);
    toast({
      title: "Sucesso",
      description: "Registro de horário adicionado com sucesso",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} maxW="6xl" mx="auto">
      <Box mb={6}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input placeholder="Buscar por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </InputGroup>
        <Button mt={4} onClick={() => setIsModalOpen(true)}>
          Novo Registro
        </Button>
      </Box>

      <Box mb={6}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalWorkedHours" name="Horas Totais" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="overtimeHours" name="Horas Extras" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome do Funcionário</Th>
            <Th>Data</Th>
            <Th>Entrada</Th>
            <Th>Saída</Th>
            <Th>Pausa</Th>
            <Th>Total de Horas</Th>
            <Th>Horas Extras</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record.id}>
              <Td>{record.employeeName}</Td>
              <Td>{record.date}</Td>
              <Td>{record.checkIn}</Td>
              <Td>{record.checkOut}</Td>
              <Td>{record.breakStart && record.breakEnd ? `${record.breakStart} - ${record.breakEnd}` : '-'}</Td>
              <Td>{record.totalWorkedHours.toFixed(1)}h</Td>
              <Td>{record.overtimeHours.toFixed(1)}h</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Registro de Horário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome do Funcionário</FormLabel>
              <Input value={formData.employeeName} onChange={(e) => handleInputChange('employeeName', e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Data</FormLabel>
              <Input type="date" value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WorkHoursPage;
