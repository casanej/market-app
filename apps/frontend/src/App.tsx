import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import AppRouter from './pages';
import { marketAppBackend } from './services';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    marketAppBackend.setToken(token ?? '');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
