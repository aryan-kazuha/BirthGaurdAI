import { Heart, Shield, Users, AlertTriangle, BookOpen, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-[#2BB4A0]/10 rounded-full mb-4">
          <Heart className="w-12 h-12 text-[#2BB4A0]" />
        </div>
        <h1 className="text-gray-900 mb-2">About MaternaCare AI</h1>
        <p className="text-gray-600">
          Technology for social good in maternal healthcare
        </p>
      </div>

      {/* Project Purpose */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <BookOpen className="w-7 h-7 text-[#2BB4A0] mr-3" />
          <h2 className="text-gray-900">Project Purpose</h2>
        </div>
        <p className="text-gray-700 mb-4">
          MaternaCare AI is a decision support tool designed to empower ASHA (Accredited Social
          Health Activist) workers and ANMs (Auxiliary Nurse Midwives) in rural India with
          data-driven insights for maternal health risk assessment.
        </p>
        <p className="text-gray-700 mb-4">
          Built as a hackathon/student prototype, this application demonstrates how artificial
          intelligence can be leveraged to address critical public health challenges, particularly
          in resource-constrained settings where early risk identification can save lives.
        </p>
        <div className="p-4 bg-[#2BB4A0]/5 rounded-lg border-l-4 border-[#2BB4A0]">
          <p className="text-gray-800">
            <strong>Mission:</strong> To reduce maternal and infant mortality through early detection
            of high-risk pregnancies and timely medical intervention.
          </p>
        </div>
      </div>

      {/* Target Users */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <Users className="w-7 h-7 text-[#2BB4A0] mr-3" />
          <h2 className="text-gray-900">Who Is This For?</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-[#2BB4A0]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl">👩‍⚕️</span>
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">ASHA Workers & ANMs</h3>
              <p className="text-gray-600">
                Frontline health workers who can use this tool during home visits and health camps
                to identify pregnancies requiring additional medical attention.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 bg-[#2BB4A0]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl">🏥</span>
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Primary Health Centers (PHCs)</h3>
              <p className="text-gray-600">
                Medical officers and staff can use aggregated analytics to plan interventions and
                allocate resources based on risk distribution.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 bg-[#2BB4A0]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Public Health Administrators</h3>
              <p className="text-gray-600">
                District and state-level officials can analyze trends and design targeted maternal
                health programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Good Focus */}
      <div className="bg-gradient-to-br from-[#F4A9A2]/10 to-[#2BB4A0]/10 rounded-2xl p-8 mb-8">
        <div className="flex items-center mb-4">
          <Heart className="w-7 h-7 text-[#F4A9A2] mr-3" />
          <h2 className="text-gray-900">Social Impact Focus</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-900 mb-2">The Problem</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#F4A9A2] mr-2">•</span>
                <span>India accounts for ~17% of global maternal deaths</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4A9A2] mr-2">•</span>
                <span>Rural areas face acute shortage of skilled healthcare providers</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4A9A2] mr-2">•</span>
                <span>Many high-risk pregnancies go undetected until complications arise</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#F4A9A2] mr-2">•</span>
                <span>Limited access to timely specialist care in remote areas</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Our Approach</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#2BB4A0] mr-2">✓</span>
                <span>AI-powered early risk detection using simple clinical parameters</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2BB4A0] mr-2">✓</span>
                <span>Mobile-friendly interface designed for low-literacy users</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2BB4A0] mr-2">✓</span>
                <span>Clear, actionable recommendations for frontline workers</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2BB4A0] mr-2">✓</span>
                <span>Analytics for program-level planning and resource allocation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ethics & Safety */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <Shield className="w-7 h-7 text-[#2BB4A0] mr-3" />
          <h2 className="text-gray-900">Ethics & Safety</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-900 mb-2">Data Privacy & Anonymization</h3>
            <p className="text-green-800">
              This prototype does not store or transmit patient data to external servers. All
              assessments are processed locally. In a production deployment, data would be
              anonymized and encrypted according to healthcare data protection standards.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-blue-900 mb-2">Decision Support, Not Diagnosis</h3>
            <p className="text-blue-800">
              This AI tool is explicitly designed as a <strong>decision support system</strong> to
              assist trained health workers, not to replace clinical judgment or professional
              medical diagnosis.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-purple-900 mb-2">Alignment with Medical Guidelines</h3>
            <p className="text-purple-800">
              Risk factors and recommendations are based on WHO guidelines, national maternal health
              protocols, and peer-reviewed medical research. The model prioritizes high recall for
              high-risk cases to minimize false negatives.
            </p>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h3 className="text-indigo-900 mb-2">Transparency & Explainability</h3>
            <p className="text-indigo-800">
              The AI model provides clear explanations for risk classifications, showing which
              factors contributed to the assessment. This builds trust and enables health workers
              to understand and communicate findings.
            </p>
          </div>
        </div>
      </div>

      {/* Important Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-8 h-8 text-amber-600 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-amber-900 mb-3">Important Disclaimer</h2>
            <div className="space-y-2 text-amber-800">
              <p>
                <strong>This is a prototype demonstration tool</strong> developed for educational
                and hackathon purposes. It is NOT approved for clinical use.
              </p>
              <p>
                <strong>Not a medical device:</strong> This tool does not replace professional
                medical advice, diagnosis, or treatment. Always consult qualified healthcare
                providers for medical decisions.
              </p>
              <p>
                <strong>Data limitations:</strong> The AI model is trained on publicly available
                datasets which may not fully represent local population characteristics. Production
                deployment would require validation with local clinical data.
              </p>
              <p>
                <strong>Not for PII collection:</strong> Figma Make and this prototype are not
                designed for collecting or securing personally identifiable information or sensitive
                health data. Production systems would require HIPAA/local compliance infrastructure.
              </p>
              <p>
                <strong>Supervision required:</strong> This tool should only be used by trained
                health workers under appropriate medical supervision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hackathon Context */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center mb-4">
          <Award className="w-7 h-7 text-[#2BB4A0] mr-3" />
          <h2 className="text-gray-900">Hackathon / Student Project</h2>
        </div>
        <p className="text-gray-700 mb-4">
          MaternaCare AI was developed as a student project to demonstrate the potential of AI in
          addressing healthcare challenges in rural India. The project showcases:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-[#2BB4A0] mt-2 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              Full-stack web application development with modern technologies
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-[#2BB4A0] mt-2 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Machine learning for social good applications</span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-[#2BB4A0] mt-2 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              User-centered design for low-resource environments
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 rounded-full bg-[#2BB4A0] mt-2 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              Healthcare AI ethics and responsible innovation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
