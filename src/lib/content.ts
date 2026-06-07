export const fellowship = {
  program: "Creative Entrepreneurship Fellowship",
  theme: "From Talent to Profitable Business",
  parent: "KASA Africa Academy of Creative Excellence",
  dates: "30 June to 4 July 2026",
  eventStartAt: "2026-06-30T00:00:00",
  venue: "Bazal Art Studios, East Legon",
  contact: {
    email: "contact@thekasaacademy.com",
    whatsapp: "https://wa.me/233546663929",
    whatsappLabel: "0546 663 929",
    instagram: "https://instagram.com/kasa.creativeacademy",
    instagramLabel: "kasa.creativeacademy",
  },
  pricing: {
    earlyBird: {
      amount: "500",
      currency: "GHC",
      deadline: "12th June 2026",
      deadlineAt: "2026-06-12T23:59:59",
    },
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

export type CurriculumDayItem =
  | string
  | {
      text: string;
      highlight?: string;
    };

export type CurriculumDay = {
  day: string;
  date: string;
  fullDate: string;
  title: string;
  theme: string;
  description: string;
  items: readonly CurriculumDayItem[];
};

export const curriculum: readonly CurriculumDay[] = [
  {
    day: "01",
    date: "30 JUNE",
    fullDate: "Tuesday 30th June 2026",
    title: "Identity and Vision",
    theme: "Identity. Purpose. Visibility.",
    description:
      "Defining your unique creative proposition and long-term legacy goals.",
    items: [
      "Identity, Purpose and Mindset Shift",
      "Personal and Business Vision Mapping",
      "Branding, Positioning and Visibility; Personal Branding for Creative Entrepreneurs",
    ],
  },
  {
    day: "02",
    date: "1 JULY",
    fullDate: "Wednesday 1st July 2026",
    title: "Structure and Law",
    theme: "Strategy. Finance. Impact.",
    description:
      "Intellectual property, contracts, and establishing a professional legal foundation.",
    items: [
      "Business Strategy, Structure and Policy",
      "Finance and Funding: Basic financial literacy, Investment knowledge and planning. How to pitch for Funding, what makes a good pitch etc.",
      "Longevity and Impact; Building a Business that lasts.",
    ],
  },
  {
    day: "03",
    date: "2 JULY",
    fullDate: "Thursday 2nd July 2026",
    title: "Finance and Scalability",
    theme: "Systems. Planning. Real-World Learning.",
    description:
      "Pricing mastery, financial literacy, and building for sustainable growth.",
    items: [
      "Business planning and the systems that make the plan work (covers team building, customer experience, CSR, etc.)",
      "Dedicated time to complete and refine Business Plans and Funding pitches.",
      {
        text: "On-site visit to Creative Enterprise.",
        highlight: "Location: Tigon Creative Studios",
      },
    ],
  },
  {
    day: "04",
    date: "3 JULY",
    fullDate: "Friday 3rd July 2026",
    title: "Studio Immersion",
    theme: "Wellness. Confidence. Law & Networks.",
    description:
      "Site visit to Tigon Creative Studios for operational insight and field learning.",
    items: [
      "Health, Wellness and WorkLife balance",
      "Creative confidence",
      "Networking & collaborations",
      "Law for Creatives: The Legal Aspects of Creative Entrepreneurship (covers registration, contracts, copyrights, etc.)",
    ],
  },
  {
    day: "05",
    date: "4 JULY",
    fullDate: "Saturday 4th July 2026",
    title: "The Showcase",
    theme: "Business Plan Development. Business Pitching for Funding.",
    description:
      "Final pitch session and certificate ceremony with industry feedback.",
    items: [
      "Review of business plans and business pitches led by Author, Business Coach and Lecturer Dr. Boahemaa Ntim of Blacksmith Africa Consulting.",
      "Business pitching & funding award for best pitch",
      "Fellowship reflections",
      "Conclusion and presentation of Certificates",
      "Networking and Media moments",
    ],
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
    role: "Lawyer & Creative Entrepreneur",
    tag: "Convener",
    isConvener: true,
  },
  {
    slug: "betty-edem",
    name: "Betty Edem",
    role: "Founder & Lead Stylist, SHE BOSS LIMITED",
    isConvener: false,
  },
  {
    slug: "tonyi-senaya",
    name: "Tonyi Senayah",
    role: "Founder, Horseman",
    isConvener: false,
  },
  {
    slug: "baaba-amoaba",
    name: "Baaba Amoaba",
    role: "Founder, Tigon Creative Studios, Wondaland & Infinity Designs",
    isConvener: false,
  },
] as const;

export type FacultyProfile = {
  paragraphs: readonly string[];
  sections?: readonly { title: string; paragraphs: readonly string[] }[];
};

export const facultyProfiles = {
  "betty-edem": {
    paragraphs: [
      "Betty Edem, the Creative genius and visionary behind SHEBOSS LIMITED, is one of Ghana's most respected hairstylists known for redefining modern bridal and luxury hairstyling. Over the years, Betty has built a brand that blends creativity, precision, elegance, and digital influence, positioning herself as a leading voice in Ghana's beauty and fashion industry.",
      "Beyond hairstyling, Betty is also recognized as an educator, speaker, digital strategist, and mentor passionate about empowering the next generation of creatives in the beauty industry. Through SHEBOSS ACADEMIA she has trained and mentored aspiring hairstylists through masterclasses and professional development programs, helping many young women transform their talents into thriving careers.",
      "Her impact within Ghana's creative and beauty industry has earned her recognition including the Creative Hairstylist of the Year award at the Africa Creatives Awards Festival (ACAFEST 2021). Today, Betty Edem continues to inspire many young entrepreneurs through her consistency, authenticity, and commitment to changing the narrative around beauty entrepreneurship in Ghana and beyond and we are more than proud to have her as a Faculty Member for the Creative Entrepreneurship Fellowship Cohort 1.",
    ],
  },
  "tonyi-senaya": {
    paragraphs: [
      "Tonyi Senayah is the founder of Horseman, a Ghanaian leather brand focused on creating premium footwear and leather goods. With a strong interest in entrepreneurship, manufacturing, and sustainable production, he is passionate about building globally respected products from Ghana while creating opportunities for artisans and promoting authentic Ghanaian craftsmanship. His work and contribution to the industry have earned him several awards and recognition.",
    ],
    sections: [
      {
        title: "About Horseman",
        paragraphs: [
          "Horseman is a Ghanaian leather brand founded in 2010 with a vision to create world-class footwear and leather products proudly made in Ghana, while empowering local artisans and creating meaningful employment opportunities. Over the years, the company has grown into one of Ghana's leading leather brands, recognized for its craftsmanship and commitment to quality.",
          "Horseman produces a wide range of footwear and leather accessories for individuals, corporate organizations, and institutions. The brand has earned national recognition for producing shoes for the President of Ghana and a handmade leather briefcase for the Minister of Finance during his maiden budget presentation in 2025.",
          "Driven by a passion for excellence and authentic Ghanaian craftsmanship, Horseman continues to position locally made products on the global stage while contributing to the growth and transformation of Ghana's leather industry.",
        ],
      },
    ],
  },
  "veronica-owusu": {
    paragraphs: [
      "Veronica Owusu-Konamah Frimpong is a Private Legal Practitioner with Lexkudoz Legal Consultants. With over 14 years in legal practice, she has vast experience in the areas of Land and Real Estate, Corporate, Commercial and Labour Law, having worked in different capacities with both public sector and private sector as in-house counsel, Company Secretary of different financial sector institutions, head of legal and presently as a private legal practitioner. She has handled transactions that run into million of dollars and still has special interest in advising start-ups and SMEs on navigating basic and advanced legal processes, compliance and other legal issues.",
    ],
  },
  "baaba-amoaba": {
    paragraphs: [
      "Baaba Amoaba is a Ghanaian creative and art director reshaping Africa's visual landscape through storytelling, craftsmanship, and design. Founder of Tigon Creative Studios and creator of WondaLand and Infinity Designs, her work spans set design, interiors, and experiential art direction. From the TGMA red carpet and EMY Africa to Global Citizen Festival, and RNAQ40. Guided by elegance, originality, and craft, she is building a body of work defined by intention and emotional depth.",
    ],
  },
  "jonathan-adey": {
    paragraphs: [
      "Jonathan Addey is a Ghanaian cinematographer, photographer, and visual storyteller based in Japan with over seven years of professional experience and the founder of the CREATIVE STUDIO ACADEMY. Specializing in landscape, documentary, and commercial photography, he is passionate about capturing compelling stories at the intersection of culture, nature, and human experiences.",
      "Jonathan has worked with renowned international brands and organizations, including Sony, Disney, Mitsubishi, Suntory, JICA, Coca-Cola Ghana, and the Ghana Embassy in Japan. His work has been exhibited both locally and internationally, with features in exhibitions and publications across Ghana, Japan, and Argentina.",
      "Beyond his creative practice, Jonathan is an educator and mentor who is committed to empowering emerging creatives through training and knowledge sharing.",
    ],
  },
  "boahemaa-ntim": {
    paragraphs: [
      "Dr. Boahemaa Ntim is a serial entrepreneur, business strategist, and leadership development expert with extensive experience in entrepreneurship, innovation, and enterprise growth. She is the Managing Partner of Blacksmith Africa Consulting and founder of several successful ventures, including The Africa Tea Company. Passionate about empowering individuals and businesses, Dr. Ntim has mentored entrepreneurs, led business development initiatives, and championed skills development programs across Ghana. As the author and host of Beyond The Hustle book and podcast, she is widely recognized for her practical insights on business strategy, leadership, innovation, and sustainable enterprise growth.",
    ],
  },
  "bazal-darko": {
    paragraphs: [
      "Bazal Darko is a lawyer with over 14 years of experience in corporate and commercial law. A Chevening Scholar, she earned an LL.M. in International Commercial Law from the University of Aberdeen and has held various legal leadership roles, including serving as Commercial Legal Manager at MTN Ghana.",
      "In 2017, Bazal founded Bazal Art Studios (Babies by Bazal) as a side venture, combining her passion for the creative arts with her love for working with children. What began as a side hustle has since evolved into a sustainable and profitable creative brand.",
      "Driven by a desire to help young people recognize the value of their talents and passions, she founded KASA Africa Academy of Creative Excellence. Through KASA and its flagship Creative Entrepreneurship Fellowship, Bazal is committed to equipping the next generation of creatives with the mindset, skills, and business knowledge needed to build successful and sustainable creative enterprises.",
    ],
  },
} as const satisfies Record<string, FacultyProfile>;

export function getFacultyProfile(slug: string): FacultyProfile | null {
  return facultyProfiles[slug as keyof typeof facultyProfiles] ?? null;
}

export const facultyCompact = [
  {
    slug: "veronica-owusu",
    name: "Veronica Owusu-Konamah Frimpong Esq.",
    role: "Private Legal Practitioner",
  },
  {
    slug: "boahemaa-ntim",
    name: "Dr. Boahemaa Ntim",
    role: "Author, Business Consultant and Lecturer",
  },
  {
    slug: "jonathan-adey",
    name: "Jonathan Addey",
    role: "Founder, Creative Studio Academy",
  },
] as const;
