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
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { useState, useEffect } from 'react';
const Dashboard = () => {
  const prisma = new PrismaClient();
  const Expenses = new prisma.expense.findMany();
  const Incomes = new prisma.income.findMany();
  const Categories = new prisma.category.findMany();
 
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return <div>
    bobbooooooooooooooooooooooooooooooooo
  </div>
}
 export default Dashboard;