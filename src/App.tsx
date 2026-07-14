/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  // 1. DATA DINÂMICA
  const [currentDate, setCurrentDate] = useState('');
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    setCurrentYear(today.getFullYear());
  }, []);

  // 2. TIMER DE URGÊNCIA (10 MINUTOS)
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatMinutes = () => Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const formatSeconds = () => (timeLeft % 60).toString().padStart(2, '0');

  // 3. NOTIFICAÇÃO DE VENDAS
  const buyers = [
    "João Pedro - SP", "Assistência GameFix", "Lucas Silva - MG", 
    "Console Center BR", "Mateus Almeida - RJ", "Oficina do Game", "Felipe Costa - PR", "Start Games Assistência"
  ];
  const [buyerName, setBuyerName] = useState("Nome do Cliente");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const triggerNotification = () => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setBuyerName(randomBuyer);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 5000);
    };

    const initialTimeout = setTimeout(triggerNotification, 3000);
    const periodicInterval = setInterval(triggerNotification, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(periodicInterval);
    };
  }, []);

  // 4. CARROSSEL NATIVO AUTO-SCROLL
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselTop = carouselTopRef.current;
    
    let scrollRAFBottom: number;
    let scrollRAFTop: number;
    const scrollSpeed = 1;

    const scrollCarouselBottom = () => {
      if (carousel) {
        carousel.scrollLeft += scrollSpeed;
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      scrollRAFBottom = requestAnimationFrame(scrollCarouselBottom);
    };

    const scrollCarouselTop = () => {
      if (carouselTop) {
        carouselTop.scrollLeft -= scrollSpeed;
        if (carouselTop.scrollLeft <= 1) {
          carouselTop.scrollLeft = carouselTop.scrollWidth / 2;
        }
      }
      scrollRAFTop = requestAnimationFrame(scrollCarouselTop);
    };

    if (carousel) {
      scrollRAFBottom = requestAnimationFrame(scrollCarouselBottom);
    }

    if (carouselTop) {
      // Set initial scroll to avoiding starting at zero limit
      carouselTop.scrollLeft = carouselTop.scrollWidth / 2;
      scrollRAFTop = requestAnimationFrame(scrollCarouselTop);
    }

    return () => {
      if (scrollRAFBottom) cancelAnimationFrame(scrollRAFBottom);
      if (scrollRAFTop) cancelAnimationFrame(scrollRAFTop);
    };
  }, []);

  // 5. SCROLL LEVE PARA A OFERTA
  const handleScrollToOffer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('oferta');
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Carousel item arrays for clean rendering
  const carouselImages = [
    { src: "https://i.imgur.com/pE3gfYRl.webp", alt: "Demonstração 1" },
    { src: "https://i.imgur.com/gwZsEwjl.webp", alt: "Demonstração 2" },
    { src: "https://i.imgur.com/7kVyaTdl.webp", alt: "Demonstração 3" },
    { src: "https://i.imgur.com/i4wYwZTl.webp", alt: "Demonstração 4" },
    { src: "https://i.imgur.com/gGlBGXwl.webp", alt: "Demonstração 5" },
    { src: "https://i.imgur.com/NFXDUjBl.webp", alt: "Demonstração 6" },
    { src: "https://i.imgur.com/ktoFOpHl.webp", alt: "Demonstração 7" },
    { src: "https://i.imgur.com/2JP3PRal.webp", alt: "Demonstração 8" },
    { src: "https://i.imgur.com/zzywBiml.webp", alt: "Demonstração 9" },
    { src: "https://i.imgur.com/xwwNH8El.webp", alt: "Demonstração 10" },
    { src: "https://i.imgur.com/i3ofUugl.webp", alt: "Demonstração 11" },
    { src: "https://i.imgur.com/NIlzeL2l.webp", alt: "Demonstração 12" },
    { src: "https://i.imgur.com/gR9eQp9l.webp", alt: "Demonstração 13" },
    { src: "https://i.imgur.com/9QPw1sol.webp", alt: "Demonstração 14" },
    { src: "https://i.imgur.com/doJficVl.webp", alt: "Demonstração 15" }
  ];

  const carouselImagesTop = [
    { src: "https://i.imgur.com/1wGfI07l.webp", alt: "Esquema Técnico 1" },
    { src: "https://i.imgur.com/MoJUrjMl.webp", alt: "Esquema Técnico 2" },
    { src: "https://i.imgur.com/pPu8kLul.webp", alt: "Esquema Técnico 3" },
    { src: "https://i.imgur.com/wS4UzwMl.webp", alt: "Esquema Técnico 4" },
    { src: "https://i.imgur.com/o7oniN3l.webp", alt: "Esquema Técnico 5" },
    { src: "https://i.imgur.com/4Tt7R1Vl.webp", alt: "Esquema Técnico 6" },
    { src: "https://i.imgur.com/WNeXsKql.webp", alt: "Esquema Técnico 7" },
    { src: "https://i.imgur.com/D5IgRwkl.webp", alt: "Esquema Técnico 8" },
    { src: "https://i.imgur.com/XolV2WMl.webp", alt: "Esquema Técnico 9" }
  ];

  return (
    <>
      {/* FAIXA DE TOPO - Destaque de Urgência em Vermelho Vibrante */}
      <div id="top-bar" className="bg-[#dc2626] text-white text-center py-2 px-2 sm:px-4 text-[11px] sm:text-sm font-bold text-balance border-b border-[#dc2626] shadow-md z-50 relative">
        Atenção: Oferta especial válida apenas hoje, <span id="dynamic-date" className="underline decoration-white/50 whitespace-nowrap">{currentDate || "obtendo data..."}</span>! 🔥
      </div>

      {/* BLOCO 1: VENDA IMEDIATA (HERO) - SEÇÃO ESCURA (#081a3e) */}
      <section id="hero-section" className="bg-[#081a3e] text-white pt-10 pb-16 sm:pt-12 sm:pb-20 px-4 relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#1e3a8a]/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1e3a8a]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          
          <div id="safety-badge" className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#051126] text-slate-300 border border-[#a3e635]/40 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold mb-6 whitespace-nowrap tracking-wide shadow-[0_0_15px_rgba(163,230,53,0.15)]">
            🔒 COMPRA 100% SEGURA E PROTEGIDA
          </div>
          
          <h1 id="hero-title" className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 sm:mb-8 text-balance font-sans tracking-tight">
            Tenha <span className="text-[#a3e635] underline decoration-4 decoration-[#a3e635]/25 underline-offset-[6px]">+ de 150 diagramas elétricos</span> de consoles e <span className="bg-gradient-to-r from-[#a3e635] via-[#bef264] to-[#a3e635] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(163,230,53,0.15)]">descubra defeito na placa em 5 minutos</span>
          </h1>
          
          {/* Imagem Otimizada com drop-shadow técnico */}
          <div id="main-mockup-container" className="w-full max-w-4xl aspect-video flex items-center justify-center mt-6 mb-10 sm:mt-0 sm:mb-10 relative">
            <img 
              src="https://i.imgur.com/fasv8Xu.webp" 
              alt="Mockup Principal do Pack" 
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-contain px-1 sm:px-4 py-2 drop-shadow-[0_0_35px_rgba(30,58,138,0.4)] scale-[1.24] sm:scale-[1.15]" 
            />
          </div>
          
          <p id="hero-subtitle" className="text-sm sm:text-lg md:text-xl text-slate-300 mb-8 max-w-2xl font-bold text-balance px-2">
            Saiba exatamente onde testar na placa e encontre o defeito muito mais rápido
          </p>
          
          <div id="hero-cta-group" className="flex flex-col items-center gap-3 sm:gap-4 w-full px-2">
            <a 
              href="#oferta" 
              onClick={handleScrollToOffer}
              className="w-full sm:w-auto bg-[#a3e635] hover:bg-[#bef264] text-[#051126] font-extrabold text-sm sm:text-xl px-4 sm:px-12 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(163,230,53,0.45)] hover:scale-105 uppercase tracking-wide block text-center"
            >
              Acessar Pack Agora
            </a>
            <p id="hero-guarantee" className="text-slate-300 text-xs sm:text-sm flex items-center gap-2 font-bold mt-2">
              <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full"><i className="ph-bold ph-shield text-xs"></i></span>
              Garantia incondicional de 15 dias
            </p>
          </div>
        </div>
      </section>

      {/* BLOCO 2: CARROSSEL DEMONSTRATIVO - SEÇÃO CLARA (#f0f4f9) */}
      <section id="demo-carousel-section" className="bg-[#f0f4f9] py-12 sm:py-16 relative">
        <div className="max-w-6xl mx-auto px-4 mb-6 sm:mb-8 text-center">
          <h2 id="carousel-title" className="text-[22px] sm:text-3xl font-bold text-slate-900 text-balance leading-snug uppercase">
            VEJA COMO VOCÊ VAI ENCONTRAR O DEFEITO EM MINUTOS
          </h2>
        </div>
        
        <div className="relative max-w-7xl mx-auto w-full overflow-hidden">
          {/* Fades adaptados para o fundo gelo claro #f0f4f9 */}
          <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-[#f0f4f9] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-[#f0f4f9] to-transparent z-10 pointer-events-none"></div>
          
          <div 
            id="auto-carousel-top" 
            ref={carouselTopRef}
            className="flex gap-4 sm:gap-6 overflow-hidden pointer-events-none select-none py-6 px-4 sm:px-8 md:px-16 items-center mb-6"
          >
            {/* Loop duplicado para renderizar o scroll infinito */}
            {[...carouselImagesTop, ...carouselImagesTop].map((img, index) => (
              <img 
                key={index}
                src={img.src} 
                alt={img.alt} 
                loading="lazy" 
                decoding="async" 
                className="flex-none h-[175px] sm:h-[235px] md:h-[295px] w-auto object-contain hover:scale-105 transition-transform duration-500 select-none pointer-events-none drop-shadow-lg" 
              />
            ))}
          </div>

          <div 
            id="auto-carousel" 
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-hidden pointer-events-none select-none py-6 px-4 sm:px-8 md:px-16 items-center"
          >
            {/* Loop duplicado para renderizar o scroll infinito */}
            {[...carouselImages, ...carouselImages].map((img, index) => (
              <img 
                key={index}
                src={img.src} 
                alt={img.alt} 
                loading="lazy" 
                decoding="async" 
                className="flex-none h-[175px] sm:h-[235px] md:h-[295px] w-auto object-contain hover:scale-105 transition-transform duration-500 select-none pointer-events-none drop-shadow-lg" 
              />
            ))}
          </div>

          {/* TAG E LOGOTIPOS - Fundo de Cards Clara em Branco Puro */}
          <div id="hardware-branding" className="flex flex-col items-center mt-10 sm:mt-14 gap-6 sm:gap-8 px-4">
            <span id="branding-tag" className="bg-white text-slate-800 px-6 sm:px-10 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-sm font-bold tracking-widest sm:tracking-[0.2em] text-center uppercase border border-blue-100/60 shadow-sm text-balance">
              DIAGRAMAS ELÉTRICOS PARA:
            </span>
            <div id="brands-logos" className="flex items-center justify-center gap-8 sm:gap-14 transition-all duration-500">
              <img src="https://i.imgur.com/VhvTUZ6.webp" alt="Xbox Logo" loading="lazy" decoding="async" className="h-12 sm:h-20 w-auto object-contain drop-shadow-sm hover:scale-110 transition-transform filter brightness-95" />
              <img src="https://i.imgur.com/UopB0TB.webp" alt="PlayStation Logo" loading="lazy" decoding="async" className="h-12 sm:h-20 w-auto object-contain drop-shadow-sm hover:scale-110 transition-transform filter brightness-95" />
              <img src="https://i.imgur.com/wCXqmut.webp" alt="Nintendo Logo" loading="lazy" decoding="async" className="h-8 sm:h-12 w-auto object-contain drop-shadow-sm hover:scale-110 transition-transform filter brightness-95" />
            </div>
            
            {/* Imagem estática extra destacada abaixo dos logotipos */}
            <div className="mt-6 sm:mt-10 w-full max-w-[340px] sm:max-w-xl md:max-w-2xl mx-auto px-2">
              <img 
                src="https://i.imgur.com/zsIqiQw.webp" 
                alt="Informações Adicionais sobre os Diagramas" 
                loading="lazy" 
                decoding="async" 
                className="w-full h-auto object-contain rounded-2xl shadow-md border border-slate-100/80 bg-white" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 3: BENEFÍCIOS - SEÇÃO ESCURA (#06132d) */}
      <section id="benefits-section" className="bg-[#06132d] text-white py-16 sm:py-20 px-4 border-y border-[#1e3a8a]/30">
        <div className="max-w-5xl mx-auto">
          <h2 id="benefits-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 text-balance leading-snug uppercase">VOCÊ RESOLVE MAIS RÁPIDO E FAZ MAIS DINHEIRO NO DIA</h2>
          <div id="benefits-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            
            {/* Card Fundo sobre escuro (#051126), Bordas Azul royal semi-transparente */}
            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-8 sm:p-10 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(5,17,38,0.5)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.25)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="bg-[#081a3e] p-4 rounded-full mb-6 text-[#a3e635] border border-[#1e3a8a]/50">
                <i className="ph-fill ph-folder-open text-3xl sm:text-4xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-balance text-white">Tenha todos os diagramas num só lugar</h3>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-8 sm:p-10 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(5,17,38,0.5)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.25)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="bg-[#081a3e] p-4 rounded-full mb-6 text-[#a3e635] border border-[#1e3a8a]/50">
                <i className="ph-fill ph-crosshair text-3xl sm:text-4xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-balance text-white">Saiba exatamente onde testar na placa</h3>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-8 sm:p-10 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(5,17,38,0.5)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.25)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="bg-[#081a3e] p-4 rounded-full mb-6 text-[#a3e635] border border-[#1e3a8a]/50">
                <i className="ph-fill ph-clock-counter-clockwise text-3xl sm:text-4xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-balance text-white">Pare de perder horas procurando esquema na internet</h3>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-8 sm:p-10 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(5,17,38,0.5)] hover:shadow-[0_20px_50px_rgba(30,58,138,0.25)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="bg-[#081a3e] p-4 rounded-full mb-6 text-[#a3e635] border border-[#1e3a8a]/50">
                <i className="ph-fill ph-lightning text-3xl sm:text-4xl"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-balance text-white">Descubra o defeito muito mais rápido</h3>
            </div>

            {/* Destaque de Diferencial no Card - Borda em Neon Chartreuse */}
            <div className="bg-[#051126] border-2 border-[#a3e635] p-8 sm:p-10 rounded-3xl md:col-span-2 md:w-3/4 md:mx-auto flex flex-col items-center justify-center text-center shadow-[0_10px_35px_rgba(163,230,53,0.1)] hover:shadow-[0_20px_50px_rgba(163,230,53,0.2)] hover:-translate-y-1 transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#a3e635]/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="bg-[#bbf7d0] p-5 rounded-full mb-6 text-[#166534] relative z-10">
                <i className="ph-fill ph-money text-4xl sm:text-5xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-balance text-white relative z-10">Resolva mais aparelhos no mesmo dia</h3>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16 w-full px-2">
            <a 
              href="#oferta" 
              onClick={handleScrollToOffer}
              className="inline-block w-full sm:w-auto bg-[#a3e635] hover:bg-[#bef264] text-[#051126] font-extrabold text-sm sm:text-lg px-4 sm:px-10 py-4 sm:py-5 rounded-full transition-all shadow-[0_0_20px_rgba(163,230,53,0.4)] uppercase tracking-wide text-center"
            >
              Acessar Pack Agora
            </a>
          </div>
        </div>
      </section>

      {/* BLOCO 4: ANTES E DEPOIS - SEÇÃO CLARA (#f0f4f9) */}
      <section id="comparative-section" className="bg-[#f0f4f9] py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 id="comparative-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10 sm:mb-12 text-balance leading-snug uppercase">A DIFERENÇA DE TRABALHAR NO ESCURO… E TRABALHAR COM DIREÇÃO</h2>
          <div id="comparative-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* CARD ANTES - Fundo Branco, Borda Clara com realce sutil de Urgência em Vermelho */}
            <div id="before-card" className="bg-white border-2 border-[#dc2626]/20 p-6 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-[#dc2626] border-b border-blue-100/60 pb-3 sm:pb-4 mb-5 sm:mb-6 flex items-center gap-2">
                <i className="ph-fill ph-x-circle"></i> ANTES
              </h3>
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 text-xs sm:text-base font-bold">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Fica horas tentando achar o defeito</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 text-xs sm:text-base font-bold">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Testa vários pontos sem saber se está certo</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 text-xs sm:text-base font-bold">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Perde tempo procurando esquema na internet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 text-xs sm:text-base font-bold">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Acumula serviço na bancada</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 text-xs sm:text-base font-bold">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Menos reparos no dia</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-[#dc2626] font-extrabold text-xs sm:text-base">
                  <i className="ph-bold ph-x text-[#dc2626] mt-0.5 sm:mt-1 text-base sm:text-lg shrink-0"></i> <span>Menos lucro no fim do mês</span>
                </li>
              </ul>
            </div>
            
            {/* CARD DEPOIS - Fundo Branco, Destaque com Verde Selos de Check exactos */}
            <div id="after-card" className="bg-white border-2 border-[#166534] p-6 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-lg shadow-green-500/5">
              <i className="ph-fill ph-check-circle absolute -right-8 sm:-right-12 -bottom-8 sm:-bottom-12 text-7xl sm:text-9xl text-[#166534] opacity-5 pointer-events-none"></i>
              <h3 className="text-xl sm:text-2xl font-bold text-[#166534] border-b border-blue-100/60 pb-3 sm:pb-4 mb-5 sm:mb-6 flex items-center gap-2 relative z-10">
                <i className="ph-fill ph-check-circle"></i> DEPOIS
              </h3>
              <ul className="space-y-4 sm:space-y-5 relative z-10">
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 font-bold text-xs sm:text-base">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                  <span>Já sabe por onde começa a testar</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 font-bold text-xs sm:text-base">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                  <span>Vai direto no ponto certo da placa</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 font-bold text-xs sm:text-base">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                  <span>Não perde tempo procurando na internet</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 font-bold text-xs sm:text-base">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                  <span>Resolve defeitos muito mais rápido</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-slate-800 font-bold text-xs sm:text-base">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                  <span>Mais reparos no dia</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3 text-[#166534] font-extrabold text-sm sm:text-lg">
                  <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1.5 rounded-full shrink-0"><i className="ph-bold ph-check text-sm font-black"></i></span>
                  <span>Mais lucro em cada serviço</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 5: URGÊNCIA (COM TIMER) - Destaque em Vermelho Vibrante (#dc2626) */}
      <section id="urgency-timer-section" className="bg-[#dc2626] text-white text-center py-16 sm:py-20 px-4 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex justify-center items-center gap-3 sm:gap-8 bg-black/30 border border-white/10 rounded-full px-4 sm:px-10 py-2 sm:py-3 mb-8 sm:mb-10 shadow-inner w-full sm:w-auto overflow-hidden">
            <span className="text-[9px] sm:text-sm font-bold tracking-widest uppercase text-white/90 whitespace-nowrap">Aproveite o preço promocional</span>
            <div className="flex items-start gap-1 sm:gap-2 font-bold shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-4xl leading-none font-mono" id="timer-minutes">{formatMinutes()}</span>
                <span className="text-[7px] sm:text-[10px] tracking-widest uppercase text-white/70 mt-1 sm:mt-2 animate-pulse">MIN</span>
              </div>
              <span className="text-xl sm:text-3xl leading-none mt-0.5">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-4xl leading-none font-mono" id="timer-seconds">{formatSeconds()}</span>
                <span className="text-[7px] sm:text-[10px] tracking-widest uppercase text-white/70 mt-1 sm:mt-2 animate-pulse">SEG</span>
              </div>
            </div>
          </div>
          <h2 id="urgency-headline" className="text-[24px] sm:text-3xl md:text-[42px] font-bold text-white mb-10 sm:mb-12 leading-snug text-balance uppercase">
            CHEGA DE PERDER HORAS PROCURANDO E<br className="hidden sm:block" />
            <span className="underline decoration-white/60 decoration-1 underline-offset-[8px] sm:underline-offset-[12px]">VÁ DIRETO NO DEFEITO AGORA.</span>
          </h2>
          <a 
            href="#oferta" 
            onClick={handleScrollToOffer}
            className="inline-block w-full sm:w-auto bg-[#a3e635] hover:bg-[#bef264] text-[#051126] font-extrabold text-sm sm:text-xl px-4 sm:px-12 py-4 sm:py-5 rounded-full shadow-[0_0_25px_rgba(163,230,53,0.45)] transition-all hover:scale-105 uppercase tracking-wide text-center"
          >
            Acessar Esquemas Agora
          </a>
        </div>
      </section>

      {/* BLOCO 6: PARA QUEM É - SEÇÃO ESCURA (#081a3e) */}
      <section id="target-audience" className="bg-[#081a3e] py-16 sm:py-20 px-4 relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 id="target-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-center text-white mb-10 sm:mb-12 text-balance leading-snug uppercase">ESSE PACK É PRA VOCÊ QUE…</h2>
          <div className="flex flex-col gap-3 sm:gap-4">
            
            {/* Cards no Dark: bg #051126, borders azul royal semi-transparente */}
            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 sm:gap-5">
              <div className="p-2.5 sm:p-3 bg-[#081a3e] text-[#a3e635] rounded-full shrink-0 border border-[#1e3a8a]/50">
                <i className="ph-fill ph-clock-user text-2xl sm:text-3xl"></i>
              </div>
              <div><h4 className="font-bold text-white text-sm sm:text-lg text-balance">Quer parar de perder horas procurando defeito</h4></div>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 sm:gap-5">
              <div className="p-2.5 sm:p-3 bg-[#081a3e] text-[#a3e635] rounded-full shrink-0 border border-[#1e3a8a]/50">
                <i className="ph-fill ph-lock-key-open text-2xl sm:text-3xl"></i>
              </div>
              <div><h4 className="font-bold text-white text-sm sm:text-lg text-balance">Quer parar de ficar travado em defeitos simples</h4></div>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 sm:gap-5">
              <div className="p-2.5 sm:p-3 bg-[#081a3e] text-[#a3e635] rounded-full shrink-0 border border-[#1e3a8a]/50">
                <i className="ph-fill ph-crosshair text-2xl sm:text-3xl"></i>
              </div>
              <div><h4 className="font-bold text-white text-sm sm:text-lg text-balance">Quer saber exatamente onde testar na placa</h4></div>
            </div>

            <div className="bg-[#051126] border border-[#1e3a8a]/50 p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-4 sm:gap-5">
              <div className="p-2.5 sm:p-3 bg-[#081a3e] text-[#a3e635] rounded-full shrink-0 border border-[#1e3a8a]/50">
                <i className="ph-fill ph-folders text-2xl sm:text-3xl"></i>
              </div>
              <div><h4 className="font-bold text-white text-sm sm:text-lg text-balance">Quer tudo organizado em um só lugar</h4></div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOCO 7: PROVA SOCIAL - SEÇÃO CLARA (#f0f4f9) */}
      <section id="testimonials-section" className="bg-[#f0f4f9] py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-12 sm:mb-16 text-center">
          <h2 id="social-proof-headline" className="text-[24px] sm:text-3xl md:text-4xl font-bold text-slate-900 text-balance leading-snug uppercase">OLHA O QUE OUTROS TÉCNICOS ESTÃO FALANDO…</h2>
        </div>
        <div className="relative max-w-7xl mx-auto w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-[#f0f4f9] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-[#f0f4f9] to-transparent z-10 pointer-events-none"></div>
          
          <div id="testimonial-carousel" className="flex gap-6 sm:gap-8 overflow-x-auto touch-pan-x hide-scrollbar py-8 px-8 sm:px-16 md:px-32 items-stretch snap-x snap-mandatory">
            
            {/* Testimonials use White pure cards with crisp borders claires, top border is Highlight Chartreuse */}
            <div className="snap-center flex-none w-[300px] sm:w-[400px] bg-white border border-blue-100/60 border-t-[6px] border-t-[#a3e635] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <i className="ph-fill ph-quotes text-6xl text-blue-100/30 absolute top-6 right-6 pointer-events-none"></i>
              <div className="relative z-10">
                <div className="text-[#166534] mb-4 text-xl tracking-widest whitespace-nowrap">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-800 font-bold italic mb-8 text-base sm:text-lg leading-relaxed text-balance">"Eu perdia muito tempo tentando achar defeito… agora vou direto no ponto. melhorou meus serviços."</p>
              </div>
              <h4 className="font-bold text-slate-900 flex items-center gap-3 text-base sm:text-lg whitespace-nowrap relative z-10">
                <i className="ph-fill ph-user-circle text-slate-400 text-3xl shrink-0"></i> Carlos Henrique – Técnico
              </h4>
            </div>

            <div className="snap-center flex-none w-[300px] sm:w-[400px] bg-white border border-blue-100/60 border-t-[6px] border-t-[#a3e635] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <i className="ph-fill ph-quotes text-6xl text-blue-100/30 absolute top-6 right-6 pointer-events-none"></i>
              <div className="relative z-10">
                <div className="text-[#166534] mb-4 text-xl tracking-widest whitespace-nowrap">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-800 font-bold italic mb-8 text-base sm:text-lg leading-relaxed text-balance">"Antes eu travava para achar o defeito. Agora resolvo muito mais rápido."</p>
              </div>
              <h4 className="font-bold text-slate-900 flex items-center gap-3 text-base sm:text-lg whitespace-nowrap relative z-10">
                <i className="ph-fill ph-storefront text-slate-400 text-3xl shrink-0"></i> Smartcell
              </h4>
            </div>

            <div className="snap-center flex-none w-[300px] sm:w-[400px] bg-white border border-blue-100/60 border-t-[6px] border-t-[#a3e635] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <i className="ph-fill ph-quotes text-6xl text-blue-100/30 absolute top-6 right-6 pointer-events-none"></i>
              <div className="relative z-10">
                <div className="text-[#166534] mb-4 text-xl tracking-widest whitespace-nowrap">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-800 font-bold italic mb-8 text-base sm:text-lg leading-relaxed text-balance">"Só de não precisar procurar esquema na internet já economiza um tempo absurdo."</p>
              </div>
              <h4 className="font-bold text-slate-900 flex items-center gap-3 text-base sm:text-lg whitespace-nowrap relative z-10">
                <i className="ph-fill ph-user-circle text-slate-400 text-3xl shrink-0"></i> Rafael Souza – Técnico
              </h4>
            </div>

            <div className="snap-center flex-none w-[300px] sm:w-[400px] bg-white border border-blue-100/60 border-t-[6px] border-t-[#a3e635] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <i className="ph-fill ph-quotes text-6xl text-blue-100/30 absolute top-6 right-6 pointer-events-none"></i>
              <div className="relative z-10">
                <div className="text-[#166534] mb-4 text-xl tracking-widest whitespace-nowrap">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-800 font-bold italic mb-8 text-base sm:text-lg leading-relaxed text-balance">"Começamos a fazer mais serviços por dia depois que usamos. Muito prático."</p>
              </div>
              <h4 className="font-bold text-slate-900 flex items-center gap-3 text-base sm:text-lg whitespace-nowrap relative z-10">
                <i className="ph-fill ph-storefront text-slate-400 text-3xl shrink-0"></i> Assistência GameTech BH
              </h4>
            </div>

          </div>
        </div>
      </section>

      {/* BLOCO 8: ENTREGÁVEIS - SEÇÃO ESCURA (#06132d) */}
      <section id="deliverables-section" className="bg-[#06132d] text-white py-16 sm:py-20 px-4 border-t border-[#1e3a8a]/30">
        <div className="max-w-6xl mx-auto">
          <h2 id="deliverables-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 text-balance leading-snug uppercase">VEJA TUDO O QUE VOCÊ VAI RECEBER NO PACK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            <div className="w-full aspect-[4/3] flex items-center justify-center relative my-6 sm:my-0">
              <img 
                src="https://i.imgur.com/fasv8Xu.webp" 
                alt="Conteúdo do Pack" 
                loading="lazy" 
                decoding="async" 
                className="w-full h-full object-contain p-2 sm:p-4 drop-shadow-[0_0_35px_rgba(30,58,138,0.3)] scale-[1.20] sm:scale-[1.05]" 
              />
            </div>
            
            <div className="relative w-full px-2 sm:px-0 lg:ml-4">
              {/* Card no Dark: bg #051126, borders azul royal semi-transparente */}
              <div className="bg-[#051126] border border-[#1e3a8a]/50 p-6 sm:p-10 pt-12 sm:pt-14 rounded-[2rem] relative shadow-2xl">
                
                {/* Badge Destaque Vibrante Chartreuse */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#a3e635] text-[#051126] px-5 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-1.5 tracking-wide uppercase">
                  ⚡ ACESSO IMEDIATO
                </div>
                
                <h3 className="text-2xl sm:text-[32px] leading-tight font-bold mb-2 text-center text-white text-balance uppercase">+ de 150 diagramas elétricos de consoles</h3>
                <p className="text-slate-300 text-sm sm:text-base text-center mb-6 sm:mb-8 text-balance font-bold">No Pack Diagnóstico Express <span className="text-blue-100/80 font-bold">você terá:</span></p>
                
                {/* List items with Verde floresta (#166534) over #bbf7d0 for checklist box checks */}
                <ul className="flex flex-col font-bold">
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight uppercase">+ de 150 diagramas elétricos de consoles</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Diagramas com indicação dos pontos de teste</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Sistema de diagnóstico por sintoma</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Sequência simples de testes</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Índice de defeitos mais comuns</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Organização por marca e modelo do console</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span> 
                    <span className="text-slate-300 text-sm sm:text-base font-bold leading-tight">Acesso diretamente no Google Drive</span>
                  </li>
                  <li className="flex items-center gap-4 sm:gap-5 py-4 border-t border-[#1e3a8a]/30">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-1.5 rounded-full shrink-0"><i className="ph-bold ph-check text-sm font-black"></i></span> 
                    <span className="text-[#a3e635] text-sm sm:text-base font-extrabold leading-tight uppercase">Acesso Vitalício</span>
                  </li>
                </ul>
                <div className="mt-2 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400 font-bold leading-relaxed text-balance">
                  Você recebe tudo na hora, direto no seu<br />WhatsApp e no seu ✉️ e-mail
                </div>
              </div>
              <div className="text-center font-bold text-xl sm:text-2xl md:text-3xl text-white mt-8 sm:mt-10 tracking-wide">
                E muito mais...
              </div>
              <div className="mt-6 sm:mt-8 text-center w-full">
                <a 
                  href="#oferta" 
                  onClick={handleScrollToOffer}
                  className="inline-block w-full bg-[#a3e635] hover:bg-[#bef264] text-[#051126] font-extrabold text-sm sm:text-lg px-4 sm:px-8 py-4 sm:py-5 rounded-full transition-all shadow-[0_0_20px_rgba(163,230,53,0.45)] uppercase tracking-wide text-center"
                >
                  Acessar Pack Completo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO 9: BÔNUS - SEÇÃO CLARA (#f0f4f9) */}
      <section id="bonus-section" className="bg-[#f0f4f9] py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <span className="bg-[#bbf7d0] text-[#166534] border border-green-200/50 px-4 py-1.5 rounded-full text-[10px] sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap animate-pulse">Presentes Exclusivos</span>
            <h2 id="bonus-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-slate-900 mt-4 text-balance leading-snug uppercase">E ALÉM DE TUDO ISSO, VOCÊ AINDA RECEBE:</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Cards brancos, divisórias claires */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-full h-[280px] sm:h-[320px] bg-[#f0f4f9]/50 flex items-center justify-center relative overflow-hidden border-b border-blue-100/60 p-1 sm:p-2">
                <img src="https://i.imgur.com/a6ZcEgxl.webp" alt="Checklist de Diagnóstico Rápido" loading="lazy" decoding="async" className="w-full h-full object-contain scale-[1.05] hover:scale-110 transition-transform duration-500 drop-shadow-md" />
              </div>
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 px-5 sm:px-8 flex-1">
                <div className="text-[#166534] font-bold text-xl sm:text-2xl mb-2 uppercase flex items-center gap-2 tracking-wide"><i className="ph-fill ph-gift text-2xl sm:text-3xl"></i> Bônus 1</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 text-balance">Checklist de Diagnóstico Rápido</h3>
                <p className="text-slate-800 text-xs sm:text-sm text-balance mt-1 font-bold">Um guia simples pra usar no dia a dia para não esquecer nenhum passo importante na hora de testar.</p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider border border-red-200 shadow-sm">
                    <i className="ph-fill ph-gift text-sm sm:text-base"></i> BÔNUS GRATUITO HOJE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-full h-[280px] sm:h-[320px] bg-[#f0f4f9]/50 flex items-center justify-center relative overflow-hidden border-b border-blue-100/60 p-1 sm:p-2">
                <img src="https://i.imgur.com/MmSy0lCl.webp" alt="Guia de Defeitos Crônicos" loading="lazy" decoding="async" className="w-full h-full object-contain scale-[1.05] hover:scale-110 transition-transform duration-500 drop-shadow-md" />
              </div>
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 px-5 sm:px-8 flex-1">
                <div className="text-[#166534] font-bold text-xl sm:text-2xl mb-2 uppercase flex items-center gap-2 tracking-wide"><i className="ph-fill ph-gift text-2xl sm:text-3xl"></i> Bônus 2</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 text-balance">Guia de Defeitos Crônicos</h3>
                <p className="text-slate-800 text-xs sm:text-sm text-balance mt-1 font-bold">Saiba os defeitos mais comuns por marca. Atalho pra decidir mais rápido.</p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider border border-red-200 shadow-sm">
                    <i className="ph-fill ph-gift text-sm sm:text-base"></i> BÔNUS GRATUITO HOJE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-full h-[280px] sm:h-[320px] bg-[#f0f4f9]/50 flex items-center justify-center relative overflow-hidden border-b border-blue-100/60 p-1 sm:p-2">
                <img src="https://i.imgur.com/oPGA3Byl.webp" alt="Guia de Equivalência de Componentes" loading="lazy" decoding="async" className="w-full h-full object-contain scale-[1.18] hover:scale-[1.22] transition-transform duration-500 drop-shadow-md" />
              </div>
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 px-5 sm:px-8 flex-1">
                <div className="text-[#166534] font-bold text-xl sm:text-2xl mb-2 uppercase flex items-center gap-2 tracking-wide"><i className="ph-fill ph-gift text-2xl sm:text-3xl"></i> Bônus 3</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 text-balance">Guia de Equivalência de Componentes</h3>
                <p className="text-slate-800 text-xs sm:text-sm text-balance mt-1 font-bold">Saiba substituições possíveis e não fique travado quando não tiver o component exato.</p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider border border-red-200 shadow-sm">
                    <i className="ph-fill ph-gift text-sm sm:text-base"></i> BÔNUS GRATUITO HOJE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-full h-[280px] sm:h-[320px] bg-[#f0f4f9]/50 flex items-center justify-center relative overflow-hidden border-b border-blue-100/60 p-1 sm:p-2">
                <img src="https://i.imgur.com/LvYtxkql.webp" alt="Atualizações de Novos Modelos" loading="lazy" decoding="async" className="w-full h-full object-contain scale-[1.05] hover:scale-110 transition-transform duration-500 drop-shadow-md" />
              </div>
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 px-5 sm:px-8 flex-1">
                <div className="text-[#166534] font-bold text-xl sm:text-2xl mb-2 uppercase flex items-center gap-2 tracking-wide"><i className="ph-fill ph-gift text-2xl sm:text-3xl"></i> Bônus 4</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 text-balance">Atualizações de Novos Modelos</h3>
                <p className="text-slate-800 text-xs sm:text-sm text-balance mt-1 font-bold">Sempre que sair console novo, você recebe atualização sem pagar nada a mais.</p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider border border-red-200 shadow-sm">
                    <i className="ph-fill ph-gift text-sm sm:text-base"></i> BÔNUS GRATUITO HOJE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-blue-100/60 flex flex-col hover:shadow-md transition-shadow">
              <div className="w-full h-[280px] sm:h-[320px] bg-[#f0f4f9]/50 flex items-center justify-center relative overflow-hidden border-b border-blue-100/60 p-1 sm:p-2">
                <img src="https://i.imgur.com/gogJXXyl.webp" alt="Tabela Mestre de Equivalência de SMD's" loading="lazy" decoding="async" className="w-full h-full object-contain scale-[1.05] hover:scale-110 transition-transform duration-500 drop-shadow-md" referrerPolicy="no-referrer" />
              </div>
              <div className="pt-2 sm:pt-3 pb-6 sm:pb-8 px-5 sm:px-8 flex-1">
                <div className="text-[#166534] font-bold text-xl sm:text-2xl mb-2 uppercase flex items-center gap-2 tracking-wide"><i className="ph-fill ph-gift text-2xl sm:text-3xl"></i> Bônus 5</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 text-balance">Tabela Mestre de Equivalência de SMD's</h3>
                <p className="text-slate-800 text-xs sm:text-sm text-balance mt-1 font-bold">Consulte códigos de marcação SMD na hora e descubra quais transistores, diodos ou reguladores exatos colocar no lugar.</p>
                <div className="mt-3.5 flex">
                  <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider border border-red-200 shadow-sm">
                    <i className="ph-fill ph-gift text-sm sm:text-base"></i> BÔNUS GRATUITO HOJE
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* BLOCO 10: PREÇOS (OFERTA) - SEÇÃO ESCURA (#081a3e) */}
      <section id="oferta" className="bg-[#081a3e] py-16 sm:py-24 px-4 relative overflow-hidden">
        {/* Glow azul tecnológico de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#1e3a8a]/35 blur-[100px] pointer-events-none rounded-full"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 id="pricing-title" className="text-[28px] sm:text-3xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-16 text-balance leading-snug uppercase">GARANTA O SEU ACESSO COMPLETO HOJE</h2>
          
          <div id="pricing-grid" className="flex justify-center max-w-xl mx-auto px-2 sm:px-0">

            {/* PACOTE COMPLETO - Alta Conversão | Fundo #051126, Borda Neon Chartreuse #a3e635 */}
            <div id="tier-complete" className="bg-[#051126] border-2 border-[#a3e635] p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_0_35px_rgba(163,230,53,0.25)] relative z-10 flex flex-col w-full justify-between">
              
              {/* Badge Neon Alert */}
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#a3e635] text-[#051126] px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-[0_0_15px_rgba(163,230,53,0.5)] flex items-center gap-1 sm:gap-1.5 animate-pulse">
                ⭐ MAIS ESCOLHIDO
              </div>
              
              <div>
                <h3 className="text-lg sm:text-[22px] md:text-[26px] font-bold text-white mb-5 sm:mb-6 text-center leading-snug tracking-wider text-balance">PACOTE COMPLETO + <br className="hidden sm:block" /> 5 BÔNUS EXCLUSIVOS</h3>
                <div className="w-full aspect-[4/3] flex items-center justify-center my-4 sm:my-0 mb-5 sm:mb-4">
                  <img src="https://i.imgur.com/fasv8Xu.webp" alt="Pacote Completo com Bônus" loading="lazy" decoding="async" className="w-full h-full object-contain p-1 sm:p-4 drop-shadow-lg scale-[1.25] sm:scale-[1.15]" />
                </div>
                <div className="text-center mb-6 sm:mb-8 mt-2 w-full">
                  <div className="inline-block bg-[#166534]/25 border border-[#a3e635]/30 text-[#a3e635] rounded-full py-1.5 sm:py-2 px-3 sm:px-5 text-[10px] sm:text-[13px] font-extrabold whitespace-nowrap">
                    + de 2.064 técnicos escolheram esse pacote
                  </div>
                </div>
                
                <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8 text-xs sm:text-[15px] font-bold">
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span className="uppercase">+ de 150 diagramas elétricos</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Pontos de teste indicados</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Sistema de diagnóstico por sintoma</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Sequência simples de testes</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Índice de defeitos mais comuns</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-slate-300 leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Acesso direto no Google Drive</span>
                  </li>
                  <li className="flex items-center gap-3 sm:gap-4 text-[#a3e635] font-extrabold leading-tight">
                    <span className="inline-flex items-center justify-center bg-[#bbf7d0] text-[#166534] p-0.5 rounded-full shrink-0"><i className="ph-bold ph-check text-xs"></i></span>
                    <span>Acesso Vitalício</span>
                  </li>
                </ul>

                {/* Container de Bônus Técnico */}
                <div className="border border-[#1e3a8a]/50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 bg-[#081a3e]/60">
                  <h4 className="text-[#a3e635] font-black text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-5">BÔNUS EXCLUSIVOS:</h4>
                  <ul className="space-y-3 sm:space-y-4 text-[11px] sm:text-[14px] font-bold">
                    <li className="flex items-center gap-2 sm:gap-3 text-slate-300 leading-tight">
                      <span className="text-[#a3e635]">🎁</span> <span>Checklist Rápido de Diagnóstico</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-slate-300 leading-tight">
                      <span className="text-[#a3e635]">🎁</span> <span>Lista de Defeitos Mais Comuns</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-slate-300 leading-tight">
                      <span className="text-[#a3e635]">🎁</span> <span>Guia de Equivalência de Componentes</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-slate-300 leading-tight">
                      <span className="text-[#a3e635]">🎁</span> <span>Atualizações de Novos Modelos</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-[#a3e635] leading-tight">
                      <span className="text-[#a3e635]">🎁</span> <span className="uppercase">Tabela Mestre de Equivalência de SMD's</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
                  <span className="block text-slate-400 line-through text-xs sm:text-sm mb-1 font-bold">De R$ 147,00</span>
                  <span className="block text-2xl sm:text-3xl md:text-[32px] font-medium text-slate-300 leading-tight">Por apenas</span>
                  <span className="block text-4xl sm:text-[46px] md:text-[52px] font-black text-[#a3e635] leading-none mt-1 sm:mt-2">R$ 27,90</span>
                </div>
                <a 
                  href="https://pay.hotmart.com/D106572077F?checkoutMode=10&bid=1783048165987" 
                  className="block text-center w-full bg-[#a3e635] hover:bg-[#bef264] text-[#051126] font-extrabold py-4 sm:py-5 rounded-full transition-all uppercase text-sm sm:text-lg shadow-[0_0_25px_rgba(163,230,53,0.5)] hover:scale-105 px-4"
                >
                  Quero o Pacote Completo
                </a>
                
                <div className="mt-6 flex justify-center">
                  <img 
                    src="https://i.imgur.com/doNsqVS.webp" 
                    alt="Selo de Segurança e Garantia de Satisfação" 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full max-w-[360px] sm:max-w-[450px] h-auto object-contain drop-shadow-md select-none pointer-events-none scale-105 sm:scale-110 hover:scale-115 transition-transform duration-300" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOCO 11: PASSOS DE ACESSO - SEÇÃO CLARA (#f0f4f9) */}
      <section id="how-to-access" className="bg-[#f0f4f9] py-16 sm:py-20 px-4 border-t border-blue-100/60">
        <div className="max-w-6xl mx-auto">
          <h2 id="access-steps-headline" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-10 sm:mb-12 text-balance leading-snug uppercase">VEJA COMO É SIMPLES ACESSAR…</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Subtle connecting line for desktop screens */}
            <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-blue-200/60 z-0"></div>

            {/* CARD 1 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-blue-100/80 relative overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(30,58,138,0.03)] hover:shadow-[0_12px_32px_rgba(30,58,138,0.08)] hover:-translate-y-1.5 transition-all duration-300 group z-10">
              <span className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black text-blue-100/25 leading-none pointer-events-none font-sans group-hover:scale-110 group-hover:text-blue-100/35 transition-all duration-500 select-none">1</span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm font-bold">
                  <i className="ph-fill ph-shopping-cart text-2xl sm:text-3xl"></i>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 relative z-10 text-balance tracking-tight">Faça sua compra</h4>
                <p className="text-xs sm:text-sm text-slate-700 relative z-10 leading-relaxed text-balance font-bold">Escolha o plano ideal e finalize o pagamento seguro em poucos segundos.</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-blue-100/80 relative overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(30,58,138,0.03)] hover:shadow-[0_12px_32px_rgba(30,58,138,0.08)] hover:-translate-y-1.5 transition-all duration-300 group z-10">
              <span className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black text-blue-100/25 leading-none pointer-events-none font-sans group-hover:scale-110 group-hover:text-blue-100/35 transition-all duration-500 select-none">2</span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm font-bold">
                  <i className="ph-fill ph-envelope-simple-open text-2xl sm:text-3xl"></i>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 relative z-10 text-balance tracking-tight">Receba o acesso</h4>
                <p className="text-xs sm:text-sm text-slate-700 relative z-10 leading-relaxed text-balance font-bold">Dados de login enviados imediatamente para o seu e-mail e WhatsApp.</p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-blue-100/80 relative overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(30,58,138,0.03)] hover:shadow-[0_12px_32px_rgba(30,58,138,0.08)] hover:-translate-y-1.5 transition-all duration-300 group z-10">
              <span className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black text-blue-100/25 leading-none pointer-events-none font-sans group-hover:scale-110 group-hover:text-blue-100/35 transition-all duration-500 select-none">3</span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm font-bold">
                  <i className="ph-fill ph-device-mobile text-2xl sm:text-3xl"></i>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 relative z-10 text-balance tracking-tight">Acesse online</h4>
                <p className="text-xs sm:text-sm text-slate-700 relative z-10 leading-relaxed text-balance font-bold">Use pelo celular ou computador. Sem instalações ou configurações difíceis.</p>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-blue-100/80 relative overflow-hidden flex flex-col justify-between shadow-[0_4px_24px_rgba(30,58,138,0.03)] hover:shadow-[0_12px_32px_rgba(30,58,138,0.08)] hover:-translate-y-1.5 transition-all duration-300 group z-10">
              <span className="absolute -right-3 -bottom-6 text-8xl sm:text-9xl font-black text-blue-100/25 leading-none pointer-events-none font-sans group-hover:scale-110 group-hover:text-blue-100/35 transition-all duration-500 select-none">4</span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 mb-5 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm font-bold">
                  <i className="ph-fill ph-wrench text-2xl sm:text-3xl"></i>
                </div>
                <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 relative z-10 text-balance tracking-tight">Use na bancada</h4>
                <p className="text-xs sm:text-sm text-slate-700 relative z-10 leading-relaxed text-balance font-bold">Abra o diagrama, veja qual o sintoma e vá direto no componente certo.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOCO 12: FAQ - SEÇÃO CLARA (Fundo Branco puro para contraste de tabelas/accordions) */}
      <section id="faq-accordions" className="bg-white py-16 sm:py-20 px-4 border-t border-blue-100/60">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-title" className="text-[22px] sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-10 sm:mb-12 text-balance leading-snug uppercase">PERGUNTAS FREQUENTES (FAQ)</h2>
          <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
            
            {/* Accordions adaptados: bg gelo #f0f4f9, border blue-100/60, texto slate-900 */}
            <details className="bg-[#f0f4f9] rounded-xl border border-blue-100/60 group overflow-hidden shadow-sm">
              <summary className="p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 select-none">
                1. O acesso é vitalício?
                <i className="ph-bold ph-caret-down transition-transform duration-300 faq-icon text-slate-500 shrink-0 ml-2"></i>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-800 text-xs sm:text-sm leading-relaxed text-balance font-bold">Sim. Você compra uma vez e pode acessar quando quiser.</div>
            </details>

            <details className="bg-[#f0f4f9] rounded-xl border border-blue-100/60 group overflow-hidden shadow-sm">
              <summary className="p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 select-none">
                2. Por quanto tempo posso usar?
                <i className="ph-bold ph-caret-down transition-transform duration-300 faq-icon text-slate-500 shrink-0 ml-2"></i>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-800 text-xs sm:text-sm leading-relaxed text-balance font-bold">Sem limite. O acesso é seu e não expira.</div>
            </details>

            <details className="bg-[#f0f4f9] rounded-xl border border-blue-100/60 group overflow-hidden shadow-sm">
              <summary className="p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 select-none">
                3. Vou receber atualizações?
                <i className="ph-bold ph-caret-down transition-transform duration-300 faq-icon text-slate-500 shrink-0 ml-2"></i>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-800 text-xs sm:text-sm leading-relaxed text-balance font-bold">Sim. Novos modelos e conteúdos são liberados sem custo adicional para quem garantiu o pacote.</div>
            </details>

            <details className="bg-[#f0f4f9] rounded-xl border border-blue-100/60 group overflow-hidden shadow-sm">
              <summary className="p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 select-none">
                4. Como recebo o acesso?
                <i className="ph-bold ph-caret-down transition-transform duration-300 faq-icon text-slate-500 shrink-0 ml-2"></i>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-800 text-xs sm:text-sm leading-relaxed text-balance font-bold">Você recebe no seu e-mail logo após a confirmação da compra. É totalmente imediato.</div>
            </details>

            <details className="bg-[#f0f4f9] rounded-xl border border-blue-100/60 group overflow-hidden shadow-sm">
              <summary className="p-5 sm:p-6 cursor-pointer flex justify-between items-center font-bold text-sm sm:text-base text-slate-900 select-none">
                5. Funciona no celular?
                <i className="ph-bold ph-caret-down transition-transform duration-300 faq-icon text-slate-500 shrink-0 ml-2"></i>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-800 text-xs sm:text-sm leading-relaxed text-balance font-bold">Sim. Você pode acessar de forma simples e rápida diretamente pelo seu celular ou pelo computador.</div>
            </details>

          </div>
        </div>
      </section>

      {/* BLOCO 13: FOOTER - SEÇÃO ESCURA (#06132d) */}
      <footer id="main-footer" className="bg-[#06132d] py-10 sm:py-12 px-4 border-t border-[#1e3a8a]/30 text-center">
        <div className="max-w-4xl mx-auto text-slate-300 text-xs sm:text-sm space-y-3 sm:space-y-4">
          <h4 className="font-bold text-white text-base sm:text-lg mb-1 sm:mb-2 text-balance font-sans">Pack Diagnóstico Express de Consoles</h4>
          <p className="flex items-center justify-center gap-3 sm:gap-4 whitespace-nowrap font-bold text-[#a3e635]">
            <span><i className="ph-fill ph-laptop"></i> Acesso digital</span>
            <span className="text-slate-500">•</span>
            <span><i className="ph-fill ph-user"></i> Uso individual</span>
          </p>
          <p className="font-bold">
            Suporte via e-mail<br />
            Contato: <a href="mailto:suporteesquemasgames@gmail.com" className="text-[#a3e635] font-extrabold hover:underline transition-colors whitespace-nowrap">suporteesquemasgames@gmail.com</a>
          </p>
          
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#1e3a8a]/20 text-[10px] sm:text-xs text-slate-400 font-bold">
            <p className="text-balance px-4 font-sans font-normal opacity-70">"Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site. Fazemos todos os esforços para indicar claramente e mostrar todas as provas reais."</p>
            <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 whitespace-nowrap text-slate-300 font-medium">
              <a href="#" className="hover:text-[#a3e635] transition-colors">Termos de Uso</a>
              <span>|</span>
              <a href="#" className="hover:text-[#a3e635] transition-colors">Políticas de Privacidade</a>
            </div>
            <p className="mt-4 sm:mt-6 font-bold text-slate-300 whitespace-nowrap">&copy; <span id="current-year">{currentYear}</span> Pack Diagnóstico Express. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* NOTIFICAÇÃO DE VENDAS (FAKE SALES TOAST) - Visual Clean e Elegante */}
      <div 
        id="sales-notification" 
        className={`fixed top-4 left-4 z-50 bg-white border border-blue-100/80 p-2 sm:p-3 rounded-xl shadow-[0_10px_40px_rgba(5,17,38,0.12)] flex items-center gap-3 sm:gap-4 transition-all duration-500 transform max-w-[calc(100vw-2rem)] w-64 sm:w-72 ${
          toastVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-[#bbf7d0] text-[#166534] rounded-full flex items-center justify-center shrink-0">
          <i className="ph-fill ph-shopping-bag text-lg sm:text-xl"></i>
        </div>
        <div className="overflow-hidden text-left">
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight truncate" id="buyer-name">{buyerName}</p>
          <p className="text-[10px] sm:text-xs text-slate-800 truncate font-bold">Acabou de adquirir o acesso.</p>
        </div>
      </div>
    </>
  );
}
