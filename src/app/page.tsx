"use client";
import React, { useRef, useState } from "react";

interface Character {
  char: string;
  x: number;
  y: number;
  size: string;
}

export default function Home() {
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [mouseSpeed, setMouseSpeed] = useState<number>(0);
  const [mouseLocationX, setMouseLocationX] = useState<number>(0);
  const [mouseLocationY, setMouseLocationY] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * characters.length);
    if (mouseRef.current) {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      setMouseLocationX(mouseRef.current.x);
      setMouseLocationY(mouseRef.current.y);

      const currX = e.clientX;
      const currY = e.clientY;
      const distance = Math.sqrt((currX - prevX) ** 2 + (currY - prevY) ** 2);
      const speed = distance.toFixed(2);
      setMouseSpeed(parseFloat(speed));
    }
    mouseRef.current = { x: e.clientX, y: e.clientY };
    setCharacters((prevCharacters) => [
      ...prevCharacters,
      {
        char: characters.charAt(randomIndex),
        x: mouseLocationX,
        y: mouseLocationY,
        size: mouseSpeed + "px",
      },
    ]);
  };

  const calculateRotation = (y: any, x: any) => {
    return (y + x) % 360;
  };

  return (
    <div
      className="bg-[#fffefb] fixed top-0 left-0 w-full h-full min-h-screen flex justify-center items-center"
      onMouseMove={handleMouseMove}
    >
      {characters.map((item, index) => (
        <div
          key={index}
          className={`absolute myclass select-none font-chillax rotate-[deg]`}
          style={{
            top: `${item.y - parseInt(item.size) / 2}px`,
            left: `${item.x}px`,
            fontSize: parseInt(item.size) > 10 ? parseInt(item.size) : 10,
            transform: `rotate(${calculateRotation(item.y, item.x)}deg)`,
          }}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
}
