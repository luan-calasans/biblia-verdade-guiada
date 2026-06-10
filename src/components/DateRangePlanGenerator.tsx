
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarDays, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generateDateRangePlan, DateRangePlanEntry } from '@/utils/dateRangePlan';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DateRangePlanGeneratorProps {
  onPlanGenerated: (plan: DateRangePlanEntry[]) => void;
}

const DateRangePlanGenerator: React.FC<DateRangePlanGeneratorProps> = ({ onPlanGenerated }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleGeneratePlan = () => {
    if (!startDate || !endDate) {
      toast.error('Selecione as datas de início e fim.');
      return;
    }

    if (endDate < startDate) {
      toast.error('A data de fim deve ser posterior à data de início.');
      return;
    }

    const plan = generateDateRangePlan(startDate, endDate);
    if (plan.length > 0) {
      onPlanGenerated(plan);
      toast.success(`Plano gerado com sucesso! ${plan.length} dias de leitura.`);
    } else {
      toast.error('Erro ao gerar o plano de leitura.');
    }
  };

  return (
    <Card className="bg-bible-white shadow-sm border-bible-gray animate-fade-in w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-bible-accent text-lg">
          <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
          Plano por Período Específico
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Crie um plano de leitura bíblica para um período específico
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Data de Início</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Data de Fim</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => startDate ? date < startDate : false}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {startDate && endDate && (
          <div className="bg-bible-soft-green p-4 rounded-md">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-medium text-bible-text">
                  Período Selecionado
                </h4>
                <p className="text-sm text-bible-text/70 mt-1">
                  De {format(startDate, "dd/MM/yyyy", { locale: ptBR })} até {format(endDate, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p className="text-sm text-bible-text mt-2">
                  <strong>Duração:</strong> {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} dias
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleGeneratePlan}
          disabled={!startDate || !endDate}
          className="w-full bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black text-sm sm:text-base py-2 sm:py-3"
        >
          Gerar Plano por Período
        </Button>
      </CardContent>
    </Card>
  );
};

export default DateRangePlanGenerator;
