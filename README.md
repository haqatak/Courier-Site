# 🚚 Courier Service Platform

A complete MERN stack-based courier service platform that allows users to send parcels, track deliveries, make secure payments, and manage parcel logistics through role-based dashboards. The system supports three types of users — **User**, **Rider**, and **Admin** — each with custom functionality.

> 🔗 **Live Site**: [https://zap-project-5e0b5.web.app](https://zap-project-5e0b5.web.app)

---

## 🧰 Technologies Used

- **Frontend**: React.js, Tailwind CSS, DaisyUI, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Auth + JWT
- **Payment**: Stripe
- **API Communication**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Map Integration**: BD district map with service center markers

---

## ✨ Core Features

- 📦 **Send Parcel**: Users can fill in parcel info, sender/receiver details, and get cost breakdown.
- 🧍‍♂️ **Rider Panel**: Riders can manage deliveries, update parcel statuses, and track assigned parcels.
- 🛠️ **Admin Dashboard**: Admins can manage users, parcels, service areas, roles, and verify activities.
- 🔐 **Authentication**: Firebase + JWT-based secure login for protected access.
- 🗺️ **Coverage Map**: Real-time district-level branch markers using service center JSON data.
- 💳 **Stripe Payment**: Secure checkout and confirmation system for parcel charges.
- ⚡ **Smooth UX**: Built with Framer Motion for page transitions and animations.

---

## 📦 Dependencies

```bash
Frontend:
- react
- react-router-dom
- axios
- @tanstack/react-query
- framer-motion
- firebase
- tailwindcss
- daisyui
- stripe-js

Backend:
- express
- cors
- dotenv
- jsonwebtoken
- mongoose
- stripe
- firebase-admin
