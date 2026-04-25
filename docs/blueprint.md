# **App Name**: RoboSI Connect

## Core Features:

- Data Infrastructure Setup: Initializes the Supabase PostgreSQL database with the specified schema for all entities (buyers, partners, contracts, etc.) and populates it with mock seed data for testing and development.
- Role-Based Authentication & Authorization: Implements Supabase Auth for secure user management and role-based access control (RBAC) with 4 defined roles (buyer, SI partner, manufacturer, admin), ensuring appropriate route guarding and access permissions.
- Global Layout & Theming: Establishes a root application layout, incorporating the Pretendard font, a global theme provider for consistent styling, and a toast notification system, applicable across the entire application.
- Dynamic Header Navigation: Develops a responsive header component with dynamic navigation menus, adjusting links and user controls (login/signup, profile/logout) based on the user's authentication status and assigned role (buyer, SI partner, manufacturer, admin).
- Role-Specific Sidebar Layouts: Creates dedicated sidebar navigation components for Admin, Manufacturer, and SI Partner portals, offering adaptive display for desktop (fixed width), tablet (icon-only), and mobile devices (via a hamburger menu sheet).
- Standard Application Footer: Provides a consistent footer across the application, displaying service name, business information, and essential legal links (terms of use, privacy policy, customer service) with a responsive three-column layout that stacks to one column on mobile.
- Access Denied (403) Page: Creates a dedicated 403 'Access Denied' page to inform users when they attempt to access restricted content or features without the necessary permissions, providing a clear message and navigation back to the homepage.

## Style Guidelines:

- Light color scheme, primarily featuring a professional and trustworthy primary blue (`#3980BF`). The background is a very light, desaturated blue (`#E8EFF3`), providing a clean canvas. An accent of teal (`#1EA3A3`) will be used to highlight interactive elements and important information, representing innovation.
- The primary font for all text, including headlines and body, will be 'Pretendard' (sans-serif), chosen for its Korean optimization and modern, clean readability. Note: currently only Google Fonts are supported.
- Leverage a consistent set of clear, modern icons, primarily from the shadcn/ui library. Ensure the 'NotificationBell' icon clearly indicates unread notifications with a badge, following the specified UI-014 guidelines.
- Employ a responsive layout approach across all components—header, sidebar, and footer—to ensure optimal viewing on desktop, tablet, and mobile. Incorporate accessibility best practices, including skip navigation links and appropriate ARIA attributes for primary navigational elements.
- Subtle and functional animations will be integrated for enhanced user experience, particularly for UI elements like the mobile Sheet drawer, dropdown menus, and state transitions, ensuring smooth interactions without unnecessary distraction.