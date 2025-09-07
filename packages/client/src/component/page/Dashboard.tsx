import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Card } from "../contener/card";

const Dashboard = () => {
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const currentMonhtName = new Date().toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/totals")
      .then((res) => res.json())
      .then((data) => setTotals(data))
      .catch((err) => console.error(err));
  }, []);

  const positionLogo = "absolute top-2 right-2";
  const titleGraphique = "font-bold absolute top-2 left-2";

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <button className="flex cursor-pointer text-xl">
          <Calendar className="mr-1" />
          {currentMonhtName}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-10">
        <Card>
          <TrendingUp className={`text-emerald-600 absolute ${positionLogo}`} />
          Total Revenus
          <p className="text-2xl ">{totals.totalIncome} Ar</p>
        </Card>
        <Card>
          <TrendingDown className={`text-red-600 ${positionLogo}`} />
          Total Dépenses
          <p className="text-2xl ">{totals.totalExpense} Ar</p>
        </Card>
        <Card>
          <DollarSign className={`text-emerald-700 ${positionLogo}`} />
          Solde Actuel
          <p className="text-2xl ">{totals.balance} Ar</p>
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
