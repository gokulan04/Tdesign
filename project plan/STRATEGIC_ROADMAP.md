# Strategic Roadmap: Custom T-Shirt Design App

This roadmap outlines the execution strategy for building the Tdesign project, integrating the MERN stack for Web/Admin and React Native for the Mobile experience.

---

## Phase 1: Foundation & Authentication (Week 1-2)
> [!IMPORTANT]
> This phase establishes the core security and data architecture.

### 1.1 Backend Core
- [ ] **Database Design**: Finalize Mongoose schemas for `User`, `TShirtModel`, and `Design`.
- [ ] **Auth System**: Implement JWT-based signup/login with Bcrypt password hashing.
- [ ] **Security**: Add role-based middleware (Admin vs. User).

### 1.2 Frontend Initialization
- [ ] **Web (React)**: Initialize Vite + Tailwind CSS. Set up Auth Context and Protected Routes.
- [ ] **Mobile (React Native)**: Initialize CLI project. Set up AsyncStorage for token management and Navigation containers.

---

## Phase 2: Design Editor & Image Handling (Week 3-4)
> [!TIP]
> Focus on visual excellence and smooth user interaction.

- [ ] **Upload Logic**: Set up Cloudinary or S3 integration for storing design images.
- [ ] **Web Canvas**: Build a basic interactive design tool for T-shirt customization.
- [ ] **Mobile Uploads**: Implement photo picker and design draft saving in the app.

---

## Phase 3: Order Management & Pricing Engine (Week 5-6)
- [ ] **Pricing Logic**: Backend service to calculate costs based on quantity, print areas, and T-shirt type.
- [ ] **Cart Flow**: Implement cart state management (Redux or Context) on both Web and Mobile.
- [ ] **Order Lifecycle**: Create orders with status tracking (Pending, Processing, Shipped).

---

## Phase 4: Admin Dashboard & Analytics (Week 7-8)
- [ ] **Admin Web Panel**: Build a dedicated interface for managing T-shirt models and processing customer orders.
- [ ] **Analytics**: Implement MongoDB aggregations to show sales stats and popular designs.

---

## Phase 5: Polish & Deployment (Week 9-10)
- [ ] **Error Handling**: Comprehensive frontend/backend error boundaries and toast notifications.
- [ ] **Deployment**: 
  - Backend: Render/Railway
  - Web: Vercel/Netlify
  - Mobile: Android Build (APK/AAB)
- [ ] **Testing**: End-to-end testing of the ordering flow.

---

### Immediate Next Steps
1. **Initialize Web App**: Set up the React + Vite environment in the `/web` directory.
2. **User Model**: Implement the first database schema in `server/src/models/User.js`.
