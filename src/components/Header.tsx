import { CloudLightningIcon, DotIcon } from "@/assets/Icons"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import {
    SignedIn,
    UserButton
} from '@clerk/nextjs'

const Header = () => {
    const { userId } = useAuth();
    return (
        // <header className="px-4 lg:px-6 h-14 flex items-center border-b-2  top-0 z-50">
        <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center border-b-2 bg-white z-50">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <CloudLightningIcon className="h-6 w-6" />
                <span className="sr-only">AI Flashcards</span>
            </Link>


            <nav className="ml-auto flex gap-4 sm:gap-6">
                {!userId ? (
                    <>
                        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Features
                        </Link>
                        <Link href="/#pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Pricing
                        </Link>
                        <Link href="/#about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="/#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Contact
                        </Link>
                    </>
                ) : (
                    <SignedIn>
                        <UserButton>
                            <UserButton.UserProfilePage label="Subscription" labelIcon={<DotIcon />} url="terms">
                                <div>
                                    <h1>Custom Terms Page</h1>
                                    <p>This is the custom terms page</p>
                                </div>
                            </UserButton.UserProfilePage>
                        </UserButton>
                    </SignedIn>
                )}
            </nav>
        </header>
    )
}

export default Header