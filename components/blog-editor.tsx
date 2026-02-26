"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Minus,
  Undo,
  Redo,
  Search,
  X,
  Image,
  Youtube,
  Upload,
} from "lucide-react";

interface CommandItem {
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export function BlogEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showCommands, setShowCommands] = useState(false);
  const [commandFilter, setCommandFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialValueSet = useRef(false);
  const prevValueRef = useRef<string | undefined>(undefined);

  const commands: CommandItem[] = [
    {
      label: "Heading 1",
      icon: <Heading1 className="w-4 h-4" />,
      action: () => execCommand("formatBlock", "h1"),
    },
    {
      label: "Heading 2",
      icon: <Heading2 className="w-4 h-4" />,
      action: () => execCommand("formatBlock", "h2"),
    },
    {
      label: "Heading 3",
      icon: <Heading3 className="w-4 h-4" />,
      action: () => execCommand("formatBlock", "h3"),
    },
    {
      label: "Bullet List",
      icon: <List className="w-4 h-4" />,
      action: () => execCommand("insertUnorderedList"),
    },
    {
      label: "Numbered List",
      icon: <ListOrdered className="w-4 h-4" />,
      action: () => execCommand("insertOrderedList"),
    },
    {
      label: "Quote",
      icon: <Quote className="w-4 h-4" />,
      action: () => execCommand("formatBlock", "blockquote"),
    },
    {
      label: "Code Block",
      icon: <Code className="w-4 h-4" />,
      action: () => execCommand("formatBlock", "pre"),
    },
    {
      label: "Horizontal Rule",
      icon: <Minus className="w-4 h-4" />,
      action: () => execCommand("insertHorizontalRule"),
    },
    {
      label: "Image",
      icon: <Image className="w-4 h-4" />,
      action: () => {
        setShowCommands(false);
        setShowImageModal(true);
      },
    },
    {
      label: "Upload Image",
      icon: <Upload className="w-4 h-4" />,
      action: () => {
        setShowCommands(false);
        fileInputRef.current?.click();
      },
    },
    {
      label: "YouTube Video",
      icon: <Youtube className="w-4 h-4" />,
      action: () => {
        setShowCommands(false);
        setShowVideoModal(true);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(commandFilter.toLowerCase()),
  );

  useEffect(() => {
    if (editorRef.current) {
      if (!initialValueSet.current && value) {
        editorRef.current.innerHTML = value;
        initialValueSet.current = true;
        prevValueRef.current = value;
      } else if (
        initialValueSet.current &&
        value &&
        value !== prevValueRef.current
      ) {
        const selection = window.getSelection();
        const hadFocus =
          selection &&
          selection.rangeCount > 0 &&
          editorRef.current.contains(selection.anchorNode);

        editorRef.current.innerHTML = value;
        prevValueRef.current = value;

        if (hadFocus && selection) {
          try {
            const range = document.createRange();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          } catch (e) {}
        }
      } else if (!initialValueSet.current && !value) {
        initialValueSet.current = true;
      }
    }
  }, [value]);

  const handleInput = () => {
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textBefore =
        range.startContainer.textContent?.slice(0, range.startOffset) || "";

      if (textBefore.endsWith("/")) {
        setShowCommands(true);
        setCommandFilter("");
        setSelectedIndex(0);
      } else if (showCommands) {
        const textAfterSlash = textBefore.split("/").pop() || "";
        setCommandFilter(textAfterSlash);

        if (
          !textBefore.endsWith("/") &&
          !textBefore.includes("/" + commandFilter)
        ) {
          setShowCommands(false);
        }
      }
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertImage = () => {
    if (imageUrlInput) {
      const imgHtml = `<img src="${imageUrlInput}" alt="Image" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
      document.execCommand("insertHTML", false, imgHtml);
      handleInput();
      setImageUrlInput("");
      setShowImageModal(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        const imgHtml = `<img src="${data.url}" alt="Image" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
        document.execCommand("insertHTML", false, imgHtml);
        handleInput();
        setShowImageModal(false);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const insertYouTubeVideo = () => {
    if (videoUrlInput) {
      // Extract video ID from various YouTube URL formats
      let videoId = "";
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/,
      ];

      for (const pattern of patterns) {
        const match = videoUrlInput.match(pattern);
        if (match) {
          videoId = match[1];
          break;
        }
      }

      if (videoId) {
        const embedHtml = `
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1rem 0; max-width: 100%;">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
              allowfullscreen
            ></iframe>
          </div>
        `;
        document.execCommand("insertHTML", false, embedHtml);
        handleInput();
      }
      setVideoUrlInput("");
      setShowVideoModal(false);
    }
  };

  const executeCommand = (cmd: CommandItem) => {
    cmd.action();
    setShowCommands(false);
    setCommandFilter("");
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCommands) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) % filteredCommands.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        setShowCommands(false);
      }
    }
  };

  const closeCommands = () => {
    setShowCommands(false);
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      if (text.endsWith("/")) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const textBefore = range.startContainer.textContent || "";
          const newText = textBefore.slice(0, -1);
          range.startContainer.textContent = newText;
        }
      }
    }
  };

  return (
    <div className="border rounded-none overflow-hidden relative">
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Upload from computer
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer"
                disabled={isUploading}
              />
              {isUploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or enter URL
                </span>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="w-full p-2 border rounded"
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={insertImage} disabled={!imageUrlInput}>
                Insert
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for direct upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        disabled={isUploading}
      />

      {/* YouTube Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insert YouTube Video</h3>
            <input
              type="text"
              placeholder="Enter YouTube URL or video ID"
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <p className="text-sm text-gray-500 mb-4">
              Supports: youtube.com/watch?v=..., youtu.be/...,
              youtube.com/embed/..., or just the video ID
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowVideoModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={insertYouTubeVideo}>Insert</Button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "h1")}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "h2")}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "h3")}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("underline")}
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) execCommand("createLink", url);
          }}
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageModal(true)}
          title="Insert Image"
        >
          <Image className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowVideoModal(true)}
          title="Insert YouTube Video"
        >
          <Youtube className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "pre")}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("formatBlock", "blockquote")}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertHorizontalRule")}
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("undo")}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("redo")}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowCommands(!showCommands)}
          title="Commands (/)"
          className={showCommands ? "bg-gray-200" : ""}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Command Menu */}
      {showCommands && (
        <div className="absolute top-14 left-4 z-50 bg-white border rounded-lg shadow-lg w-64 max-h-80 overflow-auto">
          <div className="flex items-center justify-between p-2 border-b bg-gray-50">
            <span className="text-sm font-medium">Commands</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={closeCommands}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-1">
            {filteredCommands.length === 0 ? (
              <div className="p-2 text-sm text-gray-500">No commands found</div>
            ) : (
              filteredCommands.map((cmd, index) => (
                <button
                  key={cmd.label}
                  type="button"
                  className={`w-full flex items-center gap-2 p-2 text-left rounded hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-100" : ""}`}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {cmd.icon}
                  <span className="text-sm">{cmd.label}</span>
                </button>
              ))
            )}
          </div>
          <div className="p-2 border-t bg-gray-50 text500">
            Use ↑↓ to navigate-xs text-gray-, Enter to select, Esc to close
          </div>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value || "" }}
        data-placeholder="Start writing... Type / for commands"
        style={{ position: "relative" }}
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          position: absolute;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
