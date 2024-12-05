import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "../Assets/Css/HackifyAnimation.css";

const HackifyAnimation = () => {
  const texts = ["H", "a", "c", "k", "i", "f", "y", ":)"];
  const numberOfParticles = 12;

  const animations = useAnimation();

  useEffect(() => {
    animations.start({
      opacity: 1,
      transition: { duration: 2 },
    });
  }, [animations]);

  return (
    <div className="hackify-container">
      {/* Background Frames */}
      {texts.map((_, i) => (
        <motion.div
          className={`frame frame-${i}`}
          key={`bg-${i}`}
          initial={{ width: 0 }}
          animate={{
            width: "12.5%",
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: 4 + i * 0.1,
            duration: 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${i * 12.5}%`,
            backgroundColor: `hsl(${i * (360 / texts.length)}, 80%, 60%)`,
          }}
        ></motion.div>
      ))}

      {/* Main Criterion and Text */}
      <div className="criterion">
        {texts.map((text, i) => (
          <motion.div
            key={`text-${i}`}
            className={`text text-${i}`}
            initial={{ transform: "scale(0)", opacity: 0 }}
            animate={{
              transform: "scale(1)",
              opacity: 1,
            }}
            transition={{
              delay: 1 + i * 0.2,
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.div>
        ))}

        {/* Animated Particles */}
        {texts.map((_, i) =>
          Array.from({ length: numberOfParticles }).map((_, j) => (
            <motion.div
              key={`particle-${i}-${j}`}
              className={`particle particle-${i}-${j}`}
              initial={{
                left: `${-((texts.length / 2 - i) * 40) + 20}px`,
                top: 0,
                opacity: 0,
                transform: "scale(1)",
              }}
              animate={{
                left: `${
                  -((texts.length / 2 - i) * 40) +
                  20 +
                  Math.cos((j * 360) / numberOfParticles) * 100
                }px`,
                top: `${Math.sin((j * 360) / numberOfParticles) * 100}px`,
                opacity: 1,
                transform: "scale(0)",
              }}
              transition={{
                delay: 1 + i * 0.2 + j * 0.1,
                duration: 1,
                ease: "easeInOut",
              }}
              style={{
                backgroundColor: `hsl(${i * (360 / texts.length)}, 80%, 60%)`,
              }}
            ></motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HackifyAnimation;
