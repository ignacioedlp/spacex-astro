import { useState, useEffect } from "react";

// Función para calcular el tiempo restante
function calculateCountdown(launchDate) {
  const now = new Date();
  const launchTime = new Date(launchDate);
  const timeLeft = launchTime - now;

  // Convierte el tiempo a un formato legible
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

// Componente de React para la cuenta regresiva
export const Countdown = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateCountdown(launchDate));

  const formattedLaunchDate = new Date(launchDate).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateCountdown(launchDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    new Date(launchDate) > new Date() ?
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md space-y-4 mt-8">
        <h2 className="text-xl font-bold mb-4">Próximo Lanzamiento de SpaceX</h2>
        <p className="text-sm mb-2">{formattedLaunchDate}</p>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-2xl font-semibold">{timeLeft.days}</span>
            <span className="block text-xs font-medium">Días</span>
          </div>
          <div>
            <span className="text-2xl font-semibold">{timeLeft.hours}</span>
            <span className="block text-xs font-medium">Horas</span>
          </div>
          <div>
            <span className="text-2xl font-semibold">{timeLeft.minutes}</span>
            <span className="block text-xs font-medium">Minutos</span>
          </div>
          <div>
            <span className="text-2xl font-semibold">{timeLeft.seconds}</span>
            <span className="block text-xs font-medium">Segundos</span>
          </div>
        </div>
      </div>
      : <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mt-8 space-y-4">
        <h2 className="text-xl font-bold mb-4">¡Ya despegamos!</h2>
        <p className="text-sm mb-2">{formattedLaunchDate}</p>
        <p className="text-sm">¡El cohete ya ha despegado, estate atento al proximo despegue! 🚀</p>
      </div>
  );
};