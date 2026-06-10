import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Brush,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Palette,
} from 'lucide-react';

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  initialDrawing?: string;
  className?: string;
}

interface DrawingState {
  tool: 'brush' | 'eraser';
  color: string;
  brushSize: number;
  opacity: number;
}

interface Path {
  points: Array<{ x: number; y: number }>;
  tool: 'brush' | 'eraser';
  color: string;
  brushSize: number;
  opacity: number;
}

const colors = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#FFA500',
  '#800080',
  '#A52A2A',
  '#808080',
  '#FFC0CB',
  '#90EE90',
  '#87CEEB',
  '#F0E68C',
];

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  onSave,
  initialDrawing,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<Path[]>([]);
  const [undoStack, setUndoStack] = useState<Path[][]>([]);
  const [redoStack, setRedoStack] = useState<Path[][]>([]);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  const [drawingState, setDrawingState] = useState<DrawingState>({
    tool: 'brush',
    color: '#000000',
    brushSize: 3,
    opacity: 1,
  });

  // Função para redesenhar o canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar todos os caminhos
    paths.forEach((path) => {
      drawPath(path);
    });

    // Desenhar caminho atual se existir
    if (currentPath) {
      drawPath(currentPath);
    }
  }, [paths, currentPath]);

  // Função para desenhar um caminho
  const drawPath = (path: Path) => {
    const canvas = canvasRef.current;
    if (!canvas || path.points.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();

    if (path.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = path.color;
      ctx.globalAlpha = path.opacity;
    }

    ctx.lineWidth = path.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);

    for (let i = 1; i < path.points.length; i++) {
      ctx.lineTo(path.points[i].x, path.points[i].y);
    }

    ctx.stroke();
    ctx.restore();
  };

  // Carregar desenho inicial
  useEffect(() => {
    if (initialDrawing && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialDrawing;
    }
  }, [initialDrawing]);

  // Redesenhar quando os caminhos mudarem
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Funções de coordenadas
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const getTouchPos = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  // Iniciar desenho
  const startDrawing = (point: { x: number; y: number }) => {
    setIsDrawing(true);

    const newPath: Path = {
      points: [point],
      tool: drawingState.tool,
      color: drawingState.color,
      brushSize: drawingState.brushSize,
      opacity: drawingState.opacity,
    };

    setCurrentPath(newPath);
    setRedoStack([]); // Limpar redo stack quando iniciar novo desenho
  };

  // Continuar desenho
  const draw = (point: { x: number; y: number }) => {
    if (!isDrawing || !currentPath) return;

    const updatedPath = {
      ...currentPath,
      points: [...currentPath.points, point],
    };

    setCurrentPath(updatedPath);
  };

  // Finalizar desenho
  const stopDrawing = () => {
    if (!isDrawing || !currentPath) return;

    setIsDrawing(false);

    // Salvar estado atual para undo
    setUndoStack((prev) => [...prev, paths]);

    // Adicionar caminho aos caminhos finalizados
    setPaths((prev) => [...prev, currentPath]);
    setCurrentPath(null);
  };

  // Event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getMousePos(e);
    startDrawing(point);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getMousePos(e);
    draw(point);
  };

  const handleMouseUp = () => {
    stopDrawing();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const point = getTouchPos(e);
    startDrawing(point);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const point = getTouchPos(e);
    draw(point);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  // Undo/Redo
  const undo = () => {
    if (undoStack.length === 0) return;

    setRedoStack((prev) => [...prev, paths]);
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setPaths(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    setUndoStack((prev) => [...prev, paths]);
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setPaths(nextState);
  };

  // Limpar canvas
  const clearCanvas = () => {
    setUndoStack((prev) => [...prev, paths]);
    setPaths([]);
    setCurrentPath(null);
    setRedoStack([]);
  };

  // Salvar desenho
  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  // Download desenho
  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'desenho.png';
    link.click();
  };

  return (
    <div className={`flex flex-col space-y-4 w-full ${className}`}>
      {/* Toolbar */}
      <div className='flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-x-auto'>
        {/* Ferramentas */}
        <div className='flex gap-2 flex-shrink-0'>
          <Button
            variant={drawingState.tool === 'brush' ? 'default' : 'outline'}
            size='sm'
            onClick={() =>
              setDrawingState((prev) => ({ ...prev, tool: 'brush' }))
            }
          >
            <Brush className='w-4 h-4' />
          </Button>
          <Button
            variant={drawingState.tool === 'eraser' ? 'default' : 'outline'}
            size='sm'
            onClick={() =>
              setDrawingState((prev) => ({ ...prev, tool: 'eraser' }))
            }
          >
            <Eraser className='w-4 h-4' />
          </Button>
        </div>

        {/* Cores */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className='flex-shrink-0'>
              <Palette className='w-4 h-4 mr-2' />
              <div
                className='w-4 h-4 rounded border'
                style={{ backgroundColor: drawingState.color }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-64'>
            <div className='grid grid-cols-4 gap-2'>
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded border-2 ${
                    drawingState.color === color
                      ? 'border-blue-500'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setDrawingState((prev) => ({ ...prev, color }))
                  }
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Tamanho do pincel */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <span className='text-xs sm:text-sm'>Tamanho:</span>
          <Slider
            value={[drawingState.brushSize]}
            onValueChange={([value]) =>
              setDrawingState((prev) => ({ ...prev, brushSize: value }))
            }
            min={1}
            max={20}
            step={1}
            className='w-16 sm:w-20'
          />
          <span className='text-xs sm:text-sm w-5 sm:w-6'>
            {drawingState.brushSize}
          </span>
        </div>

        {/* Opacidade */}
        <div className='flex items-center gap-2 flex-shrink-0'>
          <span className='text-xs sm:text-sm'>Opacidade:</span>
          <Slider
            value={[drawingState.opacity * 100]}
            onValueChange={([value]) =>
              setDrawingState((prev) => ({ ...prev, opacity: value / 100 }))
            }
            min={10}
            max={100}
            step={10}
            className='w-16 sm:w-20'
          />
          <span className='text-xs sm:text-sm w-7 sm:w-8'>
            {Math.round(drawingState.opacity * 100)}%
          </span>
        </div>

        {/* Ações */}
        <div className='flex gap-2 ml-auto flex-shrink-0'>
          <Button
            variant='outline'
            size='sm'
            onClick={undo}
            disabled={undoStack.length === 0}
          >
            <Undo2 className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={redo}
            disabled={redoStack.length === 0}
          >
            <Redo2 className='w-4 h-4' />
          </Button>
          <Button variant='outline' size='sm' onClick={clearCanvas}>
            <Trash2 className='w-4 h-4' />
          </Button>
          <Button variant='outline' size='sm' onClick={downloadDrawing}>
            <Download className='w-4 h-4' />
          </Button>
          <Button
            className='bg-bible-accent hover:bg-bible-accent/90'
            size='sm'
            onClick={saveDrawing}
          >
            Salvar
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className='border rounded-lg overflow-hidden bg-white w-full'>
        <div className='w-full max-w-full overflow-auto'>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className='cursor-crosshair touch-none max-w-full h-auto block'
            style={{
              maxWidth: '100%',
              height: 'auto',
              minHeight: '200px',
              width: '100%',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
    </div>
  );
};
