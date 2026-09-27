export type Testimonial = {
  id: string;
  name: string;
  city: string;
  saree: string;
  rating: number;
  quote: string;
  image: string;
  featured?: boolean;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "priya",
    name: "Priya Venkatesh",
    city: "Hyderabad",
    saree: "Ruby Kanjivaram Silk",
    rating: 5,
    quote:
      "I wore my ruby Kanjivaram for my sister's wedding and everyone asked where it was from. The zari is rich, the silk feels luxurious—a saree I will treasure.",
    image: "/assets/testimonials/priya.jpg",
    featured: true,
  },
  {
    id: "lakshmi",
    name: "Lakshmi Narayanan",
    city: "Chennai",
    saree: "Emerald Soft Silk",
    rating: 5,
    quote:
      "Beautiful drape and so comfortable for a full day of pooja. The colour is exactly as shown—rare to find such honest quality.",
    image: "/assets/testimonials/lakshmi.jpg",
  },
  {
    id: "ananya",
    name: "Ananya Reddy",
    city: "Bengaluru",
    saree: "Peach Designer Georgette",
    rating: 5,
    quote:
      "Light, elegant, and the sequin work is so delicate. I got compliments all evening at my friend's reception.",
    image: "/assets/testimonials/ananya.jpg",
  },
  {
    id: "meera",
    name: "Meera Iyer",
    city: "Vijayawada",
    saree: "Navy Banarasi Silk",
    rating: 5,
    quote:
      "Picked my engagement saree here. The Banarasi weave is stunning in person and they guided me patiently through every option.",
    image: "/assets/testimonials/meera.jpg",
  },
  {
    id: "kavya",
    name: "Kavya Rao",
    city: "Visakhapatnam",
    saree: "Mustard Cotton Handloom",
    rating: 4,
    quote:
      "My go-to for everyday office sarees now. Breathable cotton, lovely border, and quick responses on WhatsApp.",
    image: "/assets/testimonials/kavya.jpg",
  },
];
