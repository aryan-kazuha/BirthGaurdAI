import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, AlertTriangle, ArrowLeft, Phone, FileText } from 'lucide-react';

interface AssessmentData {
  name: string;
  age: string;
  height: string;
  bodytemp: string;
  weeksPregnant: string;
  location: string;
  systolicBP: string;
  diastolicBP: string;
  bloodSugar: string;
  heartrate: string;
  weight: string;
  bmi: string;
  previousComplications: boolean;
  preExistingDiabetes: boolean;
  gestationalDiabetes: boolean;
  mentalHealthConcerns: boolean;
  shortBirthSpacing: boolean;
}

interface RiskAnalysis {
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;          // 0–1 from backend
  factors: string[];
  recommendations: string[];
}

export default function RiskResult() {
  const navigate = useNavigate();
  const [data, setData] = useState<AssessmentData | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('assessmentData');
    const storedResult = sessionStorage.getItem('predictionResult');

    if (!storedData || !storedResult) {
      navigate('/assessment');
      return;
    }

    const parsedData: AssessmentData = JSON.parse(storedData);

    // Backend returns: { prediction: 0/1, "confidence score": 0.x }
    const prediction = JSON.parse(storedResult) as {
      prediction: string;
      'confidence score': number;
    };

    setData(parsedData);
    const rawPred = prediction.prediction;

    if (typeof rawPred !== 'string') {
      console.error("Invalid prediction value:", prediction);
      navigate('/assessment');
      return;
    }

    const predLabel = rawPred.toLowerCase();
    // Map numeric prediction → risk level
    // Adjust if your labels are different (e.g. 0=low,1=medium,2=high)
    let riskLevel: 'low' | 'medium' | 'high';
      if (predLabel === 'high') riskLevel = 'high';
      else if (predLabel === 'medium') riskLevel = 'medium';
      else riskLevel = 'low';

      const confidence = prediction['confidence score'] ?? 0;

      const factors: string[] = [
        'Model-based risk estimation using vitals and history.',
      ];

    const recommendations: string[] =
      riskLevel === 'high'
        ? [
            'URGENT: Consult a specialist or higher-level facility.',
            'Ensure close monitoring and follow-up.',
            'Prepare an emergency transport plan if required.',
          ]
        : [
            'Continue regular antenatal check-ups.',
            'Maintain healthy diet and moderate exercise.',
            'Monitor blood pressure and blood sugar regularly.',
          ];

    const analysisFromModel: RiskAnalysis = {
      riskLevel,
      confidence,
      factors,
      recommendations,
    };

    setAnalysis(analysisFromModel);
  }, [navigate]);

  if (!data || !analysis) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const riskConfig = {
    low: {
      color: '#16A34A',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-900',
      icon: CheckCircle,
      label: 'Low Risk',
    },
    medium: {
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
      icon: AlertTriangle,
      label: 'Medium Risk',
    },
    high: {
      color: '#DC2626',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-900',
      icon: AlertCircle,
      label: 'High Risk',
    },
  };

  const config = riskConfig[analysis.riskLevel];
  const Icon = config.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/assessment"
        className="inline-flex items-center text-[#2BB4A0] hover:text-[#259988] mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        New Assessment
      </Link>

      {/* Patient Info Header */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-gray-900 mb-2">Risk Assessment Result</h2>
        <p className="text-gray-600">Patient: {data.name}</p>
        <p className="text-gray-600">
          Age: {data.age} years | {data.weeksPregnant} weeks pregnant
        </p>
      </div>

      {/* Risk Summary Card */}
      <div className={`rounded-2xl shadow-lg p-8 mb-6 ${config.bgColor} border-2 ${config.borderColor}`}>
        <div className="flex items-center justify-center mb-4">
          <Icon className="w-16 h-16" style={{ color: config.color }} />
        </div>
        <h1 className={`text-center mb-2 ${config.textColor}`}>{config.label}</h1>
        <div className="text-center mb-6">
          <div className="inline-block px-6 py-3 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm mb-1">Model Confidence</p>
            <p className="text-3xl" style={{ color: config.color }}>
              {(analysis.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(analysis.confidence * 100, 100)}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-[#2BB4A0]" />
          Top Contributing Factors
        </h2>
        <ul className="space-y-3">
          {analysis.factors.map((factor, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#2BB4A0] mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{factor}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Follow-up */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-gray-900 mb-4 flex items-center">
          <Phone className="w-6 h-6 mr-2 text-[#2BB4A0]" />
          Suggested Follow-up (Decision Support)
        </h2>
        <div className="space-y-3">
          {analysis.recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                rec.includes('URGENT') ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
              }`}
            >
              <p
                className={`${
                  rec.includes('URGENT') ? 'text-red-900' : 'text-gray-700'
                }`}
              >
                {index + 1}. {rec}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Parameters Summary */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-gray-900 mb-4">Clinical Parameters</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Blood Pressure</p>
            <p className="text-gray-900">
              {data.systolicBP}/{data.diastolicBP} mmHg
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Blood Sugar</p>
            <p className="text-gray-900">{data.bloodSugar} mg/dL</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">BMI</p>
            <p className="text-gray-900">{data.bmi} kg/m²</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Weight</p>
            <p className="text-gray-900">{data.weight} kg</p>
          </div>
        </div>
      </div>

      {/* Important Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-amber-900 mb-2">Important Notice</h3>
            <p className="text-amber-800">
              This is a <strong>decision support tool</strong>, not a medical diagnosis. All
              recommendations must be reviewed by a qualified medical professional.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/assessment"
          className="flex-1 bg-[#2BB4A0] text-white py-4 px-6 rounded-lg hover:bg-[#259988] transition-colors text-center"
        >
          Start New Assessment
        </Link>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-white text-[#2BB4A0] border-2 border-[#2BB4A0] py-4 px-6 rounded-lg hover:bg-[#2BB4A0]/5 transition-colors"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}