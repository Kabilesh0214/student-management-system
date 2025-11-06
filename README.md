# 🎓 Student Management System

A full-featured web application built using **Node.js**, **Express.js**, **EJS**, and **PostgreSQL** to efficiently manage student data, attendance, and academic performance.  
It includes authentication, dynamic UI updates via **DOM manipulation**, and a responsive interface designed for real-time academic operations.

---

## 🧠 Overview

This project is designed to streamline the workflow of student record management.  
It allows administrators or teachers to:
- Register and login
- <img width="1470" height="829" alt="Screenshot 2025-11-06 at 08 41 07" src="https://github.com/user-attachments/assets/a714fa09-25f1-4e9d-ab8c-71769cb4b8d9" />
<img width="1470" height="829" alt="Screenshot 2025-11-06 at 08 41 36" src="https://github.com/user-attachments/assets/c507e624-8e5f-46e6-bc9b-59601f381b88" />

- Add and manage student details
- <img width="1470" height="826" alt="Screenshot 2025-11-06 at 08 44 09" src="https://github.com/user-attachments/assets/c9e05a64-4a25-45d2-bc02-365c62ee79c8" />
<img width="1470" height="833" alt="Screenshot 2025-11-06 at 08 43 54" src="https://github.com/user-attachments/assets/43e3fd46-8407-4636-bd4c-4adcca429c0f" />

- Track attendance live
- <img width="1470" height="829" alt="Screenshot 2025-11-06 at 08 44 02" src="https://github.com/user-attachments/assets/ec126a79-8746-4c23-bc54-71d3a316d2b8" />

- Record marks and generate grades
- <img width="1470" height="826" alt="Screenshot 2025-11-06 at 08 44 09" src="https://github.com/user-attachments/assets/8f9a9107-3b38-404b-ba6c-ca7bf5fe9ff4" />

- Manage secure login with localStorage
---

## 🛠️ Tech Stack

- **Frontend:** EJS Templates, CSS
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Libraries & Tools:**  
  - body-parser  
  - Express middlewares  
  - DOM manipulation for live UI updates  

---


## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-management-system.git
Move into the project folder:

bash
Copy code
cd student-management-system
Install dependencies:

bash
Copy code
npm install

Start the application:
bash
node index.js

Open your browser:
http://localhost:3000

---

## 📚 Features

👨‍🎓 Student Management
Add, edit, and delete student details
View all registered students with pagination

📅 Attendance Module
Mark attendance for each student in real-time
Track present/absent status

🧾 Marks & Grades
Add and update student marks
Automatically calculate total and grade

🔐 Authentication
Secure login and registration using localStorage
Session-based access to dashboard

🧑‍💼 Profile & Logout
User profile icon with logout option
Session timeout and route protection

🧩 Future Enhancements
Role-based access (Admin / Teacher / Student)
Export reports (PDF / CSV)
Attendance analytics dashboard
Push notifications for attendance and marks
Deploy on Render or AWS

---


