# 🚚 Courier Service Platform (Ionic Version)

A complete MERN stack-based courier service platform, now converted to **Ionic React**, that allows users to send parcels, track deliveries, make secure payments, and manage parcel logistics through role-based dashboards. The system supports three types of users — **User**, **Rider**, and **Admin** — each with custom functionality.

> 🔗 **Live Site**: [https://zap-project-5e0b5.web.app](https://zap-project-5e0b5.web.app) (Note: This link points to the original version. The Ionic version runs locally.)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed.
- Ionic CLI installed (`npm install -g @ionic/cli`).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ionic-app
    ```
3.  **Install NPM packages:**
    ```bash
    npm install --legacy-peer-deps
    ```
4.  **Run the application:**
    ```bash
    ionic serve
    ```
The application will be available at `http://localhost:8100`.

---

## 🧰 Technologies Used

- **Frontend**: **Ionic React**, **React.js**, Tailwind CSS, DaisyUI, Framer Motion
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
- ⚡ **Smooth UX**: Built with Ionic components for a native feel and Framer Motion for animations.

---

## 📦 Dependencies

```bash
Frontend:
- @ionic/react
- @ionic/react-router
- react
- react-router-dom@5
- history@5
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
```