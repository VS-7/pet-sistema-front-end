import { DocumentEditor } from '@/src/components/documents/document-editor'

interface DocumentEditPageProps {
  params: {
    id: string
  }
}

export default function DocumentEditPage({ params }: DocumentEditPageProps) {
  return (
    <div className="container mx-auto py-6">
      <DocumentEditor documentId={parseInt(params.id)} />
    </div>
  )
} 