import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, RefreshCcw, HeartHandshake } from 'lucide-react';

const PolicyModal = ({ isOpen, onClose, type }) => {
  const content = {
    'CSR POLICY': {
      title: 'Corporate Social Responsibility',
      icon: <HeartHandshake className="text-brand-red" size={32} />,
      sections: [
        {
          heading: 'Our Vision',
          text: 'BK Science Academy is committed to more than just academic results. We believe in building a society where quality science education is a right, not a privilege.'
        },
        {
          heading: 'Educational Outreach',
          text: 'We conduct free career guidance seminars and aptitude tests in rural schools across Maharashtra to help students from under-served communities identify their potential in STEM fields.'
        },
        {
          heading: 'Merit-Based Scholarships',
          text: 'Our "BK Champions" initiative provides up to 100% fee waivers for talented students from economically weaker sections, ensuring that financial constraints never hinder a bright mind.'
        },
        {
          heading: 'Community Impact',
          text: 'We regularly partner with local NGOs to provide resources for science laboratories and libraries in government-run schools.'
        }
      ]
    },
    'PRIVACY POLICY': {
      title: 'Privacy & Data Protection',
      icon: <ShieldCheck className="text-brand-red" size={32} />,
      sections: [
        {
          heading: 'Data Collection',
          text: 'We collect personal information such as name, contact details, and academic history solely for the purpose of admission, counseling, and academic tracking.'
        },
        {
          heading: 'Secure Storage',
          text: 'All student data is encrypted and stored in secure servers. Access is restricted to authorized academic and administrative personnel only.'
        },
        {
          heading: 'No Third-Party Sharing',
          text: 'BK Science Academy maintains a strict "No Data Sharing" policy. Your personal information is never sold or shared with third-party marketing agencies.'
        },
        {
          heading: 'Digital Privacy',
          text: 'Our website uses cookies only to enhance user experience and manage application sessions. We do not track your activity outside of our institutional domain.'
        }
      ]
    },
    'REFUND RULES': {
      title: 'Refund & Cancellation Policy',
      icon: <RefreshCcw className="text-brand-red" size={32} />,
      sections: [
        {
          heading: 'Registration Fees',
          text: 'Registration and processing fees paid at the time of admission are non-refundable under any circumstances.'
        },
        {
          heading: 'Tuition Fee Refund',
          text: 'If a withdrawal request is submitted 7 days prior to the batch start date, 100% of the tuition fee (excluding registration) will be refunded.'
        },
        {
          heading: 'Mid-Session Withdrawal',
          text: 'Refunds for withdrawals within 30 days of the session start are calculated on a pro-rata basis, subject to a 20% administrative deduction. No refunds are issued after 30 days of the academic session.'
        },
        {
          heading: 'Processing Time',
          text: 'All approved refund requests are processed via bank transfer within 15-20 working days from the date of approval.'
        }
      ]
    },
    'TERMS & CONDITIONS': {
      title: 'Institutional Terms of Use',
      icon: <FileText className="text-brand-red" size={32} />,
      sections: [
        {
          heading: 'Academic Conduct',
          text: 'Students are expected to maintain a minimum of 80% attendance. Consistent absence without prior notice may lead to suspension of access to digital resources.'
        },
        {
          heading: 'Intellectual Property',
          text: 'All study materials, test series, and video lectures provided by BK Science Academy are the exclusive property of the institution. Unauthorized sharing or commercial redistribution is strictly prohibited.'
        },
        {
          heading: 'Disciplinary Rules',
          text: 'The academy maintains a zero-tolerance policy towards ragging, harassment, or damage to institutional property. Any such act will result in immediate expulsion without refund.'
        },
        {
          heading: 'Fee Payment',
          text: 'Installments must be paid on or before the due dates. Failure to do so may result in temporary suspension of library and classroom access.'
        }
      ]
    }
  };

  const activePolicy = content[type] || content['CSR POLICY'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 p-8 md:p-10 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-red/5 rounded-2xl">
                  {activePolicy.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter leading-none">{activePolicy.title}</h2>
                  <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mt-1">BK Science Academy Institutional Policy</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:shadow-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 md:p-10 max-h-[60vh] overflow-y-auto scrollbar-thin">
              <div className="space-y-8">
                {activePolicy.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider flex items-center gap-3">
                      <span className="w-6 h-0.5 bg-brand-red"></span>
                      {section.heading}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed pl-9">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Effective Date: May 2024 • Version 2.4</p>
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-brand-dark text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-red transition-colors shadow-lg"
              >
                Close Policy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
