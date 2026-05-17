import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/shared/components/ui/toaster';
import Layout from '@/shared/components/Layout';
import RackGrid from '@/features/racks/components/RackGrid';
import EquipmentList from '@/features/equipment/components/EquipmentList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/racks" replace />} />
            <Route path="/racks" element={<RackGrid />} />
            <Route path="/equipment" element={<EquipmentList />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;