import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UniversitySidebar from '../components/UniversitySidebar';
import UniversityActionCard from '../components/dashboard/UniversityActionCard';
import IdentityDetailsContainer from '../components/dashboard/IdentityDetailsContainer';
import UniversityInfoField from '../components/dashboard/UniversityInfoField';
import '../components/Sidebar.css';
import './UniversityDetails.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const UniversityDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [university, setUniversity] = useState(location.state?.universityData || null);
    const [activeTab, setActiveTab] = useState('identity');
    const [selectedCard, setSelectedCard] = useState(null);

    // Academics program state
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);

    useEffect(() => {
        if (!university && id) {
            fetchUniversityDetails(id);
        }
    }, [id, university]);

    const fetchUniversityDetails = async (uniId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/universities/${uniId}`);
            if (response.ok) {
                const data = await response.json();
                setUniversity(data);
            } else {
                setUniversity({
                    id: uniId,
                    name: 'Loaded University',
                    location: 'Unknown',
                    status: 'IN PROGRESS',
                    progress: 0
                });
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            setUniversity({
                id: uniId,
                name: 'University Name',
                location: 'Location',
                status: 'Loading...',
                progress: 0
            });
        }
    };

    const handleCardClick = (cardId) => {
        setSelectedCard(cardId);
    };

    const handleBackToGrid = () => {
        setSelectedCard(null);
    };

    const handleAddProgram = (name) => {
        const newProgram = {
            id: `prog-${Date.now()}`,
            name: name,
        };
        setPrograms(prev => [...prev, newProgram]);
        setSelectedProgram(newProgram.id);
        setSelectedCard(null);
    };

    const handleProgramSelect = (programId) => {
        setSelectedProgram(programId);
        setSelectedCard(null);
    };

    // ── Identity field configs ──
    const renderCardFields = (cardId) => {
        const fieldConfigs = {
            profile: [
                { label: 'Offline-Online Match', placeholder: 'Enter value...' },
                { label: 'Logos', placeholder: 'Enter logo URL...' },
                { label: 'Legal Names', placeholder: 'Enter legal name...' },
                { label: 'Establishment Years', placeholder: 'Enter year...' },
                { label: 'Group - Uni Mapping', placeholder: 'Enter mapping...' },
            ],
            address: [
                { label: 'Address Lines', placeholder: 'Enter address...' },
                { label: 'Map Embed Urls', placeholder: 'Enter map URL...' },
                { label: 'Nearest Transportation Hubs', placeholder: 'Enter hubs...' },
            ],
            metadata: [
                { label: 'Meta + OG Titles', placeholder: 'Enter title...' },
                { label: 'Descriptions', placeholder: 'Enter description...' },
                { label: 'Images', placeholder: 'Enter image URL...' },
                { label: 'Schema', placeholder: 'Enter schema...' },
            ],
            ranking: [
                { label: 'Ranking Agency', placeholder: 'Enter agency...' },
                { label: 'Ranking Years', placeholder: 'Enter year...' },
                { label: 'Rank Band', placeholder: 'Enter band...' },
                { label: 'Rank Value', placeholder: 'Enter value...' },
                { label: 'Stream/Uni', placeholder: 'Enter stream...' },
                { label: 'Verification Doc', placeholder: 'Enter doc URL...' },
                { label: 'International/Domestic', placeholder: 'Select type...' },
            ],
            accredition: [
                { label: 'Accredition Body', placeholder: 'Enter body...' },
                { label: 'Accredition Name', placeholder: 'Enter name...' },
                { label: 'Logo', placeholder: 'Enter logo URL...' },
                { label: 'Score', placeholder: 'Enter score...' },
                { label: 'Accredition Value', placeholder: 'Enter value...' },
                { label: 'Year', placeholder: 'Enter year...' },
                { label: 'International/Domestic', placeholder: 'Select type...' },
                { label: 'Verification Doc', placeholder: 'Enter doc URL...' },
            ],
            highlights: [
                { label: 'USP', placeholder: 'Enter USP...' },
                { label: 'Icons', placeholder: 'Enter icon...' },
                { label: 'Description', placeholder: 'Enter description...' },
                { label: 'Display Order', placeholder: 'Enter order...' },
            ],
            gallery: [
                { label: 'Category (Infra / LMS / RMS etc.)', placeholder: 'Enter category...' },
                { label: 'Media Type', placeholder: 'Enter type...' },
                { label: 'Media Urls', placeholder: 'Enter URL...' },
            ],
            faqs: [
                { label: 'Category (Admission / Eligibility / Accredition etc.)', placeholder: 'Enter category...' },
                { label: 'Question', placeholder: 'Enter question...' },
                { label: 'Answer', placeholder: 'Enter answer...' },
                { label: 'Order', placeholder: 'Enter order...' },
            ],
            // ── Academics field configs ──
            'degree-master': [
                { label: 'Degree', placeholder: 'Enter degree...' },
                { label: 'Type (PAP, HCL Co-Branded)', placeholder: 'Enter type...' },
                { label: 'Level', placeholder: 'Enter level...' },
                { label: 'Honors', placeholder: 'Enter honors...' },
                { label: 'Duration', placeholder: 'Enter duration...' },
                { label: 'Accelerated Path', placeholder: 'Enter path...' },
                { label: 'Extension', placeholder: 'Enter extension...' },
                { label: 'Exit Pathway', placeholder: 'Enter exit pathway...' },
                { label: 'Sample Degree', placeholder: 'Enter sample degree...' },
                { label: 'Global Recognition (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Dual Degree', placeholder: 'Enter dual degree...' },
                { label: 'Dual Specialisation', placeholder: 'Enter dual specialisation...' },
                { label: 'Total Credits', placeholder: 'Enter total credits...' },
            ],
            'program-offering': [
                { label: 'Product (Uni + Program + Specialisation + Season)', placeholder: 'Enter product...' },
                { label: 'Deadline', placeholder: 'Enter deadline...' },
                { label: 'Provisional Admission Flag', placeholder: 'Yes / No' },
                { label: 'Provisional Submission Timeline', placeholder: 'Enter timeline...' },
                { label: 'Total Credits', placeholder: 'Enter total credits...' },
            ],
            'program-specialisation': [
                { label: 'Specialisation', placeholder: 'Enter specialisation...' },
                { label: 'Description', placeholder: 'Enter description...' },
                { label: 'Category (Management, Tech etc.)', placeholder: 'Enter category...' },
                { label: 'Job Roles', placeholder: 'Enter job roles...' },
                { label: 'Icon', placeholder: 'Enter icon URL...' },
            ],
            'fee-structure': [
                { label: 'Student Category (India, International, SAARC)', placeholder: 'Enter category...' },
                { label: 'Currency', placeholder: 'Enter currency...' },
                { label: 'Value', placeholder: 'Enter value...' },
                { label: 'Payment Plan (Semester, Annual, OTP)', placeholder: 'Enter plan...' },
                { label: 'Eligible for Loan', placeholder: 'Yes / No' },
                { label: 'Fee Type (Bundled, Exam, Tuition, Application)', placeholder: 'Enter fee type...' },
            ],
            'eligibility': [
                { label: 'Student Category (India, International, SAARC)', placeholder: 'Enter category...' },
                { label: 'Min Academic Level Requirement (10+2 / Diploma / Graduation / PG)', placeholder: 'Enter level...' },
                { label: 'Minimum Score % (General / Reserved)', placeholder: 'Enter score...' },
                { label: 'Stream Inclusion & Exclusion for Min Academic Level', placeholder: 'Enter streams...' },
                { label: 'Bridge Course (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Subject Requirement for Min Acad Level', placeholder: 'Enter subjects...' },
                { label: 'Lateral Entry Allowed (Direct 2nd Year Entry)', placeholder: 'Yes / No' },
                { label: 'Re-Entry Allowed (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Re-Entry Criteria', placeholder: 'Enter criteria...' },
            ],
            'curriculum': [
                { label: 'Term Number', placeholder: 'Enter term number...' },
                { label: 'Term Label', placeholder: 'Enter term label...' },
                { label: 'Subject Name', placeholder: 'Enter subject name...' },
                { label: 'Subject Code', placeholder: 'Enter subject code...' },
                { label: 'Is Elective', placeholder: 'Yes / No' },
                { label: 'Topic Covered Json', placeholder: 'Enter topics JSON...' },
            ],
            'addon': [
                { label: 'Type (Trip, Certification, Subscription)', placeholder: 'Enter type...' },
                { label: 'Provider Name', placeholder: 'Enter provider...' },
                { label: 'Cost Inclusive (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Cost', placeholder: 'Enter cost...' },
                { label: 'Description', placeholder: 'Enter description...' },
                { label: 'Is Optional', placeholder: 'Yes / No' },
                { label: 'Thumbnail (Sample Certificate)', placeholder: 'Enter URL...' },
            ],
            'refund-policy': [
                { label: 'Eligible for Refund', placeholder: 'Yes / No' },
                { label: 'Type of Fee for Refund (Application, Exam, Bundled)', placeholder: 'Enter fee type...' },
                { label: 'Date of Cutoff for Calculation', placeholder: 'Enter date...' },
                { label: 'Refund Percentage', placeholder: 'Enter percentage...' },
                { label: 'Maximum Days from Cutoff', placeholder: 'Enter days...' },
            ],
            // ── Value & Outcomes field configs ──
            'university-faculty': [
                { label: 'Name', placeholder: 'Enter name...' },
                { label: 'Qualification', placeholder: 'Enter qualification...' },
                { label: 'Designation', placeholder: 'Enter designation...' },
                { label: 'Industry / Academic Experience', placeholder: 'Enter experience...' },
            ],
            'student-testimonials': [
                { label: 'Name', placeholder: 'Enter name...' },
                { label: 'Program', placeholder: 'Enter program...' },
                { label: 'Testimonial Text', placeholder: 'Enter testimonial...' },
                { label: 'Video', placeholder: 'Enter video URL...' },
                { label: 'Image', placeholder: 'Enter image URL...' },
            ],
            'hiring-partners': [
                { label: 'Company', placeholder: 'Enter company name...' },
                { label: 'Logo', placeholder: 'Enter logo URL...' },
                { label: 'Industry (BFSI, Auto, Software etc.)', placeholder: 'Enter industry...' },
            ],
            'placement-outcome': [
                { label: 'Highest Package', placeholder: 'Enter highest package...' },
                { label: 'Average Package', placeholder: 'Enter average package...' },
            ],
            'corporate-hiring': [
                { label: 'Direct Industry Partner (Job after Graduation)', placeholder: 'Enter partner...' },
            ],
            // ── Incentives field configs ──
            'offers-master': [
                { label: 'Borne by (University)', placeholder: 'Enter entity...' },
                { label: 'Type (Coupon / Scholarship)', placeholder: 'Enter type...' },
                { label: 'Internal Name', placeholder: 'Enter internal name...' },
                { label: 'External Name', placeholder: 'Enter external name...' },
                { label: 'Description Text', placeholder: 'Enter description...' },
                { label: 'Coupon Code', placeholder: 'Enter coupon code...' },
                { label: 'Currency Type (INR / USD)', placeholder: 'Enter currency...' },
                { label: 'Auto Apply (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Value', placeholder: 'Enter value...' },
                { label: 'GST Inclusive (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Applicable on Payment Plan (Semester, Annual, OTP)', placeholder: 'Enter plan...' },
                { label: 'Applicable for Loan Cases (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Applicable for (EMI / NoCost EMI)', placeholder: 'Enter type...' },
                { label: 'Applicable Program Offering (All / Some)', placeholder: 'All / Some' },
                { label: 'Valid From (Date + Timestamp)', placeholder: 'Enter date...' },
                { label: 'Valid To (Date + Timestamp)', placeholder: 'Enter date...' },
                { label: 'Applicable with other Coupon/Scholarship (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Eligibility Criteria (Json)', placeholder: 'Enter criteria JSON...' },
                { label: 'Eligibility Docs', placeholder: 'Enter docs...' },
                { label: 'Approval by (University)', placeholder: 'Enter approver...' },
                { label: 'Approval Timeline (in days)', placeholder: 'Enter days...' },
            ],
            'offer-ledger': [
                { label: 'Opportunity (Offering + Student Opportunity)', placeholder: 'Enter opportunity...' },
                { label: 'Applied Type (Manual, Auto)', placeholder: 'Enter type...' },
                { label: 'Status (Granted, In Process, Rejected)', placeholder: 'Enter status...' },
            ],
            // ── Legal/Admin field configs ──
            'master-agreement': [
                { label: 'Contract', placeholder: 'Enter contract...' },
                { label: 'Status', placeholder: 'Enter status...' },
                { label: 'Versioning', placeholder: 'Enter version...' },
                { label: 'Spoke Uni', placeholder: 'Enter spoke uni...' },
                { label: 'Spoke Us', placeholder: 'Enter spoke us...' },
                { label: 'Signing Authority', placeholder: 'Enter signing authority...' },
                { label: 'Signing Date', placeholder: 'Enter date...' },
                { label: 'Inacted from (Datetimestamp)', placeholder: 'Enter date...' },
                { label: 'Perpetual / End Date (Datetimestamp)', placeholder: 'Enter date...' },
            ],
            'addendums': [
                { label: 'Uni Version', placeholder: 'Enter version...' },
                { label: 'Inacted from', placeholder: 'Enter date...' },
                { label: 'Perpetual / End Date', placeholder: 'Enter date...' },
                { label: 'Status', placeholder: 'Enter status...' },
                { label: 'Signed By', placeholder: 'Enter signer...' },
                { label: 'Spoke Uni', placeholder: 'Enter spoke uni...' },
                { label: 'Spoke Us', placeholder: 'Enter spoke us...' },
                { label: 'Signing Authority', placeholder: 'Enter signing authority...' },
            ],
            // ── Commercials field configs ──
            'payout-config': [
                { label: 'Payout Model (Flat % / Flat Value)', placeholder: 'Enter model...' },
                { label: 'Value Per Program Offering', placeholder: 'Enter value...' },
                { label: 'GST Inclusive (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Subvention Sharing (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Sharing Value', placeholder: 'Enter value...' },
                { label: 'Payout Consideration Trigger (Enrolled, Admission Done etc.)', placeholder: 'Enter trigger...' },
                { label: 'Payout Cycle', placeholder: 'Enter cycle...' },
                { label: 'Cycle Criteria Json', placeholder: 'Enter criteria JSON...' },
                { label: 'Payout on Total (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Net Calculation Json (Gross - Subvention - Exam - Application)', placeholder: 'Enter calculation JSON...' },
                { label: 'Effective From (Datetimestamp)', placeholder: 'Enter date...' },
                { label: 'Perpetual / End Date', placeholder: 'Enter date...' },
                { label: 'Insert User', placeholder: 'Enter user...' },
                { label: 'Version Number', placeholder: 'Enter version...' },
                { label: 'Exclusion Cases Json', placeholder: 'Enter exclusion JSON...' },
            ],
            'slab-rates': [
                { label: 'Commitment Type (Season / Annual)', placeholder: 'Enter type...' },
                { label: 'Minimum Commitment Value', placeholder: 'Enter value...' },
                { label: 'Post Commitment Benefit (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Additional Commission Type (% / Flat / Per Lac)', placeholder: 'Enter type...' },
                { label: 'Additional Commission Value', placeholder: 'Enter value...' },
            ],
            'loan-partners': [
                { label: 'Type (EMI / No Cost EMI)', placeholder: 'Enter type...' },
                { label: 'Tenure Options', placeholder: 'Enter tenure...' },
                { label: 'Interest Rates', placeholder: 'Enter rates...' },
                { label: 'Subvention Split', placeholder: 'Enter split...' },
                { label: 'Minimum Loan Amount', placeholder: 'Enter amount...' },
                { label: 'Subvention on Gross / Net', placeholder: 'Gross / Net' },
            ],
            'university-ledger': [
                { label: 'Transaction Type (Earning / Reversal)', placeholder: 'Enter type...' },
                { label: 'Application Id (mapped to opportunity)', placeholder: 'Enter app id...' },
                { label: 'Fee Calculation Base Amount', placeholder: 'Enter amount...' },
                { label: 'Commission %', placeholder: 'Enter percentage...' },
                { label: 'GST Inclusive (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Net Payable Amount', placeholder: 'Enter amount...' },
                { label: 'Status (Raised, Cleared, Disputed)', placeholder: 'Enter status...' },
                { label: 'Raised in Invoice (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Invoice Id', placeholder: 'Enter invoice id...' },
                { label: 'Raised in Credit Note (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Credit Note Id', placeholder: 'Enter credit note id...' },
                { label: 'Insert User', placeholder: 'Enter user...' },
            ],
            'wallets': [
                { label: 'Currency (INR / USD)', placeholder: 'Enter currency...' },
                { label: 'Accrued Balance', placeholder: 'Enter balance...' },
                { label: 'Withdrawal Balance', placeholder: 'Enter balance...' },
                { label: 'Held Balance', placeholder: 'Enter balance...' },
                { label: 'Total Lifetime Earning', placeholder: 'Enter amount...' },
                { label: 'Total Withdrawal', placeholder: 'Enter amount...' },
                { label: 'Last Ledger Entry', placeholder: 'Enter date...' },
                { label: 'is_frozen', placeholder: 'Yes / No' },
            ],
            // ── Lead field configs ──
            'academic-season': [
                { label: 'Season', placeholder: 'Enter season...' },
                { label: 'Batch Code', placeholder: 'Enter batch code...' },
                { label: 'Application Open Date', placeholder: 'Enter date...' },
                { label: 'Application Close Date', placeholder: 'Enter date...' },
                { label: 'Extension Days', placeholder: 'Enter days...' },
                { label: 'Final Closure Date (UGC)', placeholder: 'Enter date...' },
            ],
            'lead-config': [
                { label: 'ERP/CRM Provider', placeholder: 'Enter provider...' },
                { label: 'Auth Token', placeholder: 'Enter token...' },
                { label: 'Secret Key', placeholder: 'Enter secret key...' },
                { label: 'Application URL', placeholder: 'Enter URL...' },
                { label: 'Lead Limits', placeholder: 'Enter limits...' },
                { label: 'Retry Logic', placeholder: 'Enter retry logic...' },
            ],
            'uni-sync-task': [
                { label: 'Opportunity Mapping', placeholder: 'Enter mapping...' },
                { label: 'Sync Mode (API / Manual)', placeholder: 'Enter mode...' },
                { label: 'Task Status (Queued, Completed, Failed, Rejected)', placeholder: 'Enter status...' },
                { label: 'Task Response (Duplicate, Success etc.)', placeholder: 'Enter response...' },
                { label: 'Assigned Ops User (Yes / No)', placeholder: 'Yes / No' },
                { label: 'Ops User Id', placeholder: 'Enter user id...' },
                { label: 'Request Payload', placeholder: 'Enter payload...' },
                { label: 'Response Payload', placeholder: 'Enter payload...' },
                { label: 'Uni Ref Id', placeholder: 'Enter ref id...' },
                { label: 'API Log', placeholder: 'Enter log...' },
                { label: 'Retry Count', placeholder: 'Enter count...' },
                { label: 'Manual Comment', placeholder: 'Enter comment...' },
            ],
        };

        const fields = fieldConfigs[cardId];
        if (!fields) return <div style={{ padding: '20px 0', color: '#66758A' }}>No fields configured.</div>;

        return (
            <>
                <div className="fields-grid-2-col">
                    {fields.map((field, idx) => (
                        <UniversityInfoField
                            key={idx}
                            label={field.label}
                            placeholder={field.placeholder}
                            sourceText={`Scraped ${field.label} for Indian In...`}
                            onUseSource={() => { }}
                        />
                    ))}
                </div>
                {['offers-master', 'offer-ledger'].includes(cardId) && (
                    <label className="same-for-all-checkbox">
                        <input type="checkbox" />
                        <span>This Information is same for all the programs</span>
                    </label>
                )}
            </>
        );
    };

    // ── Academics section cards ──
    const academicsCards = [
        { id: 'degree-master', title: 'Degree Master', fieldCount: 13, progress: 0, status: 'Offline' },
        { id: 'program-offering', title: 'Program Offering', fieldCount: 5, progress: 0, status: 'Offline' },
        { id: 'program-specialisation', title: 'Program Specialisation', fieldCount: 5, progress: 0, status: 'Offline' },
        { id: 'fee-structure', title: 'Program Offering Fee Structure', fieldCount: 6, progress: 0, status: 'Offline' },
        { id: 'eligibility', title: 'Program Offering Eligibility', fieldCount: 9, progress: 0, status: 'Offline' },
        { id: 'curriculum', title: 'Program Offering Curriculum', fieldCount: 6, progress: 0, status: 'Offline' },
        { id: 'addon', title: 'Program Offering Addon', fieldCount: 7, progress: 0, status: 'Offline' },
        { id: 'refund-policy', title: 'Program Refund Policy', fieldCount: 5, progress: 0, status: 'Offline' },
    ];

    // ── Value & Outcomes section cards ──
    const valueCards = [
        { id: 'university-faculty', title: 'University Faculty', fieldCount: 4, progress: 0, status: 'Offline' },
        { id: 'student-testimonials', title: 'Student Testimonials', fieldCount: 5, progress: 0, status: 'Offline' },
        { id: 'hiring-partners', title: 'Hiring Partners', fieldCount: 3, progress: 0, status: 'Offline' },
        { id: 'placement-outcome', title: 'Placement Outcome Metric', fieldCount: 2, progress: 0, status: 'Offline' },
        { id: 'corporate-hiring', title: 'Corporate Hiring Partner', fieldCount: 1, progress: 0, status: 'Offline' },
    ];

    // ── Incentives / Scholarships section cards ──
    const incentivesCards = [
        { id: 'offers-master', title: 'University Offers Master', fieldCount: 21, progress: 0, status: 'Offline' },
        { id: 'offer-ledger', title: 'Opportunity Offer Ledger', fieldCount: 3, progress: 0, status: 'Offline' },
    ];

    // ── Legal/Admin section cards ──
    const legalCards = [
        { id: 'master-agreement', title: 'Master Agreement', fieldCount: 9, progress: 0, status: 'Offline' },
        { id: 'addendums', title: 'Addendums', fieldCount: 8, progress: 0, status: 'Offline' },
    ];

    // ── Commercials section cards ──
    const commercialsCards = [
        { id: 'payout-config', title: 'Payout Configuration', fieldCount: 15, progress: 0, status: 'Offline' },
        { id: 'slab-rates', title: 'Slab Rates', fieldCount: 5, progress: 0, status: 'Offline' },
        { id: 'loan-partners', title: 'Loan Partners', fieldCount: 6, progress: 0, status: 'Offline' },
        { id: 'university-ledger', title: 'University Ledger', fieldCount: 12, progress: 0, status: 'Offline' },
        { id: 'wallets', title: 'Wallets', fieldCount: 8, progress: 0, status: 'Offline' },
    ];

    // ── Lead section cards ──
    const leadCards = [
        { id: 'academic-season', title: 'Academic Season', fieldCount: 6, progress: 0, status: 'Offline' },
        { id: 'lead-config', title: 'University Lead Config', fieldCount: 6, progress: 0, status: 'Offline' },
        { id: 'uni-sync-task', title: 'Uni Sync Task', fieldCount: 12, progress: 0, status: 'Offline' },
    ];

    const renderContent = () => {
        // Identity cards
        const identityCards = [
            { id: 'profile', title: 'Profile', fieldCount: 5, progress: 45, status: 'Offline' },
            { id: 'address', title: 'Address', fieldCount: 3, progress: 0, status: 'Offline' },
            { id: 'metadata', title: 'Metadata', fieldCount: 4, progress: 100, status: 'Online' },
            { id: 'ranking', title: 'Ranking', fieldCount: 7, progress: 20, status: 'Offline' },
            { id: 'accredition', title: 'Accredition', fieldCount: 8, progress: 60, status: 'Online' },
            { id: 'highlights', title: 'Highlights', fieldCount: 4, progress: 10, status: 'Offline' },
            { id: 'gallery', title: 'Gallery', fieldCount: 3, progress: 85, status: 'Online' },
            { id: 'faqs', title: "FAQ's", fieldCount: 4, progress: 0, status: 'Offline' }
        ];

        // ── Detail view when a card is selected (Identity or Academics) ──
        if (selectedCard) {
            // Resolve card data from the correct tab's card list
            const cardLists = { identity: identityCards, academics: academicsCards, value: valueCards, incentives: incentivesCards, legal: legalCards, commercials: commercialsCards, lead: leadCards };
            const allCards = cardLists[activeTab] || identityCards;
            const cardData = allCards.find(c => c.id === selectedCard) || { title: selectedCard, progress: 0 };

            const sectionNameMap = {
                identity: 'Identity',
                academics: 'Academics & Offering',
                value: 'Value & Outcomes',
                incentives: 'Incentives / Scholarships',
                legal: 'Legal/Admin',
                commercials: 'Commercials',
                lead: 'Lead',
            };
            const sectionName = sectionNameMap[activeTab] || 'Identity';

            return (
                <div className="details-section">
                    <IdentityDetailsContainer
                        title={cardData.title}
                        sectionName={sectionName}
                        progress={cardData.progress}
                        onBack={handleBackToGrid}
                        onSave={() => console.log('Save clicked')}
                    >
                        {renderCardFields(selectedCard)}
                    </IdentityDetailsContainer>
                </div>
            );
        }

        switch (activeTab) {
            case 'identity':
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <span>Identity</span>
                        </div>

                        <div className="uni-cards-grid">
                            {identityCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#930051" strokeWidth="1.5" />
                                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#930051" strokeWidth="1.5" />
                                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#930051" strokeWidth="1.5" />
                                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#930051" strokeWidth="1.5" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 'academics':
                // If no program selected, show prompt
                if (!selectedProgram) {
                    return (
                        <div className="details-section">
                            <div className="details-page-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 10L12 5L2 10L12 15L22 10ZM6 12V17C6 17.55 8.69 18 12 18C15.31 18 18 17.55 18 17M12 15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Academics & Offering</span>
                            </div>
                            <div className="academics-empty-state">
                                <div className="academics-empty-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M44 20L24 10L4 20L24 30L44 20Z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 24V34C12 34 16 38 24 38C32 38 36 34 36 34V24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>No Program Selected</h3>
                                <p>Use the sidebar to <strong>Add a New Program</strong> or select an existing one to view its academic sections.</p>
                            </div>
                        </div>
                    );
                }

                // Program selected → show card grid
                const currentProgram = programs.find(p => p.id === selectedProgram);
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M22 10L12 5L2 10L12 15L22 10ZM6 12V17C6 17.55 8.69 18 12 18C15.31 18 18 17.55 18 17M12 15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Academics & Offering</span>
                            <span className="program-name-badge">{currentProgram?.name}</span>
                        </div>

                        <div className="uni-cards-grid">
                            {academicsCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Academic section`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 10L12 5L2 10L12 15L22 10Z" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 12V17C6 17.55 8.69 18 12 18C15.31 18 18 17.55 18 17" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 'value':
                // No programs at all → tell user to create in Academics
                if (programs.length === 0) {
                    return (
                        <div className="details-section">
                            <div className="details-page-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Value & Outcomes</span>
                            </div>
                            <div className="academics-empty-state">
                                <div className="academics-empty-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 4L4 14L24 24L44 14L24 4Z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 34L24 44L44 34" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 24L24 34L44 24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>No Programs Available</h3>
                                <p>Please create a program in <strong>Academics & Offering</strong> first. Programs created there will automatically appear here.</p>
                            </div>
                        </div>
                    );
                }

                // No program selected yet
                if (!selectedProgram) {
                    return (
                        <div className="details-section">
                            <div className="details-page-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Value & Outcomes</span>
                            </div>
                            <div className="academics-empty-state">
                                <div className="academics-empty-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 4L4 14L24 24L44 14L24 4Z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 34L24 44L44 34" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Select a Program</h3>
                                <p>Use the sidebar to select a program to view its Value & Outcomes sections.</p>
                            </div>
                        </div>
                    );
                }

                // Program selected → show value cards
                const currentValueProgram = programs.find(p => p.id === selectedProgram);
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Value & Outcomes</span>
                            <span className="program-name-badge">{currentValueProgram?.name}</span>
                        </div>

                        <div className="uni-cards-grid">
                            {valueCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 17L12 22L22 17" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 12L12 17L22 12" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'incentives':
                // No programs → tell user
                if (programs.length === 0) {
                    return (
                        <div className="details-section">
                            <div className="details-page-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Incentives / Scholarships</span>
                            </div>
                            <div className="academics-empty-state">
                                <div className="academics-empty-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 30C31.732 30 38 23.732 38 16C38 8.26801 31.732 2 24 2C16.268 2 10 8.26801 10 16C10 23.732 16.268 30 24 30Z" stroke="#CBD5E1" strokeWidth="2" />
                                        <path d="M16.42 27.78L14 46L24 40L34 46L31.58 27.76" stroke="#CBD5E1" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>No Programs Available</h3>
                                <p>Please create a program in <strong>Academics & Offering</strong> first. Programs created there will automatically appear here.</p>
                            </div>
                        </div>
                    );
                }

                // No program selected
                if (!selectedProgram) {
                    return (
                        <div className="details-section">
                            <div className="details-page-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Incentives / Scholarships</span>
                            </div>
                            <div className="academics-empty-state">
                                <div className="academics-empty-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 30C31.732 30 38 23.732 38 16C38 8.26801 31.732 2 24 2C16.268 2 10 8.26801 10 16C10 23.732 16.268 30 24 30Z" stroke="#CBD5E1" strokeWidth="2" />
                                        <path d="M16.42 27.78L14 46L24 40L34 46L31.58 27.76" stroke="#CBD5E1" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3>Select a Program</h3>
                                <p>Use the sidebar to select a program to view its Incentives / Scholarships sections.</p>
                            </div>
                        </div>
                    );
                }

                // Program selected → show incentives cards + checkbox
                const currentIncentivesProgram = programs.find(p => p.id === selectedProgram);
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Incentives / Scholarships</span>
                            <span className="program-name-badge">{currentIncentivesProgram?.name}</span>
                        </div>

                        <div className="uni-cards-grid">
                            {incentivesCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#930051" strokeWidth="1.5" />
                                            <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#930051" strokeWidth="1.5" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'legal':
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 6H21M7 6V19M17 6V19M8 11H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Legal/Admin</span>
                        </div>
                        <div className="uni-cards-grid">
                            {legalCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 6H21M7 6V19M17 6V19M8 11H16" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'commercials':
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z M1 10H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Commercials</span>
                        </div>
                        <div className="uni-cards-grid">
                            {commercialsCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="#930051" strokeWidth="1.5" />
                                            <path d="M1 10H23" stroke="#930051" strokeWidth="1.5" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'lead':
                return (
                    <div className="details-section">
                        <div className="details-page-header">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Lead</span>
                        </div>
                        <div className="uni-cards-grid">
                            {leadCards.map((card) => (
                                <UniversityActionCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={`Contains ${card.fieldCount} verification fields.`}
                                    status={card.status}
                                    progress={card.progress}
                                    icon={
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#930051" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    }
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="details-placeholder">
                        <h2>Select a sub-group to view details</h2>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar onToggle={(collapsed) => setSidebarCollapsed(collapsed)} />

            <div className={`dashboard-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''} university-details-container`}>
                <div className="secondary-sidebar-wrapper">
                    <UniversitySidebar
                        university={university}
                        activeTab={activeTab}
                        onTabChange={(tab) => { setActiveTab(tab); setSelectedCard(null); }}
                        programs={programs}
                        selectedProgram={selectedProgram}
                        onProgramSelect={handleProgramSelect}
                        onAddProgram={handleAddProgram}
                    />
                </div>

                <div className="details-content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default UniversityDetails;
