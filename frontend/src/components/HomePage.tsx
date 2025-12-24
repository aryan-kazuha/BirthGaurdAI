import { Link } from 'react-router-dom';
import { Activity, Database, TrendingUp, ArrowRight, Heart, Users, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block p-3 bg-[#2BB4A0]/10 rounded-full mb-6">
          <Heart className="w-12 h-12 text-[#2BB4A0]" />
        </div>
        <h1 className="text-gray-900 mb-4">
          Maternal Health Risk Predictor – AI Support for ASHAs
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto mb-8">
          AI model using maternal health data to flag high-risk pregnancies in rural India.
          Empowering frontline health workers with data-driven insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/assessment"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#2BB4A0] text-white rounded-lg hover:bg-[#259988] transition-colors shadow-lg"
          >
            Try Risk Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/model"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2BB4A0] border-2 border-[#2BB4A0] rounded-lg hover:bg-[#2BB4A0]/5 transition-colors"
          >
            View Model & Data
            <Database className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Problem & Impact Section */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
        <h2 className="text-gray-900 mb-6 text-center">The Challenge</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F4A9A2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#F4A9A2]" />
            </div>
            <h3 className="text-gray-900 mb-2">High Maternal Mortality</h3>
            <p className="text-gray-600">
              Rural India faces significant challenges in maternal and infant health outcomes,
              with limited access to timely medical intervention.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F4A9A2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#F4A9A2]" />
            </div>
            <h3 className="text-gray-900 mb-2">Lack of Early Detection</h3>
            <p className="text-gray-600">
              High-risk pregnancies often go unidentified until complications arise,
              missing critical windows for preventive care.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2BB4A0]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-[#2BB4A0]" />
            </div>
            <h3 className="text-gray-900 mb-2">AI-Powered Solution</h3>
            <p className="text-gray-600">
              Our AI model empowers ASHA workers with data-driven risk assessment,
              enabling early intervention and referrals.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-gray-900 mb-3">Collect Health Data</h3>
              <p className="text-gray-600">
                ASHA workers input basic maternal health parameters like blood pressure,
                blood sugar, and medical history
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <ArrowRight className="w-6 h-6 text-[#2BB4A0]" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-gray-900 mb-3">AI Model Analyzes Risk</h3>
              <p className="text-gray-600">
                Machine learning model processes data and identifies risk factors
                based on patterns from maternal health datasets
              </p>
            </div>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <ArrowRight className="w-6 h-6 text-[#2BB4A0]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="text-gray-900 mb-3">Get Risk Level & Guidance</h3>
            <p className="text-gray-600">
              ASHA receives clear risk classification and actionable recommendations
              for follow-up care or referrals
            </p>
          </div>
        </div>
      </div>

      {/* AI Pipeline Visualization */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
        <h2 className="text-gray-900 mb-8 text-center">AI Pipeline</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Database className="w-10 h-10 text-[#2BB4A0]" />
            </div>
            <p className="text-gray-700">Input Data</p>
            <p className="text-gray-500 text-sm mt-1">Patient parameters</p>
          </div>

          <ArrowRight className="w-8 h-8 text-[#2BB4A0] rotate-90 md:rotate-0" />

          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-10 h-10 text-[#2BB4A0]" />
            </div>
            <p className="text-gray-700">Preprocessing</p>
            <p className="text-gray-500 text-sm mt-1">Normalization & validation</p>
          </div>

          <ArrowRight className="w-8 h-8 text-[#2BB4A0] rotate-90 md:rotate-0" />

          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-10 h-10 text-[#2BB4A0]" />
            </div>
            <p className="text-gray-700">AI Model</p>
            <p className="text-gray-500 text-sm mt-1">Risk classification</p>
          </div>

          <ArrowRight className="w-8 h-8 text-[#2BB4A0] rotate-90 md:rotate-0" />

          <div className="flex-1 text-center">
            <div className="w-20 h-20 bg-[#2BB4A0]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-10 h-10 text-[#2BB4A0]" />
            </div>
            <p className="text-gray-700">Risk Score</p>
            <p className="text-gray-500 text-sm mt-1">Low / Medium / High</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#2BB4A0] to-[#259988] rounded-2xl shadow-xl p-8 sm:p-12 text-center text-white">
        <h2 className="mb-4">Ready to Start Assessment?</h2>
        <p className="mb-8 opacity-90 max-w-2xl mx-auto">
          Help identify high-risk pregnancies early and enable timely interventions
          for better maternal and infant health outcomes.
        </p>
        <Link
          to="/assessment"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2BB4A0] rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
        >
          Start Risk Assessment
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
