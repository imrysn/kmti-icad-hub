import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Box, BookOpen, MessageCircle, PlayCircle, ShieldCheck, ChevronRight, Sparkles, Target } from 'lucide-react';
import '../styles/LandingView.css';

export const LandingView: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = (plan: string) => {
    navigate(`/register?plan=${encodeURIComponent(plan)}`);
  };

  useEffect(() => {
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

  return (
    <div className="landing-container">
      {/* Dynamic Background */}
      <div className="landing-bg-mesh">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="landing-nav glass-panel">
        <div className="nav-logo">
          <div className="logo-icon-wrapper">
            <Box size={20} strokeWidth={2.5} />
          </div>
          <span className="logo-text">KMTI Hub</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-primary-small" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Started
          </button>
        </div>
      </nav>

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
              <div className="mockup-sidebar"></div>
              <div className="mockup-content">
                <div className="mockup-bar" style={{ width: '60%' }}></div>
                <div className="mockup-bar" style={{ width: '80%' }}></div>
                <div className="mockup-bar" style={{ width: '40%' }}></div>
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

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-header animate-on-scroll">
          <h2>Choose Your Path</h2>
          <p>Whether you're starting from scratch or upgrading your career, we have a plan for you.</p>
        </div>
        
        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="pricing-card glass-panel animate-on-scroll">
            <div className="pricing-header">
              <h3>iCAD Foundations</h3>
              <div className="price">
                <span className="currency">$</span>29<span className="period">/mo</span>
              </div>
            </div>
            <div className="pricing-body">
              <div className="plan-outcome">
                <Target size={16} className="outcome-icon" />
                <p><strong>What you'll achieve:</strong> Master the fundamental layout, tools, and basic navigation of iCAD. By the end, you'll be comfortable exploring the software and creating simple 3D primitives.</p>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} className="check-icon" /> Beginner-friendly tutorials</li>
                <li><CheckCircle size={18} className="check-icon" /> Basic UI navigation & origin</li>
                <li><CheckCircle size={18} className="check-icon" /> Direct Mentor Chat</li>
              </ul>
              <button className="btn-outline full-width" onClick={() => handleStartLearning('foundations')}>
                Start Foundations
              </button>
            </div>
          </div>

          {/* Plan 2 */}
          <div className="pricing-card glass-panel popular scale-up animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>iCAD Professionals</h3>
              <div className="price">
                <span className="currency">$</span>99<span className="period">/mo</span>
              </div>
            </div>
            <div className="pricing-body">
              <div className="plan-outcome">
                <Target size={16} className="outcome-icon" />
                <p><strong>What you'll achieve:</strong> Learn advanced 3D modeling operations and 2D detailing. By the end, you'll be able to create complex industrial parts and prepare them for manufacturing.</p>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} className="check-icon" /> Everything in Foundations</li>
                <li><CheckCircle size={18} className="check-icon" /> Advanced 3D Modeling manual</li>
                <li><CheckCircle size={18} className="check-icon" /> 2D Detailing manual</li>
                <li><CheckCircle size={18} className="check-icon" /> Practical Assignments</li>
              </ul>
              <button className="btn-primary full-width" onClick={() => handleStartLearning('professionals')}>
                Start Professionals
              </button>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="pricing-card glass-panel animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="pricing-header">
              <h3>iCAD Complete</h3>
              <div className="price">
                <span className="currency">$</span>199<span className="period">/mo</span>
              </div>
            </div>
            <div className="pricing-body">
              <div className="plan-outcome">
                <Target size={16} className="outcome-icon" />
                <p><strong>What you'll achieve:</strong> Master the entire workflow, from 3D modeling to full evaluation and certification. You'll achieve true proficiency, backed by priority support and a verifiable certificate.</p>
              </div>
              <ul className="plan-features">
                <li><CheckCircle size={18} className="check-icon" /> Everything in Professionals</li>
                <li><CheckCircle size={18} className="check-icon" /> Excel evaluation workflows</li>
                <li><CheckCircle size={18} className="check-icon" /> Priority Support</li>
                <li><ShieldCheck size={18} className="check-icon" /> Certification of Completion</li>
              </ul>
              <button className="btn-outline full-width" onClick={() => handleStartLearning('complete')}>
                Start Complete
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Box size={24} className="logo-icon" />
            <span>KMTI Training Hub</span>
          </div>
          <p>&copy; {new Date().getFullYear()} KMTI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
