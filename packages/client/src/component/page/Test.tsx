import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Test 1", value: 400 },
    { name: "Test 2", value: 300 },
  ];

  return (
    <div>
      <h1>Dashboard Test</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#ff0000" : "#00ff00"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;