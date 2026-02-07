import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Valentine.css';
import celebration from './assets/celebration.gif';

const Valentine = () => {
  const [answered, setAnswered] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Preload the celebration gif
  useEffect(() => {
    const img = new Image();
    img.src = celebration;
  }, []);

  // Track mouse movement for heart following effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleYes = () => {
    setYesClicked(true);
    setAnswered(true);
  };

  const handleNoHover = () => {
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoPosition({ x: newX, y: newY });
  };

  // Simplified for better performance
  const backgroundVariants = {
    animate: { transition: { duration: 1 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const heartVariants = {
    floating: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Character bounce animation
  const charBounceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        type: 'spring',
        stiffness: 120,
        damping: 8,
      },
    }),
  };

  const confettiVariants = {
    hidden: { opacity: 0, scale: 0, y: 0, x: 0 },
    visible: (i) => ({
      opacity: [1, 1, 0],
      scale: [0, 1, 0],
      y: [0, -300 - Math.random() * 100, -400],
      x: Math.sin((i / 20) * Math.PI * 2) * 150 + (Math.random() * 50 - 25),
      rotate: Math.random() * 720,
      transition: {
        duration: 2.5,
        ease: 'easeOut',
        delay: i * 0.02,
      },
    }),
  };

  // Optimized mouse-following heart
  const followingHeartVariants = {
    animate: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: {
        type: 'spring',
        damping: 5,
        stiffness: 150,
        mass: 0.5,
      },
    },
  };

  // Success sequence animation - simplified for smooth performance
  const successSequenceVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      className="valentine-container"
      variants={backgroundVariants}
      animate="animate"
    >
      {/* Mouse-following heart trail */}
      {!answered && (
        <motion.div
          className="following-heart"
          variants={followingHeartVariants}
          animate="animate"
        >
          💕
        </motion.div>
      )}

      <motion.div
        className="hearts-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="heart-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={heartVariants}
            animate="floating"
          >
            {i % 2 === 0 ? '❤️' : '🤍'}
          </motion.div>
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`rose-${i}`}
            className="rose-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={heartVariants}
            animate="floating"
          >
            🌹
          </motion.div>
        ))}
      </motion.div>

      {!answered ? (
        <motion.div
          className="question-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="emoji-container">
            <motion.span
              className="emoji"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              💌
            </motion.span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="question">
            {'Will you be my Valentine?'.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charBounceVariants}
                initial="hidden"
                animate="visible"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={itemVariants} className="subtitle">
            I promise it'll be sweet, just like you 🍫💕
          </motion.p>

          <motion.div variants={itemVariants} className="buttons-container">
            <motion.button
              className="btn btn-yes"
              onClick={handleYes}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Yes! 💕
            </motion.button>

            <motion.button
              ref={noButtonRef}
              className="btn btn-no"
              animate={{
                x: noPosition.x,
                y: noPosition.y,
              }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              onMouseEnter={handleNoHover}
              onMouseLeave={() => setNoPosition({ x: 0, y: 0 })}
              onClick={handleNoHover}
            >
              No 😢
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="celebration-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {yesClicked && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.span
                  key={i}
                  className="confetti"
                  custom={i}
                  variants={confettiVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {['❤️', '💕', '💖', '✨', '🎉', '💐', '🌹', '🎊', '💝', '🌟'][i % 10]}
                </motion.span>
              ))}
            </>
          )}

        <motion.div
          className="success-message"
          custom={0}
          variants={successSequenceVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={celebration}
            alt="celebration"
            className="celebration-gif"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            loading="eager"
          />

          <motion.h1
            custom={0.5}
            variants={successSequenceVariants}
            initial="hidden"
            animate="visible"
          >
            You made me the happiest bubu! 💕
          </motion.h1>

          <motion.p
            custom={0.8}
            variants={successSequenceVariants}
            initial="hidden"
            animate="visible"
          >
            I knew you'd say yes! (Aao puchi lelo)🌹
          </motion.p>

          <motion.button
            className="btn btn-reset"
            onClick={() => {
              setAnswered(false);
              setYesClicked(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            custom={1.1}
            variants={successSequenceVariants}
            initial="hidden"
            animate="visible"
          >
            Ask Again
          </motion.button>
        </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Valentine;
