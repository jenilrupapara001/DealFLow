# DealFlow CRM 🚀

DealFlow is a premium, high-fidelity SaaS CRM workspace designed for high-performance sales teams. It unifies lead management, pipeline visualization, and advanced business intelligence into a cinematic, glassmorphic interface.

---

## ✨ Premium Features

### 📊 Advanced Business Intelligence
- **Trailing Revenue Sheets**: 12-month visualization of financial trends.
- **Funnel Velocity Analytics**: Identify bottlenecks with conversion rate tracking.
- **Regional Performance**: Heatmaps and localized lead distribution.

### 🏗️ Elite Pipeline Management
- **Fluid Kanban Boards**: Drag-and-drop deals across customized stages.
- **Dynamic Metric Updates**: Real-time recalculation of total deal value and stage occupancy.
- **Deal Intelligence**: Detailed activity logs and priority markers.

### 📥 Enterprise Lead Management
- **Bulk Pursuit**: Perform mass operations on leads with a single click.
- **Smart Assignment**: Distribute leads intelligently across your sales team.
- **Data Mobility**: Native CSV import and export for seamless scaling.

### 📧 Automated Outreach 2.0
- **Campaign Engine**: Create and track automated email sequences.
- **Engagement Insights**: Open rates and interaction tracking built directly into the CRM.

### 🛡️ Demo & Security Optimized
- **Restricted Demo Mode**: Production-ready middleware to protect data in public showcases.
- **Auto-Fill Entry**: Seamless login for reviewers at `/login`.
- **RBAC Foundation**: Role-based access control (Admin, Manager, Users).

---

## 🛠️ Technical Architecture (MERN)

### Frontend
- **React 18** (Vite) for blazing fast performance.
- **Framer Motion** for cinematic UI transitions.
- **Tailwind CSS** with a custom glassmorphic design system.
- **Recharts** for high-fidelity data visualization.

### Backend
- **Node.js & Express.js** with a structured MVC architecture.
- **MongoDB & Mongoose** for flexible, scalable data modeling.
- **Nodemailer** for SMTP-driven inquiry delivery.
- **JWT** (JSON Web Tokens) for stateless, secure authentication.

---

## 🚀 Getting Started

### 1. Project Initialization
```bash
# Clone the repository
git clone https://github.com/jenilrupapara001/DealFLow.git
cd DealFLow

# Install all dependencies (concurrently)
npm install --prefix client
npm install --prefix server
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DEMO_MODE=true

# Email System (Google SMTP)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-google-app-password
EMAIL_RECEIVER=your-email@gmail.com
```

### 3. Demo Data Seeding
Populate your database with a single command:
```bash
cd server
node src/scripts/seed.js
```
*Note: This generates 12 months of realistic revenue history and 60+ test deals.*

### 4. Launching Development
```bash
# In the project root (using your local scripts)
npm start # Starts both client and server
```

---

## 🌐 Deployment Infrastructure

### Backend (Render)
- **URL**: `https://dealflow-u7nz.onrender.com`
- **Security**: Pre-configured with restricted CORS for `https://dealflow-demo.vercel.app`.

### Frontend (Vercel)
- **URL**: `https://dealflow-demo.vercel.app`
- **Connectivity**: Automatically detects production mode and targets the Render API endpoint.

---

## 📁 Repository Structure
```text
DealFLow/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI & Layouts
│   │   ├── context/     # Auth & Global State
│   │   └── pages/       # Route-level screens
├── server/              # Node.js Backend
│   ├── src/
│   │   ├── controllers/ # Business Logic
│   │   ├── middleware/  # Auth & Demo Guards
│   │   ├── models/      # Mongoose Schemas
│   │   ├── routes/      # Express API Routes
│   │   └── scripts/     # Seeding & Utilities
└── README.md            # You are here
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

Built with ❤️ for top-tier sales performance.
