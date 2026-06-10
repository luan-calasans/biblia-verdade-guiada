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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen } from 'lucide-react';
import {
  thematicPlans,
  getThematicPlan,
  ThematicPlan,
} from '@/utils/thematicPlans';
import { toast } from 'sonner';

interface ThematicPlanGeneratorProps {
  onPlanGenerated: (plan: ThematicPlan) => void;
}

const ThematicPlanGenerator: React.FC<ThematicPlanGeneratorProps> = ({
  onPlanGenerated,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const handleGeneratePlan = () => {
    if (!selectedTheme) {
      toast.error('Selecione um tema para gerar o plano.');
      return;
    }

    const plan = getThematicPlan(selectedTheme);
    if (plan) {
      onPlanGenerated(plan);
      toast.success(`Plano temático "${plan.name}" gerado com sucesso!`);
    } else {
      toast.error('Erro ao gerar o plano temático.');
    }
  };

  return (
    <Card className='bg-bible-white shadow-sm border-bible-gray animate-fade-in w-full'>
      <CardHeader className='px-4 sm:px-6'>
        <CardTitle className='flex items-center gap-2 text-bible-accent text-lg'>
          <BookOpen className='h-5 w-5 sm:h-6 sm:w-6' />
          Planos Temáticos de Leitura
        </CardTitle>
        <CardDescription className='text-sm sm:text-base'>
          Escolha um tema para receber versículos selecionados sobre o assunto
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6 px-4 sm:px-6'>
        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Selecione um tema</Label>
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className='w-full text-left'>
              <SelectValue placeholder='Escolha um tema...' />
            </SelectTrigger>
            <SelectContent>
              {thematicPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  <span>{plan.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTheme && (
          <div className='bg-bible-soft-green p-4 rounded-md'>
            <div className='flex items-start gap-3'>
              <div>
                <h4 className='font-medium text-bible-text'>
                  {getThematicPlan(selectedTheme)?.name}
                </h4>
                <p className='text-sm text-bible-text/70 mt-1'>
                  {getThematicPlan(selectedTheme)?.description}
                </p>
                <p className='text-sm text-bible-text mt-2'>
                  <strong>Inclui:</strong>{' '}
                  {getThematicPlan(selectedTheme)?.readings.length} passagens
                  selecionadas
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleGeneratePlan}
          disabled={!selectedTheme}
          className='w-full bg-bible-accent hover:bg-bible-accent/90 text-white dark:text-black text-sm sm:text-base py-2 sm:py-3'
        >
          Gerar Plano Temático
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThematicPlanGenerator;
