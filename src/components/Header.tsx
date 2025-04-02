import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 glass-header py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-heading font-medium text-foreground transition-opacity hover:opacity-80">
          <a href="/" className="no-underline">
            NoNet Blog
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
