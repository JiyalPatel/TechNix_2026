import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Terminal,
    Cpu,
    Zap,
    Code,
    Target,
    MapPin,
    Calendar,
    Clock,
    ChevronRight,
    Menu,
    X,
    Gamepad2,
    Trophy,
    Users,
    ExternalLink,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    ArrowRight,
    Sword,
    Phone,
} from "lucide-react";

const FEST_NAME = "TECHNIX";

/* --- CUSTOM STYLES & ANIMATIONS --- */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

  :root {
    --neon-cyan: #00f6ff;
    --neon-pink: #ff006e;
    --neon-yellow: #ffbe0b;
    --bg-dark: #050b14;
    --bg-panel: rgba(10, 14, 39, 0.7);
  }

  body {
    background-color: var(--bg-dark);
    font-family: 'Rajdhani', sans-serif;
    color: white;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, .font-orbitron {
    font-family: 'Orbitron', sans-serif;
  }

  /* Glitch Effect */
  .glitch-text {
    position: relative;
    color: white;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-dark);
  }

  .glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }

  .glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(32px, 9999px, 18px, 0); }
    20% { clip: rect(6px, 9999px, 86px, 0); }
    40% { clip: rect(62px, 9999px, 12px, 0); }
    60% { clip: rect(96px, 9999px, 48px, 0); }
    80% { clip: rect(8px, 9999px, 7px, 0); }
    100% { clip: rect(27px, 9999px, 64px, 0); }
  }

  @keyframes glitch-anim2 {
    0% { clip: rect(65px, 9999px, 96px, 0); }
    20% { clip: rect(3px, 9999px, 32px, 0); }
    40% { clip: rect(98px, 9999px, 4px, 0); }
    60% { clip: rect(41px, 9999px, 75px, 0); }
    80% { clip: rect(13px, 9999px, 55px, 0); }
    100% { clip: rect(89px, 9999px, 2px, 0); }
  }

  /* Neon Borders & Glows */
  .neon-border {
    position: relative;
    overflow: hidden;
  }
  
  .neon-border::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(45deg, var(--neon-cyan), transparent, var(--neon-pink));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .hover-glow:hover {
    box-shadow: 0 0 20px rgba(0, 246, 255, 0.4);
    transform: translateY(-5px);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #02040a;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--neon-cyan);
  }

  /* Scanline Overlay */
  .scanlines {
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0),
      rgba(255,255,255,0) 50%,
      rgba(0,0,0,0.1) 50%,
      rgba(0,0,0,0.1)
    );
    background-size: 100% 4px;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.15;
  }

  /* Utilities */
  .text-neon-cyan { color: var(--neon-cyan); }
  .text-neon-pink { color: var(--neon-pink); }
  .text-neon-yellow { color: var(--neon-yellow); }
  .bg-neon-cyan { background-color: var(--neon-cyan); }
  
  .clip-path-slant {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%);
  }
  
  .glass-panel {
    background: rgba(10, 14, 39, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

/* --- ANIMATED BACKGROUND COMPONENT --- */
const CyberBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let w, h;
        let particles = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.z = Math.random() * 2 + 0.5; // Depth
                this.size = Math.random() * 1.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? "#00f6ff" : "#ff006e";
            }

            update() {
                this.x += this.speedX * this.z;
                this.y += this.speedY * this.z;

                if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        // Grid Animation
        let offset = 0;
        const drawGrid = () => {
            ctx.strokeStyle = "rgba(0, 246, 255, 0.1)";
            ctx.lineWidth = 1;

            // Perspective Grid at bottom
            const horizon = h * 0.7;
            const gridSpacing = 40;

            // Vertical lines fan out
            for (let i = -w; i < w * 2; i += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(i + (w / 2 - i) * 0.5, horizon);
                ctx.lineTo(i - (w / 2 - i) * 2, h);
                ctx.stroke();
            }

            // Horizontal lines move down
            offset = (offset + 0.5) % gridSpacing;
            for (
                let y = horizon;
                y < h;
                y += gridSpacing * (1 + (y - horizon) / 200)
            ) {
                let drawY = y + offset * ((y - horizon) / 200 + 0.1);
                if (drawY > h) drawY -= h - horizon;

                ctx.beginPath();
                ctx.moveTo(0, drawY);
                ctx.lineTo(w, drawY);
                ctx.stroke();
            }
        };

        // Initialize particles
        for (let i = 0; i < 100; i++) particles.push(new Particle());

        const animate = () => {
            ctx.fillStyle = "#050b14";
            ctx.fillRect(0, 0, w, h);

            drawGrid();

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            // Connections
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist / 1000})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

/* --- COUNTDOWN COMPONENT --- */
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("February 06, 2026 10:30:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    ),
                    minutes: Math.floor(
                        (distance % (1000 * 60 * 60)) / (1000 * 60),
                    ),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label, color }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4 p-4 glass-panel rounded-lg neon-border min-w-[80px] md:min-w-[100px] backdrop-blur-md">
            <span
                className={`text-2xl md:text-4xl font-orbitron font-bold ${color}`}
            >
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mt-1">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex flex-wrap justify-center mt-12 animate-fade-in-up">
            <TimeUnit
                value={timeLeft.days}
                label="Days"
                color="text-neon-cyan"
            />
            <TimeUnit
                value={timeLeft.hours}
                label="Hours"
                color="text-neon-pink"
            />
            <TimeUnit
                value={timeLeft.minutes}
                label="Mins"
                color="text-neon-yellow"
            />
            <TimeUnit
                value={timeLeft.seconds}
                label="Secs"
                color="text-white"
            />
        </div>
    );
};

