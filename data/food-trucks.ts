import type { FoodTruck } from "@/types/food-truck"

// coordinates for Minneapolis/St. Paul area
const MINNEAPOLIS_COORDS = {
  latitude: 44.9778,
  longitude: -93.2650
}

const ST_PAUL_COORDS = {
  latitude: 44.9537,
  longitude: -93.0900
}

export const foodTrucks: FoodTruck[] = [
  {
    id: "1",
    name: "Taco Delights",
    description:
      "Authentic Mexican street tacos with a modern twist. We use fresh, locally-sourced ingredients and homemade salsas.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 124,
    distance: 0.3,
    location: "Nicollet Mall, Downtown Minneapolis",
    coordinates: {
      latitude: 44.9778,
      longitude: -93.2682
    },
    tags: ["Mexican", "Tacos", "Burritos", "Quesadillas"],
    phone: "(612) 123-4567",
    website: "https://tacodelights.com",
    instagram: "@tacodelights",
    twitter: "@tacodelights",
    priceRange: "$",
    isOpen: true,
    isPopular: true,
    specialOffer: "Happy Hour: 2 tacos for $5 (3-5pm)",
    menuItems: [
      { name: "Classic Taco", price: 4.99, description: "Corn tortilla, seasoned beef, lettuce, cheese, salsa" },
      {
        name: "Veggie Burrito",
        price: 8.99,
        description: "Flour tortilla, rice, beans, grilled vegetables, guacamole",
      },
      {
        name: "Chicken Quesadilla",
        price: 7.99,
        description: "Flour tortilla, grilled chicken, cheese, peppers, onions",
      },
      {
        name: "Nachos Supreme",
        price: 9.99,
        description: "Tortilla chips, beef, beans, cheese, guacamole, sour cream, jalapeños",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "John D.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 days ago",
        text: "Best tacos in Minneapolis! The salsa verde is amazing.",
      },
      {
        id: "r2",
        userName: "Sarah M.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 week ago",
        text: "Great food but had to wait a bit too long.",
      },
      {
        id: "r3",
        userName: "Mike R.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        text: "Authentic flavors and generous portions. Will definitely be back!",
      },
    ],
    upcomingSchedule: [
      {
        date: "Mon, Apr 7, 2025",
        hours: "11:00 AM - 8:00 PM",
        location: "Nicollet Mall, Downtown Minneapolis",
        coordinates: {
          latitude: 44.9778,
          longitude: -93.2682
        }
      },
      {
        date: "Wed, Apr 9, 2025",
        hours: "11:00 AM - 8:00 PM",
        location: "Loring Park, Minneapolis",
        coordinates: {
          latitude: 44.9690,
          longitude: -93.2850
        },
        notes: "Part of the Midweek Food Truck Festival"
      },
      {
        date: "Fri, Apr 11, 2025",
        hours: "4:00 PM - 10:00 PM",
        location: "Northeast Minneapolis Brewery District",
        coordinates: {
          latitude: 45.0020,
          longitude: -93.2650
        },
        notes: "Live music from 6-9pm"
      },
      {
        date: "Sat, Apr 12, 2025",
        hours: "11:00 AM - 9:00 PM",
        location: "Lake Calhoun, Minneapolis",
        coordinates: {
          latitude: 44.9495,
          longitude: -93.3102
        }
      }
    ]
  },
  {
    id: "2",
    name: "Burger Boss",
    description:
      "Gourmet burgers made with 100% grass-fed beef and artisanal buns. Try our signature Boss Burger with special sauce!",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviewCount: 98,
    distance: 0.7,
    location: "Uptown, Minneapolis",
    coordinates: {
      latitude: 44.9490,
      longitude: -93.3008
    },
    tags: ["American", "Burgers", "Fries", "Shakes"],
    phone: "(612) 234-5678",
    website: "https://burgerboss.com",
    instagram: "@burgerboss",
    twitter: "@burgerboss",
    priceRange: "$$",
    isOpen: true,
    isPopular: true,
    specialOffer: null,
    menuItems: [
      {
        name: "Classic Burger",
        price: 9.99,
        description: "Beef patty, lettuce, tomato, onion, pickles, special sauce",
      },
      {
        name: "Cheese Burger",
        price: 10.99,
        description: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles",
      },
      { name: "Veggie Burger", price: 8.99, description: "Plant-based patty, lettuce, tomato, onion, vegan mayo" },
      {
        name: "Loaded Fries",
        price: 5.99,
        description: "Crispy fries topped with cheese, bacon bits, and green onions",
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alex T.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 days ago",
        text: "Juicy burgers and crispy fries. Perfect combo!",
      },
      {
        id: "r2",
        userName: "Emma L.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 week ago",
        text: "Good burgers but a bit pricey.",
      },
      {
        id: "r3",
        userName: "David K.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 weeks ago",
        text: "Best burger I've had in the Twin Cities. The special sauce is amazing!",
      },
    ],
    upcomingSchedule: [
      {
        date: "Tue, Apr 8, 2025",
        hours: "11:00 AM - 7:00 PM",
        location: "Downtown St. Paul, Mears Park",
        coordinates: {
          latitude: 44.9486,
          longitude: -93.0850
        }
      },
      {
        date: "Thu, Apr 10, 2025",
        hours: "11:00 AM - 8:00 PM",
        location: "University of Minnesota Campus",
        coordinates: {
          latitude: 44.9740,
          longitude: -93.2277
        }
      },
      {
        date: "Sat, Apr 12, 2025",
        hours: "9:00 AM - 2:00 PM",
        location: "St. Paul Farmers Market",
        coordinates: {
          latitude: 44.9522,
          longitude: -93.0873
        },
        notes: "Special breakfast menu available until 11am"
      }
    ]
  },
  {
    id: "3",
    name: "Sushi Roll",
    description:
      "Fresh, made-to-order sushi rolls with premium ingredients. We offer traditional Japanese favorites and creative fusion rolls.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 87,
    distance: 1.2,
    location: "Lowertown, St. Paul",
    coordinates: {
      latitude: 44.9482,
      longitude: -93.0875
    },
    tags: ["Japanese", "Sushi", "Asian", "Seafood"],
    phone: "(651) 345-6789",
    website: "https://sushiroll.com",
    instagram: "@sushiroll",
    twitter: "@sushiroll",
    priceRange: "$$$",
    isOpen: false,
    isPopular: false,
    specialOffer: null,
    menuItems: [
      { name: "California Roll", price: 7.99, description: "Crab, avocado, cucumber, tobiko" },
      { name: "Spicy Tuna Roll", price: 8.99, description: "Spicy tuna, cucumber, green onion" },
      { name: "Dragon Roll", price: 12.99, description: "Eel, crab, avocado, cucumber, eel sauce" },
      { name: "Miso Soup", price: 3.99, description: "Traditional Japanese soup with tofu and seaweed" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Lisa W.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 day ago",
        text: "Fresh and delicious sushi. The dragon roll is a must-try!",
      },
      {
        id: "r2",
        userName: "Kevin J.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2 weeks ago",
        text: "Good quality sushi at reasonable prices.",
      },
      {
        id: "r3",
        userName: "Sophia C.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        text: "Authentic flavors and beautiful presentation. Will definitely return!",
      },
    ],
    upcomingSchedule: [
      {
        date: "Mon, Apr 7, 2025",
        hours: "11:30 AM - 7:30 PM",
        location: "Downtown Minneapolis, Government Center",
        coordinates: {
          latitude: 44.9760,
          longitude: -93.2650
        }
      },
      {
        date: "Wed, Apr 9, 2025",
        hours: "11:30 AM - 7:30 PM",
        location: "Uptown Minneapolis, Lake & Hennepin",
        coordinates: {
          latitude: 44.9482,
          longitude: -93.2982
        }
      },
      {
        date: "Fri, Apr 11, 2025",
        hours: "5:00 PM - 10:00 PM",
        location: "Northeast Food Truck Rally",
        coordinates: {
          latitude: 45.0020,
          longitude: -93.2650
        },
        notes: "Part of the Friday Night Food Truck Rally"
      }
    ]
  },
  {
    id: "4",
    name: "Pizza Express",
    description:
      "Wood-fired artisan pizzas made with our signature dough and fresh toppings. From classic Margherita to creative specialties.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviewCount: 112,
    distance: 0.9,
    location: "Northeast Minneapolis",
    coordinates: {
      latitude: 45.0020,
      longitude: -93.2638
    },
    tags: ["Italian", "Pizza", "Vegetarian", "Pasta"],
    phone: "(612) 456-7890",
    website: "https://pizzaexpress.com",
    instagram: "@pizzaexpress",
    twitter: "@pizzaexpress",
    priceRange: "$$",
    isOpen: true,
    isPopular: false,
    specialOffer: "Family Deal: Large pizza, garlic bread, and 2 sodas for $24.99",
    menuItems: [
      { name: "Margherita", price: 12.99, description: "Tomato sauce, fresh mozzarella, basil" },
      { name: "Pepperoni", price: 14.99, description: "Tomato sauce, mozzarella, pepperoni" },
      { name: "Veggie Supreme", price: 15.99, description: "Tomato sauce, mozzarella, bell peppers, onions, mushrooms, olives" },
      { name: "Garlic Bread", price: 4.99, description: "Freshly baked bread with garlic butter and herbs" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Robert B.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "4 days ago",
        text: "Authentic Italian pizza right here in Minneapolis. The crust is perfect!",
      },
      {
        id: "r2",
        userName: "Jennifer K.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2 weeks ago",
        text: "Delicious pizza but a bit on the pricey side.",
      },
      {
        id: "r3",
        userName: "Thomas L.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        text: "Best pizza in Northeast! The wood-fired flavor makes all the difference.",
      },
    ],
    upcomingSchedule: [
      {
        date: "Tue, Apr 8, 2025",
        hours: "11:00 AM - 2:00 PM",
        location: "Mayo Clinic Square, Minneapolis",
        coordinates: {
          latitude: 44.9790,
          longitude: -93.2760
        }
      },
      {
        date: "Thu, Apr 10, 2025",
        hours: "11:00 AM - 2:00 PM",
        location: "Downtown Minneapolis, Marquette Ave",
        coordinates: {
          latitude: 44.9770,
          longitude: -93.2700
        }
      },
      {
        date: "Sat, Apr 12, 2025",
        hours: "11:00 AM - 8:00 PM",
        location: "Mill City Farmers Market",
        coordinates: {
          latitude: 44.9800,
          longitude: -93.2560
        }
      },
      {
        date: "Sun, Apr 13, 2025",
        hours: "10:00 AM - 3:00 PM",
        location: "Linden Hills Farmers Market",
        coordinates: {
          latitude: 44.9230,
          longitude: -93.3150
        },
        notes: "Special brunch menu available"
      }
    ]
  },
  {
    id: "5",
    name: "Sweet Treats",
    description:
      "Handcrafted desserts and pastries made fresh daily. From classic cookies to innovative ice cream creations.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviewCount: 76,
    distance: 1.5,
    location: "Grand Avenue, St. Paul",
    coordinates: {
      latitude: 44.9399,
      longitude: -93.1365
    },
    tags: ["Desserts", "Ice Cream", "Bakery", "Coffee"],
    phone: "(651) 567-8901",
    website: "https://sweettreats.com",
    instagram: "@sweettreats",
    twitter: "@sweettreats",
    priceRange: "$$",
    isOpen: true,
    isPopular: true,
    specialOffer: "Buy one cupcake, get one 50% off (weekdays only)",
    menuItems: [
      { name: "Classic Chocolate Chip Cookie", price: 2.99, description: "Warm, gooey chocolate chip cookie" },
      { name: "Red Velvet Cupcake", price: 3.99, description: "Moist red velvet cake with cream cheese frosting" },
      { name: "Artisan Ice Cream Scoop", price: 4.99, description: "Handcrafted ice cream in various flavors" },
      { name: "Brownie Sundae", price: 6.99, description: "Warm brownie topped with ice cream, whipped cream, and chocolate sauce" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Emily R.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 days ago",
        text: "The red velvet cupcakes are to die for! Best in St. Paul.",
      },
      {
        id: "r2",
        userName: "Michael P.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 week ago",
        text: "Amazing desserts and friendly service. The ice cream is homemade and delicious!",
      },
      {
        id: "r3",
        userName: "Amanda G.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "3 weeks ago",
        text: "Great treats but limited seating. Definitely worth the wait though!",
      },
    ],
    upcomingSchedule: [
      {
        date: "Mon, Apr 7, 2025",
        hours: "3:00 PM - 9:00 PM",
        location: "Minnehaha Park, Minneapolis",
        coordinates: {
          latitude: 44.9150,
          longitude: -93.2110
        }
      },
      {
        date: "Wed, Apr 9, 2025",
        hours: "3:00 PM - 9:00 PM",
        location: "Lake Nokomis, Minneapolis",
        coordinates: {
          latitude: 44.9080,
          longitude: -93.2470
        }
      },
      {
        date: "Fri, Apr 11, 2025 - Sun, Apr 13, 2025",
        hours: "12:00 PM - 10:00 PM",
        location: "Harriet Island, St. Paul",
        coordinates: {
          latitude: 44.9380,
          longitude: -93.0980
        },
        notes: "Part of the Spring Food Festival"
      }
    ]
  },
  {
    id: "6",
    name: "Minnesota Poutine",
    description:
      "Canadian-inspired poutine with a Minnesota twist. Fresh-cut fries, local cheese curds, and signature gravies.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 92,
    distance: 0.8,
    location: "Dinkytown, Minneapolis",
    coordinates: {
      latitude: 44.9807,
      longitude: -93.2366
    },
    tags: ["Canadian", "Poutine", "Comfort Food", "Fries"],
    phone: "(612) 678-9012",
    website: "https://mnpoutine.com",
    instagram: "@mnpoutine",
    twitter: "@mnpoutine",
    priceRange: "$$",
    isOpen: true,
    isPopular: true,
    specialOffer: null,
    menuItems: [
      { name: "Classic Poutine", price: 8.99, description: "Fries, cheese curds, brown gravy" },
      { name: "Loaded Poutine", price: 11.99, description: "Fries, cheese curds, gravy, bacon, green onions, sour cream" },
      { name: "Buffalo Chicken Poutine", price: 12.99, description: "Fries, cheese curds, gravy, buffalo chicken, ranch drizzle" },
      { name: "Vegetarian Mushroom Poutine", price: 10.99, description: "Fries, cheese curds, mushroom gravy, caramelized onions" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Jason M.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "3 days ago",
        text: "Authentic poutine right here in Minneapolis! The cheese curds are perfectly squeaky.",
      },
      {
        id: "r2",
        userName: "Lauren B.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "2 weeks ago",
        text: "Delicious comfort food. The buffalo chicken poutine is amazing!",
      },
      {
        id: "r3",
        userName: "Chris W.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 month ago",
        text: "Best poutine in the Twin Cities. Great for a late-night snack!",
      },
    ],
    upcomingSchedule: [
      {
        date: "Tue, Apr 8, 2025",
        hours: "11:00 AM - 7:00 PM",
        location: "Downtown Minneapolis, Nicollet Mall",
        coordinates: {
          latitude: 44.9778,
          longitude: -93.2682
        }
      },
      {
        date: "Thu, Apr 10, 2025",
        hours: "11:00 AM - 7:00 PM",
        location: "North Loop, Minneapolis",
        coordinates: {
          latitude: 44.9895,
          longitude: -93.2750
        }
      },
      {
        date: "Sat, Apr 12, 2025 - Sun, Apr 13, 2025",
        hours: "10:00 AM - 6:00 PM",
        location: "Midtown Global Market",
        coordinates: {
          latitude: 44.9480,
          longitude: -93.2610
        },
        notes: "Special weekend menu with new seasonal items"
      }
    ]
  },
  {
    id: "7",
    name: "Nordic Waffles",
    description:
      "Authentic Scandinavian-style waffles with sweet and savory toppings. A taste of Nordic tradition in the Twin Cities.",
    image: "/placeholder.svg?height=400&width=600",
    logo: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 68,
    distance: 1.1,
    location: "Midtown Global Market, Minneapolis",
    coordinates: {
      latitude: 44.9486,
      longitude: -93.2606
    },
    tags: ["Scandinavian", "Waffles", "Breakfast", "Dessert"],
    phone: "(612) 789-0123",
    website: "https://nordicwaffles.com",
    instagram: "@nordicwaffles",
    twitter: "@nordicwaffles",
    priceRange: "$$",
    isOpen: true,
    isPopular: false,
    specialOffer: "Weekend special: Buy 2 waffles, get a coffee free",
    menuItems: [
      { name: "Classic Nordic Waffle", price: 6.99, description: "Traditional thin waffle with butter and sugar" },
      { name: "Berries & Cream Waffle", price: 8.99, description: "Waffle topped with fresh berries and whipped cream" },
      { name: "Smoked Salmon Waffle", price: 10.99, description: "Savory waffle with smoked salmon, cream cheese, and dill" },
      { name: "S'mores Waffle", price: 9.99, description: "Waffle with chocolate, marshmallow, and graham cracker crumbs" },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Olivia S.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "1 week ago",
        text: "Authentic Nordic waffles that remind me of my trip to Norway! Delicious!",
      },
      {
        id: "r2",
        userName: "Nathan P.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "2 weeks ago",
        text: "The perfect balance of sweet and savory options. The salmon waffle is incredible!",
      },
      {
        id: "r3",
        userName: "Kaitlyn R.",
        userImage: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "1 month ago",
        text: "Unique concept and tasty waffles. A bit pricey but worth it for the quality.",
      },
    ],
    upcomingSchedule: [
      {
        date: "Mon, Apr 7, 2025",
        hours: "7:00 AM - 2:00 PM",
        location: "Downtown Minneapolis, 5th & Nicollet",
        coordinates: {
          latitude: 44.9778,
          longitude: -93.2682
        }
      },
      {
        date: "Wed, Apr 9, 2025",
        hours: "7:00 AM - 2:00 PM",
        location: "Downtown St. Paul, Rice Park",
        coordinates: {
          latitude: 44.9445,
          longitude: -93.0960
        }
      },
      {
        date: "Sat, Apr 12, 2025",
        hours: "8:00 AM - 3:00 PM",
        location: "Minneapolis Farmers Market",
        coordinates: {
          latitude: 44.9840,
          longitude: -93.2880
        },
        notes: "Featuring special weekend-only menu items"
      }
    ]
  }
]
