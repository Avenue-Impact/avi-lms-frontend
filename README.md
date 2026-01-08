# React + Vite

This template provides a minimal setup to get React working in Vite with HMR# Avenue Impact LMS Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

A modern Learning Management System (LMS) frontend built with React, Vite, and Tailwind CSS, designed to provide an interactive and engaging learning experience.

## 🚀 Features

- **Interactive Learning Interface**
- **Course Management**
- **Live and Recorded Sessions**
- **Student Dashboard**
- **Admin Portal**
- **Responsive Design**
- **Authentication & Authorization**
- **Progress Tracking**
- **Certificate Generation**
- **Project Team Collaboration**

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with CSS Modules
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **UI Components**: Radix UI, Shadcn/ui
- **Charts & Visualizations**: Recharts, Chart.js
- **3D Rendering**: Three.js, React Three Fiber
- **Icons**: Lucide Icons, Font Awesome
- **Animation**: Framer Motion
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/avi-lms-frontend.git
   cd avi-lms-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   # Add other environment variables as needed
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📁 Project Structure

```
src/
├── Components/       # Reusable UI components
├── assets/          # Static assets (images, fonts, etc.)
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── lib/             # Utility functions and helpers
├── pages/           # Page components
├── providers/       # Context providers
├── routes/          # Application routes
├── services/        # API services
└── utils/           # Utility functions
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
# Add other environment variables as needed
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- And all the other amazing open-source projects used in this project.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
