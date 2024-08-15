import { DotIcon } from '@/assets/Icons';
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
        <div className='flex gap-5 justify-center items-center'>
            {!userId && <SignUpButton />}
            <SignedOut>
                <SignInButton />
            </SignedOut>
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
        </div>
    )
}



export default AuthComponent