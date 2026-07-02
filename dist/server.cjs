var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json({ limit: "10mb" }));
var PORT = 3e3;
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey) {
  ai = new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", apiConfigured: !!apiKey });
});
app.post("/api/ai/clone", async (req, res) => {
  try {
    const { rawText, targetDescription } = req.body;
    if (!rawText && !targetDescription) {
      return res.status(400).json({ error: "Voc\xEA precisa fornecer um texto ou descri\xE7\xE3o para clonar." });
    }
    if (!ai) {
      return res.status(503).json({
        error: "Chave GEMINI_API_KEY n\xE3o configurada. Por favor, adicione sua chave de API nas Configura\xE7\xF5es > Secrets do AI Studio para usar a clonagem autom\xE1tica.",
        fallbackSuggestion: true
      });
    }
    const systemPrompt = `Voc\xEA \xE9 um Copywriter de elite focado em convers\xE3o extrema (Copywriting de alta performance no mercado brasileiro - Hotmart, Kiwify, Eduzz, etc). 
A sua miss\xE3o \xE9 ler as informa\xE7\xF5es fornecidas pelo usu\xE1rio (que podem ser uma c\xF3pia imperfeita de texto, uma descri\xE7\xE3o r\xFAstica de um produto concorrente, estrutura solta de t\xF3picos) e transform\xE1-la ou traduzi-la em uma estrutura de P\xE1gina de Vendas (Sales Page Config) perfeitamente polida, estruturada e altamente persuasiva em Portugu\xEAs do Brasil.

Instru\xE7\xF5es de preenchimento e adapta\xE7\xF5es de design:
- Melhore a Headline e Subheadline se estiverem fracas ou incompletas, usando gatilhos de benef\xEDcio claro, urg\xEAncia/curiosidade e mecanismo \xFAnico.
- Garanta que todos os itens de recursos (features) retornados tenham \xEDcones apropriados e persuasivos provenientes dessa lista: Cpu, Zap, Award, Users2, ShieldAlert, BadgePercent, GraduationCap, TrendingUp, Lock, Coins, MessageSquareText, HelpCircle, CheckCircle, Video.
- Estruture ofertas razo\xE1veis em reais brasileiros (R$). Divida os valores simulando parcelamento comum em cart\xF5es de cr\xE9dito (ex: 12x de R$ 19,65 para um pre\xE7o nominal de R$ 197).
- Caso o texto n\xE3o inclua depoimentos, perguntas frequentes ou bio do produtor, crie vers\xF5es fict\xEDcias realistas de alta convers\xE3o correspondentes ao nicho do produto fornecido para preencher as se\xE7\xF5es, gerando excelente prova social e quebrando as obje\xE7\xF5es cl\xE1ssicas.
- Escolha um tema de cores apropriado de acordo com o nicho do produto ('deep-dark', 'midnight-blue', 'minimal-indigo', 'clean-emerald', 'hotmart-pink', 'premium-gold'). Ex: Neg\xF3cios f\xEDsicos/high-ticket -> premium-gold ou deep-dark; sa\xFAde/bem-estar/finan\xE7as -> clean-emerald; infoprodutos femininos/romance -> hotmart-pink; tecnologia/b2b -> minimal-indigo ou midnight-blue.
- Retorne rigorosamente o JSON de acordo com o schema especificado.`;
    const userPrompt = `Abaixo est\xE3o as informa\xE7\xF5es para voc\xEA processar e criar a c\xF3pia estruturada da p\xE1gina de vendas.
Descri\xE7\xE3o Inicial: ${targetDescription || "Nenhuma descri\xE7\xE3o adicional."}
Texto bruto capturado/copiado: ${rawText || "Nenhum texto bruto fornecido."}

Gere o JSON completo e estruturado em portugu\xEAs.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          required: [
            "headline",
            "subheadline",
            "primaryCtaText",
            "countdownMinutes",
            "featuresTitle",
            "featuresSubtitle",
            "features",
            "authorName",
            "authorRole",
            "authorBio",
            "authorAvatar",
            "testimonialsTitle",
            "testimonials",
            "priceTitle",
            "priceSubtitle",
            "priceTiers",
            "guaranteeDays",
            "guaranteeText",
            "faqTitle",
            "faqs",
            "theme",
            "purchaseAlertNames"
          ],
          properties: {
            headline: { type: import_genai.Type.STRING, description: "Headline principal ultra persuasiva" },
            subheadline: { type: import_genai.Type.STRING, description: "Sub-headline ou gancho explicativo curto" },
            vslUrl: { type: import_genai.Type.STRING, description: 'Deixe vazio "" para usar o simular de v\xEDdeo do est\xFAdio.' },
            vslBadge: { type: import_genai.Type.STRING, description: "Aviso sobre o v\xEDdeo (ex: V\xCDDEO EXCLUSIVO)" },
            primaryCtaText: { type: import_genai.Type.STRING, description: "Chamada para a\xE7\xE3o principal do bot\xE3o ex: COMPRAR AGORA" },
            countdownMinutes: { type: import_genai.Type.INTEGER, description: "Minutos do cron\xF4metro de escassez, ex: 15 ou 20" },
            featuresTitle: { type: import_genai.Type.STRING, description: "T\xEDtulo da se\xE7\xE3o de vantagens e conte\xFAdo do produto" },
            featuresSubtitle: { type: import_genai.Type.STRING, description: "Legenda explicativa da se\xE7\xE3o de recursos" },
            features: {
              type: import_genai.Type.ARRAY,
              description: "M\xF3dulos ou vantagens do produto",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["id", "icon", "title", "description"],
                properties: {
                  id: { type: import_genai.Type.STRING },
                  icon: { type: import_genai.Type.STRING, description: "Nome do \xEDcone Lucide: Cpu, Zap, Award, Users2, ShieldAlert, GraduationCap, TrendingUp, Lock, Coins, MessageSquareText etc" },
                  title: { type: import_genai.Type.STRING, description: "T\xEDtulo persuasivo do m\xF3dulo ou vantagem" },
                  description: { type: import_genai.Type.STRING, description: "Explica\xE7\xE3o r\xE1pida do que o aluno vai aprender/ganhar" }
                }
              }
            },
            authorName: { type: import_genai.Type.STRING, description: "Nome do autor, especialista ou mentor" },
            authorRole: { type: import_genai.Type.STRING, description: "Cargo ou credencial do autor" },
            authorBio: { type: import_genai.Type.STRING, description: "Hist\xF3ria, credenciais e trajet\xF3ria curta do autor" },
            authorAvatar: { type: import_genai.Type.STRING, description: 'Deixe um link v\xE1lido do Unsplash para o avatar ou deixe ""' },
            authorSignature: { type: import_genai.Type.STRING, description: "Frase de assinatura final do mentor" },
            testimonialsTitle: { type: import_genai.Type.STRING, description: "T\xEDtulo da se\xE7\xE3o de depoimentos/prova social" },
            testimonials: {
              type: import_genai.Type.ARRAY,
              description: "Lista de depoimentos de alunos ou clientes",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["id", "name", "role", "rating", "content", "avatar"],
                properties: {
                  id: { type: import_genai.Type.STRING },
                  name: { type: import_genai.Type.STRING, description: "Nome completo fict\xEDcio" },
                  role: { type: import_genai.Type.STRING, description: "Handle de rede social ou profiss\xE3o fict\xEDcia" },
                  rating: { type: import_genai.Type.INTEGER, description: "Nota de 1 a 5" },
                  content: { type: import_genai.Type.STRING, description: "Texto do depoimento elogiando o m\xE9todo e resultados" },
                  avatar: { type: import_genai.Type.STRING, description: 'URL de foto do unsplash ou deixe ""' }
                }
              }
            },
            priceTitle: { type: import_genai.Type.STRING, description: "T\xEDtulo da oferta especial" },
            priceSubtitle: { type: import_genai.Type.STRING, description: "Gatilho ou aviso de pre\xE7o promocional" },
            priceTiers: {
              type: import_genai.Type.ARRAY,
              description: "Planos de pagamento (recomende de 1 a 2 planos)",
              items: {
                type: import_genai.Type.OBJECT,
                required: ["id", "name", "originalPrice", "currentPrice", "installmentsCount", "installmentsValue", "features", "ctaText"],
                properties: {
                  id: { type: import_genai.Type.STRING },
                  name: { type: import_genai.Type.STRING, description: "Nome do plano, ex: Plano Expert" },
                  badge: { type: import_genai.Type.STRING, description: "Destaque ex: RECOMENDADO ou 70% DE DESCONTO" },
                  originalPrice: { type: import_genai.Type.NUMBER, description: "Pre\xE7o cheio hist\xF3rico riscado" },
                  currentPrice: { type: import_genai.Type.NUMBER, description: "Pre\xE7o promocional \xE0 vista atual" },
                  installmentsCount: { type: import_genai.Type.INTEGER, description: "M\xE1ximo de parcelas ex: 12" },
                  installmentsValue: { type: import_genai.Type.NUMBER, description: "Valor de cada parcela ex: 29.62" },
                  features: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Benef\xEDcios inclusos especificamente nesse plano" },
                  ctaText: { type: import_genai.Type.STRING, description: "Chamada do bot\xE3o de checkout" },
                  isPopular: { type: import_genai.Type.BOOLEAN, description: "Se esse plano deve ficar em destaque absoluto na p\xE1gina" }
                }
              }
            },
            guaranteeDays: { type: import_genai.Type.INTEGER, description: "Quantidade de dias de garantia: 7, 15 ou 30" },
            guaranteeText: { type: import_genai.Type.STRING, description: "Mensagem de reembolso sem burocracia que blinda o risco" },
            faqTitle: { type: import_genai.Type.STRING, description: "T\xEDtulo da se\xE7\xE3o de perguntas" },
            faqs: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                required: ["id", "question", "answer"],
                properties: {
                  id: { type: import_genai.Type.STRING },
                  question: { type: import_genai.Type.STRING, description: "Pergunta frequente cl\xE1ssica de quebra de obje\xE7\xE3o" },
                  answer: { type: import_genai.Type.STRING, description: "Resposta clara e amig\xE1vel" }
                }
              }
            },
            theme: { type: import_genai.Type.STRING, description: "Padr\xE3o est\xE9tico: deep-dark, midnight-blue, minimal-indigo, clean-emerald, hotmart-pink ou premium-gold" },
            purchaseAlertNames: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Lista com 10 nomes e sobrenomes brasileiros comuns para as notifica\xE7\xF5es de venda simulada" }
          }
        }
      }
    });
    const parsedJson = JSON.parse(response.text || "{}");
    return res.json(parsedJson);
  } catch (error) {
    console.error("Erro na gera\xE7\xE3o IA:", error);
    return res.status(500).json({
      error: "Falha ao processar e replicar com IA: " + (error?.message || error),
      details: error
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
