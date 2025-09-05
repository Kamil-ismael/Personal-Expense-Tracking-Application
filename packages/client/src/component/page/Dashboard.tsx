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
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import { Card } from "../contener/card";

const Dashboard = () => {
  //const prisma = new PrismaClient();
  //const Expenses = new prisma.expense.findMany();
  //const Incomes = new prisma.income.findMany();
  //const Categories = new prisma.category.findMany();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  //const currentMonthName = new Date().toLocaleDateString("fr-FR", {
  //month: "long",
  // year: "numeric",
  // });

  const currentMonhtName = new Date().toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const positionLogo = "absolute top-2 right-2";
  const titleGraphique = "font-bold absolute top-2 left-2"

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <button className="flex cursor-pointer text-xl">
          <Calendar className="mr-1"/>
          {currentMonhtName}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <Card>
          <TrendingUp className={`text-emerald-600 absolute ${positionLogo}`} />
          Total Revenus
          <p className="text-2xl ">0.00 Ar</p>
        </Card>
        <Card>
          <TrendingDown className={`text-red-600 ${positionLogo}`} />
          Total Depenses
          <p className="text-2xl ">0.00 Ar</p>
        </Card>
        <Card>
          <DollarSign className={`text-emerald-700 ${positionLogo}`} />
          Solde Actuel
          <p className="text-2xl ">0.00 Ar</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <Card>
          <h1 className={`${titleGraphique}`}>Expense by category</h1>
        </Card>
        <Card>
          <h1 className={`${titleGraphique} `}>Monthly Trends</h1>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
