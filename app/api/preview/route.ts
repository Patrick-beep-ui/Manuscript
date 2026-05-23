import { NextRequest, NextResponse } from "next/server";
import { generateHtml, DocumentData } from "@/lib/generatePdf";

export const dynamic = "force-dynamic";

function wrapForPreview(html: string): string {
  const css = `
<style id="preview-shell">
  html { background: #1e293b; margin: 0; padding: 0; }
  body {
    background: #1e293b !important;
    padding: 48px 24px 80px;
    margin: 0;
  }
  .cover {
    width: 210mm !important;
    height: 297mm !important;
    margin: 0 auto 32px !important;
    box-shadow: 0 12px 48px rgba(0,0,0,0.55);
    border-radius: 3px;
    overflow: hidden;
  }
  .preview-page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: white;
    padding: 25mm 22mm 28mm;
    box-shadow: 0 12px 48px rgba(0,0,0,0.55);
    border-radius: 3px;
    box-sizing: border-box;
  }
  /* Suppress @page rules in preview */
  @page { margin: 0 !important; }
</style>`;

  // After DOMContentLoaded, wrap everything after .cover in a .preview-page div
  const script = `
<script>
document.addEventListener('DOMContentLoaded', function () {
  var cover = document.querySelector('.cover');
  var body = document.body;
  var page = document.createElement('div');
  page.className = 'preview-page';
  var node = cover ? cover.nextSibling : body.firstChild;
  while (node) {
    var next = node.nextSibling;
    page.appendChild(node);
    node = next;
  }
  body.appendChild(page);
});
</script>`;

  return html
    .replace('</head>', css + '\n</head>')
    .replace('</body>', script + '\n</body>');
}

export async function POST(request: NextRequest) {
  try {
    const data: DocumentData = await request.json();

    if (!data.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const html = wrapForPreview(generateHtml(data));

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    console.error("[/api/preview] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview", details: String(error) },
      { status: 500 }
    );
  }
}
