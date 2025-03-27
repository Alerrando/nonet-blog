import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useBlog } from "@/provider/BlogProvider";
import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicRouter(){
    const { articles } = useBlog();
    const queryClient = new QueryClient();

    useEffect(() => {
        if(articles.length === 0)
            queryClient.refetchQueries(["get-all-articles"]);
    }, []);

    return(
        <>
            <Header />
            <main className="min-h-screen pt-24 px-6">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}