"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Close mobile menu if it's open
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="relative z-50">
      <div className="bg-white rounded-full py-3 md:py-4 px-4 md:px-8 shadow-lg mb-8 md:mb-20 mx-auto 
                      w-[95%] sm:w-[85%] md:w-[600px] max-w-4xl text-center">
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center">
          <NavButton onClick={handleOpenModal} />
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-500 transition-colors p-2"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute left-0 right-0 top-full mt-2 overflow-hidden"
            >
              <motion.ul 
                className="bg-white rounded-2xl py-4 px-2 shadow-lg flex flex-col items-center"
                variants={menuVariants}
              >
                <MobileNavButton 
                  onClick={handleOpenModal} 
                  variants={itemVariants}
                />
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal will be added here later */}
        {isModalOpen && (
          // You can add your modal component here
          // For now, we'll just close the modal state when it would be closed
          setIsModalOpen(false)
        )}
      </div>
    </nav>
  );
}

// Desktop Nav Button
const NavButton = ({ onClick }) => (
  <motion.li 
    className="group relative"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-700 group-hover:text-blue-500 transition-all duration-300 
                 transform hover:text-gray-900 text-sm md:text-base"
    >
      <HelpCircle size={20} />
      <span>FAQ</span>
    </button>
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-1 bg-blue-400"
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    />
  </motion.li>
);

// Mobile Nav Button
const MobileNavButton = ({ onClick, variants }) => (
  <motion.li 
    className="w-full"
    variants={variants}
    whileTap={{ scale: 0.95 }}
  >
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full py-3 text-gray-700 hover:text-blue-500 
                 transition-colors text-sm border-b border-gray-100 last:border-0"
    >
      <HelpCircle size={20} />
      <span>FAQ</span>
    </button>
  </motion.li>
);