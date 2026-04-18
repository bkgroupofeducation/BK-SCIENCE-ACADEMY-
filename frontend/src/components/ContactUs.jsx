import React from 'react';
import { Phone, Mail, MapPin, Globe, ExternalLink, Camera, MessageCircle, Video, Share2, Sparkles } from 'lucide-react';
import GridDistortion from './GridDistortion';


const ContactCard = ({ title, content, subContent, icon: Icon, color = "indigo" }) => (
    <div className="bg-white p-8 rounded-[40px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-transparent hover:border-brand-red/30 hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group hover:-translate-y-2 relative z-10">
        <div className={`w-16 h-16 rounded-3xl bg-${color}-50 text-${color}-600 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500`}>
            <Icon size={28} strokeWidth={2.5} />
        </div>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 leading-none">{title}</h3>
        <p className="text-xl font-black text-brand-dark mb-1 tracking-tight">{content}</p>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{subContent}</p>
    </div>
);

const ContactUs = () => {
    const centers = [
        { 
            name: "BK Group of Education", 
            address: "2nd Floor, Gajanan Plaza, Gharpure Ghat Rd, behind Lotus Capital Building, Ashok Stambh, Shivaji Nagar, Nashik, Maharashtra 422002", 
            phone: "+91 88883 01363",
            email: "bkgroupofeducation@gmail.com"
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6 relative">
            {/* Liquid Grid Background Overlay */}
            <div className="absolute inset-0 z-0 opacity-100">
                <GridDistortion />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-20 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red/5 text-brand-red rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-brand-red/10 backdrop-blur-sm">
                        <Globe size={16} />
                        Global Headquarters • Nashik
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
                        <span className="text-[#333333]">Let's</span> <span className="text-brand-yellow drop-shadow-sm">Connect</span>
                    </h1>
                    
                    <p className="text-gray-700 font-bold uppercase tracking-[0.25em] text-sm max-w-xl mx-auto leading-relaxed opacity-100">
                        Strategically located in the heart of Maharashtra's educational hub.
                    </p>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-fade-up stagger-1">
                    <ContactCard title="Call Anytime" content="+91 88883 01363" subContent="24/7 Helpline Support" icon={Phone} color="red" />
                    <ContactCard title="Email Support" content="bkgroupofeducation@gmail.com" subContent="Average Response: 4 Hrs" icon={Mail} color="yellow" />
                    <ContactCard title="Global Website" content="www.bkacademy.com" subContent="Available 24/7" icon={Globe} color="blue" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
                    {/* Centers List */}
                    <div className="lg:col-span-12 grid grid-cols-1 gap-8 animate-fade-up stagger-2">
                        {centers.map((center, idx) => (
                            <div key={idx} className="bg-white/80 backdrop-blur-md rounded-[50px] p-10 md:p-14 shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row gap-10 items-start border border-white hover:border-brand-red/20 transition-all duration-700 relative z-10">
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
                                            <MapPin size={12} />
                                            Active Hub
                                        </div>
                                        <h3 className="text-4xl font-black text-brand-dark uppercase tracking-tight">{center.name}</h3>
                                    </div>
                                    <p className="text-gray-600 font-bold text-xl leading-relaxed max-w-2xl">{center.address}</p>
                                    <div className="flex flex-wrap gap-8 pt-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Counselor Mobile</span>
                                            <span className="font-black text-brand-dark text-lg">{center.phone}</span>
                                        </div>
                                        <div className="w-[1px] h-10 bg-gray-100 hidden md:block"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Office Email</span>
                                            <span className="font-black text-brand-dark text-lg truncate">{center.email}</span>
                                        </div>
                                    </div>

                                    <a 
                                        href="https://maps.app.goo.gl/9nGy3UgMAKkGPTy88" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center gap-4 py-4 px-8 bg-brand-red/5 rounded-2xl text-brand-red font-black uppercase text-xs tracking-widest hover:bg-brand-red hover:text-white transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/5 hover:shadow-brand-red/20"
                                    >
                                        <span className="relative z-10 transition-transform group-hover:-translate-x-1">View on Google Maps</span>
                                        <div className="relative z-10 p-2 bg-brand-red text-white group-hover:bg-white group-hover:text-brand-red rounded-xl transition-all duration-500 group-hover:rotate-[225deg]">
                                            <ExternalLink size={18} strokeWidth={3} />
                                        </div>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
                                        <div className="absolute bottom-1 left-8 right-8 h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </a>
                                </div>
                                <div className="w-full md:w-80 h-80 bg-gray-50 rounded-[40px] overflow-hidden relative group shadow-inner border border-gray-100">
                                    <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                        <MapPin size={40} className="text-white animate-bounce" />
                                    </div>
                                    <img 
                                        src={`https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=640&auto=format&fit=crop`} 
                                        alt="Center Preview" 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Connect — white-first */}
                <div className="bg-surface-1 border border-gray-100 rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(192,0,0,0.04),transparent_60%)] pointer-events-none" />
                    <div className="relative z-10">
                        <Share2 size={36} className="text-brand-red mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">Stay <span className="text-brand-red italic">Notified.</span></h2>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.15em] text-[10px] mb-10">Connect with our digital ecosystem for live updates</p>
                        
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            {[
                                { icon: Camera, label: "Instagram", handle: "@bkscience_nashik", href: "#" },
                                { icon: Video, label: "YouTube", handle: "BK Science Academy", href: "#" },
                                { icon: MessageCircle, label: "Facebook", handle: "BKAcademyNashik", href: "#" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                                   className="group flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all duration-400 shadow-sm text-gray-500">
                                        <social.icon size={26} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-brand-red transition-colors">{social.label}</p>
                                        <p className="text-[9px] font-bold text-gray-400">{social.handle}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-20 text-center animate-fade-up">
                    <p className="text-gray-400 font-extrabold italic text-sm md:text-base max-w-2xl mx-auto leading-relaxed pt-10 border-t border-gray-100">
                        "Location is never a barrier for ambition. We bring global standard education to your doorstep."
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <Sparkles size={16} className="text-brand-yellow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-dark">The Academy of Champions</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;