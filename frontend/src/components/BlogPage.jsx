import React, { useState, useEffect } from 'react';

const BlogPage = ({ navigateTo }) => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Strategies to Master Organic Chemistry for JEE Advanced",
      excerpt: "Organic Chemistry can be the highest scoring section if approached with logical mechanisms rather than just rote memorization...",
      author: "Dr. Arvind Kumar",
      date: "April 10, 2025",
      category: "JEE PREP",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1532187875605-2fe358a3d4d2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Understanding the Human Heart: A Comprehensive NEET Guide",
      excerpt: "The circulatory system is a core pillar of the NEET biology syllabus. Here is a simplified breakdown of complex cardiac cycles...",
      author: "Prof. S. Deshmukh",
      date: "April 08, 2025",
      category: "NEET TIPS",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1576086213369-97a306dca664?q=80&w=2040&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Physics of Daily Life: Why Fundamentals Matter",
      excerpt: "Physics is not just about formulas; it's about the laws that govern our existence. Learn how to relate concepts to real-world scenarios...",
      author: "Er. Bhagwan Elmame",
      date: "April 05, 2025",
      category: "ACADEMICS",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Balancing Mental Health During Competitive Exam Prep",
      excerpt: "Success is 50% knowledge and 50% mindset. Our psychologists share 5 habits to stay calm and focused during the final countdown...",
      author: "Counselor R. Patil",
      date: "March 28, 2025",
      category: "STUDENT LIFE",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-40 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-4 py-1.5 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              BK Science Journal
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
              Insights For <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-orange-400">Future Scholars.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">
              Expert takes on exam strategies, scientific breakthroughs, and the journey toward academic excellence.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 right-10 text-[12rem] font-black text-white/5 pointer-events-none select-none -skew-x-12 hidden lg:block uppercase leading-none">
          INSIGHTS
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {blogPosts.map((post, i) => (
              <div key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-gray-100 mb-8 shadow-2xl transition-all duration-700 group-hover:shadow-brand-red/20">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-brand-dark uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="px-4">
                  <div className="flex items-center gap-4 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-brand-dark leading-tight tracking-tighter mb-6 group-hover:text-brand-red transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8 line-clamp-2 font-medium">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center font-black text-brand-red text-xs">
                        {post.author.split(' ')[0][0]}{post.author.split(' ')[1][0]}
                      </div>
                      <span className="text-sm font-black text-brand-dark uppercase tracking-tight">{post.author}</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-dark group-hover:bg-brand-red group-hover:text-white transition-all duration-500 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <button className="px-12 py-6 bg-brand-dark text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-red transition-all duration-500 shadow-2xl shadow-black/20 group">
              View More Articles
              <span className="inline-block ml-4 transition-transform group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-brand-gray relative overflow-hidden rounded-[3rem] mx-4 md:mx-10 mb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-brand-dark tracking-tighter leading-none mb-8">
              Stay <span className="text-brand-red">Curious.</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Get the latest academic insights and exam updates delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto shadow-2xl rounded-3xl overflow-hidden p-2 bg-white">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-8 py-5 text-brand-dark font-medium placeholder-gray-400 outline-none rounded-2xl"
              />
              <button className="px-10 py-5 bg-brand-red text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-brand-dark transition-all duration-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
