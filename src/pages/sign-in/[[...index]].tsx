import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-screen h-screen">
            <SignIn />
        </div>
    );
}