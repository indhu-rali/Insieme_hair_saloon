/**
 * INSIEME HAIR SALON — SITE CONTENT
 * -----------------------------------------------------------------
 * This is the single place to edit text, prices, hours, gallery
 * items and business details. Every page reads from this file, so
 * a non-technical editor can update the salon's content without
 * touching any HTML.
 *
 * HOW TO EDIT:
 *  - Open this file in any text editor.
 *  - Change the text between quotes " " — do not remove commas,
 *    quotes or curly braces { }.
 *  - Save the file and refresh the website to see your changes.
 */

const SITE_CONTENT = {

  business: {
    name: "Insieme Hair Salon",
    tagline: "L'arte di stare insieme — the art of being together.",
    phone: "+1 (555) 123-4567",
    phoneLink: "+15551234567",
    email: "hello@insiemehairsalon.com",
    address: {
      line1: "123 High Street",
      line2: "Your City, ST 00000",
      full: "123 High Street, Your City, ST 00000"
    },
    mapsEmbedQuery: "123+High+Street+Your+City+ST+00000",
    mapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=123+High+Street+Your+City",
    social: {
      instagram: "https://instagram.com/insiemehairsalon",
      facebook: "https://facebook.com/insiemehairsalon",
      tiktok: "https://tiktok.com/@insiemehairsalon"
    }
  },

  hours: [
    { day: "Monday",    open: "Closed",  close: "" },
    { day: "Tuesday",   open: "9:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Thursday",  open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday",    open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday",  open: "9:00 AM", close: "5:00 PM" },
    { day: "Sunday",    open: "Closed",  close: "" }
  ],

  holidayNote: "Hours may vary on public holidays — please call ahead to confirm.",

  services: [
    {
      category: "Taglio — Cuts",
      items: [
        { name: "Women's Cut & Style",  price: "From $65",  note: "Consultation, wash, cut and finish" },
        { name: "Men's Cut",            price: "From $40",  note: "Precision cut with clipper or scissor finish" },
        { name: "Children's Cut",       price: "From $25",  note: "Under 12" },
        { name: "Fringe / Bang Trim",   price: "$15",       note: "Between full appointments" }
      ]
    },
    {
      category: "Colore — Colour",
      items: [
        { name: "Full Colour",          price: "From $110", note: "Single process, root to tip" },
        { name: "Balayage / Highlights",price: "From $150", note: "Hand-painted, includes toner" },
        { name: "Root Touch-Up",        price: "From $75",  note: "Regrowth blend" },
        { name: "Toner / Gloss",        price: "From $45",  note: "Adds shine, corrects tone" }
      ]
    },
    {
      category: "Trattamenti — Treatments",
      items: [
        { name: "Deep Conditioning",    price: "$35",  note: "15-minute intensive mask" },
        { name: "Keratin Smoothing",    price: "From $180", note: "Lasts up to 3 months" },
        { name: "Scalp Treatment",      price: "$40",  note: "Exfoliation and massage" }
      ]
    },
    {
      category: "Styling & Occasion",
      items: [
        { name: "Blow-dry & Style",     price: "From $45",  note: "Wash included" },
        { name: "Special Occasion Updo",price: "From $85",  note: "Bridal and events" },
        { name: "Hair Extensions Fitting", price: "On consultation", note: "Priced per method" }
      ]
    }
  ],

  gallery: [
    { id: "g1", label: "Balayage colour transformation", tag: "Colore" },
    { id: "g2", label: "Precision bob cut",               tag: "Taglio" },
    { id: "g3", label: "Bridal updo styling",              tag: "Styling" },
    { id: "g4", label: "Root melt colour blend",           tag: "Colore" },
    { id: "g5", label: "Textured men's crop",              tag: "Taglio" },
    { id: "g6", label: "Keratin smoothing result",         tag: "Trattamenti" },
    { id: "g7", label: "Soft curls finish",                tag: "Styling" },
    { id: "g8", label: "Copper colour transformation",     tag: "Colore" },
    { id: "g9", label: "Salon interior",                   tag: "Studio" }
  ],

  testimonials: [
    { quote: "The team took the time to understand exactly what I wanted. Best colour I've had in years.", author: "Chiara M." },
    { quote: "Warm, professional, and genuinely skilled. Insieme feels like family.", author: "David R." },
    { quote: "My go-to salon for every occasion cut. Never disappointed.", author: "Priya S." }
  ]

};
