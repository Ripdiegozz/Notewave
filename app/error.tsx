"use client";

import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button";

const Error = () => {
    const ErrorImagesPaths = [
        "/draws/404/pacheco.svg",
        "/draws/404/peep-44.svg",
        "/draws/404/peep-53.svg",
        "/draws/404/polka-pup.svg",
        "/draws/404/pondering.svg",
        "/draws/404/puppy.svg",
        "/draws/404/reflecting.svg",
        "/draws/404/mask.svg",
    ]

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src={ErrorImagesPaths[Math.floor(Math.random() * ErrorImagesPaths.length)]}
                height={300}
                width={300}
                alt='Error'
            />
            <h2 className="text-xl font-medium">
                Something went wrong :(
            </h2>
            <Button asChild>
                <Link href="/documents">
                    Go back to documents
                </Link>
            </Button>
        </div>
    )
}

export default Error;
