"use client"

import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Doc } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/useOrigin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
    initialData: Doc<"documents">;
}

export const Publish = ({
    initialData
}: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true
        })
        .finally(() => {
            setSubmitting(false);
        })

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Published!",
            error: "Failed to publish note."
        });
    }

    const onUnpublish = () => {
        setSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false
        })
        .finally(() => {
            setSubmitting(false);
        })

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Unpublished!",
            error: "Failed to unpublish note."
        });
    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

  return (
    <Popover>
        <PopoverTrigger>
            <Button>
                Publish
                {initialData.isPublished &&(
                    <Globe
                        className="h-4 w-4 ml-2 text-sky-500"
                    />                
                )}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
            {
                initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                value={url}
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                disabled
                            />
                            <Button
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                                size="sm"
                            >
                                {
                                    copied ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )
                                }
                            </Button>
                        </div>
                        <Button
                            disabled={submitting}
                            onClick={onUnpublish}
                            className="w-full text-xs"
                            size={"sm"}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-between">
                        <Globe
                          className="h-8 w-8 text-muted-foreground mb-2"
                        />
                        <p className="text-sm font-medium mb-2">
                            Publish this note
                        </p>
                        <span className="text-sm text-muted-foreground pb-2">
                            Share your work with others.
                        </span>
                        <Button
                            disabled={submitting}
                            onClick={onPublish}
                            className="w-full text-xs"
                            size={"sm"}
                        >
                            Publish
                        </Button>
                    </div>
                )
            }
        </PopoverContent>
    </Popover>
  )
};
