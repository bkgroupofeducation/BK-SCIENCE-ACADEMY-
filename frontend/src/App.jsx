import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import CourseSelector from './components/CourseSelector';
import Announcements from './components/Announcements';
import StudentStories from './components/StudentStories';
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
import OlympiadsPage from './components/OlympiadsPage';
import ResultDashboard from './components/ResultDashboard';
import FeePaymentPage from './components/FeePaymentPage';
import CourseLevelDetail from './components/CourseLevelDetail';
import WhyBKScience from './components/WhyBKScience';
import AboutUs from './components/AboutUs';
import FoundationEBrochure from './components/FoundationEBrochure';
import AdmissionForm from './components/AdmissionForm';
import ContactUs from './components/ContactUs';
import EnquiryPage from './components/EnquiryPage';
import GrievancePage from './components/GrievancePage';
import CareersPage from './components/CareersPage';
import MOSTPage from './components/MOSTPage';
import BlogPage from './components/BlogPage';
import CourseHubPage from './components/CourseHubPage';
import CoachingGuidelinesPage from './components/CoachingGuidelinesPage';
import MagazinePage from './components/MagazinePage';
import AcademicsTeam from './components/AcademicsTeam';
import AssociateConsultant from './components/AssociateConsultant';
import AdminPanel from './components/AdminPanel';
import MetaTags from './components/MetaTags';
import LandingPage from './components/LandingPage';
import InformationPage from './components/InformationPage';

const Home = ({ navigateTo }) => (
  <div className="animate-fade-up">
    <Hero navigateTo={navigateTo} />
    <div className="animate-fade-up stagger-1">
      <StatsSection />
    </div>
    <div className="animate-fade-up stagger-2">
      <CourseSelector navigateTo={navigateTo} />
    </div>
    <div className="animate-fade-up stagger-3">
      <Announcements navigateTo={navigateTo} />
    </div>
    <div className="animate-fade-up stagger-4">
      <StudentStories navigateTo={navigateTo} />
    </div>
    <div className="animate-fade-up stagger-5">
      <BoosterCourses navigateTo={navigateTo} />
    </div>
    <AppSection navigateTo={navigateTo} />
    <Results navigateTo={navigateTo} />
    <Assistance navigateTo={navigateTo} />
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (v) => {
    const pathMap = {
      'home': '/',
      'centers': '/centers',
      'online-courses': '/online-courses',
      'residential': '/scholarship',
      'registration': '/registration',
      'admission': '/admission',
      'jee': '/jee',
      'neet': '/neet',
      'foundation': '/foundation',
      'olympiads': '/olympiads',
      'live-results': '/live-results',
      'pay-fee': '/pay-fee',
      'why-bk': '/why-bk',
      'about-us': '/about-us',
      'contact': '/contact',
      'enquiry': '/enquiry',
      'grievance': '/grievance',
      'foundation-brochure': '/foundation-brochure',
      'careers': '/careers',
      'most': '/most',
      'blog': '/blog',
      'study-center': '/study-center',
      'guidelines': '/coaching-guidelines',
      'magazine': '/magazine',
      'academics-team': '/academics-team',
      'associate-consultant': '/associate-consultant',
      'admin': '/adminportal',
      'jee-hub': '/jee-hub',
      'neet-hub': '/neet-hub',
      'cet': '/mht-cet',
      'nda': '/nda',
      'boards': '/state-board',
      'jee-11th': '/jee/11th',

      'jee-12th': '/jee/12th',
      'jee-pass': '/jee/pass',
      'neet-11th': '/neet/11th',
      'neet-12th': '/neet/12th',
      'neet-pass': '/neet/pass',
      'landing': '/landing',
      'jee-advanced': '/information/jee-advanced'
    };
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
        'registration': '/registration',
        'jee': '/jee',
        'neet': '/neet',
        'foundation': '/foundation',
        'olympiads': '/olympiads',
        'live-results': '/live-results',
        'pay-fee': '/pay-fee'
      };
      if (hashToPath[hash]) {
        navigate(hashToPath[hash], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <MetaTags />
      <div className="no-print">
        <Navbar navigateTo={navigateTo} currentView={location.pathname} />
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
          <Route path="/olympiads" element={<OlympiadsPage navigateTo={navigateTo} />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/live-results" element={<ResultDashboard />} />
          <Route path="/pay-fee" element={<FeePaymentPage navigateTo={navigateTo} />} />
          <Route path="/why-bk" element={<WhyBKScience navigateTo={navigateTo} />} />
          <Route path="/about-us" element={<AboutUs navigateTo={navigateTo} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/grievance" element={<GrievancePage />} />
          <Route path="/foundation-brochure" element={<FoundationEBrochure navigateTo={navigateTo} />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/most" element={<MOSTPage navigateTo={navigateTo} />} />
          <Route path="/blog" element={<BlogPage navigateTo={navigateTo} />} />
          <Route path="/coaching-guidelines" element={<CoachingGuidelinesPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/academics-team" element={<AcademicsTeam navigateTo={navigateTo} />} />
          <Route path="/associate-consultant" element={<AssociateConsultant navigateTo={navigateTo} />} />
          <Route path="/adminportal" element={<AdminPanel navigateTo={navigateTo} />} />
          <Route path="/jee-hub" element={<CourseHubPage courseType="jee" navigateTo={navigateTo} />} />
          <Route path="/neet-hub" element={<CourseHubPage courseType="neet" navigateTo={navigateTo} />} />
          <Route path="/mht-cet" element={<CourseHubPage courseType="mht-cet" navigateTo={navigateTo} />} />
          <Route path="/nda" element={<CourseHubPage courseType="nda" navigateTo={navigateTo} />} />
          <Route path="/state-board" element={<CourseHubPage courseType="boards" navigateTo={navigateTo} />} />
          <Route path="/landing" element={<LandingPage navigateTo={navigateTo} />} />
          <Route path="/information/jee-advanced" element={<InformationPage navigateTo={navigateTo} />} />
          <Route path="*" element={<Home />} />

        </Routes>
      </main>
      <div className="no-print">
        <Footer navigateTo={navigateTo} />
      </div>
    </div>
  );
}

export default App;