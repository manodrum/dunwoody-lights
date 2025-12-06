# 🎄 Dunwoody Lights - Testing Checklist

## Quick Test Guide

Use this checklist to verify all features are working correctly after setup or changes.

## Prerequisites

- [ ] Node.js installed (v16+)
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with valid Google Maps API key
- [ ] Development server running (`npm start`)

## Feature Testing

### 1. Initial Load ✅

**Expected Behavior:**
- [ ] App loads without errors at http://localhost:3000
- [ ] Browser prompts for location permission
- [ ] Map renders correctly (centered on Dunwoody)
- [ ] Sidebar displays with header "🎄 Dunwoody Lights"
- [ ] 10 displays visible in sidebar list
- [ ] No TypeScript errors in browser console

**Test Steps:**
1. Open http://localhost:3000 in browser
2. Check browser console (F12) for errors
3. Verify all UI elements render

---

### 2. Geolocation - Permission Granted 📍

**Expected Behavior:**
- [ ] Browser shows location permission prompt
- [ ] Blue marker appears on map at user's location
- [ ] Map pans to center on user's location
- [ ] Sidebar shows "📍 Your location detected"
- [ ] Location status banner is blue/green color

**Test Steps:**
1. Clear site data/permissions
2. Refresh page
3. Click "Allow" on location prompt
4. Wait 1-5 seconds for location to load
5. Verify blue marker appears
6. Check sidebar status message

**Troubleshooting:**
- If no prompt appears, check browser privacy settings
- If location is inaccurate, try enabling high accuracy in device settings
- Some browsers require HTTPS for geolocation (except localhost)

---

### 3. Geolocation - Permission Denied ⚠️

**Expected Behavior:**
- [ ] No blue marker appears on map
- [ ] Map shows default Dunwoody center
- [ ] Sidebar shows warning: "⚠️ Location unavailable - routes will start from first display"
- [ ] App remains functional
- [ ] Can still select displays and create routes

**Test Steps:**
1. Clear site permissions
2. Refresh page
3. Click "Block" on location prompt
4. Verify warning message appears
5. Test that route creation still works

---

### 4. Map Display 🗺️

**Expected Behavior:**
- [ ] Map loads with Google Maps branding
- [ ] Zoom controls visible
- [ ] Street view icon (pegman) visible
- [ ] 10 red markers appear for all displays
- [ ] Blue marker appears if location granted
- [ ] Map is centered appropriately

**Test Steps:**
1. Verify all markers are visible
2. Use zoom controls (+/-)
3. Try pan/drag on map
4. Click street view icon

**Marker Colors:**
- [ ] Blue = User location (if available)
- [ ] Red = Unselected displays
- [ ] Green = Selected displays (after clicking)

---

### 5. Info Windows 💬

**Expected Behavior:**
- [ ] Clicking a red marker opens info window
- [ ] Info window shows: name, address, description, rating, features
- [ ] "Add to Route" button appears
- [ ] Clicking button adds display to route
- [ ] Button changes to "Remove from Route"
- [ ] Marker turns green and bounces
- [ ] Clicking X closes info window

**Test Steps:**
1. Click any red marker
2. Verify all info displays correctly
3. Click "Add to Route"
4. Verify marker turns green and bounces
5. Click marker again
6. Verify "Remove from Route" button
7. Click to remove
8. Verify marker turns back to red

---

### 6. Sidebar Display List 📋

**Expected Behavior:**
- [ ] All 10 displays listed with cards
- [ ] Each card shows: name, address, rating, description, features
- [ ] Cards have hover effect
- [ ] Clicking card selects/deselects display
- [ ] Selected cards have green background and checkmark
- [ ] Scrolling works smoothly

**Test Steps:**
1. Hover over each card
2. Click a card to select
3. Verify green background and checkmark appear
4. Verify corresponding map marker turns green
5. Click again to deselect
6. Verify card returns to white background
7. Scroll through entire list

---

### 7. Display Selection ✅

