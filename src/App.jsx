import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaTwitter,
  FaLinkedinIn,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineTruck,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiOutlineSupport,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import Lottie from "lottie-react";
import reactLogoAnim from "./humans.json"; 
import emailjs from '@emailjs/browser';

import logo from "./assets/logo.png";
import video from "./assets/video.mp4";

// Import brand logos
import B1R from "./assets/brands/B1R.png";
import Cloudenine from "./assets/brands/Cloudenine.png";
import dabur from "./assets/brands/dabur.png";
import Dot from "./assets/brands/Dot.png";
import Farmley from "./assets/brands/Farmley.png";
import godgrey_phillips from "./assets/brands/godgrey_phillips.png";
import gsk from "./assets/brands/gsk.png";
import ITC from "./assets/brands/ITC.png";
import kotak from "./assets/brands/kotak.png";
import mobikwik from "./assets/brands/mobikwik.png";
import mountain from "./assets/brands/mountain.png";
import myupchar from "./assets/brands/myupchar.png";
import nippon from "./assets/brands/nippon.png";
import onetouch from "./assets/brands/onetouch.png";
import remotehub from "./assets/brands/remotehub.png";
import videocon from "./assets/brands/videocon.png";

//about us image
import aboutImage from "./assets/about_us.png";


// Smooth scroll handler
const handleSmoothScroll = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });


  // Import all images from a directory
  
  const importImages = import.meta.glob("./assets/events/*.{jpg,png,jpeg,svg}", { eager: true });

  // Navbar scroll effect
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    const fullText = "Manpower Provider";
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, idx + 1));
      idx++;
      if (idx === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Handle form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false });
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        success: false,
        error: "Please fill in all fields.",
      });
      return;
    }
    // Use EmailJS when configured via environment variables (Vite)
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message,
      };
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setFormStatus({ loading: false, success: true, error: false });
        setFormData({ name: "", email: "", message: "" });
      } catch (err) {
        console.error('EmailJS send error:', err);
        setFormStatus({ loading: false, success: false, error: "Failed to send via EmailJS. Try again." });
      }
    } else {
      // Fallback (dev/demo) — no EmailJS configured
      try {
        await new Promise((res) => setTimeout(res, 1500));
        setFormStatus({ loading: false, success: true, error: false });
        setFormData({ name: "", email: "", message: "" });
      } catch {
        setFormStatus({ loading: false, success: false, error: "Failed to send. Try again." });
      }
    }
  };

  // Helpful flag to indicate EmailJS configuration state
  const isEmailJsConfigured = Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const servicesData = [
  { icon: HiOutlineUserGroup, title: "Specialized Staffing", desc: "Providing highly-vetted professionals for every sector." },
  { icon: HiOutlineBriefcase, title: "Corporate Solutions", desc: "From project-based support to long-term placements." },
  { icon: FaCalendarAlt, title: "Event & Operations Management", desc: "End-to-end event planning, coordination and on-site operations to deliver flawless experiences." },
  { icon: HiOutlineMail, title: "HR & Compliance", desc: "Ensuring your workforce meets all regulatory standards." },
  { icon: HiOutlineTrendingUp, title: "Sales & Marketing", desc: "Dynamic teams that execute campaigns with precision." },
  { icon: HiOutlineSupport, title: "Technical & IT Support", desc: "Specialists managing complex systems & support." },
  ];

  const brandsData = [
    { name: "B1R", logo: B1R },
    { name: "Dabur", logo: dabur },
    { name: "Godrej Phillips", logo: godgrey_phillips },
    { name: "GSK", logo: gsk },
    { name: "ITC", logo: ITC },
    { name: "Kotak", logo: kotak },
    { name: "Nippon", logo: nippon },
    { name: "Cloudenine", logo: Cloudenine },
    { name: "Dot", logo: Dot },
    { name: "Farmley", logo: Farmley },
    { name: "Mobikwik", logo: mobikwik },
    { name: "Mountain", logo: mountain },
    { name: "MyUpchar", logo: myupchar },
    { name: "OneTouch", logo: onetouch },
    { name: "RemoteHub", logo: remotehub },
    { name: "Videocon", logo: videocon },
   
  ];

  // Custom marquee refs and position-based auto-scroll (transform)
  const marqueeViewportRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeClipperRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const positionRef = useRef(0); // current px position translated on the track
  const speedRef = useRef(0.06); // px per ms
  const directionRef = useRef(1); // 1 = forward
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  // Auto-scroll RAF loop (updates transform on the track)
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;
    // ensure initial transform
    track.style.transform = `translateX(${ -positionRef.current }px)`;
    const step = (time) => {
      if (pausedRef.current) {
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      positionRef.current += speedRef.current * dt * directionRef.current;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (positionRef.current >= half) positionRef.current -= half;
        if (positionRef.current < 0) positionRef.current += half;
      }
      track.style.transform = `translateX(${ -positionRef.current }px)`;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const baseSpeed = 0.06; // px per ms
  const boostFactor = 6; // multiplier when holding

  const handleBoostStart = (dir) => {
    directionRef.current = dir;
    speedRef.current = baseSpeed * boostFactor;
  };

  // Wheel handler: translate vertical wheel to horizontal movement and pause auto-scroll briefly
  const wheelHandler = (e) => {
    // Only when pointer is over the marquee
    e.preventDefault();
    const track = marqueeTrackRef.current;
    if (!track) return;
    pausedRef.current = true;
    // Prefer deltaY for vertical scrolls, fallback to deltaX
    const delta = (e.deltaY || e.deltaX) * 1.2; // scale for comfortable speed
    const half = track.scrollWidth / 2;
    positionRef.current += delta;
    if (half > 0) {
      if (positionRef.current >= half) positionRef.current -= half;
      if (positionRef.current < 0) positionRef.current += half;
    }
    track.style.transform = `translateX(${ -positionRef.current }px)`;
    // resume after short pause
    clearTimeout(wheelHandler._resumeTimeout);
    wheelHandler._resumeTimeout = setTimeout(() => { pausedRef.current = false; }, 600);
  };

  // Pointer drag handlers for touch/mouse
  const onPointerDown = (e) => {
    // Ignore pointerdown when user interacts with buttons or other controls inside the clipper
    if (e.target && e.target.closest && e.target.closest('button')) return;
    const clipper = marqueeClipperRef.current;
    if (!clipper) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;
    pausedRef.current = true;
    try { clipper.setPointerCapture(e.pointerId); } catch (err) {}
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const track = marqueeTrackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartXRef.current;
    const half = track.scrollWidth / 2;
    positionRef.current = dragStartPosRef.current - dx; // dragging left moves content right
    if (half > 0) {
      if (positionRef.current >= half) positionRef.current -= half;
      if (positionRef.current < 0) positionRef.current += half;
    }
    track.style.transform = `translateX(${ -positionRef.current }px)`;
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pausedRef.current = false;
    try { marqueeClipperRef.current.releasePointerCapture(e.pointerId); } catch (err) {}
  };
  const handleBoostEnd = () => {
    directionRef.current = 1;
    speedRef.current = baseSpeed;
  };

  // Nudge to the next/previous card by exactly one card width using transform animation
  const handleNudge = (dir) => {
    const track = marqueeTrackRef.current;
    if (!track) return;
    pausedRef.current = true;
    const children = Array.from(track.children);
    if (children.length === 0) {
      pausedRef.current = false;
      return;
    }
    const first = children[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = first.offsetWidth + gap + (parseFloat(getComputedStyle(first).marginLeft) || 0) + (parseFloat(getComputedStyle(first).marginRight) || 0);
    const start = positionRef.current;
    const half = track.scrollWidth / 2;
    let target = start + cardWidth * dir;
    // normalize target into [0, half)
    if (half > 0) {
      if (target >= half) target -= half;
      if (target < 0) target += half;
    }
    const duration = 480;
    const t0 = performance.now();
    const animate = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 0.5 - Math.cos(p * Math.PI) / 2; // easeInOut
      // pick shortest delta (consider wrap)
      let delta = target - start;
      if (half > 0 && Math.abs(delta) > half / 2) {
        if (delta > 0) delta -= half;
        else delta += half;
      }
      positionRef.current = start + delta * ease;
      if (half > 0) {
        if (positionRef.current >= half) positionRef.current -= half;
        if (positionRef.current < 0) positionRef.current += half;
      }
      track.style.transform = `translateX(${ -positionRef.current }px)`;
      if (p < 1) requestAnimationFrame(animate);
      else pausedRef.current = false;
    };
    requestAnimationFrame(animate);
  };


  //importing images from events folder
  const images1 = Object.values(importImages).map((mod) => mod.default);

  return (
    <div className="font-['Inter',_sans-serif] text-[#c9d1d9] bg-[#0d1117] min-h-screen antialiased scroll-smooth">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0d1117]/90 shadow-lg backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex justify-between items-center">
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer"
          >
            <img 
              src={logo} 
              alt="Staff4Work Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain align-middle rounded-full shadow-lg" 
            />
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] via-[#00c6fb] to-[#005bea] tracking-tight drop-shadow-lg font-sans" style={{letterSpacing: '0.05em'}}>
              Staff4Work
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 text-sm lg:text-base xl:text-[1.15rem] font-bold tracking-wide">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative text-[#c9d1d9] hover:text-[#58a6ff] transition-colors group"
                  onClick={e => handleSmoothScroll(e, item.toLowerCase())}
                >
                  {item}
                  <span className="absolute left-0 bottom-0 h-0.5 bg-[#58a6ff] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#c9d1d9] text-xl sm:text-2xl focus:outline-none p-2"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0d1117]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-10 text-2xl font-bold md:hidden animate-fade-in">
          {["Home", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#c9d1d9] hover:text-[#58a6ff] transition-colors"
              onClick={e => { handleSmoothScroll(e, item.toLowerCase()); setMenuOpen(false); }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Video background */}
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#1e293b]/80 to-[#2563eb]/60 animate-gradientMove"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-[#58a6ff]/30"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-20 sm:py-24 lg:py-32">
          <div data-aos="fade-down" className="mb-6 sm:mb-8 flex justify-center">
            <Lottie 
              animationData={reactLogoAnim} 
              loop 
              style={{ 
                width: window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 180 : 220, 
                height: window.innerWidth < 640 ? 150 : window.innerWidth < 768 ? 180 : 220 
              }} 
            />
          </div>
          <h1 data-aos="fade-up" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold text-white leading-tight px-4">
            The Elite Standard in{" "}
            <span className="font-extrabold drop-shadow bg-gradient-to-r from-[#58a6ff] via-[#7f5af0] to-[#00c6fb] text-transparent bg-clip-text">
              {typedText}
              <span className="border-r-2 border-[#7f5af0] animate-blink ml-1"></span>
            </span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#c9d1d9] max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto px-4">
            High-impact professional staffing, delivered from day one. Your success is our defining moment.
          </p>
          <div data-aos="fade-up" data-aos-delay="600" className="mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold bg-[#58a6ff] text-[#0d1117] rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Request a Consultation</span>
              <FaArrowRight className="ml-2 sm:ml-3 z-10 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section> 

      {/* Partners / Trusted Brands */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0d1117] via-[#1e293b]/40 to-[#0d1117] text-[#c9d1d9] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #58a6ff 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #7f5af0 0%, transparent 50%)`,
          }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div data-aos="fade-up" className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#58a6ff] via-[#7f5af0] to-[#00c6fb] text-transparent bg-clip-text px-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#9aa8bb] max-w-xs sm:max-w-xl md:max-w-2xl mx-auto px-4">
              We partner with industry leaders and innovative companies across various sectors, delivering exceptional staffing solutions.
            </p>
          </div>

          {/* Brands Grid */}
          <div data-aos="fade-up" data-aos-delay="200" className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-center justify-items-center max-w-7xl mx-auto px-2">
            {brandsData.map((brand, index) => (
              <div
                key={brand.name}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
                className="group relative w-full h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 hover:border-[#58a6ff]/50 transition-all duration-300 flex items-center justify-center p-2 sm:p-3 md:p-4 hover:bg-white/15 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#58a6ff]/20"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 bg-[#0d1117]/95 backdrop-blur-sm text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-md sm:rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-10 border border-white/20 shadow-lg">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#0d1117] text-[#c9d1d9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-aos="fade-up" className="text-3xl sm:text-4xl md:text-5xl font-bold px-4">Our Expertise</h2>
          <p data-aos="fade-up" data-aos-delay="200" className="mt-3 sm:mt-4 text-base sm:text-lg text-[#c9d1d9] max-w-xs sm:max-w-lg md:max-w-xl mx-auto px-4">
            Comprehensive, proven, and tailored to your specific needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-12 sm:mt-14 md:mt-16">
            {servicesData.map((s, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
                className="bg-[#161b22] p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-[#58a6ff]/20"
              >
                <s.icon className="text-4xl sm:text-5xl md:text-6xl text-[#58a6ff] mx-auto mb-4 sm:mb-5 md:mb-6" />
                <h3 className="font-bold text-xl sm:text-2xl text-white mb-2 sm:mb-3">{s.title}</h3>
                <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Carousel Style */}
      
      {/* Events & Success Stories - Infinite Marquee */}
          
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#0d1117] via-[#1e293b] to-[#58a6ff]/10 text-[#c9d1d9] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[#58a6ff] via-[#7f5af0] to-[#00c6fb] text-transparent bg-clip-text px-4">
            Our Events & Success Stories
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#9aa8bb] max-w-2xl mx-auto px-4">
            Celebrating milestones, team achievements, and successful partnerships
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-[#1e293b] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-[#1e293b] to-transparent z-10 pointer-events-none"></div>

          <div className="relative">
            {/* Controls are placed inside the inner marquee container to avoid duplication */}
            {/* Custom marquee viewport/track */}
            <div
              ref={marqueeClipperRef}
              className="relative marquee-clipper"
              onWheel={wheelHandler}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{ touchAction: 'none' }}
            >
              <button
                aria-label="Scroll left"
                onMouseDown={() => handleBoostStart(-1)}
                onMouseUp={handleBoostEnd}
                onMouseLeave={handleBoostEnd}
                onClick={() => handleNudge(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-[#0d1117]/70 text-white p-2 rounded-full hover:bg-[#58a6ff]/80 transition"
              >
                <FaChevronLeft />
              </button>
              <button
                aria-label="Scroll right"
                onMouseDown={() => handleBoostStart(1)}
                onMouseUp={handleBoostEnd}
                onMouseLeave={handleBoostEnd}
                onClick={() => handleNudge(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-[#0d1117]/70 text-white p-2 rounded-full hover:bg-[#58a6ff]/80 transition"
              >
                <FaChevronRight />
              </button>

              <div id="marqueeViewport" ref={marqueeViewportRef} className="no-scrollbar marquee-viewport" style={{ scrollBehavior: 'auto', overflow: 'hidden' }}>
                <div ref={marqueeTrackRef} className="flex items-stretch gap-3 py-4">
                  {/* first set */}
                  {images1.map((image, idx) => (
                    <div key={`a-${idx}`} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[280px] md:h-[300px] mx-3 sm:mx-4">
                      <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#58a6ff]/30 hover:border-[#58a6ff] transition-all duration-300 hover:-translate-y-2 hover:shadow-[#58a6ff]/50 group">
                        <img src={image} alt={`Event ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  ))}
                  {/* duplicate set for seamless looping */}
                  {images1.map((image, idx) => (
                    <div key={`b-${idx}`} className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px] h-[250px] sm:h-[280px] md:h-[300px] mx-3 sm:mx-4">
                      <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#58a6ff]/30 hover:border-[#58a6ff] transition-all duration-300 hover:-translate-y-2 hover:shadow-[#58a6ff]/50 group">
                        <img src={image} alt={`Event dup ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#161b22] text-[#c9d1d9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div data-aos="fade-right" className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">About Us</h2>
            <p className="text-base sm:text-lg text-[#c9d1d9] leading-relaxed">
             A strong brand helps your business shine in a crowded market — it's what makes people recognize, remember, and trust you. When your brand identity is clear and consistent, it not only makes your products or services stand out but also builds the kind of credibility that keeps customers coming back and recommending you to others.
            </p>
            <p className="text-base sm:text-lg text-[#c9d1d9] leading-relaxed">
               With our expert marketing strategies, we'll help you grow your business, reach the right audience, and establish a lasting presence in your industry — with a personalized approach designed for real results.
            </p>
          </div>
          <div data-aos="fade-left" className="order-1 lg:order-2">
            <img
              src={aboutImage}
              alt="Professional team collaboration"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full object-cover border-2 sm:border-4 border-[#58a6ff]/20"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#0d1117] text-[#c9d1d9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div data-aos="fade-right" className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Get in Touch</h2>
            <p className="text-base sm:text-lg text-[#c9d1d9]">Ready to elevate your team? Fill out the form or reach us directly.</p>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg">
              <div className="flex items-center gap-3 sm:gap-4">
                <HiOutlineMail className="text-xl sm:text-2xl text-[#58a6ff] flex-shrink-0" />
                <span className="break-all">harsh@staff4work.com</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <HiOutlinePhone className="text-xl sm:text-2xl text-[#58a6ff] flex-shrink-0" />
                <span>+91 8439422231</span>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <HiOutlineLocationMarker className="text-xl sm:text-2xl text-[#58a6ff] flex-shrink-0 mt-1" />
                <span>H No-99 Mohalla Shahwada Budhana Muzaffarnagar 251309</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            data-aos="fade-left"
            className="bg-[#161b22] p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-xl space-y-4 sm:space-y-5 md:space-y-6 border border-[#58a6ff]/20 order-1 lg:order-2"
          >
            {!isEmailJsConfigured && (
              <div className="text-yellow-300 text-sm bg-[#271f2f] p-2 rounded">
                 EmailJS not configured. To enable real email delivery, copy <code>.env.example</code> to <code>.env</code> and set your EmailJS keys, then restart the dev server. See https://www.emailjs.com/docs/ 
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-[#c9d1d9]/20 bg-[#0d1117] text-[#c9d1d9] placeholder-[#c9d1d9] focus:ring-2 focus:ring-[#58a6ff] outline-none transition-colors duration-300 text-sm sm:text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-[#c9d1d9]/20 bg-[#0d1117] text-[#c9d1d9] placeholder-[#c9d1d9] focus:ring-2 focus:ring-[#58a6ff] outline-none transition-colors duration-300 text-sm sm:text-base"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-[#c9d1d9]/20 bg-[#0d1117] text-[#c9d1d9] placeholder-[#c9d1d9] focus:ring-2 focus:ring-[#58a6ff] resize-none outline-none transition-colors duration-300 text-sm sm:text-base"
            ></textarea>
            {formStatus.success && (
              <p className="text-green-400 font-bold text-center text-sm sm:text-base">Message sent successfully! 🎉</p>
            )}
            {formStatus.error && (
             // <p className="text-red-400 font-bold text-center text-sm sm:text-base">{formStatus.error}</p>
             <p className="text-red-400 font-bold text-center text-sm sm:text-base">   Work in progress</p>
            )}
            <button
              type="submit"
              disabled={formStatus.loading}
              className="w-full py-3 sm:py-4 bg-[#58a6ff] text-[#0d1117] font-bold rounded-full hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {formStatus.loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1117] text-[#c9d1d9] py-8 sm:py-10 md:py-12 border-t border-[#c9d1d9]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:justify-between md:items-center">
          <div className="mb-6 sm:mb-8 md:mb-0">
            <img src={logo} alt="Staff4Work Logo" className="mx-auto mb-3 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain rounded-full shadow-lg bg-white" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Staff4Work</h2>
            <p className="text-xs sm:text-sm mt-1">Manpower Solutions for Your Success</p>
          </div>
          <div className="flex justify-center gap-4 sm:gap-6 text-xl sm:text-2xl">
            <a href="#" className="hover:text-[#58a6ff] transition-colors p-2"><FaTwitter /></a>
            <a href="#" className="hover:text-[#58a6ff] transition-colors p-2"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm border-t border-[#c9d1d9]/10 pt-4 sm:pt-6">
          <p>© {new Date().getFullYear()} Staff4Work. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}