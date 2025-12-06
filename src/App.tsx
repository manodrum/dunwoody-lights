import React, { useState, useCallback, useEffect } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import { LightDisplay, UserLocation } from "./types";
import lightsData from "./data/lights.json";

const App: React.FC = () => {
  const [displays] = useState<LightDisplay[]>(lightsData as LightDisplay[]);
  const [selectedDisplays, setSelectedDisplays] = useState<number[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  const handleDisplaySelect = useCallback((id: number) => {
    setSelectedDisplays((prev) => {
      if (prev.includes(id)) {
        return prev.filter((displayId) => displayId !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const handleCreateRoute = useCallback(() => {
    if (selectedDisplays.length < 1) {
      alert("Please select at least 1 display to create a route");
      return;
    }

    // Get the selected display objects
    const selectedDisplayObjects = displays.filter((display) =>
      selectedDisplays.includes(display.id),
    );

    // Build Google Maps directions URL
    let mapsUrl = `https://www.google.com/maps/dir/?api=1`;

    // Use user's location as origin if available, otherwise use first selected display
    if (userLocation) {
      mapsUrl += `&origin=${userLocation.lat},${userLocation.lng}`;

      // All selected displays become waypoints/destination
      const destination =
        selectedDisplayObjects[selectedDisplayObjects.length - 1];
      mapsUrl += `&destination=${destination.lat},${destination.lng}`;

      if (selectedDisplayObjects.length > 1) {
        const waypoints = selectedDisplayObjects
          .slice(0, -1)
          .map((display) => `${display.lat},${display.lng}`)
          .join("|");
        mapsUrl += `&waypoints=${waypoints}`;
      }
    } else {
      // Fallback: use first selected display as origin if no user location
      const origin = selectedDisplayObjects[0];
      const destination =
        selectedDisplayObjects[selectedDisplayObjects.length - 1];

      mapsUrl += `&origin=${origin.lat},${origin.lng}`;
      mapsUrl += `&destination=${destination.lat},${destination.lng}`;

      if (selectedDisplayObjects.length > 2) {
        const waypoints = selectedDisplayObjects
          .slice(1, -1)
          .map((display) => `${display.lat},${display.lng}`)
          .join("|");
        mapsUrl += `&waypoints=${waypoints}`;
      }
    }

    mapsUrl += `&travelmode=driving`;

    // Open in new tab
    window.open(mapsUrl, "_blank");
  }, [displays, selectedDisplays, userLocation]);

  const handleClearRoute = useCallback(() => {
    setSelectedDisplays([]);
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-96 h-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-gray-300">
        <Sidebar
          displays={displays}
          selectedDisplays={selectedDisplays}
          onDisplaySelect={handleDisplaySelect}
          onCreateRoute={handleCreateRoute}
          onClearRoute={handleClearRoute}
          userLocation={userLocation}
          locationError={locationError}
        />
      </div>

      {/* Map */}
      <div className="flex-1 h-1/2 md:h-full">
        <MapView
          displays={displays}
          selectedDisplays={selectedDisplays}
          onDisplaySelect={handleDisplaySelect}
          userLocation={userLocation}
          locationError={locationError}
        />
      </div>
    </div>
  );
};

export default App;
