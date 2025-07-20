
"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { CSSProperties, useEffect } from "react";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { CharacterCount } from "@tiptap/extension-character-count";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

// Extend the BulletList to support custom list styles
export const BulletList = TiptapBulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-list-style-type': {
        default: 'disc',
        parseHTML: element => element.getAttribute('data-list-style-type') || 'disc',
        renderHTML: attributes => {
          return { 'data-list-style-type': attributes['data-list-style-type'] };
        },
      },
    };
  },
});

const IndentableParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      indent: {
        default: 0,
        renderHTML: attributes => {
          if (!attributes.indent) {
            return {}
          }
          return { 'style': `margin-left: ${attributes.indent * 40}px` }
        },
        parseHTML: element => {
            const indent = parseInt(element.style.marginLeft || '0', 10) / 40;
            return indent > 0 ? indent : null;
        },
      },
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      indent: () => ({ commands }) => {
        return commands.updateAttributes(this.name, {
          indent: (this.options.HTMLAttributes?.indent || 0) + 1,
        });
      },
      outdent: () => ({ commands }) => {
        return commands.updateAttributes(this.name, {
          indent: Math.max(0, (this.options.HTMLAttributes?.indent || 0) - 1),
        });
      },
    }
  }
});


interface DocumentEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  setEditor: (editor: Editor | null) => void;
  className?: string;
  style?: CSSProperties;
}

export function DocumentEditor({ content, onUpdate, setEditor, className, style }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable default to use our custom one
        paragraph: false, // Disable default to use our custom one
      }),
      CharacterCount,
      IndentableParagraph,
      BulletList,
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
       BubbleMenu.configure({
        // You can configure plugin options here.
        // For example, the tippy options.
       }),
       Table.configure({
        resizable: true,
       }),
       TableRow,
       TableHeader,
       TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert max-w-none focus:outline-none ${className}`,
      },
    },
  });

  useEffect(() => {
    setEditor(editor);
    return () => {
      setEditor(null);
    };
  }, [editor, setEditor]);

  return <EditorContent editor={editor} aria-label="Document content editor" style={style} />;
}
