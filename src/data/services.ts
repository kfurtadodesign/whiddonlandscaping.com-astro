// Shared between the services accordion and the quote form's service chips —
// the chip values must match the titles so a "Get a Quote" click can pre-select
// the matching chip.
export interface Service {
  num: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: string;
}

export const services: Service[] = [
  {
    num: '01',
    title: 'Lawn Maintenance',
    description:
      'Regular mowing, trimming, and edging on a schedule that fits your lawn, cut to the right height and kept consistently neat and healthy.',
    image: '/images/service-mowing.webp',
    alt: 'Professional lawn mowing and maintenance service',
    icon: 'fa-scissors',
  },
  {
    num: '02',
    title: 'Full-Service Yard Cleanup',
    description:
      'Seasonal leaf and debris removal, bed clearing, and a complete tidy-up to get your whole yard looking sharp.',
    image: '/images/service-cleanup.webp',
    alt: 'Seasonal full-service yard cleanup',
    icon: 'fa-rake',
  },
  {
    num: '03',
    title: 'Landscaping',
    description:
      'Mulch, pinestraw, rock, fresh flowers, and other basic landscaping touch-ups to refresh your beds and borders.',
    image: '/images/service-edging.webp',
    alt: 'Basic landscaping with mulch, pinestraw, and flowers',
    icon: 'fa-seedling',
  },
  {
    num: '04',
    title: 'Pressure Washing',
    description:
      'Blast away dirt, grime, mold, and buildup from driveways, walkways, patios, decks, and siding, leaving every surface looking new.',
    image: '/images/service-pressure-washing.jpg',
    alt: 'Professional pressure washing service',
    icon: 'fa-spray-can-sparkles',
  },
  {
    num: '05',
    title: 'Roof & Gutter Cleaning',
    description:
      'Complete roof debris removal plus a full gutter flush that clears moss, leaves, and buildup, protecting your home top to bottom.',
    image: '/images/service-roof-gutter.jpg',
    alt: 'Roof and gutter cleaning service',
    icon: 'fa-house-chimney',
  },
];
