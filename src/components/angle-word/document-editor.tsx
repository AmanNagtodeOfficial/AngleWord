
"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { useEffect } from "react";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

interface DocumentEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  setEditor: (editor: Editor | null) => void;
  className?: string;
}

export function DocumentEditor({ content, onUpdate, setEditor, className }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disabling strikethrough in StarterKit to avoid conflicts if we add it separately
        // but it's fine to leave it on.
      }),
      Underline,
      Subscript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert max-w-none w-full h-full focus:outline-none ${className}`,
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
