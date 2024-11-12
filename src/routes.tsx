// AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import PerformanceEvaluation from './pages/AdminDashboard/Avaliacoes';
import { Settings } from 'lucide-react';
import PromotionsPage from './pages/ProgressoesPromocoes';
import AttendancePage from './pages/WorkDay';
import WorkHoursPage from './pages/WorkHourPage';
import  Employees  from './pages/Employees'; 
import EmployeesManagement from './pages/Employees';
import Promotion from './pages/AdminDashboard/Promotion';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota para Login */}
      <Route path="/" element={<Login />} />

      {/* Rota para o Dashboard */}
      <Route path="/Dashboard" element={<Dashboard />}>
        <Route index path="promotion" element={<Promotion />} />
        <Route  path="perfil-funcionarios" element={<EmployeesManagement />} />
        <Route  path="controle-dias" element={<AttendancePage />} />
        <Route  path="gestao-horarios" element={<WorkHoursPage />} />
      </Route>

      {/* Rota para Admin Dashboard */}
      <Route path="/AdminDashboard" element={<AdminDashboard />}>
        {/* Rotas filhas para Admin Dashboard */}
        <Route path="employees" element={<Employees />} />
        <Route path="performance-evaluation" element={<PerformanceEvaluation />} />
        <Route index path="progressoes-promocoes" element={<PromotionsPage />} />
        <Route  path="gestao-horarios" element={<WorkHoursPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
