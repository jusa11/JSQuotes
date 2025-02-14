import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Used', value: 65 },
  { name: 'Free', value: 35 },
];
const COLORS = ['#FFAA00', '#444'];

const MyChart = () => (
  <PieChart width={200} height={200}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      startAngle={90}
      endAngle={450}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
  </PieChart>
);

export default MyChart;
