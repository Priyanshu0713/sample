import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [clock, setClock] = useState(new Date());
    const [clockInterval, setClockInterval] = useState(null);

    const startClock = () => {
        if (clockInterval) {
            clearInterval(clockInterval);
        }
        const interval = setInterval(() => {
            setClock(new Date(clock.getTime() + 1000));
        }, 1000);
        setClockInterval(interval);
    };

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone')
            .then((response) => response.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const apiUrl = `http://worldtimeapi.org/api/timezone/${selectedCountry}`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    setClock(new Date(data.utc_datetime));
                    startClock();
                });
        }
    }, [selectedCountry]);

    const toggleClock = () => {
        if (clockInterval) {
            clearInterval(clockInterval);
            setClockInterval(null);
        } else {
            startClock();
        }
    };

    return (
        <div className="profile-page">
            <div className="upper-segment">
                <h1>Profile Page</h1>
                <div className="country-selector">
                    <select onChange={(e) => setSelectedCountry(e.target.value)}>
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <button onClick={toggleClock}>
                        {clockInterval ? 'Pause' : 'Start'}
                    </button>
                </div>
                <div className="clock">{clock.toLocaleTimeString()}</div>
            </div>

            <div className="user-info-section">
            </div>

            <div className="posts-section">
            </div>
        </div>
    );
};

export default ProfilePage;
