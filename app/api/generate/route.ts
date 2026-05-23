import { NextRequest, NextResponse } from "next/server";
import { generatePdf, DocumentData } from "@/lib/generatePdf";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const data: DocumentData = await request.json();

    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.sections || data.sections.length === 0) {
      return NextResponse.json(
        { error: "At least one section is required" },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePdf(data);

    const filename =
      data.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="' + filename + '"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("[/api/generate] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: String(error) },
      { status: 500 }
    );
  }
}
