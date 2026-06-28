/**
 * ==========================================================================
 * Blog Details - Interactive Features & Animations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initLazyLoading();
  initFloatingBackground();
  initInteractions();
  initAmbientAudio();
});

/**
 * 1. Native Lazy Loading image fade-in transition
 * Ensures images transition in smoothly once the browser loads them.
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.blog-image');

  lazyImages.forEach(img => {
    // If image is already fully loaded in cache
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      // Add event listener for when it loads
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
}

/**
 * 2. Subtle Floating Background Generator
 * Spawns low-opacity stylized Egyptian symbols that slowly drift upwards.
 * Utilizes high-performance inline SVGs to ensure currentColor styling works perfectly.
 */
function initFloatingBackground() {
  const container = document.getElementById('bg-symbols-container');
  if (!container) return;

  // Paths defined directly in JS to enable SVG fill="currentColor" inside the DOM
  const SYMBOLS = [
    {
      name: 'ankh',
      viewBox: '0 0 100 100',
      svgContent: `
        <path d="M50,10 C40,10 32,18 32,28 C32,38 40,46 50,46 C60,46 68,38 68,28 C68,18 60,10 50,10 Z M50,15 C57,15 63,21 63,28 C63,35 57,41 50,41 C43,41 37,35 37,28 C37,21 43,15 50,15 Z" />
        <path d="M47,46 L53,46 L53,52 L68,52 L68,58 L53,58 L53,90 L47,90 L47,58 L32,58 L32,52 L47,52 Z" />
      `
    },
    {
      name: 'eye-of-horus',
      viewBox: '0 0 100 100',
      svgContent: `
        <path d="M20,25 C35,15 65,15 80,25 C65,18 35,18 20,25 Z" />
        <path d="M15,45 C25,32 50,30 85,45 C75,55 50,58 15,45 Z M18,45 C50,55 72,52 81,45 C50,34 25,34 18,45 Z" />
        <circle cx="48" cy="44" r="11" />
        <path d="M45,55 C45,65 38,72 38,72 C38,72 49,68 49,55 Z" />
        <path d="M60,49 C60,65 48,78 65,78 C75,78 75,68 68,68 C64,68 64,72 66,72 C68,72 68,74 65,74 C55,74 65,62 65,51 Z" />
      `
    },
    {
      name: 'lotus',
      viewBox: '0 0 100 100',
      svgContent: `
        <path d="M50,15 C45,35 40,55 50,85 C60,55 55,35 50,15 Z" />
        <path d="M47,83 C35,65 15,50 18,38 C22,33 30,40 45,60 C48,64 48,75 47,83 Z" />
        <path d="M53,83 C65,65 85,50 82,38 C78,33 70,40 55,60 C52,64 52,75 53,83 Z" />
        <path d="M45,84 C25,75 5,65 5,52 C5,45 15,48 35,68 C41,74 43,80 45,84 Z" />
        <path d="M55,84 C75,75 95,65 95,52 C95,45 85,48 65,68 C59,74 57,80 55,84 Z" />
        <rect x="47" y="85" width="6" height="10" rx="3" />
      `
    },
    {
      name: 'pyramid',
      viewBox: '0 0 100 100',
      svgContent: `
        <polygon points="50,15 15,80 50,85" opacity="0.8" />
        <polygon points="50,15 50,85 85,80" opacity="0.4" />
        <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      `
    }
  ];

  // Configure number of active symbols based on screen size
  const maxSymbols = window.innerWidth < 768 ? 6 : 12;

  for (let i = 0; i < maxSymbols; i++) {
    createSingleFloatingSymbol(container, SYMBOLS, i);
  }
}

/**
 * Creates and appends a single floating symbol with randomized, staggered properties.
 */
