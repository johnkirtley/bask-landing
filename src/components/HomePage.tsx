import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Shield,
  Clock,
  Activity,
  ChevronDown,
  Menu,
  X,
  Download,
  Smartphone,
  Bell,
  BarChart3,
  MapPin,
  Zap,
  Mail,
  ArrowRight,
  Twitter,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#features', label: 'Features', id: 'features' },
  { href: '#how-it-works', label: 'How It Works', id: 'how-it-works' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  { href: '#blog', label: 'Blog', id: 'blog' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', ...navLinks.map((link) => link.id)];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-background/80 fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img src="/images/logo.png" alt="Bask" className="h-8 w-8" />
          <span className="text-foreground font-heading text-2xl font-bold">
            Bask
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-muted-foreground hover:text-foreground relative transition-colors ${
                activeSection === link.id ? 'text-foreground font-medium' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="bg-primary absolute -bottom-1 left-0 right-0 h-0.5"
                />
              )}
            </a>
          ))}
          <a
            href="#download"
            className="bg-primary hover:bg-accent text-primary-foreground flex items-center gap-2 rounded-full px-6 py-2.5 font-medium transition-all hover:shadow-lg"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border-border md:hidden border-t"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setIsMenuOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-accent mt-2 flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      {/* Phone frame */}
      <div className="rounded-[3rem] border-[8px] border-foreground bg-card p-2 shadow-2xl">
        {/* Notch */}
        <div className="bg-foreground absolute top-[12px] left-1/2 z-20 h-[25px] w-[120px] -translate-x-1/2 rounded-full" />

        {/* Screen content */}
        <div className="from-primary/20 to-card relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b pt-10">
          {/* Status bar placeholder */}
          <div className="text-foreground flex justify-between px-6 py-2 text-xs">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>●●●</span>
            </div>
          </div>

          {/* App UI mockup */}
          <div className="space-y-4 px-6 py-4 pb-12">
            {/* UV Index card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white/80 p-4 text-center shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Current UV Index</p>
              <p className="text-primary text-4xl font-bold">6.2</p>
              <p className="text-accent font-medium text-xs">Moderate</p>
            </motion.div>

            {/* Vitamin D progress */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-white/80 p-4 shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Today's Vitamin D</p>
              <div className="bg-muted mt-2 h-2 rounded-full">
                <div className="from-primary to-accent h-2 w-[72%] rounded-full bg-gradient-to-r" />
              </div>
              <p className="text-foreground mt-1 text-xs font-medium">
                72% of daily goal
              </p>
            </motion.div>

            {/* Timer suggestion */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-secondary/30 rounded-2xl p-4 shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Recommended</p>
              <p className="text-foreground text-sm font-bold">
                18 min sun session
              </p>
              <p className="text-muted-foreground text-xs">
                Best window: 10:30 - 11:00 AM
              </p>
            </motion.div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="bg-foreground absolute bottom-[14px] left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-24"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-gradient-radial" />
        <div className="from-primary/10 absolute top-1/4 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-gradient-radial blur-3xl" />
        <div className="from-secondary/20 absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-radial blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12 lg:px-24">
        {/* Left column - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-primary font-heading inline-block text-sm font-semibold uppercase tracking-wider">
            Your personal sun companion
          </div>

          <h1 className="font-heading text-foreground text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Track your sunshine.{' '}
            <span className="text-primary">Optimize your glow.</span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Bask helps you get the right amount of sun exposure for optimal
            vitamin D, without the burn. Personalized UV tracking for healthier
            days outdoors.
          </p>

          {/* App Store Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-foreground text-background inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-medium shadow-lg transition-shadow hover:shadow-xl"
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-80">Download on the</div>
              <div className="text-lg font-semibold">App Store</div>
            </div>
          </motion.a>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {[
              { icon: Shield, text: 'UV Protection' },
              { icon: Activity, text: 'Health Insights' },
              { icon: Clock, text: 'Smart Timing' },
              { icon: Sun, text: 'Vitamin D Tracking' },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="glass text-foreground flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              >
                <badge.icon className="text-primary h-4 w-4" />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column - Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <PhoneMockup />

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute top-8 -right-4 rounded-2xl p-4 shadow-lg md:-right-8"
          >
            <div className="flex items-center gap-2">
              <Sun className="text-primary h-8 w-8" />
              <div>
                <p className="text-foreground text-sm font-bold">UV Index: 6.2</p>
                <p className="text-muted-foreground text-xs">Moderate</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="glass absolute bottom-12 -left-4 rounded-2xl p-4 shadow-lg md:-left-8"
          >
            <div className="flex items-center gap-2">
              <Activity className="text-secondary h-8 w-8" />
              <div>
                <p className="text-foreground text-sm font-bold">Vitamin D: 72%</p>
                <p className="text-muted-foreground text-xs">On track today</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-primary h-8 w-8" />
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Sun,
      title: 'Real-Time UV Tracking',
      description:
        "Monitor UV index at your exact location throughout the day. Know when it's safe to be outside and when to seek shade.",
      color: 'bg-primary/15',
      iconColor: 'text-accent',
    },
    {
      icon: Activity,
      title: 'Vitamin D Insights',
      description:
        'Track your estimated vitamin D synthesis based on your skin type, location, and actual sun exposure time.',
      color: 'bg-secondary/20',
      iconColor: 'text-secondary',
    },
    {
      icon: Clock,
      title: 'Smart Exposure Timer',
      description:
        'Get personalized safe-sun windows based on your skin profile. Bask tells you exactly how long to stay out.',
      color: 'bg-primary/15',
      iconColor: 'text-accent',
    },
    {
      icon: Bell,
      title: 'Sunburn Alerts',
      description:
        "Receive timely notifications before you've had too much UV. Never get caught off guard by the sun again.",
      color: 'bg-destructive/10',
      iconColor: 'text-destructive',
    },
    {
      icon: BarChart3,
      title: 'Weekly Sun Reports',
      description:
        'Review your weekly sun exposure patterns and vitamin D trends. Build consistent, healthy outdoor habits.',
      color: 'bg-secondary/20',
      iconColor: 'text-secondary',
    },
    {
      icon: MapPin,
      title: 'Location-Aware',
      description:
        'Automatically adjusts recommendations based on your geographic location, altitude, and local weather conditions.',
      color: 'bg-primary/15',
      iconColor: 'text-accent',
    },
  ];

  return (
    <section id="features" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold uppercase tracking-wider">
            Why Bask?
          </div>
          <h2 className="font-heading text-foreground mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
            Everything you need to optimize your sun exposure
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 transition-shadow hover:shadow-lg"
            >
              <div className={`${feature.color} mb-4 inline-flex rounded-xl p-3`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Set Your Profile',
      description:
        'Enter your skin type, location, and health goals. Bask personalizes everything to your unique needs.',
      icon: Smartphone,
    },
    {
      step: '02',
      title: 'Get Your Sun Plan',
      description:
        'Receive daily recommendations for optimal sun exposure windows based on real-time UV data and your profile.',
      icon: Sun,
    },
    {
      step: '03',
      title: 'Track & Improve',
      description:
        'Log your time outdoors, monitor vitamin D progress, and build lasting habits with weekly insights.',
      icon: BarChart3,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold uppercase tracking-wider">
            Simple to start
          </div>
          <h2 className="font-heading text-foreground mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
            How Bask Works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative text-center"
            >
              {/* Connecting line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="absolute top-16 left-1/2 hidden h-0.5 w-full border-t-2 border-dashed border-primary/30 md:block" />
              )}

              {/* Step number */}
              <div className="text-primary relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 font-heading text-2xl font-bold">
                {step.step}
              </div>

              {/* Icon */}
              <div className="bg-card mb-4 inline-flex rounded-2xl p-4 shadow-sm">
                <step.icon className="text-primary h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-foreground mb-3 text-xl font-bold">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = [
    {
      id: 'faq-1',
      question: 'How does Bask track my vitamin D levels?',
      answer:
        'Bask estimates vitamin D synthesis based on scientifically validated models that factor in your skin type (Fitzpatrick scale), geographic location, time of day, UV index, and the amount of skin exposed. While not a medical measurement, it provides a reliable daily guideline.',
    },
    {
      id: 'faq-2',
      question: 'Is Bask a replacement for sunscreen?',
      answer:
        "No. Bask is a companion tool, not a substitute for sun protection. It helps you understand when and how long to be in the sun safely, but you should always follow dermatologist recommendations for sunscreen and protective clothing, especially during high UV periods.",
    },
    {
      id: 'faq-3',
      question: 'What skin types does Bask support?',
      answer:
        'Bask supports all six Fitzpatrick skin types (I through VI). During onboarding, you select your skin type so the app can calculate safe exposure durations and vitamin D estimates tailored to your skin.',
    },
    {
      id: 'faq-4',
      question: 'Does Bask work indoors or through windows?',
      answer:
        'Bask is designed for direct outdoor sun exposure. UVB rays, which are responsible for vitamin D synthesis, do not penetrate glass. The app will remind you that indoor time near windows does not contribute to your vitamin D goals.',
    },
    {
      id: 'faq-5',
      question: 'Is the app free to use?',
      answer:
        'Bask offers a free tier with core UV tracking and daily recommendations. A premium subscription unlocks advanced features like weekly reports, historical trends, and family profiles.',
    },
    {
      id: 'faq-6',
      question: 'Which devices does Bask support?',
      answer:
        'Bask is currently available for iPhone running iOS 16 or later. An Android version and Apple Watch companion app are on the roadmap.',
    },
  ];

  return (
    <section id="faq" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold uppercase tracking-wider">
            Questions?
          </div>
          <h2 className="font-heading text-foreground mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="text-foreground flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-primary/5"
              >
                <span className="font-heading pr-4 text-lg font-semibold">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-primary h-5 w-5 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-muted-foreground border-border border-t px-6 pb-6 pt-4 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const blogPosts = [
    {
      title: 'Why Vitamin D Matters More Than You Think',
      excerpt:
        "Research shows that over 40% of adults are vitamin D deficient. Here's what that means for your health.",
      date: 'Coming Soon',
      tag: 'Health',
    },
    {
      title: 'The Science of Safe Sun Exposure',
      excerpt:
        'How to get enough sun for vitamin D without increasing your risk of skin damage.',
      date: 'Coming Soon',
      tag: 'Science',
    },
    {
      title: 'Understanding UV Index: A Complete Guide',
      excerpt:
        'What the UV index really means and how to use it for smarter sun habits.',
      date: 'Coming Soon',
      tag: 'Guide',
    },
  ];

  return (
    <section id="blog" className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold uppercase tracking-wider">
            From the Blog
          </div>
          <h2 className="font-heading text-foreground mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
            Sun Science & Wellness Tips
          </h2>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass group cursor-pointer overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
            >
              {/* Tag */}
              <div className="border-border border-b p-6">
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-foreground mb-3 text-xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="text-muted-foreground flex items-center justify-between text-sm">
                  <span>{post.date}</span>
                  <ArrowRight className="text-primary h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    const messages = JSON.parse(
      localStorage.getItem('contactMessages') || '[]'
    );
    messages.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="from-primary to-accent relative mb-16 overflow-hidden rounded-[2rem] bg-gradient-to-br p-12 text-center shadow-xl md:p-16"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-primary-foreground font-heading mb-4 text-4xl font-bold md:text-5xl">
              Start basking in better health
            </h2>
            <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-lg">
              Download Bask and take the first step toward optimizing your
              relationship with the sun.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-foreground text-background inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-medium shadow-lg transition-shadow hover:shadow-xl"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="font-heading text-foreground mb-4 text-3xl font-bold">
              Get in Touch
            </h3>
            <p className="text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="bg-primary/10 mx-auto mb-4 inline-flex rounded-full p-4">
                  <Mail className="text-primary h-8 w-8" />
                </div>
                <h4 className="font-heading text-foreground mb-2 text-xl font-bold">
                  Message Sent!
                </h4>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="text-foreground mb-2 block font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-foreground mb-2 block font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-foreground mb-2 block font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-accent text-primary-foreground w-full rounded-xl px-6 py-3 font-medium transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground/5 border-border border-t px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/images/logo.png" alt="Bask" className="h-8 w-8" />
              <span className="text-foreground font-heading text-2xl font-bold">
                Bask
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your personal sun companion. Track UV, optimize vitamin D, live
              brighter.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:pl-12">
            <h4 className="text-foreground mb-4 font-heading font-semibold">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Download Column */}
          <div>
            <h4 className="text-foreground mb-4 font-heading font-semibold">
              Download
            </h4>
            <a
              href="#"
              className="bg-foreground text-background mb-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>App Store</span>
            </a>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2026 Bask. All rights reserved.
          </p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            Made with <Sun className="text-primary h-4 w-4" /> in California
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground grain min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
