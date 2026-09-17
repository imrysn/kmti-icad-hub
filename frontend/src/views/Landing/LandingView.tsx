import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { PublicAccessPlan, registrationService } from '../../services/registrationService';
import icadInterfacePreview from '../../assets/3D_INTERACTIVE/icad_interface.jpg';
import modelingPreview from '../../assets/icad-foundations/modeling/professional/box.png';
import detailingPreview from '../../assets/2D.png';
import kmtiLogo from '../../assets/logo/kmti_logo.png';
import kmtiTrainingHubLogo from '../../assets/logo/kmti-training-hub.png';
import './LandingView.css';
import { FOUNDATION_MODULES, FOUNDATION_TOTAL } from '../../components/iCAD_Foundations/curriculum';
import { PROFESSIONAL_MODULES, PROFESSIONAL_TOTAL } from '../../components/iCAD_Professional/curriculum';

/** Course sizes come from the published curricula, so the page cannot advertise lessons that do not exist. */
const courseSize = (modules: number, lessons: number) => `${modules} modules · ${lessons} lessons`;

type PlanContent = {
  audience: string;
  scope: string;
  summary: string;
  includes: string[];
  image: string;
  imageAlt: string;
  /** Real pixel size, so the browser reserves the right space before the screenshot loads. */
  imageSize: [number, number];
};

const PLAN_CONTENT: Record<string, PlanContent> = {
  'icad-foundations': {
    audience: 'For learners who are new to iCAD SX.',
    scope: courseSize(FOUNDATION_MODULES.length, FOUNDATION_TOTAL),
    summary: 'Start with the screen layout, toolbars and navigation, then work through coordinates, selection, file operations and your first 3D shapes. Every lesson ends with a short knowledge check.',
    includes: [
      'Screen layout, toolbars and workspace navigation',
      'Coordinates, selection and file operations',
      'First 3D shapes & solid primitives step by step',
      'A knowledge check after every lesson',
      'Guided practical exercises for beginners',
    ],
    image: icadInterfacePreview,
    imageAlt: 'An iCAD Foundations lesson showing the iCAD SX screen layout',
    imageSize: [840, 480],
  },
  'icad-professional': {
    audience: 'For designers moving on to production work.',
    scope: courseSize(PROFESSIONAL_MODULES.length, PROFESSIONAL_TOTAL),
    summary: 'Build on the basics with advanced 3D modeling and 2D detailing, following the real command menus and entry fields, with practical assignments to apply each skill.',
    includes: [
      'Everything in Foundations',
      'Advanced 3D modeling & feature editing',
      'Assembly modeling and component management',
      '2D detailing, drafting, and technical drawings',
      'Geometric dimensioning and tolerances (GD&T)',
      'Practical production-level assignments',
      'Verified certificate of completion',
    ],
    image: modelingPreview,
    imageSize: [840, 480],
    imageAlt: 'An iCAD Professional lesson showing a solid being placed in iCAD SX',
  },
  'icad-complete': {
    audience: 'For teams taking the full programme.',
    scope: 'Full curriculum',
    summary: 'Everything in Professional plus the practical assessment sets, so a team can work from first lesson to assessed drawings inside one training plan.',
    includes: [
      'Everything in Professional',
      'Full access to the complete iCAD SX curriculum',
      'Practical assessment sets & drawing reviews',
      'Advanced 3D modeling, assemblies & 2D drafting',
      'Multi-user progress tracking & reporting',
      'Priority training support from KMTI instructors',
      'Downloadable project exercises & reference files',
      'Dedicated administrator license & learner management',
      'Verified course completion certificates',
      'Direct instructor feedback on submission practicals',
    ],
    image: detailingPreview,
    imageSize: [840, 480],
    imageAlt: 'A 2D detailing drawing produced in iCAD SX',
  },
};

