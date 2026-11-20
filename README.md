# Student Management System (MongoDB Atlas)

The backend connects to MongoDB Atlas using `backend/.env`; the React frontend calls the Express API at `http://localhost:5000/api/students`. Student create/read/update/delete operations are stored in the `student_management` database.

## Run locally

1. Install Node.js (current LTS).
2. In a terminal: `cd backend`, then `npm install`, then `npm start`.
3. In a second terminal: `cd frontend`, then `npm install`, then `npm run dev`.
4. Open the Vite URL (normally `http://localhost:5173`).

`backend/.env` is private and excluded from Git. It contains the Atlas URI supplied in the uploaded project. If you replace it, use `backend/.env.example` as the template. In MongoDB Atlas, ensure your database user has read/write access and your current IP is allowed under Network Access. Never publish or commit `.env`.
