# Food Trucks App Plan

## **North Star**
Increase traffic and sales for food trucks by connecting them with customers through an intuitive, mobile-first platform.

---

## **Core Features**
### **Consumer Features**
1. **Find Nearby Food Trucks**:
   - Display food trucks on a map.
   - Filter by cuisine, location, rating, vegan, and payment options.
2. **Food Truck Information**:
   - Surface links, schedules, and descriptions.

### **Operator Features**
1. **Account Creation**:
   - Sign up with Google/Facebook.
   - Customize profile (URLs, descriptions, unique password).
2. **Subscription Management**:
   - Monthly subscription with a free trial.
3. **Session Management**:
   - Turn on visibility with location and set hours of operation.

---

## **Secondary Features**
### **Consumer Features**
1. **Account Creation**:
   - Sign up with Google/Facebook.
2. **Check-in**:
   - Enter a food truck password.
   - Upload order details (name, picture).
   - Rate the experience.
   - Collect digital badges for visited trucks.
3. **Filter by Visited/Not-Visited**.

### **Operator Features**
1. **Referral System**:
   - Add referral codes upon sign-up.
   - Get a free month of visibility for referrals.
2. **Specials and Coupons**:
   - Add to their profile.

---

## **Tech Stack**
1. **Frontend**:
   - **Next.js** for routing and server-side rendering.
   - **Tailwind CSS** for styling.
2. **Backend**:
   - **Nile Database** for authentication, user management, and database.
3. **APIs**:
   - **Google Maps API** or **Mapbox** for location-based features.
   - **Cloudinary** or **AWS S3** for image uploads.
4. **Payments**:
   - **Stripe** for subscription management.

---

## **Iterative Implementation Plan**
### **Phase 1: MVP**
1. **Set up the project**:
   - Initialize Next.js with Tailwind CSS.
   - Integrate Nile Database for auth and database.
2. **Core Consumer Features**:
   - Build the map view with filters.
   - Surface food truck information.
3. **Core Operator Features**:
   - Implement account creation and profile management.
   - Add subscription and session management.

### **Phase 2: Secondary Features**
1. **Consumer Features**:
   - Add account creation with Google/Facebook.
   - Implement check-in, order details, and ratings.
   - Add visited/not-visited filter.
2. **Operator Features**:
   - Build the referral system.
   - Add specials and coupons to profiles.

### **Phase 3: Optimization and Scaling**
1. **Performance**:
   - Optimize map rendering and database queries.
2. **Scalability**:
   - Add caching and load balancing.
3. **User Feedback**:
   - Incorporate user feedback to refine features.

---

## **Next Steps**
1. **Set up the project**.
2. **Design the database schema**.
3. **Build core components**.
