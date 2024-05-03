import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './pages';
import { marketAppBackend } from './services';
import { LC_NAMES } from './constants/local-storage';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem(LC_NAMES.AUTH_TOKEN);
    marketAppBackend.setToken(token ?? '');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer theme='colored' draggable limit={3} />
      <AppRouter />
    </QueryClientProvider>
  );
}
