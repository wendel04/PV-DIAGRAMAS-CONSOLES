/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = 3000;

// Initialize Gemini SDK with custom user agent and key from environment secrets
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST API logic
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiConfigured: !!apiKey });
});

// AI Cloning and Generation Route
app.post('/api/ai/clone', async (req, res) => {
  try {
    const { rawText, targetDescription } = req.body;

    if (!rawText && !targetDescription) {
      return res.status(400).json({ error: 'Você precisa fornecer um texto ou descrição para clonar.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Chave GEMINI_API_KEY não configurada. Por favor, adicione sua chave de API nas Configurações > Secrets do AI Studio para usar a clonagem automática.',
        fallbackSuggestion: true
      });
    }

    const systemPrompt = `Você é um Copywriter de elite focado em conversão extrema (Copywriting de alta performance no mercado brasileiro - Hotmart, Kiwify, Eduzz, etc). 
A sua missão é ler as informações fornecidas pelo usuário (que podem ser uma cópia imperfeita de texto, uma descrição rústica de um produto concorrente, estrutura solta de tópicos) e transformá-la ou traduzi-la em uma estrutura de Página de Vendas (Sales Page Config) perfeitamente polida, estruturada e altamente persuasiva em Português do Brasil.

Instruções de preenchimento e adaptações de design:
- Melhore a Headline e Subheadline se estiverem fracas ou incompletas, usando gatilhos de benefício claro, urgência/curiosidade e mecanismo único.
- Garanta que todos os itens de recursos (features) retornados tenham ícones apropriados e persuasivos provenientes dessa lista: Cpu, Zap, Award, Users2, ShieldAlert, BadgePercent, GraduationCap, TrendingUp, Lock, Coins, MessageSquareText, HelpCircle, CheckCircle, Video.
- Estruture ofertas razoáveis em reais brasileiros (R$). Divida os valores simulando parcelamento comum em cartões de crédito (ex: 12x de R$ 19,65 para um preço nominal de R$ 197).
- Caso o texto não inclua depoimentos, perguntas frequentes ou bio do produtor, crie versões fictícias realistas de alta conversão correspondentes ao nicho do produto fornecido para preencher as seções, gerando excelente prova social e quebrando as objeções clássicas.
- Escolha um tema de cores apropriado de acordo com o nicho do produto ('deep-dark', 'midnight-blue', 'minimal-indigo', 'clean-emerald', 'hotmart-pink', 'premium-gold'). Ex: Negócios físicos/high-ticket -> premium-gold ou deep-dark; saúde/bem-estar/finanças -> clean-emerald; infoprodutos femininos/romance -> hotmart-pink; tecnologia/b2b -> minimal-indigo ou midnight-blue.
- Retorne rigorosamente o JSON de acordo com o schema especificado.`;

    const userPrompt = `Abaixo estão as informações para você processar e criar a cópia estruturada da página de vendas.
Descrição Inicial: ${targetDescription || 'Nenhuma descrição adicional.'}
Texto bruto capturado/copiado: ${rawText || 'Nenhum texto bruto fornecido.'}

Gere o JSON completo e estruturado em português.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'headline', 'subheadline', 'primaryCtaText', 'countdownMinutes', 
            'featuresTitle', 'featuresSubtitle', 'features', 'authorName', 
            'authorRole', 'authorBio', 'authorAvatar', 'testimonialsTitle', 
            'testimonials', 'priceTitle', 'priceSubtitle', 'priceTiers', 
            'guaranteeDays', 'guaranteeText', 'faqTitle', 'faqs', 'theme', 'purchaseAlertNames'
          ],
          properties: {
            headline: { type: Type.STRING, description: 'Headline principal ultra persuasiva' },
            subheadline: { type: Type.STRING, description: 'Sub-headline ou gancho explicativo curto' },
            vslUrl: { type: Type.STRING, description: 'Deixe vazio "" para usar o simular de vídeo do estúdio.' },
            vslBadge: { type: Type.STRING, description: 'Aviso sobre o vídeo (ex: VÍDEO EXCLUSIVO)' },
            primaryCtaText: { type: Type.STRING, description: 'Chamada para ação principal do botão ex: COMPRAR AGORA' },
            countdownMinutes: { type: Type.INTEGER, description: 'Minutos do cronômetro de escassez, ex: 15 ou 20' },
            featuresTitle: { type: Type.STRING, description: 'Título da seção de vantagens e conteúdo do produto' },
            featuresSubtitle: { type: Type.STRING, description: 'Legenda explicativa da seção de recursos' },
            features: {
              type: Type.ARRAY,
              description: 'Módulos ou vantagens do produto',
              items: {
                type: Type.OBJECT,
                required: ['id', 'icon', 'title', 'description'],
                properties: {
                  id: { type: Type.STRING },
                  icon: { type: Type.STRING, description: 'Nome do ícone Lucide: Cpu, Zap, Award, Users2, ShieldAlert, GraduationCap, TrendingUp, Lock, Coins, MessageSquareText etc' },
                  title: { type: Type.STRING, description: 'Título persuasivo do módulo ou vantagem' },
                  description: { type: Type.STRING, description: 'Explicação rápida do que o aluno vai aprender/ganhar' }
                }
              }
            },
            authorName: { type: Type.STRING, description: 'Nome do autor, especialista ou mentor' },
            authorRole: { type: Type.STRING, description: 'Cargo ou credencial do autor' },
            authorBio: { type: Type.STRING, description: 'História, credenciais e trajetória curta do autor' },
            authorAvatar: { type: Type.STRING, description: 'Deixe um link válido do Unsplash para o avatar ou deixe ""' },
            authorSignature: { type: Type.STRING, description: 'Frase de assinatura final do mentor' },
            testimonialsTitle: { type: Type.STRING, description: 'Título da seção de depoimentos/prova social' },
            testimonials: {
              type: Type.ARRAY,
              description: 'Lista de depoimentos de alunos ou clientes',
              items: {
                type: Type.OBJECT,
                required: ['id', 'name', 'role', 'rating', 'content', 'avatar'],
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: 'Nome completo fictício' },
                  role: { type: Type.STRING, description: 'Handle de rede social ou profissão fictícia' },
                  rating: { type: Type.INTEGER, description: 'Nota de 1 a 5' },
                  content: { type: Type.STRING, description: 'Texto do depoimento elogiando o método e resultados' },
                  avatar: { type: Type.STRING, description: 'URL de foto do unsplash ou deixe ""' }
                }
              }
            },
            priceTitle: { type: Type.STRING, description: 'Título da oferta especial' },
            priceSubtitle: { type: Type.STRING, description: 'Gatilho ou aviso de preço promocional' },
            priceTiers: {
              type: Type.ARRAY,
              description: 'Planos de pagamento (recomende de 1 a 2 planos)',
              items: {
                type: Type.OBJECT,
                required: ['id', 'name', 'originalPrice', 'currentPrice', 'installmentsCount', 'installmentsValue', 'features', 'ctaText'],
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: 'Nome do plano, ex: Plano Expert' },
                  badge: { type: Type.STRING, description: 'Destaque ex: RECOMENDADO ou 70% DE DESCONTO' },
                  originalPrice: { type: Type.NUMBER, description: 'Preço cheio histórico riscado' },
                  currentPrice: { type: Type.NUMBER, description: 'Preço promocional à vista atual' },
                  installmentsCount: { type: Type.INTEGER, description: 'Máximo de parcelas ex: 12' },
                  installmentsValue: { type: Type.NUMBER, description: 'Valor de cada parcela ex: 29.62' },
                  features: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Benefícios inclusos especificamente nesse plano' },
                  ctaText: { type: Type.STRING, description: 'Chamada do botão de checkout' },
                  isPopular: { type: Type.BOOLEAN, description: 'Se esse plano deve ficar em destaque absoluto na página' }
                }
              }
            },
            guaranteeDays: { type: Type.INTEGER, description: 'Quantidade de dias de garantia: 7, 15 ou 30' },
            guaranteeText: { type: Type.STRING, description: 'Mensagem de reembolso sem burocracia que blinda o risco' },
            faqTitle: { type: Type.STRING, description: 'Título da seção de perguntas' },
            faqs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['id', 'question', 'answer'],
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING, description: 'Pergunta frequente clássica de quebra de objeção' },
                  answer: { type: Type.STRING, description: 'Resposta clara e amigável' }
                }
              }
            },
            theme: { type: Type.STRING, description: 'Padrão estético: deep-dark, midnight-blue, minimal-indigo, clean-emerald, hotmart-pink ou premium-gold' },
            purchaseAlertNames: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista com 10 nomes e sobrenomes brasileiros comuns para as notificações de venda simulada' }
          }
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    return res.json(parsedJson);

  } catch (error: any) {
    console.error('Erro na geração IA:', error);
    return res.status(500).json({ 
      error: 'Falha ao processar e replicar com IA: ' + (error?.message || error),
      details: error
    });
  }
});

// Configure Vite middleware in development or serve compiled client files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
