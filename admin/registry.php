<?php
declare(strict_types=1);

/**
 * Editors registry. Each entry describes one content JSON file:
 *  - title/desc: shown on the dashboard
 *  - file: path inside the git repo
 *  - schema: root schema. type "object" => fields map, type "list" => items list.
 *
 * Field types: text, textarea, number, checkbox, image, stringlist, list, objectmap.
 * "optional" fields are omitted from the saved JSON when left empty.
 */

$EDITORS = [
    "site" => [
        "title" => "Site Information",
        "desc" => "Domain, business name, phone, email and social links. Used site-wide and in SEO metadata.",
        "file" => "src/content/site.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "url" => ["label" => "Website URL (https://…, no trailing slash)", "type" => "text"],
                "name" => ["label" => "Business name", "type" => "text"],
                "shortName" => ["label" => "Short name", "type" => "text"],
                "description" => ["label" => "Meta description (150–160 chars)", "type" => "textarea"],
                "phone" => ["label" => "Phone (displayed)", "type" => "text"],
                "phoneHref" => ["label" => "Phone for links (e.g. +61434161161)", "type" => "text"],
                "email" => ["label" => "Email", "type" => "text"],
                "locality" => ["label" => "City", "type" => "text"],
                "region" => ["label" => "State/Region", "type" => "text"],
                "country" => ["label" => "Country code (AU)", "type" => "text"],
                "facebook" => ["label" => "Facebook URL", "type" => "text"],
                "instagram" => ["label" => "Instagram URL", "type" => "text"],
                "ratingValue" => ["label" => "Google rating value (e.g. 4.9)", "type" => "number", "optional" => true],
                "reviewCount" => ["label" => "Number of reviews (0 hides rating from Google)", "type" => "number", "optional" => true],
            ],
        ],
    ],

    "home" => [
        "title" => "Homepage",
        "desc" => "Hero text, offers heading, service cards, how-it-works steps, stats and Save Your Time section.",
        "file" => "src/content/home.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "hero" => [
                    "label" => "Hero section",
                    "type" => "object",
                    "fields" => [
                        "title" => ["label" => "Main heading (h1)", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle (h2)", "type" => "text"],
                        "description" => ["label" => "Description", "type" => "text"],
                        "ratingValue" => ["label" => "Rating shown (e.g. 4.9)", "type" => "text"],
                        "ratingLabel" => ["label" => "Rating label", "type" => "text"],
                        "ratingNote" => ["label" => "Rating note", "type" => "text"],
                        "offerImage" => ["label" => "Offer banner image", "type" => "image"],
                        "offerAlt" => ["label" => "Offer banner alt text", "type" => "text"],
                    ],
                ],
                "offersSection" => [
                    "label" => "Cleaning offers section",
                    "type" => "object",
                    "fields" => [
                        "heading" => ["label" => "Heading", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle", "type" => "text"],
                    ],
                ],
                "showcase" => [
                    "label" => "Showcase paragraph",
                    "type" => "object",
                    "fields" => [
                        "paragraph" => ["label" => "Paragraph", "type" => "textarea"],
                    ],
                ],
                "servicesSection" => [
                    "label" => "\"Our services\" section",
                    "type" => "object",
                    "fields" => [
                        "heading" => ["label" => "Heading", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle", "type" => "textarea"],
                        "cards" => [
                            "label" => "Service cards",
                            "type" => "list",
                            "fields" => [
                                "id" => ["label" => "Order number", "type" => "number"],
                                "title" => ["label" => "Title", "type" => "text"],
                                "description" => ["label" => "Description", "type" => "textarea"],
                                "image" => ["label" => "Image", "type" => "image"],
                                "href" => ["label" => "Link (e.g. /services/rug-cleaning)", "type" => "text"],
                            ],
                        ],
                    ],
                ],
                "howItWorks" => [
                    "label" => "\"How it works\" section",
                    "type" => "object",
                    "fields" => [
                        "heading" => ["label" => "Heading", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle", "type" => "textarea"],
                        "steps" => [
                            "label" => "Steps",
                            "type" => "list",
                            "fields" => [
                                "id" => ["label" => "Order number", "type" => "number"],
                                "title" => ["label" => "Title (include the number, e.g. \"1. Book Your Service\")", "type" => "text"],
                                "description" => ["label" => "Description", "type" => "textarea"],
                                "image" => ["label" => "Image", "type" => "image"],
                            ],
                        ],
                        "stats" => [
                            "label" => "Stats bar",
                            "type" => "list",
                            "fields" => [
                                "value" => ["label" => "Value (e.g. 1.2k+)", "type" => "text"],
                                "label" => ["label" => "Label", "type" => "text"],
                            ],
                        ],
                        "saveTimeHeading" => ["label" => "Save Your Time heading", "type" => "text"],
                        "saveTimeSubtitle" => ["label" => "Save Your Time subtitle", "type" => "textarea"],
                        "accordion" => [
                            "label" => "Save Your Time accordion items",
                            "type" => "list",
                            "fields" => [
                                "title" => ["label" => "Title", "type" => "text"],
                                "description" => ["label" => "Description", "type" => "textarea"],
                                "image" => ["label" => "Image", "type" => "image"],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],

    "offers" => [
        "title" => "Cleaning Offers",
        "desc" => "The offer cards shown on the homepage and services page.",
        "file" => "src/content/offers.json",
        "schema" => [
            "type" => "list",
            "label" => "Offers",
            "fields" => [
                "id" => ["label" => "Order number", "type" => "number"],
                "slug" => ["label" => "Slug (URL id)", "type" => "text"],
                "image" => ["label" => "Image", "type" => "image"],
                "title" => ["label" => "Title", "type" => "text"],
                "description" => ["label" => "Description", "type" => "textarea"],
            ],
        ],
    ],

    "services" => [
        "title" => "Services",
        "desc" => "Service detail pages (SEO content), nav list and the checklist on the services page.",
        "file" => "src/content/services.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "servicesData" => [
                    "label" => "Service detail pages",
                    "type" => "objectmap",
                    "key" => "id",
                    "hint" => "The id is the page URL (/services/your-id). Changing it changes the URL — update links if needed.",
                    "fields" => [
                        "id" => ["label" => "ID / URL slug", "type" => "text"],
                        "title" => ["label" => "Page title (h1)", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle under title", "type" => "textarea"],
                        "image" => ["label" => "Hero image", "type" => "image"],
                        "sections" => [
                            "label" => "Content sections",
                            "type" => "list",
                            "fields" => [
                                "title" => ["label" => "Section heading (optional)", "type" => "text"],
                                "content" => ["label" => "Section text", "type" => "textarea"],
                                "list" => ["label" => "Bullet points (one per line)", "type" => "stringlist", "optional" => true],
                                "subSections" => [
                                    "label" => "Sub-sections",
                                    "type" => "list",
                                    "optional" => true,
                                    "fields" => [
                                        "title" => ["label" => "Sub-heading", "type" => "text"],
                                        "content" => ["label" => "Sub-text", "type" => "textarea"],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                "servicesNav" => [
                    "label" => "Services dropdown (header nav)",
                    "type" => "list",
                    "fields" => [
                        "title" => ["label" => "Label", "type" => "text"],
                        "href" => ["label" => "Link", "type" => "text"],
                    ],
                ],
                "checklist" => [
                    "label" => "Checklist on services page (one per line)",
                    "type" => "stringlist",
                ],
            ],
        ],
    ],

    "articles" => [
        "title" => "Blog Articles",
        "desc" => "Blog posts. The id is the URL (/blogs/your-id).",
        "file" => "src/content/articles.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "articlesData" => [
                    "label" => "Articles",
                    "type" => "objectmap",
                    "key" => "id",
                    "hint" => "The id is the page URL (/blogs/your-id).",
                    "fields" => [
                        "id" => ["label" => "ID / URL slug", "type" => "text"],
                        "date" => ["label" => "Date (e.g. Jul 6, 2026)", "type" => "text"],
                        "title" => ["label" => "Title (h1)", "type" => "text"],
                        "image" => ["label" => "Featured image", "type" => "image"],
                        "sections" => [
                            "label" => "Sections",
                            "type" => "list",
                            "fields" => [
                                "title" => ["label" => "Heading", "type" => "text"],
                                "content" => ["label" => "Text", "type" => "textarea"],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],

    "pricing" => [
        "title" => "Pricing",
        "desc" => "Residential and commercial pricing cards.",
        "file" => "src/content/pricing.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "heading" => ["label" => "Page heading", "type" => "text"],
                "subtitle" => ["label" => "Page subtitle", "type" => "textarea"],
                "residential" => [
                    "label" => "Residential cards",
                    "type" => "list",
                    "fields" => [
                        "id" => ["label" => "Order number", "type" => "number"],
                        "title" => ["label" => "Title", "type" => "text"],
                        "price" => ["label" => "Price (e.g. $79)", "type" => "text"],
                    ],
                ],
                "commercial" => [
                    "label" => "Commercial cards",
                    "type" => "list",
                    "fields" => [
                        "id" => ["label" => "Order number", "type" => "number"],
                        "title" => ["label" => "Title", "type" => "text"],
                        "range" => ["label" => "Size range", "type" => "text", "optional" => true],
                        "price" => ["label" => "Price (e.g. $2.50)", "type" => "text"],
                        "suffix" => ["label" => "Suffix (e.g. /sqm)", "type" => "text", "optional" => true],
                        "showFrom" => ["label" => "Show \"From\" before price", "type" => "checkbox"],
                    ],
                ],
            ],
        ],
    ],

    "testimonials" => [
        "title" => "Testimonials",
        "desc" => "Homepage carousel, feature bullets and the service-page testimonial carousel.",
        "file" => "src/content/testimonials.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "homepage" => [
                    "label" => "Homepage testimonials",
                    "type" => "list",
                    "fields" => [
                        "id" => ["label" => "Order number", "type" => "number"],
                        "name" => ["label" => "Name", "type" => "text"],
                        "role" => ["label" => "Role", "type" => "text"],
                        "text" => ["label" => "Quote", "type" => "textarea"],
                        "image" => ["label" => "Photo", "type" => "image"],
                    ],
                ],
                "features" => [
                    "label" => "Feature bullets (one per line)",
                    "type" => "stringlist",
                ],
                "serviceDetail" => [
                    "label" => "Service page testimonials",
                    "type" => "list",
                    "fields" => [
                        "id" => ["label" => "Order number", "type" => "number"],
                        "quote" => ["label" => "Quote", "type" => "textarea"],
                        "name" => ["label" => "Name", "type" => "text"],
                        "role" => ["label" => "Role", "type" => "text"],
                        "avatar" => ["label" => "Photo", "type" => "image"],
                    ],
                ],
            ],
        ],
    ],

    "faqs" => [
        "title" => "FAQs",
        "desc" => "Homepage FAQ accordion. Also feeds the FAQ SEO schema.",
        "file" => "src/content/faqs.json",
        "schema" => [
            "type" => "list",
            "label" => "Questions",
            "fields" => [
                "question" => ["label" => "Question", "type" => "text"],
                "answer" => ["label" => "Answer", "type" => "textarea"],
            ],
        ],
    ],

    "features" => [
        "title" => "Features Strip",
        "desc" => "The three badges shown under the hero and on the pricing page.",
        "file" => "src/content/features.json",
        "schema" => [
            "type" => "list",
            "label" => "Features",
            "fields" => [
                "icon" => ["label" => "Icon (SVG)", "type" => "image"],
                "alt" => ["label" => "Alt text", "type" => "text"],
                "label" => ["label" => "Line 1", "type" => "text"],
                "labelLine2" => ["label" => "Line 2 (optional)", "type" => "text", "optional" => true],
            ],
        ],
    ],

    "contact-topics" => [
        "title" => "Contact Form Topics",
        "desc" => "Dropdown options in the contact form.",
        "file" => "src/content/contactTopics.json",
        "schema" => [
            "type" => "stringlist",
            "label" => "Topics (one per line)",
        ],
    ],
];
