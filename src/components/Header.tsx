import { Link } from "react-router-dom";

import { ModeToggle } from "./ui/mode-toggle";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-header py-4 px-6 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-heading font-medium text-foreground transition-opacity hover:opacity-80">
          <Link to="/" className="no-underline dark:text-white">
            NoNet Blog
          </Link>
        </div>

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
