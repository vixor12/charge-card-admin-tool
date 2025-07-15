import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Clock, 
  FileText, 
  Mail, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ChevronUp,
  Star,
  X,
  AlertCircle,
  Eye,
  Info
} from 'lucide-react';

interface ActionCenterProps {
  onSectionClick: (sectionRef: string) => void;
}

const ActionCenter: React.FC<ActionCenterProps> = ({ onSectionClick }) => {
  const [hoveredDocument, setHoveredDocument] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleActionClick = (action: string, sectionRef: string) => {
    console.log(`Action clicked: ${action}`);
    onSectionClick(sectionRef);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Action Items Summary */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-red-800">Action Items Required</h2>
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => handleActionClick('verify-identity', 'applicant-info')}
            className="flex items-center justify-between w-full p-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">Verify UBO Identity Documents</span>
            </div>
            <span className="text-red-600 text-sm font-medium">2 pending</span>
          </button>
          
          <button 
            onClick={() => handleActionClick('review-financials', 'financial-info')}
            className="flex items-center justify-between w-full p-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">Review Financial Statements</span>
            </div>
            <span className="text-red-600 text-sm font-medium">Q4 2024 missing</span>
          </button>
          
          <button 
            onClick={() => handleActionClick('compliance-check', 'compliance')}
            className="flex items-center justify-between w-full p-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">Complete Compliance Screening</span>
            </div>
            <span className="text-red-600 text-sm font-medium">AML pending</span>
          </button>
        </div>
      </div>

      {/* Applicant Information */}
      <div id="applicant-info" className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Applicant Information</h3>
        </div>
        
        {/* Entity Details */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Entity Details</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <span className="font-medium text-gray-700">Legal Name:</span>
              <span className="ml-2 text-gray-900">TechFlow Solutions LLC</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Industry:</span>
              <span className="ml-2 text-gray-900">Technology Services</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business Phone:</span>
              <span className="ml-2 text-gray-900">(555) 123-4567</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">EIN:</span>
              <span className="ml-2 text-gray-900">12-3456789</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Website:</span>
              <a href="https://techflowsolutions.com" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-800 underline">
                techflowsolutions.com
              </a>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date of Formation:</span>
              <span className="ml-2 text-gray-900">March 15, 2019</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Incorporation State:</span>
              <span className="ml-2 text-gray-900">Delaware</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Secretary of State Status:</span>
              <span className="ml-2 text-green-600 font-medium">Active</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Team Size:</span>
              <span className="ml-2 text-gray-900">47 employees</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">DBA Name:</span>
              <span className="ml-2 text-gray-500 italic">N/A</span>
            </div>
          </div>
        </div>

        {/* Formation Document */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Formation Document</h4>
          <div className="flex items-start gap-4">
            {/* Document Preview */}
            <div 
              className="relative"
              onMouseEnter={() => setHoveredDocument('main')}
              onMouseLeave={() => setHoveredDocument(null)}
            >
              <div className="w-16 h-20 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:scale-105 transition-transform">
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
              </div>
              
              {/* Hover Preview */}
              {hoveredDocument === 'main' && (
                <div className="absolute top-0 left-20 z-10 w-48 h-64 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                  <div className="w-full h-full bg-gray-50 rounded flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FileText className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-xs">PDF Preview</p>
                      <p className="text-xs">Certificate of Formation</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Document Details */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="font-medium text-gray-700">Document:</span>
                <span className="ml-2 text-gray-900">Certificate_of_Formation_TechFlow_LLC.pdf</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">Business Name:</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">Verified</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-700">Legitimacy:</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Star className="w-4 h-4 text-blue-500" />
                  <span className="text-green-600 text-sm">Verified</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Document appears authentic with proper state seals, signatures, and formatting. All required fields are complete and consistent with Delaware formation requirements.
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Uploaded:</span>
                  <span className="ml-1">July 12, 2025 at 2:34 PM</span>
                </div>
                <div>
                  <span className="font-medium">By:</span>
                  <span className="ml-1">Bruce Wayne</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document History Table */}
        <div className="p-6 border-b border-gray-100">
          <h5 className="text-md font-medium text-gray-800 mb-3">Document History</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Preview</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Upload Date</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Business Name</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Legitimacy</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Uploaded By</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* First History Entry */}
                <tr 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => console.log('View document details')}
                >
                  <td className="py-3 px-3">
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredDocument('history-1')}
                      onMouseLeave={() => setHoveredDocument(null)}
                    >
                      <div className="w-8 h-10 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-3 h-3 text-gray-500" />
                        </div>
                      </div>
                      
                      {hoveredDocument === 'history-1' && (
                        <div className="absolute top-0 left-12 z-10 w-32 h-40 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                          <div className="w-full h-full bg-gray-50 rounded flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <FileText className="w-6 h-6 mx-auto mb-1" />
                              <p className="text-xs">PDF Preview</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-900">July 10, 2025</td>
                  <td className="py-3 px-3">
                    <div 
                      className="flex items-center gap-1 relative"
                      onMouseEnter={() => setShowTooltip('business-maybe')}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-600 text-sm">Maybe</span>
                      {showTooltip === 'business-maybe' && (
                        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
                          Business name partially matches
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div 
                      className="flex items-center gap-1 relative"
                      onMouseEnter={() => setShowTooltip('legitimacy-verified')}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 text-sm">Verified</span>
                      {showTooltip === 'legitimacy-verified' && (
                        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
                          Document appears authentic
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-900">Clark Kent</td>
                  <td className="py-3 px-3">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs">View</span>
                    </button>
                  </td>
                </tr>

                {/* Second History Entry */}
                <tr 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => console.log('View document details')}
                >
                  <td className="py-3 px-3">
                    <div 
                      className="relative"
                      onMouseEnter={() => setHoveredDocument('history-2')}
                      onMouseLeave={() => setHoveredDocument(null)}
                    >
                      <div className="w-8 h-10 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-3 h-3 text-gray-500" />
                        </div>
                      </div>
                      
                      {hoveredDocument === 'history-2' && (
                        <div className="absolute top-0 left-12 z-10 w-32 h-40 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                          <div className="w-full h-full bg-gray-50 rounded flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <FileText className="w-6 h-6 mx-auto mb-1" />
                              <p className="text-xs">PDF Preview</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-900">July 8, 2025</td>
                  <td className="py-3 px-3">
                    <div 
                      className="flex items-center gap-1 relative"
                      onMouseEnter={() => setShowTooltip('business-unverified')}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <X className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 text-sm">Unverified</span>
                      {showTooltip === 'business-unverified' && (
                        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
                          Business name does not match
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div 
                      className="flex items-center gap-1 relative"
                      onMouseEnter={() => setShowTooltip('legitimacy-unverified')}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <X className="w-4 h-4 text-red-600" />
                      <span className="text-red-600 text-sm">Not Verified</span>
                      {showTooltip === 'legitimacy-unverified' && (
                        <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
                          Document appears suspicious or incomplete
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-gray-900">Admin</td>
                  <td className="py-3 px-3">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Eye className="w-3 h-3" />
                      <span className="text-xs">View</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic Questionnaire */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Basic Questionnaire</h4>
          
          {/* Full-width text responses */}
          <div className="space-y-4 mb-6">
            <div>
              <span className="font-medium text-gray-700 block mb-1">Slash Use Details:</span>
              <p className="text-gray-900 text-sm leading-relaxed">
                We plan to use Slash for comprehensive treasury management including accounts payable automation, 
                accounts receivable processing, and payroll distribution. Our primary need is streamlined B2B payments 
                to vendors and contractors across multiple countries, with integrated reporting for our finance team.
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700 block mb-1">Please tell us what your business does:</span>
              <p className="text-gray-900 text-sm leading-relaxed">
                TechFlow Solutions provides enterprise software consulting and custom application development services. 
                We specialize in cloud migration, API integration, and digital transformation projects for mid-market 
                companies. Our team of 47 engineers and consultants work with clients across North America and Europe 
                to modernize their technology infrastructure and optimize business processes.
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700 block mb-1">How did you hear about Slash?:</span>
              <p className="text-gray-900 text-sm">
                Recommended by our CFO's network at a FinTech conference. Several portfolio companies from our 
                Series B investors also mentioned positive experiences with Slash's platform.
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700 block mb-1">Business Source of Funds:</span>
              <p className="text-gray-900 text-sm">
                Primary funding from Series B venture capital round ($12M from Andreessen Horowitz and Sequoia Capital), 
                supplemented by recurring revenue from existing client contracts and retained earnings from operations.
              </p>
            </div>
          </div>
          
          {/* Grid layout for shorter responses */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <span className="font-medium text-gray-700">Team size:</span>
              <span className="ml-2 text-gray-900">47 employees</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Estimated customers served:</span>
              <span className="ml-2 text-gray-900">~150 active clients</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Customer type:</span>
              <span className="ml-2 text-gray-900">Businesses</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Countries of operation:</span>
              <span className="ml-2 text-gray-900">Canada, United Kingdom</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Cash on balance sheet:</span>
              <span className="ml-2 text-gray-900">$2,400,000</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Estimated annual revenue:</span>
              <span className="ml-2 text-gray-900">$8,500,000</span>
            </div>
          </div>
          
          {/* Account usage plans */}
          <div className="mt-4">
            <span className="font-medium text-gray-700 block mb-2">How do you plan to use your account:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Accounts Payable</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Accounts Receivable</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Treasury Management</span>
            </div>
          </div>
        </div>

        {/* Company Activity */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-800">Company activity</h4>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
              <div></div>
              <div className="text-center">Incoming</div>
              <div className="text-center">Outgoing</div>
            </div>
            
            {/* Card Row */}
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">💳</span>
                </div>
                <span className="font-medium text-gray-900">Card</span>
              </div>
              <div className="text-center text-gray-600">-</div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">101-500 transactions</div>
                <div className="text-gray-600 text-sm">$1-100k vol.</div>
              </div>
            </div>
            
            {/* ACH Row */}
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">🏦</span>
                </div>
                <span className="font-medium text-gray-900">ACH</span>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$1-100k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$1-100k vol.</div>
              </div>
            </div>
            
            {/* Domestic Wire Row */}
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">⚡</span>
                </div>
                <span className="font-medium text-gray-900">Domestic Wire</span>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$101k-500k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$101k-500k vol.</div>
              </div>
            </div>
            
            {/* International Wire Row */}
            <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">🌍</span>
                </div>
                <span className="font-medium text-gray-900">International Wire</span>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$101k-500k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$101k-500k vol.</div>
              </div>
            </div>
            
            {/* USDC/USDT Row */}
            <div className="grid grid-cols-3 gap-4 items-center py-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-mono">₿</span>
                </div>
                <span className="font-medium text-gray-900">USDC/USDT</span>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$1-100k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium">1-100 transactions</div>
                <div className="text-gray-600 text-sm">$1-100k vol.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections would go here */}
      <div id="financial-info" className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Financial statements and banking information will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
        </div>
      </div>

      <div id="compliance" className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance & Risk</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">AML screening, sanctions checks, and compliance status will be displayed here.</p>
          <p className="text-sm text-gray-500 mt-2">Content to be populated in next iteration.</p>
        </div>
      </div>
    </div>
  );
};

export default ActionCenter;