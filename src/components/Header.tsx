import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-header py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-heading font-medium text-foreground transition-opacity hover:opacity-80">
          <a href="/" className="no-underline">
            My Personal Blog
          </a>
        </div>

        <nav>
          <ul className="flex space-x-8">
            {["Home", "About", "Contact"].map((item) => (
              <li key={item} className="list-none">
                <a
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={cn(
                    "text-base font-medium text-muted-foreground",
                    "transition-colors duration-200 hover:text-foreground",
                    "relative after:absolute after:bottom-[-4px] after:left-0",
                    "after:h-[2px] after:w-0 after:bg-primary",
                    "after:transition-all after:duration-300 hover:after:w-full",
                  )}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
