import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';
import './Dashboard.css';

import StatsCard from '../components/dashboard/StatsCard';
import SearchBar from '../components/dashboard/SearchBar';
import UniversityTable from '../components/dashboard/UniversityTable';
import Pagination from '../components/dashboard/Pagination';

// Dummy data
const DUMMY_DATA = [
    { name: 'Indian Institute of Science', id: 'IISC8F2Q', location: 'Bengaluru, Karnataka', status: 'IN PROGRESS', progress: 45 },
    { name: 'Jawaharlal Nehru University (JNU)', id: 'JNU4M9X', location: 'New Delhi, Delhi', status: 'DRAFT', progress: 70 },
    { name: 'BITS Pilani', id: 'BITS7QK2', location: 'Pilani, Rajasthan', status: 'LIVE', progress: 100 },
    { name: 'University of Delhi', id: 'DU9F3A7', location: 'Delhi, Delhi', status: 'IN PROGRESS', progress: 60 },
    { name: 'IIT Bombay', id: 'IITB5X9M', location: 'Mumbai, Maharashtra', status: 'LIVE', progress: 100 },
    { name: 'IIT Delhi', id: 'IITD2Q7K', location: 'New Delhi, Delhi', status: 'DRAFT', progress: 25 },
    { name: 'Vellore Institute of Technology', id: 'VIT8M4Q', location: 'Vellore, Tamil Nadu', status: 'IN PROGRESS', progress: 72 },
    { name: 'Manipal Academy of Higher Education', id: 'MAHE6X9P', location: 'Manipal, Karnataka', status: 'LIVE', progress: 100 },
];

const ITEMS_PER_PAGE = 8;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const UniversityRepositories = () => {
    const navigate = useNavigate();
    const [universityData, setUniversityData] = useState(DUMMY_DATA);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Fetch data from API
    React.useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/universities/all`);
            if (response.ok) {
                const data = await response.json();
                // Merge real data with dummy data (Real data first)
                setUniversityData([...data, ...DUMMY_DATA]);
            } else {
                console.error('Failed to fetch universities');
                // Keep dummy data if fetch fails
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
            // Keep dummy data if fetch error
        } finally {
            setLoading(false);
        }
    };

    // Filter data based on search
    const filteredData = universityData.filter((uni) => {
        const q = searchQuery.toLowerCase();
        return (
            uni.name.toLowerCase().includes(q) ||
            (uni.location && uni.location.toLowerCase().includes(q))
        );
    });

    const totalResults = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar onToggle={(collapsed) => setSidebarCollapsed(collapsed)} />
            <div className={`dashboard-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="dashboard-main">
                    {/* Header */}
                    <div className="dashboard-header">
                        <div className="dashboard-header-left">
                            <span className="dashboard-subtitle">Manage university verifications</span>
                            <h1 className="dashboard-title">University Repositories</h1>
                        </div>
                        <div className="stats-row">
                            <StatsCard label="Total Universities" value="142" />
                            <StatsCard label="Pending Verification" value="28" />
                            <StatsCard label="Live on CRM" value="86" />
                            <StatsCard label="In Draft" value="28" />
                        </div>
                    </div>

                    {/* Queue Section */}
                    <div className="queue-container">
                        <div className="queue-header">
                            <div className="queue-title-section">
                                <svg className="queue-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="4" width="3" height="7" fill="#930051" />
                                    <rect x="10.5" y="4" width="3" height="7" fill="#930051" />
                                    <rect x="2" y="17" width="20" height="3" fill="#930051" />
                                    <rect x="19" y="4" width="3" height="7" fill="#930051" />
                                    <rect x="2" y="2" width="20" height="3" fill="#930051" />
                                </svg>
                                <span className="queue-title">University Queue</span>
                            </div>
                            <div className="queue-header-right">
                                <SearchBar value={searchQuery} onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} />
                                <button
                                    className="add-university-btn"
                                    onClick={() => navigate('/dashboard/add-university')}
                                >
                                    + Add New University
                                </button>
                            </div>
                        </div>

                        <UniversityTable data={paginatedData} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages > 10 ? 10 : totalPages}
                            totalResults={16}
                            perPage={ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityRepositories;
