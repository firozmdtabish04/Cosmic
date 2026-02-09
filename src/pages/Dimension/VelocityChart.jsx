import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function VelocityChart({ data }) {
  const chartData = data.slice(0, 6).map((a) => ({
    name: a.name,
    speed:
      Math.round(
        a.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour,
      ) || 0,
  }));

  return (
    <div className="glass-card">
      <h2 className="section-title">Velocity Analytics</h2>

      <LineChart width={400} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="speed" stroke="#3b82f6" />
      </LineChart>
    </div>
  );
}
