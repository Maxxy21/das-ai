import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Suspense} from "react";

import {Toaster} from "@/components/ui/sonner";
import {ConvexClientProvider} from "@/providers/convex-client-provider";
import {ModalProvider} from "@/providers/modal-provider";
import {Loading} from "@/components/auth/loading";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Start-Up Collaborative Whiteboard",
    description: "A collaborative whiteboard for start-ups",
    icons: {
        icon: "/logo.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Suspense fallback={<Loading/>}>
            <ConvexClientProvider>
                <Toaster/>
                <ModalProvider/>
                {children}
            </ConvexClientProvider>
        </Suspense>
        <SpeedInsights/>
        </body>
        </html>
    );
}
