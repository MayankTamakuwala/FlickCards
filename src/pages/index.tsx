import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import SignInModal from "@/components/SignInModal";
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckIcon } from "@/assets/Icons";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

export default function Home() {
    const { userId } = useAuth();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (userId) {
            router.push('/dashboard');
        } else if (router.query.no_auth) {
            setIsModalOpen(true);
        }
    }, [userId, router]);

    const closeModal = () => {
        setIsModalOpen(false);
        router.replace('/', undefined, { shallow: true });
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <LampContainer internalClassName="mt-28 md:mt-0" className="rounded-none flex justify-center items-center">
                    <div className=" flex flex-col justify-center items-center">
                        <motion.h1
                            initial={{ opacity: 0.5, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                        >
                            <p style={{fontFamily: "fantasy"}} className="font-bold">FlickCards</p>
                            Effortless Flashcard Generation
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.7,
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                            className="w-full md:w-1/2 text-muted-foreground md:text-xl text-center">
                            Unlock your learning potential with our AI-powered flashcard generator. Customize difficulty levels,
                            track progress, and ace your studies.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 1,
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                            className="flex flex-col gap-2 min-[400px]:flex-row mt-7 "
                        >
                            <Link
                                href="/sign-up"
                                className="bg-white text-black hover:text-white hover:shadow-2xl hover:shadow-cyan-500 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Generate Flashcards
                            </Link>
                        </motion.div>
                    </div>
                </LampContainer>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Learning Potential</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our AI-powered flashcard generator helps you study smarter, not harder. Customize difficulty levels,
                                    track progress, and ace your exams.
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>Customizable Difficulty</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    Adjust the difficulty of your flashcards to match your learning needs.
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>Comprehensive Dashboard</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    Track your progress, review past flashcards, and stay organized.
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>AI-Powered Generation</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    Let our AI generate personalized flashcards tailored to your needs.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-slate-950">
                    <div className="container grid items-center gap-4 px-4 md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tight  md:text-4xl/tight text-muted-foreground">Pricing to Fit Your Needs</h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Choose the plan that works best for you and start unlocking your learning potential.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>Free</CardTitle>
                                    <CardDescription>Get started for free</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    <div className="space-y-2">
                                        <p className="text-5xl font-bold">$0</p>
                                        <p className="text-muted-foreground">per month</p>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Access to basic features
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Limited flashcard generation
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Basic progress tracking
                                        </li>
                                    </ul>
                                    <Button variant="outline" className="mt-4" onClick={() => {router.push("/sign-up")}}>
                                        Start for free
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>Pro</CardTitle>
                                    <CardDescription>Unlock full potential</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    <div className="space-y-2">
                                        <p className="text-5xl font-bold">$9</p>
                                        <p className="text-muted-foreground">per month</p>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Unlimited flashcard generation
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Customizable difficulty levels
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Advanced progress tracking
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Priority support
                                        </li>
                                    </ul>
                                    <Button className="mt-4" onClick={() => {router.push("/sign-up")}} >Get Pro</Button>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>Enterprise</CardTitle>
                                    <CardDescription>Custom solutions for teams</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    <div className="space-y-2">
                                        <p className="text-5xl font-bold">Contact us</p>
                                        <p className="text-muted-foreground">for pricing</p>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Dedicated account manager
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Customized branding and integrations
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Advanced analytics and reporting
                                        </li>
                                        <li className="flex items-center">
                                            <CheckIcon className="mr-2 h-4 w-4" />
                                            Enterprise-grade security and compliance
                                        </li>
                                    </ul>
                                    <Button className="mt-4">
                                        <Link href={"/#contact"} >Contact Sales</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                
                <section id="about" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Revolutionizing the Way You Learn</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    At AI Flashcards, we're on a mission to empower students and lifelong learners with cutting-edge
                                    technology. Our AI-powered flashcard generator is designed to streamline your study process and help
                                    you achieve your learning goals.
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>Our Mission</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    To empower learners of all ages and backgrounds with the tools they need to succeed.
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>Our Values</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    Innovation, accessibility, and a relentless commitment to student success.
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col text-center">
                                <CardHeader>
                                    <CardTitle>Our Team</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between flex-1">
                                    A diverse group of passionate educators, technologists, and lifelong learners.
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </section>

                <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container grid items-center gap-4 px-4 md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Have a question or want to learn more? Don't hesitate to reach out.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" placeholder="Your name" />
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Your email" />
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Your message" />
                                <Button type="submit" className="mt-4">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 AI Flashcards. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                </nav>
            </footer>
            <SignInModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}