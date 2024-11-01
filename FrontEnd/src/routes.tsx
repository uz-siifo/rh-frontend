// AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Employees from './pages/Employees';
import PerformanceEvaluation from './pages/AdminDashboard/Avaliacoes';
import Promotion from './pages/AdminDashboard/Promotion';
import Attendance from './pages/AdminDashboard/Attendance';
import { Settings } from 'lucide-react';
import PromotionsPage from './pages/ProgressoesPromocoes';
import AttendancePage from './pages/WorkDay';
import WorkHoursPage from './pages/WorkHourPage';
import EmployeeManagement from './pages/Employees';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota para Login */}
      <Route path="/" element={<Login />} />

      {/* Rota para o Dashboard */}
      <Route path="/Dashboard" element={<Dashboard />}>
        <Route index path="progressoes-promocoes" element={<PromotionsPage />} />
        <Route  path="perfil-funcionarios" element={<EmployeeManagement />} />
        <Route  path="controle-dias" element={<AttendancePage />} />
        <Route  path="gestao-horarios" element={<WorkHoursPage />} />
      </Route>

      {/* Rota para Admin Dashboard */}
      <Route path="/AdminDashboard" element={<AdminDashboard />}>
        {/* Rotas filhas para Admin Dashboard */}
        <Route path="employees" element={<Employees />} />
        <Route path="performance-evaluation" element={<PerformanceEvaluation />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
