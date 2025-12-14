// frontend/constants/themeConfig.ts

interface SectionTheme {
  id: string; // Corresponds to the section's ID
  colors: {
    background: string;
    foreground: string;
    // Add other relevant CSS variables here if needed
  };
}

export const sectionThemes: SectionTheme[] = [
  {
    id: 'hero',
    colors: {
      background: 'oklch(1 0 0)', // Default light background
      foreground: 'oklch(0.145 0 0)', // Default dark foreground
    },
  },
  {
    id: 'about',
    colors: {
      background: 'oklch(0.95 0 0)', // Slightly darker background for About
      foreground: 'oklch(0.145 0 0)',
    },
  },
  {
    id: 'portfolio',
    colors: {
      background: 'oklch(1 0 0)', // Default light background
      foreground: 'oklch(0.145 0 0)',
    },
  },
  {
    id: 'services',
    colors: {
      background: 'oklch(0.98 0 0)', // Another light variation
      foreground: 'oklch(0.145 0 0)',
    },
  },
  {
    id: 'testimonials',
    colors: {
      background: 'oklch(0.95 0 0)',
      foreground: 'oklch(0.145 0 0)',
    },
  },
  {
    id: 'contact',
    colors: {
      background: 'oklch(0.9 0 0)', // Even darker background for Contact
      foreground: 'oklch(0.145 0 0)',
    },
  },
];
