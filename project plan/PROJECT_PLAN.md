# Custom T-Shirt Print Design App  
## Full MERN + React Native (Android) Learning Plan

(See chat for full explanation – this file is intentionally execution-focused.)

--- 

## Project Objective
Build a production-grade, cross-platform (Web + Android) custom T-shirt design and ordering system to fully learn the MERN stack.

---

## Stack
Backend: Node.js, Express, MongoDB  
Web: React (Vite)  
Mobile: React Native CLI (Android)  

---

## Timeline
8–10 weeks | ~75–80 hours

---

## MODULE 0 — Planning & Setup
- Repo setup (monorepo recommended)
- Backend + DB config
- React Web setup
- React Native Android setup
- Env configs

---

## MODULE 1 — Authentication & Authorization (STEP 1)
Backend:
- User schema
- JWT auth
- Role-based middleware

Web:
- Login / Signup
- Auth context
- Protected routes

Mobile:
- Login / Signup
- AsyncStorage token handling
- Protected navigation

---

## MODULE 2 — Core Models & APIs (STEP 2)
Models:
- User
- TShirtModel
- Design
- Order (immutable snapshots)

Admin-only product management

---

## MODULE 3 — React Native App Flow (STEP 3)
- Navigation stacks
- API service layer
- Basic design editor
- Error & loading states

---

## MODULE 4 — Design Upload & Preview
- Image upload
- Validation
- Draft designs
- Mockup preview

---

## MODULE 5 — Pricing Engine
- Backend pricing rules
- Quantity & print area logic

---

## MODULE 6 — Cart & Orders
- Cart state
- Order creation
- Order history

---

## MODULE 7 — Order Lifecycle & Admin Panel
- Order statuses
- Admin management (web only)

---

## MODULE 8 — Analytics
- MongoDB aggregations
- Revenue & usage stats

---

## MODULE 9 — Polish & Deployment
- Error handling
- Deployment (Backend, Web, Android)
- Documentation

---

## Outcome
After this project you will confidently build and explain real-world MERN + React Native systems.



## File Structure 

custom-tshirt-app/
├── server/        # Node + Express + MongoDB
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── services/
│   ├── package.json
│   └── .env
│
├── web/           # React (Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│   ├── package.json
│   └── .env
│
├── mobile/        # React Native CLI (Android)
│   ├── android/
│   ├── src/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── context/
│   │   └── services/
│   ├── package.json
│   └── .env
│
├── shared/        # OPTIONAL but powerful
│   ├── api-contracts/
│   ├── constants/
│   └── utils/
│
├── docs/
│   ├── PROJECT_PLAN.md
│   └── API.md
│
└── package.json   # root (scripts only)
