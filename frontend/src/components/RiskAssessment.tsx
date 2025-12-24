import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Clipboard, ArrowRight } from 'lucide-react';

export default function RiskAssessment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    Bodytemp: '',
    weeksPregnant: '',
    location: 'rural',
    systolicBP: '',
    diastolicBP: '',
    bloodSugar: '',
    heartrate: '',
    weight: '',
    bmi: '',
    previousComplications: false,
    preExistingDiabetes: false,
    gestationalDiabetes: false,
    mentalHealthConcerns: false,
    shortBirthSpacing: false,
  });

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => {
    const updated = {
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    };

    // Auto-calculate BMI when height or weight changes
    if (
      (name === 'weight' || name === 'height') &&
      updated.height &&
      updated.weight
    ) {
      const height = Number(updated.height);
      const weight = Number(updated.weight);

      if (height > 0) {
        updated.bmi = (weight / (height * height)).toFixed(2);
      }
    }

    return updated;
  });
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const features = [
    Number(formData.age),
    Number(formData.systolicBP),
    Number(formData.diastolicBP),
    Number(formData.bloodSugar),
    Number(formData.Bodytemp),
    Number(formData.bmi),
    formData.previousComplications ? 1 : 0,
    formData.preExistingDiabetes ? 1 : 0,
    formData.gestationalDiabetes ? 1 : 0,
    formData.mentalHealthConcerns ? 1 : 0,
    Number(formData.heartrate),
  ];

  try {
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features }),
    });
    const result = await res.json(); 
    console.log('API result:', result);
