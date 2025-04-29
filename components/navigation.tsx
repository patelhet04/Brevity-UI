"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Politics",
  "Technology",
  "Business",
  "Health",
  "Science",
  "Entertainment",
  "Sports",
];

export default function Navigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="border-b sticky top-0 z-30 bg-background backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl text-primary">
              Brevity
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Categories <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} asChild>
                      <Link href={`/category/${category.toLowerCase()}`}>
                        {category}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" asChild>
                <Link href="/trending">Trending</Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link href="/recent">Most Recent</Link>
              </Button>
            </nav>
          </div>

          {/* Desktop Actions - only shown on desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-96 flex justify-end">
              <AnimatePresence mode="wait">
                {showSearch ? (
                  <motion.div
                    className="flex items-center w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      placeholder="Search news..."
                      className="w-full"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0"
                      onClick={() => setShowSearch(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button - only shown on mobile */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              className="md:hidden pt-2 pb-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                placeholder="Search news..."
                className="w-full"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
            />

            <motion.div
              className="md:hidden fixed top-[58px] left-0 right-0 z-50 bg-background border-t shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="container mx-auto px-4 py-2 flex flex-col gap-1 max-h-[calc(100vh-58px)] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/trending">Trending</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/recent">Most Recent</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/account">My Account</Link>
                </Button>

                <div className="h-px bg-border my-2"></div>
                <p className="text-sm font-medium px-3 py-1">Categories</p>

                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="justify-start"
                    asChild
                  >
                    <Link href={`/category/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </Button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
