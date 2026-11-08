/**
 * Curated India PIN codes for enquiry autocomplete.
 * Covers major cities; filtered by typed digits as the user enters.
 */
export type IndiaPincode = {
  pin: string;
  place: string;
  city: string;
  state: string;
};

export const indiaPincodes: IndiaPincode[] = [
  // Telangana / Hyderabad
  { pin: "500001", place: "Hyderabad GPO", city: "Hyderabad", state: "Telangana" },
  { pin: "500003", place: "Secunderabad", city: "Hyderabad", state: "Telangana" },
  { pin: "500004", place: "Khairatabad", city: "Hyderabad", state: "Telangana" },
  { pin: "500016", place: "Ameerpet", city: "Hyderabad", state: "Telangana" },
  { pin: "500018", place: "Sanathnagar", city: "Hyderabad", state: "Telangana" },
  { pin: "500033", place: "Jubilee Hills", city: "Hyderabad", state: "Telangana" },
  { pin: "500034", place: "Banjara Hills", city: "Hyderabad", state: "Telangana" },
  { pin: "500081", place: "Gachibowli", city: "Hyderabad", state: "Telangana" },
  { pin: "500084", place: "Kondapur", city: "Hyderabad", state: "Telangana" },
  { pin: "500032", place: "Madhapur", city: "Hyderabad", state: "Telangana" },
  { pin: "506001", place: "Warangal", city: "Warangal", state: "Telangana" },
  { pin: "503001", place: "Nizamabad", city: "Nizamabad", state: "Telangana" },
  // Andhra Pradesh
  { pin: "530001", place: "Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh" },
  { pin: "530002", place: "Visakhapatnam Port", city: "Visakhapatnam", state: "Andhra Pradesh" },
  { pin: "520001", place: "Vijayawada", city: "Vijayawada", state: "Andhra Pradesh" },
  { pin: "522001", place: "Guntur", city: "Guntur", state: "Andhra Pradesh" },
  { pin: "517501", place: "Tirupati", city: "Tirupati", state: "Andhra Pradesh" },
  { pin: "524001", place: "Nellore", city: "Nellore", state: "Andhra Pradesh" },
  { pin: "518001", place: "Kurnool", city: "Kurnool", state: "Andhra Pradesh" },
  // Karnataka
  { pin: "560001", place: "Bengaluru GPO", city: "Bengaluru", state: "Karnataka" },
  { pin: "560002", place: "Bangalore City", city: "Bengaluru", state: "Karnataka" },
  { pin: "560034", place: "Koramangala", city: "Bengaluru", state: "Karnataka" },
  { pin: "560038", place: "Indiranagar", city: "Bengaluru", state: "Karnataka" },
  { pin: "560066", place: "Whitefield", city: "Bengaluru", state: "Karnataka" },
  { pin: "560076", place: "Bannerghatta Road", city: "Bengaluru", state: "Karnataka" },
  { pin: "560100", place: "Electronic City", city: "Bengaluru", state: "Karnataka" },
  { pin: "570001", place: "Mysuru", city: "Mysuru", state: "Karnataka" },
  { pin: "575001", place: "Mangaluru", city: "Mangaluru", state: "Karnataka" },
  { pin: "580001", place: "Hubballi", city: "Hubballi", state: "Karnataka" },
  // Tamil Nadu
  { pin: "600001", place: "Chennai GPO", city: "Chennai", state: "Tamil Nadu" },
  { pin: "600002", place: "Anna Salai", city: "Chennai", state: "Tamil Nadu" },
  { pin: "600017", place: "T Nagar", city: "Chennai", state: "Tamil Nadu" },
  { pin: "600020", place: "Adyar", city: "Chennai", state: "Tamil Nadu" },
  { pin: "600040", place: "Anna Nagar", city: "Chennai", state: "Tamil Nadu" },
  { pin: "600042", place: "Velachery", city: "Chennai", state: "Tamil Nadu" },
  { pin: "641001", place: "Coimbatore", city: "Coimbatore", state: "Tamil Nadu" },
  { pin: "625001", place: "Madurai", city: "Madurai", state: "Tamil Nadu" },
  { pin: "636001", place: "Salem", city: "Salem", state: "Tamil Nadu" },
  { pin: "620001", place: "Tiruchirappalli", city: "Tiruchirappalli", state: "Tamil Nadu" },
  { pin: "631501", place: "Kanchipuram", city: "Kanchipuram", state: "Tamil Nadu" },
  // Kerala
  { pin: "695001", place: "Thiruvananthapuram", city: "Thiruvananthapuram", state: "Kerala" },
  { pin: "682001", place: "Kochi", city: "Kochi", state: "Kerala" },
  { pin: "673001", place: "Kozhikode", city: "Kozhikode", state: "Kerala" },
  { pin: "680001", place: "Thrissur", city: "Thrissur", state: "Kerala" },
  { pin: "670001", place: "Kannur", city: "Kannur", state: "Kerala" },
  // Maharashtra
  { pin: "400001", place: "Mumbai GPO", city: "Mumbai", state: "Maharashtra" },
  { pin: "400050", place: "Bandra West", city: "Mumbai", state: "Maharashtra" },
  { pin: "400053", place: "Andheri West", city: "Mumbai", state: "Maharashtra" },
  { pin: "400070", place: "Kurla", city: "Mumbai", state: "Maharashtra" },
  { pin: "400076", place: "Powai", city: "Mumbai", state: "Maharashtra" },
  { pin: "400601", place: "Thane", city: "Thane", state: "Maharashtra" },
  { pin: "411001", place: "Pune GPO", city: "Pune", state: "Maharashtra" },
  { pin: "411014", place: "Hadapsar", city: "Pune", state: "Maharashtra" },
  { pin: "411045", place: "Baner", city: "Pune", state: "Maharashtra" },
  { pin: "440001", place: "Nagpur", city: "Nagpur", state: "Maharashtra" },
  { pin: "422001", place: "Nashik", city: "Nashik", state: "Maharashtra" },
  { pin: "431001", place: "Aurangabad", city: "Aurangabad", state: "Maharashtra" },
  // Gujarat
  { pin: "380001", place: "Ahmedabad", city: "Ahmedabad", state: "Gujarat" },
  { pin: "380015", place: "Navrangpura", city: "Ahmedabad", state: "Gujarat" },
  { pin: "395001", place: "Surat", city: "Surat", state: "Gujarat" },
  { pin: "390001", place: "Vadodara", city: "Vadodara", state: "Gujarat" },
  { pin: "360001", place: "Rajkot", city: "Rajkot", state: "Gujarat" },
  { pin: "382010", place: "Gandhinagar", city: "Gandhinagar", state: "Gujarat" },
  // Rajasthan
  { pin: "302001", place: "Jaipur", city: "Jaipur", state: "Rajasthan" },
  { pin: "302015", place: "Malviya Nagar", city: "Jaipur", state: "Rajasthan" },
  { pin: "342001", place: "Jodhpur", city: "Jodhpur", state: "Rajasthan" },
  { pin: "313001", place: "Udaipur", city: "Udaipur", state: "Rajasthan" },
  { pin: "324001", place: "Kota", city: "Kota", state: "Rajasthan" },
  { pin: "305001", place: "Ajmer", city: "Ajmer", state: "Rajasthan" },
  // Delhi / NCR
  { pin: "110001", place: "New Delhi GPO", city: "New Delhi", state: "Delhi" },
  { pin: "110016", place: "Hauz Khas", city: "New Delhi", state: "Delhi" },
  { pin: "110017", place: "Saket", city: "New Delhi", state: "Delhi" },
  { pin: "110024", place: "Lajpat Nagar", city: "New Delhi", state: "Delhi" },
  { pin: "110048", place: "Greater Kailash", city: "New Delhi", state: "Delhi" },
  { pin: "110092", place: "Laxmi Nagar", city: "Delhi", state: "Delhi" },
  { pin: "122001", place: "Gurugram", city: "Gurugram", state: "Haryana" },
  { pin: "122002", place: "DLF Phase 1", city: "Gurugram", state: "Haryana" },
  { pin: "201301", place: "Noida", city: "Noida", state: "Uttar Pradesh" },
  { pin: "201304", place: "Noida Sector 62", city: "Noida", state: "Uttar Pradesh" },
  { pin: "121001", place: "Faridabad", city: "Faridabad", state: "Haryana" },
  // Uttar Pradesh
  { pin: "226001", place: "Lucknow", city: "Lucknow", state: "Uttar Pradesh" },
  { pin: "208001", place: "Kanpur", city: "Kanpur", state: "Uttar Pradesh" },
  { pin: "221001", place: "Varanasi", city: "Varanasi", state: "Uttar Pradesh" },
  { pin: "201010", place: "Ghaziabad", city: "Ghaziabad", state: "Uttar Pradesh" },
  { pin: "282001", place: "Agra", city: "Agra", state: "Uttar Pradesh" },
  // West Bengal
  { pin: "700001", place: "Kolkata GPO", city: "Kolkata", state: "West Bengal" },
  { pin: "700016", place: "Park Street", city: "Kolkata", state: "West Bengal" },
  { pin: "700019", place: "Ballygunge", city: "Kolkata", state: "West Bengal" },
  { pin: "700091", place: "Salt Lake", city: "Kolkata", state: "West Bengal" },
  { pin: "711101", place: "Howrah", city: "Howrah", state: "West Bengal" },
  { pin: "713201", place: "Durgapur", city: "Durgapur", state: "West Bengal" },
  { pin: "734001", place: "Siliguri", city: "Siliguri", state: "West Bengal" },
  // Madhya Pradesh
  { pin: "462001", place: "Bhopal", city: "Bhopal", state: "Madhya Pradesh" },
  { pin: "452001", place: "Indore", city: "Indore", state: "Madhya Pradesh" },
  { pin: "474001", place: "Gwalior", city: "Gwalior", state: "Madhya Pradesh" },
  { pin: "482001", place: "Jabalpur", city: "Jabalpur", state: "Madhya Pradesh" },
  // Punjab / Chandigarh
  { pin: "160001", place: "Chandigarh", city: "Chandigarh", state: "Punjab" },
  { pin: "141001", place: "Ludhiana", city: "Ludhiana", state: "Punjab" },
  { pin: "143001", place: "Amritsar", city: "Amritsar", state: "Punjab" },
  { pin: "144001", place: "Jalandhar", city: "Jalandhar", state: "Punjab" },
  // Haryana
  { pin: "132103", place: "Panipat", city: "Panipat", state: "Haryana" },
  { pin: "133001", place: "Ambala", city: "Ambala", state: "Haryana" },
  // Odisha
  { pin: "751001", place: "Bhubaneswar", city: "Bhubaneswar", state: "Odisha" },
  { pin: "753001", place: "Cuttack", city: "Cuttack", state: "Odisha" },
  { pin: "769001", place: "Rourkela", city: "Rourkela", state: "Odisha" },
  // Bihar / Jharkhand
  { pin: "800001", place: "Patna", city: "Patna", state: "Bihar" },
  { pin: "823001", place: "Gaya", city: "Gaya", state: "Bihar" },
  { pin: "842001", place: "Muzaffarpur", city: "Muzaffarpur", state: "Bihar" },
  { pin: "834001", place: "Ranchi", city: "Ranchi", state: "Jharkhand" },
  { pin: "831001", place: "Jamshedpur", city: "Jamshedpur", state: "Jharkhand" },
  { pin: "826001", place: "Dhanbad", city: "Dhanbad", state: "Jharkhand" },
  // Assam / North East / others
  { pin: "781001", place: "Guwahati", city: "Guwahati", state: "Assam" },
  { pin: "786001", place: "Dibrugarh", city: "Dibrugarh", state: "Assam" },
  { pin: "788001", place: "Silchar", city: "Silchar", state: "Assam" },
  { pin: "492001", place: "Raipur", city: "Raipur", state: "Chhattisgarh" },
  { pin: "490001", place: "Bhilai", city: "Bhilai", state: "Chhattisgarh" },
  { pin: "495001", place: "Bilaspur", city: "Bilaspur", state: "Chhattisgarh" },
  { pin: "403001", place: "Panaji", city: "Panaji", state: "Goa" },
  { pin: "403601", place: "Margao", city: "Margao", state: "Goa" },
  { pin: "403802", place: "Vasco da Gama", city: "Vasco da Gama", state: "Goa" },
];

export function pincodeSuggestionLabel(entry: IndiaPincode) {
  return `${entry.pin} · ${entry.place}`;
}

export function getPincodeSuggestions(query: string, limit = 8): string[] {
  const digits = query.replace(/\D/g, "");
  if (digits.length < 1) return [];

  return indiaPincodes
    .filter((entry) => entry.pin.startsWith(digits))
    .slice(0, limit)
    .map(pincodeSuggestionLabel);
}

export function findPincodeEntry(value: string) {
  const pin = value.replace(/\D/g, "").slice(0, 6);
  if (pin.length !== 6) return undefined;
  return indiaPincodes.find((entry) => entry.pin === pin);
}

export function isValidIndianPincode(value: string) {
  const pin = value.replace(/\D/g, "");
  return /^\d{6}$/.test(pin);
}
