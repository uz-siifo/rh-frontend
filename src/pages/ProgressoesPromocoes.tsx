import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, User, LogOut, TrendingUp, Calendar, Award, BookOpen } from 'lucide-react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

// Componente Progress simplificado com tipagem correta
interface ProgressProps {
  value: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => (
  <div className={`bg-gray-200 rounded-full ${className}`}>
    <div
      className="bg-indigo-600 rounded-full h-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

const ProgressoesPromocoesPage: React.FC = () => {
  const careerHistory = [
    { ano: 2018, cargo: 'Assistente Jr', salario: 2500, desempenho: 75 },
    { ano: 2020, cargo: 'Assistente Pleno', salario: 3500, desempenho: 82 },
    { ano: 2022, cargo: 'Assistente Sênior', salario: 4500, desempenho: 88 },
    { ano: 2024, cargo: 'Analista Jr', salario: 5500, desempenho: 92 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Flex align="center">
            <User className="h-8 w-8 text-indigo-600" />
            <Text ml={2} fontSize="xl" fontWeight="semibold" color="gray.800">Nome do Usuário</Text>
            <Text ml={2} fontSize="sm" color="gray.500">Gerente de RH</Text>
          </Flex>
          <Flex align="center">
            <Bell className="h-6 w-6 text-indigo-600 mr-4 cursor-pointer" />
            <button className="flex items-center text-gray-500 hover:text-gray-700">
              <LogOut className="h-5 w-5 mr-1" />
              <span>Sair</span>
            </button>
          </Flex>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Heading as="h1" size="xl" mb={6} color="gray.900">Progressões e Promoções</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Box className="mb-6" borderWidth={1} borderRadius="lg" p={4}>
                <Flex align="center" mb={4}>
                  <TrendingUp className="mr-2" />
                  <Text fontSize="xl" fontWeight="semibold" color="indigo.600">Histórico de Carreira</Text>
                </Flex>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={careerHistory}>
                    <XAxis dataKey="ano" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="salario" stroke="#4f46e5" name="Salário" />
                    <Line yAxisId="right" type="monotone" dataKey="desempenho" stroke="#10b981" name="Desempenho" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Flex align="center" mb={4}>
                  <Award className="mr-2" />
                  <Text fontSize="xl" fontWeight="semibold" color="indigo.600">Detalhes do Funcionário</Text>
                </Flex>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">João Silva</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cargo Atual</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">Analista Jr</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data de Admissão</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">15/03/2018</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Última Promoção</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">01/01/2024</p>
                  </div>
                </div>
              </Box>
            </div>

            <div>
              <Box className="mb-6" borderWidth={1} borderRadius="lg" p={4}>
                <Flex align="center" mb={4}>
                  <Calendar className="mr-2" />
                  <Text fontSize="xl" fontWeight="semibold" color="indigo.600">Próxima Progressão Prevista</Text>
                </Flex>
                <div className="text-2xl font-bold text-gray-800">Analista Pleno</div>
                <div className="text-gray-600 mb-4">Previsão: Janeiro 2026</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
                      <span>Tempo no cargo</span>
                      <span>1 ano e 3 meses / 2 anos</span>
                    </div>
                    <Progress value={62.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
                      <span>Desempenho</span>
                      <span>92% / 80%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
                      <span>Treinamentos</span>
                      <span>30 horas / 40 horas</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
                      <span>Projetos estratégicos</span>
                      <span>1 / 2</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </Box>

              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Flex align="center" mb={4}>
                  <BookOpen className="mr-2" />
                  <Text fontSize="xl" fontWeight="semibold" color="indigo.600">Critérios para Progressão</Text>
                </Flex>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Tempo de serviço: 2 anos no cargo atual</li>
                  <li>Avaliação de desempenho: Mínimo 80% nos últimos 2 ciclos</li>
                  <li>Capacitações: 40 horas de treinamento concluídas</li>
                  <li>Projetos: Participação em pelo menos 2 projetos estratégicos</li>
                </ul>
              </Box>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressoesPromocoesPage;
