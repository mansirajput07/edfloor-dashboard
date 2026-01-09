import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, BookOpen, Calendar } from 'lucide-react';
import './App.css';

// Sample data
const performanceData = [
  { month: 'Sep', Math: 85, Science: 78, English: 92, History: 88 },
  { month: 'Oct', Math: 88, Science: 82, English: 90, History: 85 },
  { month: 'Nov', Math: 90, Science: 85, English: 94, History: 89 },
  { month: 'Dec', Math: 92, Science: 88, English: 95, History: 91 },
  { month: 'Jan', Math: 95, Science: 91, English: 96, History: 93 }
];

const attendanceData = [
  { name: 'Present', value: 450, color: '#10b981' },
  { name: 'Absent', value: 30, color: '#ef4444' },
  { name: 'Leave', value: 20, color: '#f59e0b' }
];

const classComparison = [
  { class: 'Class A', avgScore: 88 },
  { class: 'Class B', avgScore: 85 },
  { class: 'Class C', avgScore: 90 },
  { class: 'Class D', avgScore: 87 },
  { class: 'Class E', avgScore: 92 }
];

const gradeDistribution = [
  { grade: 'A+', students: 45 },
  { grade: 'A', students: 78 },
  { grade: 'B+', students: 92 },
  { grade: 'B', students: 65 },
  { grade: 'C', students: 20 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('performance');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [dateRange, setDateRange] = useState('Last 5 Months');

  const stats = [
    { label: 'Total Students', value: '1,245', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Avg Attendance', value: '94.5%', icon: Calendar, color: 'bg-green-500', change: '+3.2%' },
    { label: 'Avg Score', value: '88.7', icon: BookOpen, color: 'bg-purple-500', change: '+5.1%' },
    { label: 'Pass Rate', value: '96.2%', icon: TrendingUp, color: 'bg-orange-500', change: '+2.8%' }
  ];

  const exportReport = (type) => {
    alert(`Exporting ${type} report... (In real app, this would download a file)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">EdFloor Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time student performance insights</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => exportReport('PDF')} 
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <Download size={18} />
              <span>Export PDF</span>
            </button>
            <button 
              onClick={() => exportReport('CSV')} 
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option>All Classes</option>
            <option>Class A</option>
            <option>Class B</option>
            <option>Class C</option>
          </select>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option>Last 5 Months</option>
            <option>Last 3 Months</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg shadow-md`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-500 text-sm font-semibold px-2 py-1 rounded">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1 font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {['performance', 'attendance', 'comparison', 'grades'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subject-wise Performance Trends</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Math" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Science" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="English" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="History" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">📊 Key Insights:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Math scores improved by 10 points over 5 months</li>
                <li>• English maintains consistently high performance (90+)</li>
                <li>• Science shows steady upward trend (+13 points)</li>
              </ul>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {attendanceData.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center border border-gray-200">
                  <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
                  <p className="text-gray-600 text-sm font-medium">{item.name}</p>
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="text-xs text-gray-500">{((item.value / 500) * 100).toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Class Comparison Tab */}
        {activeTab === 'comparison' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Class-wise Average Score Comparison</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={classComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="class" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="avgScore" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {classComparison.map((cls, idx) => (
                <div key={idx} className="p-4 bg-purple-50 rounded-lg text-center border border-purple-100">
                  <p className="text-gray-600 font-semibold">{cls.class}</p>
                  <p className="text-3xl font-bold text-purple-600">{cls.avgScore}</p>
                  <p className="text-xs text-gray-500">Avg Score</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grade Distribution Tab */}
        {activeTab === 'grades' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Grade Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={gradeDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="grade" type="category" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="students" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-900 mb-3">🎓 Grade Summary:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {gradeDistribution.map((g, idx) => (
                  <div key={idx} className="text-center p-3 bg-white rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{g.students}</div>
                    <div className="text-sm text-gray-600">Grade {g.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-white rounded-xl shadow-lg p-4 text-center text-sm text-gray-600 mt-6">
        <p>✨ Built with React.js + Recharts | Real-time data visualization | Internship Project Dec 2025</p>
      </div>
    </div>
  );
}