export const fellowship = {
  program: "Creative Entrepreneurship Fellowship",
  theme: "From Talent to Profitable Business",
  parent: "KASA Africa Academy of Creative Excellence",
  dates: "30 June to 4 July 2026",
  venue: "Bazal Art Studios, East Legon",
  contact: {
    email: "contact@thekasaacademy.com",
    whatsapp: "https://wa.me/233546663929",
    whatsappLabel: "0546 663 929",
  },
  pricing: {
    earlyBird: { amount: "1,500", currency: "GHC", deadline: "30th April 2026" },
    regular: { amount: "2,000", currency: "GHC" },
  },
};

export const goals = [
  "Develop a robust business model for your creative practice.",
  "Master the nuances of legal protection and intellectual property.",
  "Understand financial management and investment readiness.",
  "Build high-impact marketing and brand storytelling strategies.",
  "Network with industry titans and like-minded fellowship peers.",
  "Experience behind-the-scenes creative studio operations.",
];

export const curriculum = [
  {
    day: "01",
    date: "30 JUNE",
    title: "Identity and Vision",
    description:
      "Defining your unique creative proposition and long-term legacy goals.",
  },
  {
    day: "02",
    date: "1 JULY",
    title: "Structure and Law",
    description:
      "Intellectual property, contracts, and establishing a professional legal foundation.",
  },
  {
    day: "03",
    date: "2 JULY",
    title: "Finance and Scalability",
    description:
      "Pricing mastery, financial literacy, and building for sustainable growth.",
  },
  {
    day: "04",
    date: "3 JULY",
    title: "Studio Immersion",
    description:
      "Site visit to Tigon Creative Studios for operational insight and field learning.",
  },
  {
    day: "05",
    date: "4 JULY",
    title: "The Showcase",
    description:
      "Final pitch session and certificate ceremony with industry feedback.",
  },
];

export const speakers = [
  {
    slug: "betty-edem",
    name: "Betty Edem",
    title: "Founder & Lead Stylist, SHE BOSS LIMITED",
    topic: "Personal Branding For Creative Entrepreneurs",
  },
  {
    slug: "tonyi-senaya",
    name: "Tonyi Senayah",
    title: "Founder, Horseman",
    topic: "Longevity in Creative Entrepreneurship",
  },
  {
    slug: "baaba-amoaba",
    name: "Baaba Amoaba",
    title: "CEO, Tigon Creative Studios, Wondeland & Infinity Designs",
    topic: "Creative & Business at Work: Staying True to Your Craft",
  },
  {
    slug: "veronica-owusu",
    name: "Veronica Owusu-Konamah Frimpong Esq.",
    title: "Private Legal Practitioner",
    topic: "Law for Creative Entrepreneurs",
  },
  {
    slug: "boahemaa-ntim",
    name: "Dr. Boahemaa Ntim",
    title: "Author, Business Consultant & Lecturer",
    topic: "Business Plan Development",
  },
  {
    slug: "jonathan-adey",
    name: "Jonathan Addey",
    title: "Founder, Creative Studio Academy",
    topic: "Creative Confidence, Networking and Collaborations",
  },
] as const;

export const convener = {
  name: "Bazal Darko Esq.",
  role: "The Business of Creativity",
  image: "/cef/speakers/convenor.webp",
  heroImage: "/cef/speakers/bazal-darko.jpg",
};

/** Fan order for hero speaker cards (back to front, excluding convener) */
export const heroCardSpeakers = [
  { slug: "baaba-amoaba", name: "Baaba Amoaba", role: "CEO, Tigon Creative Studios" },
  { slug: "betty-edem", name: "Betty Edem", role: "Founder, SHE BOSS LIMITED" },
  { slug: "boahemaa-ntim", name: "Dr. Boahemaa Ntim", role: "Author & Business Consultant" },
  { slug: "jonathan-adey", name: "Jonathan Addey", role: "Founder, Creative Studio Academy" },
  { slug: "tonyi-senaya", name: "Tonyi Senayah", role: "Founder, Horseman" },
  {
    slug: "veronica-owusu",
    name: "Veronica Owusu-Konamah",
    role: "Private Legal Practitioner",
  },
] as const;

export const facultyFeatured = [
  {
    slug: "bazal-darko",
    name: "Bazal Darko Esq.",
    role: "The Business of Creativity",
    tag: "Convener",
    isConvener: true,
  },
  {
    slug: "betty-edem",
    name: "Betty Edem",
    role: "Marketing & Brand Vision",
    isConvener: false,
  },
  {
    slug: "tonyi-senaya",
    name: "Tonyi Senayah",
    role: "Operational Excellence",
    isConvener: false,
  },
  {
    slug: "baaba-amoaba",
    name: "Baaba Amoaba",
    role: "Finance for Creatives",
    isConvener: false,
  },
] as const;

export const facultyCompact = [
  {
    slug: "veronica-owusu",
    name: "Veronica Owusu-Konamah Frimpong Esq.",
    role: "Legal Structure",
  },
  {
    slug: "boahemaa-ntim",
    name: "Dr. Boahemaa Ntim",
    role: "Strategy & Innovation",
  },
  {
    slug: "jonathan-adey",
    name: "Jonathan Addey",
    role: "Tech & Scalability",
  },
] as const;
