import { DashboardPage } from '@/components/pages/dashboard';
import ProtectedRoute from '@/views/private-route';

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </div>
  );
}
