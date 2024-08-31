This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Introduction
(Ctrl + Shift + V to open markdown preview in VS Code ). 

Our application aims to solve the issue of overcrowding in events and improve the safety and experience of attendees. We aim to provide features such as an interactive map that displays Points of Interest and congestion levels, helping users navigate and avoid crowded areas. Users can provide essential medical details for emergency purposes. Organizers have the ability to create and edit events, upload maps, and set up trackers to monitor and manage attendee limits. Staff members can track crowd levels, manage assigned locations, and review emergency protocols. 

## Table of Contents
1. File directory

## 1. File directory
techies_
|- backend 
| |- controllers
| | |- ControllerAdminProfile.js
| | |- ControllerEventDetail.js
| | |- ControllerStaffProfile.js
| | |- ControllerUserProfile.js
| | |- countController.js
| | |- homePageController.js
| | |- mapController.js
| | |- markerUpdateController.js
| |- firebase
| | |- firebase.js
| | |- serviceAccountKey.json
| |- node_modules
| |- public
| | |- next.svg
| | |- vercel.svg
| |- routers
| | |- AdminProfileRouter.js
| | |- countRouter.js
| | |- EventDetailsRouter.js
| | |- homePageRouter.js
| | |- mapRouter.js
| | |- markerUpdateRouter.js
| | |- StaffProfileRouter.js
| | |- UserProfileRouter.js
| |- .gitignore
| |- index.js
| |- jsconfig.json
| |- next.config.mjs
| |- package-lock.json
|- frontend 
| |- .next
| | |- cache.js
| | |- server.js
| | |- static.js
| | |- types.js
| | |- mapRouter.js
| |- components
| | |- admin-navbar
| | | |- navbar.js
| | | |- navbar.module.css
| | |- staff-navbar
| | | |- navbar.js
| | | |- navbar.module.css
| | |- user-navbar
| | | |- navbar.js
| | | |- navbar.module.css
| |- node_modules
| |- pages
| | |- admin-create-event
| | | |- index.js
| | | |- page.css
| | |- admin-create-map
| | | |- index.js
| | | |- MapLabeling.js
| | | |- page.css
| | |- admin-home
| | | |- index.js
| | | |- page.css
| | |- admin-invite-staff
| | |- admin-profile
| | | |- index.js
| | | |- page.css
| | |- admin-view-event
| | | |- index.js
| | | |- MapLabeling.js
| | | |- page.css
| | |- count
| | | |- index.js
| | | |- page.css
| | |- login
| | | |- img1.png
| | | |- index.js
| | | |- page.module.css
| | |- signup
| | | |- img1.png
| | | |- index.js
| | | |- page.module.css
| | |- staff-home
| | | |- index.js
| | | |- page.css
| | |- staff-profile
| | | |- index.js
| | | |- page.css
| | |- staff-view-event
| | | |- index.js
| | | |- page.css
| | |- user-home
| | | |- index.js
| | | |- page.css
| | |- user-profile
| | | |- index.js
| | | |- page.css
| | |- user-view-event
| | | |- index.js
| | | |- page.css
| |- public
| | |- assets
| |- src
| |- env.local
| |- next.config.mjs
|- README.md

## 2. How to run
1. Clone the repository: git clone https://github.com/shengweikoh/techies_
2. Navigate to the frontend directory: cd techies/frontend
3. Install dependencies: npm i
4. Set up environment variables (if any):cp .env.local .env.local
5. Navigate to the backend directory:cd techies/backend
6. Install dependencies: npm i
7. Set up environment variables (if any): cp .env .env

