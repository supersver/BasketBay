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

### Cypress Page Tests

Start the Vite dev server first:

```bash
npm run dev
```

Then run the Cypress end-to-end tests in another terminal:

```bash
npm run test:e2e
```

To use the interactive Cypress runner:

```bash
npm run cypress:open
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

## Documentation

### Assumptions

- The backend API (e.g., https://api.escuelajs.co/api) is always available and returns data in the expected JSON format.
- Users will have a stable internet connection for real-time features.
- Product data includes required fields like `id`, `title`, and `price`; missing fields may cause errors.
- API responses are consistent and do not include unexpected data types or structures.

### Limitations

- The app currently supports only English; internationalization (i18n) is not implemented.
- Cart persistence relies on localStorage, which may not work in private browsing modes.
- E2E tests (via Cypress) cover basic flows but do not include edge cases like network failures.
- Pagination is not implemented for product listings, which may affect performance with large datasets.
- User authentication is basic and does not include features like password reset
- API is third-party and used for demonstration purposes; it may have rate limits or downtime that could affect the app's functionality.
- User profile features are limited to viewing information; editing and updating profiles are not implemented.
- User cannot view order history or manage past orders, as this functionality is not included in the current scope of the app.
- Cart functionality is basic and does not include features like quantity updates or checkout processes.

### Additional Features

- **User Authentication**: Added login/logout with JWT token storage (features/auth/), including a dropdown for user details.
- **User Profile**: Created a user profile page to view user information (features/user/).
- **Refresh Button**: Added a refresh button on the product listing page to manually refetch products from the API.
- **Error Handling**: Implemented error handling for API calls with user-friendly messages.
- **Loading States**: Added loading spinners for API calls to improve user experience.
- **Notifications**: Integrated React Toastify for success and error notifications across the app.
- **React Error Boundaries**: Implemented error boundaries to catch and display errors gracefully in the UI.
- **Axios Interceptors**: Set up Axios interceptors for global error handling and request/response logging.
- **Code Splitting**: Used React.lazy and Suspense for code splitting and lazy loading of components to improve performance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.
