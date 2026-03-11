// import {
//     PieChart,
//     Pie,
//     Sector,
//     ResponsiveContainer,
// } from 'recharts';

// const data = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//         <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// const CustomSector = (props) => (
//     <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
// );

// export default function PieChartCustom() {
//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//                 <Pie
//                     data={data}
//                     dataKey="value"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     shape={CustomSector}
//                 />
//             </PieChart>
//         </ResponsiveContainer>
//     );
// }
