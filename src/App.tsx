import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes'; // Importando as rotas
import './global.css'; // Estilos globais

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AppRoutes /> {/* Usando o componente AppRoutes que contém as rotas */}
      </Router>
    </ChakraProvider>
  );
}

export default App;
