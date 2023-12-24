"use client"
import Image from 'next/image'
import { useState,useEffect } from 'react';
import Bird from './components/Bird';
import Pipe from './components/Pipe';



export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
  const [pipes, setPipes] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);


  useEffect(() => {
    if(!isGameOver)
    {

   
    const moveBackgroundAndPipes = () => {
      setBackgroundPosition(prevPosition => prevPosition - 3); // Hintergrund nach links bewegen
      setPipes(prevPipes => prevPipes.map(pipe => ({ ...pipe, left: pipe.left - 3 })).filter(pipe => pipe.left > -60)); // Bewege und filtere Pipes
    };

    const interval = setInterval(moveBackgroundAndPipes, 50); // Bewegungsgeschwindigkeit anpassen

    return () => clearInterval(interval);
  }
  }, [isGameOver])


  // Generation von Balken 
  useEffect(() => {
    if(!isGameOver)
    {

    
    const addPipe = () => {
      const topPipeHeight = Math.random() * (300 - 100) + 100; // Zufällige Höhe zwischen 100 und 300px
      const gap = 50; // Lücke zwischen den Balken
      const bottomPipeHeight = 400 - topPipeHeight - gap;

      setPipes(prevPipes => [
        ...prevPipes, 
        { top: true, height: topPipeHeight, left: 600 }, // Startposition am rechten Rand
        { top: false, height: bottomPipeHeight, left: 600 }
      ]);
    };

    const pipeInterval = setInterval(addPipe,3000); // Neuer Balken alle 3 Sekunden

    return () => clearInterval(pipeInterval);
  }
  }, [isGameOver]);

  
useEffect(() => {
  const moveBackgroundAndPipes = () => {
    // ... Bewegungscodes

    if (checkCollision(birdPosition, pipes)) {
      console.log("Kollision!");
      setIsGameOver(true); // Spiel stoppen bei Kollision

    }
  };

  const interval = setInterval(moveBackgroundAndPipes, 50);

  return () => clearInterval(interval);
}, [birdPosition, pipes]);
function checkCollision(bird, pipes) {
  const birdWidth = 20; // Annahme: Breite des Vogels
  const birdHeight = 20; // Annahme: Höhe des Vogels
  const pipeWidth = 40; // Annahme: Breite des Rohrs

  for (let pipe of pipes) {
    // Überprüfen der Kollision mit einem oberen Balken
    if (
      pipe.top &&
      bird.x < pipe.left + pipeWidth &&
      bird.x + birdWidth > pipe.left &&
      bird.y < pipe.height
    ) {       
      return true;
    }

    // Überprüfen der Kollision mit einem unteren Balken
    if (
      !pipe.top &&
      bird.x < pipe.left + pipeWidth &&
      bird.x + birdWidth > pipe.left &&
      bird.y + birdHeight > 400 - pipe.height
    ) {       
      return true;
    }
  }

  return false;
}


  
  
  return (
    <main className="h-screen flex flex-col items-center  ">
      <h1 className='font-bold text-2xl '>Flappy Bird Game </h1>
      <div className=' flex-1 flex flex-col  items-center justify-center'>
        <div className='border border-gray-200 w-[600px] h-[400px] flex flex-col relative overflow-hidden ' onClick={() => !isGameOver ? setBirdPosition(prevPosition => ({ ...prevPosition, y: birdPosition.y - 20 })) : ""}>

        <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          backgroundImage: `url(https://www.eremiyarifat.de/bgGame.png)`,
          backgroundPosition: `${backgroundPosition}px 0`,
          backgroundSize:'cover',
          backgroundRepeat: 'repeat-x' // Wiederholung nur horizontal

        }}
      >
              {isGameOver && <div className="text-4xl font-bold">Game Over</div>}

        {pipes.map((pipe, index) => (
          
          <Pipe key={index} top={pipe.top} height={pipe.height} left={pipe.left} />
      ))}
        <Bird birdPosition={birdPosition} setBirdPosition={setBirdPosition} isGameOver={isGameOver} />
      </div>
        </div>

      </div>
    </main>
  )
}
