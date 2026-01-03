"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Works", path: "/works" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    return (
        <nav className="fixed top-10 left-0 right-0 z-50 w-fit mx-auto">
            <div className="bg-background/70 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex items-center gap-8 shadow-lg">
                {navItems.map((item) => (
                    <Link key={item.name} href={item.path} className="relative group">
                        <span className="text-text-main text-sm font-medium tracking-wide hover:text-accent-cyan transition-colors">
                            {item.name}
                        </span>
                        <span
                            className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-cyan group-hover:w-full transition-all duration-300 ease-out"
                        />
                    </Link>
                ))}
            </div>
        </nav>
    );
}
