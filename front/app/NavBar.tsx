"use client";
import Link from "next/link";
import React from "react";
import HeadBottom from "./HeadBottom";

function NavBar() {
  return (
    <div className="bg-[#181E34]">
      <div className="max-w-screen-xl mx-auto p-6">
        <nav className="flex justify-between items-center">
          <ul className="flex items-center text-lg space-x-10">
            <li>
              <Link href="/">
                <img
                  className="h-8 w-8"
                  src="https://static.vecteezy.com/system/resources/previews/009/524/624/original/dice-black-silhouette-icon-play-cube-roll-random-lucky-game-glyph-pictogram-backgammon-fun-flat-symbol-gambling-risk-chance-bet-sign-two-dice-square-simple-logo-isolated-illustration-vector.jpg"
                  alt="Home"
                />
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <div className="text-white hover:text-gray-300">Dashboard</div>
              </Link>
            </li>
            <li>
              <Link href="/connections">
                <div className="text-white hover:text-gray-300">
                  Connections
                </div>
              </Link>
            </li>
            <li>
              <Link href="/devices">
                <div className="text-white hover:text-gray-300">Devices</div>
              </Link>
            </li>
            <li>
              <Link href="/general-settings">
                <div className="text-white hover:text-gray-300">
                  General Settings
                </div>
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-tl from-[#CDD2E2] to-[#9FA6C1] text-black flex items-center justify-center rounded-full">
              <span className="text-2xl font-bold">D</span>
            </div>
            <div className="text-white text-xl">Daniels</div>
          </div>
        </nav>
        <HeadBottom />
      </div>
    </div>
  );
}

export default NavBar;
