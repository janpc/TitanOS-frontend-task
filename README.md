# TitanOS Frontend Task - Movie List

A movie list application built with React, Redux Toolkit, and Vite.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: Vanilla CSS (TV-optimized design system)
- **Testing**:
  - Unit/Integration: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - E2E: [Cypress](https://www.cypress.io/)

## 🏃‍♂️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.19+ or v22.12+)
- [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone the repository and install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 🧪 Testing

### Unit and Integration Tests

We use Vitest for fast, reliable unit testing.

```bash
# Run all vitest tests
npm run test
```

### E2E Tests

We use Cypress to verify the complete user flow, including keyboard navigation and scrolling behavior.

```bash
# Run E2E tests in headless mode
npm run test:e2e

# Open Cypress UI for interactive testing
npm run cypress:open
```

## 🏗 Project Structure

- `src/features/movies`: Core movie list components, styles, and Redux slice.
- `src/api`: API client and data fetching logic.
- `cypress/e2e`: End-to-end integration tests.
- `src/store`: Redux store configuration and custom hooks.

---
Developed as part of the TitanOS Frontend Technical Task.
