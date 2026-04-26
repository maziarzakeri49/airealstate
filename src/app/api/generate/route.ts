export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { model } from "../../../../lib/gemini";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type,
      address,
      price,
      bedrooms,
      bathrooms,
      square,
      locker,
      parking,
      features,
      buildingAge,
      buildingName,
      maintenanceFees,
      buildingType,
      layout,
      flooring,
      kitchenFeatures,
      kitchenLayout,
      balcony
    } = body;

    const prompt = `
You are a professional real estate marketing expert in Toronto.

Generate:
1. A compelling MLS listing description
2. 3 engaging for  Instagram and facebook and linkedin captions
3. A professional email reply to a potential buyer

Property Details:
- Type: ${type}
- Address: ${address}
- Price: ${price}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Square:${square}
- Locker:${locker}
- Parking:${parking}
- Features: ${features}
- Building Age:${buildingAge}
- Building Name:${buildingName}
- Maintenance Fees:${maintenanceFees}
- Building Type:${buildingType}
- Layout:${layout}
- Flooring:${flooring}
- Kitchen Features:${kitchenFeatures}
- Kitchen Layout:${kitchenLayout}
- Balcony:${balcony}


IMPORTANT:
Return ONLY valid JSON in this format:
{
  "listing": {
    "headline": "",
    "description": "",
    "highlights": [],
    "features": []
  },
  "social": {
    "instagram": "",
    "facebook": "",
    "linkedin": ""
  },
  "email": {
    "subject": "",
    "body": ""
  }
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean possible markdown ```json blocks
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      return NextResponse.json({
        error: "JSON parsing failed",
        raw: cleaned,
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong",
      details: error,
    });
  }
}