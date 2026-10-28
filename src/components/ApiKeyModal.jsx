import React, { useState } from 'react';

export default function ApiKeyModal({ isOpen, onClose, apiKey, onSaveApiKey }) {
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setKeyInput('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>📍</span> India Cities & Pincode Settings
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Configure Google Maps API or use the Built-in Free Indian Locations Engine
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Status Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Built-in India Autocomplete is LIVE
            </div>
            <p className="text-emerald-700">
              ✓ 150+ Indian Cities & local transit hubs (Visakhapatnam, Hyderabad, Vijayawada, Guntur, Tirupati, Bangalore, Chennai, etc.)
            </p>
            <p className="text-emerald-700">
              ✓ Real-time 6-digit Pincode lookup via India Post Open API (Type e.g. <strong>530001</strong>, <strong>500081</strong>, <strong>520001</strong>).
            </p>
          </div>

          {/* Google Places API Key Option */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Google Places API Key (Optional)
            </label>
            <input
              type="text"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="text-[11px] text-gray-500 mt-1.5">
              If left blank, the app uses the built-in Indian postal & city database without needing any paid API key.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold text-center animate-in fade-in">
              ✓ Settings saved successfully!
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClear}
              className="w-1/3 px-4 py-2.5 text-xs font-semibold border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md text-xs transition"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

