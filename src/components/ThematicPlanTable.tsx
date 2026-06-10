import React, { useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BookOpen, FileText } from 'lucide-react';
import { ThematicPlan } from '@/utils/thematicPlans';
import { Button } from '@/components/ui/button';
import { generateThematicPDF } from '@/utils/generatePDF';
import { toast } from 'sonner';

interface ThematicPlanTableProps {
  plan: ThematicPlan | null;
}

const ThematicPlanTable: React.FC<ThematicPlanTableProps> = ({ plan }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  if (!plan) return null;

  const handleDownloadPDF = () => {
    try {
      toast.info('Gerando PDF, aguarde...');
      generateThematicPDF(plan, tableRef);
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar o PDF. Tente novamente.');
    }
  };

  return (
    <div className='w-full'>
      <Card
        className='bg-bible-white shadow-sm border-bible-gray animate-fade-in w-full'
        ref={tableRef}
      >
        <CardHeader className='px-4 sm:px-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <CardTitle className='flex items-center gap-2 text-bible-accent text-lg'>
                <BookOpen className='h-4 w-4' />
                Plano Temático: {plan.name}
              </CardTitle>
              <CardDescription className='text-sm sm:text-base'>
                {plan.description}
              </CardDescription>
            </div>
            <Button
              onClick={handleDownloadPDF}
              className='bg-bible-accent text-white dark:text-black hover:bg-bible-accent/90 w-full sm:w-auto'
            >
              <FileText className='mr-2 h-4 w-4' /> Baixar PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent className='px-4 sm:px-6'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-16 text-center'>#</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead className='hidden sm:table-cell'>
                    Descrição
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plan.readings.map((reading, index) => (
                  <TableRow
                    key={index}
                    className='hover:bg-bible-soft-green/50'
                  >
                    <TableCell className='text-center font-medium text-bible-accent'>
                      {index + 1}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {reading.reference}
                    </TableCell>
                    <TableCell className='hidden sm:table-cell text-bible-text/70'>
                      {reading.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='mt-6 p-4 bg-bible-soft-green rounded-md'>
            <p className='text-sm text-bible-text'>
              <strong>Total de passagens:</strong> {plan.readings.length}
            </p>
            <p className='text-sm text-bible-text mt-1'>
              Sugestão: Leia uma passagem por dia para completar este plano
              temático em {plan.readings.length} dias.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThematicPlanTable;
