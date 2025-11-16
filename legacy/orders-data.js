// ============================================
// ORDERS DATA - NOW MANAGED IN DATABASE
// This file is kept for backwards compatibility
// All order data should be managed via the system
// ============================================

const ordersData = [
    // Orders will be loaded from MySQL database via API
    // Orders are created when customers checkout
    {
        id: 'ORD-2025-002',
        date: 'November 12, 2025',
        status: 'delivered',
        items: [
            {
                name: '3 in 1 Burger-Fryer-Steamer',
                image: 'Photo/3 in 1 Burger-Fryer-Steamer.jpg',
                quantity: 1,
                price: 32500
            }
        ],
        subtotal: 32500,
        delivery: 500,
        total: 33000,
        deliveryAddress: {
            name: 'Kayeen Campana',
            street: '123 Bakery Street, Brgy. San Jose',
            city: 'Manila, Metro Manila 1000',
            phone: '+63 912 345 6789'
        },
        tracking: {
            orderPlaced: {
                completed: true,
                date: 'Nov 12, 2025 - 9:15 AM',
                location: 'U-BEST Main Warehouse, Quezon City'
            },
            processing: {
                completed: true,
                date: 'Nov 12, 2025 - 1:30 PM',
                location: 'Processing Center - Quality Check Passed'
            },
            shipping: {
                completed: true,
                date: 'Nov 13, 2025 - 7:00 AM',
                location: 'Out for Delivery'
            },
            delivered: {
                completed: true,
                date: 'Nov 13, 2025 - 3:45 PM',
                location: 'Delivered to 123 Bakery Street'
            }
        }
    },
    {
        id: 'ORD-2025-003',
        date: 'November 10, 2025',
        status: 'processing',
        items: [
            {
                name: '2 x 16 Siomai Steamer',
                image: 'Photo/2 x 16 Siomai Steamer.jpg',
                quantity: 1,
                price: 25000
            },
            {
                name: 'Burger Griddle',
                image: 'Photo/Burger Griddle.jpg',
                quantity: 1,
                price: 22000
            }
        ],
        subtotal: 47000,
        delivery: 500,
        total: 47500,
        deliveryAddress: {
            name: 'Kayeen Campana',
            street: '123 Bakery Street, Brgy. San Jose',
            city: 'Manila, Metro Manila 1000',
            phone: '+63 912 345 6789'
        },
        tracking: {
            orderPlaced: {
                completed: true,
                date: 'Nov 10, 2025 - 11:20 AM',
                location: 'U-BEST Main Warehouse, Quezon City'
            },
            processing: {
                completed: false,
                active: true,
                date: 'Nov 10, 2025 - 3:00 PM',
                location: 'Currently undergoing quality inspection'
            },
            shipping: {
                completed: false,
                date: null,
                location: 'Awaiting shipment'
            },
            delivered: {
                completed: false,
                date: null,
                location: 'Expected delivery: Nov 18, 2025'
            }
        }
    },
    {
        id: 'ORD-2025-004',
        date: 'November 8, 2025',
        status: 'pending',
        items: [
            {
                name: 'Commercial Deep Fryer',
                image: 'https://via.placeholder.com/80x80',
                quantity: 1,
                price: 35000
            }
        ],
        subtotal: 35000,
        delivery: 500,
        total: 35500,
        deliveryAddress: {
            name: 'Kayeen Campana',
            street: '123 Bakery Street, Brgy. San Jose',
            city: 'Manila, Metro Manila 1000',
            phone: '+63 912 345 6789'
        },
        tracking: {
            orderPlaced: {
                completed: false,
                active: true,
                date: 'Nov 8, 2025 - 4:15 PM',
                location: 'Order received - Awaiting payment confirmation'
            },
            processing: {
                completed: false,
                date: null,
                location: 'Pending'
            },
            shipping: {
                completed: false,
                date: null,
                location: 'Pending'
            },
            delivered: {
                completed: false,
                date: null,
                location: 'Pending'
            }
        }
    },
    {
        id: 'ORD-2025-005',
        date: 'November 5, 2025',
        status: 'cancelled',
        items: [
            {
                name: 'Pizza Oven',
                image: 'https://via.placeholder.com/80x80',
                quantity: 1,
                price: 45000
            }
        ],
        subtotal: 45000,
        delivery: 500,
        total: 45500,
        deliveryAddress: {
            name: 'Kayeen Campana',
            street: '123 Bakery Street, Brgy. San Jose',
            city: 'Manila, Metro Manila 1000',
            phone: '+63 912 345 6789'
        },
        tracking: {
            orderPlaced: {
                completed: true,
                date: 'Nov 5, 2025 - 2:00 PM',
                location: 'U-BEST Main Warehouse, Quezon City'
            },
            processing: {
                completed: false,
                date: null,
                location: 'Cancelled by customer on Nov 6, 2025'
            },
            shipping: {
                completed: false,
                date: null,
                location: 'Cancelled'
            },
            delivered: {
                completed: false,
                date: null,
                location: 'Cancelled'
            }
        }
    }
];
