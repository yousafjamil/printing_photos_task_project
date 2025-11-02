Photo Printing Demo
Hey there! This is a quick mock-up I whipped up for the photo printing app task. It's a simple Next.js page where user can upload up to 5 pics from their phone, pick a print size, see the price auto update, and hit a fake "Pay Now" button. Kept it mobile first tried it on my phone, scrolls nice and uploads feel smooth.
Built this in a couple hours to show the basics: clean code, fast loads, and all the features they asked for. No fancy backend (local previews only), but it nails the upload/preview/price/pay flow.
What's Inside

Upload Zone: Drag drop or click to add photos (images only, caps at 5). Thumbs show up as neat squares—fixed 'em so no weird stretching.
Size Picker: Dropdown for 4×6 (AED 1.5 each), 5×7 (AED 3), or 8×10 (AED 5). Total price recalcs on the fly.
Summary Card: Quick recap of your order (photo count, size, total)—pops up once you upload.
Pay Button: Fake alert on click (e.g., "Order placed!"). Disables if no pics.
Mobile Vibes: Tailwind makes it responsive—grids stack, buttons full-width, no lag.

Tech: Next.js 14 (App Router + TypeScript), Tailwind for styles, React hooks for state. No extra libs—kept it lean.
How to Run It Locally

Clone or download: git clone (https://github.com/yousafjamil/printing_photos_task_project.git) (or unzip the folder).
Hop in: cd my_app.
Install stuff: npm install.
Start dev mode: npm run dev.
Open http://localhost:3000—boom, ready to test uploads.

For prod-like: npm run build then npm start.
Deployed Link
Live demo on Netlify: https://printing-photos-demo.netlify.app/
(Grabbed a free deploy—loads in a flash, works great on mobile.)
Folder Breakdown (Kept It Simple)

src/app/page.tsx: The main page—wires everything together.
src/components/: Bits like PhotoUpload.tsx (handles files/thumbs), SizeSelector.tsx (dropdown + math), PayButton.tsx (the button).
src/lib/utils.ts: Types and helpers (prices, calc function).
Everything else: Standard Next.js setup.