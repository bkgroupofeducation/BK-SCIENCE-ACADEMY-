import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * MetaTags — manages <title>, <meta>, OG, Twitter and canonical for each route.
 * Single source SEO without adding/removing pages or content.
 */
const META_MAP = {
  '/': {
    title: 'BK Science Academy | JEE & NEET Coaching in Nashik',
    description: 'BK Science Academy is Nashik\'s premier JEE & NEET coaching institute with 15+ years of excellence, 8500+ selections, and ISO 9001:2015 certification.',
    og: { type: 'website', image: '/assets/Logo.png' }
  },
  '/about-us': {
    title: 'About BK Science Academy | 15 Years of Academic Excellence',
    description: 'Learn about BK Science Academy\'s legacy, mission, and commitment to shaping India\'s future medical and engineering talent.',
    og: { type: 'website' }
  },
  '/jee': {
    title: 'JEE Coaching in Nashik | BK Science Academy',
    description: 'Expert JEE Main & Advanced coaching with structured study plans, test series, and mentorship. Join BK Science Academy\'s JEE program.',
    og: { type: 'website' }
  },
  '/neet': {
    title: 'NEET Coaching in Nashik | BK Science Academy',
    description: 'Comprehensive NEET-UG preparation with expert faculty, mock tests, and 98% success rate. Enroll at BK Science Academy Nashik.',
    og: { type: 'website' }
  },
  '/registration': {
    title: 'Student Registration | BK Science Academy 2025-26',
    description: 'Register for BK Science Academy\'s JEE, NEET, or Foundation courses for the 2025-26 session. Secure your seat today.',
    og: { type: 'website' }
  },
  '/admission': {
    title: 'Admission Form 2025-26 | BK Science Academy Nashik',
    description: 'Apply for admission at BK Science Academy. Fill the official enrollment form for JEE, NEET, or Foundation batches.',
    og: { type: 'website' }
  },
  '/scholarship': {
    title: 'Scholarship Test | BK Science Academy',
    description: 'Apply for BK Science Academy\'s scholarship program. Earn up to 100% fee waiver based on academic merit.',
    og: { type: 'website' }
  },
  '/contact': {
    title: 'Contact BK Science Academy | Nashik',
    description: 'Get in touch with BK Science Academy. Visit us at Gajanan Plaza, Nashik or call +91 88883 01363.',
    og: { type: 'website' }
  },
  '/enquiry': {
    title: 'Student Enquiry | BK Science Academy',
    description: 'Have questions about courses, fees, or admissions? Submit your enquiry and our team will call you back within 24 hours.',
    og: { type: 'website' }
  },
  '/most': {
    title: 'BK Champions Scholarship Program | BK Science Academy',
    description: 'BK Champions — the flagship talent search and scholarship program by BK Science Academy to identify and nurture future toppers.',
    og: { type: 'website' }
  },
  '/live-results': {
    title: 'Live Results Dashboard | BK Science Academy',
    description: 'Check live JEE, NEET, and scholarship results on BK Science Academy\'s real-time results portal.',
    og: { type: 'website' }
  },
  '/study-center': {
    title: 'Study Center | BK Science Academy Nashik',
    description: 'Visit BK Science Academy\'s flagship study center at Gajanan Plaza, Nashik. Premium facilities for JEE & NEET preparation.',
    og: { type: 'website' }
  },
  '/why-bk': {
    title: 'Why Choose BK Science Academy? | Nashik\'s Top IIT-JEE NEET Coaching',
    description: 'Discover what makes BK Science Academy the preferred choice for JEE & NEET aspirants — expert faculty, proven results, and premium infrastructure.',
    og: { type: 'website' }
  },
  '/adminportal': {
    title: 'Admin Portal | BK Science Academy',
    description: 'Authorized admin dashboard for BK Science Academy management.',
    og: { type: 'website' }
  },
};

const DEFAULT_META = {
  title: 'BK Science Academy | JEE NEET Coaching Nashik',
  description: 'Join BK Science Academy — Nashik\'s leading coaching institute for JEE, NEET, Foundation, and Olympiad preparation.',
  og: { type: 'website', image: '/assets/Logo.png' }
};

const BASE_URL = 'https://bkscience.in'; // Update when deploying

const MetaTags = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = META_MAP[pathname] || DEFAULT_META;
    const og = { ...DEFAULT_META.og, ...meta.og };
    const canonical = `${BASE_URL}${pathname}`;
    const fullImage = og.image ? `${BASE_URL}${og.image}` : `${BASE_URL}/assets/Logo.png`;

    // Title
    document.title = meta.title;

    const setMeta = (attr, attrVal, contentVal) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // Standard meta
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'theme-color', '#c00000');

    // Open Graph
    setMeta('property', 'og:title',       meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type',        og.type);
    setMeta('property', 'og:url',         canonical);
    setMeta('property', 'og:image',       fullImage);
    setMeta('property', 'og:site_name',   'BK Science Academy');

    // Twitter
    setMeta('name', 'twitter:card',        'summary_large_image');
    setMeta('name', 'twitter:title',       meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image',       fullImage);

    // Canonical
    let canonical_tag = document.querySelector('link[rel="canonical"]');
    if (!canonical_tag) {
      canonical_tag = document.createElement('link');
      canonical_tag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical_tag);
    }
    canonical_tag.setAttribute('href', canonical);

  }, [pathname]);

  return null; // renders nothing into the DOM directly
};

export default MetaTags;
