import { motion } from "framer-motion";

function FPSComponent( { text, radius, fontSize, letterSpacing } ) {
  const characters = text.split("");

  return (
    // SINGOLO COMPONENTE SPINNER
    <motion.div className="relative aspect-square" style={{ width: radius * 2 }}>
      <p aria-label={text} />
      <p aria-hidden="true" className="text">
        {characters.map((ch, i) => (
          <motion.span
            key={i}
            className={`absolute top-0 left-1/2 font-ZENOVAXENO text-black letter-${i}`}
            style={{
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * letterSpacing}deg)`,
              fontSize
            }}
          >
            {ch}
          </motion.span>
        ))}
      </p>
    </motion.div>
  )
}

export default FPSComponent