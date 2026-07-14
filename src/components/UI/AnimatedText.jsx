import { motion } from "framer-motion";

export default function AnimatedText({ children, className = "" }) {
  const words = String(children).split(" ");
  return <motion.span className={`animated-text ${className}`} initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}>
    {words.map((word, index) => <motion.span className="animated-text__word" key={`${word}-${index}`} variants={{ hidden: { opacity: 0, y: 22, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: .55, ease: [0.2, .8, .2, 1] } } }}>{word}{index < words.length - 1 ? " " : ""}</motion.span>)}
  </motion.span>;
}
