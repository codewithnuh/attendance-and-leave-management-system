
<div align="center">
  <br />
      <img src="./public/alms-readme.png">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS_15-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="Prisma" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=336791" alt="PostgreSQL" />
  </div>

  <h3 align="center">Attendance and Leave Management System</h3>

   <div align="center">
     Manage attendance and leave records efficiently with this full-stack web application.
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

This project is a full-stack Attendance and Leave Management System designed to streamline employee attendance and leave tracking processes. Built with cutting-edge web technologies, it provides tools for managing user authentication, attendance records, and leave applications, ensuring seamless administrative workflows for organizations.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Node.js**: Runtime for building fast and scalable server-side applications.
- **Next.js**: Framework for React-based server-side rendering.
- **Prisma**: ORM for database management and migrations.
- **PostgreSQL**: Database solution for storing and managing records.
- **TailwindCSS**: Utility-first CSS framework for responsive and modern UI designs.

## <a name="features">🔋 Features</a>

👉 **User Authentication:** Secure user login and management.

👉 **Attendance Tracking (CRUD):** 
- Record, view, update, and delete attendance data for employees.

👉 **Leave Management (CRUD):** 
- Submit, approve, or reject leave requests with clear status tracking.

👉 **Role-Based Access Control:** 
- Different permissions for admins and regular users.

👉 **Database Integration:** 
- Utilizes Neon PostgreSQL and Prisma for robust and scalable data handling.

👉 **Responsive Design:** 
- TailwindCSS ensures a clean and adaptive UI.

👉 **Search and Filter:** 
- Quickly find attendance records or leave requests using powerful search and filter functionalities.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally:

### **Prerequisites**
Ensure you have the following installed on your machine:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### **Clone the Repository**
```bash
git clone https://github.com/codewithnuh/attendance-and-leave-management-system.git
cd attendance-management-system
```

### **Install Dependencies**
```bash
npm install --legacy-peer-deps
```

### **Set Up Environment Variables**
Create a `.env` file and configure it with your database credentials:
```plaintext
# Database connection settings
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/your_database_name"

# Session secret for authentication
SESSION_SECRET="your_session_secret_key"

# Uploadthing token for file uploads
UPLOADTHING_TOKEN="your_uploadthing_token"

# Optional: uncomment if you use Prisma <5.10
# DATABASE_URL_UNPOOLED="postgresql://your_username:your_password@localhost:5432/your_database_name?sslmode=require"
```

### **Run Database Migrations**
```bash
npx prisma migrate dev
```

### **Start the Application**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

---