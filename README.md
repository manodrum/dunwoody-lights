# 🎄 Dunwoody Holiday Lights Guide

A React TypeScript web application that helps users discover and navigate the best holiday light displays in Dunwoody, Georgia. Users can browse displays on an interactive map, select their favorites, and generate a custom route to view them all in Google Maps.

## Features

- 📍 Interactive Google Maps integration with custom markers
- 🧭 Automatic detection of your current location with blue marker
- 🚗 Routes start from your current location for easy navigation
- 🎅 Browse 10+ curated holiday light displays in Dunwoody
- ⭐ View ratings, descriptions, and special features for each display
- ✅ Select multiple displays to create a custom route
- 🗺️ Generate and open routes directly in Google Maps for navigation
- 📱 Responsive design that works on desktop and mobile
- 🎨 Beautiful UI with Tailwind CSS and holiday-themed colors

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Maps API** - Map display and markers
- **@react-google-maps/api** - React integration for Google Maps

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API Key

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Directions API (optional, for route optimization)
4. Create credentials (API Key)
5. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
6. Add your API key to `.env`:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### 3. Run the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. **Allow Location Access**: When prompted, allow the app to access your location for personalized routes
2. **Browse Displays**: View all holiday light displays in the sidebar and on the map
3. **Click Markers**: Click on map markers to see details about each display
   - Blue marker = Your current location
   - Red markers = Unselected displays
   - Green markers = Selected displays (with bounce animation)
4. **Select Displays**: Click on displays in the sidebar or use the "Add to Route" button in map info windows
5. **Create Route**: Once you've selected 1 or more displays, click "Open in Google Maps" to generate a navigation route
6. **Navigate**: The route will open in Google Maps starting from your current location with turn-by-turn navigation

## Project Structure

```
dunwoody-lights/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MapView.tsx      # Google Maps component with markers
│   │   └── Sidebar.tsx       # Display list and route controls
│   ├── data/
│   │   └── lights.json       # Light display data
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Main application component
│   ├── index.tsx             # Application entry point
│   └── index.css             # Global styles with Tailwind
├── .env.example              # Environment variable template
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies
```

## Customizing Display Data

Edit `src/data/lights.json` to add, remove, or modify light displays:

```json
{
  "id": 1,
  "name": "Display Name",
  "address": "123 Main St, Dunwoody, GA 30338",
  "lat": 33.9321,
  "lng": -84.3345,
  "description": "Amazing display description",
  "rating": 5,
  "features": ["Synchronized Music", "Inflatables"]
}
```

### Getting Coordinates

To find latitude and longitude for new addresses:
1. Open [Google Maps](https://maps.google.com)
2. Search for the address
3. Right-click on the location
4. Click on the coordinates to copy them

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Available Scripts

### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation!** Ejects from Create React App for full configuration control.

## Contributing

To add new displays:
1. Update `src/data/lights.json` with the new display information
2. Ensure you have accurate coordinates
3. Test that the marker appears correctly on the map

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Holiday light display data is community-contributed
- Built with Create React App
- Map data from Google Maps
- Icons and emojis for festive UI elements

---

🎅 Happy Holidays! Enjoy the lights! 🎄
