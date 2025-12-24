import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, Activity, Filter } from 'lucide-react';

export default function Analytics() {
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedTrimester, setSelectedTrimester] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  // Mock data for analytics
  const riskDistribution = [
    { name: 'Low Risk', value: 156, color: '#16A34A' },
    { name: 'Medium Risk', value: 89, color: '#F59E0B' },
    { name: 'High Risk', value: 34, color: '#DC2626' },
  ];

  const avgBPByRisk = [
    { risk: 'Low', systolic: 115, diastolic: 72 },
    { risk: 'Medium', systolic: 128, diastolic: 82 },
    { risk: 'High', systolic: 148, diastolic: 96 },
  ];

  const avgHbByRisk = [
    { risk: 'Low', hemoglobin: 12.8 },
    { risk: 'Medium', hemoglobin: 11.2 },
    { risk: 'High', hemoglobin: 9.8 },
  ];

  const villageData = [
    { village: 'Rampur', low: 45, medium: 23, high: 8 },
    { village: 'Sitapur', low: 38, medium: 19, high: 12 },
    { village: 'Madhavpur', low: 42, medium: 28, high: 7 },
    { village: 'Laxmipur', low: 31, medium: 19, high: 7 },
  ];

  const totalAssessments = riskDistribution.reduce((sum, item) => sum + item.value, 0);
  const highRiskPercentage = ((riskDistribution[2].value / totalAssessments) * 100).toFixed(1);
  const avgRiskScore = 32; // Mock average

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Cohort-level insights for program planning and risk monitoring
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-[#2BB4A0]" />
          </div>
          <p className="text-gray-600 mb-1">Total Assessments</p>
          <p className="text-3xl text-gray-900">{totalAssessments}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-green-900 mb-1">Low Risk</p>
          <p className="text-3xl text-green-900">{riskDistribution[0].value}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-md p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-amber-900 mb-1">Medium Risk</p>
          <p className="text-3xl text-amber-900">{riskDistribution[1].value}</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-md p-6 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-900 mb-1">High Risk</p>
          <p className="text-3xl text-red-900">{riskDistribution[2].value}</p>
          <p className="text-red-700 text-sm mt-1">{highRiskPercentage}% of total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-6 h-6 text-[#2BB4A0] mr-2" />
          <h2 className="text-gray-900">Filters</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="village" className="block text-gray-700 mb-2">
              Village
            </label>
            <select
              id="village"
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
            >
              <option value="all">All Villages</option>
              <option value="rampur">Rampur</option>
              <option value="sitapur">Sitapur</option>
              <option value="madhavpur">Madhavpur</option>
              <option value="laxmipur">Laxmipur</option>
            </select>
          </div>

          <div>
            <label htmlFor="trimester" className="block text-gray-700 mb-2">
              Trimester
            </label>
            <select
              id="trimester"
              value={selectedTrimester}
              onChange={(e) => setSelectedTrimester(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
            >
              <option value="all">All Trimesters</option>
              <option value="1">First Trimester (1-13 weeks)</option>
              <option value="2">Second Trimester (14-26 weeks)</option>
              <option value="3">Third Trimester (27+ weeks)</option>
            </select>
          </div>

          <div>
            <label htmlFor="risk" className="block text-gray-700 mb-2">
              Risk Category
            </label>
            <select
              id="risk"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Risk Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-gray-900 mb-6">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-6">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-4 h-4 rounded mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Village-wise Distribution */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-gray-900 mb-6">Village-wise Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={villageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="village" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" fill="#16A34A" name="Low Risk" />
              <Bar dataKey="medium" fill="#F59E0B" name="Medium Risk" />
              <Bar dataKey="high" fill="#DC2626" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinical Parameters by Risk */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Average BP by Risk Level */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-gray-900 mb-6">Average Blood Pressure by Risk Level</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgBPByRisk}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="risk" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="systolic" fill="#2BB4A0" name="Systolic BP" />
              <Bar dataKey="diastolic" fill="#F4A9A2" name="Diastolic BP" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Hemoglobin by Risk Level */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-gray-900 mb-6">Average Hemoglobin by Risk Level</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgHbByRisk}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="risk" />
              <YAxis domain={[0, 15]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="hemoglobin" fill="#2BB4A0" name="Hemoglobin (g/dL)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-900 text-sm">
              <strong>Note:</strong> Lower hemoglobin levels correlate with higher risk categories,
              highlighting anemia as a key risk factor.
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-[#2BB4A0]/10 to-[#F4A9A2]/10 rounded-2xl p-8">
        <h2 className="text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-7 h-7 mr-3 text-[#2BB4A0]" />
          Key Insights
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-900 mb-3">Program Planning</h3>
            <p className="text-gray-700">
              {highRiskPercentage}% high-risk rate indicates need for enhanced monitoring and
              medical resource allocation in the region.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-900 mb-3">Clinical Patterns</h3>
            <p className="text-gray-700">
              Strong correlation between anemia (low Hb) and high-risk classification suggests
              focused iron supplementation programs.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-900 mb-3">Village-level Action</h3>
            <p className="text-gray-700">
              Sitapur shows highest high-risk percentage - consider targeted intervention and
              specialist visit scheduling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
