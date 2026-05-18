# GitHub Issue Drafts for React Conversion

This file contains sequenced draft issues for converting the existing `index.html` product page into a React application.

## 1. Initialize React app structure
- Create a React application inside the repository using Vite + TypeScript.
- Add the existing asset and page structure to the new React project.
- Confirm the app starts successfully with `npm install` and `npm run dev`.

## 2. Extract reusable components
- Split the static page into components: `Header`, `ProductGrid`, `ProductCard`, `CartSidebar`, `CartItem`, and `Loading`.
- Convert the current HTML markup into JSX.
- Keep layout and styles consistent during extraction.

## 3. Convert global state and logic to React hooks
- Replace `products`, `cart`, `isLoading`, and cart UI state with `useState` and `useEffect`.
- Move `loadProducts`, `addToCart`, `updateQuantity`, `checkout`, and `toggleCart` into React component logic.
- Remove direct DOM queries such as `document.getElementById` and `innerHTML` manipulation.

## 4. Implement React event handling and state-driven rendering
- Replace inline `onclick` handlers with JSX event props like `onClick`.
- Render product list and cart items from state arrays.
- Ensure updates re-render the UI automatically.

## 5. Improve responsiveness and styling
- Move the monolithic `<style>` block into a CSS/SCSS file or CSS modules.
- Remove the fixed `.container { width: 1200px; }` rule and support mobile breakpoints.
- Adjust the cart sidebar and product grid for smaller screens.

## 6. Add loading, error handling, and user feedback
- Add a proper loading state during product fetch.
- Implement error handling for data loading and checkout failures.
- Provide visible feedback when items are added to the cart and when checkout completes.

## 7. Add accessibility and polished behavior
- Use semantic elements like `<main>`, `<section>`, and `<button>` in JSX.
- Add `aria` labels and keyboard accessibility for cart open/close.
- Implement click-outside-to-close cart behavior with proper cleanup.
