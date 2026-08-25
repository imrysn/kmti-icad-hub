import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, BookOpen, MessageCircle, PlayCircle, ShieldCheck, ChevronRight, Sparkles, Target, UserCheck, Award, Lock, Menu, X } from 'lucide-react';
import { PublicAccessPlan, registrationService } from '../../services/registrationService';
import icadInterfacePreview from '../../assets/3D_INTERACTIVE/icad_interface.jpg';
import kmtiLogo from '../../assets/logo/kmti_logo.png';
import kmtiTrainingHubLogo from '../../assets/logo/kmti-training-hub.png';
import './LandingView.css';

const PLAN_MARKETING: Record<string, { outcome: string; features: string[]; popular?: boolean }> = {
  'icad-foundations': {
    outcome: 'Master the fundamental layout, tools, and basic navigation of iCAD. Build confidence exploring the software and creating simple 3D primitives.',
    features: ['Beginner-friendly tutorials', 'Basic UI navigation & origin', 'Direct Mentor Chat'],
  },
  'icad-professional': {
    outcome: 'Learn advanced 3D modeling operations and 2D detailing so you can create complex industrial parts and prepare them for manufacturing.',
    features: ['Everything in Foundations', 'Advanced 3D Modeling manual', '2D Detailing manual', 'Practical Assignments'],
    popular: true,
  },
  'icad-complete': {
    outcome: 'Master the entire workflow, from 3D modeling to full evaluation and certification, with priority support and a verifiable completion record.',
    features: ['Everything in Professional', 'Excel evaluation workflows', 'Priority Support', 'Certification of Completion'],
  },
};

const PLAN_LEVELS: Record<string, number> = { 'icad-foundations': 1, 'icad-professional': 2, 'icad-complete': 3 };
const COMPARISON_ITEMS = [
  { label: 'Beginner foundations', level: 1 },
  { label: 'Advanced 3D modeling', level: 2 },
  { label: '2D detailing', level: 2 },
  { label: 'Practical assignments', level: 2 },
  { label: 'Evaluation workflows', level: 3 },
  { label: 'Priority support', level: 3 },
  { label: 'Completion certification', level: 3 },
];

