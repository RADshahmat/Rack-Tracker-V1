import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from '@/components/shared/ThemeProvider';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/features/racks/pages/Dashboard';
import { RacksPage } from '@/features/racks/pages/RacksPage';
import { EquipmentPage } from '@/features/equipment/pages/EquipmentPage';
import '@/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function AppContentWrapper() {
  const { theme } = useTheme();

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/racks" element={<RacksPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
        richColors
        closeButton
      />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContentWrapper />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
