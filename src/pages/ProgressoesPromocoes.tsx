import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { PlusCircle, History } from 'lucide-react';

// Tipos
type Employee = {
  id: number;
  name: string;
  currentRole: string;
  performanceScore: number;
  yearsOfService: number;
};

type Promotion = {
  id: number;
  employeeId: number;
  employeeName: string;
  currentRole: string;
  proposedRole: string;
  promotionDate: string;
  type: 'PROMOTION' | 'PROGRESSION';
  reason: string;
};

const PromotionsPage = () => {
  const [employees] = useState<Employee[]>([
    { id: 1, name: 'João Silva', currentRole: 'Desenvolvedor Jr', performanceScore: 85, yearsOfService: 2 },
    { id: 2, name: 'Maria Santos', currentRole: 'Analista Pleno', performanceScore: 92, yearsOfService: 4 },
    { id: 3, name: 'Josias Magumba', currentRole: 'Banco de Dados', performanceScore: 100, yearsOfService: 3 },
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 1,
      employeeId: 1,
      employeeName: 'João Silva',
      currentRole: 'Desenvolvedor Jr',
      proposedRole: 'Desenvolvedor Pleno',
      promotionDate: '2024-03-15',
      type: 'PROMOTION',
      reason: 'Excelente desempenho e conclusão de projetos críticos',
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Maria Santos',
      currentRole: 'Analista Pleno',
      proposedRole: 'Analista Sênior',
      promotionDate: '2024-06-20',
      type: 'PROMOTION',
      reason: 'Desempenho excepcional em projetos',
    },
    {
      id: 3,
      employeeId: 3,
      employeeName: 'Josias Magumba',
      currentRole: 'Banco de Dados',
      proposedRole: 'Líder de Banco de Dados',
      promotionDate: '2024-08-10',
      type: 'PROGRESSION',
      reason: 'Capacitação e liderança',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [newPromotion, setNewPromotion] = useState({
    proposedRole: '',
    promotionDate: '',
    type: 'PROMOTION' as 'PROMOTION' | 'PROGRESSION',
    reason: '',
  });

  const [eligibilityMessage, setEligibilityMessage] = useState<string | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<Promotion[]>([]);
  
  const [customCriteria,] = useState({
    minYearsOfServiceForPromotion: 5,
    minYearsOfServiceForProgression: 3,
    minPerformanceScoreForPromotion: 90,
    minPerformanceScoreForProgression: 85,
  });

  const toast = useToast();

  // Função para verificar elegibilidade
  const checkEligibility = (employee: Employee) => {
    let eligibility = 'NÃO ELEGÍVEL';
    let reasons = [];

    if (employee.yearsOfService >= customCriteria.minYearsOfServiceForProgression && employee.performanceScore >= customCriteria.minPerformanceScoreForProgression) {
      eligibility = 'ELEGÍVEL PARA PROGRESSÃO';
    } else if (employee.yearsOfService >= customCriteria.minYearsOfServiceForPromotion && employee.performanceScore >= customCriteria.minPerformanceScoreForPromotion) {
      eligibility = 'ELEGÍVEL PARA PROMOÇÃO';
    }

    if (eligibility === 'NÃO ELEGÍVEL') {
      if (employee.yearsOfService < customCriteria.minYearsOfServiceForProgression || employee.performanceScore < customCriteria.minPerformanceScoreForProgression) {
        reasons.push(`Mínimo de ${customCriteria.minYearsOfServiceForProgression} anos de serviço e ${customCriteria.minPerformanceScoreForProgression} de pontuação de desempenho necessário para progressão.`);
      }
      if (employee.yearsOfService < customCriteria.minYearsOfServiceForPromotion || employee.performanceScore < customCriteria.minPerformanceScoreForPromotion) {
        reasons.push(`Mínimo de ${customCriteria.minYearsOfServiceForPromotion} anos de serviço e ${customCriteria.minPerformanceScoreForPromotion} de pontuação de desempenho necessário para promoção.`);
      }
    }

    return { eligibility, reasons };
  };

  // Alterar funcionário selecionado
  const handleEmployeeChange = (id: number) => {
    setSelectedEmployee(id);
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      const { eligibility, reasons } = checkEligibility(employee);
      setEligibilityMessage(`${eligibility}${reasons.length ? ': ' + reasons.join(' ') : ''}`);
    }
  };

  // Adicionar nova promoção
  const handleAddPromotion = () => {
    if (!selectedEmployee) return;

    const employee = employees.find(emp => emp.id === selectedEmployee);
    if (!employee) return;

    const newPromotionEntry: Promotion = {
      id: promotions.length + 1,
      employeeId: employee.id,
      employeeName: employee.name,
      currentRole: employee.currentRole,
      proposedRole: newPromotion.proposedRole,
      promotionDate: newPromotion.promotionDate,
      type: newPromotion.type,
      reason: newPromotion.reason,
    };

    setPromotions([...promotions, newPromotionEntry]);
    setIsModalOpen(false);
    resetForm();

    // Toast de sucesso
    toast({
      title: 'Promoção registrada!',
      description: `Promoção para ${employee.name} foi registrada com sucesso.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  // Resetar o formulário
  const resetForm = () => {
    setNewPromotion({
      proposedRole: '',
      promotionDate: '',
      type: 'PROMOTION',
      reason: '',
    });
    setSelectedEmployee(null);
    setEligibilityMessage(null); // Reset eligibility message
  };

  // Mostrar histórico de promoções
  const showPromotionHistory = (employeeId: number) => {
    const history = promotions.filter(promotion => promotion.employeeId === employeeId);
    setSelectedHistory(history);
    setHistoryModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => setIsModalOpen(true)} colorScheme="teal" className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Nova Promoção
        </Button>
      </div>

      {/* Modal para adicionar nova promoção */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrar Nova Promoção</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Selecione um Funcionário</FormLabel>
              <Select onChange={(e) => handleEmployeeChange(Number(e.target.value))} placeholder="Selecione um Funcionário">
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.currentRole}
                  </option>
                ))}
              </Select>
              {eligibilityMessage && <p className="mt-2 text-sm text-gray-600">{eligibilityMessage}</p>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Cargo Proposto</FormLabel>
              <Input
                value={newPromotion.proposedRole}
                onChange={(e) => setNewPromotion({ ...newPromotion, proposedRole: e.target.value })}
                placeholder="Cargo Proposto"
                isRequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Data da Promoção</FormLabel>
              <Input
                type="date"
                value={newPromotion.promotionDate}
                onChange={(e) => setNewPromotion({ ...newPromotion, promotionDate: e.target.value })}
                isRequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Motivo</FormLabel>
              <Input
                value={newPromotion.reason}
                onChange={(e) => setNewPromotion({ ...newPromotion, reason: e.target.value })}
                placeholder="Motivo da Promoção"
                isRequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Tipo</FormLabel>
              <Select
                value={newPromotion.type}
                onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value as 'PROMOTION' | 'PROGRESSION' })}
              >
                <option value="PROMOTION">Promoção</option>
                <option value="PROGRESSION">Progressão</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddPromotion}>
              Adicionar
            </Button>
            <Button onClick={() => setIsModalOpen(false)} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Tabela de Promoções */}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Funcionário</Th>
            <Th>Cargo Atual</Th>
            <Th>Cargo Proposto</Th>
            <Th>Data da Promoção</Th>
            <Th>Tipo</Th>
            <Th>Motivo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {promotions.map(promotion => (
            <Tr key={promotion.id}>
              <Td>{promotion.employeeName}</Td>
              <Td>{promotion.currentRole}</Td>
              <Td>{promotion.proposedRole}</Td>
              <Td>{promotion.promotionDate}</Td>
              <Td>{promotion.type}</Td>
              <Td>{promotion.reason}</Td>
              <Td>
                <Button onClick={() => showPromotionHistory(promotion.employeeId)} colorScheme="blue" variant="ghost">
                  <History className="w-5 h-5" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de Histórico de Promoções */}
      <Modal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Histórico de Promoções</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedHistory.length === 0 ? (
              <p>Nenhum histórico de promoções encontrado.</p>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Cargo Proposto</Th>
                    <Th>Data da Promoção</Th>
                    <Th>Tipo</Th>
                    <Th>Motivo</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedHistory.map(history => (
                    <Tr key={history.id}>
                      <Td>{history.proposedRole}</Td>
                      <Td>{history.promotionDate}</Td>
                      <Td>{history.type}</Td>
                      <Td>{history.reason}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setHistoryModalOpen(false)}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PromotionsPage;
