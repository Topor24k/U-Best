// ============================================
// PRODUCTS DATABASE - Organized by Categories
// ============================================

const allProducts = [
    // ============================================
    // BAKING MACHINES & BAKERY EQUIPMENT (8 products)
    // ============================================
    {
        id: 1,
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
            { user: "Chef Antonio", location: "Davao City", rating: 5, comment: "Professional grade! Bakes perfectly every time.", date: "2025-11-14", verified: true },
            { user: "Rosa's Bakery", location: "CDO", rating: 5, comment: "Best oven we've ever owned!", date: "2025-11-04", verified: true }
        ]
    },
    {
        id: 2,
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
            { user: "Baker's Corner", location: "Davao City", rating: 5, comment: "Powerful motor! Mixes dough perfectly.", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 3,
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
            { user: "Pizza Hub", location: "Davao City", rating: 5, comment: "Makes pizza dough prep so easy!", date: "2025-11-15", verified: true }
        ]
    },
    {
        id: 4,
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
        station: "best-deals",
        reviews: [
            { user: "Cupcake Central", location: "GenSan", rating: 5, comment: "Bakes evenly! Perfect cupcakes every batch.", date: "2025-11-13", verified: true }
        ]
    },
    {
        id: 5,
        name: "Bread Slicer Machine",
        category: "baking-machines",
        price: 18500,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Electric bread slicer with adjustable thickness",
        rating: 4.3,
        stock: 14,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Daily Bread", location: "Davao City", rating: 4, comment: "Slices bread uniformly. Saves time!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 6,
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
            { user: "Corner Bakery", location: "Butuan", rating: 5, comment: "Keeps bread warm and fresh!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 7,
        name: "Cake Display Chiller",
        category: "baking-machines",
        price: 55000,
        oldPrice: 62000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Glass cake display refrigerator with LED lights",
        rating: 4.7,
        stock: 3,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Cake Gallery", location: "Davao City", rating: 5, comment: "Beautiful display! Perfect temperature.", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 8,
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
            { user: "Maria Santos", location: "Davao City", rating: 5, comment: "Excellent quality! Perfect waffles!", date: "2025-11-10", verified: true }
        ]
    },

    // ============================================
    // PREPARATION & PROCESSING TOOLS (8 products)
    // ============================================
    {
        id: 9,
        name: "3 in 1 Burger-Fryer-Steamer",
        category: "preparation-tools",
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
            { user: "Ana Cruz", location: "Davao City", rating: 5, comment: "Space-saver! Does everything!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 10,
        name: "Burger Griddle",
        category: "preparation-tools",
        price: 45000,
        oldPrice: 52000,
        image: "Photo/Burger Griddle.jpg",
        description: "Professional griddle for burgers and grilled sandwiches",
        rating: 4.0,
        stock: 5,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Mike Torres", location: "Davao City", rating: 4, comment: "Heats evenly and quickly!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 11,
        name: "2 x 16 Siomai Steamer",
        category: "preparation-tools",
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
            { user: "Grace Fernandez", location: "GenSan", rating: 5, comment: "Perfect for my siomai business!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 12,
        name: "Big Single Deep Fryer",
        category: "preparation-tools",
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
            { user: "Tony Ramos", location: "Zamboanga", rating: 4, comment: "Large capacity, heats quickly!", date: "2025-11-07", verified: true }
        ]
    },
    {
        id: 13,
        name: "Donut Fryer Machine",
        category: "preparation-tools",
        price: 32000,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Automatic donut fryer with temperature control",
        rating: 4.4,
        stock: 9,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Donut King", location: "CDO", rating: 5, comment: "Makes frying donuts so easy!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 14,
        name: "Meat Grinder Industrial",
        category: "preparation-tools",
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
            { user: "Sausage Factory", location: "GenSan", rating: 4, comment: "Powerful motor! Grinds efficiently.", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 15,
        name: "Crepe Maker Machine",
        category: "preparation-tools",
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
            { user: "Crepe Station", location: "Davao City", rating: 4, comment: "Makes thin crepes perfectly!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 16,
        name: "Panini Press Grill",
        category: "preparation-tools",
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
            { user: "Sandwich Shop", location: "Butuan", rating: 4, comment: "Perfect grill marks!", date: "2025-11-11", verified: true }
        ]
    },

    // ============================================
    // MEASURING & WEIGHING TOOLS (8 products)
    // ============================================
    {
        id: 17,
        name: "Digital Kitchen Scale 10kg",
        category: "measuring-tools",
        price: 1200,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Precision digital scale for accurate measurements",
        rating: 4.5,
        stock: 25,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Home Baker", location: "Davao City", rating: 5, comment: "Very accurate and easy to use!", date: "2025-11-15", verified: true }
        ]
    },
    {
        id: 18,
        name: "Professional Kitchen Thermometer",
        category: "measuring-tools",
        price: 850,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Digital thermometer for precise temperature readings",
        rating: 4.6,
        stock: 30,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Chef Maria", location: "CDO", rating: 5, comment: "Essential tool for perfect baking!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 19,
        name: "Measuring Cup Set (8 pcs)",
        category: "measuring-tools",
        price: 650,
        oldPrice: 850,
        image: "Photo/Burger Griddle.jpg",
        description: "Stainless steel measuring cups with metric markings",
        rating: 4.4,
        stock: 40,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Ana's Kitchen", location: "GenSan", rating: 4, comment: "Good quality and affordable!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 20,
        name: "Commercial Weighing Scale 30kg",
        category: "measuring-tools",
        price: 3500,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Heavy-duty platform scale for commercial use",
        rating: 4.7,
        stock: 15,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Bakery Supply", location: "Butuan", rating: 5, comment: "Sturdy and accurate!", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 21,
        name: "Timer Set Digital (3 pcs)",
        category: "measuring-tools",
        price: 950,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Multi-function digital timers for baking",
        rating: 4.3,
        stock: 20,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Sweet Treats", location: "Iligan", rating: 4, comment: "Very helpful for timing!", date: "2025-11-06", verified: true }
        ]
    },
    {
        id: 22,
        name: "Measuring Spoon Set (12 pcs)",
        category: "measuring-tools",
        price: 450,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Complete set of measuring spoons in various sizes",
        rating: 4.2,
        stock: 35,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Home Cook", location: "Davao City", rating: 4, comment: "Complete set, good value!", date: "2025-11-05", verified: true }
        ]
    },
    {
        id: 23,
        name: "Baking Ruler with Temperature Guide",
        category: "measuring-tools",
        price: 380,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Stainless steel ruler with temperature conversion chart",
        rating: 4.1,
        stock: 30,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Pastry Chef", location: "CDO", rating: 4, comment: "Handy tool for precision!", date: "2025-11-03", verified: true }
        ]
    },
    {
        id: 24,
        name: "pH Meter for Dough Testing",
        category: "measuring-tools",
        price: 2800,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Professional pH meter for sourdough and fermentation",
        rating: 4.8,
        stock: 8,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Artisan Bakery", location: "Zamboanga", rating: 5, comment: "Game changer for sourdough!", date: "2025-11-14", verified: true }
        ]
    },

    // ============================================
    // GAS & POWER SUPPLY (8 products)
    // ============================================
    {
        id: 25,
        name: "Commercial Gas Range 4 Burner",
        category: "gas-power",
        price: 35000,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Heavy-duty 4-burner gas range for commercial kitchens",
        rating: 4.6,
        stock: 12,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Carinderia Ni Ate", location: "CDO", rating: 5, comment: "Sturdy and reliable!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 26,
        name: "LPG Tank 11kg with Regulator",
        category: "gas-power",
        price: 1850,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Standard LPG cylinder with safety regulator",
        rating: 4.5,
        stock: 50,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Food Cart Owner", location: "Davao City", rating: 5, comment: "Essential for mobile business!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 27,
        name: "Gas Burner Double Head",
        category: "gas-power",
        price: 4500,
        oldPrice: 5200,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Portable double burner with adjustable flames",
        rating: 4.4,
        stock: 18,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Street Food Vendor", location: "GenSan", rating: 4, comment: "Perfect for outdoor cooking!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 28,
        name: "Gas Regulator with Safety Valve",
        category: "gas-power",
        price: 680,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "High-quality gas regulator with auto shut-off",
        rating: 4.7,
        stock: 45,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Safety First", location: "Butuan", rating: 5, comment: "Peace of mind with safety features!", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 29,
        name: "Pizza Oven Gas",
        category: "gas-power",
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
            { user: "Pizzeria Antonio", location: "Davao City", rating: 5, comment: "Makes authentic Neapolitan pizza!", date: "2025-11-15", verified: true }
        ]
    },
    {
        id: 30,
        name: "Industrial Gas Hose 3 meters",
        category: "gas-power",
        price: 850,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Heavy-duty gas hose for commercial installations",
        rating: 4.3,
        stock: 30,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Installer Pro", location: "CDO", rating: 4, comment: "Durable and safe!", date: "2025-11-07", verified: true }
        ]
    },
    {
        id: 31,
        name: "Portable Gas Burner Single",
        category: "gas-power",
        price: 2200,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Compact portable gas stove for small spaces",
        rating: 4.2,
        stock: 22,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Small Business", location: "Iligan", rating: 4, comment: "Perfect for tight spaces!", date: "2025-11-06", verified: true }
        ]
    },
    {
        id: 32,
        name: "Gas Leak Detector",
        category: "gas-power",
        price: 1500,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Electronic gas leak detector with alarm",
        rating: 4.9,
        stock: 15,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Safety Officer", location: "Zamboanga", rating: 5, comment: "Must-have for gas safety!", date: "2025-11-13", verified: true }
        ]
    },

    // ============================================
    // BAKING TRAYS & STORAGE (8 products)
    // ============================================
    {
        id: 33,
        name: "Aluminum Baking Sheet Pan Set (5 pcs)",
        category: "trays-storage",
        price: 3200,
        oldPrice: 3800,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Professional-grade aluminum sheet pans in various sizes",
        rating: 4.6,
        stock: 20,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Commercial Baker", location: "Davao City", rating: 5, comment: "Perfect for bakery use!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 34,
        name: "Cooling Rack Stainless Steel (3-tier)",
        category: "trays-storage",
        price: 2500,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Space-saving 3-tier cooling rack for baked goods",
        rating: 4.5,
        stock: 15,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Cookie Shop", location: "CDO", rating: 4, comment: "Saves counter space!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 35,
        name: "Airtight Storage Container Set (10 pcs)",
        category: "trays-storage",
        price: 1800,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Food-grade plastic containers for ingredient storage",
        rating: 4.4,
        stock: 25,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Organized Baker", location: "GenSan", rating: 4, comment: "Keeps ingredients fresh!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 36,
        name: "Bread Proofing Basket Set (6 pcs)",
        category: "trays-storage",
        price: 2200,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Natural rattan proofing baskets for artisan bread",
        rating: 4.7,
        stock: 12,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Sourdough Expert", location: "Butuan", rating: 5, comment: "Creates beautiful patterns!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 37,
        name: "Stainless Steel Mixing Bowls (12 pcs)",
        category: "trays-storage",
        price: 2800,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Nested stainless steel bowls in various sizes",
        rating: 4.5,
        stock: 18,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Professional Kitchen", location: "Iligan", rating: 5, comment: "Durable and versatile!", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 38,
        name: "Plastic Dough Container with Lid (20L)",
        category: "trays-storage",
        price: 1200,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Large capacity container for dough fermentation",
        rating: 4.3,
        stock: 20,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Bread Maker", location: "Davao City", rating: 4, comment: "Perfect size for bulk dough!", date: "2025-11-07", verified: true }
        ]
    },
    {
        id: 39,
        name: "Wire Storage Rack 5-Shelf",
        category: "trays-storage",
        price: 5500,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Heavy-duty chrome wire shelving unit for storage",
        rating: 4.6,
        stock: 8,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Bakery Owner", location: "CDO", rating: 5, comment: "Great for organizing supplies!", date: "2025-11-06", verified: true }
        ]
    },
    {
        id: 40,
        name: "Silicone Baking Mat Set (6 pcs)",
        category: "trays-storage",
        price: 1500,
        oldPrice: 1800,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Non-stick reusable baking mats for all sheet pans",
        rating: 4.7,
        stock: 30,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Eco Baker", location: "GenSan", rating: 5, comment: "Reusable and eco-friendly!", date: "2025-11-05", verified: true }
        ]
    },

    // ============================================
    // UTENSILS & ACCESSORIES (8 products)
    // ============================================
    {
        id: 41,
        name: "Professional Whisk Set (5 sizes)",
        category: "utensils",
        price: 1200,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Stainless steel whisks in various sizes",
        rating: 4.5,
        stock: 25,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Pastry Chef", location: "Davao City", rating: 5, comment: "Perfect for all mixing needs!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 42,
        name: "Silicone Spatula Set (10 pcs)",
        category: "utensils",
        price: 950,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Heat-resistant silicone spatulas in various shapes",
        rating: 4.4,
        stock: 30,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Home Baker", location: "CDO", rating: 4, comment: "Great quality and variety!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 43,
        name: "Piping Bag & Tips Set (52 pcs)",
        category: "utensils",
        price: 1800,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Complete cake decorating set with various tips",
        rating: 4.8,
        stock: 20,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Cake Decorator", location: "GenSan", rating: 5, comment: "Everything you need to decorate!", date: "2025-11-13", verified: true }
        ]
    },
    {
        id: 44,
        name: "Rolling Pin Set (3 types)",
        category: "utensils",
        price: 850,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "French, tapered, and adjustable rolling pins",
        rating: 4.3,
        stock: 18,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Pie Maker", location: "Butuan", rating: 4, comment: "Perfect for different doughs!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 45,
        name: "Pastry Brush Set (6 pcs)",
        category: "utensils",
        price: 650,
        oldPrice: 850,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Silicone and natural bristle pastry brushes",
        rating: 4.2,
        stock: 35,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Croissant Baker", location: "Iligan", rating: 4, comment: "Essential for egg wash!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 46,
        name: "Dough Scraper Set (4 pcs)",
        category: "utensils",
        price: 580,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Flexible and rigid dough scrapers for various uses",
        rating: 4.4,
        stock: 25,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Bread Artisan", location: "Davao City", rating: 4, comment: "Very handy tools!", date: "2025-11-08", verified: true }
        ]
    },
    {
        id: 47,
        name: "Cookie Cutter Set (48 shapes)",
        category: "utensils",
        price: 1200,
        oldPrice: null,
        image: "Photo/Burger Griddle.jpg",
        description: "Stainless steel cookie cutters in various designs",
        rating: 4.6,
        stock: 22,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Cookie Business", location: "CDO", rating: 5, comment: "So many fun shapes!", date: "2025-11-07", verified: true }
        ]
    },
    {
        id: 48,
        name: "Cake Turntable with Tools",
        category: "utensils",
        price: 2200,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Rotating cake stand with smoothing tools",
        rating: 4.7,
        stock: 15,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Professional Decorator", location: "GenSan", rating: 5, comment: "Makes decorating so much easier!", date: "2025-11-06", verified: true }
        ]
    },

    // ============================================
    // INGREDIENTS & RAW MATERIALS (8 products)
    // ============================================
    {
        id: 49,
        name: "All-Purpose Flour Premium 25kg",
        category: "ingredients",
        price: 1250,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "High-quality all-purpose flour for baking",
        rating: 4.5,
        stock: 100,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Bakery Supply", location: "Davao City", rating: 5, comment: "Consistent quality every time!", date: "2025-11-15", verified: true }
        ]
    },
    {
        id: 50,
        name: "Bread Flour Strong 25kg",
        category: "ingredients",
        price: 1350,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "High-protein bread flour for perfect loaves",
        rating: 4.6,
        stock: 80,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Artisan Bread", location: "CDO", rating: 5, comment: "Makes excellent bread!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 51,
        name: "Active Dry Yeast 500g",
        category: "ingredients",
        price: 450,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Premium active dry yeast for bread making",
        rating: 4.7,
        stock: 60,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Bread Maker", location: "GenSan", rating: 5, comment: "Reliable rising every time!", date: "2025-11-13", verified: true }
        ]
    },
    {
        id: 52,
        name: "White Sugar Refined 50kg",
        category: "ingredients",
        price: 2800,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Pure refined white sugar for baking",
        rating: 4.4,
        stock: 50,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Pastry Shop", location: "Butuan", rating: 4, comment: "Good quality sugar!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 53,
        name: "Butter Unsalted 1kg",
        category: "ingredients",
        price: 580,
        oldPrice: 650,
        image: "Photo/Burger Griddle.jpg",
        description: "Premium unsalted butter for baking",
        rating: 4.8,
        stock: 40,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Croissant Cafe", location: "Iligan", rating: 5, comment: "Rich flavor and perfect texture!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 54,
        name: "Vanilla Extract Pure 500ml",
        category: "ingredients",
        price: 850,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Pure vanilla extract for premium flavoring",
        rating: 4.9,
        stock: 35,
        available: true,
        badge: "new",
        station: "new-arrivals",
        reviews: [
            { user: "Cake Studio", location: "Davao City", rating: 5, comment: "Amazing aroma and flavor!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 55,
        name: "Baking Powder 1kg",
        category: "ingredients",
        price: 320,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Double-acting baking powder for perfect rise",
        rating: 4.5,
        stock: 70,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Muffin Shop", location: "CDO", rating: 4, comment: "Works great for all recipes!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 56,
        name: "Cocoa Powder Premium 1kg",
        category: "ingredients",
        price: 950,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Dutch-processed cocoa powder for rich chocolate",
        rating: 4.7,
        stock: 30,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Chocolate Bakery", location: "GenSan", rating: 5, comment: "Deep chocolate flavor!", date: "2025-11-08", verified: true }
        ]
    },

    // ============================================
    // CLEANING & MAINTENANCE TOOLS (8 products)
    // ============================================
    {
        id: 57,
        name: "Food-Safe Sanitizer 5L",
        category: "cleaning",
        price: 850,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "FDA-approved food surface sanitizer",
        rating: 4.6,
        stock: 40,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Restaurant Owner", location: "Davao City", rating: 5, comment: "Essential for food safety!", date: "2025-11-15", verified: true }
        ]
    },
    {
        id: 58,
        name: "Oven Cleaner Heavy Duty 1L",
        category: "cleaning",
        price: 480,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Powerful oven and grill cleaner",
        rating: 4.5,
        stock: 35,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Bakery Maintenance", location: "CDO", rating: 4, comment: "Cuts through grease easily!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 59,
        name: "Microfiber Cleaning Cloth Set (20 pcs)",
        category: "cleaning",
        price: 650,
        oldPrice: 800,
        image: "Photo/Burger Griddle.jpg",
        description: "Lint-free microfiber cloths for kitchen cleaning",
        rating: 4.4,
        stock: 50,
        available: true,
        badge: "sale",
        station: "best-deals",
        reviews: [
            { user: "Clean Kitchen", location: "GenSan", rating: 4, comment: "Absorbs well and durable!", date: "2025-11-13", verified: true }
        ]
    },
    {
        id: 60,
        name: "Stainless Steel Cleaner & Polish 500ml",
        category: "cleaning",
        price: 380,
        oldPrice: null,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Polish and protect stainless steel equipment",
        rating: 4.3,
        stock: 30,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Kitchen Manager", location: "Butuan", rating: 4, comment: "Keeps equipment shining!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 61,
        name: "Disposable Gloves Box (100 pcs)",
        category: "cleaning",
        price: 280,
        oldPrice: null,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Food-safe disposable gloves for hygiene",
        rating: 4.5,
        stock: 60,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Food Handler", location: "Iligan", rating: 5, comment: "Essential for food prep!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 62,
        name: "Scrub Brush Set (5 pcs)",
        category: "cleaning",
        price: 450,
        oldPrice: null,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Various scrub brushes for equipment cleaning",
        rating: 4.2,
        stock: 45,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Dishwasher Pro", location: "Davao City", rating: 4, comment: "Good for tough jobs!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 63,
        name: "Degreaser Commercial Grade 5L",
        category: "cleaning",
        price: 950,
        oldPrice: null,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Industrial strength degreaser for kitchens",
        rating: 4.7,
        stock: 25,
        available: true,
        badge: "hot",
        station: "all",
        reviews: [
            { user: "Industrial Kitchen", location: "CDO", rating: 5, comment: "Powerful and effective!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 64,
        name: "Air Freshener Food-Safe 6 cans",
        category: "cleaning",
        price: 580,
        oldPrice: null,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Food-safe air freshener for commercial kitchens",
        rating: 4.4,
        stock: 40,
        available: true,
        badge: null,
        station: "all",
        reviews: [
            { user: "Cafe Owner", location: "GenSan", rating: 4, comment: "Pleasant scent, not overpowering!", date: "2025-11-08", verified: true }
        ]
    },

    // ============================================
    // BUNDLE PACKAGES (8 bundles for Pautang Deals)
    // ============================================
    {
        id: 65,
        name: "Bakery Starter Bundle",
        category: "bundles",
        price: 185000,
        oldPrice: 220000,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Complete starter package: Deck Oven + Mixer + Baking Pans + Tools",
        rating: 4.9,
        stock: 5,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "New Bakery Owner", location: "Davao City", rating: 5, comment: "Everything I needed to start my bakery!", date: "2025-11-15", verified: true },
            { user: "Startup Business", location: "CDO", rating: 5, comment: "Great value bundle!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 66,
        name: "Street Food Complete Package",
        category: "bundles",
        price: 95000,
        oldPrice: 115000,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Food cart essentials: Burger Griddle + Fryer + Gas Range + Steamer",
        rating: 4.8,
        stock: 8,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Food Cart Success", location: "GenSan", rating: 5, comment: "Perfect for starting a food cart!", date: "2025-11-14", verified: true }
        ]
    },
    {
        id: 67,
        name: "Siomai Business Kit",
        category: "bundles",
        price: 48000,
        oldPrice: 58000,
        image: "Photo/2 x 16 Siomai Steamer.jpg",
        description: "Siomai startup: 3x16 Steamer + Gas Burner + Steamers + Baskets",
        rating: 4.7,
        stock: 10,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Siomai Vendor", location: "Butuan", rating: 5, comment: "Started earning immediately!", date: "2025-11-13", verified: true }
        ]
    },
    {
        id: 68,
        name: "Pizza Shop Starter",
        category: "bundles",
        price: 125000,
        oldPrice: 150000,
        image: "Photo/Burger Griddle.jpg",
        description: "Pizza business: Gas Pizza Oven + Dough Sheeter + Tools + Ingredients",
        rating: 4.9,
        stock: 4,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Pizza Business", location: "Iligan", rating: 5, comment: "Customers love our pizza! Great bundle!", date: "2025-11-12", verified: true }
        ]
    },
    {
        id: 69,
        name: "Dessert Shop Bundle",
        category: "bundles",
        price: 155000,
        oldPrice: 180000,
        image: "Photo/3 x 16 Siomai Steamer.jpg",
        description: "Dessert startup: Ice Cream Machine + Display Chiller + Mixer + Tools",
        rating: 4.8,
        stock: 6,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Sweet Success", location: "Davao City", rating: 5, comment: "Dessert sales are booming!", date: "2025-11-11", verified: true }
        ]
    },
    {
        id: 70,
        name: "Fried Chicken Starter Kit",
        category: "bundles",
        price: 68000,
        oldPrice: 82000,
        image: "Photo/Big Single Deep Fryer.jpg",
        description: "Chicken business: Deep Fryer + Gas Range + Display Warmer + Accessories",
        rating: 4.7,
        stock: 7,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Chicken House", location: "CDO", rating: 5, comment: "Perfect for fried chicken business!", date: "2025-11-10", verified: true }
        ]
    },
    {
        id: 71,
        name: "Waffle & Donut Package",
        category: "bundles",
        price: 115000,
        oldPrice: 135000,
        image: "Photo/Belgian Double Waffle Maker.jpg",
        description: "Sweet treats: Waffle Maker + Donut Fryer + Display + Ingredients",
        rating: 4.8,
        stock: 5,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Waffle Delight", location: "GenSan", rating: 5, comment: "Kids love our waffles and donuts!", date: "2025-11-09", verified: true }
        ]
    },
    {
        id: 72,
        name: "Coffee & Pastry Cafe Bundle",
        category: "bundles",
        price: 195000,
        oldPrice: 230000,
        image: "Photo/3 in 1 Burger-Fryer-Steamer.jpg",
        description: "Complete cafe: Convection Oven + Display Chiller + Mixer + Coffee Equipment",
        rating: 4.9,
        stock: 3,
        available: true,
        badge: "bundle",
        station: "pautang-deals",
        reviews: [
            { user: "Cafe Dreams", location: "Butuan", rating: 5, comment: "Living my cafe dream with this bundle!", date: "2025-11-08", verified: true },
            { user: "Cozy Corner Cafe", location: "Iligan", rating: 5, comment: "Best investment ever!", date: "2025-11-05", verified: true }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = allProducts;
}
