import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProgressoesPromocoes from './pages/ProgressoesPromocoes';
import AdminDashboard from './pages/AdminDashboard';
import Employees from './pages/Employees';
import PerformanceEvaluation from './pages/Avaliacoes';
import Promotion from './pages/Promotion';
import Attendance from './pages/Attendance';
import { Settings } from 'lucide-react';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Rota para a tela de login */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Rota para o dashboard */}
      <Route path="/progressoes-promocoes" element={<ProgressoesPromocoes />} /> {/* Nova rota para o componente ProgressoesPromocoes */}
      
      <Route path="/AdminDashboard" element={<AdminDashboard />}> {/* Alterado para incluir o Outlet */}
      <Route path="employees" element={<Employees />} /> {/* Rota filha para Employees */}
      <Route path="performance-evaluation" element={<PerformanceEvaluation />} /> {/* Rota filha para Employees */}
      <Route path="promotion" element={<Promotion />} /> {/* Rota filha para Employees */}
      <Route path="attendance" element={<Attendance />} /> {/* Rota filha para Employees */}
      <Route path="settings" element={<Settings />} /> {/* Rota filha para Employees */}
      </Route> 
    </Routes>
  );
};

export default AppRoutes;
