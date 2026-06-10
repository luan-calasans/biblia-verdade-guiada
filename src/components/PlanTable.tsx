import React, { useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ReadingPlanEntry, BibleBook } from '@/utils/bibleData';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, ListOrdered } from 'lucide-react';
import { generatePDF } from '@/utils/generatePDF';
import { toast } from 'sonner';

interface PlanTableProps {
  plan: ReadingPlanEntry[];
  timeUnit: 'days' | 'months' | 'year';
  includeOldTestament: boolean;
  includeNewTestament: boolean;
  selectedBooks: BibleBook[];
  isChronological?: boolean;
  orderType?: 'chronological' | 'traditional';
}

const PlanTable: React.FC<PlanTableProps> = ({
  plan,
  timeUnit,
  includeOldTestament,
  includeNewTestament,
  selectedBooks,
  isChronological = false,
  orderType = 'traditional',
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    try {
      toast.info('Gerando PDF, aguarde...');
      generatePDF(
        plan,
        timeUnit,
        includeOldTestament,
        includeNewTestament,
        selectedBooks,
        tableRef,
        isChronological
      );
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar o PDF. Tente novamente.');
    }
  };

  if (!plan.length) return null;

  return (
    <div className='w-full'>
      <div className='animate-slide-up' ref={tableRef}>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-semibold text-bible-text flex items-center gap-2 flex-wrap'>
              Seu plano de leitura
              {orderType === 'chronological' && (
                <span
                  className='inline-flex items-center gap-1 text-sm bg-bible-accent/10 text-bible-accent px-2 py-1 rounded'
                  title='Ordem cronológica'
                >
                  <Calendar className='h-4 w-4' />
                  Cronológica
                </span>
              )}
              {orderType === 'traditional' && (
                <span
                  className='inline-flex items-center gap-1 text-sm bg-bible-soft-green text-bible-text px-2 py-1 rounded'
                  title='Ordem tradicional'
                >
                  <ListOrdered className='h-4 w-4' />
                  Tradicional
                </span>
              )}
            </h2>
            <p className='text-sm text-bible-text/70'>
              Plano distribuído precisamente em {plan.length} dias com
              versículos específicos
            </p>
          </div>
          <Button
            onClick={handleDownloadPDF}
            className='bg-bible-accent text-white dark:text-black hover:bg-bible-accent/90 w-full sm:w-auto'
          >
            <FileText className='mr-2 h-4 w-4' /> Baixar PDF
          </Button>
        </div>
        <div className='overflow-hidden bg-bible-white'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader className='bg-bible-soft-green'>
                <TableRow>
                  <TableHead className='w-[100px] font-medium'>Dia</TableHead>
                  <TableHead className='font-medium'>
                    Leituras (Versículos específicos)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plan.map((entry) => (
                  <TableRow
                    key={entry.day}
                    className='hover:bg-bible-gray/30 transition-colors'
                  >
                    <TableCell className='font-medium'>
                      Dia {entry.day}
                    </TableCell>
                    <TableCell className='font-mono text-sm'>
                      {entry.readings.join(', ')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTable;
