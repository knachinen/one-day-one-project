"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Import shadcn/ui Dialog components
import { Button } from '@/components/ui/button';

interface ProjectDetailModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    category: string[];
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null; // Handle case where project data might be missing

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>
            {project.description}
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 py-4"
        >
          {/* Project Image */}
          <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {project.category.map((cat, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {cat}
              </span>
            ))}
          </div>

          {/* More Details (Placeholder) */}
          <div className="text-muted-foreground text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="mt-2">
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus auctor mattis.
            </p>
          </div>
        </motion.div>
        {/* Optional: Add a button to navigate to a live demo or GitHub */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>닫기</Button>
          {/* <Button>라이브 데모</Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
