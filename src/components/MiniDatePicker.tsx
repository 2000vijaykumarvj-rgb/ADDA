import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface MiniDatePickerProps {
  label: string;
  value: string; // ISO date "YYYY-MM-DD" or ""
  onChange: (isoDate: string) => void;
  placeholder?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MiniDatePicker: React.FC<MiniDatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'DD/MM/YYYY',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize view from value or today
  const initialDate = value ? new Date(value + 'T00:00:00') : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

  useEffect(() => {
    if (value) {
      const d = new Date(value + 'T00:00:00');
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close calendar popup on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Format YYYY-MM-DD to Indian DD/MM/YYYY format
  const displayFormattedDate = () => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return value;
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mm}-${dd}`;
    onChange(iso);
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setViewYear(yyyy);
    setViewMonth(today.getMonth());
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const todayObj = new Date();
  const isToday = (day: number) =>
    todayObj.getFullYear() === viewYear &&
    todayObj.getMonth() === viewMonth &&
    todayObj.getDate() === day;

  const isSelected = (day: number) => {
    if (!value) return false;
    const parts = value.split('-');
    return (
      Number(parts[0]) === viewYear &&
      Number(parts[1]) === viewMonth + 1 &&
      Number(parts[2]) === day
    );
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Clickable Date Display with DD/MM/YYYY */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-[#FAF8F5] border border-stone-300 hover:border-[#0B192C] px-2.5 py-1 text-xs text-stone-800 rounded-sm cursor-pointer transition-colors shadow-2xs group"
        aria-label={`${label} Date picker`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="text-stone-500 font-semibold">{label}:</span>
        <span className="font-mono-tabular font-medium text-stone-900 tracking-wide min-w-[76px] text-left">
          {displayFormattedDate() || <span className="text-stone-400 font-normal">{placeholder}</span>}
        </span>
        <Calendar className="w-3.5 h-3.5 text-[#B48327] shrink-0 group-hover:scale-110 transition-transform" />
      </button>

      {/* Mini Calendar Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={`Select ${label} date`}
          className="absolute z-50 mt-1 left-0 bg-white border border-stone-300 shadow-xl rounded-md p-3 w-[270px] text-xs"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-200">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-stone-100 text-stone-600 rounded cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              <span className="font-semibold text-stone-900">
                {MONTH_NAMES[viewMonth]}
              </span>
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="font-semibold text-stone-800 bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                {Array.from({ length: 15 }, (_, i) => 2020 + i).map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-stone-100 text-stone-600 rounded cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-stone-400 text-[10px] uppercase mb-1">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono-tabular">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`blank-${i}`} className="p-1 text-transparent select-none">
                -
              </div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selected = isSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`py-1.5 text-xs rounded transition-colors cursor-pointer relative ${
                    selected
                      ? 'bg-[#0B192C] text-white font-bold'
                      : today
                      ? 'bg-amber-50 text-[#B48327] font-semibold border border-amber-300 hover:bg-amber-100'
                      : 'hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  {day}
                  {today && !selected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#B48327] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Controls: Today & Clear */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-stone-200 text-[11px]">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-[#B48327] hover:underline font-semibold cursor-pointer"
            >
              Today
            </button>

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-stone-500 hover:text-red-700 cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone-500 hover:text-black font-medium cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
