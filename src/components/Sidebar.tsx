import React, { useState } from "react";
import { LightDisplay, UserLocation } from "../types";

interface SidebarProps {
  displays: LightDisplay[];
  allDisplays: LightDisplay[];
  selectedDisplays: number[];
  onDisplaySelect: (id: number) => void;
  onCreateRoute: () => void;
  onClearRoute: () => void;
  userLocation: UserLocation | null;
  locationError: string | null;
  allFeatures: string[];
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  onClearFilters: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  displays,
  allDisplays,
  selectedDisplays,
  onDisplaySelect,
  onCreateRoute,
  onClearRoute,
  userLocation,
  locationError,
  allFeatures,
  selectedFeatures,
  onFeatureToggle,
  onClearFilters,
}) => {
  const isSelected = (id: number) => selectedDisplays.includes(id);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-holiday-red to-holiday-green text-white">
        <h1 className="text-3xl font-bold mb-2">🎄 Dunwoody Lights</h1>
        <p className="text-sm opacity-90">Holiday Light Display Guide</p>
      </div>

      {/* Location Status */}
      <div className="px-4 pt-4 pb-2 bg-blue-50 border-b border-blue-200">
        {userLocation ? (
          <div className="flex items-center text-sm text-blue-700">
            <span className="mr-2">📍</span>
            <span className="font-medium">Your location detected</span>
          </div>
        ) : locationError ? (
          <div className="text-xs text-gray-600">
            <span className="mr-1">⚠️</span>
            Location unavailable - routes will start from first display
          </div>
        ) : (
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">🔄</span>
            <span>Getting your location...</span>
          </div>
        )}
      </div>

      {/* Route Controls */}
      {selectedDisplays.length > 0 && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">
              {selectedDisplays.length} display
              {selectedDisplays.length !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCreateRoute}
              disabled={selectedDisplays.length < 1}
              className={`flex-1 py-2 px-4 rounded font-semibold text-sm transition-colors ${
                selectedDisplays.length >= 1
                  ? "bg-holiday-green hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              🗺️ Open in Google Maps
            </button>
            <button
              onClick={onClearRoute}
              className="py-2 px-4 rounded font-semibold text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
          {selectedDisplays.length < 1 && (
            <p className="text-xs text-gray-500 mt-2">
              Select at least 1 display to create a route
              {userLocation && " (starting from your location)"}
            </p>
          )}
          {selectedDisplays.length >= 1 && userLocation && (
            <p className="text-xs text-green-600 mt-2">
              ✓ Route will start from your current location
            </p>
          )}
        </div>
      )}

      {/* Feature Filter */}
      <div className="bg-white border-b border-gray-200">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              🔍 Filter by Features
            </span>
            {selectedFeatures.length > 0 && (
              <span className="bg-holiday-green text-white text-xs px-2 py-0.5 rounded-full">
                {selectedFeatures.length}
              </span>
            )}
          </div>
          <span className="text-gray-500 text-lg font-bold">
            {isFilterExpanded ? "−" : "+"}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isFilterExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              {selectedFeatures.length > 0 && (
                <button
                  onClick={onClearFilters}
                  className="text-xs text-holiday-red hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allFeatures.map((feature) => {
                const isSelected = selectedFeatures.includes(feature);
                return (
                  <button
                    key={feature}
                    onClick={() => onFeatureToggle(feature)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-holiday-green text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {isSelected && "✓ "}
                    {feature}
                  </button>
                );
              })}
            </div>
            {selectedFeatures.length > 0 && (
              <p className="text-xs text-gray-600 mt-3">
                Showing displays with{" "}
                {selectedFeatures.length === 1
                  ? "this feature"
                  : "any of the selected features"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Display List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">
            {selectedFeatures.length > 0
              ? `Filtered Displays (${displays.length} of ${allDisplays.length})`
              : `All Displays (${displays.length})`}
          </h2>
          <div className="space-y-3">
            {displays.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No displays match your filters</p>
                <button
                  onClick={onClearFilters}
                  className="text-holiday-green hover:underline text-sm"
                >
                  Clear filters to see all displays
                </button>
              </div>
            ) : (
              displays.map((display) => (
                <div
                  key={display.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected(display.id)
                      ? "border-holiday-green bg-green-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow"
                  }`}
                  onClick={() => onDisplaySelect(display.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 flex-1 pr-2">
                      {display.name}
                    </h3>
                    {isSelected(display.id) && (
                      <span className="text-holiday-green font-bold text-xl">
                        ✓
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    📍 {display.address}
                  </p>

                  {display.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500 text-sm">
                        {"⭐".repeat(display.rating)}
                      </span>
                    </div>
                  )}

                  {display.description && (
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {display.description}
                    </p>
                  )}

                  {display.features && display.features.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {display.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-600">
          🎅 Happy Holidays from Dunwoody! 🎄
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
