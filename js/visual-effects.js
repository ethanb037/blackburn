/**
 * ars culus™ | TRANSCENDENT RITUAL
 * Visual Effects System
 * 
 * Creates an immersive, evolving visual landscape that
 * reinforces the ritual's liminal quality and responds
 * to user interactions with atmospheric depth.
 */

// Main visual effects controller
const VisualEffects = (function() {
    // Three.js core components
    let scene, camera, renderer;
    
    // Scene elements
    let centralRitual;
    let ethanFigure;
    let noelFigure;
    let floatingTexts;
    let particleSystem;
    let connectionSystem;
    
    // Camera control variables
    let cameraMode = 'orbit';
    let cameraTransitioning = false;
    let cameraTweenProgress = 0;
    let previousCameraPosition = new THREE.Vector3();
    let targetCameraPosition = new THREE.Vector3();
    let previousCameraLookAt = new THREE.Vector3(0, 2, 0);
    let targetCameraLookAt = new THREE.Vector3(0, 2, 0);
    
    // Timing and state
    let clock;
    let elapsedTime = 0;
    let ritualActive = false;
    
    // DOM effects
    let floatingTextElements = [];
    let customCursor;
    
    // Initialize the 3D scene
    function initScene() {
        // Create scene with fog for depth
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        scene.fog = new THREE.FogExp2(0x000000, 0.0025);
        
        // Initialize camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 15);
        
        // Initialize renderer with antialiasing
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);
        
        // Initialize clock for timing
        clock = new THREE.Clock();
        
        // Create scene elements
        createLighting();
        createStage();
        createCentralRitual();
        createRitualFigures();
        createFloatingTextPlanes();
        createParticleSystem();
        createConnectionSystem();
        
        // Add window resize handler
        window.addEventListener('resize', onWindowResize);
        
        // Start animation loop
        animate();
        
        // Create DOM-based visual effects
        createFilmGrain();
        createCustomCursor();
        createFloatingDOMTexts();
        
        console.log("Visual effects initialized");
    }
    
    // Create lighting setup
    function createLighting() {
        // Main ambient light
        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);
        
        // Center light representing the ritual
        const centerLight = new THREE.PointLight(0xffffff, 1, 30);
        centerLight.position.set(0, 5, 0);
        centerLight.castShadow = true;
        centerLight.shadow.mapSize.width = 2048;
        centerLight.shadow.mapSize.height = 2048;
        scene.add(centerLight);
        
        // Left figure light
        const leftLight = new THREE.PointLight(0xffcc99, 1, 20);
        leftLight.position.set(-5, 5, 5);
        leftLight.castShadow = true;
        leftLight.shadow.mapSize.width = 2048;
        leftLight.shadow.mapSize.height = 2048;
        leftLight.intensity = 0.2; // Start dim until figure is summoned
        scene.add(leftLight);
        
        // Right figure light
        const rightLight = new THREE.PointLight(0x99ccff, 1, 20);
        rightLight.position.set(5, 5, 5);
        rightLight.castShadow = true;
        rightLight.shadow.mapSize.width = 2048;
        rightLight.shadow.mapSize.height = 2048;
        rightLight.intensity = 0.2; // Start dim until figure is summoned
        scene.add(rightLight);
        
        // Flickering fire light in the center
        const fireLight = new THREE.PointLight(0xff9900, 1.5, 20);
        fireLight.position.set(0, 1, 0);
        fireLight.castShadow = true;
        scene.add(fireLight);
        
        // Store references for animation
        scene.userData.lights = {
            centerLight,
            leftLight,
            rightLight,
            fireLight
        };
    }
    
    // Create stage platform
    function createStage() {
        const stageGeometry = new THREE.BoxGeometry(20, 0.5, 10);
        const stageMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const stage = new THREE.Mesh(stageGeometry, stageMaterial);
        stage.position.y = -0.25;
        stage.receiveShadow = true;
        scene.add(stage);
    }
    
    // Create central ritual object
    function createCentralRitual() {
        const ritualGroup = new THREE.Group();
        
        // Create base
        const baseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 16);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 0.25;
        base.receiveShadow = true;
        ritualGroup.add(base);
        
        // Create central column
        const columnGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
        const columnMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        const column = new THREE.Mesh(columnGeometry, columnMaterial);
        column.position.y = 3;
        column.castShadow = true;
        ritualGroup.add(column);
        
        // Create orbiting rings
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(1.5 - i * 0.3, 0.05, 8, 32);
            const ringMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                transparent: true,
                opacity: 0.7 - i * 0.15,
                emissive: 0xaaaaaa,
                emissiveIntensity: 0.2
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.y = 2 + i * 1.2;
            ring.userData = {
                rotationAxis: new THREE.Vector3(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                ).normalize(),
                rotationSpeed: 0.005 + Math.random() * 0.01
            };
            ritualGroup.add(ring);
        }
        
        // Create floating symbols
        const symbolCount = 8;
        for (let i = 0; i < symbolCount; i++) {
            const angle = (i / symbolCount) * Math.PI * 2;
            const radius = 1.8;
            
            // Create symbolic forms representing manifesto concepts
            const symbolGeometry = new THREE.TetrahedronGeometry(0.2);
            const symbolMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                emissive: 0xaaaaaa,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.8
            });
            const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
            symbol.position.set(
                Math.cos(angle) * radius,
                2 + Math.random() * 3,
                Math.sin(angle) * radius
            );
            symbol.userData = {
                orbitSpeed: 0.01 + Math.random() * 0.02,
                orbitRadius: radius,
                orbitCenterY: symbol.position.y,
                startAngle: angle,
                pulseSpeed: 0.5 + Math.random()
            };
            ritualGroup.add(symbol);
        }
        
        // Add manifesto text spiral
        const spiralPointCount = 200;
        const spiralGeometry = new THREE.BufferGeometry();
        const spiralPositions = new Float32Array(spiralPointCount * 3);
        const spiralSizes = new Float32Array(spiralPointCount);
        const spiralColors = new Float32Array(spiralPointCount * 3);
        
        // Create ascending spiral of text fragments
        for (let i = 0; i < spiralPointCount; i++) {
            const t = i / spiralPointCount;
            const angle = t * Math.PI * 15;
            const radius = 1.2 * (1 - t * 0.6);
            const height = t * 6;
            
            const i3 = i * 3;
            spiralPositions[i3] = Math.cos(angle) * radius;
            spiralPositions[i3 + 1] = height;
            spiralPositions[i3 + 2] = Math.sin(angle) * radius;
            
            // Vary point sizes for visual interest
            spiralSizes[i] = 0.05 + 0.1 * (1 - t);
            
            // Create gradient color effect
            spiralColors[i3] = 0.8 - t * 0.5;     // R: decreasing
            spiralColors[i3 + 1] = 0.2 + t * 0.6; // G: increasing
            spiralColors[i3 + 2] = t * 0.8;       // B: increasing
        }
        
        spiralGeometry.setAttribute('position', new THREE.BufferAttribute(spiralPositions, 3));
        spiralGeometry.setAttribute('size', new THREE.BufferAttribute(spiralSizes, 1));
        spiralGeometry.setAttribute('color', new THREE.BufferAttribute(spiralColors, 3));
        
        // Create custom shader material for points
        const spiralMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pointTexture: { value: createPointTexture() }
            },
            vertexShader: `
                uniform float time;
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        const spiral = new THREE.Points(spiralGeometry, spiralMaterial);
        spiral.userData = { animateTime: true };
        ritualGroup.add(spiral);
        
        // Add subtle pulsing aura
        const auraGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const auraTexture = createSolidTexture();
        const auraMaterial = new THREE.MeshBasicMaterial({
            map: auraTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        const aura = new THREE.Mesh(auraGeometry, auraMaterial);
        aura.position.y = 2;
        aura.userData = { pulseSpeed: 0.3 };
        ritualGroup.add(aura);
        
        // Add dynamic connection lines
        const connectionLinesGeometry = new THREE.BufferGeometry();
        const connectionLinesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const connectionLines = new THREE.LineSegments(connectionLinesGeometry, connectionLinesMaterial);
        connectionLines.userData = { updateConnections: true };
        ritualGroup.add(connectionLines);
        
        centralRitual = ritualGroup;
        scene.add(centralRitual);
    }
    
    // Create ritual figures
    function createRitualFigures() {
        // Create Ethan figure
        ethanFigure = createFigure(-5, 'ETHAN');
        ethanFigure.visible = false;
        scene.add(ethanFigure);
        
        // Create Noel figure
        noelFigure = createFigure(5, 'NOEL');
        noelFigure.visible = false;
        scene.add(noelFigure);
        
        // Add faces to figures
        addFacesToFigures();
    }
    
    // Helper function to create a figure
    function createFigure(posX, name) {
        const figureGroup = new THREE.Group();
        
        // Create base cylinder for the figure
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.3, 3, 8);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 1.5;
        body.castShadow = true;
        figureGroup.add(body);
        
        // Create head
        const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 3.2;
        head.castShadow = true;
        figureGroup.add(head);
        
        // Create arms
        const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const armMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
        });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.7, 2, 0);
        leftArm.rotation.z = Math.PI / 4;
        leftArm.castShadow = true;
        figureGroup.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.7, 2, 0);
        rightArm.rotation.z = -Math.PI / 4;
        rightArm.castShadow = true;
        figureGroup.add(rightArm);
        
        // Add text label
        const textCanvas = document.createElement('canvas');
        textCanvas.width = 256;
        textCanvas.height = 64;
        const textContext = textCanvas.getContext('2d');
        textContext.fillStyle = 'white';
        textContext.font = '32px Times New Roman';
        textContext.textAlign = 'center';
        textContext.textBaseline = 'middle';
        textContext.fillText(name, 128, 32);
        
        const textTexture = new THREE.CanvasTexture(textCanvas);
        const textMaterial = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true,
            side: THREE.DoubleSide
        });
        const textGeometry = new THREE.PlaneGeometry(2, 0.5);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.y = 4;
        textMesh.rotation.x = -Math.PI / 6;
        figureGroup.add(textMesh);
        
        // Add manifesto text scrolling on the figure
        const manifestoCanvas = document.createElement('canvas');
        manifestoCanvas.width = 512;
        manifestoCanvas.height = 512;
        const manifestoContext = manifestoCanvas.getContext('2d');
        
        const manifestoTexture = new THREE.CanvasTexture(manifestoCanvas);
        manifestoTexture.needsUpdate = true;
        
        const manifestoMaterial = new THREE.MeshBasicMaterial({
            map: manifestoTexture,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        
        const manifestoGeometry = new THREE.PlaneGeometry(3, 3);
        const manifestoMesh = new THREE.Mesh(manifestoGeometry, manifestoMaterial);
        manifestoMesh.position.set(0, 1.5, 0);
        manifestoMesh.userData = {
            canvas: manifestoCanvas,
            context: manifestoContext,
            textPosition: 0,
            updateText: function(time) {
                this.textPosition = (this.textPosition + 1) % manifestoText.length;
                const text = manifestoText.substring(this.textPosition, this.textPosition + 200);
                
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.fillStyle = 'rgba(255,255,255,0.8)';
                this.context.font = '16px Times New Roman';
                
                // Wrap text
                const words = text.split(' ');
                let line = '';
                let y = 50 + Math.sin(time * 0.5) * 30;
                const maxWidth = 480;
                const lineHeight = 24;
                
                words.forEach(word => {
                    const testLine = line + word + ' ';
                    const metrics = this.context.measureText(testLine);
                    
                    if (metrics.width > maxWidth && line.length > 0) {
                        this.context.fillText(line, 256, y);
                        line = word + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                });
                this.context.fillText(line, 256, y);
                
                manifestoTexture.needsUpdate = true;
            }
        };
        figureGroup.add(manifestoMesh);
        
        // Add to the scene at specified position
        figureGroup.position.set(posX, 0, 0);
        figureGroup.userData = {
            isActive: false,
            hoverHeight: 0.2,
            rotationSpeed: 0.01,
            pulseSpeed: 0.5,
            manifestoMesh: manifestoMesh
        };
        
        return figureGroup;
    }
    
    // Add faces to the figures
    function addFacesToFigures() {
        const textureLoader = new THREE.TextureLoader();
        
        // For Ethan's figure
        textureLoader.load('assets/faces/ethan.jpg', (ethanTexture) => {
            const ethanHead = ethanFigure.children.find(child => 
                child.geometry && child.geometry.type === 'SphereGeometry');
            
            if (ethanHead) {
                const originalMaterial = ethanHead.material.clone();
                
                const faceMaterial = new THREE.MeshPhongMaterial({
                    color: originalMaterial.color,
                    transparent: true,
                    opacity: originalMaterial.opacity,
                    emissive: originalMaterial.emissive,
                    map: ethanTexture,
                    alphaMap: ethanTexture,
                    side: THREE.FrontSide
                });
                
                ethanTexture.offset.set(0.25, 0);
                ethanTexture.repeat.set(0.5, 0.5);
                ethanTexture.center.set(0.5, 0.5);
                
                ethanHead.material = faceMaterial;
                ethanHead.rotation.y = Math.PI;
            }
        });
        
        // For Noel's figure
        textureLoader.load('assets/faces/noel.jpg', (noelTexture) => {
            const noelHead = noelFigure.children.find(child => 
                child.geometry && child.geometry.type === 'SphereGeometry');
            
            if (noelHead) {
                const originalMaterial = noelHead.material.clone();
                
                const faceMaterial = new THREE.MeshPhongMaterial({
                    color: originalMaterial.color,
                    transparent: true,
                    opacity: originalMaterial.opacity,
                    emissive: originalMaterial.emissive,
                    map: noelTexture,
                    alphaMap: noelTexture,
                    side: THREE.FrontSide
                });
                
                noelTexture.offset.set(0.25, 0);
                noelTexture.repeat.set(0.5, 0.5);
                noelTexture.center.set(0.5, 0.5);
                
                noelHead.material = faceMaterial;
                noelHead.rotation.y = Math.PI;
            }
        });
    }
    
    // Create floating text planes
    function createFloatingTextPlanes() {
        const textGroup = new THREE.Group();
        
        // Split manifesto into chunks
        const manifestoChunks = manifestoText.split(/\n+/).filter(chunk => chunk.trim().length > 0);
        
        manifestoChunks.forEach((chunk, index) => {
            // Distill longer passages into more impactful fragments
            if (chunk.length > 100) {
                const breakPoint = chunk.substring(0, 80).lastIndexOf('?');
                chunk = breakPoint > 0 ? chunk.substring(0, breakPoint + 1) : chunk.substring(0, 50) + "...";
            }
            
            // Create canvas for text rendering
            const textCanvas = document.createElement('canvas');
            textCanvas.width = 512;
            textCanvas.height = 128;
            const textContext = textCanvas.getContext('2d');
            
            // Create subtle gradient background
            const gradient = textContext.createLinearGradient(0, 0, 0, 128);
            gradient.addColorStop(0, 'rgba(40, 40, 40, 0.6)');
            gradient.addColorStop(1, 'rgba(20, 20, 20, 0.2)');
            textContext.fillStyle = gradient;
            textContext.fillRect(0, 0, 512, 128);
            
            // Style the text
            textContext.fillStyle = 'white';
            textContext.font = '16px Times New Roman';
            textContext.textAlign = 'center';
            textContext.textBaseline = 'middle';
            
            // Word wrap the text
            const words = chunk.split(' ');
            let line = '';
            let y = 32;
            const maxWidth = 480;
            const lineHeight = 24;
            
            words.forEach(word => {
                const testLine = line + word + ' ';
                const metrics = textContext.measureText(testLine);
                
                if (metrics.width > maxWidth && line.length > 0) {
                    textContext.fillText(line, 256, y);
                    line = word + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            });
            textContext.fillText(line, 256, y);
            
            // Create texture from canvas
            const textTexture = new THREE.CanvasTexture(textCanvas);
            const textMaterial = new THREE.MeshBasicMaterial({
                map: textTexture,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            });
            const textGeometry = new THREE.PlaneGeometry(5, 1.25);
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Position throughout the scene
            const radius = 8 + Math.random() * 5;
            const angle = (index / manifestoChunks.length) * Math.PI * 2 + Math.random() * 0.5;
            const height = -3 + Math.sin(index * 0.5) * 8 + Math.random() * 4;
            
            textMesh.position.set(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            );
            
            // Rotate to face center
            textMesh.lookAt(0, height, 0);
            
            // Add animation data
            textMesh.userData = {
                orbitSpeed: 0.001 + Math.random() * 0.003,
                orbitRadius: radius,
                orbitCenterY: height,
                startAngle: angle,
                pulseSpeed: 0.2 + Math.random() * 0.3,
                originalScale: 1.0
            };
            
            textGroup.add(textMesh);
        });
        
        floatingTexts = textGroup;
        scene.add(floatingTexts);
    }
    
    // Create ambient particle system
    function createParticleSystem() {
        const count = 1500;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            // Position particles in a sphere
            const radius = 10 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 2; // Center vertically
            positions[i3 + 2] = radius * Math.cos(phi);
            
            // Set random velocities
            velocities[i3] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
            
            // Vary particle sizes
            sizes[i] = 0.03 + Math.random() * 0.05;
            
            // Create subtle color variations
            const colorHue = Math.random();
            const colorObject = new THREE.Color().setHSL(colorHue, 0.5, 0.7);
            colors[i3] = colorObject.r;
            colors[i3 + 1] = colorObject.g;
            colors[i3 + 2] = colorObject.b;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create custom shader for particles
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pointTexture: { value: createPointTexture() }
            },
            vertexShader: `
                uniform float time;
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                
                // Simplified Perlin noise function for movement
                float noise(vec3 p) {
                    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
                }
                
                void main() {
                    vColor = color;
                    
                    // Create organic movement
                    float noise = noise(vec3(position.x * 0.05, position.y * 0.05, time * 0.1));
                    
                    // Apply subtle movement
                    vec3 newPosition = position;
                    newPosition.x += noise * 0.2;
                    newPosition.y += noise * 0.2;
                    newPosition.z += noise * 0.2;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                    
                    // Dynamic size based on time
                    float sizePulse = size * (1.0 + 0.2 * sin(time + position.x + position.y + position.z));
                    gl_PointSize = sizePulse * (300.0 / -mvPosition.z);
                    
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform sampler2D pointTexture;
                uniform float time;
                varying vec3 vColor;
                
                void main() {
                    // Sample texture
                    vec4 texColor = texture2D(pointTexture, gl_PointCoord);
                    
                    // Create pulsing effect
                    float pulse = 0.8 + 0.2 * sin(time * 0.5);
                    
                    // Apply color with subtle animation
                    vec3 finalColor = vColor * pulse;
                    
                    // Output with texture alpha
                    gl_FragColor = vec4(finalColor, texColor.a * 0.8);
                    
                    // Add subtle bloom at center
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist < 0.2) {
                        gl_FragColor.rgb += vec3(0.2, 0.2, 0.2) * (1.0 - dist * 5.0);
                    }
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });
        
        particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.userData = { 
            velocities: velocities,
            sizes: sizes,
            colors: colors,
            time: 0
        };
        
        scene.add(particleSystem);
    }
    
    // Create connection lines between particles
    function createConnectionSystem() {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        
        // Initialize with empty positions
        const positions = new Float32Array(2000 * 3 * 2); // Space for 2000 lines
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setDrawRange(0, 0); // Initially draw nothing
        
        connectionSystem = new THREE.LineSegments(geometry, material);
        connectionSystem.userData = { 
            updateConnections: true,
            maxConnections: 2000,
            connectionDistance: 2.5
        };
        
        scene.add(connectionSystem);
    }
    
    // Film grain effect
    function createFilmGrain() {
        const grain = document.querySelector('.grain');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resize();
        window.addEventListener('resize', resize);
        
        function loop() {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = Math.random() * 15;
            }
            
            ctx.putImageData(imageData, 0, 0);
            grain.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
            requestAnimationFrame(loop);
        }
        
        loop();
    }
    
    // Custom cursor
    function createCustomCursor() {
        const cursorContainer = document.createElement('div');
        cursorContainer.style.position = 'fixed';
        cursorContainer.style.pointerEvents = 'none';
        cursorContainer.style.zIndex = '9999';
        cursorContainer.style.width = '24px';
        cursorContainer.style.height = '24px';
        cursorContainer.style.transform = 'translate(-50%, -50%)';
        cursorContainer.style.mixBlendMode = 'difference';
        document.body.appendChild(cursorContainer);
        
        // Outer ring
        const cursorRing = document.createElement('div');
        cursorRing.style.position = 'absolute';
        cursorRing.style.width = '100%';
        cursorRing.style.height = '100%';
        cursorRing.style.border = '1px solid white';
        cursorRing.style.borderRadius = '50%';
        cursorRing.style.transition = 'width 0.2s, height 0.2s';
        cursorContainer.appendChild(cursorRing);
        
        // Inner dot
        const cursorDot = document.createElement('div');
        cursorDot.style.position = 'absolute';
        cursorDot.style.top = '50%';
        cursorDot.style.left = '50%';
        cursorDot.style.width = '4px';
        cursorDot.style.height = '4px';
        cursorDot.style.backgroundColor = 'white';
        cursorDot.style.borderRadius = '50%';
        cursorDot.style.transform = 'translate(-50%, -50%)';
        cursorContainer.appendChild(cursorDot);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursorContainer.style.left = `${e.clientX}px`;
            cursorContainer.style.top = `${e.clientY}px`;
        });
        
        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .paint-button, .big-button');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '32px';
                cursorRing.style.height = '32px';
                cursorRing.style.border = '1px solid #ffffff';
                cursorDot.style.backgroundColor = '#ffffff';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '100%';
                cursorRing.style.height = '100%';
                cursorRing.style.border = '1px solid white';
                cursorDot.style.backgroundColor = 'white';
            });
        });
        
        // Pulse on click
        document.addEventListener('mousedown', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorDot.style.opacity = '0.5';
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.opacity = '1';
        });
        
        customCursor = cursorContainer;
    }
    
    // Create floating DOM text elements
    function createFloatingDOMTexts() {
        // Extract fragments from manifesto
        const manifestoFragments = manifestoText
            .split(/[.?!]/)
            .filter(fragment => fragment.trim().length > 0)
            .map(fragment => fragment.trim())
            .filter(fragment => fragment.length < 80);
        
        // Create text elements
        for (let i = 0; i < 20; i++) {
            const fragment = manifestoFragments[Math.floor(Math.random() * manifestoFragments.length)];
            
            const textElement = document.createElement('div');
            textElement.className = 'floating-text';
            
            // For some elements, extract key words for impact
            if (Math.random() > 0.7) {
                const words = fragment.split(' ');
                const keyWords = words.filter(word => word.length > 4).slice(0, 3);
                textElement.textContent = keyWords.join(' ') + '...';
            } else {
                textElement.textContent = fragment;
            }
            
            // Create visual variety
            textElement.style.fontSize = (8 + Math.random() * 12) + 'px';
            textElement.style.opacity = 0.1 + Math.random() * 0.7;
            textElement.style.letterSpacing = Math.random() > 0.7 ? (Math.random() * 2) + 'px' : 'normal';
            textElement.style.fontStyle = Math.random() > 0.7 ? 'italic' : 'normal';
            
            // Position elements
            textElement.style.left = (Math.random() * 80 + 10) + '%';
            textElement.style.top = (Math.random() * 80 + 10) + '%';
            
            // Store animation data
            textElement.dataset.speedX = (Math.random() - 0.5) * 0.05;
            textElement.dataset.speedY = (Math.random() - 0.5) * 0.05;
            textElement.dataset.x = parseFloat(textElement.style.left);
            textElement.dataset.y = parseFloat(textElement.style.top);
            textElement.dataset.pulseSpeed = 0.2 + Math.random() * 0.5;
            textElement.dataset.pulseTime = Math.random() * Math.PI * 2;
            
            document.body.appendChild(textElement);
            floatingTextElements.push(textElement);
        }
    }
    
    // Update particle system
    function updateParticleSystem(system, delta) {
        const positions = system.geometry.attributes.position.array;
        const velocities = system.userData.velocities;
        const time = system.userData.time + delta;
        system.userData.time = time;
        
        // Update uniforms
        if (system.material.uniforms && system.material.uniforms.time) {
            system.material.uniforms.time.value = time;
        }
        
        for (let i = 0; i < positions.length; i += 3) {
            // Update positions
            positions[i] += velocities[i] * delta * 60;
            positions[i + 1] += velocities[i + 1] * delta * 60;
            positions[i + 2] += velocities[i + 2] * delta * 60;
            
            // Contain particles within sphere
            const distance = Math.sqrt(
                positions[i] * positions[i] + 
                positions[i + 1] * positions[i + 1] + 
                positions[i + 2] * positions[i + 2]
            );
            
            if (distance > 15) {
                // Reset particles that go too far
                const scale = 15 / distance;
                positions[i] *= scale;
                positions[i + 1] *= scale;
                positions[i + 2] *= scale;
                
                // Reverse velocity with randomness
                velocities[i] = -velocities[i] * 0.8 + (Math.random() - 0.5) * 0.01;
                velocities[i + 1] = -velocities[i + 1] * 0.8 + (Math.random() - 0.5) * 0.01;
                velocities[i + 2] = -velocities[i + 2] * 0.8 + (Math.random() - 0.5) * 0.01;
            }
            
            // Subtle attraction to center
            velocities[i] -= positions[i] * 0.0001;
            velocities[i + 1] -= positions[i + 1] * 0.0001;
            velocities[i + 2] -= positions[i + 2] * 0.0001;
            
            // Add subtle swirling effect
            const swirl = 0.0001;
            const temp = velocities[i];
            velocities[i] += velocities[i + 2] * swirl;
            velocities[i + 2] -= temp * swirl;
        }
        
        system.geometry.attributes.position.needsUpdate = true;
    }
    
    // Update connections between particles
    function updateParticleConnections(particleSystem, connectionSystem) {
        const particlePositions = particleSystem.geometry.attributes.position.array;
        const connectionPositions = connectionSystem.geometry.attributes.position.array;
        
        const maxConnections = connectionSystem.userData.maxConnections;
        const connectionDistance = connectionSystem.userData.connectionDistance;
        
        let connectionCount = 0;
        
        // Sample particles to create connections
        for (let i = 0; i < particlePositions.length; i += 9) {
            const i3 = i;
            
            for (let j = i + 3; j < particlePositions.length; j += 9) {
                if (connectionCount >= maxConnections) break;
                
                // Calculate distance
                const dx = particlePositions[i3] - particlePositions[j];
                const dy = particlePositions[i3 + 1] - particlePositions[j + 1];
                const dz = particlePositions[i3 + 2] - particlePositions[j + 2];
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                if (dist < connectionDistance) {
                    // Create line between particles
                    const connectionIndex = connectionCount * 6;
                    
                    // First point
                    connectionPositions[connectionIndex] = particlePositions[i3];
                    connectionPositions[connectionIndex + 1] = particlePositions[i3 + 1];
                    connectionPositions[connectionIndex + 2] = particlePositions[i3 + 2];
                    
                    // Second point
                    connectionPositions[connectionIndex + 3] = particlePositions[j];
                    connectionPositions[connectionIndex + 4] = particlePositions[j + 1];
                    connectionPositions[connectionIndex + 5] = particlePositions[j + 2];
                    
                    connectionCount++;
                }
            }
        }
        
        // Update draw range
        connectionSystem.geometry.setDrawRange(0, connectionCount * 2);
        connectionSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Update connections between ritual and figures
    function updateRitualConnections(ritual, ethanFigure, noelFigure) {
        // Get connection lines
        const connectionLines = ritual.children.find(child => child.userData && child.userData.updateConnections);
        if (!connectionLines) return;
        
        const positions = [];
        
        // Create connection points on ritual
        const ritualPoints = [
            new THREE.Vector3(0, 1, 0),   // Base
            new THREE.Vector3(0, 3, 0),   // Middle
            new THREE.Vector3(0, 5, 0)    // Top
        ];
        
        // Add connections to Ethan if visible
        if (ethanFigure.visible) {
            const ethanPoints = [
                new THREE.Vector3(ethanFigure.position.x, ethanFigure.position.y + 1.5, ethanFigure.position.z),
                new THREE.Vector3(ethanFigure.position.x, ethanFigure.position.y + 3.2, ethanFigure.position.z)
            ];
            
            // Connect ritual to Ethan
            ritualPoints.forEach(ritualPoint => {
                ethanPoints.forEach(ethanPoint => {
                    positions.push(ritualPoint.x, ritualPoint.y, ritualPoint.z);
                    positions.push(ethanPoint.x, ethanPoint.y, ethanPoint.z);
                });
            });
        }
        
        // Add connections to Noel if visible
        if (noelFigure.visible) {
            const noelPoints = [
                new THREE.Vector3(noelFigure.position.x, noelFigure.position.y + 1.5, noelFigure.position.z),
                new THREE.Vector3(noelFigure.position.x, noelFigure.position.y + 3.2, noelFigure.position.z)
            ];
            
            // Connect ritual to Noel
            ritualPoints.forEach(ritualPoint => {
                noelPoints.forEach(noelPoint => {
                    positions.push(ritualPoint.x, ritualPoint.y, ritualPoint.z);
                    positions.push(noelPoint.x, noelPoint.y, noelPoint.z);
                });
            });
        }
        
        // Update geometry
        if (positions.length > 0) {
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            connectionLines.geometry.dispose();
            connectionLines.geometry = geometry;
        }
    }
    
    // Window resize handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Create a point texture for particles
    function createPointTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        // Create gradient
        const gradient = context.createRadialGradient(
            32, 32, 0, 32, 32, 32
        );
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(0.7, 'rgba(255,255,255,0.3)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        return texture;
    }
    
    // Create a solid texture
    function createSolidTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, 2, 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        return texture;
    }
    
    // Emit text particles from positions
    function emitManifestoParticle(x, y, z) {
        // Create DOM element
        const particle = document.createElement('div');
        particle.className = 'floating-text';
        
        // Get random fragment
        const manifestoFragments = manifestoText.split(/[.?!]/).filter(fragment => fragment.trim().length > 0);
        const fragment = manifestoFragments[Math.floor(Math.random() * manifestoFragments.length)].trim();
        
        // Use short part
        const words = fragment.split(' ');
        particle.textContent = words.slice(0, 3).join(' ') + '...';
        
        // Set style
        particle.style.fontSize = '10px';
        particle.style.opacity = '0.8';
        
        // Convert 3D position to screen
        const vector = new THREE.Vector3(x, y, z);
        vector.project(camera);
        
        const screenX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (vector.y * -0.5 + 0.5) * window.innerHeight;
        
        particle.style.left = screenX + 'px';
        particle.style.top = screenY + 'px';
        
        // Animation data
        particle.dataset.speedX = (Math.random() - 0.5) * 2;
        particle.dataset.speedY = -1 - Math.random() * 2; // Upward
        particle.dataset.x = screenX;
        particle.dataset.y = screenY;
        particle.dataset.life = 100; // Lifetime
        
        document.body.appendChild(particle);
        
        // Animate and remove
        const animateParticle = () => {
            // Move
            let x = parseFloat(particle.dataset.x) + parseFloat(particle.dataset.speedX);
            let y = parseFloat(particle.dataset.y) + parseFloat(particle.dataset.speedY);
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            particle.dataset.x = x;
            particle.dataset.y = y;
            
            // Reduce life and fade
            particle.dataset.life = parseInt(particle.dataset.life) - 1;
            particle.style.opacity = parseInt(particle.dataset.life) / 100;
            
            if (parseInt(particle.dataset.life) > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animateParticle);
    }
    
    // Create summoning effect
    function createSummoningEffect(x, y, z, isSummoning) {
        // Create particles
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        // Initial positions
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            
            // Color based on summoning
            const color = isSummoning ? 
                new THREE.Color(0xffffff).getHSL({}) : 
                new THREE.Color(0x666666).getHSL({});
                
            colors[i3] = color.h;
            colors[i3 + 1] = color.s;
            colors[i3 + 2] = color.l;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        
        // Create velocities
        const velocities = [];
        for (let i = 0; i < particleCount; i++) {
            const direction = isSummoning ? 1 : -1;
            velocities.push({
                x: (Math.random() - 0.5) * 0.2 * direction,
                y: (Math.random() - 0.5) * 0.2 * direction + (isSummoning ? 0.05 : -0.05),
                z: (Math.random() - 0.5) * 0.2 * direction
            });
        }
        
        // Animate particles
        let lifetime = 0;
        function animateParticles() {
            lifetime += 0.02;
            
            const positions = particles.geometry.attributes.position.array;
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;
                
                // Add gravity/anti-gravity
                velocities[i].y += isSummoning ? -0.002 : 0.002;
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
            
            // Fade out
            particles.material.opacity = Math.max(0, 0.8 - lifetime);
            
            if (lifetime < 1) {
                requestAnimationFrame(animateParticles);
            } else {
                scene.remove(particles);
                particles.geometry.dispose();
                particles.material.dispose();
            }
        }
        
        animateParticles();
        
        // Add flash of light
        const flashLight = new THREE.PointLight(
            isSummoning ? 0xffffff : 0x333333, 
            2, 
            5
        );
        flashLight.position.set(x, y, z);
        scene.add(flashLight);
        
        // Animate flash
        let flashIntensity = 2;
        function animateFlash() {
            flashIntensity -= 0.1;
            flashLight.intensity = Math.max(0, flashIntensity);
            
            if (flashIntensity > 0) {
                requestAnimationFrame(animateFlash);
            } else {
                scene.remove(flashLight);
            }
        }
        
        animateFlash();
        
        // Create ripple in DOM
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = `2px solid ${isSummoning ? 'white' : '#666'}`;
        ripple.style.zIndex = '4';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.opacity = '0.8';
        
        // Convert 3D position to screen
        const vector = new THREE.Vector3(x, y, z);
        vector.project(camera);
        
        const screenX = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const screenY = (vector.y * -0.5 + 0.5) * window.innerHeight;
        
        ripple.style.left = `${screenX}px`;
        ripple.style.top = `${screenY}px`;
        
        document.body.appendChild(ripple);
        
        // Animate ripple
        let rippleSize = 20;
        let rippleOpacity = 0.8;
        function animateRipple() {
            rippleSize += 5;
            rippleOpacity -= 0.02;
            
            ripple.style.width = `${rippleSize}px`;
            ripple.style.height = `${rippleSize}px`;
            ripple.style.opacity = rippleOpacity.toString();
            
            if (rippleOpacity > 0) {
                requestAnimationFrame(animateRipple);
            } else {
                ripple.remove();
            }
        }
        
        animateRipple();

        // Dispatch event for audio system
        window.dispatchEvent(new CustomEvent('summoningEffect', {
            detail: { type: isSummoning ? 'summon' : 'dismiss' }
        }));
    }
    
    // Create visual glitch effect
    // Create visual glitch effect
    function createGlitchEffect(intensity = 1) {
        // Only in active ritual
        if (!ritualActive) return;
        
        // Create glitch overlay
        const glitch = document.createElement('div');
        glitch.style.position = 'fixed';
        glitch.style.top = '0';
        glitch.style.left = '0';
        glitch.style.width = '100%';
        glitch.style.height = '100%';
        glitch.style.backgroundColor = 'rgba(255,255,255,0.05)';
        glitch.style.zIndex = '4';
        glitch.style.mixBlendMode = 'difference';
        glitch.style.pointerEvents = 'none';
        document.body.appendChild(glitch);
        
        // Apply glitch animation
        glitch.classList.add('glitch');
        
        // Random duration
        const duration = 50 + Math.random() * 200 * intensity;
        setTimeout(() => glitch.remove(), duration);
        
        // Apply more severe effects for higher intensity
        if (Math.random() < 0.2 * intensity) {
            // Displace random text plane
            if (floatingTexts && floatingTexts.children.length > 0) {
                const randomIndex = Math.floor(Math.random() * floatingTexts.children.length);
                const randomPlane = floatingTexts.children[randomIndex];
                
                // Store original position
                const originalPosition = randomPlane.position.clone();
                
                // Displace
                randomPlane.position.add(new THREE.Vector3(
                    (Math.random() - 0.5) * 2 * intensity,
                    (Math.random() - 0.5) * 2 * intensity,
                    (Math.random() - 0.5) * 2 * intensity
                ));
                
                // Restore after short time
                setTimeout(() => {
                    randomPlane.position.copy(originalPosition);
                }, duration);
            }
            
            // Create chromatic aberration effect
            const aberrationLayers = [];
            
            // RGB displacement layers
            ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'].forEach((color, index) => {
                const layer = document.createElement('div');
                layer.style.position = 'fixed';
                layer.style.top = '0';
                layer.style.left = '0';
                layer.style.width = '100%';
                layer.style.height = '100%';
                layer.style.backgroundColor = 'transparent';
                layer.style.boxShadow = `inset 0 0 50px ${color}`;
                layer.style.transform = `translate(${(index-1) * 5 * intensity}px, 0)`;
                layer.style.pointerEvents = 'none';
                layer.style.zIndex = '3';
                layer.style.opacity = '0.05';
                layer.style.mixBlendMode = 'screen';
                
                document.body.appendChild(layer);
                aberrationLayers.push(layer);
            });
            
            // Remove aberration after duration
            setTimeout(() => {
                aberrationLayers.forEach(layer => layer.remove());
            }, duration);
        }
        
        // Dispatch event for audio system
        window.dispatchEvent(new CustomEvent('glitchEffect', {
            detail: { intensity: intensity }
        }));
    }
    
    // Create camera transition effect
    function createCameraTransitionEffect() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'rgba(255,255,255,0.2)';
        flash.style.zIndex = '5';
        flash.style.opacity = '0.7';
        flash.style.transition = 'opacity 1s';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 1000);
        }, 100);
    }
    
    // Cubic easing function for camera transitions
    function cubicEaseInOut(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // Transition camera to new mode
    function transitionCameraToMode(newMode) {
        // Store current camera position and target
        previousCameraPosition.copy(camera.position);
        previousCameraLookAt.copy(new THREE.Vector3(0, 2, 0));
        
        // Get current camera lookAt target
        const currentMatrix = new THREE.Matrix4();
        currentMatrix.extractRotation(camera.matrix);
        const dir = new THREE.Vector3(0, 0, -1);
        dir.applyMatrix4(currentMatrix);
        dir.multiplyScalar(10);
        previousCameraLookAt.copy(camera.position).add(dir);
        
        // Set target position based on mode
        if (newMode === 'orbit') {
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                Math.sin(angle) * 15,
                5 + Math.random() * 2,
                Math.cos(angle) * 15
            );
            targetCameraLookAt.set(0, 2, 0);
        } else if (newMode === 'focus-ethan') {
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                ethanFigure.position.x + Math.sin(angle) * 4,
                3 + Math.random(),
                ethanFigure.position.z + Math.cos(angle) * 4
            );
            targetCameraLookAt.set(ethanFigure.position.x, ethanFigure.position.y + 3, ethanFigure.position.z);
        } else if (newMode === 'focus-noel') {
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                noelFigure.position.x + Math.sin(angle) * 4,
                3 + Math.random(),
                noelFigure.position.z + Math.cos(angle) * 4
            );
            targetCameraLookAt.set(noelFigure.position.x, noelFigure.position.y + 3, noelFigure.position.z);
        } else if (newMode === 'ritual-close') {
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                Math.sin(angle) * 3,
                2 + Math.random() * 1,
                Math.cos(angle) * 3
            );
            targetCameraLookAt.set(0, 2.5, 0);
        } else if (newMode === 'birds-eye') {
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                Math.sin(angle) * 15,
                12 + Math.random() * 2,
                Math.cos(angle) * 15
            );
            targetCameraLookAt.set(0, 0, 0);
        } else if (newMode === 'dialogue') {
            const midpoint = new THREE.Vector3(
                (ethanFigure.position.x + noelFigure.position.x) / 2,
                (ethanFigure.position.y + noelFigure.position.y) / 2 + 3,
                (ethanFigure.position.z + noelFigure.position.z) / 2
            );
            
            const angle = Math.random() * Math.PI * 2;
            targetCameraPosition.set(
                midpoint.x + Math.sin(angle) * 10,
                midpoint.y + Math.random() * 1,
                midpoint.z + Math.cos(angle) * 10
            );
            targetCameraLookAt.copy(midpoint);
        }
        
        // Start transition
        cameraMode = newMode;
        cameraTransitioning = true;
        cameraTweenProgress = 0;
        
        // Create visual effect
        createCameraTransitionEffect();
    }
    
    // Main animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        elapsedTime += delta;
        
        // Update shader time uniforms
        scene.traverse(object => {
            if (object.material && object.material.uniforms && object.material.uniforms.time) {
                object.material.uniforms.time.value = elapsedTime;
            }
            
            // Update text on figures
            if ((object === ethanFigure || object === noelFigure) && 
                object.visible && object.userData.manifestoMesh) {
                object.userData.manifestoMesh.userData.updateText(elapsedTime);
            }
        });
        
        // Update timer display
        const hours = Math.floor(elapsedTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((elapsedTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(elapsedTime % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds} / 72:00:00`;
        
        // Animate central ritual
        centralRitual.children.forEach(child => {
            if (child.userData.rotationAxis) {
                // Rotate rings around custom axes
                child.rotateOnAxis(child.userData.rotationAxis, child.userData.rotationSpeed);
            }
            
            if (child.userData.orbitSpeed) {
                // Orbit symbols around center
                const newAngle = child.userData.startAngle + elapsedTime * child.userData.orbitSpeed;
                child.position.x = Math.cos(newAngle) * child.userData.orbitRadius;
                child.position.z = Math.sin(newAngle) * child.userData.orbitRadius;
                
                // Add vertical motion
                child.position.y = child.userData.orbitCenterY + 
                    Math.sin(elapsedTime * child.userData.pulseSpeed) * 0.2;
                
                // Rotate symbols
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
                child.rotation.z += 0.01;
            }
            
            if (child.userData.pulseSpeed) {
                // Pulse aura
                const scale = 1 + Math.sin(elapsedTime * child.userData.pulseSpeed) * 0.1;
                child.scale.set(scale, scale, scale);
            }
            
            // Update connections when ritual is active
            if (child.userData.updateConnections && ritualActive) {
                updateRitualConnections(centralRitual, ethanFigure, noelFigure);
            }
        });
        
        // Animate figures if active
        [ethanFigure, noelFigure].forEach(figure => {
            if (figure.visible) {
                // Hovering motion
                figure.position.y = Math.sin(elapsedTime * figure.userData.pulseSpeed) * figure.userData.hoverHeight;
                
                // Slow rotation
                figure.rotation.y += figure.userData.rotationSpeed;
                
                // Pulsating glow
                figure.children.forEach(part => {
                    if (part.material && part.material.opacity !== undefined) {
                        part.material.opacity = 0.6 + Math.sin(elapsedTime * 2) * 0.2;
                        
                        // Subtle color shift
                        const hue = (Math.sin(elapsedTime * 0.1) * 0.05) + 
                                    (figure === ethanFigure ? 0.1 : 0.6);
                        if (part.material.color) {
                            part.material.color.setHSL(hue, 0.5, 0.7);
                        }
                    }
                });
                
                // Emit text particles
                if (Math.random() < 0.1) {
                    emitManifestoParticle(
                        figure.position.x,
                        figure.position.y + 2,
                        figure.position.z
                    );
                }
            }
        });
        
        // Animate floating text planes
        floatingTexts.children.forEach(textPlane => {
            // Orbit around center
            const newAngle = textPlane.userData.startAngle + elapsedTime * textPlane.userData.orbitSpeed;
            textPlane.position.x = Math.cos(newAngle) * textPlane.userData.orbitRadius;
            textPlane.position.z = Math.sin(newAngle) * textPlane.userData.orbitRadius;
            
            // Subtle vertical motion
            textPlane.position.y = textPlane.userData.orbitCenterY + 
                Math.sin(elapsedTime * textPlane.userData.pulseSpeed) * 0.3;
            
            // Face camera
            textPlane.lookAt(camera.position);
            
            // Scale based on proximity to camera
            const distance = textPlane.position.distanceTo(camera.position);
            const proximityScale = Math.max(0.8, Math.min(1.2, 15 / distance));
            textPlane.scale.set(
                textPlane.userData.originalScale * proximityScale,
                textPlane.userData.originalScale * proximityScale,
                textPlane.userData.originalScale
            );
            
            // Fade based on distance
            textPlane.material.opacity = Math.max(0.1, Math.min(0.8, 10 / distance));
        });
        
        // Update particle system
        if (particleSystem) {
            updateParticleSystem(particleSystem, delta);
        }
        
        // Update connection lines
        if (elapsedTime % 0.2 < delta && connectionSystem) {
            updateParticleConnections(particleSystem, connectionSystem);
        }
        
        // Animate DOM floating texts
        floatingTextElements.forEach(element => {
            // Move text
            let x = parseFloat(element.dataset.x) + parseFloat(element.dataset.speedX);
            let y = parseFloat(element.dataset.y) + parseFloat(element.dataset.speedY);
            
            // Wrap around edges
            if (x < 0) x = 100;
            if (x > 100) x = 0;
            if (y < 0) y = 100;
            if (y > 100) y = 0;
            
            element.style.left = x + '%';
            element.style.top = y + '%';
            
            element.dataset.x = x;
            element.dataset.y = y;
            
            // Pulse opacity
            element.dataset.pulseTime = parseFloat(element.dataset.pulseTime) + 
                                        parseFloat(element.dataset.pulseSpeed) * delta;
            const pulse = 0.5 + 0.3 * Math.sin(parseFloat(element.dataset.pulseTime));
            element.style.opacity = pulse.toString();
        });
        
        // Camera movement based on mode
        if (cameraTransitioning) {
            // Smooth transition between positions
            cameraTweenProgress = Math.min(1, cameraTweenProgress + delta * 2);
            
            // Use cubic easing
            const t = cubicEaseInOut(cameraTweenProgress);
            
            // Interpolate position
            camera.position.lerpVectors(previousCameraPosition, targetCameraPosition, t);
            
            // Interpolate lookAt
            const currentLookAt = new THREE.Vector3();
            currentLookAt.lerpVectors(previousCameraLookAt, targetCameraLookAt, t);
            camera.lookAt(currentLookAt);
            
            // End transition
            if (cameraTweenProgress >= 1) {
                cameraTransitioning = false;
            }
        } else {
            // Regular camera movement based on mode
            if (cameraMode === 'orbit') {
                // Standard orbit with vertical movement
                camera.position.x = Math.sin(elapsedTime * 0.05) * 15;
                camera.position.z = Math.cos(elapsedTime * 0.05) * 15;
                camera.position.y = 5 + Math.sin(elapsedTime * 0.02) * 2;
                camera.lookAt(0, 2, 0);
            } else if (cameraMode === 'focus-ethan') {
                // Focus on Ethan with orbital movement
                const orbitRadius = 4;
                const orbitSpeed = 0.1;
                camera.position.x = ethanFigure.position.x + Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
                camera.position.z = ethanFigure.position.z + Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
                camera.position.y = 3 + Math.sin(elapsedTime * 0.2) * 0.5;
                
                // Look at Ethan's head
                const lookTarget = new THREE.Vector3(
                    ethanFigure.position.x,
                    ethanFigure.position.y + 3 + Math.sin(elapsedTime * 0.5) * 0.2,
                    ethanFigure.position.z
                );
                camera.lookAt(lookTarget);
            } else if (cameraMode === 'focus-noel') {
                // Focus on Noel with orbital movement
                const orbitRadius = 4;
                const orbitSpeed = 0.1;
                camera.position.x = noelFigure.position.x + Math.sin(elapsedTime * orbitSpeed) * orbitRadius;
                camera.position.z = noelFigure.position.z + Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
                camera.position.y = 3 + Math.sin(elapsedTime * 0.2) * 0.5;
                
                // Look at Noel's head
                const lookTarget = new THREE.Vector3(
                    noelFigure.position.x,
                    noelFigure.position.y + 3 + Math.sin(elapsedTime * 0.5) * 0.2,
                    noelFigure.position.z
                );
                camera.lookAt(lookTarget);
            } else if (cameraMode === 'ritual-close') {
                // Close-up of central ritual
                const radius = 3 + Math.sin(elapsedTime * 0.1) * 0.5;
                const height = 2 + Math.sin(elapsedTime * 0.08) * 1;
                const angle = elapsedTime * 0.03;
                
                camera.position.x = Math.sin(angle) * radius;
                camera.position.z = Math.cos(angle) * radius;
                camera.position.y = height;
                
                // Look at ritual center
                camera.lookAt(0, 2.5 + Math.sin(elapsedTime * 0.2) * 0.3, 0);
            } else if (cameraMode === 'birds-eye') {
                // Bird's eye view circling scene
                const radius = 15;
                const height = 12 + Math.sin(elapsedTime * 0.05) * 2;
                const angle = elapsedTime * 0.02;
                
                camera.position.x = Math.sin(angle) * radius;
                camera.position.z = Math.cos(angle) * radius;
                camera.position.y = height;
                
                camera.lookAt(0, 0, 0);
            } else if (cameraMode === 'dialogue') {
                // Camera showing both figures
                const midpoint = new THREE.Vector3(
                    (ethanFigure.position.x + noelFigure.position.x) / 2,
                    (ethanFigure.position.y + noelFigure.position.y) / 2 + 3,
                    (ethanFigure.position.z + noelFigure.position.z) / 2
                );
                
                const angle = elapsedTime * 0.01;
                const radius = 10;
                
                camera.position.x = midpoint.x + Math.sin(angle) * radius;
                camera.position.z = midpoint.z + Math.cos(angle) * radius;
                camera.position.y = midpoint.y + Math.sin(elapsedTime * 0.03) * 1;
                
                camera.lookAt(midpoint);
            }
        }
        
        // Occasionally change camera mode
        if (ritualActive && Math.random() < 0.001) {
            const modes = ['orbit', 'focus-ethan', 'focus-noel', 'ritual-close', 'birds-eye', 'dialogue'];
            const newMode = modes[Math.floor(Math.random() * modes.length)];
            
            // Don't transition to same mode
            if (newMode !== cameraMode) {
                transitionCameraToMode(newMode);
            }
        }
        
        // Update center light color based on ritual progression
        const ritualProgress = Math.min(1, elapsedTime / (72 * 3600));
        const hue = ritualProgress * 0.5; // Shift from red to blue-green
        scene.userData.lights.centerLight.color.setHSL(hue, 0.7, 0.5);
        
        // Flicker fire light
        scene.userData.lights.fireLight.intensity = 1.2 + Math.sin(elapsedTime * 3) * 0.3;
        
        // Occasional glitch effects
        if (Math.random() < 0.005 && ritualActive) {
            createGlitchEffect(Math.random() * 0.5 + 0.5);
        }
        
        renderer.render(scene, camera);
    }
    
    // Public API
    return {
        init: initScene,
        createSummoningEffect: createSummoningEffect,
        transitionCameraToMode: transitionCameraToMode,
        createGlitchEffect: createGlitchEffect,
        emitManifestoParticle: emitManifestoParticle,
        getCameraMode: function() { return cameraMode; },
        getElapsedTime: function() { return elapsedTime; },
        isRitualActive: function() { return ritualActive; },
        setRitualActive: function(active) { ritualActive = active; },
        resetElapsedTime: function() { elapsedTime = 0; },
        showFigure: function(figureName, visible) {
            if (figureName === 'ethan') {
                ethanFigure.visible = visible;
                scene.userData.lights.leftLight.intensity = visible ? 1.0 : 0.2;
            } else if (figureName === 'noel') {
                noelFigure.visible = visible;
                scene.userData.lights.rightLight.intensity = visible ? 1.0 : 0.2;
            }
            updateRitualConnections(centralRitual, ethanFigure, noelFigure);
        }
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Fade out page transition overlay
    setTimeout(() => {
        document.getElementById('page-transition').style.opacity = '0';
    }, 500);
});

// Export for use in other modules
window.VisualEffects = VisualEffects;
