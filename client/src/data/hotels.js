// Mock hotel data - 40+ hotels across 20+ cities worldwide
export const hotels = [
  // New York City
  {
    _id: "nyc-plaza-hotel",
    name: "The Plaza Hotel",
    description: "An iconic luxury hotel overlooking Central Park, The Plaza has been a symbol of New York elegance since 1907. Experience world-class service, exquisite dining, and timeless sophistication in the heart of Manhattan.",
    location: { city: "New York", country: "United States", address: "768 5th Avenue, New York, NY 10019" },
    coordinates: { lat: 40.7645, lng: -73.9747 },
    stars: 5,
    rating: 9.2,
    reviewCount: 2847,
    pricePerNight: 695,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: ["Spa", "Fitness Center", "Restaurant", "Room Service", "Concierge", "Valet Parking", "Business Center", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Central Park Views", "Butler Service", "Michelin-Star Dining"],
    rooms: [
      { name: "Deluxe Room", capacity: 2, beds: "1 King", price: 695, available: true },
      { name: "Park View Suite", capacity: 3, beds: "1 King + Sofa", price: 1250, available: true },
      { name: "Grand Penthouse", capacity: 4, beds: "2 King", price: 3500, available: true }
    ]
  },
  {
    _id: "nyc-standard-high-line",
    name: "The Standard High Line",
    description: "Perched above the High Line park, this ultra-modern hotel offers stunning views of the Hudson River and Manhattan skyline. Bold design meets downtown cool in the heart of the Meatpacking District.",
    location: { city: "New York", country: "United States", address: "848 Washington St, New York, NY 10014" },
    coordinates: { lat: 40.7408, lng: -74.0080 },
    stars: 4,
    rating: 8.7,
    reviewCount: 1923,
    pricePerNight: 345,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ],
    amenities: ["Rooftop Bar", "Restaurant", "Fitness Center", "Free WiFi", "Pet Friendly", "Bike Rental"],
    propertyType: "boutique",
    featured: true,
    highlights: ["High Line Access", "Rooftop Pool", "DJ Nights"],
    rooms: [
      { name: "Standard Room", capacity: 2, beds: "1 Queen", price: 345, available: true },
      { name: "Hudson View Room", capacity: 2, beds: "1 King", price: 485, available: true },
      { name: "Corner Suite", capacity: 3, beds: "1 King + Sofa", price: 725, available: true }
    ]
  },
  {
    _id: "nyc-pod-51",
    name: "Pod 51",
    description: "A smart, stylish micro-hotel offering compact but well-designed rooms at affordable prices. Perfect for savvy travelers who want a great location without breaking the bank.",
    location: { city: "New York", country: "United States", address: "230 E 51st St, New York, NY 10022" },
    coordinates: { lat: 40.7561, lng: -73.9692 },
    stars: 3,
    rating: 8.1,
    reviewCount: 3456,
    pricePerNight: 129,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    ],
    amenities: ["Free WiFi", "Rooftop Terrace", "Cafe", "24/7 Front Desk"],
    propertyType: "hotel",
    featured: false,
    highlights: ["Midtown Location", "Budget-Friendly", "Modern Design"],
    rooms: [
      { name: "Pod", capacity: 1, beds: "1 Twin", price: 129, available: true },
      { name: "Full Pod", capacity: 2, beds: "1 Full", price: 169, available: true },
      { name: "Queen Pod", capacity: 2, beds: "1 Queen", price: 199, available: true }
    ]
  },
  // Paris
  {
    _id: "paris-le-bristol",
    name: "Le Bristol Paris",
    description: "A palace hotel on the prestigious Rue du Faubourg Saint-Honoré, Le Bristol embodies French art de vivre with its elegant decor, Michelin-starred restaurants, and legendary service.",
    location: { city: "Paris", country: "France", address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris" },
    coordinates: { lat: 48.8721, lng: 2.3158 },
    stars: 5,
    rating: 9.5,
    reviewCount: 1834,
    pricePerNight: 890,
    images: [
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    amenities: ["Spa", "Pool", "Michelin Restaurant", "Garden", "Butler Service", "Concierge", "Free WiFi", "Valet Parking"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Rooftop Pool", "3 Michelin Stars", "French Garden"],
    rooms: [
      { name: "Superior Room", capacity: 2, beds: "1 King", price: 890, available: true },
      { name: "Deluxe Suite", capacity: 3, beds: "1 King + Sofa", price: 1650, available: true },
      { name: "Signature Suite", capacity: 4, beds: "2 King", price: 4200, available: true }
    ]
  },
  {
    _id: "paris-hotel-monge",
    name: "Hotel Monge",
    description: "A charming boutique hotel in the heart of the Latin Quarter, offering refined comfort and authentic Parisian atmosphere steps from the Panthéon and Luxembourg Gardens.",
    location: { city: "Paris", country: "France", address: "55 Rue Monge, 75005 Paris" },
    coordinates: { lat: 48.8462, lng: 2.3515 },
    stars: 4,
    rating: 9.0,
    reviewCount: 892,
    pricePerNight: 295,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    ],
    amenities: ["Free WiFi", "Breakfast", "Concierge", "Air Conditioning", "Minibar"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Latin Quarter", "Charming Decor", "Breakfast Included"],
    rooms: [
      { name: "Classic Room", capacity: 2, beds: "1 Queen", price: 295, available: true },
      { name: "Superior Room", capacity: 2, beds: "1 King", price: 365, available: true },
      { name: "Junior Suite", capacity: 3, beds: "1 King + Sofa", price: 485, available: true }
    ]
  },
  {
    _id: "paris-generator",
    name: "Generator Paris",
    description: "Hip and affordable accommodation near Gare du Nord, featuring stylish design, social spaces, and a rooftop terrace with stunning views of Sacré-Cœur.",
    location: { city: "Paris", country: "France", address: "9-11 Place du Colonel Fabien, 75010 Paris" },
    coordinates: { lat: 48.8768, lng: 2.3702 },
    stars: 2,
    rating: 8.3,
    reviewCount: 4521,
    pricePerNight: 75,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800"
    ],
    amenities: ["Free WiFi", "Rooftop Bar", "Cafe", "Laundry", "24/7 Reception"],
    propertyType: "hostel",
    featured: false,
    highlights: ["Rooftop Views", "Social Atmosphere", "Central Location"],
    rooms: [
      { name: "Private Room", capacity: 2, beds: "1 Double", price: 75, available: true },
      { name: "Twin Room", capacity: 2, beds: "2 Twin", price: 85, available: true }
    ]
  },
  // Tokyo
  {
    _id: "tokyo-aman",
    name: "Aman Tokyo",
    description: "Urban sanctuary meets Japanese minimalism at this stunning hotel in Otemachi Tower. Floor-to-ceiling windows frame Tokyo's skyline while traditional craftsmanship creates spaces of serene beauty.",
    location: { city: "Tokyo", country: "Japan", address: "1-5-6 Otemachi, Chiyoda-ku, Tokyo 100-0004" },
    coordinates: { lat: 35.6867, lng: 139.7645 },
    stars: 5,
    rating: 9.6,
    reviewCount: 956,
    pricePerNight: 1150,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
    ],
    amenities: ["Spa", "Pool", "Fine Dining", "Fitness Center", "Concierge", "Tea Room", "Free WiFi", "Valet"],
    propertyType: "hotel",
    featured: true,
    highlights: ["33rd Floor Views", "Japanese Spa", "Serene Design"],
    rooms: [
      { name: "Deluxe Room", capacity: 2, beds: "1 King", price: 1150, available: true },
      { name: "Corner Suite", capacity: 3, beds: "1 King + Sofa", price: 2200, available: true },
      { name: "Aman Suite", capacity: 4, beds: "2 King", price: 5500, available: true }
    ]
  },
  {
    _id: "tokyo-park-hyatt",
    name: "Park Hyatt Tokyo",
    description: "Made famous by 'Lost in Translation', this sophisticated hotel occupies the top floors of Shinjuku Park Tower. Experience breathtaking views, world-class dining, and impeccable service.",
    location: { city: "Tokyo", country: "Japan", address: "3-7-1-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-1055" },
    coordinates: { lat: 35.6864, lng: 139.6903 },
    stars: 5,
    rating: 9.3,
    reviewCount: 2145,
    pricePerNight: 685,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    ],
    amenities: ["Pool", "Spa", "Fine Dining", "Bar", "Fitness Center", "Concierge", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["New York Grill", "52nd Floor Pool", "Mount Fuji Views"],
    rooms: [
      { name: "Park Room", capacity: 2, beds: "1 King", price: 685, available: true },
      { name: "Park Suite", capacity: 3, beds: "1 King + Sofa", price: 1350, available: true },
      { name: "Ambassador Suite", capacity: 4, beds: "2 King", price: 3200, available: true }
    ]
  },
  {
    _id: "tokyo-trunk-hotel",
    name: "Trunk Hotel",
    description: "A socially conscious boutique hotel in trendy Shibuya, featuring locally-sourced materials, art installations, and a commitment to sustainability without sacrificing style.",
    location: { city: "Tokyo", country: "Japan", address: "5-31 Jingumae, Shibuya-ku, Tokyo 150-0001" },
    coordinates: { lat: 35.6691, lng: 139.7055 },
    stars: 4,
    rating: 8.8,
    reviewCount: 1234,
    pricePerNight: 385,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: ["Restaurant", "Bar", "Terrace", "Free WiFi", "Concierge", "Meeting Rooms"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Eco-Friendly", "Art Collection", "Shibuya Location"],
    rooms: [
      { name: "Standard Room", capacity: 2, beds: "1 Queen", price: 385, available: true },
      { name: "Junior Suite", capacity: 2, beds: "1 King", price: 545, available: true },
      { name: "Trunk Suite", capacity: 3, beds: "1 King + Sofa", price: 785, available: true }
    ]
  },
  // Dubai
  {
    _id: "dubai-burj-al-arab",
    name: "Burj Al Arab Jumeirah",
    description: "The world's most luxurious hotel, shaped like a billowing sail, offers unparalleled opulence with duplex suites, personal butlers, and a fleet of Rolls-Royces.",
    location: { city: "Dubai", country: "United Arab Emirates", address: "Jumeirah Beach Road, Dubai" },
    coordinates: { lat: 25.1412, lng: 55.1852 },
    stars: 5,
    rating: 9.4,
    reviewCount: 3421,
    pricePerNight: 1850,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
    ],
    amenities: ["Private Beach", "Spa", "Multiple Pools", "Helipad", "Butler Service", "Fine Dining", "Rolls-Royce Fleet"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Iconic Architecture", "All-Suite Hotel", "Underwater Restaurant"],
    rooms: [
      { name: "Deluxe Suite", capacity: 2, beds: "1 King", price: 1850, available: true },
      { name: "Panoramic Suite", capacity: 3, beds: "1 King + Sofa", price: 3200, available: true },
      { name: "Royal Suite", capacity: 6, beds: "3 King", price: 12500, available: true }
    ]
  },
  {
    _id: "dubai-atlantis",
    name: "Atlantis The Palm",
    description: "A fantastical ocean-themed resort on Palm Jumeirah, featuring the largest waterpark in the Middle East, underwater suites, and marine habitats with 65,000 sea creatures.",
    location: { city: "Dubai", country: "United Arab Emirates", address: "Crescent Road, Palm Jumeirah, Dubai" },
    coordinates: { lat: 25.1304, lng: 55.1172 },
    stars: 5,
    rating: 8.9,
    reviewCount: 5678,
    pricePerNight: 495,
    images: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    ],
    amenities: ["Waterpark", "Private Beach", "Aquarium", "Spa", "Kids Club", "Multiple Restaurants", "Dolphin Bay"],
    propertyType: "resort",
    featured: false,
    highlights: ["Aquaventure Waterpark", "Lost Chambers Aquarium", "Celebrity Chef Restaurants"],
    rooms: [
      { name: "Ocean King Room", capacity: 2, beds: "1 King", price: 495, available: true },
      { name: "Terrace Suite", capacity: 4, beds: "2 King", price: 895, available: true },
      { name: "Underwater Suite", capacity: 4, beds: "2 King", price: 7500, available: true }
    ]
  },
  // London
  {
    _id: "london-the-savoy",
    name: "The Savoy",
    description: "A legendary Art Deco landmark on the Strand, The Savoy has hosted royalty, celebrities, and discerning travelers since 1889. Experience timeless elegance with modern luxury.",
    location: { city: "London", country: "United Kingdom", address: "Strand, London WC2R 0EZ" },
    coordinates: { lat: 51.5104, lng: -0.1205 },
    stars: 5,
    rating: 9.3,
    reviewCount: 2956,
    pricePerNight: 625,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Spa", "Pool", "Fine Dining", "Bar", "Butler Service", "Concierge", "Fitness Center", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Thames Views", "Art Deco Design", "Historic Bar"],
    rooms: [
      { name: "Superior Room", capacity: 2, beds: "1 King", price: 625, available: true },
      { name: "River View Suite", capacity: 3, beds: "1 King + Sofa", price: 1250, available: true },
      { name: "Royal Suite", capacity: 4, beds: "2 King", price: 4500, available: true }
    ]
  },
  {
    _id: "london-hoxton-shoreditch",
    name: "The Hoxton Shoreditch",
    description: "The original Hoxton hotel, bringing affordable style to London's creative East End. Exposed brick, vintage furnishings, and a buzzing lobby scene define this hip address.",
    location: { city: "London", country: "United Kingdom", address: "81 Great Eastern St, London EC2A 3HU" },
    coordinates: { lat: 51.5254, lng: -0.0799 },
    stars: 4,
    rating: 8.5,
    reviewCount: 3421,
    pricePerNight: 195,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    amenities: ["Restaurant", "Bar", "Free WiFi", "Meeting Rooms", "Concierge"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Shoreditch Location", "Industrial Chic", "Great Restaurant"],
    rooms: [
      { name: "Shoebox", capacity: 2, beds: "1 Queen", price: 195, available: true },
      { name: "Cosy", capacity: 2, beds: "1 King", price: 245, available: true },
      { name: "Roomy", capacity: 2, beds: "1 King", price: 295, available: true }
    ]
  },
  // Barcelona
  {
    _id: "barcelona-hotel-arts",
    name: "Hotel Arts Barcelona",
    description: "A sleek glass tower on the waterfront, Hotel Arts offers contemporary luxury with stunning Mediterranean views, world-class dining, and direct beach access.",
    location: { city: "Barcelona", country: "Spain", address: "Carrer de la Marina, 19-21, 08005 Barcelona" },
    coordinates: { lat: 41.3875, lng: 2.1979 },
    stars: 5,
    rating: 9.1,
    reviewCount: 2134,
    pricePerNight: 425,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    ],
    amenities: ["Private Beach", "Pool", "Spa", "Fine Dining", "Concierge", "Fitness Center", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Beachfront", "43 Floors", "2 Michelin Stars"],
    rooms: [
      { name: "Deluxe Room", capacity: 2, beds: "1 King", price: 425, available: true },
      { name: "Sea View Suite", capacity: 3, beds: "1 King + Sofa", price: 785, available: true },
      { name: "Penthouse", capacity: 4, beds: "2 King", price: 2800, available: true }
    ]
  },
  {
    _id: "barcelona-casa-camper",
    name: "Casa Camper Barcelona",
    description: "Quirky and sustainable boutique hotel in the heart of El Raval, featuring unique vertical rooms, a rooftop terrace, and complimentary 24-hour snacks.",
    location: { city: "Barcelona", country: "Spain", address: "Carrer d'Elisabets, 11, 08001 Barcelona" },
    coordinates: { lat: 41.3833, lng: 2.1699 },
    stars: 4,
    rating: 8.9,
    reviewCount: 1567,
    pricePerNight: 245,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?w=800"
    ],
    amenities: ["Free Snacks 24/7", "Rooftop Terrace", "Bikes", "Free WiFi", "Eco-Friendly"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Unique Design", "Free Snacks", "El Raval Location"],
    rooms: [
      { name: "Suite", capacity: 2, beds: "1 King", price: 245, available: true },
      { name: "Suite with Hammock", capacity: 2, beds: "1 King", price: 295, available: true }
    ]
  },
  // Sydney
  {
    _id: "sydney-park-hyatt",
    name: "Park Hyatt Sydney",
    description: "Occupying a prime position on Sydney Harbour, this intimate luxury hotel offers unobstructed views of the Opera House and Harbour Bridge from every room.",
    location: { city: "Sydney", country: "Australia", address: "7 Hickson Rd, The Rocks NSW 2000" },
    coordinates: { lat: -33.8571, lng: 151.2079 },
    stars: 5,
    rating: 9.4,
    reviewCount: 1876,
    pricePerNight: 795,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Pool", "Spa", "Fine Dining", "Butler Service", "Concierge", "Fitness Center", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Opera House Views", "Rooftop Pool", "Harbour Location"],
    rooms: [
      { name: "Opera View Room", capacity: 2, beds: "1 King", price: 795, available: true },
      { name: "Opera Suite", capacity: 3, beds: "1 King + Sofa", price: 1450, available: true },
      { name: "Sydney Suite", capacity: 4, beds: "2 King", price: 3500, available: true }
    ]
  },
  {
    _id: "sydney-qt",
    name: "QT Sydney",
    description: "A theatrical boutique hotel in a heritage building, QT Sydney blends Gothic architecture with playful design, vibrant colors, and a sense of whimsy.",
    location: { city: "Sydney", country: "Australia", address: "49 Market St, Sydney NSW 2000" },
    coordinates: { lat: -33.8723, lng: 151.2068 },
    stars: 4,
    rating: 8.7,
    reviewCount: 2345,
    pricePerNight: 285,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: ["Restaurant", "Bar", "Spa", "Fitness Center", "Free WiFi", "Concierge"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Heritage Building", "Quirky Design", "Central Location"],
    rooms: [
      { name: "QT King", capacity: 2, beds: "1 King", price: 285, available: true },
      { name: "QT Designer Suite", capacity: 2, beds: "1 King", price: 425, available: true },
      { name: "Director's Cut Suite", capacity: 3, beds: "1 King + Sofa", price: 595, available: true }
    ]
  },
  // Bali
  {
    _id: "bali-four-seasons-sayan",
    name: "Four Seasons Resort Bali at Sayan",
    description: "A dramatic riverside retreat in the heart of Bali's cultural heartland. Cross a dramatic suspension bridge to reach lotus-pond villas surrounded by rice terraces and jungle.",
    location: { city: "Ubud", country: "Indonesia", address: "Sayan, Ubud, Gianyar, Bali 80571" },
    coordinates: { lat: -8.5027, lng: 115.2455 },
    stars: 5,
    rating: 9.5,
    reviewCount: 1234,
    pricePerNight: 685,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
    ],
    amenities: ["Spa", "Pool", "Yoga", "Restaurant", "Butler Service", "Cooking Class", "Free WiFi"],
    propertyType: "resort",
    featured: true,
    highlights: ["Rice Terrace Views", "River Valley", "Award-Winning Spa"],
    rooms: [
      { name: "River View Suite", capacity: 2, beds: "1 King", price: 685, available: true },
      { name: "One-Bedroom Villa", capacity: 3, beds: "1 King + Sofa", price: 1250, available: true },
      { name: "Royal Villa", capacity: 4, beds: "2 King", price: 3500, available: true }
    ]
  },
  {
    _id: "bali-alila-uluwatu",
    name: "Alila Villas Uluwatu",
    description: "Perched on dramatic cliffs above the Indian Ocean, this award-winning eco-resort offers spectacular sunset views, infinity pools, and modern Balinese design.",
    location: { city: "Uluwatu", country: "Indonesia", address: "Jl. Belimbing Sari, Pecatu, Bali 80364" },
    coordinates: { lat: -8.8369, lng: 115.0853 },
    stars: 5,
    rating: 9.3,
    reviewCount: 987,
    pricePerNight: 595,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
    ],
    amenities: ["Private Pool", "Spa", "Yoga", "Fine Dining", "Cliffside Bar", "Butler Service", "Free WiFi"],
    propertyType: "villa",
    featured: false,
    highlights: ["Cliffside Location", "Private Pools", "Sustainable Luxury"],
    rooms: [
      { name: "One-Bedroom Villa", capacity: 2, beds: "1 King", price: 595, available: true },
      { name: "Two-Bedroom Villa", capacity: 4, beds: "2 King", price: 1150, available: true },
      { name: "Three-Bedroom Villa", capacity: 6, beds: "3 King", price: 2200, available: true }
    ]
  },
  // Maldives
  {
    _id: "maldives-soneva-fushi",
    name: "Soneva Fushi",
    description: "The original barefoot luxury resort, set on a private island with pristine beaches, world-class diving, and a commitment to sustainability and extraordinary experiences.",
    location: { city: "Baa Atoll", country: "Maldives", address: "Kunfunadhoo Island, Baa Atoll" },
    coordinates: { lat: 5.1109, lng: 73.0731 },
    stars: 5,
    rating: 9.7,
    reviewCount: 654,
    pricePerNight: 1450,
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800",
      "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800"
    ],
    amenities: ["Private Beach", "Spa", "Diving", "Observatory", "Cinema", "Butler Service", "Water Sports"],
    propertyType: "resort",
    featured: true,
    highlights: ["Private Island", "Stargazing Observatory", "No News, No Shoes"],
    rooms: [
      { name: "Beach Villa", capacity: 2, beds: "1 King", price: 1450, available: true },
      { name: "Water Villa", capacity: 2, beds: "1 King", price: 2100, available: true },
      { name: "Private Reserve", capacity: 8, beds: "4 King", price: 8500, available: true }
    ]
  },
  // Amsterdam
  {
    _id: "amsterdam-the-dylan",
    name: "The Dylan Amsterdam",
    description: "A refined boutique hotel in a 17th-century canal house, offering intimate luxury, Michelin-starred dining, and classic Dutch elegance in the Nine Streets district.",
    location: { city: "Amsterdam", country: "Netherlands", address: "Keizersgracht 384, 1016 GB Amsterdam" },
    coordinates: { lat: 52.3702, lng: 4.8875 },
    stars: 5,
    rating: 9.2,
    reviewCount: 876,
    pricePerNight: 485,
    images: [
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    amenities: ["Michelin Restaurant", "Garden", "Concierge", "Free WiFi", "Bar", "Room Service"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Canal Views", "Michelin Dining", "Historic Building"],
    rooms: [
      { name: "Luxury Room", capacity: 2, beds: "1 King", price: 485, available: true },
      { name: "Canal Suite", capacity: 2, beds: "1 King", price: 685, available: true },
      { name: "Dylan Suite", capacity: 3, beds: "1 King + Sofa", price: 985, available: true }
    ]
  },
  {
    _id: "amsterdam-hotel-v",
    name: "Hotel V Nesplein",
    description: "A stylish design hotel overlooking a vibrant square, featuring bold interiors, great food, and a prime location near Dam Square and the Red Light District.",
    location: { city: "Amsterdam", country: "Netherlands", address: "Nes 49, 1012 KD Amsterdam" },
    coordinates: { lat: 52.3715, lng: 4.8961 },
    stars: 4,
    rating: 8.6,
    reviewCount: 2134,
    pricePerNight: 215,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    amenities: ["Restaurant", "Bar", "Free WiFi", "Concierge", "Bike Rental"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Central Location", "Dutch Design", "Rooftop Terrace"],
    rooms: [
      { name: "Cosy Room", capacity: 2, beds: "1 Queen", price: 215, available: true },
      { name: "Comfy Room", capacity: 2, beds: "1 King", price: 265, available: true },
      { name: "Wow Suite", capacity: 3, beds: "1 King + Sofa", price: 385, available: true }
    ]
  },
  // Rome
  {
    _id: "rome-hotel-de-russie",
    name: "Hotel de Russie",
    description: "A legendary hotel between Piazza del Popolo and the Spanish Steps, featuring stunning terraced gardens, a secret garden restaurant, and timeless Italian elegance.",
    location: { city: "Rome", country: "Italy", address: "Via del Babuino, 9, 00187 Roma" },
    coordinates: { lat: 41.9094, lng: 12.4764 },
    stars: 5,
    rating: 9.3,
    reviewCount: 1654,
    pricePerNight: 595,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Spa", "Garden", "Fine Dining", "Bar", "Fitness Center", "Concierge", "Free WiFi"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Secret Garden", "Spanish Steps", "De Russie Spa"],
    rooms: [
      { name: "Classic Room", capacity: 2, beds: "1 King", price: 595, available: true },
      { name: "Garden Suite", capacity: 3, beds: "1 King + Sofa", price: 1150, available: true },
      { name: "Nijinsky Suite", capacity: 4, beds: "2 King", price: 3200, available: true }
    ]
  },
  {
    _id: "rome-chapter",
    name: "Chapter Roma",
    description: "A contemporary design hotel near Termini station, featuring art installations, a rooftop pool with panoramic views, and modern Italian hospitality.",
    location: { city: "Rome", country: "Italy", address: "Via di Santa Maria Maggiore, 73, 00185 Roma" },
    coordinates: { lat: 41.8969, lng: 12.4993 },
    stars: 4,
    rating: 8.8,
    reviewCount: 1876,
    pricePerNight: 245,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
    ],
    amenities: ["Rooftop Pool", "Restaurant", "Bar", "Fitness Center", "Free WiFi", "Concierge"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Rooftop Views", "Contemporary Art", "Great Location"],
    rooms: [
      { name: "Classic Room", capacity: 2, beds: "1 Queen", price: 245, available: true },
      { name: "Superior Room", capacity: 2, beds: "1 King", price: 325, available: true },
      { name: "Suite", capacity: 3, beds: "1 King + Sofa", price: 485, available: true }
    ]
  },
  // Santorini
  {
    _id: "santorini-canaves-oia",
    name: "Canaves Oia Epitome",
    description: "Ultra-luxury cave suites carved into Santorini's famous cliffs, offering private plunge pools, infinity views of the caldera, and the ultimate Greek island experience.",
    location: { city: "Santorini", country: "Greece", address: "Oia, Santorini 847 02" },
    coordinates: { lat: 36.4618, lng: 25.3753 },
    stars: 5,
    rating: 9.6,
    reviewCount: 567,
    pricePerNight: 785,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800"
    ],
    amenities: ["Private Pool", "Spa", "Fine Dining", "Butler Service", "Sunset Views", "Concierge", "Free WiFi"],
    propertyType: "boutique",
    featured: true,
    highlights: ["Caldera Views", "Cave Suites", "Infinity Pools"],
    rooms: [
      { name: "Epitome Suite", capacity: 2, beds: "1 King", price: 785, available: true },
      { name: "Grand Epitome Suite", capacity: 3, beds: "1 King + Sofa", price: 1250, available: true },
      { name: "Villa Epitome", capacity: 4, beds: "2 King", price: 2200, available: true }
    ]
  },
  // Singapore
  {
    _id: "singapore-marina-bay-sands",
    name: "Marina Bay Sands",
    description: "An architectural icon with the world's largest rooftop infinity pool, three towers connected by the SkyPark, and a casino, mall, and museum complex.",
    location: { city: "Singapore", country: "Singapore", address: "10 Bayfront Avenue, Singapore 018956" },
    coordinates: { lat: 1.2834, lng: 103.8607 },
    stars: 5,
    rating: 9.0,
    reviewCount: 8765,
    pricePerNight: 485,
    images: [
      "https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"
    ],
    amenities: ["Infinity Pool", "Casino", "Spa", "Multiple Restaurants", "Shopping Mall", "Museum", "Fitness Center"],
    propertyType: "hotel",
    featured: true,
    highlights: ["SkyPark Pool", "Iconic Architecture", "Celebrity Restaurants"],
    rooms: [
      { name: "Deluxe Room", capacity: 2, beds: "1 King", price: 485, available: true },
      { name: "Premier Room", capacity: 3, beds: "1 King + Sofa", price: 685, available: true },
      { name: "Chairman Suite", capacity: 4, beds: "2 King", price: 3500, available: true }
    ]
  },
  {
    _id: "singapore-raffles",
    name: "Raffles Singapore",
    description: "The legendary colonial hotel where the Singapore Sling was invented. Recently restored to its 1887 grandeur with all-suite accommodations and impeccable service.",
    location: { city: "Singapore", country: "Singapore", address: "1 Beach Road, Singapore 189673" },
    coordinates: { lat: 1.2949, lng: 103.8547 },
    stars: 5,
    rating: 9.4,
    reviewCount: 2134,
    pricePerNight: 895,
    images: [
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"
    ],
    amenities: ["Spa", "Pool", "Multiple Restaurants", "Long Bar", "Butler Service", "Fitness Center", "Concierge"],
    propertyType: "hotel",
    featured: false,
    highlights: ["Historic Landmark", "All-Suite Hotel", "Long Bar"],
    rooms: [
      { name: "Courtyard Suite", capacity: 2, beds: "1 King", price: 895, available: true },
      { name: "State Room Suite", capacity: 3, beds: "1 King + Sofa", price: 1450, available: true },
      { name: "Presidential Suite", capacity: 4, beds: "2 King", price: 5500, available: true }
    ]
  },
  // Miami
  {
    _id: "miami-faena",
    name: "Faena Hotel Miami Beach",
    description: "A theatrical beachfront palazzo by Alan Faena and Baz Luhrmann, featuring gilded interiors, a Damien Hirst mammoth skeleton, and glamorous Art Deco revival.",
    location: { city: "Miami", country: "United States", address: "3201 Collins Ave, Miami Beach, FL 33140" },
    coordinates: { lat: 25.8134, lng: -80.1225 },
    stars: 5,
    rating: 9.2,
    reviewCount: 1456,
    pricePerNight: 695,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Private Beach", "Spa", "Pool", "Fine Dining", "Theater", "Concierge", "Fitness Center"],
    propertyType: "hotel",
    featured: false,
    highlights: ["Art Collection", "Beach Club", "Faena Theater"],
    rooms: [
      { name: "Oceanfront Room", capacity: 2, beds: "1 King", price: 695, available: true },
      { name: "Faena Suite", capacity: 3, beds: "1 King + Sofa", price: 1450, available: true },
      { name: "Penthouse", capacity: 4, beds: "2 King", price: 4500, available: true }
    ]
  },
  {
    _id: "miami-standard-spa",
    name: "The Standard Spa Miami Beach",
    description: "A wellness-focused retreat on Belle Isle, featuring hydrotherapy pools, waterfront dining, and a laid-back vibe that embodies Miami's subtropical glamour.",
    location: { city: "Miami", country: "United States", address: "40 Island Ave, Miami Beach, FL 33139" },
    coordinates: { lat: 25.7843, lng: -80.1584 },
    stars: 4,
    rating: 8.5,
    reviewCount: 2345,
    pricePerNight: 285,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ],
    amenities: ["Spa", "Pool", "Yoga", "Restaurant", "Bar", "Kayaks", "Free WiFi"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Hydrotherapy", "Bay Views", "Wellness Focus"],
    rooms: [
      { name: "Garden Room", capacity: 2, beds: "1 Queen", price: 285, available: true },
      { name: "Waterfront Room", capacity: 2, beds: "1 King", price: 385, available: true },
      { name: "Suite", capacity: 3, beds: "1 King + Sofa", price: 545, available: true }
    ]
  },
  // Cape Town
  {
    _id: "cape-town-one-and-only",
    name: "One&Only Cape Town",
    description: "Set on its own private island in the V&A Waterfront, this urban resort offers views of Table Mountain, two celebrity chef restaurants, and sophisticated African luxury.",
    location: { city: "Cape Town", country: "South Africa", address: "Dock Road, V&A Waterfront, Cape Town 8001" },
    coordinates: { lat: -33.9075, lng: 18.4203 },
    stars: 5,
    rating: 9.4,
    reviewCount: 1234,
    pricePerNight: 545,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
    ],
    amenities: ["Spa", "Pool", "Fine Dining", "Private Island", "Fitness Center", "Concierge", "Free WiFi"],
    propertyType: "resort",
    featured: true,
    highlights: ["Table Mountain Views", "Private Marina", "Nobu Restaurant"],
    rooms: [
      { name: "Marina Room", capacity: 2, beds: "1 King", price: 545, available: true },
      { name: "Table Mountain Suite", capacity: 3, beds: "1 King + Sofa", price: 985, available: true },
      { name: "Presidential Suite", capacity: 4, beds: "2 King", price: 2800, available: true }
    ]
  },
  // Kyoto
  {
    _id: "kyoto-aman",
    name: "Aman Kyoto",
    description: "A secret garden estate hidden in the forested hills above Kyoto, where minimalist pavilions blend with moss-covered grounds and ancient stone walls.",
    location: { city: "Kyoto", country: "Japan", address: "Okitayama Washimine-cho, Kita-ku, Kyoto 603-8458" },
    coordinates: { lat: 35.0527, lng: 135.7488 },
    stars: 5,
    rating: 9.7,
    reviewCount: 432,
    pricePerNight: 1350,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    ],
    amenities: ["Spa", "Onsen", "Fine Dining", "Forest Walks", "Tea Ceremony", "Concierge", "Free WiFi"],
    propertyType: "resort",
    featured: true,
    highlights: ["Hidden Forest", "Natural Onsen", "Wabi-Sabi Design"],
    rooms: [
      { name: "Pavilion", capacity: 2, beds: "1 King", price: 1350, available: true },
      { name: "Hotaru Pavilion", capacity: 3, beds: "1 King + Futon", price: 1850, available: true },
      { name: "Washigamine Pavilion", capacity: 4, beds: "2 King", price: 2800, available: true }
    ]
  },
  // Iceland
  {
    _id: "iceland-blue-lagoon-retreat",
    name: "The Retreat at Blue Lagoon",
    description: "A subterranean luxury hotel built into an 800-year-old lava flow, offering private lagoon access, geothermal spa treatments, and otherworldly Icelandic landscapes.",
    location: { city: "Grindavik", country: "Iceland", address: "Norðurljósavegur 11, 240 Grindavík" },
    coordinates: { lat: 63.8792, lng: -22.4467 },
    stars: 5,
    rating: 9.6,
    reviewCount: 543,
    pricePerNight: 1650,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
    ],
    amenities: ["Private Lagoon", "Spa", "Geothermal Pool", "Fine Dining", "In-Water Bar", "Concierge", "Butler Service"],
    propertyType: "resort",
    featured: true,
    highlights: ["Private Lagoon Access", "Lava Landscape", "Geothermal Spa"],
    rooms: [
      { name: "Lagoon Suite", capacity: 2, beds: "1 King", price: 1650, available: true },
      { name: "Lava Suite", capacity: 2, beds: "1 King", price: 2200, available: true },
      { name: "Retreat Suite", capacity: 3, beds: "1 King + Sofa", price: 2800, available: true }
    ]
  },
  // Hong Kong
  {
    _id: "hong-kong-peninsula",
    name: "The Peninsula Hong Kong",
    description: "The 'Grande Dame of the Far East,' this legendary hotel has defined luxury hospitality in Asia since 1928 with its fleet of Rolls-Royces and impeccable service.",
    location: { city: "Hong Kong", country: "China", address: "Salisbury Road, Kowloon, Hong Kong" },
    coordinates: { lat: 22.2951, lng: 114.1722 },
    stars: 5,
    rating: 9.3,
    reviewCount: 3456,
    pricePerNight: 585,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"
    ],
    amenities: ["Spa", "Pool", "Multiple Restaurants", "Helipad", "Rolls-Royce Fleet", "Concierge", "Fitness Center"],
    propertyType: "hotel",
    featured: true,
    highlights: ["Iconic Landmark", "Harbour Views", "Helicopter Tours"],
    rooms: [
      { name: "Deluxe Room", capacity: 2, beds: "1 King", price: 585, available: true },
      { name: "Harbour View Suite", capacity: 3, beds: "1 King + Sofa", price: 1150, available: true },
      { name: "Peninsula Suite", capacity: 4, beds: "2 King", price: 4500, available: true }
    ]
  },
  // Budget options
  {
    _id: "amsterdam-citizenm",
    name: "CitizenM Amsterdam South",
    description: "A tech-forward boutique hotel with compact but cleverly designed rooms, mood lighting controlled by tablet, and lively communal spaces.",
    location: { city: "Amsterdam", country: "Netherlands", address: "Prinses Irenestraat 30, 1077 WX Amsterdam" },
    coordinates: { lat: 52.3413, lng: 4.8737 },
    stars: 3,
    rating: 8.4,
    reviewCount: 4567,
    pricePerNight: 145,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    amenities: ["Free WiFi", "24/7 Canteen", "Living Room", "iMacs", "Rain Shower"],
    propertyType: "hotel",
    featured: false,
    highlights: ["Smart Rooms", "Self Check-In", "Great Design"],
    rooms: [
      { name: "Standard Room", capacity: 2, beds: "1 King", price: 145, available: true }
    ]
  },
  {
    _id: "paris-mama-shelter",
    name: "Mama Shelter Paris",
    description: "A playful, design-driven hotel by Philippe Starck featuring bold colors, quirky details, and a vibrant restaurant and rooftop terrace scene.",
    location: { city: "Paris", country: "France", address: "109 Rue de Bagnolet, 75020 Paris" },
    coordinates: { lat: 48.8608, lng: 2.4019 },
    stars: 3,
    rating: 8.2,
    reviewCount: 3456,
    pricePerNight: 135,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800"
    ],
    amenities: ["Restaurant", "Bar", "Rooftop", "Free WiFi", "iMac in Room", "Ping Pong"],
    propertyType: "boutique",
    featured: false,
    highlights: ["Philippe Starck Design", "Rooftop Terrace", "Buzzing Restaurant"],
    rooms: [
      { name: "Small Room", capacity: 2, beds: "1 Double", price: 135, available: true },
      { name: "Medium Room", capacity: 2, beds: "1 Queen", price: 175, available: true },
      { name: "Large Room", capacity: 3, beds: "1 King", price: 225, available: true }
    ]
  },
  {
    _id: "singapore-yotel",
    name: "YOTEL Singapore",
    description: "A futuristic capsule-style hotel at Orchard Road, featuring robotic luggage storage, adjustable SmartBeds, and efficient use of every square inch.",
    location: { city: "Singapore", country: "Singapore", address: "366 Orchard Road, Singapore 238904" },
    coordinates: { lat: 1.3044, lng: 103.8318 },
    stars: 3,
    rating: 8.3,
    reviewCount: 2876,
    pricePerNight: 155,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=800"
    ],
    amenities: ["Free WiFi", "Gym", "Rooftop Pool", "Restaurant", "Robotic Luggage"],
    propertyType: "hotel",
    featured: false,
    highlights: ["Orchard Road", "Smart Technology", "Rooftop Pool"],
    rooms: [
      { name: "Premium Queen Cabin", capacity: 2, beds: "1 Queen", price: 155, available: true },
      { name: "VIP Suite", capacity: 2, beds: "1 King", price: 225, available: true }
    ]
  }
];