/** Wireframe primitives from the course: box, cylinder, polygonal prism, torus, sphere, pyramid. */
const HeroShapes: React.FC = () => (
  <div className="hero-shapes" aria-hidden="true">
    <svg className="hero-shape hero-shape--box" viewBox="0 0 120 120" fill="none">
      <path d="M20 44 60 24l40 20v36L60 100 20 80Z" /><path d="M20 44l40 20 40-20M60 64v36" />
    </svg>
    <svg className="hero-shape hero-shape--sphere" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="38" /><ellipse cx="60" cy="60" rx="38" ry="14" /><ellipse cx="60" cy="60" rx="14" ry="38" />
    </svg>
    <svg className="hero-shape hero-shape--cylinder" viewBox="0 0 120 120" fill="none">
      <ellipse cx="60" cy="34" rx="34" ry="14" /><path d="M26 34v52c0 7.7 15.2 14 34 14s34-6.3 34-14V34" />
    </svg>
    <svg className="hero-shape hero-shape--polygon" viewBox="0 0 120 120" fill="none">
      <path d="M60 18l30 17v34L60 86 30 69V35Z" /><path d="M30 35l30 17 30-17M60 52v34" />
    </svg>
    <svg className="hero-shape hero-shape--pyramid" viewBox="0 0 120 120" fill="none">
      <path d="M60 18 24 76l36 22 36-22Z" /><path d="M60 18v80" />
    </svg>
    <svg className="hero-shape hero-shape--torus" viewBox="0 0 120 120" fill="none">
      <ellipse cx="60" cy="60" rx="42" ry="26" /><ellipse cx="60" cy="60" rx="18" ry="9" />
    </svg>
  </div>
);

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
    <nav className="landing-nav" aria-label="Policy navigation">
      <button type="button" className="nav-logo public-policy-logo" onClick={() => navigate('/')}><span className="logo-icon-wrapper"><img src={kmtiTrainingHubLogo} alt="" /></span><span className="logo-text">KMTI Training Hub</span></button>
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
  if (plan.price_minor_units == null) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: plan.currency_code || 'USD', maximumFractionDigits: 0,
  }).format(plan.price_minor_units / 100);
};

