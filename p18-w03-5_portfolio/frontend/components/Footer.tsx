import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-muted-foreground p-4 mt-8 border-t border-gray-100">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