// Get destinations aggregation
export const getDestinations = () => {
  const destinationMap = {};
  
  hotels.forEach(hotel => {
    const key = `${hotel.location.city}-${hotel.location.country}`;
    if (!destinationMap[key]) {
      destinationMap[key] = {
        city: hotel.location.city,
        country: hotel.location.country,
        hotelCount: 0,
        totalPrice: 0,
        image: hotel.images[0]
      };
    }
    destinationMap[key].hotelCount++;
    destinationMap[key].totalPrice += hotel.pricePerNight;
  });
  
  return Object.values(destinationMap)
    .map(d => ({
      ...d,
      avgPrice: Math.round(d.totalPrice / d.hotelCount)
    }))
    .sort((a, b) => b.hotelCount - a.hotelCount)
    .slice(0, 6);
};

// Get featured hotels
export const getFeaturedHotels = () => {
  return hotels.filter(h => h.featured).sort((a, b) => b.rating - a.rating);
};

// Get hotel by ID
export const getHotelById = (id) => {
  return hotels.find(h => h._id === id);
};

// Get similar hotels
export const getSimilarHotels = (id) => {
  const hotel = getHotelById(id);
  if (!hotel) return [];
  
  return hotels
    .filter(h => 
      h._id !== id && 
      h.location.city === hotel.location.city
    )
    .slice(0, 4);
};

