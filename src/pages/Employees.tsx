import { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  InputGroup,
  InputLeftElement,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import 'react-datepicker/dist/react-datepicker.css';

interface Employee {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  dataContratacao: string;
  status: 'Ativo' | 'Inativo' | 'Férias';
  email: string;
  telefone: string;
}

const DEPARTMENTS = [
  'Administrativo',
  'Comercial',
  'Desenvolvimento',
  'Financeiro',
  'RH',
  'Suporte'
];

const ROLES = [
  'Analista',
  'Desenvolvedor',
  'Gerente',
  'Coordenador',
  'Diretor',
  'Estagiário'
];

const STATUS = ['Ativo', 'Inativo', 'Férias'];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome?.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cargo) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!formData.email?.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.telefone?.match(/^8\d{8}$/)) newErrors.telefone = 'Telefone inválido. Deve ter 9 dígitos começando com 8.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const currentDate = new Date().toISOString();

    if (selectedEmployee) {
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === selectedEmployee.id
            ? { ...emp, ...formData, dataContratacao: emp.dataContratacao }
            : emp
        )
      );
      showNotification('Funcionário atualizado com sucesso!', 'success');
    } else {
      const newEmployee = {
        ...formData,
        id: employees.length + 1,
        dataContratacao: currentDate,
        status: 'Ativo' as const,
      } as Employee;

      setEmployees(prev => [...prev, newEmployee]);
      showNotification('Funcionário adicionado com sucesso!', 'success');
    }

    handleCloseModal();
  };

  const handleDelete = (employee: Employee) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
    showNotification('Funcionário removido com sucesso!', 'success');
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
    setSelectedEmployee(null);
    setFormData({});
    setErrors({});
  };

  const showNotification = (message: string, status: 'success' | 'error') => {
    toast({
      title: status === 'success' ? 'Sucesso!' : 'Erro!',
      description: message,
      status: status,
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const handleNewEmployee = () => {
    setFormData({});
    setSelectedEmployee(null);
    onOpen();
  };

  const filteredEmployees = employees.filter(
    emp =>
      emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'green';
      case 'Inativo':
        return 'red';
      case 'Férias':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Card>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="lg">Gestão de Funcionários</Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={handleNewEmployee}
            >
              Novo Funcionário
            </Button>
          </HStack>
        </CardHeader>

        <CardBody>
          <VStack spacing={6} align="stretch">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Pesquisar funcionários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Cargo</Th>
                    <Th>Departamento</Th>
                    <Th>Status</Th>
                    <Th>Data Contratação</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEmployees.map((employee) => (
                    <Tr key={employee.id}>
                      <Td>{employee.nome}</Td>
                      <Td>{employee.cargo}</Td>
                      <Td>{employee.departamento}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </Td>
                      <Td>
                        {new Date(employee.dataContratacao).toLocaleDateString('pt-BR')}
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button
                            size="sm"
                            leftIcon={<EditIcon />}
                            onClick={() => handleEdit(employee)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}
                            onClick={() => handleDelete(employee)}
                          >
                            Excluir
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.nome}>
                <FormLabel>Nome</FormLabel>
                <Input
                  placeholder="Nome completo"
                  value={formData.nome || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nome: e.target.value }))
                  }
                />
                <FormErrorMessage>{errors.nome}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.cargo}>
                <FormLabel>Cargo</FormLabel>
                <Select
                  placeholder="Selecione o cargo"
                  value={formData.cargo}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cargo: e.target.value }))
                  }
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.cargo}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.departamento}>
                <FormLabel>Departamento</FormLabel>
                <Select
                  placeholder="Selecione o departamento"
                  value={formData.departamento}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, departamento: e.target.value }))
                  }
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.departamento}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  placeholder="Selecione o status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value as Employee['status'] }))
                  }
                >
                  {STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="email@exemplo.com"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.telefone}>
                <FormLabel>Telefone</FormLabel>
                <Input
                  placeholder="8XXXXXXXX" // Atualiza o placeholder para refletir o formato
                  value={formData.telefone || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, telefone: e.target.value }))
                  }
                />
                <FormErrorMessage>{errors.telefone}</FormErrorMessage>
              </FormControl>
              {selectedEmployee && (
                <FormControl>
                  <FormLabel>Data de Contratação</FormLabel>
                  <Input
                    value={new Date(selectedEmployee.dataContratacao).toLocaleDateString('pt-BR')}
                    isReadOnly
                  />
                </FormControl>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}