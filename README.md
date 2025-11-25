# Tour Maker Demo (Frontend)

## Quick description

Tour Maker is a React + TypeScript single-page application that helps travelers discover, create, and manage city tours. It talks to the Tour Maker Demo GraphQL backend via Apollo Client, stores auth tokens locally, and enriches every tour with Mapbox-powered visualizations. The UI is built with Vite, Tailwind CSS, and a small set of reusable form components tailored for tour creation flows.

## Features

- **Authentication & session handling** – Sign-up, sign-in, and logout flows backed by token-based headers and automatic header injection inside Apollo links.
- **Personalized discovery** – Recommended tours grid recalculates whenever a user updates their preferred cities/categories, showing curated content first and falling back to generic suggestions.
- **Tour creation wizard** – Guided form validates inputs with `class-validator`, feeds selections into the `createTour` mutation, and displays toast + loader feedback while the backend assembles the itinerary.
- **Real-time updates** – Subscribes to the `tourCreated` event via GraphQL WS, instantly merges new tours into the “My Tours” section without a manual refresh.
- **Interactive mapping** – The `TourMap` component computes bounding boxes with Turf.js, auto-fits Mapbox GL to tour stops, draws the path polyline, and conditionally labels stops based on zoom level.
- **Profile & preferences** – Dedicated profile page lets users fine-tune interests (categories, cities, pacing), which cascade through personalized content and future tour suggestions.
- **Resilient UX** – Centralized loader context, toast-based error reporting, and an error link that surfaces GraphQL/protocol issues to the console for easier debugging.

## Prerequisites

- Node.js 18+ (LTS recommended to match Vite/Apollo requirements).
- Yarn (project uses `yarn.lock`).
- Running Tour Maker GraphQL backend that exposes HTTP at `${VITE_API_URL}/graphql` and WebSocket at `${VITE_WS_API_URL}/graphql`.
- Mapbox account + access token with Tiles API access (`VITE_MAPBOX_ACCESS_TOKEN`).

## Getting Started

1. **Clone and install**
   ```bash
   git clone https://github.com/stas-m2muchcoffee/tour-maker-frontend-demo.git
   cd tour-maker-frontend-demo
   yarn install
   ```
2. **Configure environment**
   - Create `.env` in the project root and set the variables described in `.env.example`;
3. **Generate GraphQL artifacts**
   ```bash
   yarn codegen
   ```
   Run this anytime the backend schema changes to refresh `src/graphql/__generated__`.
4. **Launch the dev server**
   ```bash
   yarn dev
   ```
   Visit `http://localhost:${VITE_PORT}` (defaults to `5173`). Hot-module replacement is enabled by Vite.
5. **Build & preview (optional)**
   ```bash
   yarn build
   yarn preview
   ```
   Produces production assets under `dist/` and serves them locally for smoke testing.

## Usage

- **Authentication**
  - Navigate to `/sign-up` or `/sign-in`, complete the form, and the JWT is persisted in `localStorage`.
  - Use the app header menu to log out; this clears tokens and redirects to the public routes.
- **Tours dashboard (`/tours`)**
  - `Recommendations` section automatically queries `tour.getRecommendedTours`. Empty states nudge the user to update preferences.
  - `My Tours` lists tours you created, fed by `tour.getMyTours`.
- **Create tour (`/create-tour`)**
  - Select a city from the backend-provided list, toggle one or more categories, and submit.
  - Success toast confirms the backend started assembling the itinerary; a background subscription will later push the finished tour.
- **Tour details**
  - Each card links to `/tour/:id`, displaying the interactive map, stop list, and metadata retrieved via `tour.getTour`.
- **Profile (`/profile`)**
  - Update personal info and preference switches; the `updateMyPreferences` mutation ensures recommendations stay aligned.

## Used technologies and services

- **Framework & tooling:** React 19 with functional components, TypeScript strict mode, Vite 7 dev server/bundler, ESLint 9, GraphQL Code Generator for typed queries/mutations/subscriptions.
- **UI & styling:** Tailwind CSS v4 (via `@tailwindcss/vite`), custom UI primitives (buttons, inputs, toggle groups, selects), Lucide icons, React Toastify for global notifications.
- **State & data:** Apollo Client 4 with HTTP/WebSocket split links, GraphQL WS, React Hook Form + `class-validator` integration, RxJS-powered loader context, lodash utilities for data shaping.
- **Maps & geospatial:** Mapbox GL JS (vector tiles + styles), `react-map-gl` bindings, Turf.js (`@turf/helpers`, `@turf/bbox`) for polyline construction and viewport fitting.
- **Services & integrations:** Tour Maker GraphQL API (auth, tours, categories, cities), Mapbox (tiles + styles), local storage for session persistence.
