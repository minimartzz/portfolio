import React from "react";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="flex items-center justify-center h-12">
        <div className="flex gap-8 text-sm text-muted-foreground font-bold">
          <a
            href="/"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Home
          </a>
          <a
            href="projects"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a
            href="contact"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