**Expected Behavior:**
- [ ] Selecting in sidebar updates map marker
- [ ] Selecting on map updates sidebar card
- [ ] Both stay in sync
- [ ] Selection counter updates: "X displays selected"
- [ ] Multiple selections allowed
- [ ] Can select/deselect in any order

**Test Steps:**
1. Select 3 displays from sidebar
2. Verify all 3 turn green on map
3. Select 2 more from map
4. Verify all 5 cards are green in sidebar
5. Verify counter shows "5 displays selected"
6. Deselect 1 from sidebar
7. Verify marker turns red on map
8. Verify counter shows "4 displays selected"

---

### 8. Route Creation - With User Location 🚗

**Expected Behavior:**
- [ ] Blue marker visible (location detected)
- [ ] Selecting 1+ displays enables "Open in Google Maps" button
- [ ] Button turns from gray to green
- [ ] Status shows: "✓ Route will start from your current location"
- [ ] Clicking button opens new tab
- [ ] Google Maps loads with route
- [ ] Route starts from user's location
- [ ] All selected displays included as waypoints
- [ ] Last display is destination

**Test Steps:**
1. Ensure location is detected (blue marker visible)
2. Select 1 display
3. Verify button is green/enabled
4. Verify status message about starting from location
5. Click "Open in Google Maps"
6. Verify new tab opens
7. In Google Maps, verify:
   - Origin = "Your location" or coordinates
   - All selected displays are waypoints
   - Last display is destination
   - Route is set to driving mode

---

### 9. Route Creation - Without User Location 📍

**Expected Behavior:**
- [ ] No blue marker (location denied/unavailable)
- [ ] Selecting 1+ displays enables button
- [ ] Clicking button opens Google Maps
- [ ] Route starts from first selected display
- [ ] Other displays are waypoints
- [ ] Last display is destination

**Test Steps:**
1. Block location permission
2. Refresh page
3. Select 3 displays
4. Click "Open in Google Maps"
5. Verify route starts from first selected display
6. Verify other displays are included

---

### 10. Route Control Panel 🎛️

**Expected Behavior:**
- [ ] Panel only appears when displays are selected
- [ ] Shows accurate selection count
- [ ] "Open in Google Maps" button:
  - Gray when 0 displays selected
  - Green when 1+ displays selected
  - Shows "🗺️ Open in Google Maps" text
- [ ] "Clear" button:
  - Always enabled
  - Gray background
  - Removes all selections
- [ ] Helper text updates based on selections and location

**Test Steps:**
1. With 0 selections, verify no panel or disabled button
2. Select 1 display
3. Verify panel appears
4. Verify button turns green
5. Select 2 more displays
6. Verify counter updates to "3 displays selected"
7. Click "Clear"
8. Verify all selections removed
9. Verify panel disappears or button grays out

---

### 11. Responsive Design 📱

**Desktop (> 768px):**
- [ ] Sidebar fixed width on left (384px)
- [ ] Map fills remaining space on right
- [ ] Sidebar is full height
- [ ] No horizontal scrolling

**Mobile (< 768px):**
- [ ] Sidebar stacks on top (50% height)
- [ ] Map on bottom (50% height)
- [ ] Both sections scrollable
- [ ] Touch-friendly tap targets
- [ ] Text readable without zooming

**Test Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test iPhone SE (375px)
4. Test iPad (768px)
5. Test Desktop (1920px)
6. Verify layout adapts correctly
7. Test touch interactions on mobile view

---

### 12. Browser Compatibility 🌐

Test in multiple browsers:

**Chrome/Edge:**
- [ ] Location prompt appears
- [ ] All features work
- [ ] No console errors

**Firefox:**
- [ ] Location prompt appears
- [ ] All features work
- [ ] No console errors

**Safari:**
- [ ] Location prompt appears
- [ ] All features work
- [ ] No console errors

---

### 13. Performance ⚡

