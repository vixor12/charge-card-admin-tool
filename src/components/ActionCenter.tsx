import React, { useState } from 'react';
import { ChevronUp, Check, Star, AlertTriangle, CreditCard, Building, Minus, DollarSign, X } from 'lucide-react';

interface ChecklistItem {
  id: string;
  attribute: string;
  currentStatus: string;
  statusOptions: {
    verified: string[];
    unverified: string[];
  };
  notes: string;
  instructions: string;
  sectionRef?: string;
  nonModifiableStatuses?: string[];
  notesRequiredStatuses?: string[];
  uboName?: string;
  isUboItem?: boolean;
}

interface UboGroup {
  name: string;
  items: ChecklistItem[];
  isExpanded: boolean;
}

interface ActionCenterProps {
  onSectionClick: (sectionRef: string) => void;
}

const ActionCenter: React.FC<ActionCenterProps> = ({ onSectionClick }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedUbos, setExpandedUbos] = useState<{ [key: string]: boolean }>({
    'Bruce Wayne': false,
    'Clark Kent': false
  });
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: 'formation-doc',
      attribute: 'Formation Document Provided',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Automatically', 'Manually'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If the AI checker verifies the document, proceed. If it doesn\'t, manually check that: a) The business name is correct b) The document appears legitimate',
      sectionRef: 'formation-section',
      nonModifiableStatuses: ['Automatically'],
      notesRequiredStatuses: ['Manually']
    },
    {
      id: 'legal-name',
      attribute: 'Legal Name of Business',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Middesk', 'Articles of Incorporation'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If Middesk verifies, mark as verified. If not, check Articles of Incorporation: If name matches, update to "Verified – Articles of Incorporation". If not, mark as unverified and prepare RFI to request Articles of Incorporation',
      sectionRef: 'legal-name-section',
      nonModifiableStatuses: ['Middesk'],
      notesRequiredStatuses: ['Articles of Incorporation']
    },
    {
      id: 'business-standing',
      attribute: 'Business Standing',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Middesk status', 'Certificate of Good Standing (COGS)'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If Middesk shows good standing, you\'re done. If not in good standing: No COGS → request in RFI. COGS appears fake or mismatched → request in RFI. Legitimate COGS that matches → update status to "COGS"',
      sectionRef: 'business-standing-section',
      nonModifiableStatuses: ['Middesk status'],
      notesRequiredStatuses: ['Certificate of Good Standing (COGS)']
    },
    {
      id: 'legal-address',
      attribute: 'Business Legal Address',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Middesk', 'EIN Letter', 'Formation Document'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If Middesk shows valid legal address → mark as "Middesk". If Middesk provides a better address → update in address selector. If not Middesk-verified: Check formation doc → if address present, select "Formation Document". Check EIN letter → if address present, select "EIN Letter". If none, mark as unverified and prepare RFI',
      sectionRef: 'legal-address-section',
      nonModifiableStatuses: ['Middesk'],
      notesRequiredStatuses: ['EIN Letter', 'Formation Document']
    },
    {
      id: 'physical-address',
      attribute: 'Business Physical Address',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Middesk', 'Persona', 'Document'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'Middesk verified → move on. Document from onboarding is legitimate + contains name/address → select "Document". Else, prepare an RFI',
      sectionRef: 'physical-address-section',
      nonModifiableStatuses: ['Middesk'],
      notesRequiredStatuses: ['Persona', 'Document']
    },
    {
      id: 'ein-verification',
      attribute: 'EIN Verification',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Middesk', 'EIN Letter'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'Middesk verified → done. Else, prepare to request EIN Letter in an RFI',
      sectionRef: 'ein-section',
      nonModifiableStatuses: ['Middesk'],
      notesRequiredStatuses: ['EIN Letter']
    },
    {
      id: 'ubo-database-bruce',
      attribute: 'UBO Database Verification',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – verified', 'Persona – not verified + foreign'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'American + verified → done. Foreign + not verified → approve. American + not verified → request re-do of KYC via RFI',
      sectionRef: 'ubo-database-bruce-section',
      nonModifiableStatuses: ['Persona – verified', 'Persona – not verified + foreign'],
      notesRequiredStatuses: [],
      uboName: 'Bruce Wayne',
      isUboItem: true
    },
    {
      id: 'government-id-bruce',
      attribute: 'Government ID Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – verified'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If verified → move on. If not → request re-do of KYC via RFI',
      sectionRef: 'government-id-bruce-section',
      nonModifiableStatuses: ['Persona – verified'],
      notesRequiredStatuses: [],
      uboName: 'Bruce Wayne',
      isUboItem: true
    },
    {
      id: 'selfie-verification-bruce',
      attribute: 'Selfie Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – automatic', 'Persona – manual'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If verified → move on. If not: Review selfie in Persona. If face clearly matches ID → update to "Persona – manual". If mismatch → Reject the application',
      sectionRef: 'selfie-bruce-section',
      nonModifiableStatuses: ['Persona – automatic'],
      notesRequiredStatuses: ['Persona – manual'],
      uboName: 'Bruce Wayne',
      isUboItem: true
    },
    {
      id: 'watchlist-ubo-bruce',
      attribute: 'Watchlist Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Match (Persona)', 'False Positive'],
        unverified: ['Real Watchlist Match']
      },
      notes: '',
      instructions: 'No match → move on. Match → research online. If false positive → document rationale in notes, update to "False Positive". If real match → Reject application',
      sectionRef: 'watchlist-ubo-bruce-section',
      nonModifiableStatuses: ['No Match (Persona)'],
      notesRequiredStatuses: ['False Positive'],
      uboName: 'Bruce Wayne',
      isUboItem: true
    },
    {
      id: 'adverse-media-ubo-bruce',
      attribute: 'Adverse Media (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Adverse Media', 'False Positive'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'No hits → move on. Media hit → research. False positive → document and move on. True match → escalate or reject (based on policy)',
      sectionRef: 'adverse-media-ubo-bruce-section',
      nonModifiableStatuses: ['No Adverse Media'],
      notesRequiredStatuses: ['False Positive'],
      uboName: 'Bruce Wayne',
      isUboItem: true
    },
    {
      id: 'ubo-database-clark',
      attribute: 'UBO Database Verification',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – verified', 'Persona – not verified + foreign'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'American + verified → done. Foreign + not verified → approve. American + not verified → request re-do of KYC via RFI',
      sectionRef: 'ubo-database-clark-section',
      nonModifiableStatuses: ['Persona – verified', 'Persona – not verified + foreign'],
      notesRequiredStatuses: [],
      uboName: 'Clark Kent',
      isUboItem: true
    },
    {
      id: 'government-id-clark',
      attribute: 'Government ID Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – verified'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If verified → move on. If not → request re-do of KYC via RFI',
      sectionRef: 'government-id-clark-section',
      nonModifiableStatuses: ['Persona – verified'],
      notesRequiredStatuses: [],
      uboName: 'Clark Kent',
      isUboItem: true
    },
    {
      id: 'selfie-verification-clark',
      attribute: 'Selfie Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Persona – automatic', 'Persona – manual'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If verified → move on. If not: Review selfie in Persona. If face clearly matches ID → update to "Persona – manual". If mismatch → Reject the application',
      sectionRef: 'selfie-clark-section',
      nonModifiableStatuses: ['Persona – automatic'],
      notesRequiredStatuses: ['Persona – manual'],
      uboName: 'Clark Kent',
      isUboItem: true
    },
    {
      id: 'watchlist-ubo-clark',
      attribute: 'Watchlist Verification (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Match (Persona)', 'False Positive'],
        unverified: ['Real Watchlist Match']
      },
      notes: '',
      instructions: 'No match → move on. Match → research online. If false positive → document rationale in notes, update to "False Positive". If real match → Reject application',
      sectionRef: 'watchlist-ubo-clark-section',
      nonModifiableStatuses: ['No Match (Persona)'],
      notesRequiredStatuses: ['False Positive'],
      uboName: 'Clark Kent',
      isUboItem: true
    },
    {
      id: 'adverse-media-ubo-clark',
      attribute: 'Adverse Media (UBO)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Adverse Media', 'False Positive'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'No hits → move on. Media hit → research. False positive → document and move on. True match → escalate or reject (based on policy)',
      sectionRef: 'adverse-media-ubo-clark-section',
      nonModifiableStatuses: ['No Adverse Media'],
      notesRequiredStatuses: ['False Positive'],
      uboName: 'Clark Kent',
      isUboItem: true
    },
    {
      id: 'entity-watchlist',
      attribute: 'Entity Watchlist Verification',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Match (Middesk)', 'False Positive'],
        unverified: ['Real Watchlist Match']
      },
      notes: '',
      instructions: 'No match → move on. Match → internet search. Nothing found → document and mark as "False Positive". If match confirmed → Reject application',
      sectionRef: 'entity-watchlist-section',
      nonModifiableStatuses: ['No Match (Middesk)'],
      notesRequiredStatuses: ['False Positive']
    },
    {
      id: 'entity-pep',
      attribute: 'Entity PEP Match',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Match (Middesk)', 'False Positive'],
        unverified: ['Real PEP Match']
      },
      notes: '',
      instructions: 'No match → move on. Match → internet search. Nothing found → document and mark as "False Positive". Confirmed match → Reject application',
      sectionRef: 'entity-pep-section',
      nonModifiableStatuses: ['No Match (Middesk)'],
      notesRequiredStatuses: ['False Positive']
    },
    {
      id: 'adverse-media-business',
      attribute: 'Adverse Media (Business)',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['No Adverse Media', 'False Positive'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'No hits → move on. Media hit → research. False positive → document and proceed. True match → escalate or reject',
      sectionRef: 'adverse-media-business-section',
      nonModifiableStatuses: ['No Adverse Media'],
      notesRequiredStatuses: ['False Positive']
    },
    {
      id: 'domain-ownership',
      attribute: 'Domain Ownership',
      currentStatus: 'Not verified',
      statusOptions: {
        verified: ['Applicant domain match', 'Document'],
        unverified: ['Not verified']
      },
      notes: '',
      instructions: 'If applicant\'s email domain matches provided website domain → move on. If a document proves domain ownership → move on. Else → create RFI',
      sectionRef: 'domain-ownership-section',
      nonModifiableStatuses: ['Applicant domain match'],
      notesRequiredStatuses: []
    }
  ]);


  // Define automatic verification statuses that cannot be changed to/from
  const automaticStatuses = [
    'Automatically',
    'Middesk',
    'Middesk status',
    'Persona – verified',
    'Persona – not verified + foreign',
    'Persona – automatic',
    'No Match (Persona)',
    'No Adverse Media',
    'No Match (Middesk)',
    'Applicant domain match'
  ];

  const isAutomaticStatus = (status: string) => {
    return automaticStatuses.includes(status);
  };

  const updateItemStatus = (itemId: string, newStatus: string) => {
    const currentItem = checklistItems.find(item => item.id === itemId);
    if (!currentItem) return;

    // Prevent changing from automatic to non-automatic or vice versa
    const currentIsAutomatic = isAutomaticStatus(currentItem.currentStatus);
    const newIsAutomatic = isAutomaticStatus(newStatus);
    
    if (currentIsAutomatic && !newIsAutomatic) return; // Can't change from automatic to manual
    if (!currentIsAutomatic && newIsAutomatic) return; // Can't change from manual to automatic

    setChecklistItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, currentStatus: newStatus } : item
      )
    );
  };

  const updateItemNotes = (itemId: string, newNotes: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, notes: newNotes } : item
      )
    );
  };

  const isStatusVerified = (item: ChecklistItem) => {
    return item.statusOptions.verified.includes(item.currentStatus);
  };

  const isStatusNonModifiable = (item: ChecklistItem) => {
    return item.nonModifiableStatuses?.includes(item.currentStatus) || false;
  };

  const isNotesRequired = (item: ChecklistItem) => {
    return item.notesRequiredStatuses?.includes(item.currentStatus) || false;
  };

  const toggleUboExpansion = (uboName: string) => {
    setExpandedUbos(prev => ({
      ...prev,
      [uboName]: !prev[uboName]
    }));
  };

  const getUboVerificationStatus = (uboName: string) => {
    const uboItems = checklistItems.filter(item => item.uboName === uboName);
    const verifiedCount = uboItems.filter(item => isStatusVerified(item)).length;
    return { verified: verifiedCount, total: uboItems.length };
  };

  const groupItemsByUbo = () => {
    const nonUboItems = checklistItems.filter(item => !item.isUboItem);
    const uboItems = checklistItems.filter(item => item.isUboItem);
    
    const uboGroups: { [key: string]: ChecklistItem[] } = {};
    uboItems.forEach(item => {
      if (item.uboName) {
        if (!uboGroups[item.uboName]) {
          uboGroups[item.uboName] = [];
        }
        uboGroups[item.uboName].push(item);
      }
    });

    return { nonUboItems, uboGroups };
  };

  const getStatusDisplay = (item: ChecklistItem) => {
    const isVerified = isStatusVerified(item);
    const isAutomatic = isAutomaticStatus(item.currentStatus);
    
    if (isVerified) {
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-600" />,
        bgColor: isAutomatic ? 'bg-green-100' : 'bg-green-50',
        textColor: isAutomatic ? 'text-green-800' : 'text-green-700',
        borderColor: isAutomatic ? 'border-green-300' : 'border-green-200'
      };
    } else {
      return {
        icon: <XCircle className="w-4 h-4 text-red-600" />,
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200'
      };
    }
  };

  const handleRowClick = (e: React.MouseEvent, sectionRef?: string) => {
    // Don't navigate if clicking on dropdown or notes input
    const target = e.target as HTMLElement;
    if (target.closest('select') || target.closest('input')) {
      return;
    }
    
    if (sectionRef) {
      onSectionClick(sectionRef);
    }
  };

  const allItemsApproved = checklistItems.every(item => 
    isStatusVerified(item)
  );

  const { nonUboItems, uboGroups } = groupItemsByUbo();

  return (
    <div className="flex h-full max-h-[calc(85vh-60px)]">
      {/* Left Side - Approval Checklist */}
      <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Approval Checklist</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              checklistItems.filter(item => isStatusVerified(item)).length === checklistItems.length
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {checklistItems.filter(item => isStatusVerified(item)).length}/{checklistItems.length}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            All items must be verified or pass before application can be approved.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attribute
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Non-UBO Items */}
              {nonUboItems.map((item) => {
                const statusDisplay = getStatusDisplay(item);
                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                    onClick={(e) => handleRowClick(e, item.sectionRef)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {item.attribute}
                        </span>
                        <div className="relative ml-2">
                          <Info 
                            className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                          />
                          {hoveredItem === item.id && (
                            <div className="absolute z-10 left-6 top-0 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                              <div className="absolute -left-1 top-2 w-2 h-2 bg-gray-900 rotate-45"></div>
                              {item.instructions}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={item.currentStatus}
                          onChange={(e) => updateItemStatus(item.id, e.target.value)}
                          className={`appearance-none w-full px-3 py-2 pr-8 text-sm font-medium rounded-lg border ${statusDisplay.bgColor} ${statusDisplay.textColor} ${statusDisplay.borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isStatusNonModifiable(item) ? 'cursor-pointer' : 'cursor-pointer'
                          }`}
                        >
                          <optgroup label="Verified">
                            {item.statusOptions.verified.map((option) => (
                              <option 
                                key={option} 
                                value={option}
                                disabled={
                                  (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                  (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                  (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                }
                                className={
                                  (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                  (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                  (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                    ? 'text-gray-400 bg-gray-100' : ''
                                }
                              >
                                {option}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Unverified">
                            {item.statusOptions.unverified.map((option) => (
                              <option 
                                key={option} 
                                value={option}
                                disabled={
                                  (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                  (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                  (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                }
                                className={
                                  (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                  (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                  (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                    ? 'text-gray-400 bg-gray-100' : ''
                                }
                              >
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <div className="flex items-center gap-1">
                            {statusDisplay.icon}
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItemNotes(item.id, e.target.value)}
                          placeholder={isNotesRequired(item) ? "Required notes..." : "Add notes..."}
                          className={`w-full px-2 py-1 text-sm text-gray-600 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                            isNotesRequired(item) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                        {isNotesRequired(item) && (
                          <span className="absolute -top-1 -right-1 text-red-500 text-xs">*</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {/* UBO Groups */}
              {Object.entries(uboGroups).map(([uboName, items]) => {
                const { verified, total } = getUboVerificationStatus(uboName);
                const isAllVerified = verified === total;
                
                return (
                  <React.Fragment key={uboName}>
                    {/* UBO Header Row */}
                    <tr 
                      className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => toggleUboExpansion(uboName)}
                    >
                      <td className="px-4 py-3" colSpan={3}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {expandedUbos[uboName] ? (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-900">
                              {uboName}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isAllVerified 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {verified}/{total}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* UBO Items (when expanded) */}
                    {expandedUbos[uboName] && items.map((item) => {
                      const statusDisplay = getStatusDisplay(item);
                      return (
                        <tr 
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors bg-gray-25"
                          onClick={(e) => handleRowClick(e, item.sectionRef)}
                        >
                          <td className="px-4 py-3 pl-12">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">
                                {item.attribute}
                              </span>
                              <div className="relative ml-2">
                                <Info 
                                  className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help"
                                  onMouseEnter={() => setHoveredItem(item.id)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                />
                                {hoveredItem === item.id && (
                                  <div className="absolute z-10 left-6 top-0 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                                    <div className="absolute -left-1 top-2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                    {item.instructions}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <select
                                value={item.currentStatus}
                                onChange={(e) => updateItemStatus(item.id, e.target.value)}
                                className={`appearance-none w-full px-3 py-2 pr-8 text-sm font-medium rounded-lg border ${statusDisplay.bgColor} ${statusDisplay.textColor} ${statusDisplay.borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
                              >
                                <optgroup label="Verified">
                                  {item.statusOptions.verified.map((option) => (
                                    <option 
                                      key={option} 
                                      value={option}
                                      disabled={
                                        (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                        (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                        (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                      }
                                      className={
                                        (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                        (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                        (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                          ? 'text-gray-400 bg-gray-100' : ''
                                      }
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </optgroup>
                                <optgroup label="Unverified">
                                  {item.statusOptions.unverified.map((option) => (
                                    <option 
                                      key={option} 
                                      value={option}
                                      disabled={
                                        (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                        (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                        (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                      }
                                      className={
                                        (isStatusNonModifiable(item) && option !== item.currentStatus) ||
                                        (isAutomaticStatus(item.currentStatus) && !isAutomaticStatus(option) && option !== item.currentStatus) ||
                                        (!isAutomaticStatus(item.currentStatus) && isAutomaticStatus(option) && option !== item.currentStatus)
                                          ? 'text-gray-400 bg-gray-100' : ''
                                      }
                                    >
                                      {option}
                                    </option>
                                  ))}
                                </optgroup>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <div className="flex items-center gap-1">
                                  {statusDisplay.icon}
                                  <ChevronDown className="w-3 h-3 text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative">
                              <input
                                type="text"
                                value={item.notes}
                                onChange={(e) => updateItemNotes(item.id, e.target.value)}
                                placeholder={isNotesRequired(item) ? "Required notes..." : "Add notes..."}
                                className={`w-full px-2 py-1 text-sm text-gray-600 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                                  isNotesRequired(item) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                              {isNotesRequired(item) && (
                                <span className="absolute -top-1 -right-1 text-red-500 text-xs">*</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Approval Status Summary */}
        <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Application Status</h3>
              <p className="text-xs text-gray-600 mt-1">
                {checklistItems.filter(item => isStatusVerified(item)).length} of {checklistItems.length} requirements met
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              allItemsApproved 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {allItemsApproved ? 'Ready for Approval' : 'Pending Requirements'}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Applicant Information */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Applicant Information</h2>
        </div>

        {/* Entity Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Entity Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
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
              <span className="ml-2 text-blue-600 hover:text-blue-800">
                <a href="https://techflowsolutions.com" target="_blank" rel="noopener noreferrer">
                  techflowsolutions.com
                </a>
              </span>
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
              <span className="ml-2 text-gray-900">25-50 employees</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">DBA Name:</span>
              <span className="ml-2 text-gray-500 italic">N/A</span>
            </div>
          </div>
        </div>

        {/* Formation Document Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Formation Document</h3>
          
          <div className="flex gap-4">
            {/* Document Preview */}
            <div className="relative group">
              <div className="w-16 h-20 bg-gray-100 border border-gray-200 rounded cursor-pointer transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              
              {/* Hover Preview */}
              <div className="absolute left-20 top-0 w-64 h-80 bg-white border border-gray-300 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">PDF Preview</p>
                    <p className="text-xs text-gray-500">Articles of Incorporation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Details */}
            <div className="flex-1 space-y-2">
              <div>
                <span className="font-medium text-gray-900">TechFlow_Articles_of_Incorporation.pdf</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Business Name?</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Date Uploaded:</span>
                  <span className="text-gray-900">Jul 14, 2025</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Uploaded By:</span>
                  <span className="text-gray-900">Bruce Wayne</span>
                </div>
              </div>
              
              <div className="flex items-start gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-gray-600">Legitimacy</span>
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-1">
                    <span className="text-white text-xs">✦</span>
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Document appears legitimate with proper state seal, correct formatting, and matching business details. All required fields are present and consistent.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Questionnaire Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Questionnaire</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Slash Use Details:</span>
              <p className="mt-1 text-gray-900">We provide cloud-based software solutions for small to medium businesses, focusing on workflow automation and data analytics tools.</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Please tell us what your business does:</span>
              <p className="mt-1 text-gray-900">TechFlow Solutions develops and maintains SaaS platforms that help businesses streamline their operations through automated workflows, real-time analytics, and integration services.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <span className="font-medium text-gray-700">How did you hear about Slash?</span>
                <p className="text-gray-900">Referral from existing customer</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Team size:</span>
                <span className="ml-2 text-gray-900">42 employees</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estimated customers served:</span>
                <span className="ml-2 text-gray-900">~1,200 customers</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Customer type:</span>
                <span className="ml-2 text-gray-900">Businesses</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Cash on balance sheet:</span>
                <span className="ml-2 text-gray-900">$2.4M</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Estimated annual revenue:</span>
                <span className="ml-2 text-gray-900">$8.5M</span>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">How do you plan to use your account?</span>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Accounts Payable</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Accounts Receivable</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Treasury Management</span>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Non-US countries of operation:</span>
              <p className="mt-1 text-gray-900">Canada, United Kingdom</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business Source of Funds:</span>
              <p className="mt-1 text-gray-900">Revenue from SaaS subscriptions, professional services, and venture capital funding (Series A completed in 2023).</p>
            </div>
          </div>
        </div>

        {/* Company Activity Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Company activity</h3>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Card */}
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">V</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Card</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Incoming</div>
                <div className="text-sm text-gray-900">-</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Outgoing</div>
                <div className="text-sm font-medium text-gray-900">101-500 transactions</div>
                <div className="text-sm text-gray-600">$1-100k vol.</div>
              </div>
            </div>

            {/* ACH */}
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">🏛</span>
                </div>
                <span className="text-sm font-medium text-gray-900">ACH</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Incoming</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$1-100k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Outgoing</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$1-100k vol.</div>
              </div>
            </div>

            {/* Domestic Wire */}
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">⊖</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Domestic Wire</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Incoming</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$101k-500k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Outgoing</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$101k-500k vol.</div>
              </div>
            </div>

            {/* International Wire */}
            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">⊖</span>
                </div>
                <span className="text-sm font-medium text-gray-900">International Wire</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Incoming</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$101k-500k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Outgoing</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$101k-500k vol.</div>
              </div>
            </div>

            {/* USDC/USDT */}
            <div className="grid grid-cols-3 gap-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">⊖</span>
                </div>
                <span className="text-sm font-medium text-gray-900">USDC/USDT</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Incoming</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$1-100k vol.</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Outgoing</div>
                <div className="text-sm font-medium text-gray-900">1-100 transactions</div>
                <div className="text-sm text-gray-600">$1-100k vol.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formation Document History */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Document History</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-medium text-gray-600">Preview</th>
                <th className="text-left py-2 px-2 font-medium text-gray-600">Business Name</th>
                <th className="text-left py-2 px-2 font-medium text-gray-600">Legitimacy</th>
                <th className="text-left py-2 px-2 font-medium text-gray-600">Upload Date</th>
                <th className="text-left py-2 px-2 font-medium text-gray-600">Uploaded By</th>
              </tr>
            </thead>
            <tbody>
              {/* Document 1 - Rejected/Incorrect */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2">
                  <div className="relative group">
                    <div className="w-8 h-10 bg-red-100 border border-red-200 rounded flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    {/* Hover Preview */}
                    <div className="absolute left-0 top-12 w-32 h-40 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="w-full h-full bg-red-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-red-400" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <X className="w-3 h-3 text-red-500" />
                    <span className="text-red-600 text-xs">Not Found</span>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <X className="w-3 h-3 text-red-500" />
                    <span className="text-red-600 text-xs">Not Verified</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-gray-600">Jan 10, 2025</td>
                <td className="py-2 px-2 text-gray-600">Clark Kent</td>
              </tr>
              
              {/* Document 2 - Questionable */}
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2">
                  <div className="relative group">
                    <div className="w-8 h-10 bg-yellow-100 border border-yellow-200 rounded flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-yellow-600" />
                    </div>
                    {/* Hover Preview */}
                    <div className="absolute left-0 top-12 w-32 h-40 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="w-full h-full bg-yellow-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-green-600 text-xs">Verified</span>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-600 text-xs">Maybe</span>
                  </div>
                </td>
                <td className="py-2 px-2 text-gray-600">Jan 12, 2025</td>
                <td className="py-2 px-2 text-gray-600">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActionCenter;