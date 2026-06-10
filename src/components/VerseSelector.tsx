import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, BookOpen, Tag, X, CheckCircle, AlertCircle } from 'lucide-react';
import { bibleBooks } from '@/utils/bibleData';
import { memorizationService } from '@/services/memorizationService';
import { toast } from 'sonner';

interface VerseSelectorProps {
  onVerseAdded: () => void;
}

const popularVerses = [
  {
    reference: 'João 3:16',
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  },
  {
    reference: 'Filipenses 4:13',
    text: 'Posso todas as coisas naquele que me fortalece.',
  },
  {
    reference: 'Romanos 8:28',
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
  },
  {
    reference: 'Salmos 23:1',
    text: 'O Senhor é o meu pastor; nada me faltará.',
  },
  {
    reference: 'Jeremias 29:11',
    text: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.',
  },
  {
    reference: 'Provérbios 3:5-6',
    text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.',
  },
  {
    reference: 'Isaías 40:31',
    text: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.',
  },
  {
    reference: '1 Coríntios 10:13',
    text: 'Não veio sobre vós tentação, senão humana; mas fiel é Deus, que não vos deixará tentar acima do que podeis, antes com a tentação dará também o escape, para que a possais suportar.',
  },
];

const commonTags = [
  'Fé',
  'Esperança',
  'Amor',
  'Paz',
  'Força',
  'Sabedoria',
  'Oração',
  'Perdão',
  'Salvação',
  'Gratidão',
  'Confiança',
  'Coragem',
  'Humildade',
  'Paciência',
  'Alegria',
  'Proteção',
  'Provisão',
  'Cura',
  'Adoração',
  'Obediência',
];

