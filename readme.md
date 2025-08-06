# Mini LinkedIn

A full-stack social media application built with React, Node.js, Express, and MongoDB that mimics core LinkedIn functionality.

## 🚀 Features

### User Authentication

- **Register/Login** with email and password
- **JWT Authentication** with HTTP-only cookies
- **Protected Routes** for authenticated users
- **Profile Management** with name, email, and bio

### Public Post Feed

- **Create Posts** with text content (10-2500 characters)
- **View All Posts** in chronological order
- **Delete Posts** (only your own posts)
- **Real-time Character Counter**

### Profile Management

- **View User Profile** with personal information
- **Edit Profile** (name and bio)
- **User Posts Display** with post count
- **Profile Pictures** with automatic avatar generation

### Additional Features

- **Responsive Design** for mobile and desktop
- **Real-time Notifications** with toast messages
- **Form Validation** with Zod schemas
- **Loading States** and error handling
- **Rate Limiting** and security middleware

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **React Router Dom** for navigation
- **Zustand** for state management
- **React Hook Form** for form handling
- **Zod** for validation schemas
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for rate limiting
- **CORS** for cross-origin requests
- **Cookie Parser** for cookie handling

## 📁 Project Structure

```
mini-linkedin/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── profile.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Post.js
│   │   └── routes/
│   │       ├── auth.routes.js
│   │       ├── posts.routes.js
│   │       └── profile.routes.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── posts/
│   │   │   └── profile/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── schemas/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/Amarsah15/Mini-LinkedIn.git
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**
   Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/mini-linkedin
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. **Start the backend server**

```bash
npm start
```

Server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd ../frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables (Optional)**
   Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

4. **Start the frontend development server**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 API Endpoints

### Authentication Routes

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/check` - Check authentication status

### Posts Routes

- `POST /api/v1/posts/create` - Create a new post
- `GET /api/v1/posts/getAll` - Get all posts
- `DELETE /api/v1/posts/:id` - Delete a post

### Profile Routes

- `GET /api/v1/profile/` - Get user profile and posts
- `PUT /api/v1/profile/update` - Update user profile

## 🧪 Testing

### Manual Testing

#### Demo Login Credentials

Use these credentials to test the application:

**Test User 1:**

- Email: `gsah150803@gmail.com`
- Password: `Amar@12345`

**Test User 2:**

- Email: `amar@gmail.com`
- Password: `123456`

**Note:** If these users don't exist, create them using the registration form.

#### Testing Workflow

1. **User Registration**

```bash
# Test data
Name: John Doe
Email: john.doe@example.com
Password: TestPassword@123
```

2. **User Login**
   - Use the credentials above
   - Verify JWT token is set in cookies
   - Check redirection to home page
3. **Create Posts**
   - Test minimum character limit (10 chars)
   - Test maximum character limit (2500 chars)
   - Verify real-time character counter
4. **View Posts**
   - Check all posts display correctly
   - Verify author names and timestamps
   - Test responsive design on different screen sizes
5. **Profile Management**
   - View profile page
   - Edit profile (name and bio)
   - Verify changes persist after refresh
6. **Post Management**
   - Delete your own posts
   - Verify you cannot delete others' posts
   - Check post count updates

### API Testing with Postman/Thunder Client

#### 1. Register a new user

```http
POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass@123"
}
```

#### 2. Login

```http
POST http://localhost:8000/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPass123"
}
```

#### 3. Create a post

```http
POST http://localhost:8000/api/v1/posts/create
Content-Type: application/json
Cookie: token=<jwt-token-from-login>

{
  "content": "This is a test post with more than 10 characters!"
}
```

#### 4. Get all posts

```http
GET http://localhost:8000/api/v1/posts/getAll
```

#### 5. Get user profile

```http
GET http://localhost:8000/api/v1/profile/
Cookie: token=<jwt-token-from-login>
```

### Testing Rate Limiting

The application includes rate limiting:

- **General API**: 100 requests per 15 minutes
- **Auth endpoints**: 5 attempts per 15 minutes
- **Post creation**: 5 posts per minute

Test by making rapid requests to see rate limiting in action.

### Testing Input Validation

#### Invalid Registration Data

```http
POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
  "name": "A",
  "email": "invalid-email",
  "password": "123"
}
```

#### Invalid Post Content

```http
POST http://localhost:8000/api/v1/posts/create
Content-Type: application/json

{
  "content": "Short"
}
```

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Environment Variables for Production**

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-linkedin
JWT_SECRET=your_production_jwt_secret_here
PORT=8000
```

2. **Build Command**: `npm install`
3. **Start Command**: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**

```bash
npm run build
```

2. **Environment Variables**

```env
VITE_API_URL=https://your-backend-domain.com/api/v1
```

3. **Deploy the `dist` folder**

## 🔒 Security Features

- **Password Hashing** with bcryptjs
- **JWT Authentication** with HTTP-only cookies
- **Input Validation** and sanitization
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for secure cross-origin requests
- **XSS Protection** with input sanitization

## 📱 Responsive Design

The application is fully responsive and works on:

- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (below 768px)

## 🐛 Known Issues \& Limitations

1. **Real-time Updates**: Posts don't update in real-time across users
2. **Image Support**: Currently only supports text posts
3. **User Search**: No user search functionality
4. **Pagination**: All posts load at once (consider pagination for large datasets)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨💻 Author

**Amarnath Kumar**

- GitHub: [@yourusername](https://github.com/Amarsah15)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/amarnath15)

**Happy Coding! 🚀**
