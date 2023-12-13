import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MyDestination = ({ latitude, longitude, mapContainerId }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initializeMap = () => {
            if (!mapRef.current) {
                mapRef.current = L.map(mapContainerId).setView([latitude, longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
                L.marker([latitude, longitude]).addTo(mapRef.current);
            }
        };

        const delay = setTimeout(initializeMap, 500);

        return () => {
            clearTimeout(delay);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [latitude, longitude, mapContainerId]);

    return <div id={mapContainerId} style={{ height: '400px', width:'100%' }} />;
};

export default MyDestination;
