import * as motion from "motion/react-client";

const AnimatedButton = () => {
  return (
    <div className="relative inline-flex overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 bottom-0 left-0 rounded-lg p-0.5 opacity-5"
        style={{
          background: "linear-gradient(90deg, blue, green, purple, blue)",
        }}
        animate={{
          translateX: 100,
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      ></motion.div>
      <motion.button className="rounded-lg bg-white px-5 py-2 text-black ml-2">
        Animated Border
      </motion.button>
    </div>
  );
};

export default AnimatedButton;
