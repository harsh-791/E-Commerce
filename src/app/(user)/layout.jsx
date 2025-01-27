'use client';

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

export default function Layout({ children }) {
    return (
      <main>
        <Header />
        <AuthContextProvider>
            <UserChecking>
                <section>{children}</section> 
            </UserChecking>
        </AuthContextProvider>
        <Footer />
      </main>
    );
}

function UserChecking() {
    const { user, isLoading } = useAuth();
    if(isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <CircularProgress />
            </div>
        )
    }

    if(!user) {
        return (
          <div className="h-screen w-full flex flex-col gap-3 justify-center items-center">
            <h1 className="text-sm text-gray-600">You are not Logged In!!</h1>
            <Link href="/login">
                <button className="text-white text-sm bg-blue-500 px-4 py-2 rounded-xl">Login</button>
            </Link>
          </div>
        );
    }

    return <>{children}</>
}