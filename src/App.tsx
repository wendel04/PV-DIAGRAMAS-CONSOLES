"use client";

import { useEffect, useMemo, useState } from "react";

const primaryItems = [
  "Mais de 50 mapas visuais de diagnóstico",
  "Organização por sintomas e códigos de falha",
  "Indicação do que verificar primeiro",
  "Sequência simples de testes",
  "Valores e parâmetros de referência",
  "Alertas de erros comuns no diagnóstico",
  "Casos práticos completos",
  "Acesso imediato pelo celular, tablet ou computador",
  "Material disponível para baixar",
];

const basicItems = [
  "Mais de 50 mapas visuais de diagnóstico",
  "Organização por sintomas e códigos de falha",
  "Material disponível para baixar",
];

const completeItems = [
  "Mais de 50 mapas visuais de diagnóstico",
  "Organização por sintomas e códigos de falha",
  "Indicação do que verificar primeiro",
  "Sequência simples de testes",
  "Valores e parâmetros de referência",
  "Alertas de erros comuns no diagnóstico",
  "Acesso imediato pelo celular, tablet ou computador",
  "Material disponível para baixar",
];

const bonuses = [
  ["#1 — BÔNUS HOJE!", "Checklist de Utilização do Scanner", "Um passo a passo simples para usar o scanner sem pular etapas importantes."],
  ["#2 — BÔNUS HOJE!", "Tabela de Causas Prováveis", "Consulte rapidamente as causas mais comuns ligadas aos principais códigos e sintomas."],
  ["#3 — BÔNUS HOJE!", "Ficha de Testes e Resultados", "Registre o que já foi testado, os resultados encontrados e evite repetir verificações."],
  ["#4 — BÔNUS HOJE!", "Checklist Antes de Condenar a Peça", "Faça uma última conferência antes de recomendar a troca de qualquer componente."],
];

const faq = [
  ["Como vou receber o material?", "Após a confirmação do pagamento, você recebe o acesso imediato e pode baixar os arquivos."],
  ["Posso acessar pelo celular?", "Sim. Você pode consultar pelo celular, tablet ou computador."],
  ["Os mapas mostram qual peça deve ser trocada?", "Não. Eles mostram as causas mais prováveis e o que verificar antes de condenar uma peça."],
  ["Qual é a diferença entre o Pacote Básico e o Completo?", "O Básico inclui o produto principal. O Completo inclui o produto principal e todos os bônus."],
  ["Existe garantia?", "Sim. Você tem 30 dias de garantia ou seu dinheiro de volta."],
];

const topCarouselImages = [
  "/images/carrossel/cima-1.webp",
  "/images/carrossel/cima-2.webp",
  "/images/carrossel/cima-3.webp",
  "/images/carrossel/cima-4.webp",
  "/images/carrossel/cima-5.webp",
];

const bottomCarouselImages = [
  "/images/carrossel/baixo-1.webp",
  "/images/carrossel/baixo-2.webp",
  "/images/carrossel/baixo-3.webp",
  "/images/carrossel/baixo-4.webp",
  "/images/carrossel/baixo-5.webp",
];

function MediaSlot({ className = "", label, src, priority = false }: { className?: string; label: string; src?: string; priority?: boolean }) {
  if (src) {
    return <div className={`media-slot media-filled ${className}`}><img src={src} alt={label} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" /></div>;
  }

  return <div className={`media-slot ${className}`} role="img" aria-label={`Espaço reservado para ${label}`} />;
}

function ThinCheck({ className = "" }: { className?: string }) {
  return <span className={`thin-check ${className}`} aria-hidden="true" />;
}

function BenefitIcon({ kind }: { kind: "target" | "steps" | "avoid" | "repeat" | "speed" }) {
  return <span className={`benefit-icon benefit-icon-${kind}`} aria-hidden="true" />;
}

function CTA({ children = "ACESSAR MAPAS DE DIAGNÓSTICOS" }: { children?: React.ReactNode }) {
  return <a className="cta" href="#pacotes">{children}</a>;
}

