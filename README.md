# Broccoli & Co. Invite App

This is a single-page web application (SPA) designed to allow users to request an invitation effortlessly. Built with React, TypeScript, and Vite, it leverages Tailwind CSS for styling and Formik with Yup for seamless form management. To ensure reliability, the app is thoroughly tested using Jest and React Testing Library.

The production-ready solution is deployed on Netlify. You can view the live demo at:  
[https://brocolli-co.netlify.app/](https://brocolli-co.netlify.app/)

---

## Table of Contents

- [Overview](#overview)
- [Key Components](#key-components)
- [Installation and Setup](#installation-and-setup)
- [Running the App](#running-the-app)
- [Running Tests and Coverage](#running-tests-and-coverage)
- [Design Decisions](#design-decisions)

---

## Overview

Users can request an invite by clicking a button, which opens a modal with a simple form. The form provides real-time validation and submits the request to a backend API. If successful, a confirmation modal appears; otherwise, an inline error message guides the user. The app also includes a dark mode toggle, allowing users to switch themes seamlessly.

---

## Key Components / Files

- **Layout:**  
  Wraps the page content with a fixed Header and Footer.

- **Header:**  
  Displays the company name and includes a dark mode toggle. Uses the custom `useDarkMode` hook to persist and toggle the dark mode setting.

- **Footer:**  
  Displays copyright information along with the current year.

- **Modal:**  
  A reusable modal component that provides a backdrop, centers content, and includes a close button.

- **InviteFormModal:**  
  A modal containing a form (using Formik and Yup) for users to input their info - full name, email, and confirmation email. It validates inputs inline, shows a sending state during submission, and displays server error messages if needed.

- **ConfirmationModal:**  
  Displays a confirmation message after a successful invite submission.

- **useDarkMode (Custom Hook):**  
  Manages the dark mode state and persists the setting to localStorage.

- **Home:**  
  The main page that displays the hero, and a "Request an invite" button. It conditionally renders the InviteFormModal or ConfirmationModal based on user interactions and API responses.

- **App:**  
  The root component that renders the Home page.

- **Services:**
  Holds the services uses to make API calls, in this case to call the invite API.

- **Config:**
  Manages configuration for the project, specifically the API urls.

---

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmirAzhar/broccoli-invite
   cd broccoli-invite
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Vraiables:**

   If not alraedy in the repo, Create a .env file in the root directory of the project and add the following variable:

   ```bash
   VITE_INVITE_API_URL=https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
   ```

   You can change the URL to match your deployment or testing environment. The app uses this variable to determine the backend API endpoint.

---

## Running the App

To start the development server:

```bash
npm run dev
```

Open your browser at the URL provided by Vite (usually `http://localhost:5173`).

---

## Running Tests and Coverage

To run tests with code coverage:

```bash
npm run test:coverage
```

Tests are written using Jest and React Testing Library. The project is configured to enforce 100% code coverage.

---

## Deployment

This project is deployed on [Netlify](https://www.netlify.com/). To deploy your own version:

1. **Connect your repository:**  
   Sign in to Netlify and connect your GitHub repo.

2. **Configure Build Settings:**

   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Environment Variables:**  
   In your dashboard, configure the following environment variable:
   ```env
   VITE_INVITE_API_URL=https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
   ```
   Adjust the URL as needed for your deployment environment.
4. **Deploy:**  
   Netlify will automatically trigger a deployment when you push changes to your repository. You can also trigger manual deploys from the dashboard.

---

## Design Decisions

- **React & TypeScript:**  
  Provides a modular and strongly typed development environment.

- **Vite:**  
  For fast development and build times.

- **Tailwind CSS:**  
  Enables fast and responsive styling with aesy dark mode implementation.

- **Formik & Yup:**  
  Simplifies form state management and validation, without having to implement custom validation.
