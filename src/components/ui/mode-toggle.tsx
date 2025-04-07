import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/provider/ThemeProvider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:text-gray-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:text-gray-200 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1 dark:bg-gray-800 dark:border-gray-700" align="end">
        <div className="flex flex-col dark:[&>button]:text-gray-300 dark:[&>button:hover]:bg-gray-700 dark:[&>button]:px-3 dark:[&>button]:py-2 dark:[&>button]:text-left dark:[&>button]:rounded-sm dark:[&>button]:transition-colors">
          <button onClick={() => setTheme("light")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
          <button onClick={() => setTheme("system")}>System</button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
