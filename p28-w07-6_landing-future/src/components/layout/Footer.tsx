import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-10 text-text-sub text-sm text-center mt-auto">
            <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="hover:text-accent-cyan transition-colors" aria-label="Instagram">
                    <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-accent-cyan transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                </a>
                <a href="#" className="hover:text-accent-cyan transition-colors" aria-label="GitHub">
                    <Github size={20} />
                </a>
                <a href="mailto:contact@example.com" className="hover:text-accent-cyan transition-colors" aria-label="Email">
                    <Mail size={20} />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Futurist Artist. All rights reserved.</p>
        </footer>
    );
}
