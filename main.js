/**
 * ars culus™ | TRANSCENDENT RITUAL
 * Main Controller
 * 
 * Orchestrates the entire experience, coordinating between
 * visual effects, audio, and ritual systems to create a 
 * cohesive, immersive journey.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("ars culus™ | TRANSCENDENT RITUAL initializing...");
    
    // Initialize systems
    if (window.VisualEffects && typeof window.VisualEffects.init === 'function') {
        window.VisualEffects.init();
    }
    
    // Expose global state for cross-module access
    window.ARS_CULUS = {
        VERSION: '1.0.0',
        DEBUG: false,
        
        // Toggle debug mode
        toggleDebug: function() {
            this.DEBUG = !this.DEBUG;
            console.log(`Debug mode: ${this.DEBUG ? 'ON' : 'OFF'}`);
            return this.DEBUG;
        },
        
        // Get current state
        getState: function() {
            return {
                ritualActive: window.RitualSystem ? window.RitualSystem.isRitualActive() : false,
                ritualProgress: window.RitualSystem ? window.RitualSystem.getRitualProgress() : 0,
                audioInitialized: window.AudioSystem ? window.AudioSystem.isInitialized() : false,
                audioMuted: window.AudioSystem ? window.AudioSystem.isMuted() : false,
                cameraMode: window.VisualEffects ? window.VisualEffects.getCameraMode() : 'none',
                elapsedTime: window.VisualEffects ? window.VisualEffects.getElapsedTime() : 0
            };
        }
    };
    
    // Create cross-system event handlers
    setupEventHandlers();
    
    // Set up Konami code easter egg
    setupKonamiCode();
    
    // Set up cursor trail effect
    setupCursorTrail();
    
    // Fade out page transition overlay
    setTimeout(() => {
        document.getElementById('page-transition').style.opacity = '0';
    }, 500);
    
    console.log("ars culus™ | TRANSCENDENT RITUAL initialized");
});

// Set up cross-system event handlers
function setupEventHandlers() {
    // Create event bus for cross-system communication
    window.EventBus = {
        dispatch: function(eventName, detail = {}) {
            window.dispatchEvent(new CustomEvent(eventName, { detail }));
            if (window.ARS_CULUS.DEBUG) {
                console.log(`Event dispatched: ${eventName}`, detail);
            }
        },
        
        on: function(eventName, callback) {
            window.addEventListener(eventName, callback);
        },
        
        off: function(eventName, callback) {
            window.removeEventListener(eventName, callback);
        }
    };
    
    // Create visual and audio feedback for interactive elements
    enhanceInteractiveElements();
    
    // Set up click interaction handler
    document.addEventListener('click', handleGlobalClick);
    
    // Listen for ritual state changes
    window.EventBus.on('ritualStateChange', handleRitualStateChange);
    
    // Listen for milestone events
    window.EventBus.on('milestone', handleMilestone);
    
    // Listen for glitch effects
    window.EventBus.on('glitchEffect', handleGlitchEffect);
    
    // Set up window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Set up visibility change handler
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Enhance interactive elements with feedback
function enhanceInteractiveElements() {
    const interactiveElements = document.querySelectorAll('button, a, .paint-button, .big-button');
    
    interactiveElements.forEach(element => {
        // Mouse enter effect
        element.addEventListener('mouseenter', () => {
            // Play hover sound
            if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
                window.AudioSystem.play('hover');
            }
            
            // Add subtle glow effect
            const originalBoxShadow = element.style.boxShadow;
            element.style.boxShadow = `0 0 10px rgba(255,255,255,0.5), ${originalBoxShadow || ''}`;
            
            // Restore original state on mouse leave
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = originalBoxShadow;
            }, { once: true });
        });
        
        // Click effect
        element.addEventListener('click', (e) => {
            // Play click sound
            if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
                window.AudioSystem.play('click', 1);
            }
            
            // Create ripple effect
            createRippleEffect(e, element);
        });
    });
}

// Create ripple effect for clicks
function createRippleEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.top = `${y}px`;
    ripple.style.left = `${x}px`;
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255,255,255,0.4)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.transition = 'width 0.3s, height 0.3s, opacity 0.3s';
    ripple.style.pointerEvents = 'none';
    
    // Add to element
    element.style.position = element.style.position || 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Animate ripple
    setTimeout(() => {
        const maxDimension = Math.max(element.offsetWidth, element.offsetHeight);
        ripple.style.width = `${maxDimension * 2}px`;
        ripple.style.height = `${maxDimension * 2}px`;
        ripple.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => ripple.remove(), 300);
    }, 10);
}

// Handle global click for creation mode
function handleGlobalClick(e) {
    // Only process in creation mode
    if (!window.creationMode) return;
    
    // Create a particle at click position
    if (window.VisualEffects && typeof window.VisualEffects.emitManifestoParticle === 'function') {
        // Convert screen coordinates to 3D space
        // This is a simplified approach - in a real implementation, 
        // we would use raycasting to get the 3D position
        const vector = new THREE.Vector3(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        
        vector.unproject(window.VisualEffects.getCamera());
        const dir = vector.sub(window.VisualEffects.getCamera().position).normalize();
        const distance = -window.VisualEffects.getCamera().position.z / dir.z;
        const pos = window.VisualEffects.getCamera().position.clone().add(dir.multiplyScalar(distance));
        
        // Create particles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                window.VisualEffects.emitManifestoParticle(
                    pos.x + (Math.random() - 0.5) * 2,
                    pos.y + (Math.random() - 0.5) * 2,
                    pos.z + (Math.random() - 0.5) * 2
                );
            }, i * 100);
        }
    }
    
    // Play creation sound
    if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
        window.AudioSystem.play('creation');
    }
}

// Handle ritual state changes
function handleRitualStateChange(e) {
    const { active } = e.detail;
    
    // Update UI elements based on ritual state
    document.getElementById('controls').style.opacity = active ? '0.8' : '0';
    document.getElementById('ritual-progress').style.opacity = active ? '1' : '0';
    
    // Show/hide accessibility controls
    document.getElementById('accessibility-controls').style.display = active ? 'block' : 'none';
    
    // Update document title to reflect state
    document.title = active ? 
        `ars culus™ | RITUAL IN PROGRESS (${Math.floor(window.RitualSystem.getRitualProgress() * 100)}%)` : 
        `ars culus™ | TRANSCENDENT RITUAL`;
}

// Handle milestone events
function handleMilestone(e) {
    const { text } = e.detail;
    
    // Visual effects for milestone
    if (window.VisualEffects && typeof window.VisualEffects.createGlitchEffect === 'function') {
        window.VisualEffects.createGlitchEffect(0.7);
    }
    
    // Audio effects for milestone
    if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
        window.AudioSystem.play('milestone');
    }
    
    // Intensify vignette
    if (typeof window.intensifyVignette === 'function') {
        window.intensifyVignette(3000);
    }
}

// Handle glitch effects
function handleGlitchEffect(e) {
    const { intensity } = e.detail;
    
    // Audio effects for glitch
    if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
        window.AudioSystem.play('glitch', intensity);
    }
}

// Handle window resize
function handleWindowResize() {
    // Update any UI elements that need resizing
    
    // Dispatch event for other systems
    window.EventBus.dispatch('windowResize', {
        width: window.innerWidth,
        height: window.innerHeight
    });
}

// Handle visibility change
function handleVisibilityChange() {
    if (document.hidden) {
        // Page is hidden (user switched tabs, etc.)
        // Pause non-essential animations and sounds
        if (window.AudioSystem && typeof window.AudioSystem.pause === 'function') {
            window.AudioSystem.pause();
        }
    } else {
        // Page is visible again
        // Resume animations and sounds
        if (window.AudioSystem && typeof window.AudioSystem.resume === 'function') {
            window.AudioSystem.resume();
        }
    }
}

// Set up Konami code easter egg
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;
    
    document.addEventListener('keydown', function(e) {
        // Check if key matches expected key in sequence
        if (e.key === konamiCode[konamiPosition]) {
            konamiPosition++;
            
            // If full sequence entered
            if (konamiPosition === konamiCode.length) {
                // Trigger Easter egg in RitualSystem
                if (window.RitualSystem && window.RitualSystem.isRitualActive()) {
                    // Call the easter egg function if it exists
                    if (typeof window.RitualSystem.triggerEasterEgg === 'function') {
                        window.RitualSystem.triggerEasterEgg();
                    } else {
                        // Fallback: dispatch event
                        window.EventBus.dispatch('easterEgg');
                    }
                }
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });
}

// Set up cursor trail effect
function setupCursorTrail() {
    document.addEventListener('mousemove', function(e) {
        // Only create trails when ritual is active
        if (!window.RitualSystem || !window.RitualSystem.isRitualActive()) return;
        
        // Only create trails occasionally
        if (Math.random() > 0.2) return;
        
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.backgroundColor = 'rgba(255,255,255,0.5)';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '4';
        trail.style.opacity = '0.5';
        trail.style.transition = 'transform 0.5s, opacity 0.5s';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.transform = 'scale(2)';
            trail.style.opacity = '0';
            setTimeout(() => trail.remove(), 500);
        }, 10);
    });
}