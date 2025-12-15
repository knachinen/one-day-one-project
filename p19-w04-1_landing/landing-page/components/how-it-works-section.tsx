"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function HowItWorksSection() {
  const itemVariants = { // Changed accordionVariants to itemVariants to reflect it applies to individual items
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="how-it-works" className="py-[100px] lg:py-[120px] bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          {/* Sub-label */}
          <span className="inline-flex items-center rounded-full bg-vibe-blue/10 px-3 py-1 text-sm font-medium text-vibe-blue mb-4">
            THE ROADMAP
          </span>
          {/* Main H2 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            How It Works
          </h2>
          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            From zero coding knowledge to your own app in just 3 hours. Here is our proven roadmap to launch your MVP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-start">
          {/* Left Column: Process Accordion (4/10 width on desktop, full width on mobile) */}
          <motion.div
            className="md:col-span-4 relative" // Added relative positioning for the indicator
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }} // Stagger children for sequential animation
          >
            {/* Progress Indicator Placeholder */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 hidden md:block">
                <motion.div
                    className="h-full bg-vibe-blue"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ originY: 0 }}
                />
            </div>
            <div className="md:ml-4"> {/* Added margin to accordion to make space for the indicator */}
                <Accordion type="single" collapsible className="w-full">
                  <motion.div variants={itemVariants}> {/* Apply itemVariants to each AccordionItem wrapper */}
                    <AccordionItem value="item-1" className="bg-white rounded-lg shadow mb-4 px-6">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800 py-6 text-left hover:no-underline">
                        <div className="flex items-center gap-4">
                          <span className="text-vibe-blue text-2xl">🎓</span>
                          3-Hour Offline Workshop
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="text-gray-700">
                          Join our intensive offline session where you will build a functional app prototype from scratch. No prior experience needed. We provide the laptops, the curriculum, and the coffee.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Offline</span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">Gangnam Station</span>
                          <span className="inline-flex items-center rounded-full bg-vibe-blue/20 px-2.5 py-0.5 text-xs font-medium text-vibe-blue">3 Hours</span>
                        </div>
                        <a href="#" className="text-vibe-blue hover:text-vibe-blue/80 font-medium text-sm mt-4 inline-block underline-offset-4 hover:underline">
                          See Curriculum Details →
                        </a>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <AccordionItem value="item-2" className="bg-white rounded-lg shadow mb-4 px-6">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800 py-6 text-left hover:no-underline">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-2xl">🔧</span>
                          Post-Debugging Training
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="text-gray-700">
                          Learn to fix errors and polish your code.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <AccordionItem value="item-3" className="bg-white rounded-lg shadow mb-4 px-6">
                      <AccordionTrigger className="text-xl font-semibold text-gray-800 py-6 text-left hover:no-underline">
                        <div className="flex items-center gap-4">
                          <span className="text-green-500 text-2xl">🚀</span>
                          Solo Founder Coaching
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <p className="text-gray-700">
                          1:1 strategy session for your MVP.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                </Accordion>
                <div className="mt-8 text-center md:text-left">
                    <Button className="bg-gradient-to-r from-vibe-blue to-energy-orange hover:from-vibe-blue/90 hover:to-energy-orange/90 text-white font-bold py-2 px-6 rounded-full text-lg">
                        Start Your Journey →
                    </Button>
                </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Elements (6/10 width on desktop, full width on mobile) */}
          <motion.div
            className="md:col-span-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={rightColumnVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* LIVE WORKSHOP Badge */}
            <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white z-10">
              LIVE WORKSHOP
            </span>
            {/* Main Image Placeholder */}
            <div className="bg-gray-300 rounded-lg shadow-lg aspect-video flex items-center justify-center text-gray-600 text-lg">
              Main Workshop Photo
            </div>
            {/* Thumbnail Images Placeholder */}
            <div className="flex justify-between gap-4 mt-4">
              <div className="bg-gray-300 rounded-lg shadow aspect-square w-1/2 flex items-center justify-center text-gray-600 text-sm">
                Thumbnail 1
              </div>
              <div className="bg-gray-300 rounded-lg shadow aspect-square w-1/2 flex items-center justify-center text-gray-600 text-sm">
                Thumbnail 2
              </div>
            </div>

            {/* Social Proof Card */}
            <div className="bg-white rounded-lg shadow-md p-4 mt-6 flex items-center justify-center">
              {/* Avatar Group Placeholder */}
              <div className="flex -space-x-2 overflow-hidden mr-3">
                <div className="inline-block h-8 w-8 rounded-full bg-blue-200 ring-2 ring-white flex items-center justify-center text-sm">A</div>
                <div className="inline-block h-8 w-8 rounded-full bg-green-200 ring-2 ring-white flex items-center justify-center text-sm">B</div>
                <div className="inline-block h-8 w-8 rounded-full bg-red-200 ring-2 ring-white flex items-center justify-center text-sm">C</div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Join 400+ Makers</p>
                <p className="text-sm text-yellow-500">★★★★★ <span className="text-gray-600">5.0 / 5 stars</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}