function PurchaseToast() {
  const names = useMemo(() => ["Auto Center Bahia", "Oficina MotorTech", "JR Diagnósticos", "Mecânica do Vale"], []);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((value) => (value + 1) % names.length);
        setVisible(true);
      }, 450);
    }, 7200);
    return () => window.clearInterval(interval);
  }, [names.length]);

  return (
    <div className={`purchase-toast ${visible ? "is-visible" : ""}`} aria-live="polite">
      <span className="purchase-icon" aria-hidden="true">
        <i className="cart-handle" />
        <i className="cart-basket" />
        <i className="cart-wheel cart-wheel-left" />
        <i className="cart-wheel cart-wheel-right" />
      </span>
      <span><strong>{names[index]}</strong><small>Acabou de comprar o Kit de Mapas</small></span>
    </div>
  );
}

function Countdown() {
  const [seconds, setSeconds] = useState(590);
  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((value) => value <= 0 ? 590 : value - 1), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return <strong>{minutes}:{rest}</strong>;
}

function Carousel({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const cards = [...images, ...images].map((src, index) => (
    <MediaSlot key={`${src}-${index}`} label={`Mapa visual de diagnóstico ${(index % images.length) + 1}`} src={`${src}?v=1`} />
  ));
  return (
    <div className="carousel" aria-label="Carrossel automático de mapas de diagnóstico">
      <div className={`carousel-track ${reverse ? "reverse" : ""}`}>{cards}</div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <PurchaseToast />

      <section className="hero blue-gradient">
        <div className="container narrow center">
          <div className="safe-pill">🔒 COMPRA 100% SEGURA E PROTEGIDA</div>
          <h1 className="hero-headline">
            <span className="headline-line">+50 MAPAS VISUAIS PARA</span>{" "}
            <span className="headline-line">DIAGNOSTICAR FALHAS NA</span>{" "}
            <span className="headline-line">INJEÇÃO ELETRÔNICA</span>
          </h1>
          <MediaSlot className="hero-mockup" label="Mockup principal do Kit Mapas Diagnósticos Sem Troca-Troca" src="/images/mockups/mockup-principal.webp?v=optimized-1" priority />
          <p className="hero-copy">Consulte o sintoma ou código encontrado, veja as causas mais prováveis e siga uma sequência simples de verificações para descobrir o defeito em 5 minutos. <b>Por apenas R$17,90</b></p>
          <div className="micro-benefit"><ThinCheck className="micro-check" /><span>Saiba por onde começar o diagnóstico</span></div>
          <div className="micro-benefit"><ThinCheck className="micro-check" /><span>Evite trocar peças sem certeza</span></div>
          <CTA />
          <p className="secure-note">🛡️ Acesso imediato pelo celular, tablet ou computador</p>
        </div>
      </section>

      <section className="proof section-light">
        <div className="container wide center">
          <h2>VEJA COMO OS MAPAS VAI AJUDAR NA SUA MECÂNICA</h2>
        </div>
        <div className="carousel-stack">
          <Carousel images={topCarouselImages} />
          <Carousel images={bottomCarouselImages} reverse />
        </div>
        <div className="container center process-row">
          <span>🚗<br /><b>Consulte o sintoma</b></span><i>→</i><span>🔍<br /><b>Siga a sequência de testes</b></span><i>→</i><span><ThinCheck className="process-check" /><br /><b>Encontre o defeito</b></span>
        </div>
        <div className="container center"><MediaSlot className="comparison-mockup" label="Mapa visual de diagnóstico em destaque" src="/images/carrossel/cima-5.webp?v=optimized-1" /></div>
      </section>

      <section className="benefits sky-gradient">
        <div className="container wide">
          <h2>TENHA MAIS CERTEZA ONDE ESTÁ O DEFEITO</h2>
          <div className="benefit-grid">
            <article><BenefitIcon kind="target" /><div><h3>Saiba por onde começar</h3><p>Veja qual é o primeiro ponto que precisa ser verificado antes de sair testando tudo.</p></div></article>
            <article><BenefitIcon kind="steps" /><div><h3>Siga uma ordem simples de testes</h3><p>Faça as verificações na sequência certa e deixe o diagnóstico mais organizado.</p></div></article>
            <article><BenefitIcon kind="avoid" /><div><h3>Evite trocar peças sem certeza</h3><p>Confira as causas mais prováveis antes de recomendar a troca de um componente.</p></div></article>
            <article><BenefitIcon kind="repeat" /><div><h3>Reduza o retrabalho</h3><p>Registre o que já foi testado e evite repetir as mesmas verificações.</p></div></article>
            <article><BenefitIcon kind="speed" /><div><h3>Ganhe tempo nas falhas mais comuns</h3><p>Consulte o mapa durante o serviço e avance com mais clareza.</p></div></article>
          </div>
          <div className="center"><CTA /></div>
        </div>
      </section>

      <section className="urgency coral">
        <div className="container narrow center">
          <div className="timer">OFERTA ACABA EM <Countdown /></div>
          <h2>PARE DE PERDER TEMPO TENTANDO DESCOBRIR ONDE ESTÁ O DEFEITO TESTANDO NO ESCURO</h2>
          <p>Tenha mais de 50 mapas visuais para consultar durante o serviço e siga uma sequência simples antes de trocar qualquer peça.</p>
          <CTA />
        </div>
      </section>

      <section className="audience blue-gradient">
        <div className="container wide">
          <h2>ESSES MAPAS SÃO PARA VOCÊ QUE:</h2>
          <div className="audience-grid">
            {["SABER POR ONDE COMEÇAR O DIAGNÓSTICO", "SEGUIR UMA ORDEM SIMPLES DE TESTES", "EVITAR TROCAR PEÇAS NO CHUTE", "GANHAR TEMPO DURANTE O SERVIÇO", "REDUZIR RETRABALHO NA OFICINA"].map((text) => <div key={text}><ThinCheck className="audience-check" />{text}</div>)}
          </div>
        </div>
      </section>

      <section className="what-you-get deep-blue">
        <div className="container narrow center">
          <h2>VEJA TUDO O QUE VOCÊ VAI RECEBER</h2>
          <MediaSlot className="bundle-mockup" label="Mockup do produto principal" src="/images/mockups/mockup-principal.webp?v=optimized-1" />
          <div className="receive-card">
            <h3>Você vai receber:</h3>
            <p>Mapas prontos para consultar durante o serviço.</p>
            <ul>{primaryItems.map((text) => <li key={text}><ThinCheck />{text}</li>)}</ul>
            <div className="more">E MUITO MAIS...</div>
            <CTA />
          </div>
        </div>
      </section>

      <section className="bonuses section-light">
        <div className="container wide">
          <h2>VOCÊ AINDA LEVA GRATUITAMENTE HOJE</h2>
          <div className="bonus-pill">4 Bônus exclusivos</div>
          <div className="bonus-grid">
            {bonuses.map(([number, title, copy], index) => (
              <article key={number}>
                <MediaSlot className="bonus-image" label={`Mockup do bônus ${index + 1}`} src={`/images/mockups/bonus-${index + 1}.webp?v=optimized-1`} />
                <div className="bonus-copy"><h3>🎁 {number}</h3><h4>{title}</h4><p>{copy}</p><span>🎁 BÔNUS GRATUITO HOJE</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pacotes" className="pricing deep-blue">
        <div className="container wide">
          <h2>ESCOLHA O PACOTE IDEAL PARA VOCÊ</h2>
          <div className="pricing-grid">
            <article className="price-card basic">
              <h3>PACOTE BÁSICO</h3>
              <MediaSlot className="price-mockup" label="Mockup do pacote básico" src="/images/mockups/pacote-basico.webp?v=optimized-1" />
              <ul>{basicItems.map((text) => <li key={text}><ThinCheck />{text}</li>)}</ul>
              <div className="price"><small>De R$ 47,90</small><strong>Por apenas R$ 17,90</strong></div>
              <a className="checkout-button" href="https://checkout.wiven.com.br/checkout/cmrkoamex0zlz01pqdtv13mqt?offer=U9FXZPH">QUERO ACESSO BÁSICO</a>
              <div className="upsell"><b>AINDA DÁ TEMPO DE LEVAR A MELHOR OPÇÃO!</b><br />⬇️ Leve o kit completo com todos os bônus ⬇️</div>
            </article>
            <article className="price-card complete">
              <div className="recommended">PACOTE COMPLETO — RECOMENDADO</div>
              <h3>PACOTE COMPLETO</h3>
              <MediaSlot className="price-mockup" label="Mockup do pacote completo" src="/images/mockups/mockup-principal.webp?v=optimized-1" />
              <ul>{completeItems.map((text) => <li key={text}><ThinCheck />{text}</li>)}</ul>
              <div className="exclusive"><b>BÔNUS EXCLUSIVOS:</b>{bonuses.map(([, title]) => <p key={title}>🎁 {title}</p>)}</div>
              <div className="saving">VOCÊ LEVA O KIT COMPLETO COM TODOS OS BÔNUS</div>
              <div className="price"><small>De R$ 77,90</small><strong>Por apenas R$ 27,90</strong></div>
              <a className="checkout-button" href="https://checkout.wiven.com.br/checkout/cmrkoamex0zlz01pqdtv13mqt?offer=5ML7DCH">QUERO ACESSO COMPLETO</a>
            </article>
          </div>
        </div>
      </section>

      <section className="guarantee section-light">
        <div className="container narrow center">
          <img className="guarantee-badge" src="/images/mockups/selo-30-dias.webp?v=optimized-1" alt="Selo de garantia de 30 dias" loading="lazy" decoding="async" />
          <h2>VOCÊ TEM 30 DIAS PARA TESTAR SEM RISCO</h2>
          <p>Você recebe acesso imediato ao Kit Mapas Diagnósticos Sem Troca-Troca e pode analisar todo o material com calma.</p>
          <CTA />
        </div>
      </section>

      <section className="access sky-gradient">
        <div className="container wide">
          <h2>VEJA COMO É SIMPLES RECEBER O SEU MATERIAL</h2><p className="subtitle">(PASSO A PASSO)</p>
          <div className="steps">
            {[["🛒", "1. Escolha o seu pacote", "Selecione o Pacote Básico ou o Pacote Completo."], ["💳", "2. Faça o pagamento", "Preencha seus dados e conclua a compra com segurança."], ["⚡", "3. Receba o acesso imediatamente", "Após o pagamento, você recebe o acesso ao material."], ["📥", "4. Baixe os mapas", "Salve os arquivos no celular, tablet ou computador."], ["🔧", "5. Consulte durante o serviço", "Abra o mapa da falha encontrada e siga a sequência de verificação."]].map(([icon, title, copy]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="center"><CTA /></div>
        </div>
      </section>

      <section className="faq section-light">
        <div className="container narrow">
          <h2>AINDA FICOU COM ALGUMA DÚVIDA?</h2>
          <div className="faq-list">
            {faq.map(([question, answer], index) => (
              <article key={question} className={openFaq === index ? "open" : ""}>
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{index + 1}. {question}</span><i>{openFaq === index ? "⌃" : "⌄"}</i>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="container narrow center">
          <h3>Kit Mapas Diagnósticos Sem Troca-Troca</h3>
          <nav><a href="#">Termos de Uso</a><span>|</span><a href="#">Política de Privacidade</a><span>|</span><a href="#">Suporte</a></nav>
          <hr />
          <p>© Todos os direitos reservados ao Kit Mapas Diagnósticos Sem Troca-Troca.</p>
          <p>Este é um produto digital de apoio ao diagnóstico automotivo. A reprodução, cópia ou distribuição sem autorização é proibida nos termos da Lei nº 9.610/98.</p>
        </div>
      </footer>
    </main>
  );
}
