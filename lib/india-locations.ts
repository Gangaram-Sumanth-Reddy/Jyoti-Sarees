/**
 * India states + major cities for contact enquiry autocomplete.
 * Keep city lists practical; expand as needed.
 */
export const indiaStates: { state: string; cities: string[] }[] = [
  {
    state: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool"],
  },
  {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  },
  {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Kanchipuram"],
  },
  {
    state: "Kerala",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
  },
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  },
  {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  },
  {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  },
  {
    state: "Delhi",
    cities: ["New Delhi", "Delhi"],
  },
  {
    state: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Varanasi", "Noida", "Ghaziabad", "Agra"],
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  },
  {
    state: "Madhya Pradesh",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  },
  {
    state: "Punjab",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  },
  {
    state: "Haryana",
    cities: ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  },
  {
    state: "Odisha",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela"],
  },
  {
    state: "Bihar",
    cities: ["Patna", "Gaya", "Muzaffarpur"],
  },
  {
    state: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad"],
  },
  {
    state: "Assam",
    cities: ["Guwahati", "Dibrugarh", "Silchar"],
  },
  {
    state: "Chhattisgarh",
    cities: ["Raipur", "Bhilai", "Bilaspur"],
  },
  {
    state: "Goa",
    cities: ["Panaji", "Margao", "Vasco da Gama"],
  },
];

export function getStateNames() {
  return indiaStates.map((entry) => entry.state);
}

export function getCitiesForState(state: string) {
  const match = indiaStates.find(
    (entry) => entry.state.toLowerCase() === state.trim().toLowerCase(),
  );
  return match?.cities ?? [];
}

export function filterSuggestions(options: string[], query: string, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return options.slice(0, limit);
  return options
    .filter((option) => option.toLowerCase().includes(q))
    .slice(0, limit);
}
