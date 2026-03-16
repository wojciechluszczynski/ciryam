import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { products, currentProductTitle, lang } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const productList = products.map((p: { title: string; type: string; price: string }) =>
      `- ${p.title} (${p.type}, ${p.price} PLN)`
    ).join("\n");

    const systemPrompt = lang === "pl"
      ? `Jesteś asystentem sklepu muzycznego zespołu rockowego CIRYAM. Na podstawie listy produktów i aktualnie przeglądanego produktu, zasugeruj 3 najlepiej pasujące produkty do kupienia razem. Odpowiedz TYLKO w formacie JSON array z tytułami produktów, np. ["Produkt 1", "Produkt 2", "Produkt 3"]. Nie dodawaj żadnego tekstu poza JSON.`
      : `You are a shop assistant for rock band CIRYAM. Based on the product list and currently viewed product, suggest 3 best products to buy together. Reply ONLY with a JSON array of product titles, e.g. ["Product 1", "Product 2", "Product 3"]. No extra text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Dostępne produkty:\n${productList}\n\nAktualnie przeglądany produkt: ${currentProductTitle}\n\nZasugeruj 3 produkty do kupienia razem.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    // Extract JSON array from response
    const match = content.match(/\[.*\]/s);
    const suggestions = match ? JSON.parse(match[0]) : [];

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recommend error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
