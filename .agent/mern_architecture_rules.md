# MERN Stack & React Industry Standard Rules

Apply these strict architectural and coding standards across all development tasks in this workspace:

## 1. API Architecture (Zero Direct Axios in Components)
- **Centralized API Client**: All HTTP requests MUST use the centralized `apiClient` instance (`services/apiClient.js` or `services/apiClient.ts`) configured with:
  - Base URL from environment variables (`VITE_API_URL` or `REACT_APP_API_URL`).
  - Request Interceptors to automatically attach JWT Bearer tokens from `localStorage`.
  - Response Interceptors to catch 401 Unauthorized errors globally and normalize error messages.
- **Service Layer**: Group API calls by domain/feature inside `services/` or `api/` folder (e.g., `authService.js`, `courseService.js`, `quizService.js`).
- **No Raw Axios in Components**: Never import `axios` directly into React pages or components. Always call the corresponding service function.

## 2. React Component Standards & 4-State UI Pattern
Every data-driven page or feature component MUST cleanly handle and render 4 distinct states:
1. **Loading State**: Display a skeleton loader or clean spinner while `loading === true`.
2. **Error State**: Render a user-friendly error message with a "Retry" button. Never leave errors unhandled.
3. **Empty State**: Show a helpful "No records found" screen when array data is empty.
4. **Success State**: Render the actual data list/cards when data exists.

## 3. State Management & Regression Prevention
- **Separate Server State from Client State**:
  - Keep local UI state (modals, dropdowns, active tabs) inside `useState` within the component.
  - Do NOT mutate or dump server data into global state stores unless explicitly shared across multiple distinct screens.
- **Isolation Check Before Edits**:
  - When fixing a bug in one module, verify that changes do NOT break shared state stores, common components, or API contracts used by other pages.

## 4. Backend Express Standards
- Follow Controller-Route-Model separation:
  - `routes/`: Define endpoints and attach middleware.
  - `controllers/`: Handle request validation and business logic.
  - `models/`: Mongoose schemas with strict field definitions and required validations.
- Wrap async controller logic in try-catch blocks and forward errors to a centralized Express error-handling middleware (`next(error)`).
