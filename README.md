# Event Management System

The **Event Management System** is a full-stack web application built to streamline the organization, display, and media management of events. This system allows administrators to manage upcoming and past events, upload event-related media (images and videos), and maintain a seamless gallery and blog experience for users.

## 🔥 Features

- **Admin Panel for Event Management**
  - Add, update, and delete upcoming events
  - Automatically move events to "Recent Events" when their date passes
  - Manage media (add/delete images and videos) for each event

- **Upcoming Events Page**
  - Add event title, description, place, time, and a set of media files
  - Display events in a slider format and gallery below

- **Recent Events Page**
  - Automatically populated from past events
  - Timeline-style display with media thumbnails replacing event dates
  - Allows media management per event

- **Blog Module**
  - Admins can create, update, and delete blog posts
  - Each blog includes a title, image, and description
  - Beautiful hover effects and layout styles

- **Gallery Module**
  - Pinterest-style layout
  - Real-time media loading for events

- **Authentication**
  - Secure user registration and login system for admins

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Framer Motion (for animations)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

**Other Tools:**
- Multer (for file uploads)
- Cloudinary (for media storage) *(optional)*
- JWT (for authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/event-management-system.git
   cd event-management-system
   
2.Install dependencies for both frontend and backend:
# Backend
 ```bash
 cd backend
 npm install
```
# Frontend
```bash
-cd ../frontend
-npm install
```

3.Create environment files:
For backend, add a .env file with:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```


4.Start the development servers:
# Backend
```bash
cd backend
npm run dev
```

# Frontend
```bash
cd ../frontend
npm start
```
![Screenshot 2025-05-21 090443](https://github.com/user-attachments/assets/643d72de-474a-4c04-ab23-01e9acf0badc)

![Screenshot 2025-05-21 090504](https://github.com/user-attachments/assets/13bccdb6-d50d-4ac4-8b63-cd945b73587d)

![Screenshot 2025-05-21 090525](https://github.com/user-attachments/assets/d8175e33-9919-4eac-ab22-bed0301c0b5c)

![Screenshot 2025-05-21 090550](https://github.com/user-attachments/assets/4202a927-782f-461e-9412-514f8b8f3d29)

![Screenshot 2025-05-21 090624](https://github.com/user-attachments/assets/e95fa7ed-ced2-4ab2-b511-c6c178cd72a8)

![Screenshot 2025-05-20 162559](https://github.com/user-attachments/assets/99fa4c8e-b3f8-482c-a34b-223cf9695b1a)
