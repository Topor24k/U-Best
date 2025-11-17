// ============================================
// PRODUCTS DATABASE
// ============================================

const allProducts = [
    // ============================================
    // BAKING MACHINES & BAKERY EQUIPMENT (8 items)
    // ============================================
    {
        id: 1,
        name: "Belgian Double Waffle Maker",
        category: "baking-machines",
        price: 85000,
        oldPrice: 95000,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Professional double waffle maker with temperature control",
        rating: 4.5,
        stock: 8,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Maria Santos", location: "Davao City", rating: 5, comment: "Excellent quality! Makes perfect waffles every time. Worth every peso!", date: "2025-11-10", verified: true },
            { user: "Juan Dela Cruz", location: "CDO", rating: 4, comment: "Good product but takes time to heat up. Overall satisfied with the purchase.", date: "2025-11-05", verified: true },
            { user: "Lisa Reyes", location: "GenSan", rating: 5, comment: "Best investment for my waffle business! Customers love the Belgian-style waffles.", date: "2025-10-28", verified: true },
            { user: "Robert Tan", location: "Butuan", rating: 4, comment: "Solid build quality. Easy to clean and maintain.", date: "2025-10-15", verified: false }
        ]
    },
    {
        id: 2,
        name: "3 in 1 Burger-Fryer-Steamer",
        category: "baking-machines",
        price: 32500,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Multi-functional equipment for burger, frying, and steaming",
        rating: 5.0,
        stock: 12,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Ana Cruz", location: "Davao City", rating: 5, comment: "Space-saver! Perfect for my small food cart. Does everything!", date: "2025-11-12", verified: true },
            { user: "Pedro Santos", location: "Zamboanga", rating: 5, comment: "Very versatile equipment. Great value for money!", date: "2025-11-08", verified: true },
            { user: "Carmen Lopez", location: "Iligan", rating: 5, comment: "My customers are amazed! Quality is superb.", date: "2025-11-01", verified: true }
        ]
    },
    {
        id: 3,
        name: "Burger Griddle",
        category: "baking-machines",
        price: 45000,
        oldPrice: 52000,
        image: "Photo/Burger Griddle.jpg",
        description: "Professional griddle for burgers and grilled sandwiches",
        rating: 4.0,
        stock: 5,
        available: true,
        badge: "hot",
        station: "best-deals",
        reviews: [
            { user: "Mike Torres", location: "Davao City", rating: 4, comment: "Heats evenly and quickly. Perfect for my burger stall.", date: "2025-11-09", verified: true },
            { user: "Jenny Aquino", location: "CDO", rating: 4, comment: "Good quality griddle. A bit heavy but very durable.", date: "2025-10-30", verified: true }
        ]
    },
    {
        id: 4,
        name: "2 x 16 Siomai Steamer",
        category: "baking-machines",
        price: 38000,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Double-deck steamer with 16-basket capacity per deck",
        rating: 4.6,
        stock: 10,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Grace Fernandez", location: "GenSan", rating: 5, comment: "Perfect for my siomai business! Can steam 32 baskets at once!", date: "2025-11-11", verified: true },
            { user: "Danny Reyes", location: "Davao City", rating: 4, comment: "Good steamer. Water reservoir could be bigger.", date: "2025-11-03", verified: true },
            { user: "Susan Villa", location: "Butuan", rating: 5, comment: "Excellent quality! Steams evenly without burning.", date: "2025-10-25", verified: true }
        ]
    },
    {
        id: 5,
        name: "3 x 16 Siomai Steamer",
        category: "baking-machines",
        price: 55000,
        oldPrice: 72000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Triple-deck steamer with 16-basket capacity per deck",
        rating: 4.8,
        stock: 6,
        available: true,
        badge: "sale",
        station: "pautang-deals",
        reviews: [
            { user: "Rico Manalo", location: "CDO", rating: 5, comment: "Amazing! Can handle 48 baskets. Perfect for high volume!", date: "2025-11-13", verified: true },
            { user: "Beth Santiago", location: "Davao City", rating: 5, comment: "Best purchase ever! Tripled my production capacity.", date: "2025-11-06", verified: true },
            { user: "Mark Castillo", location: "Iligan", rating: 4, comment: "Great steamer but needs good ventilation. Very powerful!", date: "2025-10-20", verified: true }
        ]
    },
    {
        id: 6,
        name: "Big Single Deep Fryer",
        category: "baking-machines",
        price: 28000,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Large capacity deep fryer with temperature control",
        rating: 4.2,
        stock: 15,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Tony Ramos", location: "Zamboanga", rating: 4, comment: "Large capacity, heats oil quickly. Perfect for fried chicken!", date: "2025-11-07", verified: true },
            { user: "Nora Gonzales", location: "GenSan", rating: 4, comment: "Good fryer. Temperature control is accurate.", date: "2025-10-29", verified: true }
        ]
    },
    {
        id: 7,
        name: "Industrial Deck Oven (3 Deck)",
        category: "baking-machines",
        price: 125000,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Professional 3-deck oven for bakeries and restaurants",
        rating: 4.9,
        stock: 3,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Chef Antonio", location: "Davao City", rating: 5, comment: "Professional grade! Bakes perfectly every time. Temperature control is precise.", date: "2025-11-14", verified: true },
            { user: "Rosa's Bakery", location: "CDO", rating: 5, comment: "Best oven we've ever owned! Worth the investment!", date: "2025-11-04", verified: true },
            { user: "Miguel Bakeshop", location: "GenSan", rating: 5, comment: "Increased our production by 300%! Amazing quality.", date: "2025-10-22", verified: true },
            { user: "Linda Tan", location: "Butuan", rating: 4, comment: "Excellent oven but requires professional installation.", date: "2025-10-10", verified: true }
        ]
    },
    {
        id: 8,
        name: "Planetary Mixer 20L",
        category: "baking-machines",
        price: 42000,
        oldPrice: 48000,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Heavy-duty 20-liter planetary mixer with multiple attachments",
        rating: 4.7,
        stock: 8,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Baker's Corner", location: "Davao City", rating: 5, comment: "Powerful motor! Mixes dough perfectly without strain.", date: "2025-11-12", verified: true },
            { user: "Emma Cruz", location: "Iligan", rating: 5, comment: "Great mixer! Comes with whisk, hook, and paddle attachments.", date: "2025-11-02", verified: true },
            { user: "Sam Bakery", location: "CDO", rating: 4, comment: "Good quality but a bit noisy. Does the job well!", date: "2025-10-18", verified: true }
        ]
    },
    {
        id: 9,
        name: "Dough Sheeter Machine",
        category: "baking-machines",
        price: 68000,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Professional dough sheeter for pastries and pizza",
        rating: 4.5,
        stock: 5,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Pizza Hub", location: "Davao City", rating: 5, comment: "Makes pizza dough prep so easy! Consistent thickness every time.", date: "2025-11-15", verified: true },
            { user: "Sweet Treats", location: "GenSan", rating: 4, comment: "Perfect for croissants and puff pastry. Well built!", date: "2025-11-08", verified: true },
            { user: "Joe's Bakeshop", location: "Zamboanga", rating: 4, comment: "Good machine. Takes practice to master but worth it.", date: "2025-10-27", verified: false }
        ]
    },
    {
        id: 10,
        name: "Commercial Gas Range 4 Burner",
        category: "baking-machines",
        price: 35000,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Heavy-duty 4-burner gas range for commercial kitchens",
        rating: 4.6,
        stock: 12,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Carinderia Ni Ate", location: "CDO", rating: 5, comment: "Sturdy and reliable! Handles multiple pots without issues.", date: "2025-11-10", verified: true },
            { user: "Food Court Stall", location: "Davao City", rating: 4, comment: "Good commercial range. Flames are strong and consistent.", date: "2025-11-01", verified: true }
        ]
    },
    {
        id: 11,
        name: "Convection Oven Electric",
        category: "baking-machines",
        price: 58000,
        oldPrice: 65000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Electric convection oven with fan for even baking",
        rating: 4.7,
        stock: 7,
        available: true,
        badge: "sale",
        station: "pautang-deals",
        reviews: [
            { user: "Cupcake Central", location: "GenSan", rating: 5, comment: "Bakes evenly! My cupcakes come out perfect every batch.", date: "2025-11-13", verified: true },
            { user: "Bread House", location: "Butuan", rating: 5, comment: "Temperature is very accurate. Energy efficient too!", date: "2025-11-05", verified: true },
            { user: "Angel's Pastries", location: "Davao City", rating: 4, comment: "Good oven for the price. Highly recommended!", date: "2025-10-24", verified: true }
        ]
    },
    {
        id: 12,
        name: "Donut Fryer Machine",
        category: "baking-machines",
        price: 32000,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Automatic donut fryer with temperature control",
        rating: 4.4,
        stock: 9,
        available: true,
        badge: "hot",
        station: "best-deals",
        reviews: [
            { user: "Donut King", location: "CDO", rating: 5, comment: "Makes frying donuts so much easier! Consistent results.", date: "2025-11-11", verified: true },
            { user: "Sweet Donuts", location: "Iligan", rating: 4, comment: "Good machine. Oil capacity could be bigger.", date: "2025-10-30", verified: true }
        ]
    },
    {
        id: 13,
        name: "Bread Slicer Machine",
        category: "baking-machines",
        price: 18500,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Electric bread slicer with adjustable thickness",
        rating: 4.3,
        stock: 14,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Daily Bread", location: "Davao City", rating: 4, comment: "Slices bread uniformly. Saves a lot of time!", date: "2025-11-09", verified: true },
            { user: "Pan de Sal Corner", location: "GenSan", rating: 4, comment: "Good slicer for the price. Easy to clean.", date: "2025-10-28", verified: true }
        ]
    },
    {
        id: 14,
        name: "Display Warmer Showcase",
        category: "baking-machines",
        price: 22000,
        oldPrice: 28000,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Heated display showcase for breads and pastries",
        rating: 4.5,
        stock: 6,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Corner Bakery", location: "Butuan", rating: 5, comment: "Keeps bread warm and fresh looking! Customers love seeing the products.", date: "2025-11-14", verified: true },
            { user: "Pastry Shop", location: "CDO", rating: 4, comment: "Nice showcase. Good lighting. Attracts customers!", date: "2025-11-06", verified: true }
        ]
    },
    {
        id: 15,
        name: "Pizza Oven Gas",
        category: "baking-machines",
        price: 48000,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Gas-fired pizza oven for authentic pizzeria results",
        rating: 4.8,
        stock: 4,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Pizzeria Antonio", location: "Davao City", rating: 5, comment: "Makes authentic Neapolitan pizza! Reaches high temps quickly.", date: "2025-11-15", verified: true },
            { user: "Pizza Express", location: "GenSan", rating: 5, comment: "Best pizza oven! Crust comes out perfect every time.", date: "2025-11-07", verified: true },
            { user: "Italian Kitchen", location: "CDO", rating: 5, comment: "Professional quality! Worth every peso!", date: "2025-10-26", verified: true }
        ]
    },
    {
        id: 16,
        name: "Soft Ice Cream Machine",
        category: "baking-machines",
        price: 72000,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "3-flavor soft serve ice cream machine",
        rating: 4.6,
        stock: 5,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Ice Cream Paradise", location: "Iligan", rating: 5, comment: "Customers love it! Makes smooth creamy ice cream.", date: "2025-11-12", verified: true },
            { user: "Dessert Station", location: "Zamboanga", rating: 4, comment: "Good machine. Needs regular cleaning but worth it!", date: "2025-11-03", verified: true }
        ]
    },
    {
        id: 17,
        name: "Cake Display Chiller",
        category: "baking-machines",
        price: 55000,
        oldPrice: 62000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Glass cake display refrigerator with LED lights",
        rating: 4.7,
        stock: 0,
        available: false,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Cake Gallery", location: "Davao City", rating: 5, comment: "Beautiful display! Keeps cakes at perfect temperature.", date: "2025-11-08", verified: true },
            { user: "Sweet Moments", location: "CDO", rating: 5, comment: "LED lights make cakes look amazing! Great investment.", date: "2025-10-31", verified: true }
        ]
    },
    {
        id: 18,
        name: "Meat Grinder Industrial",
        category: "baking-machines",
        price: 25000,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Heavy-duty meat grinder for sausages and processing",
        rating: 4.4,
        stock: 11,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Sausage Factory", location: "GenSan", rating: 4, comment: "Powerful motor! Grinds meat quickly and efficiently.", date: "2025-11-10", verified: true },
            { user: "Butcher Shop", location: "Butuan", rating: 4, comment: "Good grinder. Easy to disassemble and clean.", date: "2025-10-29", verified: true }
        ]
    },
    {
        id: 19,
        name: "Hot Dog Steamer Display",
        category: "baking-machines",
        price: 16500,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Glass display hot dog steamer with bun warmer",
        rating: 4.2,
        stock: 13,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Street Food Corner", location: "CDO", rating: 4, comment: "Perfect for street food! Keeps hot dogs warm and visible.", date: "2025-11-11", verified: true },
            { user: "School Canteen", location: "Davao City", rating: 4, comment: "Students love it! Easy to operate.", date: "2025-11-02", verified: true }
        ]
    },
    {
        id: 20,
        name: "Popcorn Machine Commercial",
        category: "baking-machines",
        price: 19800,
        oldPrice: 24000,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Theater-style popcorn machine with warming deck",
        rating: 4.6,
        stock: 8,
        available: true,
        badge: "sale",
        station: "pautang-deals",
        reviews: [
            { user: "Movie Snacks", location: "Iligan", rating: 5, comment: "Makes great popcorn! Kids love watching it pop!", date: "2025-11-13", verified: true },
            { user: "Party Rentals", location: "GenSan", rating: 4, comment: "Good machine for events. Easy to transport.", date: "2025-11-05", verified: true }
        ]
    },
    {
        id: 21,
        name: "Crepe Maker Machine",
        category: "baking-machines",
        price: 14500,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Electric crepe maker with temperature control",
        rating: 4.3,
        stock: 10,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Crepe Station", location: "Davao City", rating: 4, comment: "Makes thin crepes perfectly! Easy to use.", date: "2025-11-14", verified: true },
            { user: "Dessert Cart", location: "CDO", rating: 4, comment: "Good for beginners. Heats evenly.", date: "2025-11-06", verified: true }
        ]
    },
    {
        id: 22,
        name: "Cotton Candy Machine",
        category: "baking-machines",
        price: 12000,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Commercial cotton candy maker for events",
        rating: 4.5,
        stock: 15,
        available: true,
        badge: "hot",
        station: "best-deals",
        reviews: [
            { user: "Party Treats", location: "Zamboanga", rating: 5, comment: "Kids party favorite! Makes fluffy cotton candy.", date: "2025-11-12", verified: true },
            { user: "Carnival Foods", location: "GenSan", rating: 4, comment: "Good machine. Produces cotton candy quickly!", date: "2025-11-04", verified: true }
        ]
    },
    {
        id: 23,
        name: "Chocolate Fountain 5-Tier",
        category: "baking-machines",
        price: 18000,
        oldPrice: 22000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Stainless steel chocolate fountain for events",
        rating: 4.7,
        stock: 6,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Event Caterer", location: "Davao City", rating: 5, comment: "Show stopper at events! Guests love it!", date: "2025-11-15", verified: true },
            { user: "Wedding Services", location: "CDO", rating: 5, comment: "Beautiful fountain! Easy to clean and maintain.", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 24,
        name: "Panini Press Grill",
        category: "baking-machines",
        price: 16800,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Commercial panini press with ribbed plates",
        rating: 4.4,
        stock: 9,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Sandwich Shop", location: "Butuan", rating: 4, comment: "Makes perfect grill marks! Heats evenly.", date: "2025-11-11", verified: true },
            { user: "Cafe Corner", location: "Iligan", rating: 4, comment: "Good press for paninis and sandwiches.", date: "2025-11-03", verified: true }
        ]
    },
    {
        id: 25,
        name: "Shawarma Machine Electric",
        category: "baking-machines",
        price: 38000,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Electric vertical shawarma grill machine",
        rating: 4.8,
        stock: 7,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Shawarma King", location: "Davao City", rating: 5, comment: "Best shawarma machine! Meat cooks perfectly rotating!", date: "2025-11-14", verified: true },
            { user: "Street Grill", location: "GenSan", rating: 5, comment: "Easy to operate! Customers love watching the meat rotate.", date: "2025-11-07", verified: true },
            { user: "Food Cart Business", location: "CDO", rating: 5, comment: "Excellent quality! Very profitable equipment!", date: "2025-10-30", verified: true }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = allProducts;
}
