import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Highlighter,
  Palette,
  Type,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  isMobile?: boolean;
}

interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  style: string;
  color: string;
  backgroundColor: string;
  listType: 'none' | 'numbered' | 'bulleted';
}

const textStyles = [
  { value: 'body', label: 'Body', className: 'text-base font-normal' },
  { value: 'title', label: 'Title', className: 'text-3xl font-bold' },
  { value: 'heading', label: 'Heading', className: 'text-2xl font-semibold' },
  {
    value: 'subheading',
    label: 'Subheading',
    className: 'text-xl font-medium',
  },
  { value: 'monostyle', label: 'Monostyle', className: 'text-base font-mono' },
];

const colors = [
  '#000000',
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

const highlightColors = [
  'transparent',
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#FF00FF',
  '#FFA500',
  '#FFB6C1',
  '#98FB98',
  '#87CEEB',
  '#DDA0DD',
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Digite aqui...',
  className = '',
  isMobile = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    style: 'body',
    color: '#000000',
    backgroundColor: 'transparent',
    listType: 'none',
  });

  // Update format state based on current selection
  const updateFormatState = useCallback(() => {
    if (!document.getSelection) return;

    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    setFormatState({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikeThrough'),
      style: getCurrentStyle(),
      color: document.queryCommandValue('foreColor') || '#000000',
      backgroundColor:
        document.queryCommandValue('hiliteColor') || 'transparent',
      listType: getCurrentListType(),
    });
  }, []);

  const getCurrentStyle = (): string => {
    const selection = document.getSelection();
    if (!selection || !selection.anchorNode) return 'body';

    let element =
      selection.anchorNode.nodeType === Node.TEXT_NODE
        ? selection.anchorNode.parentElement
        : (selection.anchorNode as Element);

    while (element && element !== editorRef.current) {
      const className = element.getAttribute?.('class') || '';

      for (const style of textStyles) {
        if (className.includes(style.value)) {
          return style.value;
        }
      }

      element = element.parentElement;
    }

    return 'body';
  };

  const getCurrentListType = (): 'none' | 'numbered' | 'bulleted' => {
    const selection = document.getSelection();
    if (!selection || !selection.anchorNode) return 'none';

    let element =
      selection.anchorNode.nodeType === Node.TEXT_NODE
        ? selection.anchorNode.parentElement
        : (selection.anchorNode as Element);

    while (element && element !== editorRef.current) {
      if (element.tagName === 'OL') return 'numbered';
      if (element.tagName === 'UL') return 'bulleted';
      element = element.parentElement;
    }

    return 'none';
  };

  // Format commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateFormatState();
    handleContentChange();
  };

  const toggleFormat = (
    format: 'bold' | 'italic' | 'underline' | 'strikethrough'
  ) => {
    const commands = {
      bold: 'bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'strikeThrough',
    };

    execCommand(commands[format]);
  };

  const applyTextStyle = (style: string) => {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement('span');
    const styleConfig = textStyles.find((s) => s.value === style);
    if (styleConfig) {
      span.className = `text-style-${style} ${styleConfig.className}`;
    }

    try {
      range.surroundContents(span);
    } catch (e) {
      // If we can't surround contents, extract and wrap
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }

    selection.removeAllRanges();
    setFormatState((prev) => ({ ...prev, style }));
    handleContentChange();
  };

  const applyColor = (color: string) => {
    execCommand('foreColor', color);
    setFormatState((prev) => ({ ...prev, color }));
  };

  const applyHighlight = (color: string) => {
    if (color === 'transparent') {
      execCommand('hiliteColor', '');
      execCommand('removeFormat');
    } else {
      execCommand('hiliteColor', color);
    }
    setFormatState((prev) => ({ ...prev, backgroundColor: color }));
  };

  const toggleList = (listType: 'numbered' | 'bulleted') => {
    if (formatState.listType === listType) {
      // Remove list
      execCommand('insertOrderedList');
      execCommand('insertUnorderedList');
    } else {
      if (listType === 'numbered') {
        execCommand('insertOrderedList');
      } else {
        execCommand('insertUnorderedList');
      }
    }
    updateFormatState();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          toggleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          toggleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          toggleFormat('underline');
          break;
      }
    }
  };

  // Update editor content when content prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Add event listeners
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleSelectionChange = () => {
      setTimeout(updateFormatState, 0);
    };

    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [updateFormatState]);

  return (
    <div className={`rounded-lg w-full flex flex-col ${className}`}>
      {/* Toolbar - Fixed/Sticky */}
      <div
        className={`${
          isMobile ? 'sticky top-0 z-20' : 'sticky top-0 z-10'
        } flex flex-wrap items-center gap-1 p-2 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 overflow-x-auto shadow-sm flex-shrink-0`}
      >
        {/* Text Style */}
        <Select value={formatState.style} onValueChange={applyTextStyle}>
          <SelectTrigger className='w-32 flex-shrink-0'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {textStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                <span className={style.className}>{style.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Separator orientation='vertical' className='h-6 flex-shrink-0' />

        {/* Text Formatting */}
        <div className='flex gap-1 flex-shrink-0'>
          <Button
            variant={formatState.bold ? 'default' : 'outline'}
            size='sm'
            onClick={() => toggleFormat('bold')}
          >
            <Bold className='w-4 h-4' />
          </Button>
          <Button
            variant={formatState.italic ? 'default' : 'outline'}
            size='sm'
            onClick={() => toggleFormat('italic')}
          >
            <Italic className='w-4 h-4' />
          </Button>
          <Button
            variant={formatState.underline ? 'default' : 'outline'}
            size='sm'
            onClick={() => toggleFormat('underline')}
          >
            <Underline className='w-4 h-4' />
          </Button>
          <Button
            variant={formatState.strikethrough ? 'default' : 'outline'}
            size='sm'
            onClick={() => toggleFormat('strikethrough')}
          >
            <Strikethrough className='w-4 h-4' />
          </Button>
        </div>

        <Separator orientation='vertical' className='h-6 flex-shrink-0' />

        {/* Text Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className='p-2 flex-shrink-0'>
              <div
                className='w-4 h-4 rounded border'
                style={{ backgroundColor: formatState.color }}
              />
              <Type className='w-3 h-3 ml-1' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-48 p-3'>
            <div className='space-y-3'>
              <div>
                <label className='text-sm font-medium'>Cor do Texto</label>
                <div className='grid grid-cols-5 gap-2 mt-2'>
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded border-2 ${
                        formatState.color === color
                          ? 'border-gray-600'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyColor(color)}
                    />
                  ))}
                </div>
                <input
                  type='color'
                  value={formatState.color}
                  onChange={(e) => applyColor(e.target.value)}
                  className='w-full h-8 rounded mt-2'
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Highlight Color */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className='p-2 flex-shrink-0'>
              <div
                className='w-4 h-4 rounded border'
                style={{ backgroundColor: formatState.backgroundColor }}
              />
              <Highlighter className='w-3 h-3 ml-1' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-48 p-3'>
            <div>
              <label className='text-sm font-medium'>Cor de Destaque</label>
              <div className='grid grid-cols-5 gap-2 mt-2'>
                {highlightColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 ${
                      formatState.backgroundColor === color
                        ? 'border-gray-600'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor:
                        color === 'transparent' ? '#ffffff' : color,
                      position: 'relative',
                    }}
                    onClick={() => applyHighlight(color)}
                  >
                    {color === 'transparent' && (
                      <div className='absolute inset-0 border border-red-500 border-dashed rounded' />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation='vertical' className='h-6 flex-shrink-0' />

        {/* Lists */}
        <div className='flex gap-1 flex-shrink-0'>
          <Button
            variant={
              formatState.listType === 'bulleted' ? 'default' : 'outline'
            }
            size='sm'
            onClick={() => toggleList('bulleted')}
          >
            <List className='w-4 h-4' />
          </Button>
          <Button
            variant={
              formatState.listType === 'numbered' ? 'default' : 'outline'
            }
            size='sm'
            onClick={() => toggleList('numbered')}
          >
            <ListOrdered className='w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={`flex-1 p-4 focus:outline-none prose max-w-none break-words overflow-wrap-anywhere rounded-b-lg ${
          isMobile
            ? 'h-full overflow-y-auto'
            : 'min-h-[300px] max-h-[500px] overflow-y-auto'
        }`}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        lang='pt-BR'
        spellCheck={true}
        style={
          {
            '--placeholder-color': '#9ca3af',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          } as React.CSSProperties
        }
        suppressContentEditableWarning={true}
      />

      <style>{`
        [data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: var(--placeholder-color);
          font-style: italic;
        }

        .text-style-title {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 2.25rem;
        }

        .text-style-heading {
          font-size: 1.5rem;
          font-weight: 600;
          line-height: 2rem;
        }

        .text-style-subheading {
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 1.75rem;
        }

        .text-style-body {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5rem;
        }

        .text-style-monostyle {
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', monospace;
          font-size: 1rem;
          line-height: 1.5rem;
        }
      `}</style>
    </div>
  );
};
