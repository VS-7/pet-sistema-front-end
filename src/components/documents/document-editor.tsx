'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import { useEffect, useState } from 'react'
import { useDocumentStore } from '@/src/stores/documentStore'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Table as TableIcon,
  Heading1,
  Heading2,
  Save,
  Download,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Settings,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DocumentEditorProps {
  documentId: number
}

interface DocumentSettings {
  orientation: 'portrait' | 'landscape'
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
  fontSize: number
}

// Templates acadêmicos predefinidos
const ACADEMIC_TEMPLATES = {
  article: {
    title: 'Artigo Científico',
    content: `
      <h1 style="text-align: center;">Título do Artigo</h1>
      <p style="text-align: center;">Autor(es)</p>
      <p style="text-align: center;">Instituição</p>
      
      <h2>Resumo</h2>
      <p style="text-align: justify;">Seu resumo aqui...</p>
      
      <h2>Abstract</h2>
      <p style="text-align: justify;">Your abstract here...</p>
      
      <h2>1. Introdução</h2>
      <p style="text-align: justify;">Sua introdução aqui...</p>
      
      <h2>2. Metodologia</h2>
      <p style="text-align: justify;">Sua metodologia aqui...</p>
      
      <h2>3. Resultados e Discussão</h2>
      <p style="text-align: justify;">Seus resultados aqui...</p>
      
      <h2>4. Conclusão</h2>
      <p style="text-align: justify;">Sua conclusão aqui...</p>
      
      <h2>Referências</h2>
      <p>Suas referências aqui...</p>
    `,
  },
  report: {
    title: 'Relatório Técnico',
    content: `
      <h1 style="text-align: center;">Relatório Técnico</h1>
      <p style="text-align: center;">Data: ${new Date().toLocaleDateString()}</p>
      
      <h2>1. Objetivo</h2>
      <p style="text-align: justify;">Descreva o objetivo aqui...</p>
      
      <h2>2. Desenvolvimento</h2>
      <p style="text-align: justify;">Conteúdo do desenvolvimento...</p>
      
      <h2>3. Conclusão</h2>
      <p style="text-align: justify;">Conclusão aqui...</p>
    `,
  },
}

export function DocumentEditor({ documentId }: DocumentEditorProps) {
  const { getDocumentById, updateDocument } = useDocumentStore()
  const [document, setDocument] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [settings, setSettings] = useState<DocumentSettings>({
    orientation: 'portrait',
    margins: {
      top: 2.54,
      right: 2.54,
      bottom: 2.54,
      left: 2.54,
    },
    fontSize: 12,
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  useEffect(() => {
    const loadDocument = async () => {
      const doc = await getDocumentById(documentId)
      setDocument(doc)
      editor?.commands.setContent(doc.conteudo || '')
    }
    
    if (documentId) {
      loadDocument()
    }
  }, [documentId, editor])

  const handleSave = async () => {
    if (!editor || !document) return
    
    setSaving(true)
    try {
      await updateDocument(documentId, {
        ...document,
        conteudo: editor.getJSON(),
      })
    } catch (error) {
      console.error('Erro ao salvar documento:', error)
    } finally {
      setSaving(false)
    }
  }

  const applyTemplate = (templateKey: keyof typeof ACADEMIC_TEMPLATES) => {
    if (!editor) return
    const template = ACADEMIC_TEMPLATES[templateKey]
    editor.commands.setContent(template.content)
  }

  const handleExport = async (format: 'pdf' | 'docx') => {
    // Implementar exportação usando html2pdf ou docx
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const updateDocumentSettings = (newSettings: Partial<DocumentSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }))
  }

  if (!editor || !document) {
    return <div>Carregando...</div>
  }

  return (
    <div className="editor-container" data-orientation={settings.orientation}>
      <div className="floating-toolbar">
        <div className="toolbar-section">
          <Select
            value={editor?.getAttributes('textStyle').fontFamily}
            onValueChange={(value) => editor?.chain().focus().setFontFamily(value).run()}
          >
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Times New Roman">Times New Roman</SelectItem>
              <SelectItem value="Calibri">Calibri</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={String(settings.fontSize)}
            onValueChange={(value) => updateDocumentSettings({ fontSize: Number(value) })}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent>
              {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="toolbar-section formatting">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'is-active' : ''}
          >
            <Bold className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'is-active' : ''}
          >
            <Italic className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={editor?.isActive('underline') ? 'is-active' : ''}
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="toolbar-section alignment">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className={editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
            className={editor?.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          >
            <AlignJustify className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="toolbar-section actions">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <List className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => applyTemplate('article')}>
                Artigo Científico
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => applyTemplate('report')}>
                Relatório Técnico
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Exportar como PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('docx')}>
                Exportar como DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-3.5 w-3.5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Configurações do Documento</SheetTitle>
                <SheetDescription>
                  Ajuste as configurações de layout do seu documento
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Label>Orientação Paisagem</Label>
                  <Switch
                    checked={settings.orientation === 'landscape'}
                    onCheckedChange={(checked) => 
                      updateDocumentSettings({ 
                        orientation: checked ? 'landscape' : 'portrait' 
                      })
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Margem Superior (cm)</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={0.1}
                    value={[settings.margins.top]}
                    onValueChange={([value]) => 
                      updateDocumentSettings({
                        margins: { ...settings.margins, top: value }
                      })
                    }
                  />
                </div>
                
                {/* Repeat for other margins */}
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-3.5 w-3.5" />
            ) : (
              <Maximize className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      <div 
        className="editor-content"
        style={{
          padding: `${settings.margins.top}cm ${settings.margins.right}cm ${settings.margins.bottom}cm ${settings.margins.left}cm`,
          fontSize: `${settings.fontSize}px`
        }}
      >
        <EditorContent editor={editor} />
      </div>

      <div className="fixed bottom-4 right-4">
        <Button 
          variant="default"
          onClick={handleSave}
          disabled={saving}
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  )
} 