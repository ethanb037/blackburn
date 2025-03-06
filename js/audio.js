/**
 * ars culus™ | TRANSCENDENT RITUAL
 * Audio Experience System
 * 
 * Creates an immersive, responsive soundscape inspired by
 * Ryoji Ikeda's precise sonic textures while maintaining
 * the ritual's meditative quality.
 */

// Main audio controller
const AudioSystem = (function() {
    // Audio context and master nodes
    let audioContext;
    let masterGain;
    let reverbNode;
    
    // Sound collections
    let drones = [];
    let texturalElements = [];
    let interactiveSounds = {};
    
    // Initialization state
    let initialized = false;
    let muted = false;
    
    // Create audio context with user interaction to comply with browser policies
    function initializeAudio() {
        if (initialized) return;
        
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create master gain for global volume control
            masterGain = audioContext.createGain();
            masterGain.gain.value = 0;
            masterGain.connect(audioContext.destination);
            
            // Create reverb for spatial depth
            createReverb();
            
            // Start with ambient soundscape
            createDroneLayers();
            
            // Fade in master volume gradually
            masterGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 5);
            
            initialized = true;
            console.log("Audio system initialized");
            
            // Schedule texture events for ongoing sonic interest
            scheduleTextureEvents();
            
            // Enable interactive sounds
            createInteractiveSoundPalette();
            
        } catch (e) {
            console.error("Audio initialization failed:", e);
        }
    }
    
    // Create reverb effect for spatial qualities
    function createReverb() {
        reverbNode = audioContext.createConvolver();
        
        // Create custom impulse response for ethereal, ritualistic space
        const impulseLength = audioContext.sampleRate * 3; // 3 seconds
        const impulse = audioContext.createBuffer(2, impulseLength, audioContext.sampleRate);
        
        // Generate impulse response with decay characteristics
        for (let channel = 0; channel < 2; channel++) {
            const impulseData = impulse.getChannelData(channel);
            
            for (let i = 0; i < impulseLength; i++) {
                // Create textured decay with subtle modulation
                impulseData[i] = (Math.random() * 2 - 1) * 
                                Math.pow(1 - i / impulseLength, 1.5) * 
                                (1 + 0.1 * Math.sin(i / 1000));
            }
        }
        
        reverbNode.buffer = impulse;
        reverbNode.connect(audioContext.destination);
    }
    
    // Create layered drone sounds for continuous ambient texture
    function createDroneLayers() {
        // Fundamental frequencies based on ritual significance
        const baseFrequencies = [55, 110, 165, 220, 275, 330];
        
        baseFrequencies.forEach((freq, index) => {
            // Create oscillator with frequency
            const oscillator = audioContext.createOscillator();
            oscillator.type = index % 2 === 0 ? 'sine' : 'triangle';
            oscillator.frequency.value = freq;
            
            // Add slight detuning for organic quality
            oscillator.detune.value = Math.random() * 10 - 5;
            
            // Create gain node for this layer
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0;
            
            // Connect oscillator to gain
            oscillator.connect(gainNode);
            
            // Split output between direct and reverb paths
            const directGain = audioContext.createGain();
            const reverbGain = audioContext.createGain();
            
            directGain.gain.value = 0.7;
            reverbGain.gain.value = 0.3;
            
            gainNode.connect(directGain);
            gainNode.connect(reverbGain);
            
            directGain.connect(masterGain);
            reverbGain.connect(reverbNode);
            
            // Start oscillator
            oscillator.start();
            
            // Fade in gradually with staggered timing
            gainNode.gain.linearRampToValueAtTime(
                0.05 / (index + 1), // Lower volume for higher frequencies
                audioContext.currentTime + 5 + index
            );
            
            // Store reference
            drones.push({
                oscillator,
                gainNode,
                baseFrequency: freq
            });
        });
        
        // Create LFO for subtle modulation
        const lfo = audioContext.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.05; // Very slow modulation
        
        const lfoGain = audioContext.createGain();
        lfoGain.gain.value = 3; // Modulation amount
        
        lfo.connect(lfoGain);
        
        // Apply modulation to selected drones for movement
        lfoGain.connect(drones[1].oscillator.detune);
        lfoGain.connect(drones[3].oscillator.detune);
        
        lfo.start();
    }
    
    // Schedule random textural events for ongoing interest
    function scheduleTextureEvents() {
        if (!initialized || muted) return;
        
        // Calculate next event time with natural variation
        const nextEventTime = audioContext.currentTime + 5 + Math.random() * 15;
        
        // Create bell-like tone with ritual resonance
        createTextureEvent(nextEventTime);
        
        // Schedule next event recursively
        setTimeout(scheduleTextureEvents, (nextEventTime - audioContext.currentTime) * 1000);
    }
    
    // Create individual textural sound event
    function createTextureEvent(startTime) {
        // Select base frequency from harmonic series
        const fundamentalFreq = 220 * (Math.random() * 2 + 0.5);
        
        // Create carrier oscillator
        const carrier = audioContext.createOscillator();
        carrier.type = 'sine';
        carrier.frequency.value = fundamentalFreq;
        
        // Create amplitude envelope
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 3);
        
        // Connect to reverb for spatial quality
        carrier.connect(gainNode);
        gainNode.connect(reverbNode);
        
        // Schedule start and stop
        carrier.start(startTime);
        carrier.stop(startTime + 3);
        
        // Store reference
        texturalElements.push({
            carrier,
            gainNode,
            startTime,
            duration: 3
        });
    }
    
    // Create interactive sound palette for user actions
    function createInteractiveSoundPalette() {
        // Click interaction sound
        interactiveSounds.click = function(intensity = 1) {
            if (!initialized || muted) return;
            
            // Create click oscillator with short envelope
            const clickOsc = audioContext.createOscillator();
            clickOsc.type = 'sine';
            clickOsc.frequency.value = 800 + Math.random() * 600;
            
            // Envelope for sharp attack
            const clickGain = audioContext.createGain();
            clickGain.gain.setValueAtTime(0, audioContext.currentTime);
            clickGain.gain.linearRampToValueAtTime(0.1 * intensity, audioContext.currentTime + 0.005);
            clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            // Band-pass filter for tonal character
            const clickFilter = audioContext.createBiquadFilter();
            clickFilter.type = 'bandpass';
            clickFilter.frequency.value = 1200;
            clickFilter.Q.value = 2;
            
            // Connect signal path
            clickOsc.connect(clickFilter);
            clickFilter.connect(clickGain);
            clickGain.connect(masterGain);
            
            // Start and stop
            clickOsc.start();
            clickOsc.stop(audioContext.currentTime + 0.1);
        };
        
        // Hover interaction sound
        interactiveSounds.hover = function() {
            if (!initialized || muted) return;
            
            // Create subtle hover tone
            const hoverOsc = audioContext.createOscillator();
            hoverOsc.type = 'sine';
            hoverOsc.frequency.value = 440 + Math.random() * 200;
            
            // Very gentle envelope
            const hoverGain = audioContext.createGain();
            hoverGain.gain.setValueAtTime(0, audioContext.currentTime);
            hoverGain.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.1);
            hoverGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
            
            // Connect with reverb for spaciousness
            hoverOsc.connect(hoverGain);
            hoverGain.connect(reverbNode);
            
            // Start and stop
            hoverOsc.start();
            hoverOsc.stop(audioContext.currentTime + 0.3);
        };
        
        // Summoning sound for ritual figures
        interactiveSounds.summon = function(type) {
            if (!initialized || muted) return;
            
            // Create base oscillator
            const summonOsc = audioContext.createOscillator();
            
            // Set type and frequency based on the summoning type
            if (type === 'summon') {
                summonOsc.type = 'sine';
                summonOsc.frequency.setValueAtTime(220, audioContext.currentTime);
                summonOsc.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 1);
            } else if (type === 'dismiss') {
                summonOsc.type = 'triangle';
                summonOsc.frequency.setValueAtTime(330, audioContext.currentTime);
                summonOsc.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.5);
            }
            
            // Create gain node for envelope
            const summonGain = audioContext.createGain();
            summonGain.gain.setValueAtTime(0, audioContext.currentTime);
            summonGain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            summonGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
            
            // Connect to reverb for atmosphere
            summonOsc.connect(summonGain);
            summonGain.connect(reverbNode);
            
            // Start and stop
            summonOsc.start();
            summonOsc.stop(audioContext.currentTime + 1.5);
        };
        
        // Ritual entry sound - more dramatic
        interactiveSounds.ritualEntry = function() {
            if (!initialized || muted) return;
            
            // Create multiple layers for rich texture
            const layers = [
                { freq: 55, type: 'sine', gain: 0.2, attack: 0.5, release: 5 },
                { freq: 110, type: 'triangle', gain: 0.15, attack: 0.3, release: 4 },
                { freq: 220, type: 'sine', gain: 0.1, attack: 0.2, release: 3 },
                { freq: 330, type: 'sine', gain: 0.05, attack: 0.1, release: 2 }
            ];
            
            layers.forEach(layer => {
                const osc = audioContext.createOscillator();
                osc.type = layer.type;
                osc.frequency.value = layer.freq;
                
                const gain = audioContext.createGain();
                gain.gain.setValueAtTime(0, audioContext.currentTime);
                gain.gain.linearRampToValueAtTime(layer.gain, audioContext.currentTime + layer.attack);
                gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + layer.attack + layer.release);
                
                osc.connect(gain);
                gain.connect(reverbNode);
                
                osc.start();
                osc.stop(audioContext.currentTime + layer.attack + layer.release);
            });
            
            // Add noise sweep for dramatic effect
            const noiseBuffer = createNoiseBuffer();
            const noiseSource = audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            
            const noiseFilter = audioContext.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.setValueAtTime(100, audioContext.currentTime);
            noiseFilter.frequency.exponentialRampToValueAtTime(8000, audioContext.currentTime + 2);
            noiseFilter.Q.value = 1;
            
            const noiseGain = audioContext.createGain();
            noiseGain.gain.setValueAtTime(0, audioContext.currentTime);
            noiseGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
            
            noiseSource.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(masterGain);
            
            noiseSource.start();
            noiseSource.stop(audioContext.currentTime + 3);
        };
        
        // Glitch effect sound
        interactiveSounds.glitch = function(intensity = 1) {
            if (!initialized || muted) return;
            
            // Create short noise burst
            const noiseBuffer = createNoiseBuffer(0.2);
            const noiseSource = audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            
            // Create band-pass filter with rapid modulation
            const glitchFilter = audioContext.createBiquadFilter();
            glitchFilter.type = 'bandpass';
            glitchFilter.frequency.setValueAtTime(2000, audioContext.currentTime);
            glitchFilter.frequency.linearRampToValueAtTime(500, audioContext.currentTime + 0.1);
            glitchFilter.frequency.linearRampToValueAtTime(3000, audioContext.currentTime + 0.2);
            glitchFilter.Q.value = 5;
            
            // Create gain with short envelope
            const glitchGain = audioContext.createGain();
            glitchGain.gain.setValueAtTime(0, audioContext.currentTime);
            glitchGain.gain.linearRampToValueAtTime(0.1 * intensity, audioContext.currentTime + 0.01);
            glitchGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
            
            // Connect
            noiseSource.connect(glitchFilter);
            glitchFilter.connect(glitchGain);
            glitchGain.connect(masterGain);
            
            // Start and stop
            noiseSource.start();
            noiseSource.stop(audioContext.currentTime + 0.2);
        };
    }
    
    // Helper function to create noise buffer
    function createNoiseBuffer(duration = 1) {
        const bufferSize = audioContext.sampleRate * duration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        return buffer;
    }
    
    // Toggle mute state
    function toggleMute() {
        muted = !muted;
        
        if (muted) {
            // Fade out all sounds
            masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
            
            // Suspend context after fade out
            setTimeout(() => {
                if (audioContext && audioContext.state === 'running') {
                    audioContext.suspend();
                }
            }, 500);
        } else {
            // Resume context and fade in
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
                masterGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.5);
            }
        }
        
        return muted;
    }
    
    // Clean up and stop all sounds
    function stopAllSounds() {
        if (!initialized) return;
        
        // Fade out master volume
        masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
        
        // Stop all drones
        drones.forEach(drone => {
            drone.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
            setTimeout(() => drone.oscillator.stop(), 1000);
        });
        
        // Clear arrays
        drones = [];
        texturalElements = [];
    }
    
    // Public API
    return {
        initialize: initializeAudio,
        play: function(soundType, ...args) {
            if (interactiveSounds[soundType]) {
                interactiveSounds[soundType](...args);
            }
        },
        toggleMute: toggleMute,
        stop: stopAllSounds,
        isInitialized: function() {
            return initialized;
        },
        isMuted: function() {
            return muted;
        }
    };
})();

// Bind to DOM events for audio triggers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio on user interaction
    document.getElementById('enter-ritual').addEventListener('click', function() {
        AudioSystem.initialize();
        AudioSystem.play('ritualEntry');
    });
    
    // Sound toggle button
    document.getElementById('toggle-sound').addEventListener('click', function() {
        const muted = AudioSystem.toggleMute();
        document.getElementById('sound-icon').textContent = muted ? '🔇' : '🔊';
    });
    
    // Add interactive sounds to buttons
    const buttons = document.querySelectorAll('button, .paint-button, .big-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => AudioSystem.play('click', 1));
        button.addEventListener('mouseenter', () => AudioSystem.play('hover'));
    });
    
    // Summoning sounds
    document.getElementById('ethan-button').addEventListener('click', function() {
        AudioSystem.play('summon', 'summon');
    });
    
    document.getElementById('noel-button').addEventListener('click', function() {
        AudioSystem.play('summon', 'summon');
    });
    
    // Return button sound
    document.getElementById('return-button').addEventListener('click', function() {
        AudioSystem.play('summon', 'dismiss');
    });
});

// Add glitch sound to glitch visual effect
window.addEventListener('glitchEffect', function(e) {
    AudioSystem.play('glitch', e.detail.intensity || 1);
});
