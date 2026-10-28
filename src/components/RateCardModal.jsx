import React from 'react';

export default function RateCardModal({ isOpen, onClose, activeTab, selectedPackage, vehicle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              {activeTab === 'hourly' && 'Hourly Rental Rate Card & Live Terms'}
              {activeTab === 'outstation' && 'Outstation Tariff & Kilometer Rates'}
              {activeTab === 'airport' && 'Fixed Airport Transfer Rate Card'}
              {activeTab === 'tours' && 'Tour Packages Tariff & Route Details'}
            </h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Transparent pricing with zero hidden charges • Toll & Parking as applicable
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-sm text-gray-700">
          {/* Active Configuration */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-700">Selected Option</span>
              <p className="font-bold text-gray-900">
                {activeTab === 'hourly' ? `${selectedPackage} Package` : 'Standard Trip'} • {vehicle}
              </p>
            </div>
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              AC Guaranteed
            </span>
          </div>

          {/* Rate Table */}
          <div>
            <h4 className="font-bold text-gray-900 mb-2.5">Comprehensive Vehicle Tariff Chart</h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Vehicle Type</th>
                    <th className="p-3">Base (4 Hrs/40 Km)</th>
                    <th className="p-3">Extra Km</th>
                    <th className="p-3">Extra Hr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-medium">Hatchback (WagonR/Tiago)</td>
                    <td className="p-3 font-semibold text-emerald-700">₹ 1,199</td>
                    <td className="p-3">₹ 11 / km</td>
                    <td className="p-3">₹ 100 / hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-amber-50/40">
                    <td className="p-3 font-semibold text-gray-900">Sedan (Dzire/Glanza/Etios)</td>
                    <td className="p-3 font-bold text-amber-700">₹ 1,399</td>
                    <td className="p-3">₹ 12 / km</td>
                    <td className="p-3">₹ 120 / hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-medium">SUV (Ertiga / Carens 6-Seater)</td>
                    <td className="p-3 font-semibold text-emerald-700">₹ 1,999</td>
                    <td className="p-3">₹ 16 / km</td>
                    <td className="p-3">₹ 160 / hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-medium">Premium Innova Crysta (7-Seater)</td>
                    <td className="p-3 font-semibold text-emerald-700">₹ 2,799</td>
                    <td className="p-3">₹ 21 / km</td>
                    <td className="p-3">₹ 220 / hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
            <h5 className="font-bold text-gray-900">Important Trip Terms:</h5>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Rental packages start from <strong>4 Hours</strong> (4 Hrs, 6 Hrs, 8 Hrs, 10 Hrs, 12 Hrs).</li>
              <li>Kilometers & hours are calculated from garage pickup to garage drop.</li>
              <li>Night driver allowance of ₹250 applicable for trips between 10:00 PM and 06:00 AM.</li>
              <li>State tax, toll charges, and parking tickets are extra on actual receipt basis.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}

