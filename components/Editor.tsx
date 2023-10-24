"use client";

import { useTheme } from "next-themes";
import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import { 
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialData?: string;
    editable?: boolean;
}

const Editor = ({
    onChange,
    initialData,
    editable
} : EditorProps) => {
    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({ file });
        return res.url;
    }

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: 
        initialData 
        ? JSON.parse(initialData) as PartialBlock[] 
        : undefined,
        onEditorContentChange: (content) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
        uploadFile: handleUpload
    })
    
    return (
        <div className="p-4">
            <BlockNoteView 
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    )
};

export default Editor;
