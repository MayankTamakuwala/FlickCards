import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const { userId } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!userId) {
                router.push('/?no_auth=true');
            }
        }, [userId, router]);

        if (!userId) {
            return null; // or a loading spinner if you want to show something while redirecting
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;