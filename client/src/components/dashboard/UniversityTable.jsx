import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

const UniversityTable = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="table-wrapper">
            {/* Table Header */}
            <div className="table-header">
                <div className="table-col col-name">UNIVERSITY NAME</div>
                <div className="table-col col-id">UNIVERSITY ID</div>
                <div className="table-col col-location">LOCATION</div>
                <div className="table-col col-status">STATUS</div>
                <div className="table-col col-progress">PROGRESS</div>
            </div>

            {/* Table Rows */}
            {data.map((uni, index) => (
                <div
                    className={`table-row ${index % 2 === 0 ? 'row-light' : 'row-white'}`}
                    key={uni.id || index}
                    onClick={() => navigate(`/dashboard/university/${uni.id}`, { state: { universityData: uni } })}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="table-col col-name">
                        <div className="uni-avatar">
                            <span>{uni.name.charAt(0)}</span>
                        </div>
                        <span className="uni-name">{uni.name}</span>
                    </div>
                    <div className="table-col col-id">
                        <span className="uni-id">{uni.id}</span>
                    </div>
                    <div className="table-col col-location">
                        <span className="uni-location">{uni.location}</span>
                    </div>
                    <div className="table-col col-status">
                        <StatusBadge status={uni.status} />
                    </div>
                    <div className="table-col col-progress">
                        <ProgressBar percent={uni.progress} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UniversityTable;
