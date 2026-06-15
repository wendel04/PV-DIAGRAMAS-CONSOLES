/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, CreditCard, Landmark, CheckCircle2, 
  Copy, Check, ChevronRight, Sparkles, HelpCircle 
} from 'lucide-react';
import { PriceTier } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: PriceTier | null;
  theme: string;
}

export default function CheckoutModal({ isOpen, onClose, tier, theme }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('pix');
  
  // Form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);
  const [cardType, setCardType] = useState<'visa' | 'master' | 'default'>('default');

  const [copiedPix, setCopiedPix] = useState(false);
  const [pixCountdown, setPixCountdown] = useState(600); // 10 minutes

  // Reset forms on reopen or change
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPaymentMethod('pix');
      setCardNumber('');
      setCardHolder('');
      setCardExpiry('');
      setCardCvv('');
      setInstallments(tier ? tier.installmentsCount : 12);
      setPixCountdown(600);
      setCopiedPix(false);
    }
  }, [isOpen, tier]);

  // PIX countdown ticking
  useEffect(() => {
    if (step === 2 && paymentMethod === 'pix' && pixCountdown > 0) {
      const interval = setInterval(() => {
        setPixCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, paymentMethod, pixCountdown]);

  if (!isOpen || !tier) return null;

  // Auto detect card type
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    // Format card number: XXXX XXXX XXXX XXXX
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);

    if (value.startsWith('4')) {
      setCardType('visa');
    } else if (value.startsWith('5') || value.startsWith('2')) {
      setCardType('master');
    } else {
      setCardType('default');
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const formattedPixCountdown = () => {
    const mins = Math.floor(pixCountdown / 60);
    const secs = pixCountdown % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopiPix = () => {
    const pixKey = "00020101021226830014br.gov.bcb.pix2561api.kiwify.com.br/v2/cob/0aa839fd-9fca-443b-85cd-dfc9a56e09e1310108303986540503.905802BR5915MetodoIAScaler6009Sao%20Paulo62070503***6304ED2A";
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !phone) {
        alert('Por favor, preencha todos os campos cadastrais obrigatórios.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (paymentMethod === 'card') {
        const cleanCard = cardNumber.replace(/\s/g, '');
        if (cleanCard.length < 16 || !cardHolder || cardExpiry.length < 5 || cardCvv.length < 3) {
          alert('Por favor, preencha todos os dados do cartão de crédito corretamente.');
          return;
        }
      }
      setStep(3);
    }
  };

  // Theme matching colors
  const getThemeColor = () => {
    switch (theme) {
      case 'clean-emerald': return 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500';
      case 'hotmart-pink': return 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500';
      case 'minimal-indigo': return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
      case 'midnight-blue': return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      case 'premium-gold': return 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400 text-slate-900 font-bold';
      default: return 'bg-zinc-950 hover:bg-zinc-900 focus:ring-zinc-850';
    }
  };

  const getThemeText = () => {
    switch (theme) {
      case 'clean-emerald': return 'text-emerald-500';
      case 'hotmart-pink': return 'text-pink-500';
      case 'minimal-indigo': return 'text-indigo-500';
      case 'midnight-blue': return 'text-blue-500';
      case 'premium-gold': return 'text-amber-500';
      default: return 'text-zinc-900';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" id="checkout-modal-overlay">
      <div className="relative w-full max-w-xl overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]" id="checkout-modal-container">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800" id="checkout-modal-header">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-300">Ambiente 100% Seguro</h3>
              <p className="text-xs text-slate-400">Checkout simulado e Blindado</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Fecar modal"
            id="btn-close-checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Tracker */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium" id="checkout-steps-indicator">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-slate-900 font-semibold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-800'}`}>
              {step > 1 ? <Check className="w-3" /> : '1'}
            </span>
            Meus Dados
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-slate-900 font-semibold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step > 2 ? 'bg-emerald-100 text-emerald-600' : step === 2 ? 'bg-slate-950 text-white' : 'bg-slate-200 text-slate-505'}`}>
              {step > 2 ? <Check className="w-3" /> : '2'}
            </span>
            Pagamento
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-slate-900 font-semibold' : ''}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-505'}`}>
              3
            </span>
            Confirmação
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800" id="checkout-modal-content">
          
          {/* Summary Mini-Card */}
          {step < 3 && (
            <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center" id="checkout-summary-mini">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Você está adquirindo:</p>
                <h4 className="font-bold text-slate-900 text-sm">{tier.name}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{tier.badge}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] block text-slate-500 line-through">R$ {tier.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-medium text-slate-500">ou {tier.installmentsCount}x de</span>
                <p className="text-lg font-extrabold text-slate-900">R$ {tier.installmentsValue.toFixed(2)}</p>
                <div className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                  À vista: R$ {tier.currentPrice.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: IDENTITY DADA */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in" id="checkout-step1-fields">
              <h3 className="font-bold text-slate-900 text-base mb-1">Informações de Contato</h3>
              <p className="text-xs text-slate-500 -mt-2">Seus dados de acesso serão enviados para este endereço.</p>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text"
                  placeholder="EX: João Silva de Souza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  id="checkout-name-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail Principal</label>
                <input 
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  id="checkout-email-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Celular com DDD</label>
                <input 
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  id="checkout-phone-input"
                />
              </div>

              <div className="pt-2 flex items-start gap-2 text-slate-400 text-[10px]">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
                <p>Nós respeitamos sua privacidade. Seus dados estão protegidos por criptografia de ponta a ponta em conformidade com a LGPD brasileira.</p>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD CHOICE */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in" id="checkout-step2-options">
              
              {/* Payment Methods Selector Tabs */}
              <div className="grid grid-cols-3 gap-2" id="checkout-payment-methods">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition ${paymentMethod === 'pix' ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
                  id="tab-pay-pix"
                >
                  <Landmark className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold font-sans">PIX</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">Imediato</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
                  id="tab-pay-card"
                >
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold font-sans">Cartão</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">Parcele 12x</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('boleto')}
                  className={`flex flex-col items-center p-3 rounded-xl border text-center transition ${paymentMethod === 'boleto' ? 'border-slate-800 bg-slate-50 text-slate-950' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
                  id="tab-pay-boleto"
                >
                  <div className="font-mono text-xs font-black uppercase border border-current px-1 leading-none mb-1">||||</div>
                  <span className="text-xs font-bold font-sans">Boleto</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">3 dias úteis</span>
                </button>
              </div>

              {/* PIX Details */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center space-y-4 animate-fade-in" id="pix-payment-panel">
                  <div className="bg-sky-50 p-2.5 rounded-full">
                    <Landmark className="w-6 h-6 text-sky-600 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Escaneie o QR Code abaixo para pagar à vista</h4>
                    <p className="text-xs text-slate-500 mt-1">O seu acesso será liberado em segundos, no mesmo instante do pagamento.</p>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="relative p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=MetodoIAScalerCheckoutSimulation&color=0ea5e9`} 
                      alt="Simulador QR Code PIX" 
                      className="w-[140px] h-[140px]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/5 hover:bg-transparent transition cursor-pointer flex items-center justify-center group">
                      <span className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md font-bold opacity-0 group-hover:opacity-100 transition duration-200">PIX ATIVO</span>
                    </div>
                  </div>

                  {/* Timer Info & Copy button */}
                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-center text-xs px-2 text-slate-600">
                      <span>Este código expira em:</span>
                      <strong className="text-red-500 font-mono tracking-wider">{formattedPixCountdown()}</strong>
                    </div>
                    
                    <button
                      onClick={handleCopiPix}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition active:scale-98"
                      id="btn-copy-pix"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>Código Copiado com Sucesso!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>Copiar Código Pix Copia e Cola</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* CREDIT CARD DETAILS */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in" id="creditcard-payment-panel">
                  
                  {/* Virtual Credit Card Display */}
                  <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-2xl relative overflow-hidden shadow-lg border border-slate-800 aspect-[1.586/1] h-36 mx-auto flex flex-col justify-between" id="virtual-credit-card">
                    {/* Chip and Type */}
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-6 bg-yellow-600/30 border border-yellow-500/30 rounded" />
                      <span className="text-xs uppercase font-black italic tracking-widest text-slate-400">
                        {cardType === 'visa' && 'VISA'}
                        {cardType === 'master' && 'MASTERCARD'}
                        {cardType === 'default' && 'SECURE PAY'}
                      </span>
                    </div>

                    {/* Card Number */}
                    <p className="font-mono text-center text-base tracking-[0.2em] py-2">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </p>

                    {/* Holder and Expiry */}
                    <div className="flex justify-between items-end text-[10px]">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wider">Titular</span>
                        <span className="font-semibold block truncate max-w-[140px] uppercase">
                          {cardHolder || 'NOME DO TITULAR'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-slate-500 uppercase tracking-wider">Validade</span>
                        <span className="font-semibold block font-mono">
                          {cardExpiry || 'MM/AA'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fields input */}
                  <div className="grid grid-cols-2 gap-3" id="cc-input-grid">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Número do Cartão</label>
                      <input 
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-950"
                        id="cc-number-input"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Impresso no Cartão</label>
                      <input 
                        type="text"
                        placeholder="NOME IGUAL NO CARTÃO"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-slate-950"
                        id="cc-name-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Validade (MM/AA)</label>
                      <input 
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-slate-950"
                        id="cc-expiry-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVV / Segurança</label>
                      <input 
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-slate-950"
                        id="cc-cvv-input"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Opções de Parcelamento</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-950"
                        id="cc-installments-select"
                      >
                        {Array.from({ length: tier.installmentsCount }).map((_, idx) => {
                          const count = idx + 1;
                          const value = tier.installmentsValue * (idx === 0 ? 0.9 : 1); // Mock minor discount if 1x
                          return (
                            <option key={count} value={count}>
                              {count}x de R$ {value.toFixed(2)} {count === 1 ? '(Com Desconto)' : 'sem juros'}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* BOLETO DETAILS */}
              {paymentMethod === 'boleto' && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center space-y-4 animate-fade-in" id="boleto-payment-panel">
                  <div className="font-mono text-xl text-slate-800 tracking-wider font-extrabold uppercase py-2 leading-none border-b border-orange-200 w-full">
                    BOLETO BANCÁRIO
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Gere o boleto bancário para pagamento</h4>
                    <p className="text-xs text-slate-500 mt-1">Aprovação em até 3 dias úteis. Compensação tradicional bancária.</p>
                  </div>
                  
                  <div className="w-full bg-white border border-slate-200 p-3 rounded-lg text-xs font-mono select-all flex items-center justify-between text-slate-700">
                    <span>34191.79001 01043.513184 91020.150008 7 923400000{tier.currentPrice.toFixed(0)}</span>
                  </div>
                  <p className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded">Taxa de boleto bancário de R$ 1,50 inclusa na compra.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION SCREEN */}
          {step === 3 && (
            <div className="py-6 flex flex-col items-center text-center space-y-4 animate-fade-in" id="checkout-step3-success">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center animate-scale-up">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Inscrição Confirmada!</h3>
                <p className="text-xs text-slate-500">Parabéns por dar este passo importante rumo ao sucesso.</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl w-full text-left space-y-3 mt-4 text-xs">
                <div className="flex gap-2 items-start">
                  <span className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-slate-800 block">E-mail de Acesso Enviado</strong>
                    <p className="text-slate-500">Enviamos os dados de login e senha para: <strong className="text-slate-800">{email || 'cadastro@email.com'}</strong></p>
                  </div>
                </div>

                <div className="flex gap-2 items-start border-t border-slate-100 pt-3">
                  <span className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-slate-800 block">Comunidade VIP Liberada</strong>
                    <p className="text-slate-500">O link de convite oficial para o Discord Privado está em seu painel de aluno.</p>
                  </div>
                </div>

                <div className="flex gap-2 items-start border-t border-slate-100 pt-3">
                  <span className="w-4 h-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-slate-800 block">Suporte Disponível</strong>
                    <p className="text-slate-500">Se precisar de qualquer auxílio, contate nosso time de sucesso do cliente.</p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 text-center w-full pt-4">
                Simulador de Compra Ativo • Código #IKD-921832
              </div>
            </div>
          )}

        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center gap-4" id="checkout-modal-footer">
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep(prev => (prev - 1) as 1 | 2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 focus:outline-none transition"
              id="btn-back-step"
            >
              Voltar
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Garantia de Reembolso Ativa</span>
            </div>
          )}

          {step < 3 ? (
            <button
              onClick={handleNextStep}
              className={`px-6 py-2.5 rounded-lg text-xs font-extrabold shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 ${getThemeColor()}`}
              id="btn-next-step"
            >
              <span>{step === 1 ? 'Prosseguir para Pagamento' : paymentMethod === 'pix' ? 'Confirmar Pagamento Simulado' : 'Finalizar Inscrição'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className={`w-full text-center px-4 py-2.5 rounded-lg text-xs font-bold font-sans ${getThemeColor()}`}
              id="btn-success-finish"
            >
              Entrar na Área de Membros
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
