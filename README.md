# Ahmed Portfolio

This is a portfolio project built using **Next.js** for the frontend and **Express.js** for the backend. It allows managing projects, uploading images, and showcasing work dynamically.

---

## Features

### Frontend
- Built with **Next.js**.
- Dynamic project display with animations using **GSAP**.
- Admin panel for managing projects and images.
- Dark mode support.

### Backend
- Built with **Express.js**.
- MongoDB for database management.
- Image upload and storage using **ImgBB**.
- Authentication with hashed passwords using **bcryptjs**.
- Cookie-based session management.

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- ImgBB API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AhmedPortfolio
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd ahmed-portfolio
   npm install

   # Backend
   cd ../ahmed-portfolio-Api
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `ahmed-portfolio-Api` folder with the following content:
     ```env
     DB_KEY=<your-mongodb-connection-string>
     IMGBB_API_KEY=<your-imgbb-api-key>
     ```

4. Start the development servers:
   ```bash
   # Frontend
   cd ahmed-portfolio
   npm run dev

   # Backend
   cd ../ahmed-portfolio-Api
   npm run dev
   ```

5. Open your browser and navigate to:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## Project Structure

### Frontend (`ahmed-portfolio`)
```
ahmed-portfolio/
├── src/
│   ├── app/
│   │   ├── componant/
│   │   │   ├── adminComponent/
│   │   │   │   ├── addImage.js
│   │   │   │   ├── projectForm.js
│   │   │   │   ├── updateProjets.js
│   │   │   ├── footer.js
│   │   │   ├── myProjects.js
│   │   │   ├── navbar.js
│   │   │   ├── showImages.js
│   │   │   ├── topSection.tsx
│   │   ├── admin/
│   │   │   ├── page.js
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
├── package.json
├── next.config.ts
```

### Backend (`ahmed-portfolio-Api`)
```
ahmed-portfolio-Api/
├── Routers/
│   ├── DELETE/
│   │   ├── deleteProject.js
│   ├── GET/
│   │   ├── getImage.js
│   │   ├── getProjects.js
│   ├── POST/
│   │   ├── addNewImage.js
│   │   ├── projectRouter.js
│   ├── PUT/
│   │   ├── updateProject.js
│   ├── loginAndCreatePass/
│   │   ├── login.js
├── MongooseSchema/
│   ├── adminImageSchema.js
│   ├── adminSchema.js
│   ├── projectSchema.js
├── db.js
├── index.js
├── package.json
```

---

## API Endpoints

### Projects
- **Add Project**: `POST /api/add-project`
- **Get Projects**: `GET /api/get-projects`
- **Update Project**: `PUT /api/updateProject/:id`
- **Delete Project**: `DELETE /api/deleteProject/:id`

### Images
- **Add Image**: `POST /api/addNewImage`
- **Get Latest Image**: `GET /api/getImage/latest`

### Authentication
- **Create Password**: `POST /api/admin/create-password`
- **Login**: `POST /api/admin/login`
- **Check Session**: `GET /api/admin/check-session`

---

## Deployment

### Frontend
- Deploy the frontend using platforms like **Vercel** or **Netlify**.

### Backend
- Deploy the backend using platforms like **Heroku**, **Vercel**, or **Render**.

---

## License
This project is licensed under the MIT License.
