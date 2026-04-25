# BasketBay

A modern React application built with TypeScript, Vite, and Tailwind CSS for an e-commerce platform.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup Instructions

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd basketbay
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### ENV Variables

Create a `.env` file in the root of the project and add the following variables:

```
VITE_API_URL=https://api.escuelajs.co/api

```

### Development Server

To start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Elements/        # Basic UI elements (buttons, tooltips, etc.)
│   └── Layout/          # Layout components (navbar, main layout)
├── features/            # Feature-based modules
│   ├── auth/
│       ├── routes/      # Auth-related route components
│       ├── hooks/       # Auth-related custom hooks
│       ├── api/         # API calls related to authentication
│       └── components/  # Auth-related components (login form, registration form, etc.)
│   ├── products/
|   ├── user/
│   └── misc/
├── context/             # React context providers
├── lib/                 # External library configurations
├── providers/           # App providers
├── routes/              # Route definitions
├── config/              # Configuration files
├── routes/              # Route components
├── utils/               # Utility functions
├── assets/              # Static assets (images, icons, etc.)
└── utils/               # Utility functions
```

## Technologies Used

- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Query** - Data fetching and caching
- **React Toastify** - Toast notifications
- **Phosphor Icons** - Icon library
- **API** - [Platzi Fake Store API](https://fakeapi.platzi.com)
- **Deployment** - Vercel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.
