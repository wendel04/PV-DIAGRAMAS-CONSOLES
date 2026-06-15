/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, Wrench, Palette, HelpCircle, 
  Settings, Save, FileCode, CheckCircle2, 
  Trash2, Plus, VolumeX, Landmark, AlertCircle, RefreshCw
} from 'lucide-react';
import { SalesPageConfig, FeatureItem, Testimonial, FAQItem, PriceTier } from '../types';

interface SidebarProps {
  config: SalesPageConfig;
  onChange: (newConfig: SalesPageConfig) => void;
  onReset: () => void;
}

// Built-in presets to bootstrap niching
const PRESETS: { [key: string]: { name: string; theme: string; headline: string; subheadline: string; cta: string; price: number } } = {
  ai_agency: {
    name: "🤖 Agência e Automação de IA (Padrão)",
    theme: "premium-gold",
    headline: "Descubra o Método Exclusivo para Faturar de R$ 3.000 a R$ 10.000/Mês Prestando Serviços Simples de Inteligência Artificial",
    subheadline: "Sem precisar programar, sem gastar fortunas com anúncios e sem nenhuma experiência prévia. O passo a passo definitivo para você faturar com contratos recorrentes em menos de 15 dias.",
    cta: "QUERO GARANTIR MINHA VAGA COM 70% OFF",
    price: 297
  },
  fitness_health: {
    name: "🍏 Emagrecimento & Vida Saudável",
    theme: "clean-emerald",
    headline: "O Protocolo de Aceleração Metabólica de 21 Dias que Elimina até 7kg sem Dietas Restritivas",
    subheadline: "Descubra a ciência por trás do jejum intercalado inteligente combinado com shots matinais de ativação hormonal. Tenha mais energia, queime gordura visceral e recupere sua autoestima.",
    cta: "MIGRAR PROTOCOLO COM DESCONTO",
    price: 97
  },
  finance_investing: {
    name: "💰 Liberdade Financeira & Investimentos",
    theme: "midnight-blue",
    headline: "Como Montar uma Carteira Blindada Geradora de Dividendos Mensais com apenas R$ 100",
    subheadline: "Pare de deixar seu capital morrendo na poupança. Aprenda o checklist absoluto usado pelos maiores fundos de private-equity para coletar rendas passivas seguras de fundos imobiliários e ações baratas.",
    cta: "QUERO APRENDER A INVESTIR AGORA",
    price: 197
  },
  female_gourmet: {
    name: "🍰 Doces Gourmet & Confeitaria",
    theme: "hotmart-pink",
    headline: "Fature de R$ 2.050 a R$ 5.000 de Casa com os Verdadeiros Brigadeiros Gourmet Exclusivos",
    subheadline: "Torne-se uma confeiteira profissional altamente valorizada em sua cidade. Aprenda as 30 receitas secretas testadas, técnicas de embalagens elegantes e estratégias de Instagram para vender todos os dias.",
    cta: "QUERO O LIVRO DE RECEITAS COMPLETO",
    price: 47
  }
};

