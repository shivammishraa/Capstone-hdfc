import useSessionTimeout from '../hooks/useSessionTimeout';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Dashboard = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useSessionTimeout(5000); // Hook internally checks isAuthenticated

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Welcome! You’re securely logged in.</p>
    </div>
  );
};

export default Dashboard;
