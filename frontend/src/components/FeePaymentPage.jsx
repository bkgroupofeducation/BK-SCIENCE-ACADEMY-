import React, { useState, useEffect, useRef } from 'react';
import { apiFetch } from '../api';

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const PaymentMethodCard = ({ icon, title, description, details, selected, onClick, delay }) => {
  const [ref, isVisible] = useInView();

  return (
    <div 
      ref={ref}
      onClick={onClick}
      className={`relative cursor-pointer group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${selected ? 'from-brand-red to-orange-500' : 'from-gray-200 to-gray-300'} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
      <div className={`relative p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 ${
        selected 
          ? 'border-brand-red bg-white shadow-2xl shadow-brand-red/10' 
          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl'
      }`}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
          selected ? 'bg-gradient-to-br from-brand-red to-orange-500' : 'bg-gray-100'
        }`}>
          <span className={`text-3xl ${selected ? 'text-white' : 'text-gray-600'}`}>{icon}</span>
        </div>
        <h3 className={`text-xl font-black mb-2 ${selected ? 'text-brand-red' : 'text-brand-dark'}`}>{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        {details && (
          <div className="space-y-2">
            {details.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {d}
              </div>
            ))}
          </div>
        )}
        {selected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-brand-red rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const FeePaymentPage = ({ navigateTo }) => {
  const [headerRef, headerVisible] = useInView();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentStep, setPaymentStep] = useState('select'); // select, details, confirm
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '',
    transactionId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmData, setConfirmData] = useState(null); // holds backend response on success

  const paymentMethods = [
    {
      id: 'upi',
      icon: '📱',
      title: 'UPI Payment',
      description: 'Pay using any UPI app (GPay, PhonePe, Paytm)',
      details: ['Instant confirmation', 'Zero transaction fee', 'Available 24/7']
    },
    {
      id: 'card',
      icon: '💳',
      title: 'Card Payment',
      description: 'Credit/Debit card payment',
      details: ['Visa, Mastercard, RuPay', 'Secure payment gateway', 'EMI options available']
    },
    {
      id: 'netbanking',
      icon: '🏦',
      title: 'Net Banking',
      description: 'Direct bank transfer',
      details: ['All major banks supported', 'Instant confirmation', 'No card required']
    },
    {
      id: 'qr',
      icon: '📲',
      title: 'QR Code',
      description: 'Scan & Pay with any app',
      details: ['Scan from app', 'Works with all UPI apps', 'Instant receipt']
    },
  ];

  const bankDetails = {
    accountName: 'BK Science Academy',
    accountNumber: '1234567890123456',
    ifscCode: 'SBIN0001234',
    bankName: 'State Bank of India',
    branch: 'Nashik Main Branch'
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      // 1. If 'qr' or 'upi' (manual) is selected, use old manual flow
      if (selectedMethod === 'qr' || selectedMethod === 'upi') {
        const result = await apiFetch('/api/payments/submit', {
          method: 'POST',
          body: JSON.stringify({ ...formData, paymentMethod: selectedMethod }),
        });
        setConfirmData(result);
        setPaymentStep('confirm');
        return;
      }

      // 2. Razorpay Flow for 'card' or 'netbanking' (or if you want to use it for everything)
      const res = await loadRazorpay();
      if (!res) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // Create Order
      const { order } = await apiFetch('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount: formData.amount }),
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'BK Science Academy',
        description: 'Course Fee Payment',
        order_id: order.id,
        handler: async (response) => {
          try {
            setSubmitting(true);
            const verifyRes = await apiFetch('/api/payments/verify', {
              method: 'POST',
              body: JSON.stringify({
                ...response,
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                amount: formData.amount
              }),
            });
            setConfirmData(verifyRes);
            setPaymentStep('confirm');
          } catch (err) {
            setSubmitError('Payment verification failed: ' + err.message);
          } finally {
            setSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#e11d48', // brand-red
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      setSubmitError(err.message || 'Payment process failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark py-16 md:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-red/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div 
          ref={headerRef}
          className={`container mx-auto px-5 md:px-8 relative z-10 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Secure Payment</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
              Pay Your <span className="text-brand-yellow">Fees</span> Online
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
              Easy and secure payment options for your course fees. Choose your preferred payment method below.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 74.7C960 80 1056 80 1152 74.7C1248 69 1344 59 1392 53.3L1440 48V80H0Z" fill="#f9fafb" /></svg>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 md:py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Methods */}
              <div className="lg:col-span-2">
                {paymentStep === 'confirm' && confirmData ? (
                  <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-black text-brand-dark mb-3">Payment Submitted!</h2>
                    <p className="text-gray-500 font-medium mb-6">{confirmData.message}</p>
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Submission Reference</p>
                      <p className="text-2xl font-black text-brand-red tracking-widest">#{confirmData.referenceId}</p>
                      <p className="text-sm text-gray-500 mt-2">Keep this reference ID for follow-up. Verification within 24 hours.</p>
                    </div>
                    <button
                      onClick={() => { setPaymentStep('select'); setConfirmData(null); setFormData({ name: '', phone: '', email: '', amount: '', transactionId: '' }); }}
                      className="w-full py-4 bg-gray-100 text-brand-dark font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                  <h2 className="text-2xl font-black text-brand-dark mb-6">Select Payment Method</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method, i) => (
                      <PaymentMethodCard
                        key={method.id}
                        {...method}
                        selected={selectedMethod === method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        delay={i * 100}
                      />
                    ))}
                  </div>

                  {/* Payment Form */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-black text-brand-dark mb-6">Payment Details</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-500 mb-2">Full Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-500 mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-500 mb-2">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition"
                            placeholder="Enter email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-500 mb-2">Amount (₹)</label>
                          <input 
                            type="number" 
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>

                      {selectedMethod === 'upi' && (
                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                          <p className="text-sm text-green-700 font-medium">
                            💚 UPI ID: <span className="font-black">bkscience@okhdfcbank</span>
                          </p>
                          <p className="text-xs text-green-600 mt-1">Pay to this UPI ID and enter transaction ID below</p>
                        </div>
                      )}

                      {selectedMethod === 'qr' && (
                        <div className="p-6 bg-white rounded-xl border-2 border-dashed border-gray-200 text-center">
                          <div className="w-48 h-48 bg-gray-100 rounded-xl mx-auto flex items-center justify-center mb-4">
                            <span className="text-6xl">📱</span>
                          </div>
                          <p className="text-gray-500 text-sm">Scan QR Code to Pay</p>
                          <p className="text-gray-400 text-xs mt-1">Use any UPI app to scan</p>
                        </div>
                      )}

                      {(selectedMethod === 'upi' || selectedMethod === 'qr') && (
                        <div>
                          <label className="block text-sm font-bold text-gray-500 mb-2">Transaction ID / Ref No.</label>
                          <input 
                            type="text" 
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition"
                            placeholder="Enter UPI transaction ID or bank ref number"
                          />
                        </div>
                      )}

                      {submitError && (
                        <p className="text-sm font-bold text-brand-red">{submitError}</p>
                      )}

                      <button 
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-brand-red text-white font-black uppercase tracking-wider rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg shadow-brand-red/20 disabled:opacity-60"
                      >
                        {submitting ? 'Processing...' : (selectedMethod === 'card' || selectedMethod === 'netbanking' ? 'Proceed to Checkout' : 'Submit Payment Details')}
                      </button>
                    </form>
                  </div>
                </div>
                )}
              </div>

              {/* Bank Details Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 sticky top-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-orange-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-black text-brand-dark">Bank Transfer Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Account Name</p>
                      <p className="text-brand-dark font-black">{bankDetails.accountName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Account Number</p>
                      <p className="text-brand-dark font-black tracking-wider">{bankDetails.accountNumber}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">IFSC Code</p>
                      <p className="text-brand-dark font-black">{bankDetails.ifscCode}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Bank Name</p>
                      <p className="text-brand-dark font-black">{bankDetails.bankName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Branch</p>
                      <p className="text-brand-dark font-black">{bankDetails.branch}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(bankDetails.accountNumber);
                      alert('Account number copied!');
                    }}
                    className="w-full mt-6 py-3 border-2 border-brand-red text-brand-red font-black uppercase tracking-wider rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    Copy Account Details
                  </button>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <p className="text-xs text-yellow-700 font-bold uppercase mb-2">⚠️ Important</p>
                    <p className="text-xs text-yellow-600">
                      After making payment, fill the form with your transaction ID for confirmation. Payment confirmation will be sent to your email within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-6 md:p-8">
              <h3 className="text-xl font-black text-brand-dark mb-6">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 17 2 11.18 2 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-black text-brand-dark">Call Us</p>
                    <p className="text-sm text-gray-500">+91 88883 01363</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-black text-brand-dark">Email Us</p>
                    <p className="text-sm text-gray-500">info@bkscience.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .765-.136 1.492-.388 2.17l-.53-.777c.164-.457.264-.943.264-1.393 0-.45-.1-.936-.264-1.393l.53-.777C17.864 8.508 18 9.235 18 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-black text-brand-dark">WhatsApp</p>
                    <p className="text-sm text-gray-500">Chat with us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeePaymentPage;