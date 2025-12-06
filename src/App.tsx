import React, { useState, useCallback } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import { LightDisplay } from "./types";
import lightsData from "./data/lights.json";

const App: React.FC = () => {
  const [displays] = useState<LightDisplay[]>(lightsData as LightDisplay[]);
  const [selectedDisplays, setSelectedDisplays] = useState<number[]>([]);

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
    if (selectedDisplays.length < 2) {
      alert("Please select at least 2 displays to create a route");
      return;
    }

    // Get the selected display objects
    const selectedDisplayObjects = displays.filter((display) =>
      selectedDisplays.includes(display.id),
    );

    // Create waypoints for Google Maps URL
    const origin = selectedDisplayObjects[0];
    const destination =
      selectedDisplayObjects[selectedDisplayObjects.length - 1];
    const waypoints = selectedDisplayObjects
      .slice(1, -1)
      .map((display) => `${display.lat},${display.lng}`)
      .join("|");

    // Build Google Maps directions URL
    let mapsUrl = `https://www.google.com/maps/dir/?api=1`;
    mapsUrl += `&origin=${origin.lat},${origin.lng}`;
    mapsUrl += `&destination=${destination.lat},${destination.lng}`;

    if (waypoints) {
      mapsUrl += `&waypoints=${waypoints}`;
    }

    mapsUrl += `&travelmode=driving`;

    // Open in new tab
    window.open(mapsUrl, "_blank");
  }, [displays, selectedDisplays]);

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
        />
      </div>

      {/* Map */}
      <div className="flex-1 h-1/2 md:h-full">
        <MapView
          displays={displays}
          selectedDisplays={selectedDisplays}
          onDisplaySelect={handleDisplaySelect}
        />
      </div>
    </div>
  );
};

export default App;
