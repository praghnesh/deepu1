import React, { useState, useEffect } from 'react';
import LocationAutocomplete from './components/LocationAutocomplete';
import RateCardModal from './components/RateCardModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import ApiKeyModal from './components/ApiKeyModal';
import { CITY_LOCAL_HUBS, CURATED_TOURS, POPULAR_CITIES } from './data/indiaLocations';

export default function CabBooking() {
  // Navigation Tabs: 'hourly' | 'outstation' | 'airport' | 'tours'
  const [activeTab, setActiveTab] = useState('hourly');

  // Active City Context (defaults to Visakhapatnam / Vizag)
  const [selectedCity, setSelectedCity] = useState('Visakhapatnam');

  // Google / Geo API Key (stored in localStorage)
  const [googleApiKey, setGoogleApiKey] = useState(() => localStorage.getItem('google_maps_api_key') || '');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Common Date / Time
  const todayStr = '2026-10-28';
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(todayStr);

  // Vehicles
  const vehicleOptions = [
    'Sedan Car - Dzire / Glanza (4 Seats)',
    'Hatchback - WagonR / Tiago (4 Seats)',
    'SUV - Ertiga / Carens (6 Seats)',
    'Premium SUV - Innova Crysta (7 Seats)',
    'Tempo Traveller (12-17 Seats)'
  ];
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0]);

  // Hourly Tab State (Packages starting from 4 Hrs as explicitly requested)
  const hourlyPackages = [
    { label: '4 Hrs', hrs: '4 Hours', kms: '40 Kms' },
    { label: '6 Hrs', hrs: '6 Hours', kms: '60 Kms' },
    { label: '8 Hrs', hrs: '8 Hours', kms: '80 Kms' },
    { label: '10 Hrs', hrs: '10 Hours', kms: '100 Kms' },
    { label: '12 Hrs', hrs: '12 Hours', kms: '120 Kms' }
  ];
  const [selectedPackage, setSelectedPackage] = useState(hourlyPackages[0]);
  const [hourlyPickup, setHourlyPickup] = useState('Visakhapatnam Railway Station');

  // Outstation Tab State
  const [outstationTripType, setOutstationTripType] = useState('round'); // 'oneway' | 'round'
  const [outstationPickup, setOutstationPickup] = useState('Vizag City');
  const [outstationDestination, setOutstationDestination] = useState('Araku Valley');

  // Airport Tab State
  const [airportTripType, setAirportTripType] = useState('drop'); // 'pickup' | 'drop'
  const [airportAddress, setAirportAddress] = useState('Rushikonda Beach Resort');
  const [flightTime, setFlightTime] = useState('14:30');

  // Tours Tab State
  const [selectedTour, setSelectedTour] = useState(CURATED_TOURS[0]);
  const [tourPickup, setTourPickup] = useState('Visakhapatnam Hotel / Residence');

  // Discount Offer
  const [promoCode, setPromoCode] = useState('VIZAG10');
  const [discountApplied, setDiscountApplied] = useState(true);
  const [promoMessage, setPromoMessage] = useState('10% OFF DISCOUNT OFFER CODE: VIZAG10 (APPLIED)');

  // Modals
  const [isRateCardOpen, setIsRateCardOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSummary, setBookingSummary] = useState({});

  // Quick chips for current city
  const quickHubs = (CITY_LOCAL_HUBS[selectedCity] || CITY_LOCAL_HUBS['Visakhapatnam']).map(h => h.name);
  const quickDestinations = ['Araku', 'Vijayawada', 'Hyderabad', 'Annavaram', 'Srikakulam', 'Tirupati'];

  // Save API key
  const handleSaveApiKey = (key) => {
    setGoogleApiKey(key);
    localStorage.setItem('google_maps_api_key', key);
  };

  // Format Time Pill (e.g. "09:00" -> "09:00 AM")
  const formatTimePill = (timeStr) => {
    if (!timeStr) return '09:00 AM';
    const [h, m] = timeStr.split(':');
    let hours = parseInt(h, 10);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const padH = hours < 10 ? `0${hours}` : hours;
    return `${padH}:${m || '00'} ${suffix}`;
  };

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VIZAG10') {
      setDiscountApplied(true);
      setPromoMessage('🎉 10% Special Discount Applied Successfully!');
    } else {
      setDiscountApplied(false);
      setPromoMessage('Invalid coupon code. Try code "VIZAG10" for 10% off.');
    }
  };

  // Open Reservation Modal
  const handleOpenBooking = () => {
    let summary = {
      vehicle: selectedVehicle,
      discountApplied: discountApplied,
      date: pickupDate,
      time: activeTab === 'airport' ? flightTime : pickupTime
    };

    if (activeTab === 'hourly') {
      summary.type = 'Hourly Rental';
      summary.pickup = hourlyPickup;
      summary.package = `${selectedPackage.label} (${selectedPackage.kms})`;
    } else if (activeTab === 'outstation') {
      summary.type = `Outstation (${outstationTripType === 'oneway' ? 'One Way Drop' : 'Round Trip'})`;
      summary.pickup = outstationPickup;
      summary.destination = outstationDestination;
      summary.package = `${outstationTripType === 'oneway' ? 'One Way' : 'Round Trip'} • Return: ${returnDate}`;
    } else if (activeTab === 'airport') {
      summary.type = `Airport Transfer (${airportTripType === 'pickup' ? 'Airport Pickup' : 'Airport Drop'})`;
      summary.pickup = airportTripType === 'drop' ? airportAddress : 'Visakhapatnam Airport (VTZ)';
      summary.destination = airportTripType === 'drop' ? 'Visakhapatnam Airport (VTZ)' : airportAddress;
      summary.package = 'Fixed Airport Rate';
    } else if (activeTab === 'tours') {
      summary.type = `Holiday Tour: ${selectedTour.title}`;
      summary.pickup = tourPickup;
      summary.destination = selectedTour.route;
      summary.package = selectedTour.duration;
    }

    setBookingSummary(summary);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f6f9] text-gray-800 font-sans pb-24 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header / Location Search (Image 1 Style) */}
      <header className="bg-white border-b border-gray-200/80 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input Bar (Matching Image 1) */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Guntur / Vijayawada..."
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2 text-sm border-2 border-blue-500 rounded-xl focus:outline-none shadow-sm font-medium text-gray-800"
                />
              </div>
              <div>
                <input
                  type="text"
                  readOnly
                  placeholder="e.g. 8 Hrs / 80 Kms or City Local"
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-default"
                />
              </div>
            </div>

            {/* API Key & Pincode Status Button */}
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center gap-1.5 self-start md:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition shrink-0"
              title="Configure Pincodes and Google Places API"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>India Pincodes & API Key</span>
              <span className="text-gray-400">⚙️</span>
            </button>
          </div>

          {/* Popular Cities Chips (Image 1 Style) */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-xs font-semibold text-gray-500 shrink-0">Popular:</span>
            <div className="flex items-center gap-1.5">
              {['Hyderabad', 'Tirupati', 'Vijayawada (VGA) Airport', 'Vizag', 'Srisailam'].map((cityName) => (
                <button
                  key={cityName}
                  type="button"
                  onClick={() => {
                    const cleanName = cityName === 'Vizag' ? 'Visakhapatnam' : cityName.replace(' (VGA) Airport', '');
                    setSelectedCity(cleanName);
                    if (activeTab === 'hourly') setHourlyPickup(`${cleanName} Central`);
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition whitespace-nowrap ${
                    selectedCity.toLowerCase().includes(cityName.toLowerCase().slice(0, 4))
                      ? 'bg-blue-50 text-blue-700 border-blue-300 font-bold'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* Main Reservation Card (Images 2, 3, 4 Style) */}
      <main className="max-w-2xl mx-auto px-4 pt-6">
        
        {/* Instant Confirmation Pill */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-white/80 px-3.5 py-1 rounded-full shadow-sm border border-gray-200/60">
            <span className="text-emerald-500">✓</span> Instant SMS & WhatsApp Confirmation
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 overflow-hidden transition-all duration-300">
          
          {/* Top 4 Service Tabs */}
          <div className="p-3 bg-gray-50/80 border-b border-gray-100">
            <div className="grid grid-cols-4 gap-1.5 bg-gray-200/70 p-1 rounded-2xl">
              
              {/* Hourly Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('hourly')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === 'hourly'
                    ? 'bg-white text-orange-600 shadow-md ring-1 ring-orange-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm">🕒</span>
                <span>Hourly</span>
              </button>

              {/* Outstation Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('outstation')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === 'outstation'
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm">🚗</span>
                <span>Outstation</span>
              </button>

              {/* Airport Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('airport')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === 'airport'
                    ? 'bg-white text-emerald-700 shadow-md ring-1 ring-emerald-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm">✈️</span>
                <span>Airport</span>
              </button>

              {/* Tours Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('tours')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                  activeTab === 'tours'
                    ? 'bg-white text-purple-700 shadow-md ring-1 ring-purple-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-sm">🧭</span>
                <span>Tours</span>
              </button>

            </div>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-6 md:p-8 space-y-6">

            {/* 1. HOURLY TAB */}
            {activeTab === 'hourly' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <LocationAutocomplete
                  label={`Pickup Location in ${selectedCity}`}
                  value={hourlyPickup}
                  onChange={(val) => setHourlyPickup(val)}
                  placeholder="Visakhapatnam Railway Station or enter 6-digit Pincode..."
                  quickOptions={quickHubs}
                  googleApiKey={googleApiKey}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Pickup Time
                      </label>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        {formatTimePill(pickupTime)}
                      </span>
                    </div>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
                      <span className="text-amber-500">🕒</span>
                      Select Rental Package
                    </label>
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md">
                      {selectedPackage.hrs}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {hourlyPackages.map((pkg) => {
                      const isSelected = selectedPackage.label === pkg.label;
                      return (
                        <button
                          key={pkg.label}
                          type="button"
                          onClick={() => setSelectedPackage(pkg)}
                          className={`py-2.5 px-1 rounded-xl text-xs md:text-sm font-bold transition shadow-sm ${
                            isSelected
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'
                              : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {pkg.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-1.5 text-[11px] text-gray-500 text-right">
                    Includes {selectedPackage.kms} & {selectedPackage.hrs} • Extra km @ ₹12
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Vehicle Choice
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium text-gray-800 bg-white"
                  >
                    {vehicleOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleOpenBooking}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-base"
                  >
                    <span>Reserve Hourly Cab</span>
                    <span className="text-xl leading-none">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRateCardOpen(true)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-3 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Complete Hourly Rate Card & Live Map</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. OUTSTATION TAB */}
            {activeTab === 'outstation' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOutstationTripType('oneway')}
                    className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border transition ${
                      outstationTripType === 'oneway'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>➔</span>
                    <span>One Way Drop</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOutstationTripType('round')}
                    className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border transition ${
                      outstationTripType === 'round'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>🔁</span>
                    <span>Round Trip</span>
                  </button>
                </div>

                <LocationAutocomplete
                  label="Pickup Location"
                  value={outstationPickup}
                  onChange={(val) => setOutstationPickup(val)}
                  placeholder="Vizag City or search city / area / pincode..."
                  quickOptions={quickHubs}
                  googleApiKey={googleApiKey}
                />

                <LocationAutocomplete
                  label="Destination"
                  value={outstationDestination}
                  onChange={(val) => setOutstationDestination(val)}
                  placeholder="Araku Valley or search destination / pincode..."
                  quickOptions={quickDestinations}
                  googleApiKey={googleApiKey}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Return Date
                      </label>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Min: {pickupDate}
                      </span>
                    </div>
                    {outstationTripType === 'oneway' ? (
                      <div className="w-full px-4 py-2.5 text-xs bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-medium italic flex items-center">
                        Not Applicable (One Way Drop selected)
                      </div>
                    ) : (
                      <input
                        type="date"
                        min={pickupDate}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Vehicle
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800 bg-white"
                  >
                    {vehicleOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleOpenBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-base"
                  >
                    <span>Reserve Outstation Ride</span>
                    <span className="text-xl leading-none">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRateCardOpen(true)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-3 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Outstation Rates, Route Map & Breakdown</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. AIRPORT TAB */}
            {activeTab === 'airport' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAirportTripType('pickup')}
                    className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border transition ${
                      airportTripType === 'pickup'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>🛬</span>
                    <span>Airport Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAirportTripType('drop')}
                    className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 border transition ${
                      airportTripType === 'drop'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>🛫</span>
                    <span>Airport Drop</span>
                  </button>
                </div>

                <LocationAutocomplete
                  label={airportTripType === 'drop' ? `Pickup Address in ${selectedCity}` : `Drop Address in ${selectedCity}`}
                  value={airportAddress}
                  onChange={(val) => setAirportAddress(val)}
                  placeholder="Rushikonda Beach Resort or enter area / pincode..."
                  quickOptions={['Rushikonda', 'RK Beach', 'MVP Colony', 'VSKP Station', 'Siripuram', 'Gajuwaka']}
                  googleApiKey={googleApiKey}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-700">
                        Flight Time
                      </label>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {formatTimePill(flightTime)}
                      </span>
                    </div>
                    <input
                      type="time"
                      value={flightTime}
                      onChange={(e) => setFlightTime(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Vehicle Choice
                  </label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium text-gray-800 bg-white"
                  >
                    {vehicleOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleOpenBooking}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-base"
                  >
                    <span>Reserve Airport Taxi</span>
                    <span className="text-xl leading-none">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRateCardOpen(true)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-3 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Fixed Airport Rates & Route Map</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* 4. TOURS TAB */}
            {activeTab === 'tours' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    Select Curated Sightseeing Tour Package
                  </label>
                  <div className="space-y-2.5">
                    {CURATED_TOURS.map((tour) => {
                      const isSelected = selectedTour.id === tour.id;
                      return (
                        <div
                          key={tour.id}
                          onClick={() => setSelectedTour(tour)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                            isSelected
                              ? 'bg-purple-50/80 border-purple-400 shadow-md ring-1 ring-purple-300'
                              : 'bg-white hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-gray-900">{tour.title}</h4>
                                <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                  {tour.badge}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {tour.duration} • {tour.kms}
                              </p>
                              <p className="text-[11px] text-gray-600 mt-1 line-clamp-1">
                                {tour.route}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs text-gray-400">Starts</span>
                              <div className="font-bold text-purple-700 text-sm">
                                {tour.price.sedan}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <LocationAutocomplete
                  label="Pickup Location for Tour"
                  value={tourPickup}
                  onChange={(val) => setTourPickup(val)}
                  placeholder="Hotel / Home address or pincode in city..."
                  quickOptions={quickHubs}
                  googleApiKey={googleApiKey}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Tour Departure Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Vehicle Type
                    </label>
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-gray-800 bg-white"
                    >
                      {vehicleOptions.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleOpenBooking}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-base"
                  >
                    <span>Reserve Tour Package</span>
                    <span className="text-xl leading-none">›</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRateCardOpen(true)}
                    className="w-full bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-semibold py-3 px-6 rounded-2xl transition text-sm flex items-center justify-center gap-1.5"
                  >
                    <span>View Tour Itinerary & Complete Rate Card</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* DISCOUNT BANNER */}
            <div className="bg-[#0f172a] rounded-2xl p-4 text-white shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold">
                  <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">🎁</span>
                  <div>
                    <span className="text-amber-400 font-bold">10% OFF DISCOUNT OFFER</span>
                    <span className="ml-2 bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 text-[11px] px-2 py-0.5 rounded font-mono">
                      CODE: VIZAG10
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-24 sm:w-28 uppercase text-center font-mono font-bold text-xs bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 transition shadow"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPromoCode('VIZAG10');
                      setDiscountApplied(true);
                      alert('Coupon code VIZAG10 copied and applied!');
                    }}
                    className="px-3 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow"
                  >
                    Get Code
                  </button>
                </div>
              </div>

              {promoMessage && (
                <div className="text-[11px] text-emerald-400 mt-2 text-center sm:text-left">
                  {promoMessage}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        <a
          href="tel:+919876543210"
          className="w-13 h-13 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition duration-200"
          title="Call Customer Support"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        <a
          href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20cab%20in%20Vizag"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition duration-200"
          title="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 01-1.24-4.29c0-4.43 3.6-8.04 8.04-8.04 2.15 0 4.17.84 5.69 2.36 1.52 1.52 2.36 3.54 2.36 5.69 0 4.43-3.6 8.04-8.04 8.04zm4.4-6.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.55.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
          </svg>
        </a>
      </div>

      {/* MODALS */}
      <RateCardModal
        isOpen={isRateCardOpen}
        onClose={() => setIsRateCardOpen(false)}
        activeTab={activeTab}
        selectedPackage={selectedPackage.label}
        vehicle={selectedVehicle}
      />

      <BookingConfirmationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingData={bookingSummary}
        onSuccess={() => {}}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={googleApiKey}
        onSaveApiKey={handleSaveApiKey}
      />

    </div>
  );
}
