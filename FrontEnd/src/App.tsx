import { AuthProvider } from './Contexts/AuthoContexts';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
