
import React from 'react';
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
import { CalendarDays } from 'lucide-react';
import { DateRangePlanEntry } from '@/utils/dateRangePlan';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateRangePlanTableProps {
  plan: DateRangePlanEntry[] | null;
}

const DateRangePlanTable: React.FC<DateRangePlanTableProps> = ({ plan }) => {
  if (!plan || plan.length === 0) return null;

  return (
    <Card className="bg-bible-white shadow-sm border-bible-gray animate-fade-in w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-bible-accent text-lg">
          <CalendarDays className="h-4 w-4" />
          Seu Plano de Leitura por Período
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Plano de leitura distribuído ao longo do período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 text-center">Data</TableHead>
                <TableHead>Leitura do Dia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plan.map((entry) => (
                <TableRow key={entry.date.toISOString()} className="hover:bg-bible-soft-green/50">
                  <TableCell className="text-center font-medium text-bible-accent">
                    {format(entry.date, "dd/MM", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {entry.readings.join(', ')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 p-4 bg-bible-soft-green rounded-md">
          <p className="text-sm text-bible-text">
            <strong>Total de dias:</strong> {plan.length}
          </p>
          <p className="text-sm text-bible-text mt-1">
            <strong>Período:</strong> {format(plan[0].date, "dd/MM/yyyy", { locale: ptBR })} a {format(plan[plan.length - 1].date, "dd/MM/yyyy", { locale: ptBR })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateRangePlanTable;
