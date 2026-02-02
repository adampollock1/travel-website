# Voyager Stays - Travel Booking Platform

A fully functional Kayak-style hotel booking website built with React, Node.js, and MongoDB. Features a modern, polished UI/UX design perfect for portfolio demonstration.

![Voyager Stays](https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80)

## Features

### Frontend
- **Modern React Application** with Vite for lightning-fast development
- **Beautiful UI** with Tailwind CSS and custom design system
- **Smooth Animations** using Framer Motion throughout
- **Interactive Maps** with Leaflet for hotel location visualization
- **Responsive Design** - works flawlessly on all devices

### Core Functionality
- **Hotel Search** - Search by destination with autocomplete suggestions
- **Advanced Filtering** - Filter by price, star rating, amenities, property type
- **Map View** - See hotels on an interactive map with price markers
- **Date Picker** - Intuitive check-in/check-out date selection
- **Guest Selector** - Adults, children, and room selection

### Hotel Details
- **Image Gallery** - Lightbox with keyboard navigation
- **Room Options** - Multiple room types with pricing
- **Amenities Display** - Categorized amenities with icons
- **Location Map** - Interactive map showing hotel location
- **Similar Hotels** - Recommendations for related properties

### User Features
- **Authentication** - JWT-based login and registration
- **Favorites** - Save hotels to a wishlist
- **Persistent Sessions** - Stay logged in across visits

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- Leaflet for maps
- react-day-picker for date selection
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

1. **Navigate to the project**
```bash
cd "Travel Website 2"
```

2. **Install dependencies**
```bash
cd client
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

That's it! The app uses mock data, so no database setup is required.

## Project Structure

```
travel-website/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reusable UI components
│   │   │   ├── layout/        # Navbar, Footer, Layout
│   │   │   ├── search/        # Search-related components
│   │   │   ├── hotels/        # Hotel cards, gallery
│   │   │   └── map/           # Map components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── stores/            # Zustand state stores
│   │   ├── services/          # API service layer
│   │   └── styles/            # Global styles
│   └── ...
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth middleware
│   │   └── index.js           # Server entry point
│   └── seeds/                 # Database seed data
│
└── README.md
```

## Design System

### Colors
- **Ocean Blue** - Primary dark color (#0A1628)
- **Coral** - Accent color (#FF6B5B)
- **Sand** - Background tones (#F5E6D3)

### Typography
- **Headings**: Cabinet Grotesk
- **Body**: Satoshi

### Components
- Custom buttons, inputs, cards, badges
- Skeleton loaders for loading states
- Modal component for overlays
- Star and score rating components

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Search hotels with filters
- `GET /api/hotels/featured` - Get featured hotels
- `GET /api/hotels/destinations` - Get popular destinations
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/hotels/:id/similar` - Get similar hotels

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/:hotelId` - Add to favorites
- `DELETE /api/favorites/:hotelId` - Remove from favorites

## Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist folder to Vercel
```

### Backend (Railway/Render)
- Connect your repository
- Set environment variables
- Deploy from the server directory

## Screenshots

### Home Page
Beautiful hero section with search widget, featured destinations, and popular hotels.

### Search Results
Grid and map view options, advanced filtering, sorting, and pagination.

### Hotel Details
Image gallery, room selection, amenities, location map, and booking widget.

### Authentication
Clean login and signup pages with form validation.

## Contributing

This is a portfolio project. Feel free to fork and customize for your own use!

## License

MIT License - feel free to use this project as a starting point for your own applications.

---

Built with love for travelers everywhere.
