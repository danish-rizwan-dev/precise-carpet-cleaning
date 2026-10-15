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
                                "href" => ["label" => "Link (pick a page or type a URL)", "type" => "text", "suggest" => "routes"],
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

    "about" => [
        "title" => "About Us",
        "desc" => "Our Story cards and stats, How It Works steps, results checklist and team members.",
        "file" => "src/content/about.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "ourStory" => [
                    "label" => "\"Our Story\" section",
                    "type" => "object",
                    "fields" => [
                        "heading" => ["label" => "Heading (h2)", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle", "type" => "textarea"],
                        "cards" => [
                            "label" => "Story cards",
                            "type" => "list",
                            "fields" => [
                                "title" => ["label" => "Title", "type" => "text"],
                                "content" => ["label" => "Text", "type" => "textarea"],
                            ],
                        ],
                        "stats" => [
                            "label" => "Stats bar",
                            "type" => "list",
                            "fields" => [
                                "value" => ["label" => "Value (e.g. 4.9, 1.2k+)", "type" => "text"],
                                "label" => ["label" => "Label", "type" => "text"],
                            ],
                        ],
                        "images" => [
                            "label" => "Images",
                            "type" => "object",
                            "fields" => [
                                "story1" => ["label" => "Story image 1", "type" => "image"],
                                "story2" => ["label" => "Story image 2", "type" => "image"],
                                "results" => ["label" => "Results section image", "type" => "image"],
                            ],
                        ],
                        "results" => [
                            "label" => "\"Consistent Results\" block",
                            "type" => "object",
                            "fields" => [
                                "heading" => ["label" => "Heading (h2)", "type" => "text"],
                                "paragraph" => ["label" => "Paragraph", "type" => "textarea"],
                                "features" => ["label" => "Checklist (one per line)", "type" => "stringlist"],
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
                    ],
                ],
                "team" => [
                    "label" => "\"People You Can Trust\" section",
                    "type" => "object",
                    "fields" => [
                        "heading" => ["label" => "Heading", "type" => "text"],
                        "subtitle" => ["label" => "Subtitle", "type" => "textarea"],
                        "members" => [
                            "label" => "Team members",
                            "type" => "list",
                            "fields" => [
                                "name" => ["label" => "Name", "type" => "text"],
                                "role" => ["label" => "Role", "type" => "text"],
                                "image" => ["label" => "Photo", "type" => "image"],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],

    "services" => [
        "title" => "Services",
        "desc" => "Service detail pages, nav list and the checklist on the services page.",
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
                        "href" => ["label" => "Link (pick a page or type a URL)", "type" => "text", "suggest" => "routes"],
                    ],
                ],
                "checklist" => [
                    "label" => "Checklist on services page (one per line)",
                    "type" => "stringlist",
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

    "contact" => [
        "title" => "Contact Page",
        "desc" => "The Get in Touch section (heading, intro, location and map) shown on the contact page and homepage.",
        "file" => "src/content/contact.json",
        "schema" => [
            "type" => "object",
            "fields" => [
                "heading" => ["label" => "Heading", "type" => "text"],
                "description" => ["label" => "Intro paragraph", "type" => "textarea"],
                "location" => ["label" => "Location line", "type" => "text"],
                "mapEmbedUrl" => ["label" => "Google Maps embed URL", "type" => "text"],
                "mapTitle" => ["label" => "Map title (accessibility)", "type" => "text"],
            ],
        ],
    ],
];
