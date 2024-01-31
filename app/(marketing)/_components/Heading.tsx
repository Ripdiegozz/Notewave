"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [demoModal, setDemoModal] = useState(false);

    const openDemoUserModal = () => {
        setDemoModal(!demoModal);
    }

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, documents & plans unified.
                Welcome to <span className="underline">Notewave</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                A connected workspace where <br />
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
                    <div className="flex gap-4 flex-wrap mx-auto justify-center items-center">
                        <SignInButton mode="modal">
                            <Button>
                                Get Notewave free.
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </SignInButton>
                        <Button onClick={() => openDemoUserModal()}>
                            Try Demo User
                        </Button>
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
        </div>
    )
}