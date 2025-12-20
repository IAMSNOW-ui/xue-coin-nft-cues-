import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cueData, setCueData] = useState({
    baseFigure: '',
    coreMaterial: '',
    shellMaterial: '',
    tipType: '',
    counterweight: '',
    hardware: '',
    pattern: '',
    crest: '',
    colorPrimary: '#FFD700',
    colorSecondary: '#8B4513',
    colorAccent: '#FF4500'
  });
  const [stats, setStats] = useState({
    power: 50,
    control: 50,
    spin: 50,
    durability: 50
  });

  return (
    <>
      <Head>
        <title>cueXcoin World Trophy Show</title>
        <meta name="description" content="Custom NFT pool cues for Xue Coin Trophy Show tournaments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-4 text-amber-400">
            cueXcoin World Trophy Show
          </h1>
          <p className="text-center text-xl mb-8 text-gray-300">
            Custom NFT pool cues for Xue Coin Trophy Show tournaments
          </p>
          <div className="max-w-2xl mx-auto bg-slate-800 rounded-lg p-8">
            <p className="text-lg mb-6">
              Welcome to the pool cue NFT builder. Create your unique pool cue and mint it as an NFT.
            </p>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>5-step cue builder UI</li>
                  <li>Live canvas preview (drag to rotate)</li>
                  <li>Stats & rarity calculation</li>
                  <li>Wallet connect UI (MetaMask-ready)</li>
                  <li>Pricing tiers ($10 / $25 / $50 / $100 in XUE)</li>
                </ul>
              </div>
              <button className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold transition">
                Launch Cue Builder
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
