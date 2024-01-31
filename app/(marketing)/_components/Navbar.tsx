"use client";

import { useState } from "react";
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
    const [demoModal, setDemoModal] = useState(false);

    const openDemoUserModal = () => {
        setDemoModal(!demoModal);
    }

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
                    <div className="flex flex-col md:flex-row gap-2">
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
                        <Button className="py-0 px-4 rounded-lg" onClick={() => openDemoUserModal()}>
                            Try Demo User
                        </Button>
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
                {
                    demoModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[99999] p-2">
                            <div className="bg-white p-8 rounded-lg text-gray-800">
                                <h2 className="text-2xl font-bold mb-4">Demo User</h2>
                                <p className="mb-4">Use the following credentials to login as a demo user.</p>
                                <p className="mb-4">Email:
                                    <span className="font-bold ml-1">
                                        demo@user.com
                                    </span>
                                </p>
                                <p className="mb-4">Password:
                                    <span className="font-bold ml-1">
                                        demo@user
                                    </span>
                                </p>
                                <Button variant="secondary" onClick={() => openDemoUserModal()}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    )
                }
                <ModeToggle />
            </div>
        </div>
    );
}