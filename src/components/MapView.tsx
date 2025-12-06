import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { LightDisplay, UserLocation } from "../types";

interface MapViewProps {
  displays: LightDisplay[];
  selectedDisplays: number[];
  onDisplaySelect: (id: number) => void;
  userLocation: UserLocation | null;
  locationError: string | null;
}

// Map container styling - fills parent container
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Center of Dunwoody, GA - default map center
const center = {
  lat: 33.9321,
  lng: -84.3345,
};

// Google Maps configuration options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: true,
  fullscreenControl: true,
};

const MapView: React.FC<MapViewProps> = ({
  displays,
  selectedDisplays,
  onDisplaySelect,
  userLocation,
  locationError,
}) => {
  // Track which marker's info window is currently open
  const [selectedMarker, setSelectedMarker] = useState<LightDisplay | null>(
    null,
  );

  // Track map instance to update center when user location is available
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Center map on user location when available
  useEffect(() => {
    if (map && userLocation) {
      map.panTo({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [map, userLocation]);

  // Handle clicking on a map marker
  const handleMarkerClick = useCallback((display: LightDisplay) => {
    setSelectedMarker(display);
  }, []);

  // Handle closing the info window
  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Check if a display is selected for the route
  const isSelected = (id: number) => selectedDisplays.includes(id);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || center}
        zoom={13}
        options={mapOptions}
        onLoad={(map) => setMap(map)}
      >
        {/* User location marker - blue dot like native Google Maps */}
        {userLocation && (
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
            title="Your Location"
          />
        )}
        {/* Render markers for all light displays */}
        {displays.map((display) => (
          <Marker
            key={display.id}
            position={{ lat: display.lat, lng: display.lng }}
            onClick={() => handleMarkerClick(display)}
            icon={{
              // Green markers for selected displays, red for unselected
              url: isSelected(display.id)
                ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
            // Bounce animation for selected markers
            animation={
              isSelected(display.id)
                ? window.google.maps.Animation.BOUNCE
                : undefined
            }
          />
        ))}

        {/* Info window popup when a marker is clicked */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg mb-1">{selectedMarker.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedMarker.address}
              </p>
              {selectedMarker.description && (
                <p className="text-sm mb-2">{selectedMarker.description}</p>
              )}
              {selectedMarker.rating && (
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">
                    {"⭐".repeat(selectedMarker.rating)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedMarker.rating}/5)
                  </span>
                </div>
              )}
              {selectedMarker.features &&
                selectedMarker.features.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {selectedMarker.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-holiday-green text-white px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              <button
                onClick={() => onDisplaySelect(selectedMarker.id)}
                className={`w-full py-2 px-4 rounded font-semibold text-sm ${
                  isSelected(selectedMarker.id)
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-holiday-green hover:bg-green-700 text-white"
                }`}
              >
                {isSelected(selectedMarker.id)
                  ? "Remove from Route"
                  : "Add to Route"}
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
