import os
import csv
from reportlab.lib.pagesizes import letter, A4, landscape
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
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
        # Page background
        self.setFillColor(colors.HexColor("#02050e"))
        self.rect(0, 0, self._pagesize[0], self._pagesize[1], fill=True, stroke=False)

        # Top Neon Accent Line
        self.setStrokeColor(colors.HexColor("#00ff88"))
        self.setLineWidth(2)
        self.line(28, self._pagesize[1] - 18, self._pagesize[0] - 28, self._pagesize[1] - 18)

        # Bottom Footer Line
        self.setStrokeColor(colors.HexColor("#1e293b"))
        self.setLineWidth(1)
        self.line(28, 26, self._pagesize[0] - 28, 26)

        # Footer text
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(32, 14, "FluidBLCX Sovereign Web3 Architecture • Mysten Mysticeti & Walrus Vault • AES-256-GCM + RS(8,6)")
        self.drawRightString(self._pagesize[0] - 32, 14, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf(output_path):
    # A4 Landscape: 842 x 595 points
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(A4),
        leftMargin=28,
        rightMargin=28,
        topMargin=26,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom typography styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=17,
        textColor=colors.HexColor("#ffffff")
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#38bdf8")
    )

    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9,
        textColor=colors.HexColor("#38bdf8")
    )

    idx_style = ParagraphStyle(
        'CellIndex',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9,
        alignment=1, # Center
        textColor=colors.HexColor("#00ff88")
    )

    cat_style = ParagraphStyle(
        'CellCategory',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=8,
        textColor=colors.HexColor("#38bdf8")
    )

    term_style = ParagraphStyle(
        'CellTerm',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9,
        textColor=colors.HexColor("#ffffff")
    )

    mod_style = ParagraphStyle(
        'CellModule',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=6.5,
        leading=8,
        textColor=colors.HexColor("#94a3b8")
    )

    desc_style = ParagraphStyle(
        'CellDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.5,
        leading=8.5,
        textColor=colors.HexColor("#cbd5e1")
    )

    spec_style = ParagraphStyle(
        'CellSpec',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=6,
        leading=7.5,
        textColor=colors.HexColor("#00ff88")
    )

    elements = []

    # 1. Header Banner Table
    banner_data = [
        [
            Paragraph("<b>FLUIDBLCX // SOVEREIGN WEB3 ARCHITECTURE</b>", title_style),
            Paragraph("<font color='#00ff88'><b>MYSTICETI L1 ENGINE</b></font><br/><font color='#64748b'>11ms COMMIT LATENCY</font>", ParagraphStyle('HRight1', fontName='Helvetica', fontSize=7.5, leading=9, alignment=2, textColor=colors.white)),
            Paragraph("<font color='#38bdf8'><b>WALRUS VAULT RS(8,6)</b></font><br/><font color='#64748b'>AES-256-GCM ENCRYPTED</font>", ParagraphStyle('HRight2', fontName='Helvetica', fontSize=7.5, leading=9, alignment=2, textColor=colors.white))
        ],
        [
            Paragraph("MASTER TECHNOLOGY, ARCHITECTURE & LEXICON SPECIFICATION — 35 CORE SUBSYSTEMS", subtitle_style),
            Paragraph("<font color='#64748b'>SPEC VERSION:</font> <font color='#fff'><b>v3.4.0 (PROD)</b></font>", ParagraphStyle('HRight3', fontName='Helvetica', fontSize=7, leading=8.5, alignment=2)),
            Paragraph("<font color='#64748b'>NETWORK:</font> <font color='#00ff88'><b>SUI TESTNET & MAINNET</b></font>", ParagraphStyle('HRight4', fontName='Helvetica', fontSize=7, leading=8.5, alignment=2))
        ]
    ]

    header_table = Table(banner_data, colWidths=[420, 180, 186])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#071228")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#1e3a5f")),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 8))

    # 2. Parse CSV and build Main Table
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
                Paragraph(cat, cat_style),
                Paragraph(term, term_style),
                Paragraph(mod, mod_style),
                Paragraph(desc, desc_style),
                Paragraph(specs, spec_style)
            ]
            rows.append(row_cells)

    # Total width: 842 - 56 = 786 points
    col_widths = [26, 88, 140, 110, 262, 160]
    
    main_table = Table(rows, colWidths=col_widths, repeatRows=1)
    
    table_styles = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#0a1936")),
        ('LINEBELOW', (0, 0), (-1, 0), 1.5, colors.HexColor("#00ff88")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#1e293b")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#0f172a")),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]

    for i in range(1, len(rows)):
        if i % 2 == 0:
            table_styles.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#040a1c")))
        else:
            table_styles.append(('BACKGROUND', (0, i), (-1, i), colors.HexColor("#02050f")))

    main_table.setStyle(TableStyle(table_styles))
    elements.append(main_table)

    doc.build(elements, canvasmaker=NumberedCanvas)
    print(f"Generated PDF: {output_path}")

if __name__ == "__main__":
    build_pdf(OUTPUT_PDF_1)
    build_pdf(OUTPUT_PDF_2)