function createSingleFloatingSymbol(container, symbolTemplates, index) {
  // Select symbol template
  const symbol = symbolTemplates[index % symbolTemplates.length];
  
  // Create element wrapper
  const el = document.createElement('div');
  el.className = 'floating-symbol';
  
  // Random sizing (between 30px and 70px)
  const size = Math.floor(Math.random() * 40) + 30;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  
  // Random horizontal position (0% to 90% of screen width)
  const leftPos = Math.random() * 90;
  el.style.left = `${leftPos}%`;
  
  // Staggered animation duration (between 7s and 14s for faster, clearer movement)
  const duration = Math.random() * 7 + 7;
  el.style.animationDuration = `${duration}s`;
  
  // Staggered animation delay to spread them out initially
  const delay = Math.random() * 12;
  el.style.animationDelay = `${delay}s`;

  // Inject SVG content
  el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${symbol.viewBox}" fill="currentColor" style="width: 100%; height: 100%;">
      ${symbol.svgContent}
    </svg>
  `;

  container.appendChild(el);
}

/**
 * 3. Interactions & Interactive Enhancements
 * Adds smooth interaction states for buttons and prevents empty links from resetting scroll.
 */
function initInteractions() {
  // Prevent default behavior for empty anchor links (#)
  const links = document.querySelectorAll('a[href="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Subtle click feedback if desired
      if (link.id === 'btn-visit') {
        const originalText = link.textContent;
        link.textContent = 'Opening Website...';
        link.style.opacity = '0.8';
        setTimeout(() => {
          link.textContent = originalText;
          link.style.opacity = '1';
        }, 1200);
      }
    });
  });
}

/**
 * 4. Epic Orchestral Music Player (Local HTML5 Audio with procedural Egyptian Orchestra fallback)
 * Attempts to play the local orchestral audio track via the HTML5 <audio> tag.
 * If the file is missing or fails to play, triggers an incredibly rich procedural orchestra
 * simulating traditional Egyptian instruments: an ambient breathing Nay Flute, a plucked Oud,
 * a massive deep orchestral string section, and booming cinematic timpani percussion.
 */
function initAmbientAudio() {
  const toggleBtn = document.getElementById('player-toggle-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const visualizerBars = document.getElementById('audio-visualizer-bars');
  const localPlayer = document.getElementById('local-audio-player');
  const iconPlay = toggleBtn?.querySelector('.icon-play');
  const iconPause = toggleBtn?.querySelector('.icon-pause');

  if (!toggleBtn || !volumeSlider || !visualizerBars || !localPlayer) return;

  let isPlaying = false;
  let useFallbackSynth = false;

  // Web Audio Context & Nodes for Procedural Fallback Engine
  let audioCtx = null;
  let masterGain = null;
  let sequencerIntervalId = null;
  let stepCounter = 0;

  // Active procedural nodes to stop on pause
  let stringOscillators = [];
  let stringGains = [];
  let activeNayOsc = null;

  // Egyptian Phrygian Dominant / Hijaz Scale Frequencies (Key of G)
  const SCALE = [196.00, 207.65, 246.94, 261.63, 293.66, 311.13, 349.23, 392.00, 415.30, 493.88];

  // Helper to generate a soft warm distortion curve for organic wood/string warmth
  function makeSoftOverdriveCurve() {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = Math.tanh(x * 1.5);
    }
    return curve;
  }

  // Create White Noise buffer for fluty breath sound and percussion elements
  let noiseBuffer = null;
  function getNoiseBuffer(ctx) {
    if (noiseBuffer) return noiseBuffer;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseBuffer = buffer;
    return noiseBuffer;
  }

  function startFallbackSynthesizer() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Master Volume node
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(volumeSlider.value * 0.18, audioCtx.currentTime);

    // Orchestral Hall Reverb / Cavernous Delay
    const hallDelay = audioCtx.createDelay();
    hallDelay.delayTime.setValueAtTime(0.55, audioCtx.currentTime);
    const hallFeedback = audioCtx.createGain();
    hallFeedback.gain.setValueAtTime(0.35, audioCtx.currentTime);

    hallDelay.connect(hallFeedback);
    hallFeedback.connect(hallDelay);

    // Soft Saturation for warm acoustic textures
    const warmSaturation = audioCtx.createWaveShaper();
    warmSaturation.curve = makeSoftOverdriveCurve();

    masterGain.connect(warmSaturation);
    warmSaturation.connect(audioCtx.destination);

    // Route delay to output for lush stereo-like feel
    hallDelay.connect(warmSaturation);

    // 1. Start Rich Orchestral String Pad (G1 + G2 + D3 + B3)
    const stringFreqs = [49.00, 98.00, 146.83, 246.94];
    stringOscillators = [];
    stringGains = [];

    stringFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = idx === 0 ? 'sine' : 'sawtooth';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(freq - (idx * 0.15), audioCtx.currentTime);
      osc2.frequency.setValueAtTime(freq + (idx * 0.15) + 0.3, audioCtx.currentTime);

      const voiceFilter = audioCtx.createBiquadFilter();
      voiceFilter.type = 'lowpass';
      voiceFilter.frequency.setValueAtTime(idx === 0 ? 150 : 380, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(idx === 0 ? 0.08 : 0.035, audioCtx.currentTime + 2.5);

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.05 + (idx * 0.02), audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(gainNode.gain);
      lfo.start();

      osc.connect(voiceFilter);
      osc2.connect(voiceFilter);
      voiceFilter.connect(gainNode);
      gainNode.connect(masterGain);
      gainNode.connect(hallDelay);

      osc.start();
      osc2.start();

      stringOscillators.push(osc, osc2, lfo);
      stringGains.push(gainNode);
    });

    // --- SEQUENCER LOOP: 100 BPM Cinematic Anthem (8th Notes) ---
    const stepTime = 0.3;
    stepCounter = 0;

    const oudSequence = [0, 2, 3, 4, 3, 2, 0, 1, 2, 4, 5, 7, 6, 5, 3, 2];
    const naySequence = [7, -1, 8, -1, 7, 5, 4, -1, 3, -1, 4, 5, 3, 2, 0, -1];

    function playSequencerStep() {
      const playTime = audioCtx.currentTime + 0.02;

      // A. MASSIVE CINEMATIC TIMPANI (Beats 1 & 3)
      if (stepCounter === 0 || stepCounter === 8) {
        const timpOsc = audioCtx.createOscillator();
        const timpGain = audioCtx.createGain();
        const timpFilter = audioCtx.createBiquadFilter();

        timpOsc.type = 'sine';
        timpOsc.frequency.setValueAtTime(95, playTime);
        timpOsc.frequency.exponentialRampToValueAtTime(32, playTime + 0.28);

        timpFilter.type = 'lowpass';
        timpFilter.frequency.setValueAtTime(250, playTime);

        timpGain.gain.setValueAtTime(0.85, playTime);
        timpGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.55);

        timpOsc.connect(timpFilter);
        timpFilter.connect(timpGain);
        timpGain.connect(masterGain);

        timpOsc.start(playTime);
        timpOsc.stop(playTime + 0.6);
      }

      // B. TRADITIONAL WOOD SHAKER (Beats 2 & 4, and offbeats)
      if (stepCounter % 4 === 2 || stepCounter % 4 === 0) {
        const shakerSource = audioCtx.createBufferSource();
        shakerSource.buffer = getNoiseBuffer(audioCtx);

        const shakerFilter = audioCtx.createBiquadFilter();
        shakerFilter.type = 'bandpass';
        shakerFilter.frequency.setValueAtTime(3500, playTime);
        shakerFilter.Q.setValueAtTime(3.0, playTime);

        const shakerGain = audioCtx.createGain();
        const vol = (stepCounter % 4 === 2) ? 0.04 : 0.015;
        shakerGain.gain.setValueAtTime(vol, playTime);
        shakerGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.1);

        shakerSource.connect(shakerFilter);
        shakerFilter.connect(shakerGain);
        shakerGain.connect(masterGain);

        shakerSource.start(playTime);
        shakerSource.stop(playTime + 0.12);
      }

      // C. PLUCKED OUD / HARP (Arpeggiated pluck on even steps)
      if (stepCounter % 2 === 0) {
        const scaleIdx = oudSequence[stepCounter % oudSequence.length];
        const freq = SCALE[scaleIdx % SCALE.length];

        const oudOsc = audioCtx.createOscillator();
        const oudGain = audioCtx.createGain();
        const oudFilter = audioCtx.createBiquadFilter();

        oudOsc.type = 'triangle';
        oudOsc.frequency.setValueAtTime(freq, playTime);

        oudFilter.type = 'lowpass';
        oudFilter.frequency.setValueAtTime(1400, playTime);

        oudGain.gain.setValueAtTime(0, playTime);
        oudGain.gain.linearRampToValueAtTime(0.18, playTime + 0.02);
        oudGain.gain.exponentialRampToValueAtTime(0.001, playTime + 1.2);

        if (Math.random() > 0.7) {
          oudOsc.frequency.linearRampToValueAtTime(freq * 1.015, playTime + 0.12);
          oudOsc.frequency.linearRampToValueAtTime(freq, playTime + 0.3);
        }

        oudOsc.connect(oudFilter);
        oudFilter.connect(oudGain);
        oudGain.connect(masterGain);
        oudGain.connect(hallDelay);

        oudOsc.start(playTime);
        oudOsc.stop(playTime + 1.3);
      }

      // D. CINEMATIC NAY FLUTE
      const nayNoteIdx = naySequence[stepCounter % naySequence.length];
      if (nayNoteIdx !== -1) {
        const freq = SCALE[nayNoteIdx % SCALE.length] * 2;

        const fluteOsc = audioCtx.createOscillator();
        const fluteNoise = audioCtx.createBufferSource();
        const voiceGain = audioCtx.createGain();
        const fluteFilter = audioCtx.createBiquadFilter();

        fluteOsc.type = 'sine';
        fluteOsc.frequency.setValueAtTime(freq, playTime);

        if (activeNayOsc) {
          try {
            const prevGain = activeNayOsc.volumeNode;
            if (prevGain) {
              prevGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.1);
            }
          } catch (e) {}
        }

        fluteNoise.buffer = getNoiseBuffer(audioCtx);
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(freq * 1.2, playTime);
        noiseFilter.Q.setValueAtTime(10.0, playTime);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.005, playTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.85);

        const vibrato = audioCtx.createOscillator();
        const vibratoGain = audioCtx.createGain();
        vibrato.frequency.setValueAtTime(6.5, playTime);
        vibratoGain.gain.setValueAtTime(freq * 0.008, playTime);
        
        vibrato.connect(vibratoGain);
        vibratoGain.connect(fluteOsc.frequency);
        vibrato.start(playTime);

        fluteFilter.type = 'lowpass';
        fluteFilter.frequency.setValueAtTime(freq * 2.2, playTime);

        voiceGain.gain.setValueAtTime(0, playTime);
        voiceGain.gain.linearRampToValueAtTime(0.09, playTime + 0.15);
        voiceGain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.95);

        fluteOsc.connect(fluteFilter);
        fluteFilter.connect(voiceGain);

        fluteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(voiceGain);

        voiceGain.connect(masterGain);
        voiceGain.connect(hallDelay);

        fluteOsc.start(playTime);
        fluteNoise.start(playTime);

        fluteOsc.stop(playTime + 1.1);
        fluteNoise.stop(playTime + 1.1);
        vibrato.stop(playTime + 1.1);

        fluteOsc.volumeNode = voiceGain;
        activeNayOsc = fluteOsc;
      }

      stepCounter = (stepCounter + 1) % 16;
    }

    sequencerIntervalId = setInterval(playSequencerStep, stepTime * 1000);
  }

  function stopFallbackSynthesizer() {
    if (sequencerIntervalId) {
      clearInterval(sequencerIntervalId);
      sequencerIntervalId = null;
    }
    if (stringOscillators && stringOscillators.length) {
      stringOscillators.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      stringOscillators = [];
    }
    if (stringGains && stringGains.length) {
      stringGains.forEach(gn => {
        try { gn.disconnect(); } catch(e) {}
      });
      stringGains = [];
    }
    if (audioCtx) {
      audioCtx.suspend();
    }
  }

  // Set initial volume for the HTML5 Audio tag
  localPlayer.volume = parseFloat(volumeSlider.value);

  // Click handler to toggle playback state
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      isPlaying = false;
      
      localPlayer.pause();
      stopFallbackSynthesizer();

      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      visualizerBars.classList.remove('playing');
      toggleBtn.setAttribute('aria-label', 'Play background music');
    } else {
      isPlaying = true;

      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      visualizerBars.classList.add('playing');
      toggleBtn.setAttribute('aria-label', 'Pause background music');

      if (!useFallbackSynth) {
        localPlayer.play()
          .then(() => {
            console.log("Playing local Egyptian Epic Orchestra audio file successfully.");
          })
          .catch((error) => {
            console.warn("Local audio file not found/loaded. Engaging procedural Epic Orchestra synth fallback!", error);
            useFallbackSynth = true;
            startFallbackSynthesizer();
          });
      } else {
        startFallbackSynthesizer();
      }
    }
  });

  // Volume slider input handler
  volumeSlider.addEventListener('input', () => {
    const volumeValue = parseFloat(volumeSlider.value);
    
    localPlayer.volume = volumeValue;

    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(volumeValue * 0.18, audioCtx.currentTime);
    }
  });
}

