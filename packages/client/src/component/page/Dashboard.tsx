import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={[{ name: 'A', value: 100 }, { name: 'B', value: 200 }]} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
      </PieChart>
    </ResponsiveContainer>
  );
}
 export default Dashboard;