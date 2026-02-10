'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGoogle,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si';
import {
  FaBrain,
  FaEye,
  FaLanguage,
  FaMobileAlt,
  FaShieldAlt,
  FaNetworkWired,
  FaCogs,
  FaServer,
  FaCode,
  FaCloud,
} from 'react-icons/fa';
import { ReactNode } from 'react';

interface Technology {
  name: string;
  icon: ReactNode;
}

const technologies: Technology[] = [
  { name: 'TensorFlow', icon: <SiTensorflow /> },
  { name: 'PyTorch', icon: <SiPytorch /> },
  { name: 'Machine Learning', icon: <FaBrain /> },
  { name: 'Deep Learning', icon: <FaBrain /> },
  { name: 'Computer Vision', icon: <FaEye /> },
  { name: 'Natural Language Processing', icon: <FaLanguage /> },
  { name: 'React', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'React Native', icon: <SiReact /> },
  { name: 'Flutter', icon: <SiFlutter /> },
  { name: 'Swift', icon: <SiSwift /> },
  { name: 'Kotlin', icon: <SiKotlin /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'Docker', icon: <SiDocker /> },
  { name: 'Kubernetes', icon: <SiKubernetes /> },
  { name: 'AWS', icon: <SiAmazon /> },
  { name: 'Azure', icon: <FaCloud /> },
  { name: 'Google Cloud', icon: <SiGoogle /> },
  { name: 'Blockchain', icon: <FaNetworkWired /> },
  { name: 'IoT', icon: <FaNetworkWired /> },
  { name: '5G Networks', icon: <FaNetworkWired /> },
  { name: 'Cybersecurity', icon: <FaShieldAlt /> },
  { name: 'DevOps', icon: <FaCogs /> },
  { name: 'Microservices', icon: <FaServer /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'REST API', icon: <FaCode /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
];

export default function TechMarquee() {
  const { theme } = useTheme();

  // Dupliquer pour un défilement continu
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-12 mb-16 sm:mb-20">
      {/* Gradient Overlays for fade effect - dégradés doux pour ne pas masquer le contenu */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 lg:w-32 z-10 pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-black/60 via-black/20 to-transparent'
            : 'bg-gradient-to-r from-white/60 via-white/20 to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-6 sm:w-12 md:w-20 lg:w-32 z-10 pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-l from-black/60 via-black/20 to-transparent'
            : 'bg-gradient-to-l from-white/60 via-white/20 to-transparent'
        }`}
      />

      {/* Marquee Container */}
      <div className="relative flex">
        <motion.div
          className="flex gap-6 sm:gap-8 md:gap-12 whitespace-nowrap"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 50,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`tech-${index}`}
              className="flex items-center"
            >
              <div className="flex items-center gap-2 sm:gap-3 group cursor-default">
                <span
                  className={`text-lg sm:text-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'text-gray-600 group-hover:text-gray-400'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {tech.icon}
                </span>
                <span
                  className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'text-gray-500 group-hover:text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {tech.name}
                </span>
              </div>
              {/* Separator */}
              <span
                className={`mx-6 sm:mx-12 text-lg sm:text-xl ${
                  theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
