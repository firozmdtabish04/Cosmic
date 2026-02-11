function CardParticles() {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 2; // 2px → 6px
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;

        return (
          <span
            key={i}
            className="absolute rounded-full  blur-[1px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-10px`,
              animation: `floatUp ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default CardParticles;
