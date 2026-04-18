export const COURSE_DATA = {
  jee: {
    '11th': {
      heroTitle: 'JEE Nurture',
      heroHighlight: 'Class 11th',
      heroDesc: 'Lay a strong foundation for IIT-JEE with our 2-year integrated program. Designed specifically for Class 11th students starting their engineering journey.',
      heroPills: ['2-Year Program', 'Board Sync', 'Foundation Focus', 'Regular Mock Tests'],
      shortName: 'JEE 11th',
      gradient: 'from-blue-600 via-blue-700 to-blue-900',
      accentColor: 'bg-blue-50',
      stats: [
        { value: '5K+', label: '11th Students', icon: '🌱' },
        { value: '100%', label: 'Board Coverage', icon: '📝' },
        { value: '40+', label: 'IIT Mentors', icon: '👨‍🎓' },
        { value: '10+', label: 'Centers', icon: '📍' },
      ],
      batches: [
        {
          name: 'NURTURE PHASE-I',
          target: 'Class 11th (State/CBSE)',
          duration: '2 Years',
          startDate: '1st April 2026',
          fees: '₹1,50,000/yr',
          classes: '6 Days',
          features: ['Complete 11th + 12th JEE Syllabus', 'Board Preparation Support', 'Problem Solving Tech', 'Personal Mentorship'],
        }
      ],
      syllabus: [
        { name: 'Physics', icon: '⚡', topics: ['Units & Dimensions', 'Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Gravitation'] },
        { name: 'Chemistry', icon: '🧪', topics: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'States of Matter', 'Thermodynamics', 'Equilibrium'] },
        { name: 'Mathematics', icon: '📐', topics: ['Sets & Relations', 'Trigonometry', 'Quadratic Equations', 'Complex Numbers', 'Sequences & Series', 'Straight Lines'] },
      ],
      whyReasons: [
        { icon: '🚀', title: 'Early Start', desc: 'Starting in 11th gives you a 1-year advantage over others for JEE preparation.' },
        { icon: '🧠', title: 'Conceptual Clarity', desc: 'We focus on deep understanding of concepts rather than just formulas.' },
      ],
      faqs: [
        { q: 'Is this course enough for Board exams?', a: 'Yes, we cover more than 100% of the State and CBSE board syllabus.' },
      ]
    },
    '12th': {
       heroTitle: 'JEE Enthuse',
       heroHighlight: 'Class 12th',
       heroDesc: 'Accelerate your JEE preparation while mastering your 12th boards. A high-intensity 1-year program for serious engineering aspirants.',
       heroPills: ['1-Year Intensive', 'Rank Focused', 'Board Revision', 'Advanced Practice'],
       shortName: 'JEE 12th',
       gradient: 'from-brand-dark via-slate-900 to-brand-dark',
       accentColor: 'bg-red-50',
       stats: [
         { value: '8K+', label: '12th Students', icon: '🔥' },
         { value: '98%', label: 'Success Rate', icon: '🎯' },
         { value: '60+', label: 'Experts', icon: '👩‍🏫' },
         { value: '500+', label: 'Mock Tests', icon: '📝' },
       ],
       batches: [
         {
           name: 'ENTHUSE PHASE-I',
           target: 'Class 12th Appearing',
           duration: '1 Year',
           startDate: '1st April 2026',
           fees: '₹1,40,000/yr',
           classes: '6 Days',
           features: ['Class 12th Full Syllabus', 'Class 11th Quick Revision', 'Intensive Mock Test Series', 'Board Exam Score Booster'],
         }
       ],
       syllabus: [
        { name: 'Physics', icon: '⚡', topics: ['Electrostatics', 'Current Electricity', 'Magnetism', 'EMI & AC', 'Optics', 'Modern Physics'] },
        { name: 'Chemistry', icon: '🧪', topics: ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Organic Compounds', 'Biomolecules'] },
        { name: 'Mathematics', icon: '📐', topics: ['Calculus', 'Vectors', '3D Geometry', 'Probability', 'Matrices', 'Determinants'] },
      ],
      whyReasons: [
        { icon: '🏆', title: 'Rank Focus', desc: 'Our Enthuse batch is optimized for high-rank performance in JEE Advanced.' },
      ],
       faqs: [
         { q: 'Will 11th syllabus be revised?', a: 'Yes, we have dedicated Sunday sessions for 11th syllabus revision.' },
       ]
    },
    'pass': {
       heroTitle: 'JEE Dropper',
       heroHighlight: '12th Pass',
       heroDesc: 'Dedicated exclusively to JEE Advanced. Leave no stone unturned in your year of focused preparation with our repeaters program.',
       heroPills: ['Full Year Focus', 'No School Distraction', 'Zero to Hero', 'Unlimited Doubts'],
       shortName: 'JEE Dropper',
       gradient: 'from-orange-600 via-orange-700 to-orange-900',
       accentColor: 'bg-orange-50',
       stats: [
         { value: '3K+', label: 'Droppers', icon: '💎' },
         { value: '1:1', label: 'Mentorship', icon: '🤝' },
         { value: '15Hrs', label: 'Daily Support', icon: '⌚' },
         { value: '100+', label: 'IIT Selections', icon: '🎓' },
       ],
       batches: [
         {
           name: 'REPEATER BATCH',
           target: 'For 12th Pass Students',
           duration: '1 Year',
           startDate: '1st June 2026',
           fees: '₹1,30,000/yr',
           classes: '6 Days',
           features: ['Full Syllabus Coverage', 'High Complexity Problems', 'Daily Practice Papers', 'Exam Strategy Workshops'],
         }
       ],
       syllabus: [
        { name: 'Full JEE Package', icon: '📚', topics: ['Physics (Full)', 'Chemistry (Full)', 'Mathematics (Full)', 'Speed Calculation', 'Problem Solving Strategies'] },
      ],
      whyReasons: [
        { icon: '💪', title: 'Dedicated Focus', desc: 'No board exams allow for 100% focus on JEE cracking.' },
      ],
       faqs: [
         { q: 'Is registration open for 12th pass?', a: 'Yes, special early-bird registrations are open.' },
       ]
    }
  },
  neet: {
    '11th': {
      heroTitle: 'NEET Nurture',
      heroHighlight: 'Class 11th',
      heroDesc: 'Begin your journey towards becoming a Doctor. Comprehensive preparation for NEET Medical from Class 11th basics.',
      heroPills: ['2-Year Program', 'Board Ready', 'Medical Focused', 'Biology Powerhouse'],
      shortName: 'NEET 11th',
      gradient: 'from-emerald-600 via-emerald-700 to-emerald-900',
      accentColor: 'bg-emerald-50',
      stats: [
        { value: '6K+', label: '11th Students', icon: '🩺' },
        { value: 'AIIMS', label: 'Faculty', icon: '🏥' },
        { value: '100%', label: 'NCERT Focus', icon: '📖' },
        { value: '8+', label: 'Medical Mentors', icon: '👩‍⚕️' },
      ],
      batches: [
        {
          name: 'MEDICAL NURTURE',
          target: 'Class 11th Students',
          duration: '2 Years',
          startDate: '1st April 2026',
          fees: '₹1,60,000/yr',
          classes: '6 Days',
          features: ['Intensive Biology Modules', 'Chemistry Fundamentals', 'Physics for Medical', 'NCERT Master Sessions'],
        }
      ],
      syllabus: [
        { name: 'Biology', icon: '🌿', topics: ['Diversity in Living World', 'Plant Anatomy', 'Human Physiology', 'Cell Biology', 'Plant Physiology'] },
        { name: 'Physics', icon: '⚡', topics: ['Basic Math for Physics', 'Kinematics', 'Laws of Motion', 'Thermodynamics', 'Gravitation'] },
        { name: 'Chemistry', icon: '🧪', topics: ['Mole Concept', 'Atomic Structure', 'Chemical Bonding', 'Gaseous State', 'Organic Basics'] },
      ],
      whyReasons: [
        { icon: '🩸', title: 'Medical Edge', desc: 'Our unique teaching methodology makes Physics easy for Biology students.' },
      ],
      faqs: [
        { q: 'Do you cover AIIMS pattern?', a: 'Yes, we cover updated NEET patterns used for AIIMS & JIPMER admissions.' },
      ]
    },
    '12th': {
      heroTitle: 'NEET Enthuse',
      heroHighlight: 'Class 12th',
      heroDesc: 'Master Class 12th Biology and Chemistry while securing a top rank in NEET. A premium 1-year specialized coaching program.',
      heroPills: ['1-Year Mastery', 'NCERT Centric', 'Weekly Bio-Tests', 'Doubt Eraser'],
      shortName: 'NEET 12th',
      gradient: 'from-teal-600 via-teal-700 to-teal-900',
      accentColor: 'bg-teal-50',
      stats: [
        { value: '4K+', label: '12th Students', icon: '🧬' },
        { value: '700+', label: 'NEET Scores', icon: '📈' },
        { value: '1:10', label: 'Expert Ratio', icon: '🎓' },
        { value: 'Daily', label: 'Doubt Desk', icon: '❓' },
      ],
      batches: [
        {
          name: 'MEDICAL ENTHUSE',
          target: 'Class 12th Appeared',
          duration: '1 Year',
          startDate: '1st April 2026',
          fees: '₹1,50,000/yr',
          classes: '6 Days',
          features: ['12th Full Board + NEET', '11th Quick Revision', 'All India Medical Test Series', 'Rank Analysis'],
        }
      ],
      syllabus: [
        { name: 'Biology', icon: '🔬', topics: ['Reproduction', 'Genetics & Evolution', 'Biology in Human Welfare', 'Biotechnology', 'Ecology'] },
        { name: 'Chemistry', icon: '🧪', topics: ['Solutions', 'Electrochemistry', 'p,d,f Block', 'Haloalkanes', 'Phenols', 'Amines'] },
        { name: 'Physics', icon: '⚡', topics: ['Electrostatics', 'Magnetism', 'Ray Optics', 'Wave Optics', 'Modern Physics'] },
      ],
      whyReasons: [
        { icon: '💊', title: 'Targeted Practice', desc: 'Daily MCQ practice curated by medical entrance experts.' },
      ],
      faqs: [
        { q: 'What about board marks?', a: 'Our curriculum ensures you score 90%+ in 12th Boards alongside NEET.' },
      ]
    },
    'pass': {
       heroTitle: 'NEET Dropper',
       heroHighlight: '12th Pass',
       heroDesc: 'Your final push towards a Medical seat. An intensive year-long program for repeaters to maximize their NEET score.',
       heroPills: ['Score Booster', 'Error Analysis', 'Test-Every-Day', 'Medical Mentorship'],
       shortName: 'NEET Dropper',
       gradient: 'from-pink-600 via-pink-700 to-pink-900',
       accentColor: 'bg-pink-50',
       stats: [
         { value: '2K+', label: 'Medical Drop', icon: '🚀' },
         { value: 'Full', label: 'Day Support', icon: '🏪' },
         { value: 'Weekly', label: 'One-to-One', icon: '🤝' },
         { value: '9ZT', label: 'Success Story', icon: '🌟' },
       ],
       batches: [
         {
           name: 'REPEATER MEDICAL',
           target: 'For 12th Pass Medical Students',
           duration: '1 Year',
           startDate: '1st June 2026',
           fees: '₹1,40,000/yr',
           classes: '6 Days',
           features: ['Full Syllabus Rigor', 'Extensive Problem Bank', 'Rank Oriented Tests', 'Conceptual Doubts Sessions'],
         }
       ],
       syllabus: [
        { name: 'Full NEET Package', icon: '💉', topics: ['Bio (Botany+Zool)', 'Chemistry (All)', 'Physics (All)', 'Mock Drills', 'Exam Survival Strategy'] },
      ],
      whyReasons: [
        { icon: '🧪', title: 'Zero Distraction', desc: 'Environment tailored for students who solely want to cross the NEET barrier.' },
      ],
       faqs: [
         { q: 'Can I start in July?', a: 'Yes, we have multiple phases for repeater batches starting until July.' },
       ]
    }
  }
};
