import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import HomePage from './components/HomePage';
import RiskAssessment from './components/RiskAssessment';
import RiskResult from './components/RiskResult';
import ModelData from './components/ModelData';
import Analytics from './components/Analytics';
import About from './components/About';
import PregnancyTimeline from './components/PregnancyTimeline';
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#FDF7F2]">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#2BB4A0] rounded-lg flex items-center justify-center text-white">
                  <span className="text-lg">♥</span>
                </div>
                <span className="text-gray-900">MaternaCare AI</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-[#2BB4A0]">
                  Home
                </Link>
                <Link to="/assessment" className="text-gray-700 hover:text-[#2BB4A0]">
                  Risk Assessment
                </Link>
                <Link to="/timeline" className="text-gray-700 hover:text-[#2BB4A0]">
                  Timeline
                  </Link>
                <Link to="/model" className="text-gray-700 hover:text-[#2BB4A0]">
                  Model & Data
                </Link>
                <Link to="/analytics" className="text-gray-700 hover:text-[#2BB4A0]">
                  Analytics
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-[#2BB4A0]">
                  About
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-2 space-y-2">
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/assessment"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Risk Assessment
                </Link>
                <Link
                  to="/timeline"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Timeline
                </Link>
                <Link
                  to="/model"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Model & Data
                </Link>
                <Link
                  to="/analytics"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-gray-700 hover:text-[#2BB4A0]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<RiskAssessment />} />
          <Route path="/result" element={<RiskResult />} />
          <Route path="/model" element={<ModelData />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
          <Route path="/timeline" element={<PregnancyTimeline />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-white mt-16 py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p>MaternaCare AI – Decision Support Tool for ASHAs</p>
            <p className="mt-2">Not a substitute for professional medical advice</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
