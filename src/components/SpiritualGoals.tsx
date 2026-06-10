import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Target,
  Plus,
  Calendar,
  BookOpen,
  Heart,
  Waves,
  Clock,
  Edit,
  Trash2,
  CheckCircle,
  Trophy,
} from 'lucide-react';
import {
  spiritualTrackingService,
  SpiritualStats,
  SpiritualGoal,
} from '@/services/spiritualTrackingService';
import { toast } from 'sonner';
import { useCache } from '@/contexts/ThemeContext';

interface SpiritualGoalsProps {
  stats: SpiritualStats;
}

const SpiritualGoals: React.FC<SpiritualGoalsProps> = ({ stats }) => {
  const [goals, setGoals] = useState<SpiritualGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { cache, updateSpiritualTrackingCache, isCacheValid } = useCache();
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'reading' as SpiritualGoal['type'],
    target: 1,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
  });

  // Carregar metas ao montar o componente
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setIsLoading(true);

      // Verificar se há dados válidos no cache
      if (isCacheValid('spiritualTracking') && cache.spiritualTracking?.goals) {
        setGoals(cache.spiritualTracking.goals);
        setIsLoading(false);
        return;
      }

      const data = await spiritualTrackingService.getSpiritualGoals();
      setGoals(data);

      // Atualizar cache
      updateSpiritualTrackingCache({
        ...cache.spiritualTracking,
        goals: data,
      });
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
      toast.error('Erro ao carregar metas espirituais');
    } finally {
      setIsLoading(false);
    }
  };

  const getGoalIcon = (type: SpiritualGoal['type']) => {
    switch (type) {
      case 'reading':
        return <BookOpen className='h-4 w-4' />;
      case 'memorization':
        return <Target className='h-4 w-4' />;
      case 'salvation':
        return <Heart className='h-4 w-4' />;
      case 'baptism':
        return <Waves className='h-4 w-4' />;
      case 'prayer':
        return <Clock className='h-4 w-4' />;
      default:
        return <Target className='h-4 w-4' />;
    }
  };

  const getGoalColor = (type: SpiritualGoal['type']) => {
    switch (type) {
      case 'reading':
        return 'text-green-600 bg-green-100';
      case 'memorization':
        return 'text-green-500 bg-green-100';
      case 'salvation':
        return 'text-green-600 bg-green-100';
      case 'baptism':
        return 'text-green-600 bg-green-100';
      case 'prayer':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCurrentProgress = (goal: SpiritualGoal) => {
    switch (goal.type) {
      case 'reading':
        return stats.current_streak;
      case 'memorization':
        return 0; // Would need memorization stats
      case 'salvation':
        return stats.salvations;
      case 'baptism':
        return stats.baptisms;
      case 'prayer':
        return 0; // Would need prayer stats
      default:
        return goal.current_progress;
    }
  };

  const getProgressPercentage = (goal: SpiritualGoal) => {
    const current = getCurrentProgress(goal);
    return Math.min((current / goal.target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsSaving(true);
      const goal = await spiritualTrackingService.addSpiritualGoal({
        title: newGoal.title,
        description: newGoal.description,
        type: newGoal.type,
        target: newGoal.target,
        deadline: newGoal.deadline,
      });

      const updatedGoals = [goal, ...goals];
      setGoals(updatedGoals);

      // Atualizar cache
      updateSpiritualTrackingCache({
        ...cache.spiritualTracking,
        goals: updatedGoals,
      });

      setNewGoal({
        title: '',
        description: '',
        type: 'reading',
        target: 1,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      });
      setIsAddingGoal(false);
      toast.success('Meta criada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao criar meta:', error);
      toast.error(error.message || 'Erro ao criar meta espiritual');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await spiritualTrackingService.deleteSpiritualGoal(id);
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);

      // Atualizar cache
      updateSpiritualTrackingCache({
        ...cache.spiritualTracking,
        goals: updatedGoals,
      });

      toast.success('Meta excluída com sucesso!');
    } catch (error: any) {
      console.error('Erro ao excluir meta:', error);
      toast.error(error.message || 'Erro ao excluir meta espiritual');
    }
  };

  const getStatusBadge = (goal: SpiritualGoal) => {
    const current = getCurrentProgress(goal);
    const isCompleted = current >= goal.target;
    const daysRemaining = getDaysRemaining(goal.deadline);

    if (isCompleted) {
      return (
        <Badge className='bg-green-500 text-white dark:bg-green-600 dark:text-black'>
          <CheckCircle className='h-3 w-3 mr-1' />
          Concluída
        </Badge>
      );
    }

    if (daysRemaining < 0) {
      return <Badge variant='destructive'>Expirada</Badge>;
    }

    if (daysRemaining <= 7) {
      return (
        <Badge
          variant='secondary'
          className='bg-green-100 text-green-800 dark:bg-green-600 dark:text-black'
        >
          Urgente
        </Badge>
      );
    }

    return <Badge variant='outline'>Em andamento</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='flex items-center gap-2'>
            <Trophy className='h-5 w-5' />
            Metas Espirituais
          </span>
          <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
            <DialogTrigger asChild>
              <Button size='sm'>
                <Plus className='h-4 w-4 mr-2' />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Meta</DialogTitle>
                <DialogDescription>
                  Defina uma meta espiritual para acompanhar seu crescimento
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='goal-title'>Título da Meta</Label>
                  <Input
                    id='goal-title'
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    placeholder='Ex: Ler a Bíblia por 30 dias'
                  />
                </div>
                <div>
                  <Label htmlFor='goal-description'>Descrição (opcional)</Label>
                  <Textarea
                    id='goal-description'
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    placeholder='Descreva sua meta...'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='goal-type'>Tipo</Label>
                    <Select
                      value={newGoal.type}
                      onValueChange={(value: SpiritualGoal['type']) =>
                        setNewGoal({ ...newGoal, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='reading'>Leitura</SelectItem>
                        <SelectItem value='memorization'>
                          Memorização
                        </SelectItem>
                        <SelectItem value='salvation'>Salvação</SelectItem>
                        <SelectItem value='baptism'>Batismo</SelectItem>
                        <SelectItem value='prayer'>Oração</SelectItem>
                        <SelectItem value='custom'>Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='goal-target'>Meta</Label>
                    <Input
                      id='goal-target'
                      type='number'
                      min='1'
                      value={newGoal.target}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          target: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor='goal-deadline'>Prazo</Label>
                  <Input
                    id='goal-deadline'
                    type='date'
                    value={newGoal.deadline}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, deadline: e.target.value })
                    }
                  />
                </div>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddingGoal(false)}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddGoal} disabled={isSaving}>
                    {isSaving ? 'Criando...' : 'Criar Meta'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {isLoading ? (
            // Loading skeleton
            <div className='space-y-4'>
              {[...Array(2)].map((_, i) => (
                <div key={i} className='p-4 border rounded-lg space-y-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <div className='w-6 h-6 bg-muted rounded animate-pulse' />
                        <div className='h-5 w-48 bg-muted rounded animate-pulse' />
                        <div className='h-5 w-20 bg-muted rounded animate-pulse' />
                      </div>
                      <div className='h-4 w-64 bg-muted rounded animate-pulse mb-3' />
                    </div>
                    <div className='flex items-center gap-1'>
                      <div className='w-8 h-8 bg-muted rounded animate-pulse' />
                      <div className='w-8 h-8 bg-muted rounded animate-pulse' />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='h-4 w-24 bg-muted rounded animate-pulse' />
                      <div className='h-4 w-12 bg-muted rounded animate-pulse' />
                    </div>
                    <div className='h-2 w-full bg-muted rounded animate-pulse' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='h-3 w-32 bg-muted rounded animate-pulse' />
                    <div className='h-3 w-28 bg-muted rounded animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {goals.map((goal) => {
                const current = getCurrentProgress(goal);
                const progress = getProgressPercentage(goal);
                const daysRemaining = getDaysRemaining(goal.deadline);

                return (
                  <div
                    key={goal.id}
                    className='p-4 border rounded-lg space-y-3'
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div
                            className={`p-1 rounded ${getGoalColor(goal.type)}`}
                          >
                            {getGoalIcon(goal.type)}
                          </div>
                          <h3 className='font-semibold'>{goal.title}</h3>
                          {getStatusBadge(goal)}
                        </div>
                        {goal.description && (
                          <p className='text-sm text-muted-foreground mb-3'>
                            {goal.description}
                          </p>
                        )}
                      </div>
                      <div className='flex items-center gap-1'>
                        <Button variant='ghost' size='sm'>
                          <Edit className='h-4 w-4' />
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex items-center justify-between text-sm'>
                        <span>
                          Progresso: {current} / {goal.target}
                        </span>
                        <span className='text-muted-foreground'>
                          {progress.toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={progress} className='h-2' />
                    </div>

                    <div className='flex items-center justify-between text-xs text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        Prazo:{' '}
                        {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                      </span>
                      <span>
                        {daysRemaining > 0
                          ? `${daysRemaining} dias restantes`
                          : daysRemaining === 0
                          ? 'Vence hoje'
                          : `Expirou há ${Math.abs(daysRemaining)} dias`}
                      </span>
                    </div>
                  </div>
                );
              })}

              {goals.length === 0 && (
                <div className='text-center py-8 text-muted-foreground'>
                  <Trophy className='h-12 w-12 mx-auto mb-4 opacity-50' />
                  <p>Nenhuma meta definida ainda</p>
                  <p className='text-sm'>Crie sua primeira meta espiritual!</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpiritualGoals;