// whatever `predict()` returns

    // store result + form data for /result page
    sessionStorage.setItem('assessmentData', JSON.stringify(formData));
    sessionStorage.setItem('predictionResult', JSON.stringify(result));
    navigate('/result');
  } catch (err) {
    console.error('Error calling API', err);
    // optionally show an error message UI here
  }
};


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-[#2BB4A0]/10 rounded-full mb-4">
          <Clipboard className="w-10 h-10 text-[#2BB4A0]" />
        </div>
        <h1 className="text-gray-900 mb-2">Pregnancy Risk Assessment</h1>
        <p className="text-gray-600">Enter patient details to predict risk</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Information */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mr-3">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-gray-900">Basic Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-gray-700 mb-2">
                Age (years)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 25"
                min="15"
                max="50"
                required
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-gray-700 mb-2">
                Height(in metres)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 1.65"
                min="1"
                max="2.5"
                step="0.01"
                required
              />
            </div>

            <div>
              <label htmlFor="bodytemp" className="block text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 65"
                min="30"
                max="150"
                required
              />
            </div>

            <div>
              <label htmlFor="weeksPregnant" className="block text-gray-700 mb-2">
                Weeks of Pregnancy
              </label>
              <input
                type="number"
                id="weeksPregnant"
                name="weeksPregnant"
                value={formData.weeksPregnant}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 24"
                min="1"
                max="42"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <div className="flex gap-4 pt-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="location"
                    value="rural"
                    checked={formData.location === 'rural'}
                    onChange={handleInputChange}
                    className="mr-2 w-4 h-4 accent-[#2BB4A0]"
                  />
                  <span className="text-gray-700">Rural</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="location"
                    value="urban"
                    checked={formData.location === 'urban'}
                    onChange={handleInputChange}
                    className="mr-2 w-4 h-4 accent-[#2BB4A0]"
                  />
                  <span className="text-gray-700">Urban</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Clinical Parameters */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mr-3">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-gray-900">Clinical Parameters</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="systolicBP" className="block text-gray-700 mb-2">
                Systolic BP (mmHg)
              </label>
              <input
                type="number"
                id="systolicBP"
                name="systolicBP"
                value={formData.systolicBP}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 120"
                min="60"
                max="200"
                required
              />
            </div>

            <div>
              <label htmlFor="diastolicBP" className="block text-gray-700 mb-2">
                Diastolic BP (mmHg)
              </label>
              <input
                type="number"
                id="diastolicBP"
                name="diastolicBP"
                value={formData.diastolicBP}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 80"
                min="40"
                max="140"
                required
              />
            </div>

            <div>
              <label htmlFor="bloodSugar" className="block text-gray-700 mb-2">
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                id="bloodSugar"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 95"
                min="40"
                max="300"
                required
              />
            </div>

            <div>
  <label htmlFor="heartrate" className="block text-gray-700 mb-2">
    Heart Rate (bpm)
  </label>

                <input
                  type="number"
                  id="heartrate"
                  name="heartrate"
                  value={formData.heartrate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                  placeholder="e.g., 72"
                  min="40"
                  max="200"
                  step="1"
                  required
                />
              </div>


            <div>
              <label htmlFor="Bodytemp" className="block text-gray-700 mb-2">
                Body Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                id="Bodytemp"
                name="Bodytemp"
                value={formData.Bodytemp}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 36.6"
                min="34"
                max="42"
                required
              />
            </div>

            <div>
              <label htmlFor="bmi" className="block text-gray-700 mb-2">
                BMI (kg/m²)
              </label>
              <input
                type="number"
                step="0.1"
                id="bmi"
                name="bmi"
                value={formData.bmi}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2BB4A0]"
                placeholder="e.g., 23.5"
                min="12"
                max="50"
                required
              />
            </div>
          </div>
        </div>

        {/* Step 3: Medical & Pregnancy History */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[#2BB4A0] text-white rounded-full flex items-center justify-center mr-3">
              <Clipboard className="w-6 h-6" />
            </div>
            <h2 className="text-gray-900">Medical & Pregnancy History</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="previousComplications"
                checked={formData.previousComplications}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-5 h-5 accent-[#2BB4A0]"
              />
              <div>
                <span className="text-gray-900">Previous pregnancy complications</span>
                <p className="text-gray-500 text-sm">
                  Preeclampsia, stillbirth, hemorrhage, etc.
                </p>
              </div>
            </label>

            <label className="flex items-start">
              <input
                type="checkbox"
                name="preExistingDiabetes"
                checked={formData.preExistingDiabetes}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-5 h-5 accent-[#2BB4A0]"
              />
              <div>
                <span className="text-gray-900">Pre-existing diabetes</span>
                <p className="text-gray-500 text-sm">Type 1 or Type 2 diabetes</p>
              </div>
            </label>

            <label className="flex items-start">
              <input
                type="checkbox"
                name="gestationalDiabetes"
                checked={formData.gestationalDiabetes}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-5 h-5 accent-[#2BB4A0]"
              />
              <div>
                <span className="text-gray-900">Gestational diabetes</span>
                <p className="text-gray-500 text-sm">
                  Diabetes developed during this pregnancy
                </p>
              </div>
            </label>

            <label className="flex items-start">
              <input
                type="checkbox"
                name="mentalHealthConcerns"
                checked={formData.mentalHealthConcerns}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-5 h-5 accent-[#2BB4A0]"
              />
              <div>
                <span className="text-gray-900">Mental health concerns</span>
                <p className="text-gray-500 text-sm">
                  Depression, anxiety, or other mental health issues
                </p>
              </div>
            </label>

            <label className="flex items-start">
              <input
                type="checkbox"
                name="shortBirthSpacing"
                checked={formData.shortBirthSpacing}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-5 h-5 accent-[#2BB4A0]"
              />
              <div>
                <span className="text-gray-900">Short birth spacing</span>
                <p className="text-gray-500 text-sm">Less than 18 months since last delivery</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#2BB4A0] text-white py-4 px-8 rounded-lg hover:bg-[#259988] transition-colors shadow-lg flex items-center justify-center"
        >
          <span className="text-lg">Predict Risk (AI)</span>
          <ArrowRight className="ml-2 w-6 h-6" />
        </button>
      </form>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-900 text-sm text-center">
          This is a decision support tool, not a diagnostic device. Always consult with a medical
          professional for final decisions.
        </p>
      </div>
    </div>
  );
}