const VerseSelector: React.FC<VerseSelectorProps> = ({ onVerseAdded }) => {
  const [selectedBook, setSelectedBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verse, setVerse] = useState('');
  const [verseText, setVerseText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const selectedBookData = bibleBooks.find(
    (book) => book.name === selectedBook
  );
  const maxChapter = selectedBookData?.chapters || 0;
  const maxVerse =
    selectedBookData && chapter
      ? selectedBookData.versesPerChapter[parseInt(chapter) - 1] || 0
      : 0;

  const handleAddVerse = async () => {
    if (!selectedBook || !chapter || !verse || !verseText.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    try {
      const verseId = await memorizationService.addVerse(
        selectedBook,
        parseInt(chapter),
        parseInt(verse),
        verseText.trim()
      );

      // Adiciona tags se houver
      for (const tag of selectedTags) {
        await memorizationService.addTagToVerse(verseId, tag);
      }

      toast.success('Versículo adicionado com sucesso!');

      // Limpa o formulário
      setSelectedBook('');
      setChapter('');
      setVerse('');
      setVerseText('');
      setSelectedTags([]);
      setCustomTag('');

      onVerseAdded();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao adicionar versículo'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPopularVerse = async (popularVerse: {
    reference: string;
    text: string;
  }) => {
    const [bookChapter, verseNum] = popularVerse.reference.split(':');
    const [book, chapterNum] = bookChapter.split(' ');

    setIsLoading(true);
    try {
      const verseId = await memorizationService.addVerse(
        book,
        parseInt(chapterNum),
        parseInt(verseNum),
        popularVerse.text
      );

      toast.success('Versículo popular adicionado!');
      onVerseAdded();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao adicionar versículo'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim());
      setCustomTag('');
    }
  };

  return (
    <div className='space-y-6'>
      {/* Adicionar Versículo Personalizado */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-bible-text'>
            <Plus className='h-5 w-5 text-bible-accent' />
            Adicionar Versículo para Memorização
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Seleção do Livro */}
          <div className='space-y-2'>
            <Label htmlFor='book-select'>Livro da Bíblia</Label>
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger>
                <SelectValue placeholder='Selecione um livro' />
              </SelectTrigger>
              <SelectContent className='max-h-60'>
                {bibleBooks.map((book) => (
                  <SelectItem key={book.name} value={book.name}>
                    <div className='flex items-center gap-2'>
                      <BookOpen className='h-4 w-4' />
                      <span>{book.name}</span>
                      <Badge variant='secondary' className='text-xs'>
                        {book.testament === 'old' ? 'AT' : 'NT'}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Capítulo e Versículo */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='chapter'>Capítulo</Label>
              <Select
                value={chapter}
                onValueChange={setChapter}
                disabled={!selectedBook}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Cap.' />
                </SelectTrigger>
                <SelectContent className='max-h-60'>
                  {Array.from({ length: maxChapter }, (_, i) => i + 1).map(
                    (chapterNum) => (
                      <SelectItem
                        key={chapterNum}
                        value={chapterNum.toString()}
                      >
                        {chapterNum}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='verse'>Versículo</Label>
              <Select
                value={verse}
                onValueChange={setVerse}
                disabled={!chapter}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Vers.' />
                </SelectTrigger>
                <SelectContent className='max-h-60'>
                  {Array.from({ length: maxVerse }, (_, i) => i + 1).map(
                    (verseNum) => (
                      <SelectItem key={verseNum} value={verseNum.toString()}>
                        {verseNum}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Referência Preview */}
          {selectedBook && chapter && verse && (
            <div className='p-3 bg-muted rounded-lg'>
              <p className='font-medium text-sm'>
                Referência: {selectedBook} {chapter}:{verse}
              </p>
            </div>
          )}

          {/* Texto do Versículo */}
          <div className='space-y-2'>
            <Label htmlFor='verse-text'>Texto do Versículo *</Label>
            <Textarea
              id='verse-text'
              placeholder='Digite o texto completo do versículo...'
              value={verseText}
              onChange={(e) => setVerseText(e.target.value)}
              className='min-h-[100px]'
            />
          </div>

          {/* Tags */}
          <div className='space-y-3'>
            <Label>Tags (opcional)</Label>

            {/* Tags Selecionadas */}
            {selectedTags.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='secondary'
                    className='flex items-center gap-1'
                  >
                    <Tag className='h-3 w-3' />
                    {tag}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-4 w-4 p-0 hover:bg-transparent'
                      onClick={() => removeTag(tag)}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Tags Comuns */}
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Tags comuns:</p>
              <div className='flex flex-wrap gap-2'>
                {commonTags.map((tag) => (
                  <Button
                    key={tag}
                    variant='outline'
                    size='sm'
                    onClick={() => addTag(tag)}
                    disabled={selectedTags.includes(tag)}
                    className='h-7 text-xs'
                  >
                    <Plus className='h-3 w-3 mr-1' />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tag Personalizada */}
            <div className='flex gap-2'>
              <Input
                placeholder='Tag personalizada...'
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                className='flex-1'
              />
              <Button
                variant='outline'
                size='sm'
                onClick={handleAddCustomTag}
                disabled={!customTag.trim()}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Botão Adicionar */}
          <Button
            onClick={handleAddVerse}
            disabled={
              isLoading ||
              !selectedBook ||
              !chapter ||
              !verse ||
              !verseText.trim()
            }
            className='w-full'
          >
            {isLoading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2' />
                Adicionando...
              </>
            ) : (
              <>
                <CheckCircle className='h-4 w-4 mr-2' />
                Adicionar Versículo
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Versículos Populares */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BookOpen className='h-5 w-5' />
            Versículos Populares
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Clique em um versículo para adicioná-lo rapidamente à sua lista de
            memorização
          </p>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {popularVerses.map((verse, index) => (
              <Card
                key={index}
                className='hover:shadow-md transition-shadow cursor-pointer'
              >
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Badge variant='outline'>{verse.reference}</Badge>
                      </div>
                      <p className='text-sm text-muted-foreground leading-relaxed'>
                        "{verse.text}"
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleAddPopularVerse(verse)}
                      disabled={isLoading}
                      className='shrink-0'
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerseSelector;
