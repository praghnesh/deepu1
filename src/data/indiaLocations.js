// Comprehensive Indian Cities, Major Landmarks, Transit Hubs, and Pincode Service
export const POPULAR_CITIES = [
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', code: 'VTZ', pincode: '530001' },
  { name: 'Hyderabad', state: 'Telangana', code: 'HYD', pincode: '500001' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', code: 'VGA', pincode: '520001' },
  { name: 'Guntur', state: 'Andhra Pradesh', code: 'GNT', pincode: '522001' },
  { name: 'Tirupati', state: 'Andhra Pradesh', code: 'TIR', pincode: '517501' },
  { name: 'Bengaluru', state: 'Karnataka', code: 'BLR', pincode: '560001' },
  { name: 'Chennai', state: 'Tamil Nadu', code: 'MAA', pincode: '600001' },
  { name: 'Mumbai', state: 'Maharashtra', code: 'BOM', pincode: '400001' },
  { name: 'Delhi NCR', state: 'Delhi', code: 'DEL', pincode: '110001' },
  { name: 'Srisailam', state: 'Andhra Pradesh', code: 'SRI', pincode: '518101' },
];

export const CITY_LOCAL_HUBS = {
  'Visakhapatnam': [
    { name: 'VSKP Station', label: 'Visakhapatnam Railway Station', type: 'station', pincode: '530004' },
    { name: 'Vizag Airport', label: 'Visakhapatnam International Airport (VTZ)', type: 'airport', pincode: '530009' },
    { name: 'RTC Complex', label: 'Dwaraka RTC Bus Complex', type: 'bus', pincode: '530016' },
    { name: 'Gajuwaka', label: 'Gajuwaka Junction', type: 'hub', pincode: '530026' },
    { name: 'MVP Colony', label: 'MVP Colony Sector 1-12', type: 'area', pincode: '530017' },
    { name: 'Rushikonda', label: 'Rushikonda Beach & IT SEZ', type: 'tourist', pincode: '530045' },
    { name: 'RK Beach', label: 'Ramakrishna Beach Road', type: 'tourist', pincode: '530002' },
    { name: 'Siripuram', label: 'Siripuram Junction', type: 'area', pincode: '530003' },
    { name: 'Madhurawada', label: 'Madhurawada City Hub', type: 'hub', pincode: '530048' },
    { name: 'Pendurthi', label: 'Pendurthi Junction', type: 'hub', pincode: '531173' }
  ],
  'Vijayawada': [
    { name: 'BZA Station', label: 'Vijayawada Railway Station', type: 'station', pincode: '520001' },
    { name: 'Gannavaram Airport', label: 'Vijayawada (VGA) Airport', type: 'airport', pincode: '521102' },
    { name: 'Pandit Nehru Bus Stand', label: 'PNBS Bus Station', type: 'bus', pincode: '520013' },
    { name: 'Benz Circle', label: 'Benz Circle MG Road', type: 'hub', pincode: '520010' },
    { name: 'Kanaka Durga Temple', label: 'Durga Temple Ghat Road', type: 'tourist', pincode: '520001' },
    { name: 'Bhavani Island', label: 'Bhavani Island Ferry Terminal', type: 'tourist', pincode: '520012' }
  ],
  'Hyderabad': [
    { name: 'RGIA Airport', label: 'Rajiv Gandhi International Airport (HYD)', type: 'airport', pincode: '500409' },
    { name: 'Secunderabad Station', label: 'Secunderabad Junction', type: 'station', pincode: '500003' },
    { name: 'Hitec City', label: 'Hitec City Cyber Towers', type: 'hub', pincode: '500081' },
    { name: 'Gachibowli', label: 'Gachibowli Financial District', type: 'hub', pincode: '500032' },
    { name: 'Jubilee Hills', label: 'Jubilee Hills Check Post', type: 'area', pincode: '500033' },
    { name: 'Charminar', label: 'Charminar Old City', type: 'tourist', pincode: '500002' }
  ],
  'Tirupati': [
    { name: 'Tirupati Station', label: 'Tirupati Central Railway Station', type: 'station', pincode: '517501' },
    { name: 'Renigunta Airport', label: 'Tirupati Airport (TIR)', type: 'airport', pincode: '517520' },
    { name: 'Alipiri Gate', label: 'Alipiri Footsteps & Toll Plaza', type: 'tourist', pincode: '517507' },
    { name: 'Tirumala Hill', label: 'Tirumala Temple Main Bus Stand', type: 'tourist', pincode: '517504' }
  ],
  'Guntur': [
    { name: 'Guntur Station', label: 'Guntur Railway Station', type: 'station', pincode: '522001' },
    { name: 'NTR Bus Station', label: 'Guntur RTC Bus Complex', type: 'bus', pincode: '522002' },
    { name: 'Laxmipuram', label: 'Laxmipuram Main Road', type: 'area', pincode: '522007' },
    { name: 'Amaravati Capital', label: 'Amaravati Secretariat', type: 'hub', pincode: '522237' }
  ]
};

// Comprehensive Indian Cities & Districts Directory
export const INDIA_CITIES = [
  // Andhra Pradesh
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', district: 'Visakhapatnam', pincodes: ['530001', '530002', '530004', '530016', '530017', '530026', '530045'] },
  { name: 'Vijayawada', state: 'Andhra Pradesh', district: 'NTR', pincodes: ['520001', '520002', '520008', '520010', '520013', '521102'] },
  { name: 'Guntur', state: 'Andhra Pradesh', district: 'Guntur', pincodes: ['522001', '522002', '522004', '522006', '522007'] },
  { name: 'Tirupati', state: 'Andhra Pradesh', district: 'Tirupati', pincodes: ['517501', '517502', '517504', '517507', '517520'] },
  { name: 'Rajahmundry', state: 'Andhra Pradesh', district: 'East Godavari', pincodes: ['533101', '533102', '533103', '533104'] },
  { name: 'Kakinada', state: 'Andhra Pradesh', district: 'Kakinada', pincodes: ['533001', '533002', '533003', '533004'] },
  { name: 'Nellore', state: 'Andhra Pradesh', district: 'SPSR Nellore', pincodes: ['524001', '524002', '524003', '524004'] },
  { name: 'Kurnool', state: 'Andhra Pradesh', district: 'Kurnool', pincodes: ['518001', '518002', '518003', '518004'] },
  { name: 'Kadapa', state: 'Andhra Pradesh', district: 'YSR Kadapa', pincodes: ['516001', '516002', '516003'] },
  { name: 'Anantapur', state: 'Andhra Pradesh', district: 'Anantapur', pincodes: ['515001', '515002', '515004'] },
  { name: 'Vizianagaram', state: 'Andhra Pradesh', district: 'Vizianagaram', pincodes: ['535001', '535002', '535003'] },
  { name: 'Srikakulam', state: 'Andhra Pradesh', district: 'Srikakulam', pincodes: ['532001', '532002'] },
  { name: 'Ongole', state: 'Andhra Pradesh', district: 'Prakasam', pincodes: ['523001', '523002'] },
  { name: 'Eluru', state: 'Andhra Pradesh', district: 'Eluru', pincodes: ['534001', '534002'] },
  { name: 'Chittoor', state: 'Andhra Pradesh', district: 'Chittoor', pincodes: ['517001', '517002'] },
  { name: 'Machilipatnam', state: 'Andhra Pradesh', district: 'Krishna', pincodes: ['521001', '521002'] },
  { name: 'Bhimavaram', state: 'Andhra Pradesh', district: 'West Godavari', pincodes: ['534201', '534202'] },
  { name: 'Araku Valley', state: 'Andhra Pradesh', district: 'Alluri Sitharama Raju', pincodes: ['531149', '531151'] },
  { name: 'Lambasingi', state: 'Andhra Pradesh', district: 'Alluri Sitharama Raju', pincodes: ['531111'] },
  { name: 'Annavaram', state: 'Andhra Pradesh', district: 'Kakinada', pincodes: ['533406'] },
  { name: 'Srisailam', state: 'Andhra Pradesh', district: 'Nandyal', pincodes: ['518101', '518102'] },

  // Telangana
  { name: 'Hyderabad', state: 'Telangana', district: 'Hyderabad', pincodes: ['500001', '500002', '500003', '500081', '500032', '500034', '500072'] },
  { name: 'Secunderabad', state: 'Telangana', district: 'Hyderabad', pincodes: ['500003', '500009', '500011', '500025'] },
  { name: 'Warangal', state: 'Telangana', district: 'Warangal', pincodes: ['506001', '506002', '506004'] },
  { name: 'Karimnagar', state: 'Telangana', district: 'Karimnagar', pincodes: ['505001', '505002'] },
  { name: 'Nizamabad', state: 'Telangana', district: 'Nizamabad', pincodes: ['503001', '503002'] },
  { name: 'Khammam', state: 'Telangana', district: 'Khammam', pincodes: ['507001', '507002'] },
  { name: 'Ramagundam', state: 'Telangana', district: 'Peddapalli', pincodes: ['505208', '505209'] },
  { name: 'Mahbubnagar', state: 'Telangana', district: 'Mahbubnagar', pincodes: ['509001', '509002'] },
  { name: 'Nalgonda', state: 'Telangana', district: 'Nalgonda', pincodes: ['508001', '508002'] },

  // Major Metro & National Hubs
  { name: 'Bengaluru (Bangalore)', state: 'Karnataka', district: 'Bengaluru Urban', pincodes: ['560001', '560002', '560034', '560068', '560100'] },
  { name: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', pincodes: ['600001', '600002', '600017', '600028', '600096'] },
  { name: 'Mumbai', state: 'Maharashtra', district: 'Mumbai City', pincodes: ['400001', '400002', '400050', '400076', '400099'] },
  { name: 'Pune', state: 'Maharashtra', district: 'Pune', pincodes: ['411001', '411004', '411014', '411057'] },
  { name: 'New Delhi', state: 'Delhi', district: 'New Delhi', pincodes: ['110001', '110002', '110016', '110020', '110037'] },
  { name: 'Kolkata', state: 'West Bengal', district: 'Kolkata', pincodes: ['700001', '700016', '700020', '700091'] },
  { name: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', pincodes: ['380001', '380009', '380015', '380054'] },
  { name: 'Jaipur', state: 'Rajasthan', district: 'Jaipur', pincodes: ['302001', '302004', '302015', '302020'] },
  { name: 'Goa (Panaji)', state: 'Goa', district: 'North Goa', pincodes: ['403001', '403516', '403507'] },
  { name: 'Kochi (Cochin)', state: 'Kerala', district: 'Ernakulam', pincodes: ['682001', '682011', '682035'] },
  { name: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', pincodes: ['641001', '641018', '641044'] },
  { name: 'Madurai', state: 'Tamil Nadu', district: 'Madurai', pincodes: ['625001', '625002', '625020'] },
  { name: 'Mysuru (Mysore)', state: 'Karnataka', district: 'Mysuru', pincodes: ['570001', '570004', '570020'] },
  { name: 'Bhubaneswar', state: 'Odisha', district: 'Khurda', pincodes: ['751001', '751007', '751024'] },
  { name: 'Indore', state: 'Madhya Pradesh', district: 'Indore', pincodes: ['452001', '452010'] },
  { name: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', pincodes: ['226001', '226010'] },
  { name: 'Varanasi', state: 'Uttar Pradesh', district: 'Varanasi', pincodes: ['221001', '221002'] }
];

// Curated Tour Packages
export const CURATED_TOURS = [
  {
    id: 'araku-1day',
    title: 'Araku Valley & Borra Caves Scenic Tour',
    badge: 'Most Popular',
    duration: '1 Full Day (14 Hrs)',
    kms: '280 Kms Included',
    route: 'Vizag ➔ Tyda ➔ Borra Caves ➔ Katiki Waterfalls ➔ Coffee Plantations ➔ Tribal Museum ➔ Padmapuram Gardens ➔ Vizag',
    price: {
      sedan: '₹ 3,799',
      suv: '₹ 4,999',
      innova: '₹ 6,299'
    },
    highlights: ['Natural limestone Borra Caves', 'Araku Valley view points', 'Organic coffee garden tasting', 'Chilly weather experience']
  },
  {
    id: 'vizag-sightseeing',
    title: 'Vizag City Heritage & Coastal Tour',
    badge: 'Best Value',
    duration: '1 Day (8-10 Hrs)',
    kms: '100 Kms Included',
    route: 'Kailasagiri Hilltop ➔ Submarine Museum (INS Kursura) ➔ TU-142 Aircraft Museum ➔ RK Beach ➔ Rushikonda Beach ➔ Thotlakonda Buddhist Site',
    price: {
      sedan: '₹ 2,299',
      suv: '₹ 3,199',
      innova: '₹ 4,199'
    },
    highlights: ['Panoramic ocean views', 'Historic submarine walk-through', 'Clean Rushikonda water sports', 'Heritage Buddhist ruins']
  },
  {
    id: 'lambasingi-tour',
    title: 'Lambasingi "Kashmir of Andhra" Tour',
    badge: 'Seasonal Special',
    duration: '1-2 Days (16 Hrs)',
    kms: '320 Kms Included',
    route: 'Vizag ➔ Narsipatnam ➔ Lambasingi Cloud Valley ➔ Strawberry Farms ➔ Kothapalli Waterfalls ➔ Tajangi Reservoir ➔ Vizag',
    price: {
      sedan: '₹ 4,499',
      suv: '₹ 5,899',
      innova: '₹ 7,199'
    },
    highlights: ['Sub-zero mist morning experience', 'Fresh strawberry farm plucking', 'Lush waterfalls & reservoir boating', 'Pine forests photoshoot']
  },
  {
    id: 'temple-darshan',
    title: 'Simhachalam & Annavaram Temple Darshan',
    badge: 'Spiritual Tour',
    duration: '1 Full Day (12 Hrs)',
    kms: '260 Kms Included',
    route: 'Vizag ➔ Sri Varaha Lakshmi Narasimha Temple (Simhachalam) ➔ Payakaraopeta ➔ Sri Veera Venkata Satyanarayana Swamy Temple (Annavaram) ➔ Vizag',
    price: {
      sedan: '₹ 3,999',
      suv: '₹ 5,199',
      innova: '₹ 6,499'
    },
    highlights: ['Direct darshan assistance', 'Scenic Ghat road views', 'Sacred Ratnagiri hill visit', 'Prasadam collection time included']
  }
];

// Helper: Search Indian Cities & Pincodes
export async function searchIndianLocations(query, googleApiKey = '') {
  if (!query || query.trim().length < 1) return [];

  const cleanQuery = query.trim().toLowerCase();
  const isPincode = /^\d{3,6}$/.test(cleanQuery);

  // 1. Search in local database first for lightning-fast matching
  const localResults = [];

  // Match local hubs if query mentions a city or area
  Object.entries(CITY_LOCAL_HUBS).forEach(([city, hubs]) => {
    hubs.forEach(hub => {
      if (
        hub.name.toLowerCase().includes(cleanQuery) ||
        hub.label.toLowerCase().includes(cleanQuery) ||
        (hub.pincode && hub.pincode.startsWith(cleanQuery))
      ) {
        localResults.push({
          title: hub.label,
          subtitle: `${city}, Andhra Pradesh • PIN: ${hub.pincode}`,
          pincode: hub.pincode,
          city: city,
          state: 'Andhra Pradesh',
          type: hub.type
        });
      }
    });
  });

  // Match Indian cities & their pincodes
  INDIA_CITIES.forEach(c => {
    const matchesCity = c.name.toLowerCase().includes(cleanQuery);
    const matchesDistrict = c.district.toLowerCase().includes(cleanQuery);
    const matchesPincode = c.pincodes.some(p => p.startsWith(cleanQuery));

    if (matchesCity || matchesDistrict || matchesPincode) {
      localResults.push({
        title: c.name,
        subtitle: `${c.district} Dist, ${c.state} • PIN: ${c.pincodes[0]}`,
        pincode: c.pincodes[0],
        city: c.name,
        state: c.state,
        type: 'city'
      });
    }
  });

  // Deduplicate local results
  const uniqueTitles = new Set();
  const filteredLocal = localResults.filter(item => {
    if (uniqueTitles.has(item.title)) return false;
    uniqueTitles.add(item.title);
    return true;
  });

  // 2. If user enters a full 6-digit Pincode, fetch real-time from India Post Open API
  if (/^\d{6}$/.test(cleanQuery)) {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${cleanQuery}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice) {
          const postOffices = data[0].PostOffice.slice(0, 5).map(po => ({
            title: `${po.Name} (${po.District})`,
            subtitle: `${po.District}, ${po.State} • PIN: ${po.Pincode} [India Post]`,
            pincode: po.Pincode,
            city: po.District,
            state: po.State,
            type: 'pincode'
          }));
          return [...postOffices, ...filteredLocal].slice(0, 8);
        }
      }
    } catch (e) {
      console.warn('India Post API error, falling back to local database', e);
    }
  }

  // 3. If Google Places API Key is configured by user, query Google Places Autocomplete API
  if (googleApiKey && cleanQuery.length >= 3) {
    try {
      // In browser, Google Places often requires a proxy or cors-enabled endpoint, or direct fetch
      const gUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:in&key=${googleApiKey}`;
      const gRes = await fetch(gUrl);
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData.predictions && gData.predictions.length > 0) {
          const gResults = gData.predictions.map(p => ({
            title: p.structured_formatting ? p.structured_formatting.main_text : p.description,
            subtitle: p.structured_formatting ? p.structured_formatting.secondary_text : 'Google Places',
            pincode: '',
            city: '',
            state: 'India',
            type: 'google_place'
          }));
          return [...gResults, ...filteredLocal].slice(0, 8);
        }
      }
    } catch (err) {
      console.warn('Google Places error, using open sources', err);
    }
  }

  // 4. Free OpenStreetMap Photon geocoding for any obscure Indian village/area
  if (filteredLocal.length < 3 && cleanQuery.length >= 3 && !isPincode) {
    try {
      const osmRes = await fetch(`https://photon.komoot.de/api/?q=${encodeURIComponent(query)}&limit=4&lat=17.6868&lon=83.2185`);
      if (osmRes.ok) {
        const osmData = await osmRes.json();
        if (osmData && osmData.features) {
          const osmResults = osmData.features
            .filter(f => f.properties.country === 'India' || !f.properties.country)
            .map(f => {
              const p = f.properties;
              const name = p.name || query;
              const sub = [p.district || p.city, p.state, p.postcode ? `PIN: ${p.postcode}` : 'India'].filter(Boolean).join(', ');
              return {
                title: name,
                subtitle: sub,
                pincode: p.postcode || '',
                city: p.city || p.district || name,
                state: p.state || 'India',
                type: 'geo'
              };
            });
          return [...filteredLocal, ...osmResults].slice(0, 8);
        }
      }
    } catch (err) {
      // silent fallback
    }
  }

  return filteredLocal.slice(0, 8);
}

