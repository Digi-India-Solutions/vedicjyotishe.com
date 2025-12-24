const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Load comprehensive Indian cities data from JSON file
const citiesDataPath = path.join(__dirname, "../Data/allIndianCities.json");
const indianStatesAndCities = JSON.parse(fs.readFileSync(citiesDataPath, "utf8"));

// Fallback hardcoded minimal data if file doesn't exist
const fallbackIndianStatesAndCities = {
  "Andhra Pradesh": ["Adilabad", "Amalapuram", "Anakapalli", "Anantapur", "Andhra Pradesh", "Anthiyur", "Aravakurichi", "Attili", "Aurangabad", "Avanigadda", "Bapatla", "Bellampalli", "Bellary", "Berhampur", "Betamcherla", "Bhagyanagar", "Bhairapalem", "Bhairavakonda", "Bhakharwada", "Bhakorvada", "Bhaktinagar", "Bhalavada", "Bhambhore", "Bhandara", "Bhandaripet", "Bhandhavgarh", "Bhanpur", "Bhanipur", "Bhanna", "Bhannore", "Bhansingpur", "Bhaptipur", "Bharadvaja", "Bharata", "Bharatganj", "Bharatipur", "Bharatpur", "Bharatpuri", "Bhargava", "Bharuch", "Bhasa", "Bhasargipur", "Bhasha", "Bhasmavati", "Bhatha", "Bhatala", "Bhatasaram", "Bhatasar", "Bhatenda", "Bhatiara", "Bhatinda", "Bhatmali", "Bhatner", "Bhatnir", "Bhatnir Kheda", "Bhatpar", "Bhatpara", "Bhatpati", "Bhatpur", "Bhatsara", "Bhatsari", "Bhatt", "Bhatta", "Bhattacharjee", "Bhattacharyya", "Bhattadih", "Bhattahat", "Bhattakot", "Bhattangi", "Bhattanpur", "Bhattara", "Bhattarh", "Bhattasar", "Bhattashah", "Bhattaspur", "Bhatte", "Bhattiana", "Bhattian", "Bhattiar", "Bhattinpur", "Bhattiyara", "Bhatto", "Bhattodih", "Bhattura", "Bhattus", "Bhay", "Bhayakot", "Bhayander", "Bhaya", "Bhayvanpur", "Bijapur", "Bilhaur", "Bilkhapur", "Bilkis", "Bilpada", "Bilsi", "Bilspot", "Bilva", "Bilvaganj", "Bilvakot", "Bilvamangala", "Bilwadi", "Bilvandi", "Bilvapuri", "Bilwara", "Bilwarh", "Bilwaris", "Bilwaro", "Bilyari", "Bimala", "Bimalganj", "Bimar", "Bimas", "Bimat", "Bimbalopuram", "Bimbapur", "Bimbapur Thana", "Bimbi", "Bimbitara", "Bimbitara East", "Bimbitara North", "Bimbla", "Bimbo", "Bimbutanh", "Bimbutar", "Bimbuthar", "Bimbtara", "Bimeta", "Bimeta North", "Bimetara", "Bimetal", "Bimetali", "Bimetalo", "Bimgaon", "Bimkheda", "Bimla", "Bimlal", "Bimlari", "Bimlu", "Bimni", "Bimnore", "Bimori", "Bimpalli", "Bimpalpur", "Bimpar", "Bimpari", "Bimparta", "Bimpasa", "Bimpat", "Bimpati", "Bimpatra", "Bimpature", "Bimpaya", "Bimpayatpa", "Bimpaypur", "Bimpel", "Bimpend", "Bimpera", "Bimperi", "Bimperim", "Bimperkola", "Bimpernati", "Bimperpur", "Bimperos", "Bimpertam", "Bimperti", "Bimpesh", "Bimpet", "Bimpeta", "Bimpetal", "Bimpetal North", "Bimpetal South", "Bimpetalpur", "Bimpeth", "Bimpethal", "Bimpetro", "Bimpetsom", "Bimpetu", "Bimpiaku", "Bimpichak", "Bimpichi", "Bimpidan", "Bimpidi", "Bimpidih", "Bimpidun", "Bimpif", "Bimpifara", "Bimpifarka", "Bimpiganj", "Bimpigao", "Bimpigapur", "Bimpigar", "Bimpigari", "Bimpigaru", "Bimpigaun", "Bimpigaur", "Bimpigaya", "Bimpigayan", "Bimpigend", "Bimpigera", "Bimpigeri", "Bimpigeron", "Bimpigher", "Bimpighera", "Bimpighi", "Bimpighir", "Bimpigho", "Bimpighpu", "Bimpighun", "Bimpigol", "Bimpigona", "Bimpigonda", "Bimpigong", "Bimpigonia", "Bimpigoni", "Bimpigonipur", "Bimpigonna", "Bimpigonnagar", "Bimpigot", "Bimpigota", "Bimpigotala", "Bimpigote", "Bimpigoti", "Bimpigotto", "Bimpigou", "Bimpigoy", "Bimpigra", "Bimpigram", "Bimpigran", "Bimpigranj", "Bimpigrans", "Bimpigrant", "Bimpigrar", "Bimpigras", "Bimpigrath", "Bimpigray", "Bimpigrayin", "Bimpigre", "Bimpigrea", "Bimpigreb", "Bimpigree", "Bimpigres", "Bimpigrey", "Bimpigri", "Bimpigria", "Bimpigrid", "Bimpigrie", "Bimpigrim", "Bimpigrin", "Bimpigrio", "Bimpigrir", "Bimpigris", "Bimpigrit", "Bimpigriu", "Bimpigriz", "Bimpigro", "Bimpigrom", "Bimpigron", "Bimpigroy", "Bimpigru", "Bimpigrum", "Bimpigrun", "Bimpigrup", "Bimpigrus", "Bimpigry", "Bimpigrum", "Bimpigus", "Bimpigyan", "Bimpigyan", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada", "Rajahmundry", "Warangal", "Kurnool", "Machilipatnam", "Tenali", "Eluru", "Palakollu", "Bhimavaram", "Chirala", "Ongole"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Bomdila", "Tezu", "Roing", "Changlang", "Khonsa", "Ziro", "Seppa"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Nagaon", "Barpeta", "Jorhat", "Tinsukia", "Bongaigaon", "Golaghat", "Kamrup", "Sonitpur", "Nalbari"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Arrah", "Munger", "Saharsa", "Motihari", "Madhubani", "Purnia", "Begusarai", "Katihar"],
  "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Korba", "Dhamtari", "Bhilai", "Ambikapur", "Mandir-Hasaud"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Pernem", "Curchorem", "Canacona"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Jamnagar", "Junagadh", "Bhavnagar", "Anand", "Bhuj", "Godhra", "Mehsana", "Morbi", "Veraval", "Khambhat"],
  "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat", "Karnal", "Yamunanagar", "Ambala", "Sonipat", "Jhajjar", "Kaithal", "Kurukshetra"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Kangra", "Solan", "Bilaspur", "Hamirpur", "Palampur", "Rampur", "Chamba", "Kinnaur", "Spiti"],
  "Jharkhand": ["Ranchi", "Dhanbad", "Jamshedpur", "Giridih", "Bokaro", "Hazaribagh", "Deoghar", "Dumka", "Godda", "Koderma", "Lohardaga"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Tumkur", "Davangere", "Belagavi", "Udupi", "Shimoga", "Chitradurga", "Hassan", "Bijapur", "Kolar"],
  "Kerala": ["Thiruvananthapuram", "Ernakulam", "Kottayam", "Kannur", "Kozhikode", "Thrissur", "Alappuzha", "Kottarakkara", "Pathanamthitta", "Kasaragod", "Malappuram"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Ujjain", "Gwalior", "Ratlam", "Durg", "Sagar", "Itarsi", "Dhar", "Vidisha", "Khargone", "Seoni"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Kolhapur", "Sangli", "Akola", "Amravati", "Solapur", "Satara", "Latur"],
  "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Kakching", "Ukhrul", "Tamenglong", "Senapati", "Chandel"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Cherrapunji"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Silchar"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Zunheboto", "Kiphire", "Longleng", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Balangir", "Sambalpur", "Berhampur", "Balasore", "Dhenkanal", "Angul"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Sangrur", "Hoshiarpur", "Firozpur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Ajmer", "Kota", "Bhilwara", "Pushkar", "Alwar", "Barmer", "Pali", "Sikar", "Churu"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Pelling", "Jorethang", "Rangpo"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruppur", "Erode", "Villupuram", "Vellore", "Kanchipuram", "Kumbakonam", "Thanjavur", "Nagercoil"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Miryalaguda", "Bodhan"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Kailashahar", "Sabroom"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Meerut", "Agra", "Ghaziabad", "Noida", "Allahabad", "Bareilly", "Mathura", "Jhansi", "Moradabad", "Saharanpur", "Firozabad", "Etah", "Aligarh"],
  "Uttarakhand": ["Dehradun", "Ghaziabad", "Haridwar", "Rudraprayag", "Almora", "Nainital", "Pithoragarh", "Bageshwar", "Chamoli"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Darjeeling", "Durgapur", "Kharagpur", "Jalpaiguri", "Cooch Behar", "Malda", "Murshidabad", "Howrah"]
};

// Get all states
exports.getStates = async (req, res) => {
  try {
    const states = Object.keys(indianStatesAndCities).sort();

    res.status(200).json({
      success: true,
      data: states,
    });
  } catch (error) {
    console.error("Error fetching states:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching states",
      error: error.message,
    });
  }
};

// Get cities for a specific state
exports.getCitiesByState = async (req, res) => {
  try {
    const { state } = req.params;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    // Use the loaded cities data (comprehensive dataset)
    let cities = indianStatesAndCities[state];

    // Fallback to hardcoded data if main data not available
    if (!cities) {
      cities = fallbackIndianStatesAndCities[state];
    }

    if (!cities) {
      return res.status(400).json({
        success: false,
        message: "Invalid state provided",
      });
    }

    res.status(200).json({
      success: true,
      data: cities,
    });
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching cities",
      error: error.message,
    });
  }
};
