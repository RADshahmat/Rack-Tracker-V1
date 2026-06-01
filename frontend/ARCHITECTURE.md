# Equipment Component Architecture

## Overview
The Equipment feature now follows a modular component structure with clear separation of concerns.

## Component Structure

```
src/
├── components/
│   └── common/
│       └── Pagination.tsx          # Reusable pagination component
│
└── features/equipment/
    └── components/
        ├── EquipmentList.tsx       # Container component (orchestrates sub-components)
        ├── EquipmentHeader.tsx     # Search + Create button header
        ├── EquipmentTable.tsx      # Table display with row actions
        ├── EquipmentForm.tsx       # Form for create/edit (with validation)
        ├── EquipmentPreview.tsx    # Equipment details panel
        ├── CreateEquipmentModal.tsx
        ├── EditEquipmentModal.tsx
```

## Component Responsibilities

### Pagination (Global/Common)
- **Location:** `src/components/common/Pagination.tsx`
- **Purpose:** Reusable pagination controls used across features
- **Props:** `currentPage`, `totalPages`, `onPageChange`
- **Usage:** Can be imported and used in any list component

### EquipmentHeader
- **Location:** `src/features/equipment/components/EquipmentHeader.tsx`
- **Purpose:** Displays title, search input, and create button
- **Props:** `searchTerm`, `onSearchChange`, `onCreateNew`
- **Responsibilities:** Only UI, no business logic

### EquipmentTable
- **Location:** `src/features/equipment/components/EquipmentTable.tsx`
- **Purpose:** Renders equipment rows with actions (edit, delete, view)
- **Props:** `equipment[]`, `isLoading`, `error`, `selectedEquipment`, handlers
- **Responsibilities:** Display and row selection

### EquipmentForm
- **Location:** `src/features/equipment/components/EquipmentForm.tsx`
- **Purpose:** Reusable form for creating and editing equipment
- **Features:** 
  - React Hook Form integration
  - Zod schema validation
  - Works for both create and edit operations
- **Responsibilities:** Form validation and submission

### EquipmentList (Orchestrator)
- **Location:** `src/features/equipment/components/EquipmentList.tsx`
- **Purpose:** Composes Header + Table + Pagination
- **Props:** All equipment list props (delegated to sub-components)
- **Responsibilities:** Component composition and filtering

### EquipmentPage
- **Location:** `src/features/equipment/pages/EquipmentPage.tsx`
- **Purpose:** Page-level component handling state and data
- **Responsibilities:** 
  - State management
  - API calls via hooks
  - Modal management
  - Delegates all UI to EquipmentList

## Data Flow

```
EquipmentPage (state management, API calls)
    ↓
EquipmentList (component composition)
    ├── EquipmentHeader (search + create)
    ├── EquipmentTable (display + selection)
    └── Pagination (page controls) ← Reusable
```

## Usage Example

```tsx
// In EquipmentPage or any parent component
<EquipmentList
  equipment={equipment}
  isLoading={isLoading}
  error={!!error}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  selectedEquipment={selectedEquipment}
  onSelectEquipment={setSelectedEquipment}
  onCreateNew={() => setShowCreateModal(true)}
  onEdit={handleEdit}
  onDelete={handleDelete}
  pagination={pagination}
  onPageChange={setCurrentPage}
/>
```

## Benefits

✅ **Modularity:** Each component has a single responsibility
✅ **Reusability:** Pagination can be used across features
✅ **Testability:** Smaller components are easier to test
✅ **Maintainability:** Changes isolated to specific components
✅ **Scalability:** Easy to add new features or modify existing ones
