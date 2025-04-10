
import { FaYinYang } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useBlog } from "@/provider/BlogProvider";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  const { setZenMode, zenMode } = useBlog();
  const isMobile = useIsMobile();

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out 
        ${zenMode ? "opacity-0 pointer-events-none" : "glass-header py-3 sm:py-4 px-3 sm:px-6 dark:bg-gray-900 dark:text-white"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl sm:text-2xl font-heading font-medium text-foreground transition-opacity hover:opacity-80">
          <Link to="/" className="no-underline dark:text-white">
            NoNet Blog
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle />

          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="dark:hover:bg-zinc-600 dark:hover:text-white p-1 sm:p-2"
                  onClick={() => setZenMode(!zenMode)}
                >
                  <FaYinYang size={isMobile ? 16 : 20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <p>{isMobile ? "Ativar modo Zen" : "Clique aqui para ativar o modo Zen ou aperte "Z""}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
