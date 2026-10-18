import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-stone-300">
      {title && (
        <h3 className="text-2xl font-serif font-semibold text-[#0B192C] py-4">{title}</h3>
      )}
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-btn-${index}`;

        return (
          <div key={item.question} className="border-b border-stone-200">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full py-4 text-left flex items-center justify-between gap-4 text-base font-medium text-[#0B192C] hover:text-[#B48327] transition-colors cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-stone-500 transition-transform duration-150 ${
                  isOpen ? 'rotate-180 text-[#B48327]' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-5 pr-6 text-sm text-stone-600 leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
