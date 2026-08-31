import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import CourseSelector from './components/CourseSelector';
import Chatbot from './components/Chatbot';
import Announcements from './components/Announcements';
import BoosterCourses from './components/BoosterCourses';
import AppSection from './components/AppSection';
import Results from './components/Results';
import Assistance from './components/Assistance';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';
import StudyCentersPage from './components/StudyCentersPage';
import OnlineCoursesPage from './components/OnlineCoursesPage';
import ScholarshipPage from './components/ScholarshipPage';
import JEEPage from './components/JEEPage';
import NEETPage from './components/NEETPage';
import FoundationPage from './components/FoundationPage';
import MHTCETPage from './components/MHTCETPage';

import ResultDashboard from './components/ResultDashboard';
import FeePaymentPage from './components/FeePaymentPage';
import CourseLevelDetail from './components/CourseLevelDetail';
import AboutUs from './components/AboutUs';
import AdmissionForm from './components/AdmissionForm';
import ContactUs from './components/ContactUs';
import EnquiryPage from './components/EnquiryPage';
import GrievancePage from './components/GrievancePage';
import BlogPage from './components/BlogPage';
import CourseHubPage from './components/CourseHubPage';
import CoachingGuidelinesPage from './components/CoachingGuidelinesPage';
import AcademicsTeam from './components/AcademicsTeam';
import AssociateConsultant from './components/AssociateConsultant';
import AdminPanel from './components/AdminPanel';
import MetaTags from './components/MetaTags';
import InformationPage from './components/InformationPage';
import JEEMainInfoPage from './components/JEEMainInfoPage';
import MHTCETInfoPage from './components/MHTCETInfoPage';
import NEETUGInfoPage from './components/NEETUGInfoPage';
import AdmissionFormModal from './components/AdmissionFormModal';
import CounselingForm from './components/CounselingForm';
import AdPopup from './components/AdPopup';
import AppPopup from './components/AppPopup';
import SuccessCarousel from './components/SuccessCarousel';
import PolicyModal from './components/PolicyModal';

import WhyBKCareer from './components/WhyBKCareer';
import ParentsSection from './components/ParentsSection';
import BrochureSection from './components/BrochureSection';

