import React from "react";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { ProfileImage } from "./ProfileImage";
import { StatusCard } from "./StatusCard";

export const Hero = () => {
  return (
    <section className="pt-20 pb-32 lg:pt-32 lg:pb-40">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="text-xs font-medium text-blue-500 tracking-wide mb-4">
            AVAILABLE FOR NEW PROJECTS
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Hi, I'm <span className="text-blue-500">Minjun</span>.
          </h1>
          <p className="text-base text-slate-600 max-w-md mb-8 leading-relaxed">
            I'm a passionate designer and developer crafting beautiful, accessible, and high-performance web experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
             <Button variant="primary">View Work</Button>
             <Button variant="secondary">Contact Me</Button>
          </div>

          <div className="flex gap-6 flex-wrap">
            {["Product Design", "Web Development", "Interaction"].map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 relative">
          <ProfileImage />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 sm:-bottom-6 lg:bottom-10 lg:-left-12 z-10 hidden sm:block">
             <StatusCard />
          </div>
        </div>
      </div>
    </section>
  );
};
