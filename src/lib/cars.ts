export type Car = {
    slug: string;
    name: string;
    brand: string;
    body: string;
    year: number;
    price: number;
    mileage: number;
    power: string;
    zeroTo60: string;
    topSpeed: string;
    engine: string;
    image: string;
    gallery: string[];
    certified: boolean;
    description: string;
    highlights: string[];
};

export const cars: Car[] = [
    {
        slug: "aventador-sv",
        name: "Lamborghini Aventador SV",
        brand: "Lamborghini",
        body: "Coupe",
        year: 2022,
        price: 480000,
        mileage: 3200,
        power: "759 hp",
        zeroTo60: "2.8s",
        topSpeed: "350 km/h",
        engine: "6.5L V12",
        image: "/car-hero.jpg",
        gallery: ["/car-hero.jpg", "/car-detail.jpg", "/car-bg.jpg"],
        certified: true,
        description:
            "A naturally-aspirated V12 masterpiece. The Aventador SV pairs raw theatre with race-bred aerodynamics — one of the last of a dying breed.",
        highlights: ["Naturally-aspirated V12", "Carbon-ceramic brakes", "Full carbon interior", "Single owner"],
    },
    {
        slug: "911-turbo-s",
        name: "Porsche 911 Turbo S",
        brand: "Porsche",
        body: "Coupe",
        year: 2023,
        price: 245000,
        mileage: 5400,
        power: "640 hp",
        zeroTo60: "2.6s",
        topSpeed: "330 km/h",
        engine: "3.8L Flat-6 Twin-Turbo",
        image: "/car-2.jpg",
        gallery: ["/car-2.jpg", "/car-detail.jpg", "/car-1.jpg"],
        certified: true,
        description:
            "The everyday hypercar. Blistering all-weather pace, surgical handling, and the usability only a 911 delivers — impeccably maintained.",
        highlights: ["All-wheel drive", "Sport Chrono package", "Ceramic brakes", "Full service history"],
    },
    {
        slug: "amg-gt",
        name: "Mercedes-AMG GT",
        brand: "Mercedes-AMG",
        body: "Coupe",
        year: 2021,
        price: 165000,
        mileage: 8900,
        power: "577 hp",
        zeroTo60: "3.1s",
        topSpeed: "318 km/h",
        engine: "4.0L V8 Biturbo",
        image: "/car-bg.jpg",
        gallery: ["/car-bg.jpg", "/car-hero.jpg", "/car-detail.jpg"],
        certified: true,
        description:
            "A long-hood, hand-built GT with a thunderous AMG V8. Grand touring drama with genuine track capability.",
        highlights: ["Hand-built V8", "AMG Track Pace", "Burmester audio", "Two owners"],
    },
    {
        slug: "audi-r8-v10",
        name: "Audi R8 V10 Performance",
        brand: "Audi",
        body: "Coupe",
        year: 2022,
        price: 175000,
        mileage: 6100,
        power: "602 hp",
        zeroTo60: "3.1s",
        topSpeed: "331 km/h",
        engine: "5.2L V10",
        image: "/car-3.jpg",
        gallery: ["/car-3.jpg", "/car-1.jpg", "/car-detail.jpg"],
        certified: true,
        description:
            "The most usable supercar ever built. A shrieking naturally-aspirated V10 wrapped in quattro-secure everyday civility.",
        highlights: ["Naturally-aspirated V10", "Quattro AWD", "Virtual cockpit", "Warranty remaining"],
    },
    {
        slug: "ford-gt",
        name: "Ford GT",
        brand: "Ford",
        body: "Coupe",
        year: 2020,
        price: 210000,
        mileage: 2100,
        power: "647 hp",
        zeroTo60: "3.0s",
        topSpeed: "348 km/h",
        engine: "3.5L V6 EcoBoost",
        image: "/car-1.jpg",
        gallery: ["/car-1.jpg", "/car-3.jpg", "/car-bg.jpg"],
        certified: true,
        description:
            "A Le Mans-bred American icon. Extreme aero, a carbon-fibre tub, and race-car proportions — an instant collector's piece.",
        highlights: ["Carbon-fibre monocoque", "Active aerodynamics", "Under 2,200 km", "Collector-grade"],
    },
    {
        slug: "ferrari-sf90",
        name: "Ferrari SF90 Stradale",
        brand: "Ferrari",
        body: "Hybrid",
        year: 2023,
        price: 625000,
        mileage: 1500,
        power: "986 hp",
        zeroTo60: "2.5s",
        topSpeed: "340 km/h",
        engine: "4.0L V8 Hybrid",
        image: "/car-detail.jpg",
        gallery: ["/car-detail.jpg", "/car-hero.jpg", "/car-2.jpg"],
        certified: true,
        description:
            "Ferrari's plug-in hybrid flagship. Nearly 1,000 horsepower, electric-only running, and the most advanced dynamics Maranello has ever built.",
        highlights: ["986 hp hybrid", "Electric-only mode", "Assetto Fiorano", "Delivery mileage"],
    },
];

export const getCar = (slug: string) => cars.find((c) => c.slug === slug);
export const brands = Array.from(new Set(cars.map((c) => c.brand)));
export const bodies = Array.from(new Set(cars.map((c) => c.body)));
export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
