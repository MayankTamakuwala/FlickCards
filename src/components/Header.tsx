// src/components/Header.tsx
import { DotIcon } from "@/assets/Icons"
import Link from "next/link"
import {
    SignedIn,
    UserButton
} from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { UserData, useSubscription } from "@/hooks/useSubscription"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import getStripe from "@/lib/stripe"

const Header = () => {
    const { userData, loading: isLoading, error } = useSubscription()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [endDate, setEndDate] = useState<{ date: Date, dateStr: string }>({
        date: new Date(0),
        dateStr: ''
    })

    useEffect(() => {
        if (userData) {
            const createdAtInSeconds = Math.floor(userData.created_at / 1000);

            const createdDate = new Date(createdAtInSeconds * 1000);

            const finalDate = new Date(createdDate.getTime() + (userData.active_days * 24 * 60 * 60 * 1000));

            const serverTime = async () => {
                const response = await fetch('/api/getServerTime')
                const data = (await response.json()).data
                return data
            }

            serverTime().then((serverTime) => {
                setIsActive(new Date(serverTime) < finalDate)
            })

            setEndDate({
                date: finalDate,
                dateStr: finalDate.toUTCString()
            });
        }
    }, [userData])

    return (
        <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center border-b-2 bg-white z-50">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <img src="/logo.jpg" alt="FlickCards Logo" className="h-12 w-12" />
                <span className="sr-only">AI Flashcards</span>
            </Link>


            <nav className="ml-auto flex gap-4 sm:gap-6">
                {!userData ? (
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
                        <StatusIndicator isActive={isActive} />
                        <UserButton>
                            <UserButton.UserProfilePage label="Subscription" labelIcon={<DotIcon />} url="subscription">
                                <SubscriptionManager isActive={isActive} userData={userData} isLoading={isLoading} error={error} endDate={endDate} />
                                {/* <SubscriptionForm/> */}
                            </UserButton.UserProfilePage>
                        </UserButton>
                    </SignedIn>
                )}
            </nav>
        </header>
    )
}

const SubscriptionManager = ({
    isActive,
    userData,
    isLoading,
    error,
    endDate
}: {
    isActive: boolean,
    userData: UserData,
    isLoading: boolean,
    error: string | null,
    endDate: {
        date: Date,
        dateStr: string
    }
}) => {

    // const handleSubmit = async () => {
    //     const checkoutSession = await fetch('/api/checkout_sessions', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             userId: userData.id
    //         })
    //     })
    //     const checkoutSessionJson = await checkoutSession.json()
    //     if (checkoutSession.statusCode === 500) {
    //         console.error(checkoutSession.message)
    //         return
    //     }


    //     const stripe = await getStripe()
    //     const { error } = await stripe?.redirectToCheckout({
    //         sessionId: checkoutSessionJson.id,
    //     })

    //     if (error) {
    //         console.warn(error.message)
    //     }
    // }

    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({
                userId: userData.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const checkoutSessionJson = await checkoutSession.json();

        if (checkoutSession.status === 500) {
            console.error(checkoutSessionJson.message);
            return;
        }

        const stripe = await getStripe();
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        });

        if (result?.error) {
            console.warn(result.error.message);
        }
    }

    if (isLoading) return <p>Loading subscription data...</p>
    if (error) return <p>Error loading subscription data</p>

    return (
            <Card className="mt-7">
                <CardHeader>
                    <CardTitle className="w-full flex justify-between items-center">
                        Your Subscription
                        <StatusIndicator isActive={isActive} />
                    </CardTitle>
                    <CardDescription>Manage your FlickCards subscription</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Current Plan: {userData?.planName}</p>
                    <p>Ends at: {endDate.dateStr}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {userData?.planName === "Free Trial" ?
                        (
                            // <div className="flex flex-col w-full justify-center items-center border-t-2 pt-4">
                            //     <h1 className="text-xl font-semibold">Upgrade to Pro Version</h1>
                            //     <h3 className="text-lg font-medium">$9/month</h3>
                            //     <h4 className="text-sm text-gray-600 mt-2 text-center">NOTE: I am not going to charge anything! This is just to showcase my Software Dev skills. You are gonna get charged $0.</h4>
                            //     <CheckoutForm userData={userData}/>
                            // </div>
                            <Button onClick={handleSubmit}>Upgrade</Button>
                        ) : (
                            <Button variant='outline'>
                                Cancel Pro
                            </Button>
                        )
                    }
                </CardFooter>
            </Card>
    )
}

const StatusIndicator = ({ isActive, }: { isActive: boolean }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
                style={{
                    height: '7px',
                    width: '7px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                }}
                className={(isActive ? 'bg-green-500' : 'bg-red-500')}
            />
            <span className={cn("text-sm", (isActive ? 'text-green-500' : 'text-red-500'))}>{isActive ? 'Active' : 'Not Active'}</span>
        </div>
    )
}

export default Header