**Expected Behavior:**
- [ ] Initial load < 3 seconds
- [ ] Map renders smoothly
- [ ] No lag when selecting displays
- [ ] Smooth animations (marker bounce)
- [ ] Scrolling is smooth
- [ ] No memory leaks (check DevTools Performance tab)

**Test Steps:**
1. Open DevTools → Network tab
2. Refresh page with cache disabled
3. Verify total load time
4. Check bundle sizes
5. Open Performance tab
6. Record while interacting
7. Check for layout shifts or janky animations

---

### 14. Data Validation 📊

**Verify lights.json data:**
- [ ] All 10 displays have valid IDs (1-10)
- [ ] All have names
- [ ] All have addresses in Dunwoody, GA
- [ ] All have valid coordinates (lat/lng)
- [ ] Coordinates are in Dunwoody area (~33.93, -84.33)
- [ ] All have descriptions
- [ ] All have ratings (1-5)
- [ ] All have features arrays

**Test Steps:**
1. Open `src/data/lights.json`
2. Verify structure matches schema
3. Copy a coordinate pair
4. Paste into Google Maps
5. Verify it's in Dunwoody, GA

---

### 15. Edge Cases 🔍

**Empty Selections:**
- [ ] No displays selected → button disabled/gray
- [ ] Clear button works with 0 selections

**Single Selection:**
- [ ] Works with user location (route: location → display)
- [ ] Works without location (route: display → display)

**Maximum Selections:**
- [ ] Can select all 10 displays
- [ ] Route includes all 10
- [ ] Google Maps handles 10 waypoints

**Rapid Clicking:**
- [ ] Selecting/deselecting rapidly doesn't break state
- [ ] UI stays in sync
- [ ] No duplicate selections

**Network Issues:**
- [ ] Google Maps fails gracefully if API key invalid
- [ ] Error messages are clear
- [ ] App doesn't crash

---

## TypeScript & Build Testing

### Type Checking
```bash
npm run build
```
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Bundle size is reasonable (~94 KB gzipped)

### Linting (if configured)
```bash
npm run lint
```
- [ ] No ESLint errors
- [ ] Code follows style guidelines

### Tests (if configured)
```bash
npm test
```
- [ ] All tests pass
- [ ] No failing assertions

---

## Security Testing 🔒

**Environment Variables:**
- [ ] `.env` file is gitignored
- [ ] `.env.example` exists with placeholder
- [ ] API key not exposed in client bundle (check network tab)
- [ ] README warns about API key security

**Location Privacy:**
- [ ] Location not stored after page reload
- [ ] Location not sent to external servers (except Google Maps)
- [ ] User can deny location and still use app

---

## Accessibility Testing ♿

**Keyboard Navigation:**
- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can activate buttons with Enter/Space

**Screen Reader:**
- [ ] Headings are properly structured (H1, H2, H3)
- [ ] Buttons have descriptive labels
- [ ] Images/icons have alt text or ARIA labels
- [ ] Status messages are announced

**Visual:**
- [ ] Text contrast meets WCAG standards
- [ ] UI works at 200% zoom
- [ ] Color is not the only indicator (use icons too)

---

## Bug Report Template

If you find issues, document them:

**Bug Title:** [Brief description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**

**Actual Behavior:**

**Environment:**
- Browser: 
- OS: 
- Screen Size: 
- Location Permission: Granted/Denied

**Console Errors:**
```
[Paste any error messages]
```

**Screenshots:**
[Attach if relevant]

---

## Post-Testing

### All Tests Pass ✅
- [ ] Document any issues found
- [ ] Fix critical bugs
- [ ] Deploy to production

### Tests Failed ❌
- [ ] Review error logs
- [ ] Check API key configuration
- [ ] Verify Google Cloud Console settings
- [ ] Check browser compatibility
- [ ] Review code changes

---

## Continuous Testing

Run these tests:
- After every code change
- Before committing to Git
- Before deploying
- After updating dependencies
- After adding new displays to lights.json

---

🎄 **Happy Testing!** 🎅

Remember: A well-tested app creates a better user experience for everyone enjoying the holiday lights!