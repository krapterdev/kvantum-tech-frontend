# Walkthrough: Dynamic Scroll Animations & Site-wide SEO Settings

We have implemented all requested updates:
1. **Dynamic Scroll Animation**: Plays an image sequence based on window scroll depth, mimicking the design aesthetics of premium sites like `https://jeskojets.com/`.
2. **Centered Globe in Footer**: Moved the interactive 3D Earth network hologram from the background to a centered, theme-aware inline canvas inside the footer.
3. **Site-wide SEO CMS Controls**: Managed through the database and Admin Portal (including dynamic `robots.txt` and `sitemap.xml` serving).
4. **Legacy Directory Cleanups**: Safely deleted the old `frontend` folder.

---

## 1. Dynamic Scroll Animation (`ScrollVideoPlayer.jsx`)
We created [ScrollVideoPlayer.jsx](file:///Users/sahilkumar/Desktop/sahil%20projects/kts/kvantum-tech-frontend/src/components/ScrollVideoPlayer.jsx) to draw a responsive, high-performance canvas:
- **Frame Sequences**: Preloads the 300 animation frames (from `ezgif-frame-001.jpg` to `ezgif-frame-300.jpg`) copied to the public folder.
- **Scroll Mapping**: Listens to the `window.onscroll` event to map the viewport's scroll percentage to a specific image frame.
- **Visual Contrast**: Draws a radial dark vignette gradient over the canvas so that all text sections overlaying the animation remain fully readable.

---

## 2. Centering Globe in Footer
- **Inline Canvas**: Refactored the math inside [InteractiveCanvas.jsx](file:///Users/sahilkumar/Desktop/sahil%20projects/kts/kvantum-tech-frontend/src/components/InteractiveCanvas.jsx) to support an `isStatic` layout prop. When set to `true`, it sizes relative to its container and disables full-screen space star overlays.
- **Footer Placement**: Centered the rotating globe in a glowing hub container at the top of the [Footer.jsx](file:///Users/sahilkumar/Desktop/sahil%20projects/kts/kvantum-tech-frontend/src/components/layout/Footer.jsx).

---

## 3. Site-wide SEO Settings Engine (Dynamic Robots, Sitemap & Meta Tags)

### Backend Services
- **Mongoose Schema**: Created `SeoSetting` to store configuration keys (`robots`, `sitemap`, and `page_` pages).
- **Auto Seeding**: Seeds standard `robots.txt` details, regional site locations, and default page meta details during server start.
- **Public serving**: Served at the root of the server:
  - `GET /robots.txt` retrieves plain text from the database.
  - `GET /sitemap.xml` retrieves XML schema from the database.
- **Administration Endpoints**:
  - `GET /api/seopages/settings`: List all settings configurations.
  - `GET /api/seopages/settings/:key`: Retrieve single setting.
  - `PUT /api/seopages/settings/:key`: Update setting values (Admin & SEO roles only).

### Frontend CRM/CMS Integration
- **Axios Methods**: Integrated settings GET/PUT calls into `src/services/seoService.js`.
- **Dynamic Portal**: Created a site-wide configurations panel in the SEO tab of [AdminPortalPage.jsx](file:///Users/sahilkumar/Desktop/sahil%20projects/kts/kvantum-tech-frontend/src/pages/AdminPortalPage.jsx). Clicking `Configure Node` opens a custom modal matching the resource type:
  - **Robots / Sitemap**: Rich code textarea editors.
  - **Pages**: Direct fields for Page title, meta description, keywords list, JSON-LD Schema markup block, and custom scripts/pixels (other).

---

## 4. Verification Check
- Built the React client successfully in **712ms** with no issues.
- Syntactically validated the backend `src/app.js` and routes with node's health check flags.
- Safely deleted the legacy `frontend` folder.
