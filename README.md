# Login Auth Boilerplate

A simple and clean login/registration system boilerplate built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- ✅ User registration with email and username
- ✅ User login with email or username
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Clean and responsive UI
- ✅ Form validation
- ✅ Protected routes middleware
- ✅ Simple dashboard page

## Project Structure

```
login_auth/
├── BE/                     # Backend files
│   ├── models/
│   │   └── User.js        # User model with password hashing
│   ├── controllers/
│   │   └── authController.js  # Login/register logic
│   ├── routes/
│   │   └── authRoutes.js  # Authentication routes
│   ├── middleware/
│   │   └── auth.js        # JWT protection middleware
│   ├── utils/
│   │   └── generateToken.js  # JWT token generation
│   ├── server.js          # Express server setup
│   └── package.json       # Dependencies
├── docs/                  # Frontend files
│   ├── login.html         # Login/register page
│   ├── login.js           # Frontend JavaScript
│   ├── login.css          # Styling
│   └── dashboard.html     # Dashboard page
└── README.md              # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install backend dependencies**
   ```bash
   cd BE
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `BE` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/login-auth
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

5. **Open the frontend**
   - Open `docs/login.html` in your browser
   - Or serve the docs folder with a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (install http-server globally)
     npx http-server docs -p 8000
     ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "username": "john_doe",  // or "email": "john@example.com"
    "password": "password123"
  }
  ```

## Usage

1. **Register a new account** using the registration form
2. **Login** with your username/email and password
3. **Access the dashboard** - you'll be redirected after successful login
4. **Logout** using the logout button in the dashboard

## Customization

### Adding Protected Routes

To protect routes that require authentication:

```javascript
const { protect } = require('./middleware/auth');

// Protected route example
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
```

### Styling

The frontend uses a dark theme with brown/beige colors. You can customize the colors in `docs/login.css` and `docs/dashboard.html`.

### Database Schema

The User model includes:
- `username` (unique)
- `email` (unique)
- `password` (hashed)
- `createdAt` (timestamp)

You can extend this by adding more fields to the User model in `BE/models/User.js`.

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for session management
- Input validation on both frontend and backend
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Database**: MongoDB

## License

MIT License - feel free to use this boilerplate for your projects! 