/* --- GAME CARD COMPONENT --- */
const GameCard = ({ game, onRegister }) => {
    return (
        <div className="group relative glass-panel rounded-xl overflow-hidden hover-glow transition-all duration-300 transform hover:-translate-y-2">
            {/* Image/Icon Header */}
            <div
                className={`h-40 ${game.bgGradient} flex items-center justify-center relative overflow-hidden`}
            >
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500 aspect-video">
                    <img src={`${game.img}`} alt="" />
                </div>
                {/* Overlay shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <div className="p-6 relative z-10">
                <h3 className="text-2xl font-orbitron font-bold mb-2 group-hover:text-neon-cyan transition-colors">
                    {game.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2 h-10">
                    {game.description}
                </p>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-2 text-neon-pink" />
                        <span>{game.teamSize}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        <Trophy className="w-4 h-4 mr-2 text-neon-yellow" />
                        <span>{game.prize}</span>
                    </div>
                </div>

                <button
                    onClick={() => onRegister(game.id)}
                    className="w-full py-3 bg-transparent border border-neon-cyan text-neon-cyan font-bold uppercase tracking-wider hover:bg-neon-cyan hover:text-black transition-all duration-300 clip-path-slant flex items-center justify-center gap-2"
                >
                    Register Now <ChevronRight size={16} />
                </button>
            </div>

            {/* Border Animation */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-cyan/50 rounded-xl transition-colors pointer-events-none"></div>
        </div>
    );
};

/* --- MAIN APP COMPONENT --- */
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
            setActiveTab(id);
        }
    };

    const navLinks = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "games", label: "Games" },
        { id: "timeline", label: "Timeline" },
        { id: "contact", label: "Contact" },
    ];

    const games = [
        {
            id: "adzap",
            img: "/AdZapp.png",
            title: "AdZap",
            description:
                "Pitch your wildest ideas! Creativity meets marketing in this high-energy branding battle.",
            teamSize: "Team of 2",
            prize: "₹2,500 Prize Pool",
            icon: <Zap size={64} className="text-white" />,
            bgGradient: "bg-gradient-to-br from-purple-900 to-blue-900",
        },
        {
            id: "coding",
            title: "Collaborative Coding",
            img: "/ColaborativeCoding.png",
            description:
                "Two minds, one code. Solve complex algorithms with your partner under extreme time pressure.",
            teamSize: "Team of 2",
            prize: "₹2,500 Prize Pool",
            icon: <Code size={64} className="text-white" />,
            bgGradient: "bg-gradient-to-br from-green-900 to-teal-900",
        },
        {
            id: "quiz",
            img: "/Quiz.png",
            title: "Tech Quiz",
            description:
                "Test your tech IQ. From silicon chips to neural networks, do you know it all?",
            teamSize: "Solo",
            prize: "₹2,500 Prize Pool",
            icon: <Cpu size={64} className="text-white" />,
            bgGradient: "bg-gradient-to-br from-red-900 to-orange-900",
        },
        {
            id: "hunt",
            img: "/TreasureHunt.png",
            title: "Treasure Hunt",
            description:
                "Decide. Discover. Dominate. A campus-wide hunt solving crypto-style clues.",
            teamSize: "Team of 4",
            prize: "₹2,500 Prize Pool",
            icon: <MapPin size={64} className="text-white" />,
            bgGradient: "bg-gradient-to-br from-blue-900 to-indigo-900",
        },
    ];

    const timelineEvents = [
        {
            time: "11:00 AM",
            title: "AD Zapp",
            desc: "Main Auditorium (A - Block)",
            icon: <Target />,
        },
        {
            time: "12:00 PM",
            title: "Tech Quiz",
            desc: "B-201",
            icon: <Code />,
        },
        {
            time: "01:00 PM",
            title: "Colaborative Coding",
            desc: "B-203",
            icon: <Zap />,
        },
        {
            time: "02:00 PM",
            title: "Treasure Hunt",
            desc: "A Block",
            icon: <Cpu />,
        },
        {
            time: "04:00 PM",
            title: "Prize Distribution Ceremony",
            desc: "Main Auditorium (A - Block)",
            icon: <MapPin />,
        },
    ];

    const handleRegister = (gameId) => {
        // Placeholder for Google Form logic
        window.open("https://docs.google.com/forms", "_blank");
    };

    function TimelineContent() {
        const ref = React.useRef(null);
        const isInView = useInView(ref, { once: false, margin: "-100px" });

        return (
            <div className="relative max-w-4xl mx-auto" ref={ref}>
                {/* Animated Center Line */}
                <motion.div
                    className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        transformOrigin: "top",
                        transform: "translateX(-50%)",
                    }}
                />

                <div className="space-y-12">
                    {timelineEvents.map((event, idx) => (
                        <div
                            key={idx}
                            className={`relative flex items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                        >
                            <motion.div
                                className="flex-1 ml-12 md:ml-0"
                                initial={{
                                    opacity: 0,
                                    x: idx % 2 === 0 ? 100 : -100,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{
                                    delay: idx * 0.15,
                                    duration: 0.6,
                                    ease: "easeOut",
                                }}
                            >
                                <div
                                    className={`p-6 glass-panel rounded-xl border border-white/5 hover:border-neon-cyan/50 transition-colors ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                                >
                                    <h3 className="text-xl font-bold font-orbitron text-white mb-1">
                                        {event.title}
                                    </h3>
                                    <div
                                        className={`flex items-center gap-2 text-neon-pink mb-2 ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
                                    >
                                        <Clock size={14} />
                                        <span className="font-mono text-sm">
                                            {event.time}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm flex items-center gap-2 justify-start md:justify-[inherit]">
                                        {idx % 2 !== 0 && (
                                            <span className="hidden md:inline">
                                                {event.desc}
                                            </span>
                                        )}
                                        <MapPin
                                            size={14}
                                            className="text-gray-500"
                                        />
                                        <span className="md:hidden">
                                            {event.desc}
                                        </span>
                                        {idx % 2 === 0 && (
                                            <span className="hidden md:inline">
                                                {event.desc}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black border-2 border-neon-cyan rounded-full shadow-[0_0_10px_#00f6ff] z-10"
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{
                                    delay: idx * 0.15 + 0.3,
                                    duration: 0.5,
                                    ease: "backOut",
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    boxShadow: "0 0 20px #00f6ff",
                                }}
                            />

                            <div className="hidden md:block flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <style>{styles}</style>
            <div className="scanlines"></div>
            <CyberBackground />

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => scrollToSection("home")}
                        >
                            <Terminal className="text-neon-cyan w-8 h-8" />
                            <div className="flex flex-col">
                                <span className="font-orbitron font-bold text-xl tracking-wider text-white">
                                    TECH
                                    <span className="text-neon-pink">NIX</span>
                                </span>
                                <span className="text-[10px] tracking-[0.2em] text-gray-400">
                                    2026 EDITION
                                </span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`font-orbitron text-sm tracking-wide transition-all duration-300 hover:text-neon-cyan relative group ${activeTab === link.id ? "text-neon-cyan" : "text-gray-300"}`}
                                >
                                    {link.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] bg-neon-cyan transition-all duration-300 ${activeTab === link.id ? "w-full" : "w-0 group-hover:w-full"}`}
                                    ></span>
                                </button>
                            ))}
                            <button
                                onClick={() => scrollToSection("games")}
                                className="px-6 py-2 bg-neon-cyan text-black font-bold font-orbitron clip-path-slant hover:bg-white transition-colors"
                            >
                                REGISTER
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute top-20 left-0 w-full glass-panel border-b border-white/10 transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96" : "max-h-0"}`}
                >
                    <div className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="text-left py-2 px-4 hover:bg-white/5 text-gray-300 hover:text-neon-cyan font-orbitron transition-colors border-l-2 border-transparent hover:border-neon-cyan"
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section
                id="home"
                className="relative min-h-screen flex items-center pt-20 overflow-hidden"
            >
                <div className="container mx-auto px-4 text-center z-10">
                    <div className="inline-block px-4 py-1 border border-neon-cyan/30 rounded-full bg-neon-cyan/10 mb-6 backdrop-blur-sm animate-pulse">
                        <span className="text-neon-cyan text-sm font-bold tracking-widest uppercase">
                            Vishwakarma Government Engineering College Presents
                        </span>
                    </div>

                    <h1
                        className="text-5xl md:text-8xl font-black font-orbitron mb-4 tracking-tight glitch-text"
                        data-text={`${FEST_NAME} 2026`}
                    >
                        {FEST_NAME}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink">
                            2026
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light tracking-wide relative">
                        WHERE{" "}
                        <span className="text-neon-yellow font-bold">
                            INNOVATION
                        </span>{" "}
                        MEETS{" "}
                        <span className="text-neon-cyan font-bold">
                            COMPETITION
                        </span>{" "}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-400 mb-10">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-neon-pink" size={18} />
                            <span>Frebruary 6, 2026</span>
                        </div>
                        <div className="w-px h-5 bg-gray-700 hidden md:block"></div>
                        <div className="flex items-center gap-2">
                            <MapPin className="text-neon-cyan" size={18} />
                            <span>VGEC Campus</span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
                        <button
                            onClick={() => scrollToSection("games")}
                            className="px-8 py-4 bg-neon-cyan text-black font-orbitron font-bold text-lg clip-path-slant hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,246,255,0.4)]"
                        >
                            REGISTER NOW
                        </button>
                        <button
                            onClick={() => scrollToSection("about")}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-orbitron font-bold text-lg clip-path-slant hover:bg-white/10 hover:border-neon-pink hover:text-neon-pink transition-all duration-300"
                        >
                            EXPLORE EVENT
                        </button>
                    </div>

                    <CountdownTimer />
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
            </section>

            {/* --- STATS STRIP --- */}
            <div className="border-y border-white/10 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            {
                                label: "Epic Games",
                                value: "4",
                                color: "text-neon-cyan",
                            },
                            {
                                label: "Prize Pool",
                                value: "₹10k",
                                color: "text-neon-pink",
                            },
                            {
                                label: "Participants",
                                value: "250+",
                                color: "text-neon-yellow",
                            },
                            {
                                label: "Day Fest",
                                value: "1",
                                color: "text-white",
                            },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center group cursor-default"
                            >
                                <span
                                    className={`text-4xl md:text-5xl font-orbitron font-bold ${stat.color} group-hover:scale-110 transition-transform`}
                                >
                                    {stat.value}
                                </span>
                                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mt-2">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="relative rounded-lg overflow-hidden border border-white/20 group">
                                <div className="absolute inset-0 bg-neon-cyan/20 group-hover:bg-transparent transition-colors z-10"></div>
                                {/* Abstract tech visualization using CSS since we don't have images */}
                                <div className="h-64 md:h-80 bg-slate-900 w-full relative overflow-hidden aspect-video flex justify-center items-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,246,255,0.1),transparent_70%)]"></div>

                                    <img
                                        src="/TechnixMain.png"
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />

                                    {/* Animated bars */}
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 h-full items-end p-8">
                                        {[40, 70, 30, 80, 50, 90, 60].map(
                                            (h, i) => (
                                                <div
                                                    key={i}
                                                    style={{ height: `${h}%` }}
                                                    className="w-4 bg-neon-cyan/50 animate-pulse delay-[${i*100}ms]"
                                                ></div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-orbitron font-bold">
                                <span className="text-neon-pink">
                                    WHERE LIMITS END,
                                </span>{" "}
                                <span className="animate-flicker text-white">
                                    IDEAS BEGIN.
                                </span>
                            </h2>
                            <div className="w-20 h-1 bg-neon-yellow"></div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {FEST_NAME} 2026 is not just a tech fest; it’s a
                                platform to explore ideas beyond the syllabus.
                                Join the brightest minds from our campus for
                                days filled with creativity, collaboration, and
                                skill-based challenges designed to test how you
                                think and work as a team.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Whether you’re a marketer, a coder, or a
                                problem-solver, there’s a place for you in the
                                verse. Pitch ideas, code together, crack
                                interview-style quizzes, and solve clues to
                                unlock the final prize—while pushing your limits
                                and learning along the way.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neon-cyan/10 rounded text-neon-cyan">
                                        <Sword size={24} />
                                    </div>
                                    <span className="font-bold">
                                        Strategic Face-offs
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-neon-pink/10 rounded text-neon-pink">
                                        <Cpu size={20} />
                                    </div>
                                    <span className="font-bold">
                                        Collaborative Logic
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GAMES SECTION --- */}
            <section id="games" className="py-20 relative bg-black/40">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
                            CHOOSE YOUR{" "}
                            <span className="text-neon-cyan">ARENA</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Four battlegrounds. Limitless possibilities. Select
                            your game and prove your worth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {games.map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                onRegister={handleRegister}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TIMELINE SECTION --- */}
            {/* --- TIMELINE SECTION --- */}
            <section id="timeline" className="py-20 relative">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-16"
                    >
                        EVENT <span className="text-neon-yellow">TIMELINE</span>
                    </motion.h2>

                    <TimelineContent />
                </div>
            </section>
            {/* --- CTA / REGISTER SECTION --- */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 to-neon-cyan/10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="glass-panel max-w-4xl mx-auto p-12 rounded-2xl border border-white/10 neon-border">
                        <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-6">
                            READY TO{" "}
                            <span className="text-neon-cyan">DOMINATE?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Spots are filling up faster than light speed. Secure
                            your place in the verse now.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => handleRegister("general")}
                                className="px-8 py-4 bg-neon-cyan text-black font-orbitron font-bold text-lg clip-path-slant hover:scale-105 transition-transform"
                            >
                                REGISTER NOW
                            </button>
                            <button className="px-8 py-4 bg-black border border-neon-pink text-neon-pink font-orbitron font-bold text-lg clip-path-slant hover:bg-neon-pink hover:text-black transition-all">
                                DOWNLOAD BROCHURE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer
                id="contact"
                className="border-t border-white/10 bg-black pt-16 pb-8"
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Terminal className="text-neon-cyan" />
                                <span className="font-orbitron font-bold text-2xl">
                                    {FEST_NAME}
                                </span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-sm">
                                The ultimate convergence of technology,
                                innovation, and competition. Hosted by
                                Vishwakarma Government Engineering college.
                            </p>
                            {/* <div className="flex gap-4">
                                {[Instagram, Twitter, Linkedin, Mail].map(
                                    (Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-colors"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    ),
                                )}
                            </div> */}
                        </div>

                        <div>
                            <h4 className="font-orbitron font-bold text-lg mb-6 text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-3 text-gray-400">
                                {["home", "about", "games", "timeline"].map(
                                    (item) => (
                                        <li key={item}>
                                            <a
                                                href={`#${item}`}
                                                className="hover:text-neon-cyan transition-colors"
                                            >
                                                {item.toUpperCase()}
                                            </a>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-orbitron font-bold text-lg mb-6 text-white">
                                Contact
                            </h4>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-neon-pink mt-1"
                                    />
                                    <span>
                                        Vishwakarma Government Engineering
                                        College,
                                        <br />
                                        Main Campus
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone
                                        size={18}
                                        className="text-neon-pink mt-1"
                                    />
                                    <span>
                                        <span>
                                            <a href="tel:8799628088" className="border-b border-b-transparent hover:border-b-pink-500 ">
                                                8799628088
                                            </a>
                                        </span>
                                        <br />
                                        <span>
                                            <a href="tel:9173402267" className="border-b border-b-transparent hover:border-b-pink-500 ">
                                                9173402267
                                            </a>
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail
                                        size={18}
                                        className="text-neon-pink"
                                    />
                                    <span>
                                        {" "}
                                        <a
                                            className="hover:border-b hover:border-b-pink-500"
                                            href="mailto:vyasvraj47@gmail.com"
                                        >
                                            vyasvraj47@gmail.com
                                        </a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>&copy; 2026 {FEST_NAME}. All rights reserved.</p>
                        <p>Designed With ❤️ From Fest Crew</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
