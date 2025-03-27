
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useBlog } from "@/provider/BlogProvider";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicRouter(){
    const { articles, refetchGetAllArticles } = useBlog();

    useEffect(() => {
        if(articles.length === 0)
            refetchGetAllArticles();
    }, [articles.length, refetchGetAllArticles]);

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
