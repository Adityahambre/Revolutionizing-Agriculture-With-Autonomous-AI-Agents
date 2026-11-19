AGRINOVA SAME-DAY FRONTEND + MAP PATCH

This is a source patch for the existing AgriNova project. It is NOT a complete replacement project.

1. Close the Vite frontend terminal and stop FastAPI with CTRL+C.
2. Make a backup of your project folder before overwriting files.
3. Extract this ZIP directly into:
   D:\Projects\AgriNova\agri-project
   Allow Windows to merge folders and replace the listed files.
4. Open CMD and run:
   cd /d D:\Projects\AgriNova\agri-project
   npm install leaflet react-leaflet @turf/area
5. Start the backend in a CMD window:
   cd /d D:\Projects\AgriNova\agri-project\backend
   .venv\Scripts\activate
   uvicorn main:app --reload
6. Start the frontend in another CMD window:
   cd /d D:\Projects\AgriNova\agri-project
   npm run dev
7. Open the Vite URL shown in CMD (normally http://localhost:5173).

What this patch does:
- Connects Get Started, Login and OTP verification to the existing FastAPI OTP endpoints.
- Adds farm map pin selection and boundary drawing.
- Adds street / satellite layer switching.
- Calculates approximate area from a drawn boundary.
- Saves farm profile and map coordinates in browser localStorage.
- Displays six agent cards and calls their existing API endpoints directly.
- Adds a separate rule-based Post-harvest Advisor endpoint and UI.
- Adds local Vite-to-FastAPI CORS configuration.

Important limitations:
- Farm details/map are saved in this browser's localStorage for today's demo, not in PostgreSQL.
- Soil image and crop image inputs are previews only. The current backend has no image model, so images are NOT diagnosed.
- Weather analysis uses values entered by the user, not live weather.
- Market calculations use user-entered prices, not live mandi prices.
- Agent logic is rule-based decision support, not a trained AI/LLM model.
- Satellite imagery depends on the public Esri tile service and an internet connection.
- The map boundary area is an approximation; verify the legal/actual land area.
