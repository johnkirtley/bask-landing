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
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Target,
  Heart,
  CloudSun,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#features', label: 'Features', id: 'features' },
  { href: '#science', label: 'Science', id: 'science' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  // { href: '#pricing', label: 'Pricing', id: 'pricing' },
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
    <nav className="bg-background/80 fixed top-0 right-0 left-0 z-50 backdrop-blur-lg">
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
                  className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5"
                />
              )}
            </a>
          ))}
          <a href="" className="flex items-center gap-2 py-2.5">
            <img
              src="/images/black.svg"
              alt="Download on the App Store"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border-border border-t md:hidden"
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
                href=""
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 py-3 font-medium"
              >
                <img
                  src="/images/black.svg"
                  alt="Download on the App Store"
                  className="h-8 w-auto"
                />
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
      <div className="border-foreground bg-card rounded-[3rem] border-[8px] p-2 shadow-2xl">
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
            {/* Bask Ring */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-white/80 p-4 text-center shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Bask Ring</p>
              <p className="text-primary text-4xl font-bold">3,600 IU</p>
              <p className="text-accent text-xs font-medium">
                72% of 5,000 IU goal
              </p>
            </motion.div>

            {/* Live session */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-white/80 p-4 shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Active Session</p>
              <p className="text-foreground text-2xl font-bold">12:34</p>
              <p className="text-secondary text-xs">+842 IU · UV 6.2</p>
            </motion.div>

            {/* D-Window card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-secondary/30 rounded-2xl p-4 shadow-sm"
            >
              <p className="text-muted-foreground text-xs">Next D-Window</p>
              <p className="text-foreground text-sm font-bold">
                Tomorrow 11:00 AM - 1:00 PM
              </p>
              <p className="text-muted-foreground text-xs">
                Optimal 2-hour window · UV 7-8
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
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      {/* Radial gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="from-primary/20 via-background to-background bg-gradient-radial absolute inset-0" />
        <div className="from-primary/10 bg-gradient-radial absolute top-1/4 right-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/2 rounded-full blur-3xl" />
        <div className="from-secondary/20 bg-gradient-radial absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12 lg:px-24">
        {/* Left column - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-primary font-heading inline-block text-sm font-semibold tracking-wider uppercase">
            Get your daily vitamin D—naturally
          </div>

          <h1 className="font-heading text-foreground text-5xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
            Track your vitamin D and sun exposure{' '}
            <span className="text-primary">with intelligent UV monitoring</span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Personalized sun exposure guidance for optimal health, safely.
          </p>

          {/* App Store Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/images/black.svg"
              alt="Download on the App Store"
              className="h-14 w-auto"
            />
          </motion.a>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {[
              { icon: Target, text: 'D-Engine' },
              { icon: CloudSun, text: 'D-Window Forecast' },
              { icon: Heart, text: 'Apple Health Sync' },
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
                <p className="text-foreground text-sm font-bold">
                  UV Index: 6.2
                </p>
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
                <p className="text-foreground text-sm font-bold">
                  Vitamin D: 72%
                </p>
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
      title: 'Real-Time UV Monitoring',
      description:
        'Get live UV index data for your exact location, updated every 5 minutes. See your city, current conditions, and know the perfect moment to step outside.',
      color: 'bg-primary/15',
      iconColor: 'text-accent',
    },
    {
      icon: Target,
      title: 'Personalized D-Engine™',
      description:
        'Our proprietary algorithm calculates vitamin D synthesis based on your skin type, age, clothing, and current UV conditions.',
      color: 'bg-secondary/20',
      iconColor: 'text-secondary',
    },
    {
      icon: Clock,
      title: 'Smart Sun Sessions',
      description:
        'Start a timed session and watch your vitamin D accumulate in real-time. See your IU count, sunburn risk, and clothing coverage—all in one elegant interface.',
      color: 'bg-primary/15',
      iconColor: 'text-accent',
    },
    {
      icon: CloudSun,
      title: '48-Hour D-Window Forecast™',
      description:
        'Get intelligent predictions for the best sun exposure windows over the next 2 days. Bask analyzes hourly UV forecasts and cloud cover to recommend optimal 1-3 hour windows.',
      color: 'bg-destructive/10',
      iconColor: 'text-destructive',
    },
    {
      icon: Heart,
      title: 'Apple Health Integration',
      description:
        'Read "Time in Daylight" to estimate passive vitamin D and write your vitamin D supplement intake so other health apps can see your complete nutritional data.',
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
          <div className="text-primary font-heading mb-4 text-sm font-semibold tracking-wider uppercase">
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
              <div
                className={`${feature.color} mb-4 inline-flex rounded-xl p-3`}
              >
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
      title: 'Personalize Your Profile',
      description:
        'Select your skin tone, sun reaction, age, weight, and goals. Bask calculates your Fitzpatrick skin type and creates a personalized vitamin D synthesis model.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Get Real-Time Guidance',
      description:
        'Our D-Engine analyzes current UV index, cloud cover, and your profile to recommend safe sun session durations. Watch your vitamin D accumulate in real-time (IU per minute).',
      icon: Target,
    },
    {
      step: '03',
      title: 'Track & Optimize',
      description:
        'Log sun sessions, supplements, and cofactors (K2, magnesium). See your Bask Ring progress, streaks, and trends.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="science" className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold tracking-wider uppercase">
            Science-backed methodology
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
                <div className="border-primary/30 absolute top-16 left-1/2 hidden h-0.5 w-full border-t-2 border-dashed md:block" />
              )}

              {/* Step number */}
              <div className="text-primary from-primary/20 to-accent/20 font-heading relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold">
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
      question: 'What is Bask?',
      answer:
        'Bask is an iOS app that helps you track vitamin D from sun exposure and supplements. It uses real-time UV data and personalized calculations to recommend safe sun exposure times.',
    },
    {
      id: 'faq-2',
      question: 'How accurate are the vitamin D calculations?',
      answer:
        "Bask uses Dr. Michael Holick's peer-reviewed formula, which is the gold standard in photobiology. However, individual variation exists due to factors like sunscreen, altitude, pollution, and genetics. Treat estimates as guidelines, not absolutes.",
    },
    {
      id: 'faq-3',
      question: 'Will Bask prevent me from burning?',
      answer:
        'Bask includes sunburn risk indicators and caps recommendations at your personalized burn threshold. However, you are responsible for your own safety. Always monitor your skin and leave the sun if you feel uncomfortable.',
    },
    {
      id: 'faq-4',
      question: 'What is the D-Window Forecast?',
      answer:
        'Our feature that analyzes 48 hours of UV and cloud cover data to recommend the best 1-3 hour window for sun exposure. Get alerts before optimal windows open.',
    },
    {
      id: 'faq-5',
      question: 'Does Bask work with Apple Health?',
      answer:
        'Yes! Bask reads "Time in Daylight" to estimate passive vitamin D and writes dietary vitamin D back to Apple Health.',
    },
    {
      id: 'faq-6',
      question: 'Is my health data private?',
      answer:
        'Yes. All personal data is stored locally on your device. We do not transmit your health data to our servers.',
    },
    {
      id: 'faq-7',
      question: 'How much vitamin D do I need?',
      answer:
        'The default goal is 5,000 IU/day, which aligns with recommendations for optimal blood levels (40-60 ng/mL). Consult your doctor for personalized advice.',
    },
    {
      id: 'faq-8',
      question: "What's the Shadow Rule?",
      answer:
        'Below UV index 3, UVB rays are scattered by the atmosphere, so you produce zero vitamin D (but still get UVA damage). Bask only credits vitamin D when UV ≥ 3.',
    },
    {
      id: 'faq-9',
      question: 'Is Bask free?',
      answer:
        'Bask offers a free tier with core features. Premium plans (monthly, yearly) unlock advanced features like D-Window Forecast and notifications.',
    },
    {
      id: 'faq-10',
      question: 'Which devices does Bask support?',
      answer:
        'Bask is currently iOS-only (iPhone & iPad). Android support may come in the future.',
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
          <div className="text-primary font-heading mb-4 text-sm font-semibold tracking-wider uppercase">
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
                className="text-foreground hover:bg-primary/5 flex w-full items-center justify-between p-6 text-left transition-colors"
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
                    <div className="text-muted-foreground border-border border-t px-6 pt-4 pb-6 leading-relaxed">
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

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Real-time UV monitoring',
        'Sun exposure session tracking',
        'Supplement & cofactor logging',
        'Basic Bask Ring progress',
        'History timeline view',
        'Apple Health sync',
      ],
      cta: 'Download Free',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: '$4.99',
      period: '/month',
      features: [
        'All free features',
        'D-Window Forecast (48-hour predictions)',
        'Physician report export',
        'Advanced insights & trends',
        'Priority support',
        'Ad-free experience',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Lifetime',
      price: '$49.99',
      period: 'one-time',
      features: [
        'All Premium features',
        'One-time payment',
        'Lifetime access',
        'No recurring fees',
        'Future updates included',
        'Best value',
      ],
      cta: 'Get Lifetime Access',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="text-primary font-heading mb-4 text-sm font-semibold tracking-wider uppercase">
            Simple Pricing
          </div>
          <h2 className="font-heading text-foreground mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
            Choose Your Plan
          </h2>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass overflow-hidden rounded-2xl p-8 transition-shadow hover:shadow-lg ${
                plan.highlighted ? 'border-primary border-2' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="bg-primary text-primary-foreground -mx-8 -mt-8 mb-6 px-4 py-2 text-center text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="font-heading text-foreground mb-2 text-2xl font-bold">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-foreground text-4xl font-bold">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  /{plan.period}
                </span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, fidx) => (
                  <li
                    key={fidx}
                    className="text-muted-foreground flex items-start gap-2 text-sm"
                  >
                    <Sun className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full rounded-xl px-6 py-3 text-center font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-accent'
                    : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
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
      localStorage.getItem('contactMessages') || '[]',
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

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-primary-foreground font-heading mb-4 text-4xl font-bold md:text-5xl">
              Get Your Personalized Solar Plan
            </h2>
            <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-lg">
              Download Bask — Free on iOS. Start tracking your vitamin D and
              optimizing your sun exposure today.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/black.svg"
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
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
            className="mb-12 text-center"
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
              <form
                onSubmit={handleSubmit}
                className="glass space-y-6 rounded-2xl p-8"
              >
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
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
                    className="bg-card border-input focus:border-primary focus:ring-primary w-full rounded-xl border px-4 py-3 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
              Track your vitamin D and sun exposure with intelligent UV
              monitoring. Personalized guidance for optimal health, safely.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:pl-12">
            <h4 className="text-foreground font-heading mb-4 font-semibold">
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
                  href="#science"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Science
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
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Download Column */}
          <div>
            <h4 className="text-foreground font-heading mb-4 font-semibold">
              Download
            </h4>
            <a href="#">
              <img
                src="/images/black.svg"
                alt="Download on the App Store"
                className="mb-6 h-10 w-auto"
              />
            </a>

            {/* Social Links */}
            {/* <div className="flex gap-4">
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
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2026 Bask. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            Made with <Sun className="text-primary h-4 w-4" /> in Las Vegas, NV
          </p>
        </div>

        {/* Medical Disclaimer */}
        <div className="text-muted-foreground border-border mt-8 border-t pt-8 text-center text-xs">
          <p className="mx-auto max-w-4xl leading-relaxed">
            <strong>Medical Disclaimer:</strong> Bask is not a medical device.
            The app is for informational purposes only and does not provide
            medical advice. Consult a licensed healthcare provider before making
            changes to your vitamin D supplementation or sun exposure habits.
            Excessive sun exposure increases skin cancer risk.
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
      {/* <Pricing /> */}
      <Contact />
      <Footer />
    </div>
  );
}
