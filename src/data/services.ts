export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  sections: {
    title: string;
    content: string;
    list?: string[];
    subSections?: { title: string; content: string }[];
  }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "pet-children-friendly-chemicals": {
    id: "pet-children-friendly-chemicals",
    title: "Pet & Children Friendly Chemicals",
    subtitle: "Gentle yet effective cleaning solutions that are carefully chosen to be safer for children, pets and your home.",
    image: "/blogs/image5.webp",
    sections: [
      {
        title: "Why is window cleaning essential?",
        content:
          "At Neatly, we recognize the importance of a consistently clean home. Our regular cleaning service ensures a healthier, more comfortable living environment for you and your family.",
        subSections: [
          {
            title: "Your satisfaction is our priority",
            content:
              "If you're finding it hard to keep up with cleaning, it's best to call a professional cleaning service to maintain a healthy home. A professional cleaner can help you create a cleaning schedule and ensure that your home is always clean and comfortable.",
          },
        ],
      },
      {
        title: "",
        content: "",
        list: [
          "We offer competitive rates.",
          "We always complete our work on schedule.",
          "We use certified, eco-friendly materials.",
        ],
      },
      {
        title: "What does our service include?",
        content:
          "From dusting and vacuuming to mopping and sanitizing, we have the skills and expertise to clean your home thoroughly. We use high-quality products and equipment to ensure that our cleaning is effective and long-lasting.",
        subSections: [
          {
            title: "Experienced cleaners",
            content: "Our team of experienced and certified cleaners has the expertise to clean any type of home.",
          },
          {
            title: "Eco-friendly products",
            content: "We use eco-friendly products to protect your health and the environment.",
          },
          {
            title: "Reliable service",
            content: "We understand that cleaning can be a hassle. That's why we offer prompt and reliable services to minimize disruption to your daily routine.",
          },
        ],
      },
      {
        title: "",
        content: "Don't let a dirty home ruin your day. Contact Neatly for professional regular home cleaning services that you can count on. Call us today to schedule an appointment.",
      },
    ],
  },
  "lounge-steam-cleaning-10-off": {
    id: "lounge-steam-cleaning-10-off",
    title: "10% off any lounge steam cleaning",
    subtitle: "Give your lounge a fresh, deep clean while enjoying great savings.",
    image: "/blogs/image2.webp",
    sections: [
      {
        title: "Why is regular cleaning essential?",
        content:
          "At Neatly, we recognize the importance of a consistently clean home. Our regular cleaning service ensures a healthier, more comfortable living environment for you and your family.",
        subSections: [
          {
            title: "Your satisfaction is our priority",
            content:
              "If you're finding it hard to keep up with cleaning, it's best to call a professional cleaning service to maintain a healthy home. A professional cleaner can help you create a cleaning schedule and ensure that your home is always clean and comfortable.",
          },
        ],
      },
      {
        title: "",
        content: "",
        list: [
          "We offer competitive rates.",
          "We always complete our work on schedule.",
          "We use certified, eco-friendly materials.",
        ],
      },
      {
        title: "What does our service include?",
        content:
          "From dusting and vacuuming to mopping and sanitizing, we have the skills and expertise to clean your home thoroughly. We use high-quality products and equipment to ensure that our cleaning is effective and long-lasting.",
        subSections: [
          {
            title: "Experienced cleaners",
            content: "Our team of experienced and certified cleaners has the expertise to clean any type of home.",
          },
          {
            title: "Eco-friendly products",
            content: "We use eco-friendly products to protect your health and the environment.",
          },
          {
            title: "Reliable service",
            content: "We understand that cleaning can be a hassle. That's why we offer prompt and reliable services to minimize disruption to your daily routine.",
          },
        ],
      },
      {
        title: "",
        content: "Don't let a dirty home ruin your day. Contact Neatly for professional regular home cleaning services that you can count on. Call us today to schedule an appointment.",
      },
    ],
  },
  "free-enzyme-pet-odour-treatment": {
    id: "free-enzyme-pet-odour-treatment",
    title: "FREE Enzyme pet odour treatment",
    subtitle: "Say goodbye to lingering pet smells with our deep enzyme treatment.",
    image: "/blogs/image1.webp",
    sections: [
      {
        title: "Why Is Floor Cleaning Important?",
        content:
          "Clean and well-maintained floors play a vital role in keeping your home fresh, safe, and welcoming. At Neatly, our floor cleaning and care service removes dirt, stains, and bacteria while protecting the beauty and durability of your flooring.",
        subSections: [
          {
            title: "Professional Care for Every Floor Type",
            content:
              "Different floors require different care. Our team is trained to clean and maintain a variety of flooring materials, including tile, hardwood, laminate, vinyl, and stone. We focus on removing built-up grime while preserving the natural shine and texture of your floors.",
          },
        ],
      },
      {
        title: "Why Choose Our Floor Cleaning Service?",
        content: "",
        list: [
          "Safe and effective cleaning techniques",
          "Eco-friendly cleaning products",
          "Professional tools and equipment",
          "Reliable and scheduled service",
        ],
      },
      {
        title: "What Does Our Service Include?",
        content:
          "Our floor cleaning service is designed to keep your floors spotless and long-lasting.",
        subSections: [
          {
            title: "Deep Floor Cleaning",
            content: "We remove dust, dirt, and stubborn stains from all types of flooring surfaces.",
          },
          {
            title: "Floor Protection",
            content: "Our cleaning methods help protect the surface and extend the life of your floors.",
          },
          {
            title: "Sanitizing & Polishing",
            content: "We sanitize floors to remove germs and restore their natural shine.",
          },
        ],
      },
      {
        title: "Keep Your Floors Looking New",
        content:
          "Don't let dirty or dull floors affect the appearance of your home. Contact Neatly today for professional floor cleaning and care services you can trust.",
      },
    ],
  },

  "book-carpet-rug-upholstery-free-scotchgard": {
    id: "book-carpet-rug-upholstery-free-scotchgard",
    title: "Book Carpet, Rug & Upholstery – Get FREE Scotchgard!",
    subtitle: "Deep clean your home and keep it looking fresh for longer.",
    image: "/blogs/image4.webp",
    sections: [
      {
        title: "Why Is Bathroom sanitization Important?",
        content:
          "Bathrooms are one of the most frequently used areas in any home and can quickly become a breeding ground for germs, bacteria, and unpleasant odors. At Neatly, our bathroom sanitisation service ensures a hygienic, fresh, and safe environment for you and your family.",
        subSections: [
          {
            title: "Thorough Cleaning for a Healthier Bathroom",
            content:
              "Regular sanitization helps prevent the buildup of mold, soap scum, and grime. Our trained team focuses on every detail, ensuring that all surfaces are properly cleaned and disinfected to maintain a healthy and comfortable space.",
          },
        ],
      },
      {
        title: "Why Choose Our Bathroom sanitization Service?",
        content: "",
        list: [
          "Experienced and professional cleaners",
          "Safe and eco-friendly sanitization products",
          "Detailed cleaning of all bathroom surfaces",
          "Reliable and timely service",
        ],
      },
      {
        title: "What Does Our Service Include?",
        content:
          "Our bathroom sanitization service is designed to keep your bathroom clean, fresh, and germ-free.",
        subSections: [
          {
            title: "Toilet and Sink Sanitising",
            content: "We thoroughly disinfect toilets, sinks, and faucets to remove germs and bacteria.",
          },
          {
            title: "Shower and Bathtub Cleaning",
            content: "Our team removes soap scum, stains, and buildup from showers, bathtubs, and tiles.",
          },
          {
            title: "Surface and Floor Cleaning",
            content: "We sanitize countertops, mirrors, and bathroom floors to ensure a sparkling clean finish.",
          },
        ],
      },
      {
        title: "Keep Your Bathroom Fresh and Germ-Free",
        content:
          "Let Neatly take care of your bathroom cleaning needs with our professional sanitization service. Contact us today to schedule your appointment and enjoy a cleaner, healthier home.",
      },
    ],
  },
  "leather-cleaning-complimentary-protection": {
    id: "leather-cleaning-complimentary-protection",
    title: "With every leather cleaning service, you'll receive a complimentary leather protection treatment.",
    subtitle: "Keep your leather looking fresh, conditioned and protected for longer.",
    image: "/blogs/image2.webp",
    sections: [
      {
        title: "Why is deep cleaning essential?",
        content:
          "At Neatly, we recognize the importance of a consistently clean home. Our regular cleaning service ensures a healthier, more comfortable living environment for you and your family.",
        subSections: [
          {
            title: "Your satisfaction is our priority",
            content:
              "If you're finding it hard to keep up with cleaning, it's best to call a professional cleaning service to maintain a healthy home. A professional cleaner can help you create a cleaning schedule and ensure that your home is always clean and comfortable.",
          },
        ],
      },
      {
        title: "",
        content: "",
        list: [
          "We offer competitive rates.",
          "We always complete our work on schedule.",
          "We use certified, eco-friendly materials.",
        ],
      },
      {
        title: "What does our service include?",
        content:
          "From dusting and vacuuming to mopping and sanitizing, we have the skills and expertise to clean your home thoroughly. We use high-quality products and equipment to ensure that our cleaning is effective and long-lasting.",
        subSections: [
          {
            title: "Experienced cleaners",
            content: "Our team of experienced and certified cleaners has the expertise to clean any type of home.",
          },
          {
            title: "Eco-friendly products",
            content: "We use eco-friendly products to protect your health and the environment.",
          },
          {
            title: "Reliable service",
            content: "We understand that cleaning can be a hassle. That's why we offer prompt and reliable services to minimize disruption to your daily routine.",
          },
        ],
      },
      {
        title: "",
        content: "Don't let a dirty home ruin your day. Contact Neatly for professional regular home cleaning services that you can count on. Call us today to schedule an appointment.",
      },
    ],
  },

  "tile-grout-cleaning": {
    id: "tile-grout-cleaning",
    title: "Professional Tile & Grout Cleaning Services",
    subtitle:
      "Restore the original look of your floors with our professional tile and grout cleaning services.",
    image: "/ourServices/tilegroutcleaning.webp",
    sections: [
      {
        title: "",
        content:
          "Over time, tiles and grout can become stained, discoloured and covered with built-up dirt, grime and soap residue. Our professional cleaning process helps remove deep-seated dirt and refresh tired-looking tiled surfaces.",
      },
      {
        title: "",
        content:
          "We provide tile and grout cleaning for bathrooms, kitchens, floors, showers and commercial areas, using professional equipment and effective cleaning methods to achieve a cleaner and fresher finish.",
      },
      {
        title: "",
        content:
          "Whether you need a one-off deep clean, end-of-lease cleaning or regular maintenance, our experienced team delivers reliable and professional results for homes and businesses.",
      },
      {
        title: "",
        content:
          "Serving Sydney and surrounding areas, we are committed to providing quality workmanship, convenient service and competitive pricing.",
      },
      {
        title: "",
        content:
          "Book your professional tile and grout cleaning service today and bring your tiles back to life.",
      },
    ],
  },

  "rug-cleaning": {
    id: "rug-cleaning",
    title: "Professional Rug Cleaning Services",
    subtitle:
      "Keep your rugs looking fresh, clean and well maintained with our professional rug cleaning services.",
    image: "/ourServices/rugcleaing.webp",
    sections: [
      {
        title: "",
        content:
          "Rugs can collect dirt, dust, stains, pet hair, allergens and odours over time. Our professional cleaning methods help remove built-up dirt and restore the appearance and freshness of your rugs.",
      },
      {
        title: "",
        content:
          "We provide rug cleaning for homes, offices, rental properties and commercial spaces, with cleaning solutions suited to a variety of rug types and materials. Whether your rug needs a regular clean, stain removal or a deep clean, our experienced team can help.",
      },
      {
        title: "",
        content:
          "Serving Sydney and surrounding areas, we focus on reliable service, quality workmanship and excellent results.",
      },
      {
        title: "",
        content:
          "Book your professional rug cleaning service today and give your rugs a fresh, clean finish.",
      },
    ],
  },

  "mattress-steam-cleaning": {
    id: "mattress-steam-cleaning",
    title: "Professional Mattress Steam Cleaning Services",
    subtitle:
      "Enjoy a cleaner, fresher and more hygienic sleeping environment with our professional mattress steam cleaning services.",
    image: "/ourServices/mattrecesclean.webp",
    sections: [
      {
        title: "",
        content:
          "Over time, mattresses can collect dust, dirt, sweat, stains, odours and other unwanted build-up. Professional steam cleaning can help refresh your mattress and improve its overall cleanliness.",
      },
      {
        title: "",
        content:
          "We provide mattress steam cleaning for homes, apartments, rental properties and accommodation businesses, using professional equipment and effective cleaning methods designed to remove dirt and stains while freshening the mattress.",
      },
      {
        title: "",
        content:
          "Whether you need a regular mattress clean, stain removal or a deep clean, our experienced team provides reliable and convenient service across Sydney and surrounding areas.",
      },
      {
        title: "",
        content:
          "Book your professional mattress steam cleaning service today and give your mattress a fresh, clean finish.",
      },
    ],
  },

  "leather-lounge-cleaning": {
    id: "leather-lounge-cleaning",
    title: "Professional Leather Lounge Cleaning Services",
    subtitle:
      "Restore the look and comfort of your furniture with our professional leather lounge cleaning services.",
    image: "/ourServices/leathercleaning.webp",
    sections: [
      {
        title: "",
        content:
          "Over time, leather lounges can collect dust, dirt, body oils, stains and grime, causing the surface to look dull, dry or worn. Our professional cleaning process helps remove built-up dirt and refresh the appearance of your leather furniture.",
      },
      {
        title: "",
        content:
          "We provide leather lounge cleaning for homes, apartments, offices, rental properties and commercial spaces, using professional equipment and effective cleaning methods suitable for a variety of leather furniture types.",
      },
      {
        title: "",
        content:
          "Whether you need regular leather cleaning, stain removal, conditioning or a deep clean, our experienced team provides reliable and convenient service across Sydney and surrounding areas.",
      },
      {
        title: "",
        content:
          "Book your professional leather lounge cleaning service today and give your furniture a fresh, clean finish.",
      },
    ],
  },

  "upholstery-steam-cleaning": {
    id: "upholstery-steam-cleaning",
    title: "Professional Upholstery Steam Cleaning Services",
    subtitle:
      "Enjoy cleaner, fresher and more comfortable furniture with our professional upholstery steam cleaning services.",
    image: "/ourServices/sofaandcouch.webp",
    sections: [
      {
        title: "",
        content:
          "Over time, sofas, chairs and other upholstered furniture can collect dust, dirt, stains, pet hair, allergens and unwanted odours. Professional steam cleaning helps remove built-up grime and refresh the appearance of your upholstery.",
      },
      {
        title: "",
        content:
          "We provide upholstery steam cleaning for homes, apartments, offices, rental properties and commercial spaces, using professional equipment and effective cleaning methods suitable for a variety of fabrics and furniture types.",
      },
      {
        title: "",
        content:
          "Whether you need a regular upholstery clean, stain removal or a deep clean, our experienced team provides reliable and convenient service across Sydney and surrounding areas.",
      },
      {
        title: "",
        content:
          "Book your professional upholstery steam cleaning service today and give your furniture a fresh, clean finish.",
      },
    ],
  },
};

/** Primary services shown in the site navigation dropdown. */
export const servicesNav: { title: string; href: string }[] = [
  { title: "Tile & Grout Cleaning", href: "/services/tile-grout-cleaning" },
  { title: "Rug Cleaning", href: "/services/rug-cleaning" },
  { title: "Mattress Steam Cleaning", href: "/services/mattress-steam-cleaning" },
  { title: "Leather Lounge Cleaning", href: "/services/leather-lounge-cleaning" },
  { title: "Upholstery Steam Cleaning", href: "/services/upholstery-steam-cleaning" },
];
