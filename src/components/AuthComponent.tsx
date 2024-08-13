import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";

const AuthComponent = () => {
    const { userId } = useAuth();
    return (
        <div className='flex gap-5'>
            {!userId && <SignUpButton />}
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default AuthComponent