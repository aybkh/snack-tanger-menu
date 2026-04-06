import React, { useState, useEffect } from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { useLanguage } from '../../context/LanguageContext';

const HoursCard = () => {
    const { siteConfig } = useSiteConfig();
    const { t } = useLanguage();
    const schedule = siteConfig?.schedule || [];
    const [status, setStatus] = useState({ isOpen: false, text: t('hours_loading'), color: '#666' });
    const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

    useEffect(() => {
        if (schedule.length === 0) return;
        
        const checkStatus = () => {
            const now = new Date();
            const hour = now.getHours() + (now.getMinutes() / 60);
            const today = schedule[todayIndex];

            if (!today) return;

            if (today.closed) {
                setStatus({ isOpen: false, text: t('closed_today'), color: '#8B0000' });
            } else {
                if (hour >= today.open && hour < today.close) {
                    setStatus({ isOpen: true, text: t('open_now'), color: '#06C167' });
                } else if (hour < today.open) {
                    setStatus({ isOpen: false, text: `${t('opens_at')} ${today.open}:00`, color: '#F1C40F' });
                } else {
                    setStatus({ isOpen: false, text: t('closed'), color: '#8B0000' });
                }
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, [todayIndex, schedule, t]);

    if (schedule.length === 0) {
        return (
            <div className="hours-container">
                <div className="hours-card skeleton">
                    <div className="hours-status-box"></div>
                    {[...Array(7)].map((_, i) => <div key={i} className="hours-row-skeleton"></div>)}
                </div>
            </div>
        );
    }

    return (
        <div className="hours-container">
            <div className="hours-card">
                {/* Status Indicator (Inside Card, Top) */}
                <div className="hours-status-box">
                    <div className="hours-status-badge">
                        <span className="hours-status-dot" style={{ background: status.color, boxShadow: `0 0 8px ${status.color}` }}></span>
                        <span className="hours-status-text">{status.text}</span>
                    </div>
                </div>

                {/* Grid Rows */}
                <div className="hours-grid">
                    {schedule.map((day, idx) => {
                        const isToday = idx === todayIndex;
                        const isClosed = day.closed;

                        return (
                            <div key={idx} className={`hours-row ${isToday ? 'today' : ''} ${isClosed ? 'closed' : ''}`}>
                                <div className="day-name-wrapper">
                                    {isToday && <span className="today-dot">●</span>}
                                    <span className="day-name">{t(`day_${idx}`)}</span>
                                </div>
                                <span className="day-time">
                                    {isClosed ? t('closed') : (day.label || `${day.open} - ${day.close}`)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HoursCard;
