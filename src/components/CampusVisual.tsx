import React, { useState } from 'react';

export type VisualVariant =
  | 'campus-hero'
  | 'management'
  | 'pgdm'
  | 'commerce'
  | 'bcom'
  | 'computing'
  | 'bca'
  | 'bba'
  | 'science'
  | 'arts'
  | 'doctoral'
  | 'library'
  | 'computer-lab'
  | 'lifescience-lab'
  | 'incubation'
  | 'auditorium'
  | 'sports'
  | 'hostel'
  | 'clubs'
  | 'cultural';

interface CampusVisualProps {
  variant: VisualVariant;
  alt: string;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '3:2' | '21:9';
  eager?: boolean;
  className?: string;
}

const PHOTO_METADATA: Record<VisualVariant, { photoPath: string; badge: string }> = {
  'campus-hero': {
    photoPath: '/images/campus/campus-hero.jpg',
    badge: 'ABBS Campus Architecture · Bengaluru',
  },
  management: {
    photoPath: '/images/campus/management.jpg',
    badge: 'MBA · Executive Case Method & Strategy Seminar',
  },
  pgdm: {
    photoPath: '/images/campus/pgdm.jpg',
    badge: 'PGDM · Global Business & BFSI Analytics',
  },
  commerce: {
    photoPath: '/images/campus/commerce.jpg',
    badge: 'M.Com · Corporate Accounting & Taxation Research',
  },
  bcom: {
    photoPath: '/images/campus/bcom.jpg',
    badge: 'B.Com · ACCA, US CMA & Fintech Collaborative',
  },
  computing: {
    photoPath: '/images/campus/computing.jpg',
    badge: 'MCA · Enterprise Software & Cloud Architecture Lab',
  },
  bca: {
    photoPath: '/images/campus/bca.jpg',
    badge: 'BCA · Artificial Intelligence & Machine Learning Studio',
  },
  bba: {
    photoPath: '/images/campus/bba.jpg',
    badge: 'BBA · General, Aviation Management & Business Analytics',
  },
  science: {
    photoPath: '/images/campus/science.jpg',
    badge: 'B.Sc. · Biotechnology, Microbiology & Forensic Lab',
  },
  arts: {
    photoPath: '/images/campus/arts.jpg',
    badge: 'BA · Journalism, Psychology & Liberal Arts Commons',
  },
  doctoral: {
    photoPath: '/images/campus/doctoral.jpg',
    badge: 'Ph.D. in Management · Doctoral Research Colloquium',
  },
  library: {
    photoPath: '/images/campus/library.jpg',
    badge: 'Central Library & Digital Resource Centre',
  },
  'computer-lab': {
    photoPath: '/images/campus/computer-lab.jpg',
    badge: 'High-Performance Computing & Analytics Lab',
  },
  'lifescience-lab': {
    photoPath: '/images/campus/lifescience-lab.jpg',
    badge: 'Life Sciences & Analytical Wet Laboratory',
  },
  incubation: {
    photoPath: '/images/campus/incubation.jpg',
    badge: 'ABBS Incubation & Entrepreneurship Studio',
  },
  auditorium: {
    photoPath: '/images/campus/auditorium.jpg',
    badge: 'Main Auditorium & Symposium Hall',
  },
  sports: {
    photoPath: '/images/campus/sports.jpg',
    badge: 'Athletics, Indoor Arena & Sports Complex',
  },
  hostel: {
    photoPath: '/images/campus/hostel.jpg',
    badge: 'Managed Student Residences & Amenities',
  },
  clubs: {
    photoPath: '/images/campus/clubs.jpg',
    badge: 'Student Clubs, Toastmasters & Conclaves',
  },
  cultural: {
    photoPath: '/images/campus/cultural.jpg',
    badge: 'Regalia · Annual Cultural & Management Fest',
  },
};

function buildFallbackSvgDataUri(label: string): string {
  const safe = label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <rect width="1200" height="900" fill="#0B192C" />
    <rect x="120" y="120" width="960" height="660" fill="#132742" stroke="#C59B27" stroke-width="2" />
    <text x="600" y="450" text-anchor="middle" fill="#E5C675" font-family="sans-serif" font-size="22" font-weight="600">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CampusVisual: React.FC<CampusVisualProps> = ({
  variant,
  alt,
  caption,
  aspectRatio = '4:3',
  eager = false,
  className = '',
}) => {
  const meta = PHOTO_METADATA[variant] || PHOTO_METADATA['campus-hero'];
  const [imgSrc, setImgSrc] = useState<string>(meta.photoPath);

  React.useEffect(() => {
    setImgSrc((PHOTO_METADATA[variant] || PHOTO_METADATA['campus-hero']).photoPath);
  }, [variant]);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '21:9'
      ? 'aspect-[21/9]'
      : aspectRatio === '3:2'
      ? 'aspect-[3/2]'
      : 'aspect-[4/3]';

  return (
    <figure className={`group relative overflow-hidden bg-[#0B192C] ${className}`}>
      <div className={`w-full ${aspectClass} overflow-hidden relative`}>
        <img
          src={imgSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={eager ? 'eager' : 'lazy'}
          onError={() => {
            setImgSrc(buildFallbackSvgDataUri(meta.badge));
          }}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07111E]/80 via-[#07111E]/15 to-transparent"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2 text-[11px] text-stone-100 font-medium drop-shadow">
          <span className="truncate">{meta.badge}</span>
          <span className="font-mono-tabular text-[#E5C675] shrink-0">ABBS</span>
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-stone-200/80 bg-[#FAF8F5] px-4 py-2.5 text-xs text-stone-600 font-serif italic flex items-center justify-between gap-4">
          <span>{caption}</span>
          <span className="font-mono-tabular text-[11px] not-italic text-stone-400 shrink-0">
            ABBS · Bengaluru
          </span>
        </figcaption>
      )}
    </figure>
  );
};
