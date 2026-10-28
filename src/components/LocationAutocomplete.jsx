import React, { useState, useEffect, useRef } from 'react';
import { searchIndianLocations } from '../data/indiaLocations';

export default function LocationAutocomplete({
  label,
  value,
  onChange,
  placeholder = 'Search City, Area or 6-digit Pincode...',
  quickOptions = [],
  googleApiKey = '',
  icon = 'map'
}) {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    let isCurrent = true;
    const timer = setTimeout(async () => {
      setLoading(true);
      const results = await searchIndianLocations(query, googleApiKey);
      if (isCurrent) {
        setSuggestions(results);
        setLoading(false);
      }
    }, 200);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [query, googleApiKey]);

  const handleSelect = (item) => {
    const text = item.title;
    setQuery(text);
    onChange(text, item);
    setIsOpen(false);
  };

  const handleQuickClick = (item) => {
    setQuery(item);
    onChange(item);
  };

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {label && (
        <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-1.5">
          <span className="text-amber-600">📍</span>
          {label}
        </label>
      )}

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 pr-10 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition duration-200 text-gray-800 placeholder-gray-400 font-medium"
        />

        {/* Search Icon or Loading Spinner */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto divide-y divide-gray-100">
          {suggestions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 transition flex items-start gap-3 group"
            >
              <span className="mt-0.5 text-base text-gray-400 group-hover:text-emerald-600">
                {item.type === 'station' ? '🚆' : item.type === 'airport' ? '✈️' : item.type === 'pincode' ? '📮' : '📍'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 truncate">
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="text-xs text-gray-500 truncate mt-0.5">
                    {item.subtitle}
                  </div>
                )}
              </div>
              {item.pincode && (
                <span className="shrink-0 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  PIN: {item.pincode}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* QUICK Pills */}
      {quickOptions && quickOptions.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase shrink-0">
            QUICK:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {quickOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickClick(opt)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition whitespace-nowrap ${
                  query === opt
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border-amber-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