const Home = ({ navigateTo }) => (
  <div className="animate-fade-up">
    <Hero navigateTo={navigateTo} />
    <div className="animate-fade-up stagger-1">
      <CourseSelector navigateTo={navigateTo} />
    </div>
    <ParentsSection navigateTo={navigateTo} />
    <BrochureSection navigateTo={navigateTo} />
    <div className="animate-fade-up stagger-2">
      <BoosterCourses navigateTo={navigateTo} />
    </div>
    <div className="animate-fade-up stagger-3">
      <StatsSection />
    </div>
    <AppSection navigateTo={navigateTo} />
    <SuccessCarousel />
    <WhyBKCareer />
    <Results navigateTo={navigateTo} />
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmissionOpen, setIsAdmissionOpen] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [showCounseling, setShowCounseling] = React.useState(false);
  const [activePolicy, setActivePolicy] = React.useState({ isOpen: false, type: '' });


  const navigateTo = (v) => {
    if (v === 'counseling') {
      setShowCounseling(true);
      return;
    }
    if (v === 'chatbot') {
      setIsChatOpen(true);
      return;
    }
    const pathMap = {
      'home': '/',
      'centers': '/centers',
      'online-courses': '/online-courses',
      'residential': '/scholarship',
      'registration': '/enquiry',
      'admission': '/admission',
      'jee': '/jee',
      'neet': '/neet',
      'foundation': '/foundation',

      'live-results': '/live-results',
      'pay-fee': '/pay-fee',
      'about-us': '/about-us',
      'contact': '/contact',
      'enquiry': '/enquiry',
      'grievance': '/grievance',
      'careers': '/careers',
      'blog': '/blog',
      'study-center': '/study-center',
      'guidelines': '/coaching-guidelines',
      'academics-team': '/academics-team',
      'associate-consultant': '/associate-consultant',
      'admin': '/admin-portal',
      'jee-hub': '/jee-hub',
      'neet-hub': '/neet-hub',
      'cet': '/mht-cet',
      'mht-cet': '/mht-cet',
      'nda': '/nda',
      'boards': '/state-board',
      'jee-11th': '/jee/11th',
      'jee-12th': '/jee/12th',
      'jee-pass': '/jee/pass',
      'neet-11th': '/neet/11th',
      'neet-12th': '/neet/12th',
      'neet-pass': '/neet/pass',
      'class 11 & 12': '/foundation',
      '11th & 12th': '/foundation',
      'jee-advanced': '/information/jee-advanced',
      'jee-main': '/information/jee-main',
      'mht-cet-info': '/information/mht-cet',
      'neet-ug-info': '/information/neet-ug',
      'counseling': '/counseling'
    };
    if (v === 'admission') {
      setIsAdmissionOpen(true);
      return;
    }
    if (['CSR POLICY', 'PRIVACY POLICY', 'REFUND RULES', 'TERMS & CONDITIONS'].includes(v)) {
      setActivePolicy({ isOpen: true, type: v });
      return;
    }
    const path = pathMap[v] || '/';
    navigate(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const hashToPath = {
        'home': '/',
        'centers': '/centers',
        'online-courses': '/online-courses',
        'residential': '/scholarship',
        'registration': '/enquiry',
        'jee': '/jee',
        'neet': '/neet',
        'foundation': '/foundation',

        'live-results': '/live-results',
        'pay-fee': '/pay-fee'
      };
      if (hashToPath[hash]) {
        navigate(hashToPath[hash], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="site-shell min-h-screen bg-white">
      <MetaTags />
      <div className="no-print">
        {location.pathname !== '/admin-portal' && (
          <Navbar navigateTo={navigateTo} currentView={location.pathname} onOpenCounseling={() => setShowCounseling(true)} />
        )}
      </div>
      <main className="relative w-full">
        <Routes>
          <Route path="/" element={<Home navigateTo={navigateTo} />} />
          <Route path="/study-center" element={<StudyCentersPage navigateTo={navigateTo} />} />
          <Route path="/centers" element={<StudyCentersPage navigateTo={navigateTo} />} />
          <Route path="/online-courses" element={<OnlineCoursesPage navigateTo={navigateTo} />} />
          <Route path="/scholarship" element={<ScholarshipPage navigateTo={navigateTo} />} />
          <Route path="/jee" element={<JEEPage navigateTo={navigateTo} />} />
          <Route path="/jee/:level" element={<CourseLevelDetail type="jee" navigateTo={navigateTo} />} />
          <Route path="/neet" element={<NEETPage navigateTo={navigateTo} />} />
          <Route path="/neet/:level" element={<CourseLevelDetail type="neet" navigateTo={navigateTo} />} />
          <Route path="/foundation" element={<FoundationPage navigateTo={navigateTo} />} />

          <Route path="/registration" element={<EnquiryPage />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/live-results" element={<ResultDashboard />} />
          <Route path="/pay-fee" element={<FeePaymentPage navigateTo={navigateTo} />} />
          <Route path="/about-us" element={<AboutUs navigateTo={navigateTo} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/grievance" element={<GrievancePage />} />
          <Route path="/blog" element={<BlogPage navigateTo={navigateTo} />} />
          <Route path="/coaching-guidelines" element={<CoachingGuidelinesPage />} />
          <Route path="/academics-team" element={<AcademicsTeam navigateTo={navigateTo} />} />
          <Route path="/associate-consultant" element={<AssociateConsultant navigateTo={navigateTo} />} />
          <Route path="/admin-portal" element={<AdminPanel navigateTo={navigateTo} />} />
          <Route path="/jee-hub" element={<CourseHubPage courseType="jee" navigateTo={navigateTo} />} />
          <Route path="/neet-hub" element={<CourseHubPage courseType="neet" navigateTo={navigateTo} />} />
          <Route path="/mht-cet" element={<MHTCETPage navigateTo={navigateTo} />} />
          <Route path="/nda" element={<CourseHubPage courseType="nda" navigateTo={navigateTo} />} />
          <Route path="/state-board" element={<CourseHubPage courseType="boards" navigateTo={navigateTo} />} />
          <Route path="/information/jee-advanced" element={<InformationPage navigateTo={navigateTo} />} />
          <Route path="/information/jee-main" element={<JEEMainInfoPage navigateTo={navigateTo} />} />
          <Route path="/information/mht-cet" element={<MHTCETInfoPage navigateTo={navigateTo} />} />
          <Route path="/information/neet-ug" element={<NEETUGInfoPage navigateTo={navigateTo} />} />
          <Route path="/counseling" element={<div className="pt-24 pb-12 bg-slate-50 min-h-screen"><CounselingForm /></div>} />
          <Route path="*" element={<Home />} />

        </Routes>
      </main>
      <div className="no-print">
        {location.pathname !== '/admin-portal' && (
          <Footer navigateTo={navigateTo} onOpenChat={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />
        )}
      </div>

      <AdmissionFormModal 
        isOpen={isAdmissionOpen} 
        onClose={() => setIsAdmissionOpen(false)} 
      />

      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        navigateTo={navigateTo}
      />

      <AnimatePresence>
        {showCounseling && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-xl">
              <CounselingForm onClose={() => setShowCounseling(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      {location.pathname !== '/admin-portal' && (
        <>
          <AdPopup onOpenCounseling={() => setShowCounseling(true)} />
          <AppPopup />
        </>
      )}

      <PolicyModal 
        isOpen={activePolicy.isOpen} 
        type={activePolicy.type} 
        onClose={() => setActivePolicy({ ...activePolicy, isOpen: false })} 
      />
    </div>
  );
}

export default App;
