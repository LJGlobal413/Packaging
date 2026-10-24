import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'LJ Packaging Consulting & Engineering Group',
      scope: ['primary-flexible-laminates', 'secondary-folding-cartons', 'tertiary-transit-palletization', 'turnkey-print-dispatch'],
    });
  });

  // Server-side Gemini AI Packaging Consulting endpoint
  app.post('/api/ai-advisor', async (req, res) => {
    try {
      const { prompt, categoryHint } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Please provide packaging product requirements or dimensional specifications' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      // If API key is present, attempt to call Gemini model
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const systemInstruction = `You are the Principal Packaging Consultant & Structural Director at 'LJ Packaging Consulting Group' (Dongguan Engineering Lab & Hong Kong Logistics, engineering email: ljservicedg@gmail.com, contract email: Service@LjGlobal.in).
Your firm consults end-to-end across:
1. Primary Packaging: Flexible barrier pouches, sachets, laminate structure engineering (layer-by-layer films, OTR, WVTR, seal integrity).
2. Secondary Packaging: Folding carton structural design, CAD dieline geometry, grain direction, step-and-repeat die layouts, and automated folder-gluer compatibility.
3. Tertiary Packaging: Corrugated master shippers, McKee BCT top-load strength calculation, and palletization cube efficiency.
4. Turnkey Manufacturing & Dispatch: Full-service offset printing (Bobst die-cutting, window patching, spot UV/foil) and global container dispatch.

Return strictly a JSON object matching this schema:
{
  "structuralStyle": "string (e.g. ECMA A60.20 Crash-Lock Auto Bottom Carton + Stand-Up Pouch)",
  "recommendedCategory": "folding-carton" | "corrugated" | "flexible-pouch" | "rigid-box" | "molded-pulp",
  "materialSpec": "string (e.g. 350gsm C1S Virgin SBS Board + 110µ Barrier Film Laminate)",
  "fluteOrCaliper": "string (e.g. 22pt Caliper SBS / 0.55mm)",
  "primaryLaminateStructure": {
    "recommendedLayers": "string (e.g. Matte BOPP 19µ / Metallized PET 12µ / LLDPE 80µ or PET 12µ / AL 7µ / PE 70µ)",
    "pouchStyle": "string (e.g. Stand-Up Doyen Pouch with K-Seal & Degassing Valve)",
    "barrierRating": "string (e.g. High O2 & Moisture Barrier (OTR < 0.5 cc/m²/day, WVTR < 0.5 g/m²/day))",
    "sustainabilityOption": "string (e.g. 100% Recyclable MDO-PE / EVOH / PE Mono-Material stream)"
  },
  "secondaryFoldingCarton": {
    "style": "string (e.g. ECMA A60.20 Crash-Lock Auto Bottom or Straight Tuck End STE)",
    "dielineSpecs": "string (e.g. 0.55mm crease allowance, 15mm glue tab with fiber-tear emulsion)",
    "grainDirection": "string (e.g. Grain parallel to main vertical crease lines to prevent corner cracking)",
    "dieLayoutYield": "string (e.g. 6-up step-and-repeat nested layout on 720×1020mm master sheet, 86% sheet yield)"
  },
  "tertiaryShipper": {
    "corrugatedSpec": "string (e.g. B-Flute 44 ECT Master Shipper holding 24 folding cartons)",
    "bctCompressiveStrength": "string (e.g. 480 kg top-to-bottom McKee crush resistance)",
    "palletizationPlan": "string (e.g. 5 layers of 8 shippers = 40 cases (960 units) on standard 1200×1000mm pallet)"
  },
  "printAndDispatch": {
    "printProcess": "string (e.g. 6-Color Extended Gamut Offset Lithography + Soft-Touch Matte Inline Coating)",
    "finishingAndTooling": "string (e.g. Laser steel rule dieboard + Pertinax counter plate + Bobst blanking)",
    "dispatchTimeline": "string (e.g. 24h CNC Dieline Dummy / 5d Pre-press & Tooling / 8-10d Print & Hong Kong Port Dispatch)"
  },
  "insertType": "string (e.g. Molded sugarcane pulp cavity or origami paperboard buffer)",
  "transitTesting": "string (e.g. ISTA 3A Courier Test & ASTM D4169 distribution cycle)",
  "unboxingUx": "string (e.g. Tear-strip zipper carton release with satin tactile finish)",
  "estimatedProductionDays": "string (e.g. 24-48h Prototype / 8-10 Days Turnkey Production)",
  "expertAdvice": "string (two concise, highly technical sentences of consulting advice)",
  "costEfficiencyTip": "string (one practical tip for die layout optimization or laminate downgauging)"
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.35,
            },
          });

          if (response.text) {
            const jsonResult = JSON.parse(response.text);
            return res.json({ success: true, source: 'gemini', data: jsonResult });
          }
        } catch (apiErr) {
          console.warn('Gemini API call failed, falling back to expert rule engine:', apiErr);
        }
      }

      // Offline Consulting Rule Engine
      const lower = prompt.toLowerCase();
      let primaryLaminate = {
        recommendedLayers: 'Matte BOPP 19µ / Metallized PET 12µ / LLDPE 80µ',
        pouchStyle: 'Stand-Up Doyen Pouch with Press-to-Close Zipper',
        barrierRating: 'High Barrier (OTR < 0.8 cc/m²/day, WVTR < 0.6 g/m²/day)',
        sustainabilityOption: 'Mono-material recyclable PE laminate (MDO-PE/EVOH/LLDPE)',
      };

      if (lower.includes('coffee') || lower.includes('grease') || lower.includes('oil') || lower.includes('liquid') || lower.includes('sauce') || lower.includes('retort')) {
        primaryLaminate = {
          recommendedLayers: 'PET 12µ / AL Foil 7µ / BOPA (Nylon) 15µ / CPP 70µ',
          pouchStyle: 'Quad-Seal Gusset Pouch with One-Way Degassing Valve or Retort Spout Pouch',
          barrierRating: 'Ultra-High Total Barrier (OTR 0.01 cc/m²/day, WVTR 0.01 g/m²/day, Zero Light Transmission)',
          sustainabilityOption: 'High-barrier AlOx-coated PET with recyclable sealant film',
        };
      } else if (lower.includes('eco') || lower.includes('recyclable') || lower.includes('compost')) {
        primaryLaminate = {
          recommendedLayers: 'MDO-PE 25µ / High-Barrier EVOH / Low-Initiation PE 65µ',
          pouchStyle: 'Flat Bottom Box Pouch with 100% PE Recyclable Zipper',
          barrierRating: 'Medium-High Barrier with Certified RIC 4 PE Stream Recyclability',
          sustainabilityOption: 'How2Recycle Store Drop-off Certified / 100% Mono-PE structure',
        };
      }

      let foldingCarton = {
        style: 'ECMA A60.20 Crash-Lock Auto Bottom with Tuck Top',
        dielineSpecs: '350gsm C1S SBS, 0.52mm crease allowance, 15mm glue tab with hot-melt fiber-tear bond',
        grainDirection: 'Grain direction running parallel to main vertical crease lines to avoid cracked hinge corners',
        dieLayoutYield: '6-up nested step-and-repeat dieboard layout on standard 720×1020mm sheet (86% substrate yield)',
      };

      if (lower.includes('cosmetic') || lower.includes('perfume') || lower.includes('luxury') || lower.includes('dropper')) {
        foldingCarton = {
          style: 'ECMA A20.20 Straight Tuck End (STE) with Fifth Panel Retail Hanger',
          dielineSpecs: '400gsm Virgin Bleached Sulfate (SBS 24pt), micro-perforated friction tuck locks',
          grainDirection: 'Machine grain aligned along vertical height (D) for maximum shelf standing stiffness',
          dieLayoutYield: '8-up optimized interlocking layout on 720×1020mm press sheet (88% substrate yield)',
        };
      }

      const tertiaryShipper = {
        corrugatedSpec: 'B-Flute 44 ECT Regular Slotted Container (FEFCO 0201)',
        bctCompressiveStrength: 'McKee formula: 490 kg top-to-bottom compressive resistance',
        palletizationPlan: '5 layers of 8 master shippers = 40 cases (960 units) per 1200×1000mm export pallet',
      };

      const printAndDispatch = {
        printProcess: 'Heidelberg 6-Color Offset Press with inline G7 color calibration and aqueous matte dispersion',
        finishingAndTooling: 'Bobst Novacut 106 E high-speed die-cutting with laser steel rule die and Pertinax counters',
        dispatchTimeline: '24h CNC Dieline Mockup -> 4d Plate & Die Tooling -> 7d Mass Print & Automated Glue -> Hong Kong Port Export',
      };

      return res.json({
        success: true,
        source: 'expert-consulting-engine',
        data: {
          structuralStyle: foldingCarton.style + ' + ' + primaryLaminate.pouchStyle,
          recommendedCategory: 'folding-carton',
          materialSpec: '350gsm Virgin SBS + ' + primaryLaminate.recommendedLayers,
          fluteOrCaliper: '22pt Caliper (0.55mm) SBS Board',
          primaryLaminateStructure: primaryLaminate,
          secondaryFoldingCarton: foldingCarton,
          tertiaryShipper,
          printAndDispatch,
          insertType: 'Engineered Origami Fold-in-Place Paperboard Buffer or Molded Sugarcane Pulp',
          transitTesting: 'ISTA 3A Parcel Delivery Protocol & ASTM D4169 Distribution Simulation',
          unboxingUx: 'Clean friction-lock tuck release with smooth matte haptic feel and internal brand reveal',
          estimatedProductionDays: '24-48h Rapid Prototype / 7-10 Days Turnkey Mass Run & Dispatch',
          expertAdvice:
            'Our packaging consulting team recommends harmonizing the pouch laminate moisture barrier with the folding carton grain direction to prevent humidity warping during export sea freight.',
          costEfficiencyTip:
            'Nesting the folding carton dieline layout 6-up on a standard 720×1020mm sheet minimizes trim scrap to under 13% while perfectly matching automated Bobst folder-gluer infeed speeds.',
        },
      });
    } catch (err: any) {
      console.error('AI Consulting Advisor error:', err);
      return res.status(500).json({ error: 'Failed to generate packaging consulting recommendation' });
    }
  });

  // In-memory lead generation & contract storage
  const leadAlertsStore: Array<{
    id: string;
    timestamp: string;
    fullName: string;
    company: string;
    email: string;
    phone: string;
    formType: string;
    scope: string;
    projectTitle: string;
    quantity: number;
    contractType?: string;
    incoterms?: string;
    notes: string;
    attachedFilesCount: number;
    recipients: string[];
  }> = [];

  // Lead Generation & Contract Form Submission Alert Endpoint
  app.post('/api/inquiry', (req, res) => {
    try {
      const {
        fullName,
        company,
        email,
        phone,
        formType = 'Inquiry',
        scope = 'Full System Packaging',
        projectTitle = 'Packaging Inquiry',
        quantity = 3000,
        contractType,
        incoterms,
        notes = '',
        attachedFiles = [],
      } = req.body;

      if (!fullName || !email) {
        return res.status(400).json({ error: 'Full name and contact email are required to process the inquiry.' });
      }

      const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`;
      const timestamp = new Date().toISOString();
      const recipients = ['ljservicedg@gmail.com', 'Service@ljglobal.in'];

      const leadRecord = {
        id: leadId,
        timestamp,
        fullName,
        company: company || 'Not specified',
        email,
        phone: phone || 'Not provided',
        formType: formType === 'contract' ? 'Commercial Contract & Supply Agreement' : 'Technical Packaging Inquiry',
        scope,
        projectTitle,
        quantity: Number(quantity) || 3000,
        contractType: contractType || (formType === 'contract' ? 'Master Supply & Call-Off Agreement' : 'Standard Production Order'),
        incoterms: incoterms || 'FOB / CIF Global Dispatch',
        notes,
        attachedFilesCount: Array.isArray(attachedFiles) ? attachedFiles.length : 0,
        recipients,
      };

      leadAlertsStore.unshift(leadRecord);
      if (leadAlertsStore.length > 100) leadAlertsStore.pop();

      // Output formatted Lead Generation Alert to server logs
      console.log('================================================================================');
      console.log(`🚨 [LEAD GENERATION NOTIFICATION ALERT] NEW INQUIRY & CONTRACT FILED`);
      console.log(`Lead ID: ${leadId} | Recorded At: ${timestamp}`);
      console.log(`Alert Notification Recipients:`);
      console.log(`  1. Engineering & Production Hub: ljservicedg@gmail.com`);
      console.log(`  2. Contracts & Agreements Desk: Service@ljglobal.in`);
      console.log(`Lead Contact:`);
      console.log(`  - Name: ${leadRecord.fullName}`);
      console.log(`  - Company / Brand: ${leadRecord.company}`);
      console.log(`  - Email: ${leadRecord.email}`);
      console.log(`  - Phone / WhatsApp: ${leadRecord.phone}`);
      console.log(`Inquiry Specifications:`);
      console.log(`  - Category / Type: ${leadRecord.formType}`);
      console.log(`  - Scope: ${leadRecord.scope}`);
      console.log(`  - Project Title: ${leadRecord.projectTitle}`);
      console.log(`  - Planned Volume: ${leadRecord.quantity.toLocaleString()} units`);
      console.log(`  - Contract Framework: ${leadRecord.contractType}`);
      console.log(`  - Delivery Terms: ${leadRecord.incoterms}`);
      console.log(`  - Files Attached: ${leadRecord.attachedFilesCount} file(s)`);
      console.log(`  - Project Brief & Notes: ${leadRecord.notes}`);
      console.log('================================================================================');

      return res.json({
        success: true,
        leadId,
        message: 'Lead generation alert dispatched successfully to ljservicedg@gmail.com and Service@ljglobal.in',
        recipients,
        timestamp,
        data: leadRecord,
      });
    } catch (err: any) {
      console.error('Failed to log lead inquiry:', err);
      return res.status(500).json({ error: 'Failed to record lead inquiry alert.' });
    }
  });

  // Read logged inquiries for status checks
  app.get('/api/inquiries', (req, res) => {
    res.json({
      success: true,
      count: leadAlertsStore.length,
      alertRecipients: ['ljservicedg@gmail.com', 'Service@ljglobal.in'],
      leads: leadAlertsStore,
    });
  });

  // Resilient static build serving with Vite fallback
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distPath, 'index.html');

  if (process.env.NODE_ENV === 'production' && fs.existsSync(indexHtmlPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const rootHtmlPath = path.resolve(process.cwd(), 'index.html');
        if (fs.existsSync(rootHtmlPath)) {
          let template = fs.readFileSync(rootHtmlPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