const planInterval = (plan: PublicAccessPlan) => plan.billing_interval === 'one_time' ? 'one-time' : `/user/${plan.billing_interval}`;

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PublicAccessPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState(0);
  const showcaseRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroSpacerRef = useRef<HTMLDivElement>(null);
  const heroFigureRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const requestAccess = (plan: string) => {
    window.dispatchEvent(new CustomEvent('kmti-landing-interaction', { detail: { action: 'apply_plan', plan } }));
    navigate(`/register?plan=${encodeURIComponent(plan)}`);
  };

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPlan = (index: number) => {
    setActivePlan(index);
    const section = showcaseRef.current;
    if (!section) return;
    const vh = window.innerHeight || 800;
    const stickyHeight = 560;
    const stickyTop = Math.max(72, (vh - stickyHeight) / 2);
    const rect = section.getBoundingClientRect();
    const login = document.querySelector<HTMLElement>('.app-content-login');
    const scrollY = login ? login.scrollTop : (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0);
    const showcaseDocTop = rect.top + scrollY;
    const track = Math.max(1, rect.height > stickyHeight ? rect.height - stickyHeight : rect.height);
    const segment = track / Math.max(1, plans.length);
    const targetY = showcaseDocTop - stickyTop + index * segment + 5;

    if (login && typeof login.scrollTo === 'function') {
      login.scrollTo({ top: targetY, behavior: 'smooth' });
    } else if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
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
    void loadPlans();
  }, [loadPlans]);

  /** Scrolling through the overview brings each plan to the centre in turn; progress fills each plan divider */
  useEffect(() => {
    const section = showcaseRef.current;
    if (!section || plans.length === 0) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      if (!rect.height) return; // Nothing to measure yet (or no layout, as in tests).

      const vh = window.innerHeight || 800;
      const stickyHeight = 560;
      const stickyTop = Math.max(72, (vh - stickyHeight) / 2);

      const track = Math.max(1, rect.height > stickyHeight ? rect.height - stickyHeight : rect.height);
      const segment = track / plans.length;
      const scrolled = rect.height > stickyHeight ? stickyTop - rect.top : (vh / 2 - rect.top);

      const rawIndex = scrolled / segment;
      const nextIndex = Math.max(0, Math.min(plans.length - 1, Math.floor(rawIndex)));
      setActivePlan(nextIndex);

      const progress = Math.max(0, Math.min(100, (rawIndex - nextIndex) * 100));

      if (listRef.current) {
        const entries = listRef.current.querySelectorAll<HTMLElement>('.plan-showcase-entry');
        entries.forEach((entry, idx) => {
          if (idx < nextIndex) {
            entry.classList.add('completed');
            entry.classList.remove('active');
            entry.style.setProperty('--plan-progress', '100%');
          } else if (idx === nextIndex) {
            entry.classList.remove('completed');
            entry.classList.add('active');
            entry.style.setProperty('--plan-progress', `${progress.toFixed(1)}%`);
          } else {
            entry.classList.remove('completed');
            entry.classList.remove('active');
            entry.style.setProperty('--plan-progress', '0%');
          }
        });
      }
    };
    update();
    // Capture phase: the page may scroll inside an app container rather than the window.
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
  }, [plans.length]);

  /**
   * Scroll-driven hero image animation:
   * 1. Scrolls naturally from the hero until its top reaches the vertical viewport center.
   * 2. Remains pinned in the center of the screen as the user scrolls.
   * 3. As the #overview section approaches, smoothly scales and glides into the exact position of the 1st plan showcase screenshot.
   * 4. Seamlessly transfers to the plan showcase screenshot once docked.
   * Uses GPU transform3d + scale and damped LERP interpolation for 60fps/120fps liquid smooth transitions.
   */
  useEffect(() => {
    const spacer = heroSpacerRef.current;
    const heroFig = heroFigureRef.current;
    const showcase = showcaseRef.current;
    const media = mediaRef.current;
    const list = listRef.current;
    if (!spacer || !heroFig || !showcase || !media) return;

    let rafId: number | null = null;
    let currentP = 0;
    let targetP = 0;
    let isLoopRunning = false;

    const getScrollY = (): number => {
      const login = document.querySelector<HTMLElement>('.app-content-login');
      if (login) return login.scrollTop;
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const updateTargetProgress = (): boolean => {
      const prefersReducedMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (window.innerWidth <= 900 || prefersReducedMotion) {
        heroFig.style.cssText = '';
        if (list) {
          list.style.opacity = '';
          list.style.transform = '';
        }
        const firstImg = media.querySelector<HTMLImageElement>('img');
        if (firstImg) firstImg.style.opacity = '';
        return false;
      }

      const spacerRect = spacer.getBoundingClientRect();
      const showcaseRect = showcase.getBoundingClientRect();
      if (!spacerRect.height || !showcaseRect.height) return false;

      const vh = window.innerHeight;
      const scrollY = getScrollY();

      const showcaseDocTop = showcaseRect.top + scrollY;
      const stickyTop = Math.max(72, (vh - 560) / 2);
      const sDocked = Math.max(0, showcaseDocTop - stickyTop);
      const runway = Math.min(480, Math.max(280, vh * 0.5));
      const sStart = Math.max(0, sDocked - runway);

      if (scrollY <= sStart) {
        targetP = 0;
        // Immediate clean reset if user scrolls up into the hero
        if (scrollY <= sStart - 10) {
          currentP = 0;
        }
      } else if (scrollY >= sDocked) {
        targetP = 1;
      } else {
        targetP = (scrollY - sStart) / (sDocked - sStart);
      }

      return true;
    };

    const render = () => {
      const vh = window.innerHeight;
      const spacerRect = spacer.getBoundingClientRect();
      const firstImg = media.querySelector<HTMLImageElement>('img');

      const heroWidth = spacerRect.width;
      const heroHeight = spacerRect.height;
      if (!heroWidth || !heroHeight) return;

      const resetToDocumentFlow = () => {
        heroFig.style.position = '';
        heroFig.style.left = '';
        heroFig.style.top = '';
        heroFig.style.width = '';
        heroFig.style.height = '';
        heroFig.style.transform = '';
        heroFig.style.opacity = '1';
        heroFig.style.pointerEvents = '';
        heroFig.style.zIndex = '';

        if (firstImg && firstImg.style.opacity !== '0') firstImg.style.opacity = '0';
        if (list && list.style.opacity !== '0') {
          list.style.opacity = '0';
          list.style.transform = 'translateY(24px)';
        }
      };

      // When back in hero territory, immediately restore normal document flow
      if (currentP <= 0.005 && targetP === 0) {
        resetToDocumentFlow();
        return;
      }

      const targetImg = media.querySelector<HTMLImageElement>('img:not([hidden])') || firstImg;
      const mediaRect = targetImg ? targetImg.getBoundingClientRect() : media.getBoundingClientRect();
      const targetWidth = mediaRect.width || 840;
      const targetHeight = mediaRect.height || 480;

      // Stable destination coordinates in the plan showcase
      const stickyContainer = showcase.querySelector<HTMLElement>('.plan-showcase-sticky');
      const stickyRect = stickyContainer ? stickyContainer.getBoundingClientRect() : null;
      const stickyTop = Math.max(72, (vh - 560) / 2);
      const destX = mediaRect.left;
      const destY = stickyRect
        ? stickyTop + (mediaRect.top - stickyRect.top)
        : mediaRect.top;

      const targetScaleX = targetWidth / heroWidth;
      const targetScaleY = targetHeight / heroHeight;

      // Smootherstep: zero first and second derivatives at both ends
      const p = Math.max(0, Math.min(1, currentP));
      const ease = p * p * p * (p * (p * 6 - 15) + 10);

      // Start from the spacer's actual viewport position so it never jumps or covers the header
      const startX = spacerRect.left;
      const startY = spacerRect.top;

      const curX = startX + (destX - startX) * ease;
      const curY = startY + (destY - startY) * ease;
      const curSX = 1 + (targetScaleX - 1) * ease;
      const curSY = 1 + (targetScaleY - 1) * ease;

      // Fluid reveal of the plan details on the left
      const listP = Math.max(0, Math.min(1, (p - 0.12) / 0.8));
      const listEase = listP * listP * (3 - 2 * listP);
      const listOp = listEase.toFixed(3);
      const listTransY = `${((1 - listEase) * 20).toFixed(1)}px`;

      // Seamless image handoff when docked
      let heroOp = '1';
      let slotImgOp = '0';
      if (p >= 0.94) {
        const fade = (p - 0.94) / 0.06;
        heroOp = Math.max(0, 1 - fade).toFixed(3);
        slotImgOp = Math.min(1, fade).toFixed(3);
      }

      heroFig.style.position = 'fixed';
      heroFig.style.left = '0';
      heroFig.style.top = '0';
      heroFig.style.width = `${heroWidth}px`;
      heroFig.style.height = `${heroHeight}px`;
      heroFig.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0) scale(${curSX.toFixed(4)}, ${curSY.toFixed(4)})`;
      heroFig.style.opacity = heroOp;
      heroFig.style.pointerEvents = 'none';
      heroFig.style.zIndex = '10';

      if (firstImg && firstImg.style.opacity !== slotImgOp) {
        firstImg.style.opacity = slotImgOp;
      }
      if (list) {
        if (list.style.opacity !== listOp) list.style.opacity = listOp;
        list.style.transform = `translate3d(0, ${listTransY}, 0)`;
      }
    };

    const animLoop = () => {
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0003) {
        currentP += diff * 0.14;
        render();
        rafId = requestAnimationFrame(animLoop);
      } else {
        currentP = targetP;
        render();
        rafId = null;
        isLoopRunning = false;
      }
    };

    const onScroll = () => {
      const canAnimate = updateTargetProgress();
      if (!canAnimate) return;

      if (!isLoopRunning) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(animLoop);
      }
    };

    const onResize = () => {
      updateTargetProgress();
      render();
    };

    updateTargetProgress();
    currentP = targetP;
    render();

    const loginEl = document.querySelector('.app-content-login');
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    if (loginEl) {
      loginEl.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onResize);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (loginEl) {
        loginEl.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('resize', onResize);
      const firstMediaImg = media.querySelector<HTMLImageElement>('img');
      if (firstMediaImg) firstMediaImg.style.opacity = '';
      if (list) {
        list.style.opacity = '';
        list.style.transform = '';
      }
    };
  }, [plans.length, plansLoading]);

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
          '@type': 'Course', name: plan.name, description: PLAN_CONTENT[plan.code]?.summary || plan.description,
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

  const planSummary = (plan: PublicAccessPlan): PlanContent => PLAN_CONTENT[plan.code] || {
    audience: plan.description || 'Guided KMTI training in iCAD SX.',
    scope: 'Guided course content',
    summary: plan.description || 'Guided KMTI training in iCAD SX.',
    includes: ['Guided course content', 'Progress tracking', 'KMTI training support'],
    image: icadInterfacePreview,
    imageAlt: 'A KMTI training lesson in iCAD SX',
    imageSize: [840, 480],
  };

  return (
    <div className="landing-container">
      <a className="landing-skip-link" href="#landing-main">Skip to main content</a>

      <nav className="landing-nav" aria-label="Public navigation">
        <div className="nav-logo">
          <span className="logo-icon-wrapper"><img src={kmtiTrainingHubLogo} alt="" /></span>
          <span className="logo-text">KMTI Training Hub</span>
        </div>
        <button className="landing-menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="landing-navigation-menu" onClick={() => setMobileMenuOpen(open => !open)}>
          <span className="landing-menu-bar" aria-hidden="true" />
          <span className="landing-menu-bar" aria-hidden="true" />
        </button>
        <div id="landing-navigation-menu" className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a className="landing-navigation-menu-link" href="#overview" onClick={event => scrollToSection(event, 'overview')}>What you learn</a>
          <a className="landing-navigation-menu-link" href="#plans" onClick={event => scrollToSection(event, 'plans')}>Plans</a>
          <a className="landing-navigation-menu-link" href="#how-it-works" onClick={event => scrollToSection(event, 'how-it-works')}>How it works</a>
          <a className="landing-navigation-menu-link" href="#faq" onClick={event => scrollToSection(event, 'faq')}>FAQ</a>
        </div>
        <div className={`nav-actions ${mobileMenuOpen ? 'open' : ''}`}>
          <button className="btn-primary-small" onClick={() => navigate('/login')}>Sign in</button>
        </div>
      </nav>

      <main id="landing-main">
        <header className="hero-section" ref={heroRef}>
          <HeroShapes />
          <h1>
            Learn iCAD SX,<br />
            from first click to finished drawing.
          </h1>
          <p className="hero-subtitle">
            Browser-based lessons that follow the real iCAD SX screens, with a short check after each one.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>See training plans</button>
            <button className="btn-link" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>What you learn <ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
          <div className="hero-figure-spacer" ref={heroSpacerRef}>
            <figure className="hero-figure" ref={heroFigureRef}>
              <img src={icadInterfacePreview} alt="An iCAD Foundations lesson showing the iCAD SX interface" decoding="async" {...{ fetchpriority: "high" }} />
            </figure>
          </div>
        </header>

        {plans.length > 0 && <section
          id="overview"
          className="plan-showcase"
          aria-labelledby="plan-overview-title"
          ref={showcaseRef}
          style={{ '--plan-count': plans.length } as React.CSSProperties}
        >
          <div className="plan-showcase-sticky">
            <div className="plan-showcase-list" ref={listRef}>
              <h2 id="plan-overview-title" className="sr-only">What each plan covers</h2>
              {plans.map((plan, index) => {
                const summary = planSummary(plan);
                const isActive = index === activePlan;
                const isCompleted = index < activePlan;
                const entryClasses = ['plan-showcase-entry'];
                if (isActive) entryClasses.push('active');
                if (isCompleted) entryClasses.push('completed');
                return <div
                  className={entryClasses.join(' ')}
                  key={plan.id}
                >
                  <h3>
                    <button type="button" aria-expanded={isActive} aria-controls={`plan-panel-${plan.id}`} onClick={() => scrollToPlan(index)}>
                      {plan.name}
                      <ChevronDown size={18} aria-hidden="true" className="plan-showcase-chevron" />
                    </button>
                  </h3>
                  <div className="plan-showcase-detail" id={`plan-panel-${plan.id}`} hidden={!isActive}>
                    <p className="plan-showcase-lead">{summary.audience}</p>
                    <p>{summary.summary}</p>
                    <p className="plan-showcase-scope">{summary.scope}</p>
                    <button type="button" className="btn-link" onClick={() => requestAccess(plan.code)}>Request access <ArrowUpRight size={16} aria-hidden="true" /></button>
                  </div>
                </div>;
              })}
            </div>
            <div className="plan-showcase-media" ref={mediaRef}>
              {plans.map((plan, index) => {
                const summary = planSummary(plan);
                return <img
                  key={plan.id}
                  src={summary.image}
                  alt={summary.imageAlt}
                  width={summary.imageSize[0]}
                  height={summary.imageSize[1]}
                  decoding="async"
                  loading={index === 0 ? undefined : 'lazy'}
                  hidden={index !== activePlan}
                />;
              })}
            </div>
          </div>
        </section>}

        <section id="plans" className="plans-section">
          <div className="section-header">
            <h2>Training plans</h2>
            <p>Each plan covers a level of iCAD SX work. You can move up a level later.</p>
          </div>

          {plansLoading && <div className="landing-plans-status" role="status" aria-live="polite">Loading training plans…</div>}
          {plansError && <div className="landing-plans-status error" role="alert"><span>{plansError}</span><button type="button" onClick={() => void loadPlans()}>Try again</button></div>}
          {!plansLoading && !plansError && plans.length === 0 && <div className="landing-plans-status">No public training plans are currently available.</div>}

          {!plansLoading && plans.length > 0 && <>
            <div className="plan-grid">
              {plans.map(plan => {
                const summary = planSummary(plan);
                const price = formatPlanPrice(plan);
                const isPopular = plan.code === 'icad-professional';
                return <article className={`plan-card ${isPopular ? 'popular' : ''}`} key={plan.id}>
                  {isPopular && <div className="plan-popular-badge">Most Popular</div>}
                  <div className="plan-card-header">
                    <h3>{plan.name}</h3>
                    <p className="plan-audience">{summary.audience}</p>
                    <div className="plan-scope-pill">{summary.scope}</div>
                  </div>
                  <ul className="plan-includes">
                    {summary.includes.map(item => (
                      <li key={item}>
                        <span className="plan-check-icon" aria-hidden="true">
                          <Check size={13} strokeWidth={2.6} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="plan-card-footer">
                    <p className="plan-price">{price ? <><strong>{price}</strong><span className="period">{planInterval(plan)}</span></> : 'Contact us for pricing'}</p>
                    <button type="button" className={`btn-primary full-width ${isPopular ? 'popular-btn' : ''}`} onClick={() => requestAccess(plan.code)}>Request access to {plan.name}</button>
                  </div>
                </article>;
              })}
            </div>
            <p className="plan-access-note">Apply for a plan, verify your email, and a KMTI administrator reviews your application. Access and billing are arranged on approval.</p>
          </>}
        </section>

        <section id="how-it-works" className="steps-section">
          <div className="section-header">
            <h2>How it works</h2>
          </div>
          <ol className="steps-list">
            <li><span className="step-number">1</span><h3>Apply for a plan</h3><p>Register and choose the level that matches your experience.</p></li>
            <li><span className="step-number">2</span><h3>Learn at your pace</h3><p>Work through the lessons in the browser. Your progress is saved as you go.</p></li>
            <li><span className="step-number">3</span><h3>Check your understanding</h3><p>Finish the knowledge checks and practical work for your level.</p></li>
          </ol>
        </section>

        <section id="faq" className="landing-faq-section">
          <div className="section-header"><h2>Frequently asked questions</h2></div>
          <div className="landing-faq-list">
            <details><summary>Do I need previous iCAD experience?</summary><p>No. iCAD Foundations starts with the workspace, essential controls, and basic navigation for new learners.</p></details>
            <details><summary>How do I receive access after registering?</summary><p>Submit your registration and verify your email. A KMTI administrator reviews the application and you will receive an approval notice when your account is activated.</p></details>
            <details><summary>How is pricing handled?</summary><p>Plan pricing and billing are arranged with KMTI when your application is approved. Contact your KMTI training administrator for current pricing.</p></details>
            <details><summary>Can I upgrade my plan later?</summary><p>Yes. Once signed in, you can review the available training plans and request an upgrade from your learner account.</p></details>
            <details><summary>Can I learn on my own schedule?</summary><p>Yes. Lessons are browser-based and your progress is saved, subject to the access period assigned to your plan.</p></details>
          </div>
        </section>
      </main>

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
          <p>&copy; {new Date().getFullYear()} Kusakabe &amp; Maeno Tech., Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
