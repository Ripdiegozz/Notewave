"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/useScrollTop";

export const Navbar = () => {
    const scrolled = useScrollTop();
    const { isAuthenticated, isLoading} = useConvexAuth();
    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "shadow-sm border-b"
        )}>
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                {
                    isLoading && (
                        <Spinner />
                    )
                }
                {
                    !isLoading && !isAuthenticated && (
                    <div className="flex gap-x-2">
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get Notewave free
                            </Button>
                        </SignInButton>
                    </div>
                    )
                }
                {
                    isAuthenticated && !isLoading && (
                        <div className="flex gap-x-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/documents">
                                    Enter Notewave
                                </Link>
                            </Button>
                            <UserButton 
                                afterSignOutUrl="/"
                            />
                        </div>
                    )
                }
                <ModeToggle />
            </div>
        </div>
    );
}