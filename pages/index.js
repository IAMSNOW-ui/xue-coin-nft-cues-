import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
const [walletAddress, setWalletAddress] = useState('');
const [isConnected, setIsConnected] = useState(false);
const [currentStep, setCurrentStep] = useState(0);
const [cueData, setCueData] = useState({
baseFigure: '', coreMaterial: '', shellMaterial: '', tipType: '',
counterweight: '', hardware: '', pattern: '', crest: '',
colorPrimary: '#FFD700', colorSecondary: '#8B4513', colorAccent: '#FF4500'
});
const [stats, setStats] = useState({ power: 50, control: 50, spin: 50, durability

