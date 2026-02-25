# DealFlow CRM 🚀

DealFlow is a premium, high-performance SaaS CRM designed for modern sales teams. Built with the MERN stack, it offers advanced lead management, pipeline visualization, and deep business analytics.

![DealFlow Dashboard](https://raw.githubusercontent.com/username/project/main/screenshots/dashboard.png)

## ✨ Features

- **📊 Advanced Analytics**: Real-time business intelligence with 12-month trailing revenue, conversion funnels, and regional performance.
- **🏗️ Kanban Pipeline**: A fluid drag-and-drop interface for managing deals across stages with automatic metric recalculations.
- **📥 Smart Lead Management**: Bulk operations, assignment systems, and CSV import/export capabilities.
- **📧 Email Campaigns**: Professional automated outreach with tracking and engagement analytics.
- **🔐 Secure RBAC**: Role-based access control (Admin, Manager, User) for robust team security.
- **✨ Premium UI**: Glassmorphic dark/light theme options built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT based auth with customized middleware.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dealflow.git
   cd dealflow
   ```

2. **Setup Server**:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Setup Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 🧪 Demo Mode & Seeding

To quickly populate the app with realistic demo data:

1. **Seed Data**:
   ```bash
   cd server
   node src/scripts/seed.js
   ```

2. **Enable Demo Mode**:
   Set `DEMO_MODE=true` in your server `.env` file to restrict destructive actions in public environments.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for top-tier sales performance.