export default function Sidebar({ config, onChange, onReset }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'headline' | 'features' | 'testimonials' | 'pricing' | 'faq' | 'theme'>('ai');
  
  // AI Clone text fields
  const [targetDescription, setTargetDescription] = useState('');
  const [rawText, setRawText] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Trigger server-side AI parsing/generation
  const handleAiClone = async () => {
    if (!targetDescription && !rawText) {
      setAiError('Por favor, descreva o produto ou cole algum rascunho de texto para clonar.');
      return;
    }

    setLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetDescription, rawText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro desconhecido no servidor.');
      }

      // Safe update
      onChange(data);
      alert('Landing Page Replicada com Sucesso pela Inteligência Artificial! Veja o resultado ao lado.');
      setTargetDescription('');
      setRawText('');
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Erro de rede ao conectar com o serviço de Copywriting por IA.');
    } finally {
      setLoadingAi(false);
    }
  };

  // Helper template toggler
  const applyPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    const newConfig: SalesPageConfig = {
      ...config,
      headline: preset.headline,
      subheadline: preset.subheadline,
      primaryCtaText: preset.cta,
      theme: preset.theme as any,
      priceTitle: "Inscrições abertas por tempo extremamente limitado",
      priceTiers: [
        {
          id: "p_1",
          name: "Plano Semestral",
          badge: "ACELERAÇÃO INDIVIDUAL",
          originalPrice: preset.price * 2,
          currentPrice: preset.price,
          installmentsCount: 12,
          installmentsValue: parseFloat(((preset.price * 1.1) / 12).toFixed(2)),
          features: [
            "Acesso aos arquivos principais",
            "Suporte exclusivo do produtor",
            "Módulos práticos em vídeo"
          ],
          ctaText: "GARANTIR ACESSO SIMPLIFICADO"
        },
        {
          id: "p_2",
          name: "Plano Vitalício + Suporte Platinum",
          badge: "A MELHOR ESCOLHA",
          originalPrice: preset.price * 3,
          currentPrice: parseFloat((preset.price * 1.6).toFixed(0)),
          installmentsCount: 12,
          installmentsValue: parseFloat((((preset.price * 1.6) * 1.1) / 12).toFixed(2)),
          features: [
            "Acesso eterno ao conteúdo completo",
            "Suporte VIP 24h via WhatsApp",
            "Grupo fechado de contatos comerciais",
            "Garantia estendida de satisfação",
            "Atualizações exclusivas grátis"
          ],
          ctaText: "QUERO O PLANO COMPLETO VITALÍCIO",
          isPopular: true
        }
      ]
    };
    onChange(newConfig);
  };

  // Live item modifications for nested fields
  const handleConfigChange = (key: keyof SalesPageConfig, value: any) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  // Features list manager
  const updateFeatureItem = (id: string, field: keyof FeatureItem, value: string) => {
    const updatedFeatures = config.features.map(f => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    handleConfigChange('features', updatedFeatures);
  };

  const addFeatureItem = () => {
    const newItem: FeatureItem = {
      id: `feat_${Date.now()}`,
      icon: 'Zap',
      title: 'Nova Vantagem Incrível',
      description: 'Breve explicação persuasiva do que o aluno vai receber.'
    };
    handleConfigChange('features', [...config.features, newItem]);
  };

  const deleteFeatureItem = (id: string) => {
    handleConfigChange('features', config.features.filter(f => f.id !== id));
  };

  // Testimonials manager
  const updateTestimonialItem = (id: string, field: keyof Testimonial, value: any) => {
    const updated = config.testimonials.map(t => {
      if (t.id === id) {
        return { ...t, [field]: value };
      }
      return t;
    });
    handleConfigChange('testimonials', updated);
  };

  const addTestimonialItem = () => {
    const newItem: Testimonial = {
      id: `test_${Date.now()}`,
      name: 'Nome do Comprador',
      role: '@instagram_ou_profissao',
      rating: 5,
      content: 'Eu recomendo muito este curso! É prático, objetivo e mudou completamente meus resultados.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
    };
    handleConfigChange('testimonials', [...config.testimonials, newItem]);
  };

  // FAQ manager
  const updateFaqItem = (id: string, field: keyof FAQItem, value: string) => {
    const updated = config.faqs.map(f => {
      if (f.id === id) {
        return { ...f, [field]: value };
      }
      return f;
    });
    handleConfigChange('faqs', updated);
  };

  const addFaqItem = () => {
    const newItem: FAQItem = {
      id: `faq_${Date.now()}`,
      question: 'Eu tenho interesse, como posso pagar?',
      answer: 'Você pode realizar sua inscrição por PIX (aprovado instantaneamente), Cartão de Crédito parcelado em até 12x ou boleto.'
    };
    handleConfigChange('faqs', [...config.faqs, newItem]);
  };

  // Export full static single HTML code
  const handleExportHtml = () => {
    const htmlSnippet = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.headline.slice(0, 40)}...</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans">
  <!-- Você pode rodar isso em qualquer host. Esta página está no tema ${config.theme} -->
  <!-- Visite o Replicador para exportar seu código completo estruturado! -->
  <div class="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 class="text-3xl font-extrabold text-amber-400 mb-6">${config.headline}</h1>
    <p class="text-slate-400 text-lg mb-8">${config.subheadline}</p>
    <a href="#" class="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold uppercase rounded-xl transition inline-block">
      ${config.primaryCtaText}
    </a>
  </div>
</body>
</html>`;

    navigator.clipboard.writeText(htmlSnippet);
    alert('Código HTML rascunhado para cópia com sucesso! Você pode colá-lo em seu arquivo index.html no Host.');
  };

  return (
    <div className="w-full h-full bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col overflow-hidden select-none" id="sidebar-container">
      
      {/* Sidebar Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between" id="sidebar-header">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-500 animate-spin-slow animate-pulse" />
          <div>
            <h1 className="text-sm font-black tracking-wider uppercase text-white font-sans flex items-center gap-1.5">
              Estúdio de Vendas
            </h1>
            <p className="text-[10px] text-zinc-500">Desenvolva copy & design por IA</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-zinc-500 hover:text-white transition duration-200 text-xs px-2 py-1 rounded bg-slate-900 border border-slate-800"
          id="btn-reset-studio"
        >
          Limpar Edição
        </button>
      </div>

      {/* Control Tabs Selector */}
      <div className="flex bg-slate-950 border-b border-slate-800 text-xs font-semibold overflow-x-auto whitespace-nowrap scrollbar-none" id="sidebar-tabs">
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'ai' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-ai"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          IA Cloner
        </button>
        <button 
          onClick={() => setActiveTab('headline')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'headline' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-headline"
        >
          Headline & VSL
        </button>
        <button 
          onClick={() => setActiveTab('features')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'features' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-features"
        >
          Vantagens
        </button>
        <button 
          onClick={() => setActiveTab('testimonials')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'testimonials' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-testimonials"
        >
          Depoimentos
        </button>
        <button 
          onClick={() => setActiveTab('pricing')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'pricing' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-pricing"
        >
          Planos
        </button>
        <button 
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'faq' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-faq"
        >
          Perguntas FAQ
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-1.5 px-4 py-3 border-b-2 transition shrink-0 ${activeTab === 'theme' ? 'border-amber-400 text-amber-400 bg-slate-900/50' : 'border-transparent text-zinc-400 hover:text-white'}`}
          id="tab-select-theme"
        >
          Estilo
        </button>
      </div>

      {/* Tab Contents Frame */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" id="sidebar-scrollable-content">
        
        {/* TAB 1: AI CLONER / COPYS GENERATOR */}
        {activeTab === 'ai' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-ai">
            
            {/* Quick alert context */}
            <div className="p-3 bg-indigo-950/40 border border-indigo-900/40 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Clonar Página à Distância</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Copie o texto inteiro de qualquer página de vendas do seu nicho, cole abaixo e assinale as características. Nossa IA irá reordenar tudo, melhorar os gatilhos mentais e formatar sua copy completa!
              </p>
            </div>

            {/* Prompt configuration inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Descrição / Nicho do Produto</label>
                <textarea
                  value={targetDescription}
                  onChange={(e) => setTargetDescription(e.target.value)}
                  placeholder="EX: É um curso de Marketing de Afiliados focado em mães solteiras que querem trabalhar de casa..."
                  rows={2}
                  className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  id="ai-description-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Texto Bruto Para Replicar/Melhorar</label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Selecione e copie o texto todo de uma página de vendas concorrente ou rascunho de copy e cole aqui..."
                  rows={5}
                  className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  id="ai-raw-input"
                />
              </div>

              {aiError && (
                <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 rounded-lg text-[11px] flex items-start gap-2" id="ai-error-box">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-normal">{aiError}</p>
                </div>
              )}

              <button
                onClick={handleAiClone}
                disabled={loadingAi}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs tracking-wide transition flex items-center justify-center gap-1.5 shadow shadow-amber-500/20 disabled:opacity-50"
                id="btn-ai-clone-trigger"
              >
                {loadingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                    <span>Nossa IA está Extraindo & Refinando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Clonar & Otimizar com IA</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets Grid */}
            <div className="border-t border-slate-800 pt-4 space-y-2.5" id="presets-panel">
              <h3 className="text-xs font-black tracking-wider uppercase text-zinc-400">Modelos de Início Rápido</h3>
              <p className="text-[10px] text-zinc-500 -mt-1 leading-normal">Selecione um nicho abaixo para ver a página funcionar instantaneamente em tempo real:</p>
              
              <div className="grid grid-cols-1 gap-2" id="presets-buttons-grid">
                {Object.keys(PRESETS).map((presetKey) => (
                  <button
                    key={presetKey}
                    onClick={() => applyPreset(presetKey)}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-left hover:border-slate-700 transition flex justify-between items-center group"
                    id={`btn-preset-apply-${presetKey}`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-slate-100 group-hover:text-amber-400 transition block">
                        {PRESETS[presetKey].name}
                      </span>
                      <p className="text-[9px] text-zinc-500 mt-0.5">Preço recomendado: R$ {PRESETS[presetKey].price},00</p>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono group-hover:text-white transition">Aplicar →</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: HEADLINE & VSL VIDEO CHANNELS */}
        {activeTab === 'headline' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-headline">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Aviso Superior (Badge Vermelho)</label>
              <input 
                type="text"
                value={config.vslBadge}
                onChange={(e) => handleConfigChange('vslBadge', e.target.value)}
                className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs focus:ring-1 focus:ring-amber-400"
                id="edit-vsl-badge"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Headline Principal (Promessa única)</label>
              <textarea
                value={config.headline}
                onChange={(e) => handleConfigChange('headline', e.target.value)}
                rows={3}
                className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs leading-normal"
                id="edit-headline"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Subheadline explicativa</label>
              <textarea
                value={config.subheadline}
                onChange={(e) => handleConfigChange('subheadline', e.target.value)}
                rows={3}
                className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs leading-normal"
                id="edit-subheadline"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Minutos Cronômetro</label>
                <input 
                  type="number"
                  value={config.countdownMinutes}
                  onChange={(e) => handleConfigChange('countdownMinutes', Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                  id="edit-countdown"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Texto Principal CTA</label>
                <input 
                  type="text"
                  value={config.primaryCtaText}
                  onChange={(e) => handleConfigChange('primaryCtaText', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs font-semibold"
                  id="edit-primary-cta"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADVANTAGES / FEATURES LIST */}
        {activeTab === 'features' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-features">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Título Seção</label>
                <input 
                  type="text"
                  value={config.featuresTitle}
                  onChange={(e) => handleConfigChange('featuresTitle', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                  id="edit-features-title"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-legenda</label>
                <input 
                  type="text"
                  value={config.featuresSubtitle}
                  onChange={(e) => handleConfigChange('featuresSubtitle', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                  id="edit-features-subtitle"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3" id="edit-features-list">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-300">Grade de Vantagens ({config.features.length})</span>
                <button 
                  onClick={addFeatureItem}
                  className="px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-amber-400 font-bold flex items-center gap-1"
                  id="btn-add-feature"
                >
                  <Plus className="w-3" /> Adicionar
                </button>
              </div>

              {config.features.map((feat) => (
                <div key={feat.id} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2 relative" id={`edit-feature-${feat.id}`}>
                  <button 
                    onClick={() => deleteFeatureItem(feat.id)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-red-500 transition"
                    id={`btn-del-feature-${feat.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Ícone</label>
                      <select
                        value={feat.icon}
                        onChange={(e) => updateFeatureItem(feat.id, 'icon', e.target.value)}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                        id={`edit-feature-icon-${feat.id}`}
                      >
                        <option value="Zap">Raio (Zap)</option>
                        <option value="Cpu">Processador</option>
                        <option value="Award">Certificado</option>
                        <option value="Users2">Comunidade</option>
                        <option value="ShieldAlert">Escudo</option>
                        <option value="Coins">Moedas</option>
                        <option value="TrendingUp">Gráfico</option>
                        <option value="Lock">Cadeado</option>
                        <option value="MessageSquareText">Suporte</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Título</label>
                      <input 
                        type="text"
                        value={feat.title}
                        onChange={(e) => updateFeatureItem(feat.id, 'title', e.target.value)}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                        id={`edit-feature-title-${feat.id}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold mb-1">Descrição Curta</label>
                    <textarea 
                      value={feat.description}
                      onChange={(e) => updateFeatureItem(feat.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white leading-tight"
                      id={`edit-feature-desc-${feat.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TESTIMONIALS (DEPOIMENTOS) */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-testimonials">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Título da Seção de Alunos</label>
              <input 
                type="text"
                value={config.testimonialsTitle}
                onChange={(e) => handleConfigChange('testimonialsTitle', e.target.value)}
                className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                id="edit-testimonials-title"
              />
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3" id="edit-testimonials-list">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-300">Depoimentos Simulados ({config.testimonials.length})</span>
                <button 
                  onClick={addTestimonialItem}
                  className="px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-amber-400 font-bold flex items-center gap-1"
                  id="btn-add-test"
                >
                  <Plus className="w-3" /> Adicionar
                </button>
              </div>

              {config.testimonials.map((test) => (
                <div key={test.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2 relative" id={`edit-test-${test.id}`}>
                  <button 
                    onClick={() => handleConfigChange('testimonials', config.testimonials.filter(t => t.id !== test.id))}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-red-500"
                    id={`btn-del-test-${test.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Nome Completo</label>
                      <input 
                        type="text"
                        value={test.name}
                        onChange={(e) => updateTestimonialItem(test.id, 'name', e.target.value)}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white animate-fade-in"
                        id={`edit-test-name-${test.id}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Role / @Instagram</label>
                      <input 
                        type="text"
                        value={test.role}
                        onChange={(e) => updateTestimonialItem(test.id, 'role', e.target.value)}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                        id={`edit-test-role-${test.id}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold mb-1">Conteúdo Depoimento</label>
                    <textarea 
                      value={test.content}
                      onChange={(e) => updateTestimonialItem(test.id, 'content', e.target.value)}
                      rows={2}
                      className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white leading-normal"
                      id={`edit-test-content-${test.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Author Expert Fields */}
            <div className="border-t border-slate-800 pt-4 space-y-3" id="edit-author-details">
              <h4 className="text-xs font-black tracking-wider uppercase text-zinc-400">Detalhes do Produtor/Mentor</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-zinc-500 font-bold mb-1">Nome Autor</label>
                  <input 
                    type="text"
                    value={config.authorName}
                    onChange={(e) => handleConfigChange('authorName', e.target.value)}
                    className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                    id="edit-author-name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-500 font-bold mb-1">Cargo/Credencial</label>
                  <input 
                    type="text"
                    value={config.authorRole}
                    onChange={(e) => handleConfigChange('authorRole', e.target.value)}
                    className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                    id="edit-author-role"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-500 font-bold mb-1">Biografia Curta do Produtor</label>
                <textarea 
                  value={config.authorBio}
                  onChange={(e) => handleConfigChange('authorBio', e.target.value)}
                  rows={3}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs leading-normal"
                  id="edit-author-bio"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PRICING / OFFER PLANOS */}
        {activeTab === 'pricing' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-pricing">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Título Oferta</label>
                <input 
                  type="text"
                  value={config.priceTitle}
                  onChange={(e) => handleConfigChange('priceTitle', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                  id="edit-pricing-title"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">Legenda Oferta</label>
                <input 
                  type="text"
                  value={config.priceSubtitle}
                  onChange={(e) => handleConfigChange('priceSubtitle', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white text-xs"
                  id="edit-pricing-subtitle"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3" id="edit-pricing-tiers">
              <span className="text-xs font-bold text-zinc-300 block">Planos Ativos</span>

              {config.priceTiers.map((tier, idx) => (
                <div key={tier.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-3" id={`edit-price-${tier.id}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-400">Plano #{idx + 1}: {tier.name}</span>
                    <label className="flex items-center gap-1.5 text-[10px] text-zinc-400 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={tier.isPopular || false}
                        onChange={(e) => {
                          const updated = config.priceTiers.map(pt => {
                            if (pt.id === tier.id) return { ...pt, isPopular: e.target.checked };
                            // Only one popular tier allowed
                            if (e.target.checked) return { ...pt, isPopular: false };
                            return pt;
                          });
                          handleConfigChange('priceTiers', updated);
                        }}
                        className="rounded bg-slate-900 border-slate-800"
                        id={`edit-price-fav-${tier.id}`}
                      />
                      Destaque Popular
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Nome Plano</label>
                      <input 
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const pr = config.priceTiers.map(p => p.id === tier.id ? { ...p, name: e.target.value } : p);
                          handleConfigChange('priceTiers', pr);
                        }}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                        id={`edit-price-name-${tier.id}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Selo Chamada Promo</label>
                      <input 
                        type="text"
                        value={tier.badge || ''}
                        onChange={(e) => {
                          const pr = config.priceTiers.map(p => p.id === tier.id ? { ...p, badge: e.target.value } : p);
                          handleConfigChange('priceTiers', pr);
                        }}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                        id={`edit-price-badge-${tier.id}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Preço Riscado</label>
                      <input 
                        type="number"
                        value={tier.originalPrice}
                        onChange={(e) => {
                          const val = Math.max(0, parseFloat(e.target.value));
                          const pr = config.priceTiers.map(p => p.id === tier.id ? { ...p, originalPrice: val } : p);
                          handleConfigChange('priceTiers', pr);
                        }}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white font-mono"
                        id={`edit-price-orig-${tier.id}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Preço À Vista</label>
                      <input 
                        type="number"
                        value={tier.currentPrice}
                        onChange={(e) => {
                          const val = Math.max(0, parseFloat(e.target.value));
                          // Auto calculate raw installment suggestion
                          const suggestedInstallment = parseFloat(((val * 1.1) / 12).toFixed(2));
                          const pr = config.priceTiers.map(p => p.id === tier.id ? { ...p, currentPrice: val, installmentsValue: suggestedInstallment } : p);
                          handleConfigChange('priceTiers', pr);
                        }}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white font-mono"
                        id={`edit-price-curr-${tier.id}`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-500 font-bold mb-1">Valor Parcela</label>
                      <input 
                        type="number"
                        value={tier.installmentsValue}
                        onChange={(e) => {
                          const val = Math.max(0, parseFloat(e.target.value));
                          const pr = config.priceTiers.map(p => p.id === tier.id ? { ...p, installmentsValue: val } : p);
                          handleConfigChange('priceTiers', pr);
                        }}
                        className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white font-mono"
                        id={`edit-price-value-${tier.id}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantee Days Card */}
            <div className="border-t border-slate-800 pt-4 space-y-3" id="edit-guarantee-details">
              <h4 className="text-xs font-black tracking-wider uppercase text-zinc-400">Blidagem de Satisfação (Garantia)</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[10px] text-zinc-500 font-bold mb-1">Dias Garantia</label>
                  <select
                    value={config.guaranteeDays}
                    onChange={(e) => handleConfigChange('guaranteeDays', Number(e.target.value))}
                    className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                    id="edit-guarantee-days"
                  >
                    <option value="7">7 dias (Padrão)</option>
                    <option value="15">15 dias</option>
                    <option value="30">30 dias</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] text-zinc-500 font-bold mb-1">Texto Promessa Garantia</label>
                  <textarea 
                    value={config.guaranteeText}
                    onChange={(e) => handleConfigChange('guaranteeText', e.target.value)}
                    rows={3}
                    className="w-full p-1.5 rounded bg-slate-950 border border-slate-800 text-white text-xs leading-normal"
                    id="edit-guarantee-text"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FAQ ACCORDION MANAGER */}
        {activeTab === 'faq' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-faq">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-zinc-300">Quebra de Objeções FAQ ({config.faqs.length})</span>
              <button 
                onClick={addFaqItem}
                className="px-2 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-amber-400 font-bold flex items-center gap-1"
                id="btn-add-faq"
              >
                <Plus className="w-3" /> Adicionar
              </button>
            </div>

            <div className="space-y-3" id="edit-faqs-accordion">
              {config.faqs.map((faq) => (
                <div key={faq.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2 relative" id={`edit-faq-${faq.id}`}>
                  <button 
                    onClick={() => handleConfigChange('faqs', config.faqs.filter(f => f.id !== faq.id))}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-red-500"
                    id={`btn-del-faq-${faq.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold mb-1">Pergunta Objeção</label>
                    <input 
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaqItem(faq.id, 'question', e.target.value)}
                      className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white"
                      id={`edit-faq-quest-${faq.id}`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold mb-1">Resposta Esclarecedora</label>
                    <textarea 
                      value={faq.answer}
                      onChange={(e) => updateFaqItem(faq.id, 'answer', e.target.value)}
                      rows={2}
                      className="w-full p-1 border border-slate-800 rounded bg-slate-900 text-xs text-white leading-normal"
                      id={`edit-faq-answ-${faq.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: STYLE STYLE CONFIGS (THEME) */}
        {activeTab === 'theme' && (
          <div className="space-y-4 animate-fade-in" id="content-tab-theme">
            <div>
              <span className="text-xs font-bold text-zinc-300 block mb-2">Selecione o Tema de Cores do Produto</span>
              <p className="text-[10px] text-zinc-500 mb-3 -mt-1 leading-normal">Mude instantaneamente toda a paleta visual do preview ao lado:</p>
              
              <div className="grid grid-cols-2 gap-2" id="theme-selectors-grid">
                {[
                  { id: 'premium-gold', labels: 'Premium Gold 🔥', colors: 'from-slate-950 via-slate-900 to-amber-500' },
                  { id: 'deep-dark', labels: 'Slate Dark 🌑', colors: 'from-zinc-950 via-zinc-900 to-zinc-500' },
                  { id: 'clean-emerald', labels: 'Green Emerald 🍀', colors: 'from-slate-950 via-slate-900 to-emerald-500' },
                  { id: 'midnight-blue', labels: 'Cyber Blue ⚡', colors: 'from-slate-950 via-slate-900 to-indigo-500' },
                  { id: 'minimal-indigo', labels: 'Indigo Purple 🔮', colors: 'from-zinc-950 via-zinc-900 to-purple-500' },
                  { id: 'hotmart-pink', labels: 'Hotmart Magenta 🌸', colors: 'from-stone-950 via-stone-900 to-pink-500' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => handleConfigChange('theme', th.id)}
                    className={`p-3 rounded-xl border text-center transition flex flex-col justify-between items-center h-20 ${
                      config.theme === th.id 
                        ? 'border-amber-400 bg-slate-950 text-white' 
                        : 'border-slate-800 bg-slate-950/40 text-zinc-400 hover:border-slate-750'
                    }`}
                    id={`btn-select-theme-${th.id}`}
                  >
                    <span className="text-[10px] font-bold">{th.labels}</span>
                    <div className={`w-12 h-3 rounded bg-gradient-to-r ${th.colors} mt-1`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Export triggers */}
            <div className="border-t border-slate-800 pt-5 space-y-2.5" id="export-panel">
              <h4 className="text-xs font-black tracking-wider uppercase text-zinc-400">Exportar Copy e Estrutura</h4>
              <p className="text-[10px] text-zinc-500 -mt-1 leading-normal">Nosso replicador otimiza códigos prontos. Gere e copie o index HTML para usar em sua hospedagem:</p>
              
              <button
                onClick={handleExportHtml}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-900 text-xs font-bold text-white tracking-wide transition flex items-center justify-center gap-1.5 shadow active:scale-98"
                id="btn-export-html-code"
              >
                <FileCode className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Copiar Código HTML Polido</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Persistent Workspace Footer Status */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-zinc-500 flex justify-between items-center" id="sidebar-footer">
        <span className="flex items-center gap-1">🟢 Workspace Ativo</span>
        <span>Replicador de Vendas v1.0</span>
      </div>

    </div>
  );
}
