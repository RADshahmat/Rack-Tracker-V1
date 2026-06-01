# Rack Tracker - Infrastructure Management Dashboard

A modern, full-featured infrastructure management dashboard built with Vite, React 19, and TanStack Query. Manage data center racks and equipment with real-time updates and a sleek dark theme.

## Features

- 🖥️ **Dashboard**: Real-time infrastructure metrics and alerts
- 🗂️ **Racks Management**: Create, view, and manage data center racks with visual representation
- ⚙️ **Equipment Tracking**: Comprehensive equipment inventory with status indicators
- 🌓 **Theme Toggle**: Light and dark mode support (dark mode matches design specs)
- 📱 **Responsive Design**: Mobile-first design that works seamlessly across all devices
- 🔄 **Real-time Updates**: Powered by TanStack Query for efficient data management
- ✅ **Form Validation**: Zod schemas with input sanitization

## Tech Stack

- **Framework**: Vite + React 19
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
src/
├── api/                 # API client and configuration
├── components/
│   ├── layout/         # Layout components (Sidebar, Header)
│   ├── ui/             # Reusable UI components
│   └── shared/         # Shared components (ThemeProvider)
├── features/
│   ├── racks/
│   │   ├── api/        # Racks API functions
│   │   ├── components/ # Racks UI components
│   │   ├── hooks/      # Custom React Query hooks
│   │   └── pages/      # Racks page layouts
│   └── equipment/
│       ├── api/        # Equipment API functions
│       ├── components/ # Equipment UI components
│       ├── hooks/      # Custom React Query hooks
│       └── pages/      # Equipment page layouts
├── types/              # TypeScript interfaces and Zod schemas
├── index.css           # Global styles
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Update VITE_API_URL if your API is running on a different port
```

4. Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

To create a production build:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

## API Integration

The application expects a backend API running at `http://localhost:3000/api` by default. You can change this by updating the `VITE_API_URL` environment variable.

### Required API Endpoints

- `GET /racks` - Get all racks
- `POST /racks` - Create a new rack
- `PUT /racks/:id` - Update a rack
- `DELETE /racks/:id` - Delete a rack
- `GET /equipment` - Get paginated equipment list
- `POST /equipment` - Create new equipment
- `PUT /equipment/:id` - Update equipment
- `DELETE /equipment/:id` - Delete equipment

## Features Breakdown

### Dashboard
- Overview of infrastructure metrics
- Quick stats (Total racks, active equipment, alerts)
- Metrics and alerts sections (empty as per requirements)

### Racks
- Grid view of all racks with visual rack units
- Search functionality
- Create new racks with modal form
- Rack details including capacity and location
- Edit and delete operations

### Equipment
- Comprehensive table view of all equipment
- Search and filter capabilities
- Pagination support
- Create, edit, and delete equipment
- Status indicators (Critical, Warning, Stable)
- Rack location tracking

### Theme
- Light/Dark mode toggle in sidebar
- Persisted theme preference
- System preference detection
- Smooth transitions

## Validation

### Racks
- Tag: Required, uppercase letters/numbers/hyphens only, unique
- Name: Required, max 100 characters
- Location: Optional, max 100 characters
- Capacity: 1-100 units, default 42

### Equipment
- Tag: Required, uppercase letters/numbers/hyphens only, unique
- Name: Required, max 100 characters
- Type: Optional, max 50 characters
- Rack: Optional, must reference existing rack
- Slot Position: Optional, 1-100 units

## Development

### Adding New Features

1. Create feature folders under `src/features/{featureName}`
2. Follow the existing structure (api, components, hooks, pages)
3. Use existing API client and hooks patterns
4. Ensure components are reusable and well-typed

### Styling

- Uses Tailwind CSS with custom theme
- Dark theme configured by default
- Status colors: Critical (red), Warning (yellow), Stable (green)
- All color tokens defined in `tailwind.config.ts`

## License

MIT

## Support

For issues or questions, please refer to the API documentation or check the component implementations.
