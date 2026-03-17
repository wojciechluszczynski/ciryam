import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  Heading1, Heading2, Heading3, Quote, Minus,
  Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon, Code, Undo, Redo,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogEditorProps {
  content: any;
  onChange: (content: any) => void;
}

const MenuButton = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded transition-colors ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
  >
    {children}
  </button>
);

const BlogEditor = ({ content, onChange }: BlogEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({ allowBase64: true, inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({ placeholder: "Zacznij pisać lub wklej tekst z Worda / Google Docs..." }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-sm max-w-none min-h-[300px] focus:outline-none font-body text-foreground leading-relaxed p-4",
      },
      handlePaste: (view, event) => {
        return false;
      },
    },
  });

  // Update editor content when content prop changes (e.g. from document import)
  useEffect(() => {
    if (editor && content && typeof content === "string" && content.startsWith("<")) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;
      
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);
      
      if (error) {
        toast.error("Błąd uploadu zdjęcia");
        return;
      }
      
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);
      
      editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    };
    input.click();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = prompt("Wpisz URL linku:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = prompt("Wklej link do filmu YouTube:");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  const addEmbed = useCallback(() => {
    if (!editor) return;
    const url = prompt("Wklej link do embedu (Facebook, Vimeo, itp.):");
    if (url) {
      // Insert as an iframe-like HTML block
      editor.chain().focus().insertContent(`<p><a href="${url}" target="_blank">${url}</a></p>`).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="border-b border-border px-3 py-2 flex flex-wrap gap-0.5 bg-secondary/50">
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Nagłówek 1">
          <Heading1 size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Nagłówek 2">
          <Heading2 size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Nagłówek 3">
          <Heading3 size={16} />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Pogrubienie">
          <Bold size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Kursywa">
          <Italic size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Przekreślenie">
          <Strikethrough size={16} />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Lista">
          <List size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Lista numerowana">
          <ListOrdered size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Cytat">
          <Quote size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Linia">
          <Minus size={16} />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <MenuButton onClick={addLink} active={editor.isActive("link")} title="Link">
          <LinkIcon size={16} />
        </MenuButton>
        <MenuButton onClick={addImage} title="Dodaj zdjęcie">
          <ImageIcon size={16} />
        </MenuButton>
        <MenuButton onClick={addYoutube} title="Embed YouTube">
          <YoutubeIcon size={16} />
        </MenuButton>
        <MenuButton onClick={addEmbed} title="Embed (FB, Vimeo)">
          <Code size={16} />
        </MenuButton>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Cofnij">
          <Undo size={16} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Ponów">
          <Redo size={16} />
        </MenuButton>
      </div>

      {/* Bubble menu for inline formatting */}
      {editor && (
        <BubbleMenu editor={editor} className="flex gap-0.5 bg-card border border-border rounded-lg p-1 shadow-lg">
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Pogrubienie">
            <Bold size={14} />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Kursywa">
            <Italic size={14} />
          </MenuButton>
          <MenuButton onClick={addLink} active={editor.isActive("link")} title="Link">
            <LinkIcon size={14} />
          </MenuButton>
        </BubbleMenu>
      )}

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;
