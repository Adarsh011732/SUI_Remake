import os
import csv
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

CSV_PATH = r"c:\Dev_Projects\New folder\SUI\data\project_tech_lexicon_dataframe.csv"
OUTPUT_PDF_1 = r"c:\Dev_Projects\New folder\SUI\FluidBLCX_Master_Tech_Specification.pdf"
OUTPUT_PDF_2 = r"c:\Dev_Projects\New folder\SUI\data\FluidBLCX_Tech_Lexicon.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Top Accent Header Bar
        self.setFillColor(colors.HexColor("#0f172a"))
        self.rect(24, self._pagesize[1] - 22, self._pagesize[0] - 48, 3, fill=True, stroke=False)
        self.setFillColor(colors.HexColor("#059669"))
        self.rect(24, self._pagesize[1] - 22, 140, 3, fill=True, stroke=False)

        # Bottom Footer Line
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.75)
        self.line(24, 26, self._pagesize[0] - 24, 26)

        # Footer text
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#0f172a"))
        self.drawString(28, 14, "FLUIDBLCX // SOVEREIGN WEB3 ARCHITECTURE")
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(245, 14, "•   Mysten Mysticeti Consensus L1   •   Walrus Vault RS(8,6) Erasure Coding   •   AES-256-GCM")
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#0284c7"))
        self.drawRightString(self._pagesize[0] - 28, 14, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf(output_path):
    # A4 Landscape: 841.89 x 595.27 points
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(A4),
        leftMargin=24,
        rightMargin=24,
        topMargin=26,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Typography styles optimized for crisp readability
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0f172a")
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#0284c7")
    )

    meta_lbl_style = ParagraphStyle(
        'MetaLbl',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=8,
        alignment=2,
        textColor=colors.HexColor("#64748b")
    )

    meta_val_style = ParagraphStyle(
        'MetaVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        alignment=2,
        textColor=colors.HexColor("#059669")
    )

    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor("#ffffff")
    )

    idx_style = ParagraphStyle(
        'CellIndex',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9,
        alignment=1,
        textColor=colors.HexColor("#0284c7")
    )

    cat_style = ParagraphStyle(
        'CellCategory',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=colors.HexColor("#0f172a")
    )

    term_style = ParagraphStyle(
        'CellTerm',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor("#0f172a")
    )

    mod_style = ParagraphStyle(
        'CellModule',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=colors.HexColor("#64748b")
    )

    desc_style = ParagraphStyle(
        'CellDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#334155")
    )

    spec_style = ParagraphStyle(
        'CellSpec',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=6.5,
        leading=8,
        textColor=colors.HexColor("#047857")
    )

    elements = []

    # 1. Header Banner Table
    banner_data = [
        [
            Paragraph("<b>FLUIDBLCX // SOVEREIGN WEB3 EXECUTION ARCHITECTURE</b>", title_style),
            Paragraph("CONSENSUS PROTOCOL<br/><font color='#059669'><b>MYSTICETI L1 (11ms)</b></font>", meta_val_style),
            Paragraph("CIPHER & SHARDING<br/><font color='#0284c7'><b>AES-256-GCM • RS(8,6)</b></font>", meta_val_style)
        ],
        [
            Paragraph("MASTER TECHNOLOGY, ARCHITECTURE & LEXICON SPECIFICATION — 35 CORE SUBSYSTEMS", subtitle_style),
            Paragraph("SPEC VERSION: <font color='#0f172a'><b>v3.4.0 (2026 ARCH)</b></font>", meta_lbl_style),
            Paragraph("NETWORK: <font color='#059669'><b>SUI MAINNET & TESTNET</b></font>", meta_lbl_style)
        ]
    ]

    header_table = Table(banner_data, colWidths=[430, 180, 184])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#f8fafc")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),
        ('LINEBELOW', (0, 0), (-1, 0), 0.5, colors.HexColor("#e2e8f0")),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 6))

    # 2. Main Specification Table
    rows = []
    headers = [
        Paragraph("#", ParagraphStyle('ThC', parent=th_style, alignment=1)),
        Paragraph("Category", th_style),
        Paragraph("Technology / Concept", th_style),
        Paragraph("Target Module", th_style),
        Paragraph("Technical Definition & Architectural Role", th_style),
        Paragraph("Technical Specifications", th_style)
    ]
    rows.append(headers)

    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            idx = r.get('Index', '')
            cat = r.get('Category', '')
            term = r.get('Technology / Concept / Term', '')
            mod = r.get('Component / Module', '')
            desc = r.get('Technical Definition & Architectural Role', '')
            specs = r.get('Key Attributes & Technical Specs', '').replace(';', ' •')

            row_cells = [
                Paragraph(f"{int(idx):02d}" if idx.isdigit() else idx, idx_style),
                Paragraph(f"<font color='#0284c7'>●</font> {cat}", cat_style),
                Paragraph(term, term_style),
                Paragraph(mod, mod_style),
                Paragraph(desc, desc_style),
                Paragraph(specs, spec_style)
            ]
            rows.append(row_cells)

    # Total width: 841.89 - 48 = 793.89 points
    col_widths = [26, 92, 142, 112, 260, 161]
    
    main_table = Table(rows, colWidths=col_widths, repeatRows=1)
    
    table_styles = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0f172a")),
        ('LINEBELOW', (0, 0), (-1, 0), 1.5, colors.HexColor("#059669")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#e2e8f0")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]

    for i in range(1, len(rows)):
        if i % 2 == 0:
            table_styles.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#f8fafc")))
        else:
            table_styles.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#ffffff")))

    main_table.setStyle(TableStyle(table_styles))
    elements.append(main_table)

    doc.build(elements, canvasmaker=NumberedCanvas)
    print(f"Generated PDF: {output_path} (Size: {os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    build_pdf(OUTPUT_PDF_1)
    build_pdf(OUTPUT_PDF_2)
