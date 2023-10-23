"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

export const Heading = () => {

    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, documents and plans.
                In the same place. Welcome to <span className="underline">Notewave</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notewave is a new way to organize your ideas, documents and plans. A connected workspace where <br />
                better, faster and more connected thinking happens.
            </h3>
            {
                isLoading && (
                    <div className="flex w-full items-center justify-center">
                        <Spinner size="lg" />
                    </div>
                )
            }
            {
                isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter NoteWave
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
                    )
            }
            {
                !isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button>
                            Get Notewave free.
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </SignInButton>
                )
            }
        </div>
    )
}