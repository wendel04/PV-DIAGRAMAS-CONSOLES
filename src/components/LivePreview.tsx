/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, Zap, Award, Users2, ShieldAlert, BadgePercent, 
  GraduationCap, TrendingUp, Lock, Coins, MessageSquareText, 
  HelpCircle, CheckCircle, Video, Shield, Check, Star, 
  ShieldCheck, Play, VolumeX, Volume2, RefreshCw, AlertCircle, ShoppingCart 
} from 'lucide-react';
import { SalesPageConfig, PriceTier } from '../types';

interface LivePreviewProps {
  config: SalesPageConfig;
  onOpenCheckout: (tier: PriceTier) => void;
}

// Icon mapper to safely select Lucide Icons without causing bundling errors
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Cpu, Zap, Award, Users2, ShieldAlert, BadgePercent, 
  GraduationCap, TrendingUp, Lock, Coins, MessageSquareText, 
  HelpCircle, CheckCircle, Video, Shield
};

export default function LivePreview({ config, onOpenCheckout }: LivePreviewProps) {
  // Countdown state in seconds
  const [timeLeft, setTimeLeft] = useState(config.countdownMinutes * 60);
  
  // VSL Simulation States
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(15); // Percentage
  const [videoSoundMuted, setVideoSoundMuted] = useState(true);
  
  // FAQ Collapsible States
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Purchase Toast Simulation
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Reset countdown if config minutes change
  useEffect(() => {
    setTimeLeft(config.countdownMinutes * 60);
  }, [config.countdownMinutes]);

  // Countdown timer ticking
  useEffect(() => {
    if (timeLeft <= 0) {
      // Loop or restart for conversion mockup
      setTimeLeft(config.countdownMinutes * 60);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, config.countdownMinutes]);

  // Video Progress ticking
  useEffect(() => {
    if (videoPlaying) {
      const interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 98) return 5; // Loop video timeline
          return prev + 0.5;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [videoPlaying]);

  // Live Purchase Notifications
  useEffect(() => {
    const triggerToast = () => {
      const names = config.purchaseAlertNames && config.purchaseAlertNames.length > 0 
        ? config.purchaseAlertNames 
        : ["Mariana Costa", "Felipe Almeida", "Gisele Santos", "Henrique Xavier"];
      
      const randomName = names[Math.floor(Math.random() * names.length)];
      const minAgo = Math.floor(Math.random() * 4) + 1;
      const isPix = Math.random() > 0.4;
      
      const message = isPix 
        ? `🔥 ${randomName} acabou de garantir acesso via PIX há ${minAgo} min!`
        : `🎉 ${randomName} comprou no cartão de crédito há ${minAgo} min!`;

      setToastMessage(message);
      setShowToast(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    };

    // Trigger first toast after 4s, then repeat every 18s
    const firstTrigger = setTimeout(triggerToast, 4000);
    const interval = setInterval(triggerToast, 18000);

    return () => {
      clearTimeout(firstTrigger);
      clearInterval(interval);
    };
  }, [config.purchaseAlertNames]);

  // Helpers to format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Helper to render icon dynamically
  const renderDynamicIcon = (iconName: string, className = "w-5 h-5") => {
    const IconComponent = iconMap[iconName] || Zap;
    return <IconComponent className={className} />;
  };

  // Theme-specific CSS styles
  const getThemeStyles = () => {
    switch (config.theme) {
      case 'deep-dark':
        return {
          wrapper: 'bg-zinc-950 text-zinc-100',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400',
          accentText: 'text-zinc-250',
          buttonClass: 'bg-white hover:bg-zinc-100 text-zinc-950 font-bold active:scale-[0.98]',
          badgeClass: 'bg-zinc-900 border border-zinc-800 text-zinc-300',
          cardClass: 'bg-zinc-900/50 border border-zinc-800/80',
          faqOpenClass: 'bg-zinc-900/40 border-zinc-800',
          themeBorder: 'border-zinc-800'
        };
      case 'midnight-blue':
        return {
          wrapper: 'bg-slate-950 text-slate-100',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400',
          accentText: 'text-sky-400',
          buttonClass: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-95 text-white active:scale-[0.98]',
          badgeClass: 'bg-blue-950/50 border border-blue-900/80 text-blue-300',
          cardClass: 'bg-slate-900/70 border border-slate-800/80',
          faqOpenClass: 'bg-slate-900 border-slate-800',
          themeBorder: 'border-slate-800'
        };
      case 'minimal-indigo':
        return {
          wrapper: 'bg-zinc-950 text-zinc-100',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400',
          accentText: 'text-indigo-400',
          buttonClass: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:indigo-700 text-white font-bold active:scale-[0.98]',
          badgeClass: 'bg-indigo-950/60 border border-indigo-900/80 text-indigo-300',
          cardClass: 'bg-zinc-900/60 border border-zinc-805/70',
          faqOpenClass: 'bg-indigo-950/20 border-indigo-900/30',
          themeBorder: 'border-zinc-800'
        };
      case 'clean-emerald':
        return {
          wrapper: 'bg-slate-950 text-white',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200',
          accentText: 'text-emerald-400',
          buttonClass: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-slate-950 font-black active:scale-[0.98]',
          badgeClass: 'bg-emerald-950/40 border border-emerald-900/50 text-emerald-300',
          cardClass: 'bg-slate-900/50 border border-slate-800',
          faqOpenClass: 'bg-emerald-950/10 border-emerald-900/30',
          themeBorder: 'border-slate-800'
        };
      case 'hotmart-pink':
        return {
          wrapper: 'bg-stone-950 text-stone-100',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400',
          accentText: 'text-pink-400',
          buttonClass: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-95 text-white active:scale-[0.98]',
          badgeClass: 'bg-pink-950/45 border border-pink-900/65 text-pink-300',
          cardClass: 'bg-stone-900/60 border border-stone-800/80',
          faqOpenClass: 'bg-pink-950/20 border-pink-900/40',
          themeBorder: 'border-stone-800'
        };
      case 'premium-gold':
      default:
        return {
          wrapper: 'bg-slate-950 text-slate-100',
          gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-yellow-400',
          accentText: 'text-amber-400',
          buttonClass: 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 text-slate-950 font-extrabold active:scale-[0.98] shadow-lg shadow-amber-500/10',
          badgeClass: 'bg-amber-950/50 border border-amber-900/40 text-amber-300',
          cardClass: 'bg-slate-900/40 border border-slate-800/80',
          faqOpenClass: 'bg-amber-950/15 border-amber-900/30',
          themeBorder: 'border-slate-900'
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className={`w-full min-h-full font-sans transition-all duration-300 relative ${themeStyle.wrapper}`} id="sales-page-root">
      
      {/* 1. Header Scarcity Anchor */}
      <header className="w-full bg-red-650 text-white text-center py-2 px-4 flex items-center justify-center gap-2 text-xs font-bold font-mono tracking-wide shadow-md" id="sales-page-top-accent">
        <span className="w-2.5 h-2.5 rounded-full bg-white block animate-ping shrink-0" />
        <span>{config.vslBadge}</span>
      </header>

      {/* Hero Container */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center space-y-6" id="hero-section">
        
        {/* Dynamic Warning Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase animate-bounce" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }} id="hero-warning">
          ⚠️ ATENÇÃO: As inscrições encerram hoje às 23:59. Vagas remanescentes.
        </div>

        {/* Sales Headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12]" id="sales-headline">
          <span className={themeStyle.gradientText}>
            {config.headline}
          </span>
        </h1>

        {/* Sub headline pitch */}
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" id="sales-subheadline">
          {config.subheadline}
        </p>

        {/* 2. Interactive VSL Simulated Player */}
        <div className="max-w-2xl mx-auto mt-8 relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black aspect-video group" id="vsl-simulator-container">
          
          {videoPlaying ? (
            <div className="w-full h-full flex flex-col justify-between p-4 relative" id="vsl-playing-canvas">
              {/* Fake overlay warning */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex justify-between items-center text-[10px] text-zinc-300 font-mono">
                  <span className="bg-red-600/80 text-white px-2 py-0.5 rounded uppercase font-bold animate-pulse">AO VIVO</span>
                  <span className="flex items-center gap-1"><Users2 className="w-3" /> 1,424 assistindo agora</span>
                </div>
                
                {/* Audio sound muted reminder overlay */}
                {videoSoundMuted && (
                  <div className="mx-auto bg-slate-950/90 text-white px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3 shadow-lg pointer-events-auto transform transition active:scale-95 cursor-pointer max-w-xs animate-pulse" onClick={() => setVideoSoundMuted(false)}>
                    <VolumeX className="w-5 h-5 text-amber-500 animate-bounce" />
                    <div className="text-left">
                      <p className="text-xs font-bold leading-none">O VÍDEO COMPLETO ESTÁ MUDO</p>
                      <p className="text-[10px] text-zinc-400 mt-1 leading-[1.1]">Clique para ativar o áudio oficial</p>
                    </div>
                  </div>
                )}

                {/* Simulated controls strip */}
                <div className="flex items-center justify-between text-[11px] text-zinc-300 font-mono w-full pointer-events-auto pt-4 border-t border-white/5 bg-slate-950/70 p-2 rounded-lg gap-3">
                  <button 
                    onClick={() => setVideoPlaying(false)}
                    className="p-1 hover:text-white rounded shrink-0"
                    title="Pausar"
                  >
                    <span>Pausar</span>
                  </button>
                  
                  {/* Timeline bar */}
                  <div className="flex-1 h-1.5 bg-zinc-700 rounded overflow-hidden relative cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setVideoProgress((clickX / rect.width) * 100);
                  }}>
                    <div className="absolute top-0 bottom-0 left-0 bg-red-600 rounded-r" style={{ width: `${videoProgress}%` }} />
                  </div>

                  <span className="shrink-0 text-[10px]">14:21 / 25:00</span>
                  
                  <button 
                    onClick={() => setVideoSoundMuted(!videoSoundMuted)}
                    className="p-1 hover:text-white rounded shrink-0 flex items-center gap-1"
                  >
                    {videoSoundMuted ? <VolumeX className="w-3.5 h-3.5 text-yellow-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Fake visual presentation content */}
              <div className="w-full h-full flex flex-col justify-center items-center font-mono space-y-3.5 bg-gradient-to-b from-slate-900 to-zinc-950 z-[-1] select-none p-6" id="vsl-visual-slides">
                <ShieldCheck className="w-12 h-12 text-emerald-400 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-amber-400 font-black text-center text-sm md:text-lg select-none leading-tight uppercase">MÉTODO IA SCALER ATIVO</p>
                  <p className="text-zinc-500 text-[10px] md:text-xs">Estruturando módulo comercial e faturamento recorrente...</p>
                </div>
                
                {/* Fake sound wave anim */}
                <div className="flex items-end justify-center gap-1 h-8 mt-2">
                  {[...Array(12)].map((_, i) => {
                    const rndH = [24, 15, 30, 10, 20, 28, 8, 25, 18, 32, 12, 16];
                    return (
                      <span 
                        key={i} 
                        className="w-1 bg-gradient-to-t from-red-600 to-amber-500 rounded-t"
                        style={{ 
                          height: videoPlaying ? `${rndH[i % rndH.length]}px` : '4px',
                          transition: 'height 0.3s ease-in-out',
                          animation: videoPlaying ? `sound-wave ${0.6 + (i * 0.1)}s ease infinite alternate` : 'none'
                        }} 
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 cursor-pointer" onClick={() => setVideoPlaying(true)} id="vsl-paused-canvas">
              <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110">
                <Play className="w-6 h-6 fill-current hover:animate-ping" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-4 leading-none">O Vídeo está Pausado</p>
              <p className="text-[10px] text-zinc-500 mt-1.5">Clique para continuar assistindo à apresentação secreta</p>
            </div>
          )}

        </div>

        {/* Under VSL conversion details */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 mt-3 font-mono" id="vsl-metadata">
          <span className="flex items-center gap-1">🔒 Conexão SSL Segura</span>
          <span className="flex items-center gap-1">📺 Alta Fidelidade Estéreo</span>
          <span className="flex items-center gap-1">🌐 Dispositivo Autorizado</span>
        </div>

        {/* 3. SCARCITY COUNTDOWN COMPONENT */}
        <div className="pt-6 max-w-md mx-auto" id="scarcity-countdown-box">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 flex flex-col items-center space-y-2">
            <span className="text-[10px] text-red-400 font-bold tracking-wider uppercase font-mono">⚠️ OFERTA COM DESCONTO EXPIRA EM OUT:</span>
            
            <div className="flex gap-2 items-center text-2xl font-black font-mono text-red-500" id="live-timer-numbers">
              <div className="bg-red-950/30 px-3 py-1 rounded border border-red-900/20">{formatTime(timeLeft).split(':')[0]}</div>
              <span className="animate-pulse">:</span>
              <div className="bg-red-950/30 px-3 py-1 rounded border border-red-900/20">{formatTime(timeLeft).split(':')[1]}</div>
            </div>

            <p className="text-[10px] text-slate-400">Após o cronômetro zerar, a página voltará ao preço original de R$ 997,00.</p>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTION */}
        <div className="pt-4" id="main-conversion-cta">
          <button 
            onClick={() => {
              // Trigger checkout for the first available or popular tier
              const popular = config.priceTiers.find(t => t.isPopular) || config.priceTiers[0];
              if (popular) onOpenCheckout(popular);
            }}
            className={`w-full max-w-lg px-8 py-4.5 rounded-2xl text-sm md:text-base font-black uppercase tracking-wide shadow-xl transform transition hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group ${themeStyle.buttonClass}`}
            id="btn-trigger-cta-main"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition shrink-0" />
            <span>{config.primaryCtaText}</span>
          </button>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] text-zinc-500 mt-3" id="main-cta-seals">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Acesso Imediato</span>
            <span className="flex items-center gap-1"><RefreshCw className="w-3 text-emerald-500" /> Satisfação Assegurada</span>
            <span className="flex items-center gap-1"><Check className="w-3 text-emerald-500" /> Compra Garantida</span>
          </div>
        </div>

      </section>

      {/* 4. FEATURES & MODULES SHOWCASE (Bento Grid or elegant rows) */}
      <section className={`py-16 md:py-20 border-t ${themeStyle.themeBorder} px-4 max-w-5xl mx-auto`} id="features-section">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xl md:text-3xl font-black tracking-tight" id="features-section-title">
            {config.featuresTitle}
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm max-w-xl mx-auto" id="features-section-subtitle">
            {config.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="features-grid">
          {config.features.map((feature) => (
            <div 
              key={feature.id}
              className={`p-6 rounded-2xl transition hover:border-slate-700 duration-200 flex flex-col justify-between ${themeStyle.cardClass}`}
              id={`feature-card-${feature.id}`}
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-lg w-fit ${themeStyle.badgeClass}`} id={`feature-icon-wrapper-${feature.id}`}>
                  {renderDynamicIcon(feature.icon, `w-5 h-5 ${themeStyle.accentText}`)}
                </div>
                <h3 className="font-bold text-base text-white tracking-tight" id={`feature-title-${feature.id}`}>{feature.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed" id={`feature-description-${feature.id}`}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUTHOR / SPECIALIST SECTION */}
      <section className={`py-14 md:py-16 bg-slate-950 px-4 border-t ${themeStyle.themeBorder}`} id="author-section">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center" id="author-container">
          
          <div className="flex flex-col items-center text-center space-y-3" id="author-left-panel">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-slate-800/80 shadow-lg relative" id="author-avatar-wrapper">
              <img 
                src={config.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80"} 
                alt={config.authorName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                id="author-avatar-img"
              />
            </div>
            <div>
              <h4 className="font-black text-white text-base leading-none" id="author-name-tag">{config.authorName}</h4>
              <p className="text-[10px] text-zinc-400 mt-1 leading-normal" id="author-role-tag">{config.authorRole}</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 text-zinc-300 text-xs md:text-sm leading-relaxed" id="author-right-panel">
            <div className={`px-2.5 py-0.5 rounded text-[9px] font-black tracking-widest uppercase inline-block border ${themeStyle.accentText} ${themeStyle.badgeClass}`}>
              CONHEÇA SEU MENTOR
            </div>
            <p id="author-bio-p">
              {config.authorBio}
            </p>
            {config.authorSignature && (
              <p className="font-mono text-[11px] italic text-zinc-500 border-l-2 border-slate-800 pl-3 pt-1 mt-3" id="author-signature-p">
                "{config.authorSignature}"
              </p>
            )}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS / PROVA SOCIAL */}
      <section className={`py-16 md:py-20 px-4 border-t ${themeStyle.themeBorder} max-w-5xl mx-auto`} id="testimonials-section">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1 text-[10px] text-yellow-550 bg-yellow-501/10 px-2 py-0.5 rounded font-black font-mono">
            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
            <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
            <span className="text-yellow-400 ml-1">4.9 / 5 ESTRELAS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2" id="testimonials-title">
            {config.testimonialsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
          {config.testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`p-6 rounded-2xl flex flex-col justify-between space-y-4 ${themeStyle.cardClass}`}
              id={`testimonial-card-${testimonial.id}`}
            >
              <div className="space-y-3">
                {/* Visual Stars */}
                <div className="flex gap-0.5 text-yellow-500" id={`stars-wrapper-${testimonial.id}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current shrink-0" />
                  ))}
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed italic" id={`testimonial-content-${testimonial.id}`}>
                  "{testimonial.content}"
                </p>
              </div>

              {/* User Bio Footer */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5" id={`testimonial-user-${testimonial.id}`}>
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-700 bg-slate-800">
                  <img 
                    src={testimonial.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${testimonial.id}`} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    id={`testimonial-avatar-${testimonial.id}`}
                  />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white" id={`testimonial-name-${testimonial.id}`}>{testimonial.name}</h5>
                  <p className="text-[9px] text-zinc-500 mt-0.5 font-mono" id={`testimonial-role-${testimonial.id}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PRICING OFFERS & INSTANT SECURE CHECKOUT CHANNELS */}
      <section className={`py-16 md:py-20 px-4 bg-slate-950 border-t ${themeStyle.themeBorder}`} id="pricing-section">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-white" id="pricing-title">
              {config.priceTitle}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm max-w-md mx-auto" id="pricing-subtitle">
              {config.priceSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="pricing-tiers-grid">
            {config.priceTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-3xl p-6 md:p-8 flex flex-col justify-between relative transition duration-200 ${
                  tier.isPopular 
                    ? 'border-2 border-amber-400 bg-slate-900 shadow-2xl shadow-amber-400/5 sm:scale-105' 
                    : `${themeStyle.cardClass} bg-slate-900/40`
                }`}
                id={`price-tier-card-${tier.id}`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-widest block whitespace-nowrap shadow" id="popular-badge-label">
                    MAIS VENDIDO ⭐
                  </span>
                )}

                <div className="space-y-6">
                  {/* Header Tier */}
                  <div className="text-center md:text-left">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono font-bold" id={`tier-badge-${tier.id}`}>{tier.badge}</p>
                    <h3 className="font-extrabold text-lg text-white mt-1.5" id={`tier-name-${tier.id}`}>{tier.name}</h3>
                  </div>

                  {/* Pricing Display */}
                  <div className="text-center py-4 bg-slate-900/50 rounded-2xl border border-white/5 space-y-1" id={`tier-pricing-wrap-${tier.id}`}>
                    <span className="text-[10px] text-zinc-500 line-through">De R$ {tier.originalPrice.toFixed(2)}</span>
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <span className="text-xs text-zinc-400">Por apenas</span>
                      <strong className="text-2xl font-black leading-none text-white">12x de R$</strong>
                      <strong className="text-4xl font-black leading-none text-white tracking-tight" id={`tier-installment-value-${tier.id}`}>
                        {tier.installmentsValue.toFixed(2)}
                      </strong>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold block bg-emerald-950/20 px-2 py-0.5 rounded mt-2 mx-auto w-fit">
                      Ou R$ {tier.currentPrice.toFixed(2)} à vista (PIX ou boleto)
                    </span>
                  </div>

                  {/* Feature lists */}
                  <ul className="space-y-3 text-xs text-zinc-300" id={`tier-features-list-${tier.id}`}>
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} className="flex gap-2 items-start" id={`tier-feature-${tier.id}-${fidx}`}>
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secure checkout btn */}
                <div className="pt-8 w-full" id={`tier-cta-button-wrapper-${tier.id}`}>
                  <button
                    onClick={() => onOpenCheckout(tier)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow transform transition hover:-translate-y-0.5 active:translate-y-0 ${
                      tier.isPopular 
                        ? 'bg-amber-450 hover:bg-amber-500 text-slate-950 font-black' 
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    }`}
                    id={`btn-checkout-tier-${tier.id}`}
                  >
                    {tier.ctaText}
                  </button>
                  <p className="text-[9px] text-zinc-500 text-center mt-2.5 font-mono">🔒 Transação criptografada • Acesso Instantâneo</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. REFUND GUARANTEE IN CONDICIONAL */}
      <section className={`py-16 md:py-20 text-center px-4 max-w-4xl mx-auto border-t ${themeStyle.themeBorder}`} id="guarantee-section">
        <div className="p-6 md:p-10 rounded-3xl bg-slate-900 border border-slate-800/80 flex flex-col items-center max-w-3xl mx-auto space-y-6" id="guarantee-box">
          
          <div className="relative animate-pulse shrink-0" id="guarantee-badge">
            <Shield className="w-16 h-16 text-amber-500/80" />
            <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-amber-500 text-xs">
              {config.guaranteeDays}D
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight" id="guarantee-title">
              GARANTIA DE REEMBOLSO INCONDICIONAL DE {config.guaranteeDays} DIAS
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-2xl mx-auto" id="guarantee-text">
              {config.guaranteeText}
            </p>
          </div>

          <div className="flex gap-2 text-[10px] text-zinc-500 font-mono" id="guarantee-security-seals">
            <span>✓ Risco Zero</span>
            <span>•</span>
            <span>✓ Devolução 100%</span>
            <span>•</span>
            <span>✓ Suporte Directo</span>
          </div>

        </div>
      </section>

      {/* 8. FAQS COLLAPSIBLE / DÚVIDAS FREQUENTES */}
      <section className={`py-16 md:py-20 px-4 max-w-3xl mx-auto border-t ${themeStyle.themeBorder}`} id="faq-section">
        <h2 className="text-xl md:text-2xl font-black text-center text-white mb-8" id="faq-section-title">
          {config.faqTitle}
        </h2>

        <div className="space-y-4" id="faq-accordions">
          {config.faqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`rounded-2xl border transition duration-200 overflow-hidden cursor-pointer ${
                  isExpanded ? themeStyle.faqOpenClass : 'border-slate-800 bg-slate-950'
                }`}
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                id={`faq-item-${faq.id}`}
              >
                {/* Question row */}
                <div className="p-5 flex items-center justify-between text-left" id={`faq-question-row-${faq.id}`}>
                  <h4 className="font-bold text-xs md:text-sm text-white pr-4 leading-snug" id={`faq-question-${faq.id}`}>{faq.question}</h4>
                  <span className={`text-slate-400 shrink-0 transform transition-transform duration-200 text-xs ${isExpanded ? 'rotate-180' : ''}`} id={`faq-arrow-${faq.id}`}>
                    ▼
                  </span>
                </div>

                {/* Collapsible Answer */}
                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[300px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} id={`faq-answer-container-${faq.id}`}>
                  <p className="p-5 text-xs text-zinc-400 leading-relaxed bg-black/10" id={`faq-answer-${faq.id}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-center text-zinc-600 text-[10px] space-y-2 px-4" id="sales-page-footer">
        <p className="max-w-2xl mx-auto uppercase tracking-wider font-mono">
          © {new Date().getFullYear()} {config.authorName}. Todos os direitos reservados.
        </p>
        <p className="max-w-3xl mx-auto leading-relaxed text-zinc-650">
          Este site não é afiliado ao Google, Facebook ou qualquer outra entidade de mídia social. Os resultados demonstrados são simulações de depoimentos com fins meramente opinativos e de ensino. Ganhos financeiros reais dependem puramente da aplicação e dedicação profissional.
        </p>
      </footer>

      {/* HIGHLY COMPELLING PURCHASE ALERT NOTIFICATION TOAST */}
      <div 
        className={`fixed bottom-4 left-4 z-40 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-850/80 flex items-center gap-3 max-w-sm transition-all duration-500 transform ${
          showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
        id="live-sales-toast"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
        <div className="text-xs">
          <p className="font-bold text-slate-100 leading-tight">Nova Inscrição Simula!</p>
          <p className="text-zinc-400 text-[10px] mt-0.5 leading-normal">{toastMessage}</p>
        </div>
      </div>

    </div>
  );
}
