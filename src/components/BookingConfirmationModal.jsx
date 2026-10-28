import React, { useState } from 'react';

export default function BookingConfirmationModal({
  isOpen,
  onClose,
  bookingData,
  onSuccess
}) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number for SMS confirmation.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = 'CAB' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      setIsSubmitting(false);
      setIsConfirmed(true);
      if (onSuccess) onSuccess(ref);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              {isConfirmed ? '🎉 Booking Reserved!' : 'Confirm Cab Reservation'}
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              {isConfirmed
                ? 'Instant SMS & WhatsApp confirmation sent to driver & rider'
                : 'Zero advance required • Pay directly to chauffeur after the trip'}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {isConfirmed ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              ✓
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">Trip Confirmed!</h4>
              <p className="text-sm text-gray-500 mt-1">
                Booking Reference ID: <span className="font-mono font-bold text-emerald-700">{bookingRef}</span>
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-left text-xs md:text-sm space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold uppercase text-emerald-800">{bookingData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pickup Location:</span>
                <span className="font-semibold text-gray-900 text-right">{bookingData.pickup}</span>
              </div>
              {bookingData.destination && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-semibold text-gray-900 text-right">{bookingData.destination}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time:</span>
                <span className="font-semibold text-gray-900">{bookingData.date} at {bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-semibold text-gray-900">{bookingData.vehicle}</span>
              </div>
              {bookingData.discountApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Promo (VIZAG10):</span>
                  <span>10% Applied ✓</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
              >
                Close & Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="p-6 space-y-4">
            {/* Booking Summary Pill */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs md:text-sm space-y-1.5">
              <div className="flex items-center justify-between font-bold text-gray-800">
                <span className="uppercase text-emerald-700">{bookingData.type}</span>
                <span>{bookingData.package || bookingData.vehicle}</span>
              </div>
              <div className="text-gray-600 text-xs truncate">
                📍 {bookingData.pickup} {bookingData.destination ? `➔ ${bookingData.destination}` : ''}
              </div>
              <div className="text-gray-500 text-xs">
                🗓️ {bookingData.date} • ⏰ {bookingData.time}
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Rajesh Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number (for SMS & Driver WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 text-gray-600 text-sm font-semibold rounded-l-xl">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Special Trip Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need baby seat, carrying extra luggage, flight arriving at 2:30 PM..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <span>Confirm Cab Reservation & Send SMS ➔</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

