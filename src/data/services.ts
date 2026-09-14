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
    image: "/blogs/image5.png",
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
    image: "/blogs/image2.png",
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
    image: "/blogs/image1.png",
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
  "free-stain-removal-carpet-cleaning": {
    id: "free-stain-removal-carpet-cleaning",
    title: "FREE stain removal treatment with every carpet cleaning.",
    subtitle: "Give your carpets a deeper clean while tackling those stubborn stains.",
    image: "/blogs/image3.png",
    sections: [
      {
        title: "Why Is Kitchen Cleaning Important?",
        content:
          "The kitchen is one of the most frequently used areas in any home, making it prone to grease, food spills, and bacteria buildup. At Neatly, our kitchen cleaning service ensures a hygienic and organized cooking space for you and your family.",
        subSections: [
          {
            title: "A Deeper Clean for Your Kitchen",
            content:
              "Regular kitchen cleaning not only improves hygiene but also helps maintain the condition of appliances, cabinets, and countertops. Our team uses safe, eco-friendly cleaning products and professional techniques to remove grease, stains, and unpleasant odors.",
          },
        ],
      },
      {
        title: "Why Choose Our Kitchen Cleaning Service?",
        content: "",
        list: [
          "Professional and experienced cleaners",
          "Safe, eco-friendly cleaning products",
          "Attention to detail in every corner",
          "Reliable and on-time service",
        ],
      },
      {
        title: "What Does Our Service Include?",
        content:
          "Our kitchen cleaning service focuses on the areas that need the most attention to keep your kitchen fresh and spotless.",
        subSections: [
          {
            title: "Surface Cleaning",
            content: "We clean and sanitize countertops, sinks, and kitchen surfaces to remove dirt, grease, and bacteria.",
          },
          {
            title: "Appliance Exterior Cleaning",
            content: "Our team wipes and cleans the exterior of appliances such as ovens, refrigerators, and microwaves.",
          },
          {
            title: "Cabinet and Floor Cleaning",
            content: "We remove dust, grease, and stains from cabinets and thoroughly clean kitchen floors.",
          },
        ],
      },
      {
        title: "Enjoy a Fresh and Hygienic Kitchen",
        content:
          "Let Neatly handle the hard work so you can enjoy a clean, fresh, and comfortable kitchen every day. Contact us today to schedule your professional kitchen cleaning service.",
      },
    ],
  },
  "book-carpet-rug-upholstery-free-scotchgard": {
    id: "book-carpet-rug-upholstery-free-scotchgard",
    title: "Book Carpet, Rug & Upholstery – Get FREE Scotchgard!",
    subtitle: "Deep clean your home and keep it looking fresh for longer.",
    image: "/blogs/image4.png",
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
    image: "/blogs/image2.png",
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
};
