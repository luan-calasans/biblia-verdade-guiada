import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReadingPlanEntry, BibleBook } from './bibleData';
import { ThematicPlan } from './thematicPlans';

export const generatePDF = (
  plan: ReadingPlanEntry[],
  timeUnit: 'days' | 'months' | 'year',
  includeOldTestament: boolean,
  includeNewTestament: boolean,
  selectedBooks: BibleBook[],
  tableRef: React.RefObject<HTMLDivElement>,
  isChronological: boolean = false
): void => {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 14;
  const startY = 20;

  // Cabeçalho
  pdf.setFontSize(18);
  pdf.setTextColor(0, 128, 0);
  pdf.text('Plano de Leitura Bíblica', margin, startY);

  pdf.setFontSize(12);
  pdf.setTextColor(85, 85, 85);
  let subtitle = `Plano para ${
    timeUnit === 'days' ? 'dias' : timeUnit === 'months' ? 'meses' : 'anos'
  } - `;

  if (selectedBooks && selectedBooks.length > 0) {
    subtitle += `${selectedBooks.length} livros selecionados`;
  } else if (includeOldTestament && includeNewTestament) {
    subtitle += 'Bíblia Completa';
  } else if (includeOldTestament) {
    subtitle += 'Antigo Testamento';
  } else if (includeNewTestament) {
    subtitle += 'Novo Testamento';
  }

  if (isChronological) {
    subtitle += ' (ordem cronológica)';
  } else {
    subtitle += ' (ordem tradicional)';
  }

  pdf.text(subtitle, margin, startY + 8);

  const dateStr = new Date().toLocaleDateString('pt-BR');
  pdf.setFontSize(10);
  pdf.text(`Gerado em: ${dateStr}`, margin, startY + 14);

  // Dados da tabela
  const tableData = plan.map((entry) => [
    `Dia ${entry.day}`,
    entry.readings.join(', '),
  ]);

  // autoTable centralizado após cabeçalho
  autoTable(pdf, {
    startY: startY + 18,
    head: [['Dia', 'Leituras']],
    body: tableData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 },
    headStyles: { fillColor: [139, 195, 74], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [242, 252, 226] },
    theme: 'grid',
  });

  // Salvamos o PDF
  pdf.save('plano-de-leitura-biblica.pdf');
};

export const generateThematicPDF = (
  plan: ThematicPlan,
  tableRef: React.RefObject<HTMLDivElement>
): void => {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 14;
  const startY = 20;

  // Cabeçalho
  pdf.setFontSize(18);
  pdf.setTextColor(0, 128, 0);
  pdf.text('Plano Temático de Leitura Bíblica', margin, startY);

  pdf.setFontSize(12);
  pdf.setTextColor(85, 85, 85);
  pdf.text(plan.name, margin, startY + 8);

  pdf.setFontSize(10);
  pdf.text(plan.description, margin, startY + 14);

  const dateStr = new Date().toLocaleDateString('pt-BR');
  pdf.text(`Gerado em: ${dateStr}`, margin, startY + 20);

  // Dados da tabela
  const tableData = plan.readings.map((reading, index) => [
    (index + 1).toString(),
    reading.reference,
    reading.description,
  ]);

  // autoTable centralizado após cabeçalho
  autoTable(pdf, {
    startY: startY + 24,
    head: [['#', 'Referência', 'Descrição']],
    body: tableData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 10 },
    headStyles: { fillColor: [139, 195, 74], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [242, 252, 226] },
    theme: 'grid',
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 40 },
      2: { cellWidth: 'auto' },
    },
  });

  // Salvamos o PDF
  pdf.save(
    `plano-tematico-${plan.name.toLowerCase().replace(/\s+/g, '-')}.pdf`
  );
};

export const generateMemorizationPDF = (verses: any[], stats: any): void => {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 14;
  const startY = 20;

  // Cabeçalho
  pdf.setFontSize(18);
  pdf.setTextColor(0, 128, 0);
  pdf.text('Versículos para Memorização', margin, startY);

  pdf.setFontSize(12);
  pdf.setTextColor(85, 85, 85);
  pdf.text(`Total de versículos: ${stats.totalVerses}`, margin, startY + 8);
  pdf.text(
    `Versículos memorizados: ${stats.masteredVerses}`,
    margin,
    startY + 14
  );
  pdf.text(
    `Precisão geral: ${stats.accuracy.toFixed(1)}%`,
    margin,
    startY + 20
  );

  const dateStr = new Date().toLocaleDateString('pt-BR');
  pdf.setFontSize(10);
  pdf.text(`Gerado em: ${dateStr}`, margin, startY + 26);

  // Dados da tabela
  const tableData = verses.map((verse) => [
    verse.reference,
    verse.text.length > 80 ? verse.text.substring(0, 80) + '...' : verse.text,
    verse.streak.toString(),
    verse.totalReviews > 0
      ? `${Math.round((verse.correctReviews / verse.totalReviews) * 100)}%`
      : '0%',
    verse.tags.join(', ') || '-',
  ]);

  // autoTable centralizado após cabeçalho
  autoTable(pdf, {
    startY: startY + 30,
    head: [['Referência', 'Texto', 'Sequência', 'Precisão', 'Tags']],
    body: tableData,
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [139, 195, 74],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [242, 252, 226] },
    theme: 'grid',
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 80 },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 35 },
    },
  });

  // Adicionar uma segunda página com versículos completos se necessário
  if (verses.length > 0) {
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.setTextColor(0, 128, 0);
    pdf.text('Versículos Completos', margin, 20);

    let currentY = 35;
    const pageHeight = pdf.internal.pageSize.height;
    const maxY = pageHeight - 20;

    verses.forEach((verse, index) => {
      // Verificar se precisa de nova página
      if (currentY > maxY - 30) {
        pdf.addPage();
        currentY = 20;
      }

      // Referência
      pdf.setFontSize(12);
      pdf.setTextColor(0, 128, 0);
      pdf.text(`${index + 1}. ${verse.reference}`, margin, currentY);
      currentY += 8;

      // Texto do versículo
      pdf.setFontSize(10);
      pdf.setTextColor(85, 85, 85);
      const textLines = pdf.splitTextToSize(verse.text, 180);
      pdf.text(textLines, margin + 5, currentY);
      currentY += textLines.length * 5 + 5;

      // Tags (se houver)
      if (verse.tags.length > 0) {
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Tags: ${verse.tags.join(', ')}`, margin + 5, currentY);
        currentY += 5;
      }

      currentY += 5; // Espaço entre versículos
    });
  }

  // Salvamos o PDF
  pdf.save('versiculos-memorizacao.pdf');
};
