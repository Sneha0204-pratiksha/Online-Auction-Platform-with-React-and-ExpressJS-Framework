### **Online Auction Platform - React & Express.js**  

This project is a simple **online auction platform** using **React** (frontend) and **Express.js** with **MongoDB** (backend).  

#### **Backend (Express.js - server.js)**
- Uses **Express.js** to create a REST API server.  
- Connects to **MongoDB** using **Mongoose**.  
- Defines an `Item` schema with `name`, `description`, `startingBid`, and `currentBid`.  
- Implements routes:  
  - `GET /items` → Fetch all auction items.  
  - `POST /items` → Add a new item to the auction.  

#### **Frontend (React - App.js)**
- Uses **React Hooks (`useState`, `useEffect`)** to manage state.  
- Fetches auction items from the backend using **Axios**.  
- Provides an input form to add new auction items.  
- Displays auction items in a list format.  

This project provides a basic foundation for an **auction system** where users can list items and track bids.
