import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

const CountdownTimer = ({ variant = 'default' }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight - now;
      
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isUrgent = timeLeft.hours === 0 && timeLeft.minutes < 30;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${
          isUrgent 
            ? 'bg-red-50 border-red-300 text-red-700' 
            : 'bg-purple-50 border-purple-300 text-purple-700'
        }`}
      >
        <Clock className={`w-4 h-4 ${isUrgent ? 'animate-pulse' : ''}`} />
        <span className="text-sm font-semibold">
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-xl border-2 ${
        isUrgent 
          ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-400' 
          : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300'
      } p-4 md:p-6 shadow-lg`}
    >
      {/* Efeito de brilho animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.div
            animate={isUrgent ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className={`w-5 h-5 md:w-6 md:h-6 ${
              isUrgent ? 'text-red-500' : 'text-purple-500'
            }`} />
          </motion.div>
          <h3 className={`text-sm md:text-base font-bold uppercase tracking-wide ${
            isUrgent ? 'text-red-700' : 'text-purple-700'
          }`}>
            {isUrgent ? '⚠️ Últimas Horas!' : 'Oferta Expira em:'}
          </h3>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-4">
          {/* Horas */}
          <div className="text-center">
            <motion.div
              key={timeLeft.hours}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`${
                isUrgent ? 'bg-red-100 border-red-300' : 'bg-white border-purple-200'
              } border-2 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[80px]`}
            >
              <div className={`text-2xl md:text-4xl font-bold ${
                isUrgent ? 'text-red-600' : 'text-purple-600'
              }`}>
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
            </motion.div>
            <p className="text-xs md:text-sm text-foreground/60 mt-1 font-medium">Horas</p>
          </div>

          <span className={`text-2xl md:text-4xl font-bold ${
            isUrgent ? 'text-red-500' : 'text-purple-500'
          }`}>:</span>

          {/* Minutos */}
          <div className="text-center">
            <motion.div
              key={timeLeft.minutes}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`${
                isUrgent ? 'bg-red-100 border-red-300' : 'bg-white border-purple-200'
              } border-2 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[80px]`}
            >
              <div className={`text-2xl md:text-4xl font-bold ${
                isUrgent ? 'text-red-600' : 'text-purple-600'
              }`}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
            </motion.div>
            <p className="text-xs md:text-sm text-foreground/60 mt-1 font-medium">Minutos</p>
          </div>

          <span className={`text-2xl md:text-4xl font-bold ${
            isUrgent ? 'text-red-500' : 'text-purple-500'
          }`}>:</span>

          {/* Segundos */}
          <div className="text-center">
            <motion.div
              key={timeLeft.seconds}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`${
                isUrgent ? 'bg-red-100 border-red-300' : 'bg-white border-purple-200'
              } border-2 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[80px]`}
            >
              <div className={`text-2xl md:text-4xl font-bold ${
                isUrgent ? 'text-red-600 animate-pulse' : 'text-purple-600'
              }`}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </motion.div>
            <p className="text-xs md:text-sm text-foreground/60 mt-1 font-medium">Segundos</p>
          </div>
        </div>

        <motion.p
          animate={isUrgent ? { opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`text-center mt-4 text-xs md:text-sm font-semibold ${
            isUrgent ? 'text-red-600' : 'text-purple-600'
          }`}
        >
          {isUrgent 
            ? '🔥 Garanta agora antes que acabe!' 
            : '⚡ Vagas limitadas para hoje'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
