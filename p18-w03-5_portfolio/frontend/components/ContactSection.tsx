"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitted(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('모든 필수 항목을 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // Placeholder for actual submission logic
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Clear form

    // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitted(true);
    //   setFormData({ name: '', email: '', message: '' });
    // }, 1000);
  };

  return (
    <motion.section
      className="py-16 md:py-24 bg-background-accent text-foreground overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Contact Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 p-8 bg-white rounded-lg shadow-lg">
            <motion.p variants={itemVariants} className="text-sm text-primary font-bold mb-2">반가워요!</motion.p>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              재미있는 프로젝트, <br /> 함께 시작해볼까요?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
              보통 하루 안에 꼼꼼히 읽고 답장 드려요. 부담 갖지 말고 편하게 말을 걸어 주세요!
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-md font-medium text-foreground mb-1">
                  어떻게 불러드릴까요?
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="소중한 이름을 알려주세요"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-md font-medium text-foreground mb-1">
                  답장 받을 이메일 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-md font-medium text-foreground mb-1">
                  어떤 이야기를 나누고 싶으세요?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="자세한 이야기를 들려주세요. 아이디어, 일정, 예산 등 무엇이든 좋아요!"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
                  required
                ></textarea>
              </motion.div>

              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {submitError}
                </motion.p>
              )}
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm"
                >
                  문의가 성공적으로 접수되었습니다.
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                마음을 담아 보내기
              </motion.button>
              <motion.p variants={itemVariants} className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <span role="img" aria-label="lock">🔒</span> 개인정보는 안전하게 보호되니 안심하세요.
              </motion.p>
            </form>
          </motion.div>

          {/* Right Column: Contact Info & SNS */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 p-8 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <motion.div variants={itemVariants} className="relative w-full h-48 rounded-lg overflow-hidden mb-8">
                <Image
                  src="https://via.placeholder.com/600x200?text=Map+Placeholder" // Map placeholder
                  alt="서울 작업실 위치 지도"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center bg-white px-3 py-1 rounded-full shadow-md text-foreground text-sm font-medium">
                  📍 서울 작업실에서 활동 중
                </div>
              </motion.div>

              <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-bold text-foreground mb-4">
                연락처 정보
              </motion.h3>
              <motion.div variants={itemVariants} className="mb-4">
                <p className="flex items-center gap-2 text-lg text-foreground font-bold">
                  ✉️ <a href="mailto:hello@entrepreneur.com" className="hover:text-primary transition-colors">hello@entrepreneur.com</a>
                </p>
                <p className="flex items-center gap-2 text-lg text-foreground font-bold">
                  📞 <a href="tel:010-1234-5678" className="hover:text-primary transition-colors">010-1234-5678</a>
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                SNS에서도 만나요!
              </h3>
              <div className="flex space-x-4">
                <motion.a href="#" whileHover={{ scale: 1.1 }} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-foreground text-2xl hover:bg-primary hover:text-white">
                  📸
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.1 }} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-foreground text-2xl hover:bg-primary hover:text-white">
                  🔗
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.1 }} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-foreground text-2xl hover:bg-primary hover:text-white">
                  📝
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
