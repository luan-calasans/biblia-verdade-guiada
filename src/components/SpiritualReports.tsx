import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  FileText,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  BookOpen,
  Heart,
  Waves,
  Target,
  Clock,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  SpiritualStats,
  SalvationRecord,
  BaptismRecord,
  ReadingSession,
  DailyPlanCheck,
} from '@/services/spiritualTrackingService';

interface SpiritualReportsProps {
  stats: SpiritualStats;
  salvations: SalvationRecord[];
  baptisms: BaptismRecord[];
  readingSessions: ReadingSession[];
  dailyChecks: DailyPlanCheck[];
}

type ReportType = 'summary' | 'reading' | 'evangelism' | 'detailed';
type ReportPeriod = 'week' | 'month' | 'quarter' | 'year' | 'all';

const SpiritualReports: React.FC<SpiritualReportsProps> = ({
  stats,
  salvations,
  baptisms,
  readingSessions,
  dailyChecks,
}) => {
  const [reportType, setReportType] = useState<ReportType>('summary');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filterDataByPeriod = (data: any[], dateField: string = 'date') => {
    const now = new Date();
    let filterDate = new Date();

    switch (reportPeriod) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= filterDate;
    });
  };

  const generateSummaryReport = () => {
    const filteredSalvations = filterDataByPeriod(salvations, 'date');
    const filteredBaptisms = filterDataByPeriod(baptisms, 'date');
    const filteredReadings = filterDataByPeriod(readingSessions, 'date');
    const filteredChecks = filterDataByPeriod(dailyChecks, 'date');

    const periodName = {
      week: 'Última Semana',
      month: 'Último Mês',
      quarter: 'Últimos 3 Meses',
      year: 'Último Ano',
      all: 'Todo o Período',
    }[reportPeriod];

    return {
      title: `Relatório de Acompanhamento Espiritual - ${periodName}`,
      period: periodName,
      stats: {
        salvations: filteredSalvations.length,
        baptisms: filteredBaptisms.length,
        readingSessions: filteredReadings.length,
        dailyChecks: filteredChecks.filter((c) => c.completed).length,
        uniqueReadingDays: new Set(filteredReadings.map((r) => r.date)).size,
      },
      details: {
        salvations: filteredSalvations,
        baptisms: filteredBaptisms,
        readings: filteredReadings,
        checks: filteredChecks,
      },
    };
  };

  const generateReadingReport = () => {
    const filteredReadings = filterDataByPeriod(readingSessions, 'date');

    const bookStats: {
      [book: string]: { sessions: number; chapters: number; totalTime: number };
    } = {};
    let totalTime = 0;

    filteredReadings.forEach((session) => {
      if (!bookStats[session.book]) {
        bookStats[session.book] = { sessions: 0, chapters: 0, totalTime: 0 };
      }

      bookStats[session.book].sessions += 1;
      bookStats[session.book].chapters += session.chapters_read.length;

      if (session.duration_minutes) {
        bookStats[session.book].totalTime += session.duration_minutes;
        totalTime += session.duration_minutes;
      }
    });

    const mostReadBooks = Object.entries(bookStats)
      .sort(([, a], [, b]) => b.sessions - a.sessions)
      .slice(0, 10);

    return {
      title: 'Relatório de Leitura Bíblica',
      totalSessions: filteredReadings.length,
      totalTime: Math.round(totalTime),
      averageTime:
        filteredReadings.length > 0
          ? Math.round(totalTime / filteredReadings.length)
          : 0,
      uniqueDays: new Set(filteredReadings.map((r) => r.date)).size,
      bookStats: mostReadBooks.map(([book, stats]) => ({ book, ...stats })),
    };
  };

  const generateEvangelismReport = () => {
    const filteredSalvations = filterDataByPeriod(salvations, 'date');
    const filteredBaptisms = filterDataByPeriod(baptisms, 'date');

    const monthlyData: {
      [month: string]: { salvations: number; baptisms: number };
    } = {};

    [...filteredSalvations, ...filteredBaptisms].forEach((record) => {
      const month = new Date(record.date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
      });
      if (!monthlyData[month]) {
        monthlyData[month] = { salvations: 0, baptisms: 0 };
      }

      if (
        'person_name' in record &&
        filteredSalvations.includes(record as SalvationRecord)
      ) {
        monthlyData[month].salvations += 1;
      } else {
        monthlyData[month].baptisms += 1;
      }
    });

    return {
      title: 'Relatório de Evangelismo',
      totalSalvations: filteredSalvations.length,
      totalBaptisms: filteredBaptisms.length,
      totalImpact: filteredSalvations.length + filteredBaptisms.length,
      monthlyData: Object.entries(monthlyData).map(([month, data]) => ({
        month,
        ...data,
      })),
      salvationsList: filteredSalvations,
      baptismsList: filteredBaptisms,
    };
  };

  const exportToText = (data: any) => {
    let content = '';

    if (reportType === 'summary') {
      const report = generateSummaryReport();
      content = `
=== ${report.title} ===
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

📊 ESTATÍSTICAS GERAIS
• Salvações: ${report.stats.salvations}
• Batismos no Espírito Santo: ${report.stats.baptisms}
• Sessões de Leitura: ${report.stats.readingSessions}
• Dias com Leitura: ${report.stats.uniqueReadingDays}
• Check-ins Completados: ${report.stats.dailyChecks}

❤️ SALVAÇÕES (${report.details.salvations.length})
${report.details.salvations
  .map(
    (s) =>
      `• ${s.person_name} - ${new Date(s.date).toLocaleDateString('pt-BR')}${
        s.location ? ` (${s.location})` : ''
      }`
  )
  .join('\n')}

🌊 BATISMOS NO ESPÍRITO SANTO (${report.details.baptisms.length})
${report.details.baptisms
  .map(
    (b) =>
      `• ${b.person_name} - ${new Date(b.date).toLocaleDateString('pt-BR')}${
        b.location ? ` (${b.location})` : ''
      }`
  )
  .join('\n')}

📖 LEITURAS RECENTES
${report.details.readings
  .slice(0, 10)
  .map(
    (r) =>
      `• ${r.book} (${r.chapters_read.join(', ')}) - ${new Date(
        r.date
      ).toLocaleDateString('pt-BR')}`
  )
  .join('\n')}
`;
    } else if (reportType === 'reading') {
      const report = generateReadingReport();
      content = `
=== ${report.title} ===
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

📊 ESTATÍSTICAS DE LEITURA
• Total de Sessões: ${report.totalSessions}
• Tempo Total: ${Math.floor(report.totalTime / 60)}h ${report.totalTime % 60}min
• Tempo Médio por Sessão: ${report.averageTime} minutos
• Dias Únicos com Leitura: ${report.uniqueDays}

📚 LIVROS MAIS LIDOS
${report.bookStats
  .map(
    (book, index) =>
      `${index + 1}. ${book.book} - ${book.sessions} sessões, ${
        book.chapters
      } capítulos`
  )
  .join('\n')}
`;
    } else if (reportType === 'evangelism') {
      const report = generateEvangelismReport();
      content = `
=== ${report.title} ===
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}

📊 IMPACTO EVANGELÍSTICO
• Total de Salvações: ${report.totalSalvations}
• Total de Batismos: ${report.totalBaptisms}
• Impacto Total: ${report.totalImpact} vidas

📈 DADOS MENSAIS
${report.monthlyData
  .map(
    (data) =>
      `• ${data.month}: ${data.salvations} salvações, ${data.baptisms} batismos`
  )
  .join('\n')}
`;
    }

    return content;
  };

  const handleExport = async () => {
    setIsGenerating(true);

    try {
      const content = exportToText(null);
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-espiritual-${reportType}-${
        new Date().toISOString().split('T')[0]
      }.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      toast.success('Relatório exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar relatório');
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportPreview = () => {
    switch (reportType) {
      case 'summary':
        return generateSummaryReport();
      case 'reading':
        return generateReadingReport();
      case 'evangelism':
        return generateEvangelismReport();
      default:
        return null;
    }
  };

  const preview = getReportPreview();

  return (
    <div className='space-y-6'>
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Configurar Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='report-type'>Tipo de Relatório</Label>
              <Select
                value={reportType}
                onValueChange={(value: ReportType) => setReportType(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='summary'>Resumo Geral</SelectItem>
                  <SelectItem value='reading'>Leitura Bíblica</SelectItem>
                  <SelectItem value='evangelism'>Evangelismo</SelectItem>
                  <SelectItem value='detailed'>Detalhado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='report-period'>Período</Label>
              <Select
                value={reportPeriod}
                onValueChange={(value: ReportPeriod) => setReportPeriod(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='week'>Última Semana</SelectItem>
                  <SelectItem value='month'>Último Mês</SelectItem>
                  <SelectItem value='quarter'>Últimos 3 Meses</SelectItem>
                  <SelectItem value='year'>Último Ano</SelectItem>
                  <SelectItem value='all'>Todo o Período</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex justify-end mt-4'>
            <Button onClick={handleExport} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  Gerando...
                </>
              ) : (
                <>
                  <Download className='h-4 w-4 mr-2' />
                  Exportar Relatório
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {preview && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5' />
              Prévia do Relatório
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reportType === 'summary' && 'stats' in preview && (
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>{preview.title}</h3>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Heart className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-600'>
                      {preview.stats.salvations}
                    </p>
                    <p className='text-sm text-gray-600'>Salvações</p>
                  </div>

                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Waves className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-500'>
                      {preview.stats.baptisms}
                    </p>
                    <p className='text-sm text-gray-600'>Batismos</p>
                  </div>

                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <BookOpen className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-600'>
                      {preview.stats.readingSessions}
                    </p>
                    <p className='text-sm text-gray-600'>Leituras</p>
                  </div>

                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Target className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-600'>
                      {preview.stats.dailyChecks}
                    </p>
                    <p className='text-sm text-gray-600'>Check-ins</p>
                  </div>
                </div>
              </div>
            )}

            {reportType === 'reading' && 'totalSessions' in preview && (
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>{preview.title}</h3>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-bible-accent'>
                      {preview.totalSessions}
                    </p>
                    <p className='text-sm text-gray-600'>Sessões</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-bible-accent'>
                      {Math.floor(preview.totalTime / 60)}h{' '}
                      {preview.totalTime % 60}m
                    </p>
                    <p className='text-sm text-gray-600'>Tempo Total</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-bible-accent'>
                      {preview.averageTime}min
                    </p>
                    <p className='text-sm text-gray-600'>Média/Sessão</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-bible-accent'>
                      {preview.uniqueDays}
                    </p>
                    <p className='text-sm text-gray-600'>Dias Únicos</p>
                  </div>
                </div>

                {preview.bookStats.length > 0 && (
                  <div>
                    <h4 className='font-medium mb-2'>Livros Mais Lidos</h4>
                    <div className='space-y-2'>
                      {preview.bookStats.slice(0, 5).map((book, index) => (
                        <div
                          key={book.book}
                          className='flex items-center justify-between p-2 bg-gray-50 rounded'
                        >
                          <span className='font-medium'>
                            #{index + 1} {book.book}
                          </span>
                          <Badge variant='outline'>
                            {book.sessions} sessões
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {reportType === 'evangelism' && 'totalSalvations' in preview && (
              <div className='space-y-4'>
                <h3 className='font-semibold text-lg'>{preview.title}</h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Heart className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-600'>
                      {preview.totalSalvations}
                    </p>
                    <p className='text-sm text-gray-600'>Salvações</p>
                  </div>

                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Waves className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-500'>
                      {preview.totalBaptisms}
                    </p>
                    <p className='text-sm text-gray-600'>Batismos</p>
                  </div>

                  <div className='text-center p-4 bg-green-50 rounded-lg'>
                    <Users className='h-8 w-8 text-green-500 mx-auto mb-2' />
                    <p className='text-2xl font-bold text-green-600'>
                      {preview.totalImpact}
                    </p>
                    <p className='text-sm text-gray-600'>Vidas Impactadas</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpiritualReports;
