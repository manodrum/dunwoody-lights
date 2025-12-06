import React from 'react';
import { LightDisplay } from '../types';

interface SidebarProps {
  displays: LightDisplay[];
  selectedDisplays: number[];
  onDisplaySelect: (id: number) => void;
  onCreateRoute: () => void;
  onClearRoute: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  displays,
  selectedDisplays,
  onDisplaySelect,
  onCreateRoute,
  onClearRoute,
}) => {
  const isSelected = (id: number) => selectedDisplays.includes(id);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-holiday-red to-holiday-green text-white">
        <h1 className="text-3xl font-bold mb-2">🎄 Dunwoody Lights</h1>
        <p className="text-sm opacity-90">
          Holiday Light Display Guide
        </p>
      </div>

      {/* Route Controls */}
      {selectedDisplays.length > 0 && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="mb-2">
            <span className="font-semibold text-gray-700">
              {selectedDisplays.length} display{selectedDisplays.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCreateRoute}
              disabled={selectedDisplays.length < 2}
              className={`flex-1 py-2 px-4 rounded font-semibold text-sm transition-colors ${
                selectedDisplays.length >= 2
                  ? 'bg-holiday-green hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
          {selectedDisplays.length < 2 && (
            <p className="text-xs text-gray-500 mt-2">
              Select at least 2 displays to create a route
            </p>
          )}
        </div>
      )}

      {/* Display List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-bold mb-3 text-gray-800">
            All Displays ({displays.length})
          </h2>
          <div className="space-y-3">
            {displays.map((display) => (
              <div
                key={display.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected(display.id)
                    ? 'border-holiday-green bg-green-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
                }`}
                onClick={() => onDisplaySelect(display.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1 pr-2">
                    {display.name}
                  </h3>
                  {isSelected(display.id) && (
                    <span className="text-holiday-green font-bold text-xl">✓</span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  📍 {display.address}
                </p>

                {display.rating && (
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 text-sm">
                      {'⭐'.repeat(display.rating)}
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
            ))}
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
