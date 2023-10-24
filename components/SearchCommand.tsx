"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/useSearch";
import { api } from "@/convex/_generated/api";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggle();
            }
        }

        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, [toggle]);

    const onSelect = (id: string) => {
        router.push(`/app/documents/${id}`);
        onClose();
    };

    if (!isMounted) return null;

    return (
        <CommandDialog
        open={isOpen}
        onOpenChange={onClose}
        >
            <CommandInput
                placeholder={`Search ${user?.fullName}'s Notewave`}
            />
            <CommandList>
                <CommandEmpty>
                    No results found.
                </CommandEmpty>
                <CommandGroup
                    heading="Documents"
                >
                    {documents?.map((document) => (
                        <CommandItem
                            key={document._id}   
                            value={`${document._id}-${document.title}`}
                            title={document.title}
                            onSelect={onSelect}
                        >
                            {
                                document.icon
                                ? <p className="mr-2 text-[18px]">{document.icon}</p>
                                : <File className="me-2 h-4 w-4" />
                            }
                            <p className="text-sm">
                                {document.title}
                            </p>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