// Search hotels with filters
export const searchHotels = ({
  destination,
  minPrice,
  maxPrice,
  stars,
  amenities,
  propertyType,
  sort = 'rating',
  page = 1,
  limit = 12
}) => {
  let filtered = [...hotels];
  
  // Destination filter
  if (destination) {
    const searchTerm = destination.toLowerCase();
    filtered = filtered.filter(h => 
      h.location.city.toLowerCase().includes(searchTerm) ||
      h.location.country.toLowerCase().includes(searchTerm)
    );
  }
  
  // Price filter
  if (minPrice) {
    filtered = filtered.filter(h => h.pricePerNight >= Number(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter(h => h.pricePerNight <= Number(maxPrice));
  }
  
  // Stars filter
  if (stars && stars.length) {
    const starArray = typeof stars === 'string' ? stars.split(',').map(Number) : stars;
    filtered = filtered.filter(h => starArray.includes(h.stars));
  }
  
  // Amenities filter
  if (amenities && amenities.length) {
    const amenityArray = typeof amenities === 'string' ? amenities.split(',') : amenities;
    filtered = filtered.filter(h => 
      amenityArray.every(a => h.amenities.includes(a))
    );
  }
  
  // Property type filter
  if (propertyType && propertyType.length) {
    const typeArray = typeof propertyType === 'string' ? propertyType.split(',') : propertyType;
    filtered = filtered.filter(h => typeArray.includes(h.propertyType));
  }
  
  // Sorting
  switch (sort) {
    case 'price-low':
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case 'stars':
      filtered.sort((a, b) => b.stars - a.stars);
      break;
    case 'rating':
    default:
      filtered.sort((a, b) => b.rating - a.rating);
  }
  
  // Pagination
  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedHotels = filtered.slice(start, start + limit);
  
  return {
    hotels: paginatedHotels,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages
    }
  };
};

export default hotels;
