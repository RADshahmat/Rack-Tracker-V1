## Rack Tracker V1

src/
├── assets/          # Global static files (images, icons, fonts)
├── components/      # Shared, domain-agnostic UI primitives (Button, Modal, Input)
├── config/          # Global configuration, env variables
├── features/        # DOMAIN-BASED MODULES (The core of this architecture)
│   └── auth/        # Example domain: Authentication
│       ├── api/     # Auth-specific API calls
│       ├── components/ # Components used only within this domain
│       ├── hooks/    # Domain-specific custom hooks
│       ├── types/    # TypeScript definitions for this domain
│       └── index.ts  # Public API for the feature (exports only what's needed)
├── hooks/           # Global reusable hooks
├── layouts/         # Page layout wrappers (MainLayout, AuthLayout)
├── pages/           # Route-level components that compose features
├── services/        # Global API clients (Axios instance, generic SDKs)
├── store/           # Global state management (Redux, Zustand)
├── utils/           # Global pure utility functions
├── App.tsx          # Root component
└── main.tsx         # Entry point



frontend/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   │       ├── globals.css
│   │       └── theme.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   └── shared/
│   │       ├── Header/
│   │       ├── Footer/
│   │       ├── Sidebar/
│   │       └── index.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── SignupForm/
│   │   │   │   └── OtpVerification/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useLogout.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── tokenManager.ts
│   │   │   │   └── validators.ts
│   │   │   ├── constants/
│   │   │   │   └── auth.constants.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardHeader/
│   │   │   │   ├── StatsCard/
│   │   │   │   └── ActivityChart/
│   │   │   ├── sections/
│   │   │   │   ├── OverviewSection/
│   │   │   │   ├── AnalyticsSection/
│   │   │   │   └── AlertsSection/
│   │   │   ├── modules/
│   │   │   │   ├── Statistics/
│   │   │   │   └── Reports/
│   │   │   ├── hooks/
│   │   │   │   ├── useDashboardData.ts
│   │   │   │   └── useRealTimeUpdates.ts
│   │   │   ├── services/
│   │   │   │   └── dashboardService.ts
│   │   │   ├── types/
│   │   │   │   └── dashboard.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── user-management/
│   │   │   ├── components/
│   │   │   │   ├── UserList/
│   │   │   │   ├── UserDetails/
│   │   │   │   └── UserForm/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── document-workflow/
│   │   │   ├── components/
│   │   │   │   ├── ProcessList/
│   │   │   │   ├── ProcessStages/
│   │   │   │   └── WorkflowBuilder/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   └── [other-features]/
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── AuthProvider.tsx
│   │   │   └── index.ts
│   │   ├── ThemeContext/
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── apiConfig.ts
│   │   │   └── interceptors.ts
│   │   ├── storage/
│   │   │   └── storageService.ts
│   │   └── analytics/
│   │       └── analyticsService.ts
│   │
│   ├── store/
│   │   ├── useAuthStore.ts
│   │   ├── useUserStore.ts
│   │   ├── useAppStore.ts
│   │   └── index.ts
│   │
│   ├── routes/
│   │   ├── ProtectedRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   ├── routes.config.tsx
│   │   └── index.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── Profile.tsx
│   │   ├── Users.tsx
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── index.ts
│   │   ├── AuthLayout/
│   │   └── DashboardLayout/
│   │
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── queryClient.ts
│   │   └── validators.ts
│   │
│   ├── types/
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   ├── models.types.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── formatters/
│   │   │   ├── dateFormatter.ts
│   │   │   ├── currencyFormatter.ts
│   │   │   └── index.ts
│   │   ├── helpers/
│   │   │   ├── arrayHelpers.ts
│   │   │   ├── stringHelpers.ts
│   │   │   └── index.ts
│   │   └── validators/
│   │       ├── emailValidator.ts
│   │       └── index.ts
│   │
│   ├── constants/
│   │   ├── api.constants.ts
│   │   ├── app.constants.ts
│   │   ├── routes.constants.ts
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── app.config.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md