"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

interface DocumentEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  setEditor: (editor: Editor | null) => void;
  className?: string;
}

export function DocumentEditor({ content, onUpdate, setEditor, className }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none w-full h-full p-6 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none shadow-inner bg-background ${className}`,
      },
    },
  });

  useEffect(() => {
    setEditor(editor);
    return () => {
      setEditor(null);
    };
  }, [editor, setEditor]);

  return <EditorContent editor={editor} aria-label="Document content editor" />;
}
