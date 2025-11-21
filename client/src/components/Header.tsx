import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import * as PORTFOLIO from "@/portfolio";

interface NavItem {
  label: string;
  section: string;
}

interface HeaderProps {
  onNavigate: (section: string) => void;
  navItems?: NavItem[];
}

export default function Header({ onNavigate, navItems = PORTFOLIO.NAV_ITEMS as any }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => onNavigate("home")}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Matheus <span className="text-primary">Lopes</span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onNavigate("home")}
              className="text-foreground hover:text-primary hover:bg-primary/10"
            >
              Início
            </Button>
            {navItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => onNavigate(item.section)}
                className="text-foreground hover:text-primary hover:bg-primary/10"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={() => {
                onNavigate("home");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
            >
              Início
            </Button>
            {navItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => {
                  onNavigate(item.section);
                  setMobileMenuOpen(false);
                }}
                className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