export const PublicPolicyView: React.FC<{ page: 'help' | 'terms' | 'privacy' }> = ({ page }) => {
  const navigate = useNavigate();
  const isTerms = page === 'terms';
  const isHelp = page === 'help';
  const pageTitle = isHelp ? 'Help Center' : isTerms ? 'Terms of Service' : 'Privacy Policy';
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${pageTitle} | KMTI Training Hub`;
    return () => { document.title = previousTitle; };
  }, [pageTitle]);
  return <div className="landing-container public-policy-page">
    <nav className="landing-nav glass-panel" aria-label="Policy navigation">
      <button type="button" className="nav-logo public-policy-logo" onClick={() => navigate('/')}><span className="logo-icon-wrapper"><img src={kmtiTrainingHubLogo} alt="" /></span><span className="logo-text">KMTI Hub</span></button>
      <button type="button" className="btn-ghost" onClick={() => navigate('/')}>Back to home</button>
    </nav>
    <main className="public-policy-content">
      <span className="section-eyebrow">KMTI Training Hub</span><h1>{pageTitle}</h1>{!isHelp && <p className="policy-effective">Effective August 2026</p>}
      {isHelp ? <>
        <section><h2>How can we help?</h2><p>For account approval, access plans, billing, or course availability, contact your KMTI training administrator.</p></section>
        <section><h2>Lesson support</h2><p>Use Report a Bug when a page fails to load, a control does not work, or lesson content is displayed incorrectly. Include the page and a screenshot whenever possible.</p></section>
        <section><h2>Account security</h2><p>You can update your display name, username, password, and profile picture from Profile. If you cannot sign in, use the password recovery option on the sign-in page.</p></section>
      </> : isTerms ? <>
        <section><h2>Using KMTI Training Hub</h2><p>You may use the platform only through your approved account and access plan. Do not share credentials, copy restricted course materials, interfere with platform security, or submit another learner’s work as your own.</p></section>
        <section><h2>Training content and results</h2><p>Course materials are provided for training purposes. Completion, quiz results, and practical submissions may be reviewed by authorized KMTI personnel. Access may be suspended for misuse or policy violations.</p></section>
        <section><h2>Availability and changes</h2><p>KMTI may update lessons, assessments, plans, and these terms. Material changes will be communicated through the platform.</p></section>
      </> : <>
        <section><h2>Information we collect</h2><p>We process account information, registration details, course activity, assessment results, support reports, and security records required to operate the training platform.</p></section>
        <section><h2>How information is used</h2><p>Information is used to provide access, track learning progress, review assessments, support users, prevent abuse, and administer the platform.</p></section>
        <section><h2>Files and screenshots</h2><p>Files submitted for assessments or bug reports are available only to authorized personnel and retained according to KMTI operational requirements.</p></section>
        <section><h2>Your choices</h2><p>You may update supported profile fields and request account or privacy assistance from a KMTI administrator.</p></section>
      </>}
      <section><h2>Contact</h2><p>Contact your KMTI training administrator for additional assistance.</p></section>
    </main>
  </div>;
};

const formatPlanPrice = (plan: PublicAccessPlan) => {
  if (plan.price_minor_units == null) return 'Contact us';
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: plan.currency_code || 'USD', maximumFractionDigits: 0,
  }).format(plan.price_minor_units / 100);
};

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PublicAccessPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStartLearning = (plan: string) => {
    window.dispatchEvent(new CustomEvent('kmti-landing-interaction', { detail: { action: 'apply_plan', plan } }));
    navigate(`/register?plan=${encodeURIComponent(plan)}`);
  };

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  };

  const loadPlans = useCallback(async () => {
    setPlansLoading(true);
    setPlansError('');
    try {
      setPlans(await registrationService.getPlans());
    } catch {
      setPlansError('Training plans are temporarily unavailable. Please try again later.');
    } finally {
      setPlansLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('animate-in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    void loadPlans();
  }, [loadPlans]);

  useEffect(() => {
    if (plans.length === 0) return;
    const script = document.createElement('script');
    script.id = 'kmti-course-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'KMTI iCAD online training plans',
      itemListElement: plans.map((plan, index) => ({
        '@type': 'ListItem', position: index + 1,
        item: {
          '@type': 'Course', name: plan.name, description: PLAN_MARKETING[plan.code]?.outcome || plan.description,
          provider: { '@type': 'Organization', name: 'Kusakabe & Maeno Tech., Inc.' },
          offers: plan.price_minor_units == null ? undefined : {
            '@type': 'Offer', price: (plan.price_minor_units / 100).toFixed(2), priceCurrency: plan.currency_code || 'USD',
            category: plan.billing_interval, availability: 'https://schema.org/InStock', url: `${window.location.origin}/#/register?plan=${encodeURIComponent(plan.code)}`,
          },
        },
      })),
    });
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [plans]);

  return (
    <div className="landing-container">
      <a className="landing-skip-link" href="#landing-main">Skip to main content</a>
      {/* Dynamic Background */}
      <div className="landing-bg-mesh">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="landing-nav glass-panel" aria-label="Public navigation">
        <div className="nav-logo">
          <div className="logo-icon-wrapper">
            <img src={kmtiTrainingHubLogo} alt="" />
          </div>
          <span className="logo-text">KMTI Hub</span>
        </div>
        <button className="landing-menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="landing-navigation-menu" onClick={() => setMobileMenuOpen(open => !open)}>
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <div id="landing-navigation-menu" className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a className="landing-navigation-menu-link" href="#features" onClick={event => scrollToSection(event, 'features')}>Features</a>
          <a className="landing-navigation-menu-link" href="#how-it-works" onClick={event => scrollToSection(event, 'how-it-works')}>How it works</a>
          <a className="landing-navigation-menu-link" href="#pricing" onClick={event => scrollToSection(event, 'pricing')}>Pricing</a>
        </div>
        <div className={`nav-actions ${mobileMenuOpen ? 'open' : ''}`}>
          <button className="btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-primary-small" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </button>
        </div>
      </nav>

      <main id="landing-main">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content animate-on-scroll">
          <div className="badge-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>The New Standard in iCAD Training</span>
          </div>
          <h1 className="hero-title">
            Master <span>iCAD</span> Operations
          </h1>
          <p className="hero-subtitle">
            Experience the most interactive, beginner-friendly platform to learn iCAD. From absolute basics to professional detailing, guided by AI and real mentors.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary large group" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Learning Today
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary large" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Features
            </button>
          </div>
        </div>
        
        {/* Mockup Dashboard Preview */}
        <div className="hero-preview animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <div className="glass-mockup">
            <div className="mockup-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                <span className="mockup-course-label">iCAD Foundations</span>
                <div className="mockup-progress"><span /></div>
                <div className="mockup-lesson active"><CheckCircle size={14} /> What is iCAD SX?</div>
                <div className="mockup-lesson"><BookOpen size={14} /> Screen layout</div>
                <div className="mockup-lesson"><Lock size={14} /> Model navigation</div>
              </div>
              <div className="mockup-content">
                <div className="mockup-lesson-header">
                  <div><span>Lesson 1 of 17</span><strong>What is iCAD SX?</strong></div>
                  <div className="mockup-tts"><PlayCircle size={15} /> Read lesson</div>
                </div>
                <div className="mockup-learning-card">
                  <div className="mockup-copy">
                    <span>Learning objective</span>
                    <strong>Understand the iCAD workspace</strong>
                    <p>Follow the guided lesson while seeing the real interface and controls.</p>
                  </div>
                  <img src={icadInterfacePreview} alt="Preview of the iCAD software interface used in a KMTI lesson" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header animate-on-scroll">
          <h2>Why Choose KMTI?</h2>
          <p>We built the ultimate learning experience for CAD professionals and career shifters alike.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass-panel hover-lift animate-on-scroll">
            <div className="feature-icon-wrapper blue">
              <PlayCircle size={28} />
            </div>
            <h3>Interactive TTS Lessons</h3>
            <p>Guided, step-by-step text-to-speech lessons that feel like a mentor is right next to you, pointing exactly where to click.</p>
          </div>
          <div className="feature-card glass-panel hover-lift animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon-wrapper green">
              <BookOpen size={28} />
            </div>
            <h3>Beginner Friendly</h3>
            <p>Start from absolute zero. Our Foundations curriculum is meticulously designed for complete beginners and career shifters.</p>
          </div>
          <div className="feature-card glass-panel hover-lift animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon-wrapper purple">
              <MessageCircle size={28} />
            </div>
            <h3>Direct Mentor Support</h3>
            <p>Stuck on a lesson? Chat directly with experienced KMTI mentors right inside the platform to get unblocked instantly.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="journey-section">
        <div className="section-header animate-on-scroll">
          <span className="section-eyebrow">Your learning journey</span>
          <h2>A clear path from registration to mastery</h2>
          <p>Learn at your pace with structured lessons, practical checks, and support when you need it.</p>
        </div>
        <div className="journey-grid">
          <article className="journey-step animate-on-scroll">
            <span className="journey-number">01</span><UserCheck size={24} />
            <h3>Choose your training plan</h3>
            <p>Apply for the course level that matches your experience and learning goals.</p>
          </article>
          <article className="journey-step animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <span className="journey-number">02</span><BookOpen size={24} />
            <h3>Learn step by step</h3>
            <p>Complete guided iCAD lessons with progress tracking and interactive assistance.</p>
          </article>
          <article className="journey-step animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <span className="journey-number">03</span><Award size={24} />
            <h3>Validate your skills</h3>
            <p>Finish the required activities and assessments for your selected training level.</p>
          </article>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header animate-on-scroll">
          <h2>Choose Your Path</h2>
          <p>Whether you're starting from scratch or upgrading your career, we have a plan for you.</p>
        </div>
        
        {plansLoading && <div className="landing-plans-status" role="status" aria-live="polite">Loading training plans…</div>}
        {plansError && <div className="landing-plans-status error" role="alert"><span>{plansError}</span><button type="button" onClick={() => void loadPlans()}>Try again</button></div>}
        {!plansLoading && !plansError && plans.length === 0 && <div className="landing-plans-status">No public training plans are currently available.</div>}
        {!plansLoading && plans.length > 0 && <div className="pricing-grid">
          {plans.map((plan, index) => {
            const marketing = PLAN_MARKETING[plan.code] || {
              outcome: plan.description || 'Build practical iCAD skills through guided KMTI training.',
              features: ['Guided course content', 'Progress tracking', 'KMTI training support'],
            };
            const interval = plan.billing_interval === 'one_time' ? 'one-time' : `/user/${plan.billing_interval}`;
            return <div key={plan.id} className={`pricing-card glass-panel ${marketing.popular ? 'popular scale-up' : ''}`} style={{ animationDelay: `${Math.min(index, 4) * 0.1}s` }}>
              {marketing.popular && <div className="popular-badge">Most Popular</div>}
              <div className="pricing-header">
                <h3>{plan.name}</h3>
                <div className={`price landing-dynamic-price ${plan.price_minor_units == null ? 'price-unavailable' : ''}`}><strong>{formatPlanPrice(plan)}</strong>{plan.price_minor_units != null && <span className="period">{interval}</span>}</div>
              </div>
              <div className="pricing-body">
                <div className="plan-outcome"><Target size={16} className="outcome-icon" /><p><strong>What you'll achieve:</strong>{marketing.outcome}</p></div>
                <ul className="plan-features">{marketing.features.map((feature, featureIndex) => <li key={feature}>{plan.code === 'icad-complete' && featureIndex === marketing.features.length - 1 ? <ShieldCheck size={18} className="check-icon" /> : <CheckCircle size={18} className="check-icon" />}{feature}</li>)}</ul>
                <button className={marketing.popular ? 'btn-primary full-width' : 'btn-outline full-width'} onClick={() => handleStartLearning(plan.code)}>Apply for {plan.name}</button>
              </div>
            </div>;
          })}
        </div>}
      </section>

      {plans.length > 0 && <section className="plan-comparison-section" aria-labelledby="plan-comparison-title">
        <div className="section-header animate-on-scroll">
          <span className="section-eyebrow">Compare access</span>
          <h2 id="plan-comparison-title">What each training level includes</h2>
          <p>Compare the major learning areas before submitting your application.</p>
        </div>
        <div className="plan-comparison-grid">
          {plans.map(plan => {
            const level = PLAN_LEVELS[plan.code] || 1;
            return <article className={`plan-comparison-card ${PLAN_MARKETING[plan.code]?.popular ? 'featured' : ''}`} key={plan.id}>
              <header><h3>{plan.name}</h3><button type="button" onClick={() => handleStartLearning(plan.code)}>Choose plan</button></header>
              <ul>{COMPARISON_ITEMS.map(item => <li className={level >= item.level ? 'included' : 'not-included'} key={item.label}><CheckCircle size={15} aria-hidden="true"/><span>{item.label}</span><small>{level >= item.level ? 'Included' : 'Higher plan'}</small></li>)}</ul>
            </article>;
          })}
        </div>
      </section>}

      <section id="faq" className="landing-faq-section">
        <div className="section-header animate-on-scroll">
          <span className="section-eyebrow">Before you apply</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="landing-faq-list animate-on-scroll">
          <details><summary>Do I need previous iCAD experience?</summary><p>No. iCAD Foundations starts with the workspace, essential controls, and basic navigation for new learners.</p></details>
          <details><summary>How do I receive access after registering?</summary><p>Submit your registration and verify your email. A KMTI administrator reviews the application and you will receive an approval notice when your account is activated.</p></details>
          <details><summary>Can I upgrade my plan later?</summary><p>Yes. Once signed in, you can review the available training plans and request an upgrade from your learner account.</p></details>
          <details><summary>Can I learn on my own schedule?</summary><p>Yes. Lessons are browser-based and your progress is saved, subject to the access period assigned to your plan.</p></details>
        </div>
      </section>

      <section className="landing-final-cta animate-on-scroll">
        <div><span className="section-eyebrow">Start building practical iCAD skills</span><h2>Ready to begin your training?</h2><p>Choose the learning path that fits your goals and submit your application today.</p></div>
        <button className="btn-primary large" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>View training plans <ChevronRight size={18} /></button>
      </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={kmtiLogo} alt="" />
            <span>KMTI Training Hub</span>
          </div>
          <nav className="landing-footer-links" aria-label="Legal and support links">
            <button type="button" onClick={() => navigate('/terms')}>Terms</button>
            <button type="button" onClick={() => navigate('/privacy')}>Privacy</button>
            <a href="#faq" onClick={event => scrollToSection(event, 'faq')}>FAQ</a>
          </nav>
          <p>&copy; {new Date().getFullYear()} KMTI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
