import React, { useState } from 'react';
import ActionCenter from './components/ActionCenter';
import { 
  Building2, 
  Users, 
  Clock, 
  FileText, 
  Mail, 
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

interface TabProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ name, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
      isActive
        ? 'border-red-500 text-red-600 bg-red-50'
        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{name}</span>
  </button>
);

const ScoreIndicator: React.FC<{ 
  score: number; 
  label: string; 
  type: 'business' | 'risk' 
}> = ({ score, label, type }) => {
  const getScoreColor = () => {
    if (type === 'business') {
      return score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';
    } else {
      return score >= 70 ? 'text-red-600' : score >= 50 ? 'text-yellow-600' : 'text-green-600';
    }
  };

  const getScoreIcon = () => {
    if (type === 'business') {
      return score >= 70 ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />;
    } else {
      return score >= 70 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-1 ${getScoreColor()}`}>
        {getScoreIcon()}
        <span className="text-lg font-bold">{score}</span>
        <span className="text-sm text-gray-500">/100</span>
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('action-center');

  const tabs = [
    { id: 'action-center', name: 'Action Center', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'rfi', name: 'RFI', icon: <Mail className="w-4 h-4" /> },
    { id: 'risk', name: 'Risk', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'business-opportunity', name: 'Business Opportunity', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'decisioning', name: 'Decisioning', icon: <Building2 className="w-4 h-4" /> },
  ];

  // Sample application data
  const applicationData = {
    businessName: 'TechFlow Solutions LLC',
    businessStructure: 'LLC',
    businessScore: 78,
    riskScore: 34,
    submissionDate: '14 JUL 2025 (TODAY)',
    businessVertical: 'Technology Services',
    applicationId: 'app_384b5g8t0djyer'
  };

  const handleSectionClick = (sectionRef: string) => {
    const element = document.getElementById(sectionRef);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'action-center':
        return <ActionCenter onSectionClick={handleSectionClick} />;
      case 'rfi':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Request for Information (RFI)</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">RFI management and communication tools will be displayed here.</p>
              <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Risk Assessment</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">Risk analysis and scoring details will be displayed here.</p>
              <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
            </div>
          </div>
        );
      case 'business-opportunity':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Opportunity</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">Business opportunity analysis and scoring will be displayed here.</p>
              <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
            </div>
          </div>
        );
      case 'decisioning':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Decisioning</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">Final approval/rejection controls and decision tools will be displayed here.</p>
              <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Efficient with ~15% height */}
      <header className="bg-white shadow-sm border-b border-gray-200 h-[15vh] min-h-[120px]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Left side - Business info */}
          <div className="flex items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{applicationData.businessName}</h1>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {applicationData.businessStructure}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="font-medium">ID:</span>
                  <code className="bg-gray-100 px-1 rounded text-xs">{applicationData.applicationId}</code>
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-medium">Vertical:</span>
                  {applicationData.businessVertical}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Scores and date */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Submitted</div>
              <div className="font-medium text-gray-900">{applicationData.submissionDate}</div>
            </div>
            
            <div className="flex gap-6">
              <ScoreIndicator 
                score={applicationData.businessScore} 
                label="Business Score" 
                type="business" 
              />
              <ScoreIndicator 
                score={applicationData.riskScore} 
                label="Risk Score" 
                type="risk" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                id={tab.id}
                name={tab.name}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto bg-white min-h-[calc(85vh-60px)]">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;