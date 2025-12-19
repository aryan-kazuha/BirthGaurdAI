import { Database, Brain, BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

export default function ModelData() {
  const datasets = [
    {
      name: 'Mendeley Maternal Dataset',
      description: 'Comprehensive dataset with pregnancy complications and outcomes',
      features: ['BMI', 'Diabetes Status', 'Previous Complications', 'Mental Health', 'Birth Spacing'],
      size: '2,500+ records',
      source: 'Mendeley Data Repository',
    }
  ];

  const algorithms = [
    {
      name: 'Logistic Regression',
      description: 'Baseline model with high interpretability',
      pros: ['Easy to interpret', 'Fast training', 'Clear feature importance'],
      metrics: { accuracy: '82%', recall: '79%', f1: '80%' },
    },
    {
      name: 'Random Forest',
      description: 'Ensemble method with robust performance',
      pros: ['Handles non-linear relationships', 'Feature importance ranking', 'Resistant to overfitting'],
      metrics: { accuracy: '89%', recall: '87%', f1: '88%' },
      selected: true,
    },
    {
      name: 'Multi-Layer Perceptron (MLP)',
      description: 'Neural network for complex pattern recognition',
      pros: ['Captures complex patterns', 'High accuracy potential', 'Flexible architecture'],
      metrics: { accuracy: '86%', recall: '84%', f1: '85%' },
    },
  ];

  const featureImportance = [
    { feature: 'BMI', importance: 2274, level: 'High' },
    { feature: 'BS', importance: 1603, level: 'High' },
    { feature: 'Heart rate', importance: 1371, level: 'High' },
    { feature: 'Age', importance: 1090, level: 'Medium' },
    { feature: 'Systolic BP', importance: 856, level: 'Medium' },
    { feature: 'Diastolic BP', importance: 791, level: 'Medium' },
    { feature: 'Prexisting Diabetes', importance: 644, level: 'Medium' },
    { feature: 'Mental Health', importance: 608, level: 'Low' },
  ];
  const totalImportance = featureImportance.reduce(
  (sum, item) => sum + item.importance,
  0
);

const featureImportancePct = featureImportance.map(item => ({
  ...item,
  importance_pct: (item.importance / totalImportance) * 100,
}));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-[#2BB4A0]/10 rounded-full mb-4">
          <Brain className="w-12 h-12 text-[#2BB4A0]" />
        </div>
        <h1 className="text-gray-900 mb-2">Model & Data Explainability</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Transparent AI for maternal health risk prediction. Understanding the datasets, algorithms,
          and decision-making process.
        </p>
      </div>

      {/* Datasets Section */}
      <div className="mb-12">
        <h2 className="text-gray-900 mb-6 flex items-center">
          <Database className="w-7 h-7 mr-3 text-[#2BB4A0]" />
          Datasets Used
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {datasets.map((dataset, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md p-6 ${
                dataset.isSynthetic ? 'border-2 border-amber-200' : ''
              }`}
            >
              {dataset.isSynthetic && (
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm mb-3">
                  Synthetic Data
                </div>
              )}
              <h3 className="text-gray-900 mb-3">{dataset.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{dataset.description}</p>
              <div className="mb-4">
                <p className="text-gray-700 text-sm mb-2">Key Features:</p>
                <div className="flex flex-wrap gap-2">
                  {dataset.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#2BB4A0]/10 text-[#2BB4A0] rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-gray-600 text-sm">
                  <strong>Size:</strong> {dataset.size}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Source:</strong> {dataset.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Pipeline */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-gray-900 mb-6">Data Processing Pipeline</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-2xl">1</div>
            </div>
            <h3 className="text-gray-900 mb-2">Collection</h3>
            <p className="text-gray-600 text-sm">
              Aggregate datasets from multiple sources
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-2xl">2</div>
            </div>
            <h3 className="text-gray-900 mb-2">Cleaning</h3>
            <p className="text-gray-600 text-sm">
              Handle missing values and outliers
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-2xl">3</div>
            </div>
            <h3 className="text-gray-900 mb-2">Balancing</h3>
            <p className="text-gray-600 text-sm">
              SMOTE for class imbalance
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <div className="text-2xl">4</div>
            </div>
            <h3 className="text-gray-900 mb-2">Normalization</h3>
            <p className="text-gray-600 text-sm">
              Standardize feature scales
            </p>
          </div>
        </div>
      </div>

      {/* Model Architecture */}
      <div className="mb-12">
        <h2 className="text-gray-900 mb-6 flex items-center">
          <Brain className="w-7 h-7 mr-3 text-[#2BB4A0]" />
          Model Architecture & Comparison
        </h2>
        <div className="space-y-4">
          {algorithms.map((algo, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md p-6 ${
                algo.selected ? 'border-2 border-[#2BB4A0]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="text-gray-900 mr-3">{algo.name}</h3>
                    {algo.selected && (
                      <span className="px-3 py-1 bg-[#2BB4A0] text-white rounded-full text-sm">
                        Selected Model
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{algo.description}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Accuracy</p>
                    <p className="text-2xl text-[#2BB4A0]">{algo.metrics.accuracy}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Recall</p>
                    <p className="text-2xl text-[#2BB4A0]">{algo.metrics.recall}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">F1-Score</p>
                    <p className="text-2xl text-[#2BB4A0]">{algo.metrics.f1}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-700 text-sm mb-2">Key Advantages:</p>
                <div className="flex flex-wrap gap-2">
                  {algo.pros.map((pro, idx) => (
                    <span
                      key={idx}
                      className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {pro}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gradient-to-br from-[#2BB4A0]/10 to-[#F4A9A2]/10 rounded-2xl p-8 mb-12">
        <h2 className="text-gray-900 mb-6 text-center">Model Performance Metrics</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <TrendingUp className="w-10 h-10 text-[#2BB4A0] mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Overall Accuracy</p>
            <p className="text-3xl text-[#2BB4A0]">98.7%</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <BarChart3 className="w-10 h-10 text-[#2BB4A0] mx-auto mb-3" />
            <p className="text-gray-600 mb-2">High-Risk Recall</p>
            <p className="text-3xl text-[#2BB4A0]">98.9%</p>
            <p className="text-gray-500 text-xs mt-1">Critical for safety</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <CheckCircle className="w-10 h-10 text-[#2BB4A0] mx-auto mb-3" />
            <p className="text-gray-600 mb-2">Precision</p>
            <p className="text-3xl text-[#2BB4A0]">97.8%</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <TrendingUp className="w-10 h-10 text-[#2BB4A0] mx-auto mb-3" />
            <p className="text-gray-600 mb-2">ROC-AUC</p>
            <p className="text-3xl text-[#2BB4A0]">0.998</p>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-gray-900 mb-6">Feature Importance & Explainability</h2>
        <p className="text-gray-600 mb-6">
          Understanding which factors contribute most to risk predictions helps ensure clinical
          validity and builds trust with healthcare workers.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Feature</th>
                  <th className="text-left py-3 px-4 text-gray-700">Importance</th>
                  <th className="text-left py-3 px-4 text-gray-700">Importance %</th>
                  <th className="text-left py-3 px-4 text-gray-700">Visual</th>
                  <th className="text-left py-3 px-4 text-gray-700">Impact Level</th>
                </tr>
              </thead>

            <tbody>
  {featureImportancePct.map((item, index) => (
    <tr key={index} className="border-b border-gray-100">
      <td className="py-3 px-4 text-gray-900">{item.feature}</td>

      <td className="py-3 px-4 text-gray-700">
        {item.importance.toFixed(0)}
      </td>

      <td className="py-3 px-4 text-gray-700">
        {item.importance_pct.toFixed(2)}%
      </td>

      <td className="py-3 px-4">
        <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
          <div
            className="bg-[#2BB4A0] h-2 rounded-full"
            style={{ width: `${item.importance_pct}%` }}
          />
        </div>
      </td>

      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.level === 'High'
              ? 'bg-red-100 text-red-700'
              : item.level === 'Medium'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {item.level}
        </span>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>

      {/* Clinical Alignment */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-gray-900 mb-4">Clinical Validity & Alignment</h2>
        <p className="text-gray-600 mb-6">
          Our model's risk factors align with established medical guidelines:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#2BB4A0]/5 rounded-xl">
            <h3 className="text-gray-900 mb-3">WHO Guidelines</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#2BB4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span>Hypertension as major risk factor ✓</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#2BB4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span>Anemia monitoring importance ✓</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#2BB4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span>Gestational diabetes screening ✓</span>
              </li>
            </ul>
          </div>
          <div className="p-6 bg-[#F4A9A2]/5 rounded-xl">
            <h3 className="text-gray-900 mb-3">Indian National Guidelines</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#F4A9A2] mr-2 flex-shrink-0 mt-0.5" />
                <span>Birth spacing recommendations ✓</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#F4A9A2] mr-2 flex-shrink-0 mt-0.5" />
                <span>Grand multipara considerations ✓</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#F4A9A2] mr-2 flex-shrink-0 mt-0.5" />
                <span>Mental health integration ✓</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
