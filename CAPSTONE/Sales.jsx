import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Sales() {
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // WHEN WE GIVE REAL API THEN WE CAN REPLACE THIS STATIC DATA WITH API RESPONSE
  const salesData = {
    weekly: [12500, 18900, 14200, 23100, 19800, 27400, 31200],
    monthly: [45000, 52000, 48000, 61000, 55000, 72000, 68000, 81000, 75000, 92000, 88000, 95000],
    yearly: [420000, 680000, 920000, 1250000]
  };

  const labels = {
    weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yearly: ['2023', '2024', '2025', '2026']
  };

  const currentData = salesData[timeFilter];
  const currentLabels = labels[timeFilter];


  const totalSales = currentData.reduce((a, b) => a + b, 0);
  const avgOrderValue = Math.round(totalSales / (currentData.length * 12));
  const growthRate = timeFilter === 'monthly' ? 18.5 : timeFilter === 'weekly' ? 12.4 : 24.8;
  const topProductSales = Math.max(...currentData);

  const chartData = {
    labels: currentLabels,
    datasets: [
      {
        label: 'Sales Revenue',
        data: currentData,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.15)',
        tension: 0.4,
        borderWidth: 4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#fff',
      },
      {
        label: 'Previous Period',
        data: currentData.map(val => Math.round(val * 0.85)),
        borderColor: '#64748b',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e2e8f0', usePointStyle: true, padding: 20 }
      },
      tooltip: {
        backgroundColor: '#1e2937',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        padding: 12,
        displayColors: true,
      }
    },
    scales: {
      y: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8', callback: (val) => '$' + val.toLocaleString() }
      },
      x: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  // API CALLLING WHEN WHEN WE GIVE REAL API
  // useEffect(() => {
  //   fetch(`/api/sales?period=${timeFilter}`)

  // }, [timeFilter]);


  const topProducts = [
    { name: "Wireless Headphones", sales: 12400, units: 342, growth: 24 },
    { name: "Smart Watch Pro", sales: 9800, units: 289, growth: 18 },
    { name: "4K Webcam", sales: 7600, units: 198, growth: -5 },
    { name: "Mechanical Keyboard", sales: 6500, units: 412, growth: 31 },
  ].sort((a, b) => b.sales - a.sales);


  const exportCSV = () => {
    const csv = "Month,Sales,Previous\n" +
      currentLabels.map((label, i) =>
        `${label},${currentData[i]},${Math.round(currentData[i] * 0.85)}`
      ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales_report_${timeFilter}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setShowExportMenu(false);
    alert("✅ Sales report exported as CSV!");
  };

  const exportPDF = () => {
    alert("📄 PDF Report would be generated here.\n\n(In full app we can use jsPDF or react-pdf)");
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Sales Analytics</h2>
          <p className="text-slate-400 mt-1">Real-time performance overview</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-200 rounded-3xl p-1 text-sm">
            {['weekly', 'monthly', 'yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFilter(period)}
                className={`px-6 py-2.5 rounded-3xl capitalize transition-all font-medium ${timeFilter === period ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
            >
              <i className="fa-solid fa-download"></i> Export Report
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50">
                <button onClick={exportCSV} className="w-full px-6 py-3 text-left hover:bg-slate-800 flex items-center gap-3">
                  <i className="fa-solid fa-file-csv"></i> Export as CSV
                </button>
                <button onClick={exportPDF} className="w-full px-6 py-3 text-left hover:bg-slate-800 flex items-center gap-3">
                  <i className="fa-solid fa-file-pdf"></i> Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6">
          <p className="text-slate-400 text-sm">Total Sales</p>
          <p className="text-4xl font-bold mt-3">${totalSales.toLocaleString()}</p>
          <p className="text-emerald-400 text-sm mt-4 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up"></i> +{growthRate}% from last {timeFilter}
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6">
          <p className="text-slate-400 text-sm">Avg. Order Value</p>
          <p className="text-4xl font-bold mt-3">${avgOrderValue}</p>
          <p className="text-emerald-400 text-sm mt-4 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up"></i> +4.2%
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6">
          <p className="text-slate-400 text-sm">Orders This Period</p>
          <p className="text-4xl font-bold mt-3">{Math.round(totalSales / 145)}</p>
          <p className="text-red-400 text-sm mt-4 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-down"></i> -2.1%
          </p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6">
          <p className="text-slate-400 text-sm">Top Product Revenue</p>
          <p className="text-4xl font-bold mt-3">${topProductSales}</p>
          <p className="text-emerald-400 text-sm mt-4">Wireless Headphones</p>
        </div>
      </div>

      {/* Main Sales Chart */}
      <div className="bg-slate-900 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold">Sales Trend • {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}</h3>
          <div className="text-xs text-slate-400">Solid line = Current | Dashed = Previous period</div>
        </div>
        <div className="h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-slate-900 rounded-3xl p-8">
        <h3 className="text-xl font-semibold mb-6">Top Selling Products</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-5">Product Name</th>
              <th className="text-right py-5">Revenue</th>
              <th className="text-right py-5">Units Sold</th>
              <th className="text-right py-5">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {topProducts.map((product, index) => (
              <tr key={index} className="hover:bg-slate-800/50">
                <td className="py-5 font-medium">{product.name}</td>
                <td className="py-5 text-right font-mono">${product.sales.toLocaleString()}</td>
                <td className="py-5 text-right text-slate-400">{product.units}</td>
                <td className={`py-5 text-right font-medium ${product.growth > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {product.growth > 0 ? '+' : ''}{product.growth}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}