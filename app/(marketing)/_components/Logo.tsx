import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '600']  
})

export const Logo = () => {
    return (
        <div className='hidden md:flex items-center gap-x-2'>
            <Image 
            src='/favicon.ico'
            width={50}
            height={50}
            alt='Notewave Logo'
            className='dark:hidden'
            />
            <Image 
            src='/favicon-dark.ico'
            width={50}
            height={50}
            alt='Notewave Logo'
            className='hidden dark:block'
            />
            <p className={cn("font-semibold", font.className)}>
                Notewave
            </p>
        </div>
    )
}
