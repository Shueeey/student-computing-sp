import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Send, MapPin, Clock, Users, Laptop, HeadphonesIcon, MessageSquare } from 'lucide-react';

const StudentComputingTeamLanding = () => {
  // State for idea submission widget
  const [ideas, setIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem('studentComputingIdeas');
    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });
  const [newIdea, setNewIdea] = useState('');
  
  // Parallax effect refs
  const parallaxRef1 = useRef(null);
  const parallaxRef2 = useRef(null);

  // Save ideas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studentComputingIdeas', JSON.stringify(ideas));
  }, [ideas]);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (parallaxRef1.current) {
        parallaxRef1.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
      
      if (parallaxRef2.current) {
        parallaxRef2.current.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    if (newIdea.trim()) {
      const idea = {
        id: Date.now(),
        text: newIdea.trim(),
        timestamp: new Date().toISOString()
      };
      setIdeas([...ideas, idea]);
      setNewIdea('');
    }
  };

  const handleDeleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <div className="font-bold text-xl text-blue-400">Student Computing Team</div>
          <div className="hidden md:flex ml-12 space-x-8">
            <a href="#about" className="text-gray-300 hover:text-white">About Us</a>
            <a href="#locations" className="text-gray-300 hover:text-white">Locations</a>
            <a href="#services" className="text-gray-300 hover:text-white">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#help" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Get Help Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-20 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white">
                Tech Support <span className="text-blue-400">By Students, For Students</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 lg:pr-12">
                We're your on-campus tech experts, ready to solve your computing problems and get you back to what matters – your studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                  Find Us Today
                </button>
                <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
                  Our Services
                </button>
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Community Ideas Board</h3>
              <p className="text-gray-300 mb-6">Have an idea for improving campus tech? Share it below and it might become our next project!</p>
              
              <form onSubmit={handleSubmitIdea} className="mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newIdea}
                    onChange={(e) => setNewIdea(e.target.value)}
                    placeholder="Share your idea..."
                    className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {ideas.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No ideas yet. Be the first to contribute!</p>
                ) : (
                  ideas.map(idea => (
                    <div key={idea.id} className="bg-gray-700 p-3 rounded-lg flex justify-between items-start">
                      <div>
                        <p className="text-gray-100">{idea.text}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(idea.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDeleteIdea(idea.id)}
                        className="text-gray-400 hover:text-red-400 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6 lg:px-12 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To provide expert, friendly, and accessible technical support to the entire campus community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Laptop className="w-8 h-8 text-blue-400" />,
                title: 'Device Support',
                desc: 'Troubleshooting laptops, phones, and other devices.'
              },
              {
                icon: <HeadphonesIcon className="w-8 h-8 text-blue-400" />,
                title: 'Tech Guidance',
                desc: 'Expert advice on technology purchases and setup.'
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: 'Student-Focused',
                desc: 'Support tailored to your academic technology needs.'
              },
              {
                icon: <Clock className="w-8 h-8 text-blue-400" />,
                title: 'Quick Resolution',
                desc: 'Fast solutions to get you back to your studies.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-400 transition-all">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations with Parallax */}
      <section id="locations" className="py-20">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Find Us On Campus
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We have two convenient support locations to serve you better.
          </p>
        </div>

        {/* First Location with Parallax */}
        <div 
          ref={parallaxRef1}
          className="h-96 bg-cover bg-center mb-12 relative flex items-center"
          style={{
            backgroundImage: "url('/api/placeholder/1200/800')",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 container mx-auto px-6 lg:px-12">
            <div className="bg-gray-800 bg-opacity-80 p-8 rounded-xl max-w-lg">
              <h3 className="text-2xl font-bold mb-3 text-white flex items-center">
                <MapPin className="mr-2 text-blue-400" /> Main Campus Tech Hub
              </h3>
              <p className="text-gray-200 mb-4">
                Located in the Student Union Building, our main support counter offers comprehensive technical assistance for all your computing needs.
              </p>
              <p className="text-gray-300 mb-6">
                <strong>Hours:</strong> Monday-Friday, 9am-5pm
              </p>
              <a 
                href="https://g.co/kgs/SoF28e3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center"
              >
                View on Map
              </a>
            </div>
          </div>
        </div>

        {/* Second Location with Parallax */}
        <div 
          ref={parallaxRef2}
          className="h-96 bg-cover bg-center relative flex items-center"
          style={{
            backgroundImage: "url('/api/placeholder/1200/800')",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 container mx-auto px-6 lg:px-12">
            <div className="bg-gray-800 bg-opacity-80 p-8 rounded-xl max-w-lg ml-auto">
              <h3 className="text-2xl font-bold mb-3 text-white flex items-center">
                <MapPin className="mr-2 text-blue-400" /> Library Tech Station
              </h3>
              <p className="text-gray-200 mb-4">
                Our satellite location in the Main Library provides quick assistance with common issues and basic troubleshooting.
              </p>
              <p className="text-gray-300 mb-6">
                <strong>Hours:</strong> Monday-Thursday, 10am-8pm • Friday, 10am-5pm
              </p>
              <a 
                href="https://g.co/kgs/qeWst4D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center"
              >
                View on Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 lg:px-12 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From hardware troubleshooting to software installation, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Hardware Diagnostics', 
              'Software Troubleshooting', 
              'Network Connection Issues', 
              'Virus/Malware Removal', 
              'Data Recovery Assistance', 
              'OS Installation & Updates'
            ].map((service, i) => (
              <div key={i} className="border border-gray-600 rounded-xl p-8 bg-gray-700 hover:border-blue-400 transition">
                <div className="w-12 h-12 bg-blue-900 rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service}</h3>
                <p className="text-gray-300 mb-6">
                  Expert assistance with {service.toLowerCase()} to keep your academic work on track.
                </p>
                <a href="#" className="text-blue-400 font-medium flex items-center hover:text-blue-300">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              What Students Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the students we've helped
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "The Student Computing Team saved my thesis! My laptop crashed the night before submission, and they recovered all my files.",
                name: "Jamie Chen",
                dept: "Biology, Senior"
              },
              {
                quote: "Quick, friendly, and they actually explain what they're doing so I can learn to fix similar issues myself in the future.",
                name: "Alex Rodriguez",
                dept: "Computer Science, Junior"
              },
              {
                quote: "I was having WiFi connectivity issues for weeks. They resolved it in 20 minutes. Absolute lifesavers!",
                name: "Taylor Jackson",
                dept: "Business, Sophomore"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="mb-4 text-blue-400">
                  <MessageSquare size={24} />
                </div>
                <p className="italic mb-6 text-gray-300">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 px-6 lg:px-12 bg-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Need tech support now?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Don't struggle with tech problems alone. Our student experts are ready to help you today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition">
                  Visit a Help Desk
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-blue-800 transition">
                  Email Support
                </button>
              </div>
            </div>
            <div>
              <div className="bg-blue-800 rounded-xl p-8 border border-blue-700">
                <h3 className="text-xl font-semibold mb-6 text-white">Walk-in Service Hours</h3>
                <div className="space-y-4 text-blue-100">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="pt-4 border-t border-blue-700 mt-4">
                    <p className="font-medium text-white">Emergency Support</p>
                    <p>Available via email 24/7 for critical issues</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-bold text-blue-400 mb-4">Student Computing Team</div>
              <p className="mb-4">Technology support by students, for students</p>
              <div className="flex space-x-4">
                {['Twitter', 'Instagram', 'Facebook'].map((social, i) => (
                  <a key={i} href="#" className="hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            {['Services', 'Locations', 'Resources', 'About Us'].map((category, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j}><a href="#" className="hover:text-white">{category} Link {j}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Student Computing Team. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentComputingTeamLanding;