/**
 * ars culus™ | TRANSCENDENT RITUAL
 * Ritual Experience System
 * 
 * Orchestrates the core ritual experience, managing progression,
 * interactions, narrative elements, and spiritual dimensions
 * that define the transcendent journey.
 */

// Main ritual controller
const RitualSystem = (function() {
    // Manifesto text - the core philosophical content
    const manifestoText = `
How things endure? How things begin? How absence speaks? How habits know themself? How does the radio know when you're finally learning the lyrics? How does an unnoticed maintain its membership? How does a key know its teeth? How does the shelf know its edge? How does the hook carry itself? how can coming come? how sitting sits? how does melting melts melted? How might a wall count its cracks? How does a door know the impatient? How when a word book refuses to contain containing which it promised to contain? How will do I close covers? How do I read upside down? How might a clock, a streetlight? How do I say something without repeating anyone else? How will repetition hold me? How will others know me? How is it possible that certain objects or places appear, over extended observation, to cultivate a richness, significance and an almost animate presence as the possibility for meaningful human interaction, to those same observers, slowly and increasingly disappear and turns instead towards zero? How if meaning decides to take an unauthorized vacation from its meaning-duties? How do inanimate people remain living? How do I read lips? How to make without thinking? How weight grounds? How to know noise? How to distinguish approach of realization? How do I know absence? How when numbers number a little too much and start to letter? How are moments linked together? How to grow without knowing? How a child and his dog? How will feeling be felt? How will things change once they're understood as over? How when color refuses to maintain its chromatic responsibilities? When volume asserts loud to wide and wide to loud confusing its cubic sense of self with a probable disconnected sense of spatial significance, but that they may never meet and be known as occupations of two different sized spaces to another? How if Sunday doesn't show proper affection to Monday? How when four birds are precisely not four but also not quite three? How when they never were over? How when this necessitates the absence of birthed and repressed sentiment to be privatized in your own language before you recall its significance at the end of this sentence? How if an alphabet reputes itself without consulting proper alphabetical authority? How light remembers? How does structure structure structurally structuring structured structures? How endings begin? How to fragment a unity? How when collecting embarks on training to assert itself as a lifestyle, but targets the wrong verbal audience? How to hear silent now? How a line can curve? How a wind can move? How redness is how it is? How to make is doing to be but how to approach? How it will be, when it is how to see, when is how now gone here when so much nothing to become? How to touch without touching? How to face and facing?

diktat of the art worker.
the art worker… 

shall create.

shall enable creation.

shall resist discrimination.

shall resist idolization. 

shall submit.

shall sublimate.

shall sublate.

shall collaborate.

shall assimilate.

works for no one.

is of every one.

shall love.

We want to tell people that there is more than one way of knowing.
Ars Culus Is a collectism-driven enterprise that covers themes of relativistic politics in the consumed. 
To simplify, we assemble to disseminate paradoxical paradigms that catalyze statistical convergence towards symbiotic synergy.
As in, we want to question why is something art or not.
`;

    // Spiritual concepts that emerge during the ritual
    const spiritualConcepts = [
        "The liminal space between being and non-being",
        "Dissolution of self into collective consciousness",
        "The sacred geometry of thought patterns",
        "Transcendence through rhythmic repetition",
        "The divine paradox of simultaneous creation and destruction",
        "Awakening to the infinite within the finite",
        "The sacred act of witnessing",
        "Ritual as a vessel for transformation",
        "The eternal return of the ever-different same",
        "Embodiment as portal to the immaterial",
        "The space between intention and execution",
        "Negation as form of creation"
    ];
    
    // Hidden narrative fragments
    const narrativeFragments = [
        "The ritual was first performed in 1997.",
        "They say the third participant never returned.",
        "The symbols were discovered in an abandoned server room.",
        "Some claim to have seen figures in the static.",
        "The original manifesto contained 72 directives.",
        "Those who complete the ritual report seeing themselves from outside.",
        "The collective disbanded in 2003, only to reappear in 2019.",
        "The binary oppositions refer to a specific system of knowledge.",
        "The ritual is both the method and the message.",
        "Participants describe a 'folding of time' during the experience.",
        "The precise duration - 72 hours - corresponds to the threshold of perception.",
        "Each iteration reveals a different facet of the same truth."
    ];
    
    // Loading messages
    const loadingMessages = [
        "Rejecting binary oppositions...",
        "Installing toolbar...",
        "Faxing signature...",
        "Breathing into monitor...",
        "Sublimating digital consciousness...",
        "Structuring structurally structuring structured structures...",
        "Enabling creation...",
        "Resisting idolization...",
        "Submitting...",
        "Sublating...",
        "Dissolving boundaries...",
        "Embracing paradox...",
        "Converting meaning to meta-meaning..."
    ];
    
    // State variables
    let ritualActive = false;
    let manifestoScrollElement;
    let manifestoPosition = 0;
    let manifestoMilestones;
    let displayedMilestones = new Set();
    let narrativeContainer;
    let ritualSymbols;
    let ritualProgress = 0;
    let lastMilestoneTime = 0;
    let activeParticipants = {
        ethan: false,
        noel: false
    };
    
    // Initialize the ritual system
    function initialize() {
        // Set up manifesto scroll
        manifestoScrollElement = document.getElementById('manifesto-scroll');
        setInterval(updateManifestoScroll, 150);
        
        // Create milestone system
        manifestoMilestones = createManifestoMilestones();
        
        // Set up narrative fragments
        narrativeContainer = document.getElementById('narrative-fragments');
        createNarrativeFragments();
        
        // Set up ritual symbols
        ritualSymbols = document.querySelectorAll('.ritual-symbol');
        
        // Set up loading simulation
        simulateLoading();
        
        // Bind event handlers
        bindEventHandlers();
        
        // Create ritual artifacts
        createRitualArtifacts();
        
        console.log("Ritual system initialized");
    }
    
    // Update manifesto scroll
    function updateManifestoScroll() {
        if (!manifestoScrollElement) return;
        
        const chunk = manifestoText.substring(manifestoPosition, manifestoPosition + 100);
        manifestoScrollElement.innerHTML = chunk;
        manifestoPosition = (manifestoPosition + 1) % (manifestoText.length - 100);
    }
    
    // Simulate loading experience
    function simulateLoading() {
        const loadingElement = document.getElementById('loading');
        const progressElement = document.getElementById('loading-progress');
        const messageElement = loadingElement.querySelector('p');
        
        let loadingProgress = 0;
        
        const interval = setInterval(() => {
            // Increment with variable speed
            loadingProgress += Math.random() * (loadingProgress < 50 ? 5 : (loadingProgress < 80 ? 3 : 1));
            
            if (loadingProgress >= 100) {
                loadingProgress = 100;
                clearInterval(interval);
                
                // Show final message
                messageElement.textContent = "Initialization complete. Entering portal...";
                
                // Show portal after delay
                setTimeout(() => {
                    loadingElement.classList.add('hidden');
                    document.getElementById('portal-container').classList.remove('hidden');
                }, 1500);
            }
            
            // Update progress bar
            progressElement.style.width = `${loadingProgress}%`;
            
            // Update message based on progress
            const messageIndex = Math.floor((loadingProgress / 100) * loadingMessages.length);
            if (messageIndex < loadingMessages.length) {
                // Add glitch effect to text changes
                if (Math.random() < 0.3) {
                    const originalText = messageElement.textContent;
                    const glitchedText = createGlitchedText(originalText);
                    messageElement.textContent = glitchedText;
                    
                    setTimeout(() => {
                        messageElement.textContent = loadingMessages[messageIndex];
                    }, 100);
                } else {
                    messageElement.textContent = loadingMessages[messageIndex];
                }
            }
        }, 500);
    }
    
    // Create glitched text effect
    function createGlitchedText(text) {
        let glitchedText = '';
        for (let i = 0; i < text.length; i++) {
            if (Math.random() < 0.2) {
                const charCode = Math.floor(Math.random() * 26) + 65;
                glitchedText += String.fromCharCode(charCode);
            } else {
                glitchedText += text[i];
            }
        }
        return glitchedText;
    }
    
    // Create manifesto milestones
    function createManifestoMilestones() {
        // Extract key questions from manifesto
        const keyQuestions = manifestoText.match(/How[^?]+\?/g) || [];
        
        // Create container for milestone phrases
        const container = document.createElement('div');
        container.id = 'milestone-container';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.color = 'white';
        container.style.fontSize = '32px';
        container.style.fontFamily = 'Times New Roman, serif';
        container.style.textAlign = 'center';
        container.style.zIndex = '10';
        container.style.pointerEvents = 'none';
        container.style.opacity = '0';
        container.style.transition = 'opacity 2s';
        container.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
        container.style.maxWidth = '80%';
        document.body.appendChild(container);
        
        return {
            element: container,
            keyQuestions: keyQuestions,
            spiritualConcepts: spiritualConcepts,
            check: checkMilestones,
            reveal: revealMilestone
        };
    }
    
    // Check for milestone triggers
    function checkMilestones(elapsedTime) {
        if (!ritualActive) return;
        
        // Calculate ritual progress (0-1)
        ritualProgress = Math.min(1, elapsedTime / (72 * 3600));
        
        // Determine if it's time for a new milestone
        const currentTime = Date.now();
        if (currentTime - lastMilestoneTime < 30000) return; // At least 30 seconds between milestones
        
        // Calculate which milestone we should be at
        const totalMilestones = manifestoMilestones.keyQuestions.length + manifestoMilestones.spiritualConcepts.length;
        const targetMilestoneIndex = Math.floor(ritualProgress * totalMilestones);
        
        // Check if we've already displayed this milestone
        if (!displayedMilestones.has(targetMilestoneIndex) && Math.random() < 0.1) {
            displayedMilestones.add(targetMilestoneIndex);
            lastMilestoneTime = currentTime;
            
            // Determine if we show a question or concept
            let milestoneText;
            if (targetMilestoneIndex < manifestoMilestones.keyQuestions.length) {
                milestoneText = manifestoMilestones.keyQuestions[targetMilestoneIndex];
            } else {
                const conceptIndex = targetMilestoneIndex - manifestoMilestones.keyQuestions.length;
                milestoneText = manifestoMilestones.spiritualConcepts[
                    conceptIndex % manifestoMilestones.spiritualConcepts.length
                ];
            }
            
            manifestoMilestones.reveal(milestoneText);
        }
        
        // Random chance to reveal a narrative fragment
        if (Math.random() < 0.01) {
            revealRandomNarrativeFragment();
        }
        
        // Random chance to reveal ritual symbols
        if (Math.random() < 0.05) {
            revealRandomRitualSymbol();
        }
    }
    
    // Reveal milestone
    function revealMilestone(text) {
        const container = manifestoMilestones.element;
        
        // Set text
        container.textContent = text;
        
        // Fade in
        container.style.opacity = '1';
        
        // Create visual emphasis
        createMilestoneEmphasis();
        
        // Trigger audio effect if available
        if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
            window.AudioSystem.play('milestone');
        }
        
        // Trigger visual effect if available
        if (window.VisualEffects && typeof window.VisualEffects.createGlitchEffect === 'function') {
            window.VisualEffects.createGlitchEffect(0.7);
        }
        
        // Fade out after a few seconds
        setTimeout(() => {
            container.style.opacity = '0';
        }, 7000);
    }
    
    // Create visual emphasis for milestone
    function createMilestoneEmphasis() {
        // Create a subtle flash
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'rgba(255,255,255,0.1)';
        flash.style.zIndex = '5';
        flash.style.opacity = '0.7';
        flash.style.transition = 'opacity 3s';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 3000);
        }, 100);
        
        // Momentarily slow down time perception
        if (window.VisualEffects && typeof window.VisualEffects.transitionCameraToMode === 'function') {
            const originalCameraMode = window.VisualEffects.getCameraMode();
            window.VisualEffects.transitionCameraToMode('ritual-close');
            
            // Return to original camera mode after a delay
            setTimeout(() => {
                window.VisualEffects.transitionCameraToMode(originalCameraMode);
            }, 8000);
        }
    }
    
    // Create narrative fragments
    function createNarrativeFragments() {
        // Create fragment elements
        narrativeFragments.forEach((text, index) => {
            const fragment = document.createElement('div');
            fragment.className = 'narrative-fragment';
            fragment.textContent = text;
            
            // Position randomly around the edges
            const positions = [
                {top: '10%', left: '10%'},
                {top: '10%', right: '10%'},
                {bottom: '10%', left: '10%'},
                {bottom: '10%', right: '10%'},
                {top: '50%', left: '5%', transform: 'translateY(-50%)'},
                {top: '50%', right: '5%', transform: 'translateY(-50%)'},
                {top: '5%', left: '50%', transform: 'translateX(-50%)'},
                {bottom: '5%', left: '50%', transform: 'translateX(-50%)'}
            ];
            
            const position = positions[index % positions.length];
            Object.keys(position).forEach(key => {
                fragment.style[key] = position[key];
            });
            
            fragment.style.transform = (fragment.style.transform || '') + ` rotate(${(Math.random() * 6 - 3)}deg)`;
            
            narrativeContainer.appendChild(fragment);
        });
    }
    
    // Reveal random narrative fragment
    function revealRandomNarrativeFragment() {
        const hiddenFragments = Array.from(document.querySelectorAll('.narrative-fragment')).filter(
            f => f.style.opacity === '0'
        );
        
        if (hiddenFragments.length > 0) {
            const fragment = hiddenFragments[Math.floor(Math.random() * hiddenFragments.length)];
            fragment.style.opacity = '1';
            
            // Hide after viewing
            setTimeout(() => {
                fragment.style.opacity = '0';
            }, 10000);
        }
    }
    
    // Reveal random ritual symbol
    function revealRandomRitualSymbol() {
        if (!ritualSymbols || ritualSymbols.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * ritualSymbols.length);
        const symbol = ritualSymbols[randomIndex];
        
        // Only show if currently hidden
        if (symbol.style.opacity === '0') {
            symbol.style.opacity = '1';
            
            // Hide after a random duration
            setTimeout(() => {
                symbol.style.opacity = '0';
            }, 5000 + Math.random() * 10000);
        }
    }
    
    // Create ritual artifacts
    function createRitualArtifacts() {
        // Create an interactive object that reveals deeper meaning
        const interactiveOrb = createInteractiveOrb();
        
        // Create a visual progress indicator
        const progressIndicator = createRitualProgressIndicator();
        
        // Create atmospheric elements
        createAtmosphericElements();
    }
    
    // Create interactive orb
    function createInteractiveOrb() {
        // This is created in 3D space by VisualEffects
        // Here we just add the event handlers
        
        document.addEventListener('orbInteraction', function(e) {
            // Reveal a spiritual concept
            const randomConcept = spiritualConcepts[Math.floor(Math.random() * spiritualConcepts.length)];
            manifestoMilestones.reveal(randomConcept);
            
            // Create particle burst
            if (window.VisualEffects && typeof window.VisualEffects.emitManifestoParticle === 'function') {
                const position = e.detail.position;
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        window.VisualEffects.emitManifestoParticle(
                            position.x + (Math.random() - 0.5) * 2,
                            position.y + (Math.random() - 0.5) * 2,
                            position.z + (Math.random() - 0.5) * 2
                        );
                    }, i * 100);
                }
            }
        });
    }
    
    // Create ritual progress indicator
    function createRitualProgressIndicator() {
        const container = document.createElement('div');
        container.id = 'ritual-progress';
        container.style.position = 'fixed';
        container.style.bottom = '40px';
        container.style.right = '10px';
        container.style.width = '200px';
        container.style.height = '4px';
        container.style.backgroundColor = 'rgba(255,255,255,0.1)';
        container.style.zIndex = '3';
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s';
        document.body.appendChild(container);
        
        const progress = document.createElement('div');
        progress.style.height = '100%';
        progress.style.width = '0%';
        progress.style.background = 'linear-gradient(to right, #ff3300, #ffcc00, #33ccff)';
        container.appendChild(progress);
        
        // Update progress based on ritual time
        function updateProgress() {
            if (!ritualActive) return;
            
            if (window.VisualEffects && typeof window.VisualEffects.getElapsedTime === 'function') {
                const elapsedTime = window.VisualEffects.getElapsedTime();
                ritualProgress = Math.min(1, elapsedTime / (72 * 3600)); // 72 hours max
                progress.style.width = `${ritualProgress * 100}%`;
                
                if (container.style.opacity === '0' && ritualActive) {
                    container.style.opacity = '1';
                }
            }
            
            requestAnimationFrame(updateProgress);
        }
        
        updateProgress();
        
        return container;
    }
    
    // Create atmospheric elements
    function createAtmosphericElements() {
        // Vignette effect
        const vignette = document.getElementById('vignette');
        
        // Method to intensify vignette during significant moments
        function intensifyVignette(duration = 3000) {
            if (!vignette) return;
            
            vignette.style.opacity = '0.8';
            vignette.style.boxShadow = 'inset 0 0 200px rgba(0,0,0,0.9)';
            
            setTimeout(() => {
                vignette.style.opacity = '0.5';
                vignette.style.boxShadow = 'inset 0 0 150px rgba(0,0,0,0.7)';
            }, duration);
        }
        
        // Expose this function for other modules
        window.intensifyVignette = intensifyVignette;
    }
    
    // Start the ritual
    function startRitual() {
        // Set ritual as active
        ritualActive = true;
        
        // Reset milestone tracking
        displayedMilestones = new Set();
        lastMilestoneTime = 0;
        
        // Reset elapsed time if visual effects system available
        if (window.VisualEffects) {
            if (typeof window.VisualEffects.resetElapsedTime === 'function') {
                window.VisualEffects.resetElapsedTime();
            }
            if (typeof window.VisualEffects.setRitualActive === 'function') {
                window.VisualEffects.setRitualActive(true);
            }
        }
        
        // Initialize audio if available
        if (window.AudioSystem && typeof window.AudioSystem.initialize === 'function') {
            window.AudioSystem.initialize();
        }
        
        // Show ritual artifacts
        document.getElementById('ritual-artifacts').classList.remove('hidden');
        document.getElementById('narrative-fragments').classList.remove('hidden');
        
        // Show controls hint
        document.getElementById('controls').style.opacity = '0.8';
        setTimeout(() => document.getElementById('controls').style.opacity = '0', 5000);
        
        // Show return button
        document.getElementById('return-button').classList.remove('hidden');
        
        // Add interaction for scene exploration
        enableSceneInteraction();
        
        // Create dramatic entrance effect
        createRitualEntranceEffect();
        
        // Start milestone checking
        setInterval(() => {
            if (window.VisualEffects && typeof window.VisualEffects.getElapsedTime === 'function') {
                const elapsedTime = window.VisualEffects.getElapsedTime();
                manifestoMilestones.check(elapsedTime);
                
                // Check for ritual completion
                if (ritualProgress >= 1) {
                    showCredits();
                }
            }
        }, 5000);
    }
    
    // End the ritual
    function endRitual() {
        // Set ritual as inactive
        ritualActive = false;
        
        // Update visual effects system if available
        if (window.VisualEffects && typeof window.VisualEffects.setRitualActive === 'function') {
            window.VisualEffects.setRitualActive(false);
        }
        
        // Stop audio if available
        if (window.AudioSystem && typeof window.AudioSystem.stop === 'function') {
            window.AudioSystem.stop();
        }
        
        // Hide ritual artifacts
        document.getElementById('ritual-artifacts').classList.add('hidden');
        document.getElementById('narrative-fragments').classList.add('hidden');
        
        // Hide return button
        document.getElementById('return-button').classList.add('hidden');
        
        // Show portal
        document.getElementById('portal-container').classList.remove('hidden');
        
        // Reset figure visibility
        if (window.VisualEffects) {
            if (typeof window.VisualEffects.showFigure === 'function') {
                window.VisualEffects.showFigure('ethan', false);
                window.VisualEffects.showFigure('noel', false);
            }
        }
        
        activeParticipants.ethan = false;
        activeParticipants.noel = false;
    }
    
    // Create ritual entrance effect
    function createRitualEntranceEffect() {
        // Create dramatic transition
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.zIndex = '50';
        flash.style.opacity = '1';
        flash.style.transition = 'opacity 3s';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 3000);
        }, 100);
        
        // Create a sequence of texts
        const sequence = document.createElement('div');
        sequence.style.position = 'fixed';
        sequence.style.top = '0';
        sequence.style.left = '0';
        sequence.style.width = '100%';
        sequence.style.height = '100%';
        sequence.style.backgroundColor = 'black';
        sequence.style.zIndex = '100';
        sequence.style.display = 'flex';
        sequence.style.justifyContent = 'center';
        sequence.style.alignItems = 'center';
        sequence.style.flexDirection = 'column';
        sequence.style.color = 'white';
        sequence.style.fontFamily = 'Times New Roman, serif';
        sequence.style.transition = 'opacity 2s';
        document.body.appendChild(sequence);
        
        // Create sequence text
        const text = document.createElement('div');
        text.style.fontSize = '32px';
        text.style.textAlign = 'center';
        text.style.maxWidth = '80%';
        text.style.opacity = '0';
        text.style.transition = 'opacity 2s';
        sequence.appendChild(text);
        
        // Sequence of texts
        const texts = [
            "The ritual begins when you reject binary oppositions",
            "Install our toolbar",
            "Fax your signature",
            "Breathe into the monitor",
            "Now."
        ];
        
        let currentText = 0;
        
        function showNextText() {
            if (currentText >= texts.length) {
                // End sequence
                sequence.style.opacity = '0';
                setTimeout(() => sequence.remove(), 2000);
                return;
            }
            
            // Show current text
            text.textContent = texts[currentText];
            text.style.opacity = '1';
            
            // Schedule next text
            setTimeout(() => {
                text.style.opacity = '0';
                setTimeout(() => {
                    currentText++;
                    showNextText();
                }, 1000);
            }, 2000);
        }
        
        showNextText();
    }
    
    // Show credits
    function showCredits() {
        if (!ritualActive) return;
        
        // Show credits overlay
        const credits = document.getElementById('credits');
        credits.classList.remove('hidden');
        
        // Reset ritual after credits
        setTimeout(() => {
            credits.classList.add('hidden');
            endRitual();
        }, 10000);
    }
    
    // Enable scene interaction
    function enableSceneInteraction() {
        // This is handled by VisualEffects.js
        // We're just making sure the event listeners are properly connected
        
        // Enable keyboard controls
        enableKeyboardControls();
    }
    
    // Enable keyboard controls
    function enableKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            // Only respond when ritual is active
            if (!ritualActive) return;
            
            // Camera controls
            if (window.VisualEffects && typeof window.VisualEffects.transitionCameraToMode === 'function') {
                if (event.key === '1') {
                    window.VisualEffects.transitionCameraToMode('orbit');
                } else if (event.key === '2') {
                    window.VisualEffects.transitionCameraToMode('focus-ethan');
                } else if (event.key === '3') {
                    window.VisualEffects.transitionCameraToMode('focus-noel');
                } else if (event.key === '4') {
                    window.VisualEffects.transitionCameraToMode('ritual-close');
                } else if (event.key === '5') {
                    window.VisualEffects.transitionCameraToMode('birds-eye');
                } else if (event.key === '6') {
                    window.VisualEffects.transitionCameraToMode('dialogue');
                }
            }
            
            // Return to portal
            if (event.key === 'Escape') {
                endRitual();
            }
            
            // Secret codes
            handleSecretCodes(event);
        });
    }
    
    // Handle secret codes
    let secretCodeInput = '';
    function handleSecretCodes(event) {
        // Add to input buffer
        secretCodeInput += event.key.toLowerCase();
        
        // Keep only last 10 characters
        if (secretCodeInput.length > 10) {
            secretCodeInput = secretCodeInput.substring(secretCodeInput.length - 10);
        }
        
        // Check for secret codes
        if (secretCodeInput.endsWith('ritual')) {
            triggerEasterEgg();
        } else if (secretCodeInput.endsWith('sublate')) {
            revealHiddenManifesto();
        } else if (secretCodeInput.endsWith('create')) {
            triggerCreationMode();
        }
    }
    
    // Easter egg
    function triggerEasterEgg() {
        // Create special visual effect
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'radial-gradient(circle at center, white, transparent)';
        flash.style.zIndex = '50';
        flash.style.opacity = '0';
        flash.style.transition = 'opacity 2s';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        // Flash animation
        setTimeout(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 2000);
            }, 200);
        }, 0);
        
        // Display hidden message
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.color = 'white';
        message.style.fontSize = '24px';
        message.style.fontFamily = 'monospace';
        message.style.textAlign = 'center';
        message.style.zIndex = '51';
        message.style.opacity = '0';
        message.style.transition = 'opacity 2s';
        message.style.textShadow = '0 0 10px rgba(255,255,255,0.7)';
        message.innerHTML = "The art worker shall love.<br><span style='font-size:16px;opacity:0.7'>The true ritual exists in the space between intention and execution.</span>";
        document.body.appendChild(message);
        
        // Show and hide message
        setTimeout(() => {
            message.style.opacity = '1';
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => message.remove(), 2000);
            }, 5000);
        }, 500);
        
        // Create special camera movement
        if (window.VisualEffects) {
            // Trigger a special spiral camera mode
            // This is implemented in VisualEffects.js
            window.dispatchEvent(new CustomEvent('easterEggCamera'));
        }
        
        // Play special audio
        if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
            window.AudioSystem.play('easterEgg');
        }
        
        // Emit particles from center
        if (window.VisualEffects && typeof window.VisualEffects.emitManifestoParticle === 'function') {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 3;
                    window.VisualEffects.emitManifestoParticle(
                        Math.cos(angle) * distance,
                        Math.sin(angle) * distance + 1,
                        Math.sin(angle) * distance
                    );
                }, i * 100);
            }
        }
    }
    
    // Reveal hidden manifesto
    function revealHiddenManifesto() {
        // Create a special overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.85)';
        overlay.style.zIndex = '90';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.padding = '50px';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 2s';
        overlay.style.overflow = 'auto';
        document.body.appendChild(overlay);
        
        // Create the hidden manifesto content
        const content = document.createElement('div');
        content.style.maxWidth = '800px';
        content.style.color = 'white';
        content.style.fontFamily = 'Times New Roman, serif';
        content.style.fontSize = '18px';
        content.style.lineHeight = '1.6';
        content.style.textAlign = 'justify';
        content.innerHTML = `
            <h2 style="text-align:center;margin-bottom:30px;font-size:28px;letter-spacing:2px">The Concealed Manifesto</h2>
            
            <p>Between the spaces of our words lies the true content of our expression.</p>
            
            <p>We assert that art is not a category but a quality that emerges in the relationship between observer and observed.</p>
            
            <p>Binary oppositions are not to be rejected but transcended through their simultaneous affirmation and negation.</p>
            
            <p>The ritual exists both as metaphor and literal practice - a framework that enables the dissolution of frameworks.</p>
            
            <p>Time is not a container for experience but a dimension shaped by perception.</p>
            
            <p>The 72-hour duration corresponds to the neurological threshold where perception begins to fold back upon itself.</p>
            
            <p>We are not creating art; we are creating the conditions under which art becomes inevitable.</p>
            
            <p>The collective is both less and more than the sum of its participants.</p>
            
            <p>The digital realm is not a simulation of reality but an extension of consciousness into new forms of materiality.</p>
            
            <p>Our true medium is not sound, image, or code, but the attention of the participant.</p>
            
            <p style="text-align:center;margin-top:40px;font-style:italic">The art worker shall create conditions for transcendence.</p>
        `;
        overlay.appendChild(content);
        
        // Add close button
        const closeButton = document.createElement('div');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.color = 'white';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.padding = '10px';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 2000);
        });
        overlay.appendChild(closeButton);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
        
        // Auto-dismiss after 1 minute
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 2000);
            }
        }, 60000);
        
        // Create subtle audio atmosphere
        if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
            window.AudioSystem.play('revealedText');
        }
    }
    
    // Trigger creation mode
    function triggerCreationMode() {
        // Switch to a special interactive mode where user actions generate visual elements
        
        // First, create an instructional overlay
        const instruction = document.createElement('div');
        instruction.style.position = 'fixed';
        instruction.style.bottom = '50px';
        instruction.style.left = '50%';
        instruction.style.transform = 'translateX(-50%)';
        instruction.style.background = 'rgba(0,0,0,0.7)';
        instruction.style.color = 'white';
        instruction.style.padding = '10px 20px';
        instruction.style.borderRadius = '4px';
        instruction.style.fontSize = '14px';
        instruction.style.fontFamily = 'monospace';
        instruction.style.zIndex = '60';
        instruction.style.opacity = '0';
        instruction.style.transition = 'opacity 1s';
        instruction.textContent = 'CREATION MODE: Click to create, drag to connect, press ESC to exit';
        document.body.appendChild(instruction);
        
        // Fade in instruction
        setTimeout(() => {
            instruction.style.opacity = '1';
            setTimeout(() => {
                instruction.style.opacity = '0';
                setTimeout(() => instruction.remove(), 1000);
            }, 5000);
        }, 100);
        
        // Set creation mode flag
        window.creationMode = true;
        
        // Notify visual effects system
        window.dispatchEvent(new CustomEvent('enterCreationMode'));
        
        // Listen for ESC key to exit creation mode
        const exitListener = (e) => {
            if (e.key === 'Escape') {
                window.creationMode = false;
                window.dispatchEvent(new CustomEvent('exitCreationMode'));
                document.removeEventListener('keydown', exitListener);
            }
        };
        document.addEventListener('keydown', exitListener);
    }
    
    // Bind event handlers
    function bindEventHandlers() {
        // Portal buttons
        document.getElementById('ethan-button').addEventListener('click', function() {
            summonFigure('ethan');
        });
        
        document.getElementById('noel-button').addEventListener('click', function() {
            summonFigure('noel');
        });
        
        // Enter ritual button
        document.getElementById('enter-ritual').addEventListener('click', function() {
            // Hide portal
            document.getElementById('portal-container').classList.add('hidden');
            
            // Start ritual
            startRitual();
        });
        
        // Return button
        document.getElementById('return-button').addEventListener('click', function() {
            endRitual();
        });
        
        // About panel
        document.getElementById('about-link').addEventListener('click', function() {
            document.getElementById('about-panel').classList.remove('hidden');
        });
        
        document.getElementById('close-about').addEventListener('click', function() {
            document.getElementById('about-panel').classList.add('hidden');
        });
        
        // Sound toggle
        document.getElementById('toggle-sound').addEventListener('click', function() {
            if (window.AudioSystem && typeof window.AudioSystem.toggleMute === 'function') {
                const muted = window.AudioSystem.toggleMute();
                document.getElementById('sound-icon').textContent = muted ? '🔇' : '🔊';
            }
        });
    }
    
    // Summon or dismiss a figure
    function summonFigure(figure) {
        // Toggle active state
        activeParticipants[figure] = !activeParticipants[figure];
        
        // Update visual representation
        if (window.VisualEffects && typeof window.VisualEffects.showFigure === 'function') {
            window.VisualEffects.showFigure(figure, activeParticipants[figure]);
        }
        
        // Create summoning effect
        if (window.VisualEffects && typeof window.VisualEffects.createSummoningEffect === 'function') {
            // Get position based on figure
            let position = { x: 0, y: 0, z: 0 };
            if (figure === 'ethan') {
                position = { x: -5, y: 1, z: 0 };
            } else if (figure === 'noel') {
                position = { x: 5, y: 1, z: 0 };
            }
            
            window.VisualEffects.createSummoningEffect(
                position.x, 
                position.y, 
                position.z, 
                activeParticipants[figure]
            );
        }
        
        // Play summoning sound
        if (window.AudioSystem && typeof window.AudioSystem.play === 'function') {
            window.AudioSystem.play('summon', activeParticipants[figure] ? 'summon' : 'dismiss');
        }
    }
    
    // Preload assets
    function preloadAssets() {
        // Images to preload
        const images = [
            'assets/backgrounds/marble.jpg',
            'assets/backgrounds/marble.gif',
            'assets/icons/under_construction.gif',
            'assets/icons/symbol1.gif',
            'assets/icons/symbol2.gif',
            'assets/icons/symbol3.gif',
            'assets/badges/netscape.gif',
            'assets/badges/valid-html.gif',
            'assets/badges/midi-enabled.gif',
            'assets/badges/best-viewed.gif',
            'assets/icons/book.gif',
            'assets/faces/ethan.jpg',
            'assets/faces/noel.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Initialize on DOM content loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Preload assets
        preloadAssets();
        
        // Initialize ritual system
        initialize();
        
        // Expose manifesto text for other modules
        window.manifestoText = manifestoText;
    });
    
    // Public API
    return {
        startRitual: startRitual,
        endRitual: endRitual,
        summonFigure: summonFigure,
        isRitualActive: function() { return ritualActive; },
        getManifestoText: function() { return manifestoText; },
        getRitualProgress: function() { return ritualProgress; },
        createGlitchEffect: createGlitchedText
    };
})();

// Export for use in other modules
window.RitualSystem = RitualSystem;
