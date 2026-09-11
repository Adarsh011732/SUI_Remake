/**
 * FluidBLCX — Sovereign Web3 Execution Architecture
 * Three.js + Real 3D Extruded Sui Logo + Colourful Candlestick Engine + Walrus Image-to-Tree + AI Cyber Hand & Model
 */

// ── PROCEDURAL SYNTHESIZER (WEB AUDIO API) ──
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainLevel = 0.12) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(gainLevel, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playImmediateExplosion() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  }

  playPtbPulse() {
    this.playTone(520, 'triangle', 0.15, 0.15);
    setTimeout(() => this.playTone(1040, 'sine', 0.25, 0.18), 70);
  }

  playTradeTick() {
    this.playTone(1400 + Math.random() * 400, 'sine', 0.04, 0.04);
  }

  playSurgeRise() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 1.2);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.25);
  }

  playLockUnlock() {
    this.playTone(320, 'square', 0.08, 0.2);
    setTimeout(() => this.playTone(640, 'triangle', 0.2, 0.15), 90);
  }

  playGreenBlockBurst() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.55);

    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);

    // Shattering glass micro-burst
    setTimeout(() => {
      this.playTone(1750, 'square', 0.08, 0.15);
      setTimeout(() => this.playTone(2400, 'sine', 0.12, 0.12), 40);
    }, 45);
  }

  playTreeSynthesize() {
    const freqs = [440, 554, 659, 880, 1108];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.18, 0.08), i * 60);
    });
  }

  playShieldDeflection() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1080, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }
}

const audio = new CyberAudioEngine();

// ── GLOBAL STATE ──
const state = {
  currentLevel: 0,
  levels: [
    { id: 'section-intro', label: 'GENESIS BLOCK' },
    { id: 'section-sui', label: 'LEVEL 01 / SUI BLOCKCHAIN CORE' },
    { id: 'section-hft', label: 'LEVEL 02 / DEEPBOOK HFT ENGINE' },
    { id: 'section-walrus', label: 'LEVEL 03 / WALRUS ENCRYPTED VAULT' },
    { id: 'section-ai', label: 'LEVEL 04 / AI SENTINEL DEFENSE' }
  ],
  isBlockDetonated: false,
  hftSurgeTriggered: false,
  threatsIntercepted: 0
};

// ── THREE.JS SCENE SETUP ──
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.016);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 14);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.shadowMap.enabled = false;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
scene.add(ambientLight);

const mainKeyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
mainKeyLight.position.set(8, 14, 12);
scene.add(mainKeyLight);

const rimLight = new THREE.DirectionalLight(0xa1a1aa, 1.6);
rimLight.position.set(-8, -10, -5);
scene.add(rimLight);

const centerPointLight = new THREE.PointLight(0x38bdf8, 2.5, 30);
centerPointLight.position.set(0, 0, 0);
scene.add(centerPointLight);

// ════════════════════════════════════════════════════════════════════════
// ── COSMIC BLOCK GALAXY (MICRO 3D CUBES AS STARS IN A BLOCKCHAIN GALAXY) ──
// ════════════════════════════════════════════════════════════════════════
const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

const blockStarCount = 1200;
const blockGeom = new THREE.BoxGeometry(1, 1, 1);

// 1. Solid Lit Cosmic Voxel Stars (InstancedMesh - Single Draw Call)
const blockMat = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 0.8,
  transparent: true,
  opacity: 0.88
});
const blockStarMesh = new THREE.InstancedMesh(blockGeom, blockMat, blockStarCount);
blockStarMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

// 2. Glowing Neon Wireframe Data Blocks (Holographic Galactic Depth)
const wireStarCount = 380;
const wireStarMat = new THREE.MeshBasicMaterial({
  wireframe: true,
  transparent: true,
  opacity: 0.52
});
const wireStarMesh = new THREE.InstancedMesh(blockGeom, wireStarMat, wireStarCount);

// Galaxy Celestial Color Palette (Cyan, Sui Azure, Sky, Violet, White, Emerald)
const galaxyColors = [
  new THREE.Color(0x38bdf8), // Electric Cyan
  new THREE.Color(0x2a82e4), // Official Sui Azure Blue
  new THREE.Color(0x60a5fa), // Luminous Sky Blue
  new THREE.Color(0xa855f7), // Galactic Violet
  new THREE.Color(0xc084fc), // Radiant Orchid
  new THREE.Color(0xffffff), // Starlight Diamond White
  new THREE.Color(0x00ff88)  // Quantum Emerald Node
];

const galaxyDummy = new THREE.Object3D();

// Distribute 1,200 small 3D cubes into a majestic galactic spiral field
for (let i = 0; i < blockStarCount; i++) {
  const t = i / blockStarCount;
  // Span the full height of all 5 scrollytelling levels (y: +24 to -138)
  const y = 24 - t * 162 + (Math.random() - 0.5) * 14;

  // 2 celestial spiral arms + cosmic dispersion
  const armAngle = (i % 2) * Math.PI;
  const spiralTurn = y * 0.075;
  const angle = spiralTurn + armAngle + (Math.random() - 0.5) * 1.1;

  // Radius from central core (keeps center clear for main level content while surrounding in 3D)
  const radius = 9 + Math.random() * 34 + (Math.random() < 0.12 ? Math.random() * 26 : 0);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 22;

  // Scale: small blocks like stars (size 0.09 to 0.28) with 8% hero crystalline cubes (size 0.45)
  let s = 0.09 + Math.random() * 0.18;
  if (Math.random() < 0.08) {
    s = 0.32 + Math.random() * 0.22;
  }

  galaxyDummy.position.set(x, y, z);
  galaxyDummy.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  galaxyDummy.scale.set(s, s, s);
  galaxyDummy.updateMatrix();

  blockStarMesh.setMatrixAt(i, galaxyDummy.matrix);

  const col = galaxyColors[Math.floor(Math.random() * galaxyColors.length)].clone();
  col.multiplyScalar(0.75 + Math.random() * 0.5);
  blockStarMesh.setColorAt(i, col);
}
blockStarMesh.instanceMatrix.needsUpdate = true;
if (blockStarMesh.instanceColor) blockStarMesh.instanceColor.needsUpdate = true;
galaxyGroup.add(blockStarMesh);

// Distribute 380 holographic wireframe cubes for shimmering cybernetic depth
for (let i = 0; i < wireStarCount; i++) {
  const y = 25 - (i / wireStarCount) * 165 + (Math.random() - 0.5) * 12;
  const angle = Math.random() * Math.PI * 2;
  const radius = 10 + Math.random() * 38;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 24;
  const s = 0.16 + Math.random() * 0.28;

  galaxyDummy.position.set(x, y, z);
  galaxyDummy.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  galaxyDummy.scale.set(s, s, s);
  galaxyDummy.updateMatrix();

  wireStarMesh.setMatrixAt(i, galaxyDummy.matrix);

  const wireCol = Math.random() < 0.55 ? new THREE.Color(0x38bdf8) : (Math.random() < 0.5 ? new THREE.Color(0xa855f7) : new THREE.Color(0x00ff88));
  wireStarMesh.setColorAt(i, wireCol);
}
wireStarMesh.instanceMatrix.needsUpdate = true;
if (wireStarMesh.instanceColor) wireStarMesh.instanceColor.needsUpdate = true;
galaxyGroup.add(wireStarMesh);

// 3. Deep Galactic Stardust Background Layer
const dustCount = 500;
const dustGeom = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 90;
  dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 165 - 40;
  dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 15;
}
dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dustMat = new THREE.PointsMaterial({
  size: 0.1,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0.35
});
const nebulaDust = new THREE.Points(dustGeom, dustMat);
galaxyGroup.add(nebulaDust);

// ── 3D CONTAINERS ──
const introMonolithGroup = new THREE.Group();
scene.add(introMonolithGroup);

const level3DGroups = {
  sui: new THREE.Group(),
  hft: new THREE.Group(),
  walrus: new THREE.Group(),
  ai: new THREE.Group()
};
Object.values(level3DGroups).forEach(g => scene.add(g));

// ════════════════════════════════════════════════════════════════════════
// 0. INTRO: MONOLITHIC 3D BLOCK (IMMEDIATE ZERO-DELAY EXPLOSION ON SCROLL)
// ════════════════════════════════════════════════════════════════════════
const subCubes = [];
const subCubeSize = 1.35;
const offsetDist = 0.72;

const cubeMat = new THREE.MeshStandardMaterial({
  color: 0x07152b,
  metalness: 0.95,
  roughness: 0.15,
  emissive: 0x0284c7,
  emissiveIntensity: 0.4
});

const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 });

const gridOffsets = [
  [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
  [-1, -1, 1],  [1, -1, 1],  [-1, 1, 1],  [1, 1, 1]
];

gridOffsets.forEach((pos, idx) => {
  const g = new THREE.Group();
  const geom = new THREE.BoxGeometry(subCubeSize, subCubeSize, subCubeSize);
  const mesh = new THREE.Mesh(geom, cubeMat.clone());
  const edges = new THREE.EdgesGeometry(geom);
  const wire = new THREE.LineSegments(edges, wireMat.clone());
  mesh.add(wire);
  g.add(mesh);

  const hX = pos[0] * offsetDist;
  const hY = pos[1] * offsetDist;
  const hZ = pos[2] * offsetDist;
  g.position.set(hX, hY, hZ);

  g.userData = {
    homePos: new THREE.Vector3(hX, hY, hZ),
    normal: new THREE.Vector3(pos[0], pos[1], pos[2]).normalize(),
    mesh: mesh
  };

  introMonolithGroup.add(g);
  subCubes.push(g);
});

// Radiant Core
const monolithCore = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.85, 1),
  new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })
);
introMonolithGroup.add(monolithCore);

// Outer Orbit Rings for Intro Block
const introRing1 = new THREE.Mesh(
  new THREE.TorusGeometry(3.2, 0.02, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
);
introRing1.rotation.x = Math.PI / 3;
introMonolithGroup.add(introRing1);

const introRing2 = new THREE.Mesh(
  new THREE.TorusGeometry(3.5, 0.015, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 })
);
introRing2.rotation.y = Math.PI / 4;
introMonolithGroup.add(introRing2);

// Detonation Shockwave Particles
const shockCount = 200;
const shockGeom = new THREE.BufferGeometry();
const shockPositions = new Float32Array(shockCount * 3);
const shockVelocities = [];

for (let i = 0; i < shockCount; i++) {
  shockPositions[i * 3] = 0;
  shockPositions[i * 3 + 1] = 0;
  shockPositions[i * 3 + 2] = 0;

  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const spd = 4.0 + Math.random() * 5.0;
  shockVelocities.push(
    new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * spd,
      Math.sin(phi) * Math.sin(theta) * spd,
      Math.cos(phi) * spd
    )
  );
}
shockGeom.setAttribute('position', new THREE.BufferAttribute(shockPositions, 3));
const shockMat = new THREE.PointsMaterial({
  size: 0.16,
  color: 0x38bdf8,
  transparent: true,
  opacity: 0
});
const shockwavePoints = new THREE.Points(shockGeom, shockMat);
introMonolithGroup.add(shockwavePoints);

// ════════════════════════════════════════════════════════════════════════
// 1. LEVEL 1: MASTERWORK 3D SUI TOKEN & EMBOSSED EMBLEM (MATCHING USER REFERENCE)
// ════════════════════════════════════════════════════════════════════════
const suiGroup = level3DGroups.sui;
suiGroup.position.set(0, -26, 0);

// Root pivot for the Sui Badge
const suiLogoPivot = new THREE.Group();
suiLogoPivot.position.set(-1.2, 0, 0);
suiGroup.add(suiLogoPivot);

// 1. Official 3D Rounded Squircle Plaque (Exact match to sui_sample_logo.png)
const badgeW = 5.6;
const badgeH = 5.6;
const badgeR = 1.35;
const badgeShape = new THREE.Shape();
const bx0 = -badgeW / 2;
const by0 = -badgeH / 2;
badgeShape.moveTo(bx0 + badgeR, by0);
badgeShape.lineTo(bx0 + badgeW - badgeR, by0);
badgeShape.quadraticCurveTo(bx0 + badgeW, by0, bx0 + badgeW, by0 + badgeR);
badgeShape.lineTo(bx0 + badgeW, by0 + badgeH - badgeR);
badgeShape.quadraticCurveTo(bx0 + badgeW, by0 + badgeH, bx0 + badgeW - badgeR, by0 + badgeH);
badgeShape.lineTo(bx0 + badgeR, by0 + badgeH);
badgeShape.quadraticCurveTo(bx0, by0 + badgeH, bx0, by0 + badgeH - badgeR);
badgeShape.lineTo(bx0, by0 + badgeR);
badgeShape.quadraticCurveTo(bx0, by0, bx0 + badgeR, by0);

const badgeGeo = new THREE.ExtrudeGeometry(badgeShape, {
  depth: 0.32,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 1,
  bevelSize: 0.1,
  bevelThickness: 0.1
});
badgeGeo.center();

const badgeMat = new THREE.MeshStandardMaterial({
  color: 0x1f74e7, // Official Vibrant Sui Azure Blue
  metalness: 0.35,
  roughness: 0.18,
  emissive: 0x0284c7,
  emissiveIntensity: 0.28
});
const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
suiLogoPivot.add(badgeMesh);

// 2. Official 3D Extruded Sui Droplet Logo (Ordered Outer Boundary + 2 Fluid Chambers)
const suiSvgPathStr = 'M19.296 8.726L12.26.123a.336.336 0 0 0-.52 0L4.704 8.726l-.023.029a9.33 9.33 0 0 0-2.07 5.872C2.612 19.803 6.816 24 12 24s9.388-4.197 9.388-9.373a9.32 9.32 0 0 0-2.07-5.871z M17.636 10.009a7.16 7.16 0 0 1 1.565 4.474 7.2 7.2 0 0 1-1.608 4.53l-.087.106-.023-.135a7 7 0 0 0-.07-.349c-.502-2.21-2.142-4.106-4.84-5.642-1.823-1.034-2.866-2.278-3.14-3.693-.177-.915-.046-1.834.209-2.62.254-.787.631-1.446.953-1.843l1.05-1.284a.46.46 0 0 1 .713 0l5.28 6.456z M6.389 9.981l.63-.77.018.142q.023.17.055.34c.408 2.136 1.862 3.917 4.294 5.297 2.114 1.203 3.345 2.586 3.7 4.103a5.3 5.3 0 0 1 .109 1.801l-.004.034-.03.014A7.2 7.2 0 0 1 12 21.67c-3.976 0-7.2-3.218-7.2-7.188 0-1.705.594-3.27 1.587-4.503z';

const svgLoader = new THREE.SVGLoader();
const suiSvgDoc = svgLoader.parse(`<svg viewBox="0 0 24 24"><path d="${suiSvgPathStr}"/></svg>`);
let suiParsedShapes = THREE.SVGLoader.createShapes(suiSvgDoc.paths[0]);

let suiMainShape = suiParsedShapes[0];
if (suiParsedShapes.length > 1) {
  // Sort by bounding box area to ensure outer boundary is main shape and inner paths are holes
  suiParsedShapes.sort((a, b) => {
    const bA = new THREE.Box2().setFromPoints(a.getPoints());
    const bB = new THREE.Box2().setFromPoints(b.getPoints());
    return (bB.max.x - bB.min.x) * (bB.max.y - bB.min.y) - (bA.max.x - bA.min.x) * (bA.max.y - bA.min.y);
  });
  suiMainShape = suiParsedShapes[0];
  for (let i = 1; i < suiParsedShapes.length; i++) {
    if (!suiMainShape.holes.includes(suiParsedShapes[i])) {
      suiMainShape.holes.push(suiParsedShapes[i]);
    }
  }
}

const realSuiLogoGeo = new THREE.ExtrudeGeometry(suiMainShape, {
  depth: 0.16,
  bevelEnabled: true,
  bevelSegments: 4,
  steps: 1,
  bevelSize: 0.05,
  bevelThickness: 0.05
});
realSuiLogoGeo.center();

const realSuiLogoMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.22,
  metalness: 0.12,
  roughness: 0.1,
  side: THREE.FrontSide
});

// Front Face: Pristine Embossed Sui Droplet (Proud of plaque front surface at z = +0.36)
const frontSuiLogoMesh = new THREE.Mesh(realSuiLogoGeo, realSuiLogoMat);
frontSuiLogoMesh.rotation.set(0, Math.PI, Math.PI);
frontSuiLogoMesh.scale.set(0.19, 0.19, 0.19);
frontSuiLogoMesh.position.set(0, 0, 0.36);
suiLogoPivot.add(frontSuiLogoMesh);

// Back Face: Identical Embossed Sui Droplet (Proud of plaque rear surface at z = -0.36)
const backSuiLogoMesh = new THREE.Mesh(realSuiLogoGeo, realSuiLogoMat);
backSuiLogoMesh.rotation.set(0, 0, Math.PI);
backSuiLogoMesh.scale.set(0.19, 0.19, 0.19);
backSuiLogoMesh.position.set(0, 0, -0.36);
suiLogoPivot.add(backSuiLogoMesh);

// Non-Intersecting Holographic Orbital Rings (Radius 4.7 & 5.2 - encircle completely outside badge bounds)
const suiHalo1 = new THREE.Mesh(
  new THREE.TorusGeometry(4.7, 0.018, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
);
suiHalo1.rotation.x = Math.PI / 3;
suiLogoPivot.add(suiHalo1);

const suiHalo2 = new THREE.Mesh(
  new THREE.TorusGeometry(5.2, 0.015, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.35 })
);
suiHalo2.rotation.y = Math.PI / 4;
suiLogoPivot.add(suiHalo2);

// Shimmering Orbiting Cosmic Particles around the Sui Token
const suiParticleCount = 45;
const suiParticleGeom = new THREE.BufferGeometry();
const suiParticlePositions = new Float32Array(suiParticleCount * 3);
for (let i = 0; i < suiParticleCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const rad = 4.2 + Math.random() * 1.6;
  suiParticlePositions[i * 3] = Math.cos(theta) * rad;
  suiParticlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
  suiParticlePositions[i * 3 + 2] = Math.sin(theta) * rad;
}
suiParticleGeom.setAttribute('position', new THREE.BufferAttribute(suiParticlePositions, 3));
const suiParticles = new THREE.Points(
  suiParticleGeom,
  new THREE.PointsMaterial({ size: 0.12, color: 0x38bdf8, transparent: true, opacity: 0.65 })
);
suiLogoPivot.add(suiParticles);

// ════════════════════════════════════════════════════════════════════════
// 2. LEVEL 2: DEEPBOOK HFT PRISMATIC MATRIX
// ════════════════════════════════════════════════════════════════════════
const hftGroup = level3DGroups.hft;
hftGroup.position.set(0, -52, 0);

const orderbookGeo = new THREE.CylinderGeometry(2.2, 2.2, 4.5, 8);
const orderbookMat = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  metalness: 0.9,
  roughness: 0.2,
  wireframe: true,
  emissive: 0x00ff88,
  emissiveIntensity: 0.3
});
const orderbookTower = new THREE.Mesh(orderbookGeo, orderbookMat);
hftGroup.add(orderbookTower);

const hftRing1 = new THREE.Mesh(
  new THREE.TorusGeometry(3.5, 0.02, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.6 })
);
hftRing1.rotation.x = Math.PI / 2.5;
hftGroup.add(hftRing1);

// ════════════════════════════════════════════════════════════════════════
// 3. LEVEL 3: WALRUS CRYPTOGRAPHIC TESSERACT (INTERACTIVE GREEN BLOCK)
// ════════════════════════════════════════════════════════════════════════
const walrusGroup = level3DGroups.walrus;
walrusGroup.position.set(0, -78, 0);

// Container for interactive 3D green vault block
const tesseractContainer = new THREE.Group();
tesseractContainer.position.set(-2.8, 0, 0);
walrusGroup.add(tesseractContainer);

// Outer green wireframe cage
const tesseractOuter = new THREE.Mesh(
  new THREE.BoxGeometry(3.2, 3.2, 3.2),
  new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true, transparent: true, opacity: 0.85 })
);
tesseractContainer.add(tesseractOuter);

// Middle wireframe cube rotating diagonally
const tesseractMiddle = new THREE.Mesh(
  new THREE.BoxGeometry(2.4, 2.4, 2.4),
  new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.5 })
);
tesseractMiddle.rotation.set(Math.PI / 4, Math.PI / 4, 0);
tesseractContainer.add(tesseractMiddle);

// Inner solid cryptographic green octahedron core
const tesseractInner = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.4, 0),
  new THREE.MeshStandardMaterial({
    color: 0x052e16,
    metalness: 0.95,
    roughness: 0.1,
    emissive: 0x22c55e,
    emissiveIntensity: 0.8
  })
);
tesseractContainer.add(tesseractInner);

// Green Burst Shards Particle System (100 green crystal sparks)
const burstCount = 100;
const burstGeom = new THREE.BufferGeometry();
const burstPositions = new Float32Array(burstCount * 3);
const burstVelocities = [];

for (let i = 0; i < burstCount; i++) {
  burstPositions[i * 3] = 0;
  burstPositions[i * 3 + 1] = 0;
  burstPositions[i * 3 + 2] = 0;

  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const spd = 5.0 + Math.random() * 7.0;
  burstVelocities.push(
    new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * spd,
      Math.sin(phi) * Math.sin(theta) * spd,
      Math.cos(phi) * spd
    )
  );
}
burstGeom.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
const burstMat = new THREE.PointsMaterial({
  size: 0.22,
  color: 0x00ff88,
  transparent: true,
  opacity: 0
});
const walrusBurstPoints = new THREE.Points(burstGeom, burstMat);
tesseractContainer.add(walrusBurstPoints);

// Orbiting green vault lock rings
const vaultRing1 = new THREE.Mesh(
  new THREE.TorusGeometry(3.6, 0.025, 16, 80),
  new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.5 })
);
vaultRing1.rotation.x = Math.PI / 3;
tesseractContainer.add(vaultRing1);

// ════════════════════════════════════════════════════════════════════════
// 4. LEVEL 4: CYBER HAND HOLDING OUT THE AI MODEL
// ════════════════════════════════════════════════════════════════════════
const aiGroup = level3DGroups.ai;
aiGroup.position.set(0, -104, 0);

const aiHandAndModelGroup = new THREE.Group();
aiGroup.add(aiHandAndModelGroup);

// The Robotic Cyber Hand
const handGroup = new THREE.Group();
handGroup.position.set(0, -1.8, 0);
handGroup.rotation.x = 0.25;
aiHandAndModelGroup.add(handGroup);

const wristGeo = new THREE.CylinderGeometry(0.9, 1.1, 2.0, 16);
const cyberMat = new THREE.MeshStandardMaterial({
  color: 0x09090b,
  metalness: 0.95,
  roughness: 0.2,
  emissive: 0x18181b
});
const cyberWireMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.75 });

const wristMesh = new THREE.Mesh(wristGeo, cyberMat);
wristMesh.position.set(0, -1.2, -0.4);
wristMesh.rotation.x = -0.3;
const wristWire = new THREE.LineSegments(new THREE.EdgesGeometry(wristGeo), cyberWireMat);
wristMesh.add(wristWire);
handGroup.add(wristMesh);

const palmGeo = new THREE.BoxGeometry(2.4, 0.45, 2.2);
const palmMesh = new THREE.Mesh(palmGeo, cyberMat);
const palmWire = new THREE.LineSegments(new THREE.EdgesGeometry(palmGeo), cyberWireMat);
palmMesh.add(palmWire);
handGroup.add(palmMesh);

const fingerConfigs = [
  { x: -1.2, y: 0.1, z: 0.4, rotY: -0.6, rotX: 0.5, len: 1.1 },
  { x: -0.8, y: 0.1, z: 1.1, rotY: -0.1, rotX: 0.4, len: 1.4 },
  { x: -0.1, y: 0.1, z: 1.2, rotY: 0.0, rotX: 0.45, len: 1.5 },
  { x: 0.6, y: 0.1, z: 1.1, rotY: 0.1, rotX: 0.4, len: 1.4 },
  { x: 1.1, y: 0.1, z: 0.8, rotY: 0.3, rotX: 0.35, len: 1.2 }
];

fingerConfigs.forEach(cfg => {
  const fingerG = new THREE.Group();
  fingerG.position.set(cfg.x, cfg.y, cfg.z);
  fingerG.rotation.y = cfg.rotY;
  fingerG.rotation.x = cfg.rotX;

  const f1Geo = new THREE.BoxGeometry(0.32, 0.3, cfg.len * 0.6);
  const f1Mesh = new THREE.Mesh(f1Geo, cyberMat);
  f1Mesh.position.set(0, 0, (cfg.len * 0.6) / 2);
  const f1Wire = new THREE.LineSegments(new THREE.EdgesGeometry(f1Geo), cyberWireMat);
  f1Mesh.add(f1Wire);
  fingerG.add(f1Mesh);

  const f2Geo = new THREE.BoxGeometry(0.28, 0.25, cfg.len * 0.5);
  const f2Mesh = new THREE.Mesh(f2Geo, cyberMat);
  f2Mesh.position.set(0, 0.15, cfg.len * 0.6 + (cfg.len * 0.5) / 2);
  f2Mesh.rotation.x = 0.5;
  const f2Wire = new THREE.LineSegments(new THREE.EdgesGeometry(f2Geo), cyberWireMat);
  f2Mesh.add(f2Wire);
  fingerG.add(f2Mesh);

  handGroup.add(fingerG);
});

// The Glowing Model Held Out in Hand
const modelInHandGroup = new THREE.Group();
modelInHandGroup.position.set(0, 0.3, 0.3);
aiHandAndModelGroup.add(modelInHandGroup);

const modelCoreGeo = new THREE.DodecahedronGeometry(1.05, 0);
const modelCoreMat = new THREE.MeshStandardMaterial({
  color: 0x2e1065,
  metalness: 0.95,
  roughness: 0.1,
  emissive: 0xa855f7,
  emissiveIntensity: 1.2
});
const modelCoreMesh = new THREE.Mesh(modelCoreGeo, modelCoreMat);
modelInHandGroup.add(modelCoreMesh);

const modelLatticeGeo = new THREE.IcosahedronGeometry(1.35, 1);
const modelLatticeMat = new THREE.MeshBasicMaterial({
  color: 0xa855f7,
  wireframe: true,
  transparent: true,
  opacity: 0.8
});
const modelLatticeMesh = new THREE.Mesh(modelLatticeGeo, modelLatticeMat);
modelInHandGroup.add(modelLatticeMesh);

const modelOrbitRing1 = new THREE.Mesh(
  new THREE.TorusGeometry(1.7, 0.02, 16, 60),
  new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 })
);
modelOrbitRing1.rotation.x = Math.PI / 3;
modelInHandGroup.add(modelOrbitRing1);

// Visage Hovering Above Protectively
const visageGeo = new THREE.SphereGeometry(1.6, 20, 20);
const vPos = visageGeo.attributes.position;
for (let i = 0; i < vPos.count; i++) {
  let x = vPos.getX(i);
  let y = vPos.getY(i);
  let z = vPos.getZ(i);
  if (z < 0) vPos.setZ(i, z * 0.3);
  if (y < -0.3) vPos.setX(i, x * 0.7);
}
visageGeo.computeVertexNormals();

const visageMat = new THREE.MeshBasicMaterial({
  color: 0xa855f7,
  wireframe: true,
  transparent: true,
  opacity: 0.4
});
const visageMesh = new THREE.Mesh(visageGeo, visageMat);
visageMesh.position.set(0, 3.2, -1.0);
visageMesh.rotation.x = 0.3;
aiHandAndModelGroup.add(visageMesh);

const gEyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const gLeftEye = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.15), gEyeMat);
gLeftEye.position.set(-0.45, 3.4, 0.2);
gLeftEye.rotation.x = 0.3;
aiHandAndModelGroup.add(gLeftEye);

const gRightEye = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.15), gEyeMat);
gRightEye.position.set(0.45, 3.4, 0.2);
gRightEye.rotation.x = 0.3;
aiHandAndModelGroup.add(gRightEye);

// Rotating Concentric Defense Shield Rings
const shieldRings = [];
for (let r = 0; r < 3; r++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.6 + r * 0.6, 0.02, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7 - r * 0.15,
      wireframe: true
    })
  );
  ring.rotation.x = Math.PI / (2 + r);
  ring.rotation.y = Math.PI / (3 + r);
  aiGroup.add(ring);
  shieldRings.push(ring);
}

// ── SCROLLYTELLING CONTROLLER ──
const scrubberFill = document.getElementById('scrubberFill');
const scrubberItems = document.querySelectorAll('.scrubber-item');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundText = document.getElementById('soundText');
const quickNextBtn = document.getElementById('quickNextBtn');

soundToggleBtn.addEventListener('click', () => {
  audio.enabled = !audio.enabled;
  if (audio.enabled) {
    soundToggleBtn.classList.add('active');
    soundText.textContent = 'SFX ON';
    audio.playPtbPulse();
  } else {
    soundToggleBtn.classList.remove('active');
    soundText.textContent = 'SFX OFF';
  }
});

function scrollToLevel(index) {
  const target = document.getElementById(state.levels[index].id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

scrubberItems.forEach((btn, idx) => {
  btn.addEventListener('click', () => scrollToLevel(idx));
});

quickNextBtn.addEventListener('click', () => {
  const nextIdx = (state.currentLevel + 1) % state.levels.length;
  scrollToLevel(nextIdx);
});

// Global Camera Dampening State (Zero Lag)
const cameraMotion = {
  targetY: 0,
  targetZ: 14
};

let cachedDocHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
window.addEventListener('resize', () => {
  cachedDocHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
});

// Flag to track whether Level 2 is currently active
let isLevel2Active = false;

// Scroll Listener: Instant Zero-Delay Explosion & Automatic Trade Surge
function onWindowScroll() {
  const scrollY = window.scrollY;
  const scrollProgress = Math.min(Math.max(scrollY / cachedDocHeight, 0), 1);

  scrubberFill.style.height = `${(scrollProgress * 80) + 20}%`;

  // Instant Zero-Delay Explosion on First Scroll
  if (scrollY > 18 && !state.isBlockDetonated) {
    state.isBlockDetonated = true;
    audio.playImmediateExplosion();

    subCubes.forEach(sub => {
      const blastVec = sub.userData.normal.clone().multiplyScalar(6.5);
      gsap.to(sub.position, {
        x: blastVec.x,
        y: blastVec.y,
        z: blastVec.z,
        duration: 0.9,
        ease: 'power3.out'
      });
      gsap.to(sub.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 0.8, ease: 'power2.in' });
      gsap.to(sub.userData.mesh.material, { opacity: 0, transparent: true, duration: 0.7 });
    });

    gsap.to(monolithCore.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.4 });
    gsap.to(introRing1.scale, { x: 2.2, y: 2.2, z: 2.2, opacity: 0, duration: 0.7 });
    gsap.to(introRing2.scale, { x: 2.2, y: 2.2, z: 2.2, opacity: 0, duration: 0.7 });

    shockMat.opacity = 1.0;
    const posArr = shockGeom.attributes.position.array;
    for (let i = 0; i < shockCount; i++) {
      posArr[i * 3] = 0; posArr[i * 3 + 1] = 0; posArr[i * 3 + 2] = 0;
    }
    shockGeom.attributes.position.needsUpdate = true;
    gsap.to(shockMat, { opacity: 0, duration: 0.9, ease: 'power2.out' });

  } else if (scrollY <= 8 && state.isBlockDetonated) {
    state.isBlockDetonated = false;
    audio.playTone(400, 'sine', 0.2, 0.1);

    subCubes.forEach(sub => {
      gsap.to(sub.position, {
        x: sub.userData.homePos.x,
        y: sub.userData.homePos.y,
        z: sub.userData.homePos.z,
        duration: 0.9,
        ease: 'power3.inOut'
      });
      gsap.to(sub.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'power3.inOut' });
      gsap.to(sub.userData.mesh.material, { opacity: 1, duration: 0.7 });
    });

    gsap.to(monolithCore.scale, { x: 1, y: 1, z: 1, duration: 0.7 });
    gsap.to(introRing1.scale, { x: 1, y: 1, z: 1, opacity: 0.4, duration: 0.7 });
    gsap.to(introRing2.scale, { x: 1, y: 1, z: 1, opacity: 0.3, duration: 0.7 });
  }

  // Active Level Index & Immediate Surge Trigger
  const levelIdx = Math.min(Math.floor(scrollProgress * 4.99), 4);
  if (levelIdx !== state.currentLevel) {
    state.currentLevel = levelIdx;
    scrubberItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === levelIdx);
    });
    audio.playTone(300 + levelIdx * 120, 'sine', 0.1, 0.08);

    // Fast trade graph rise as SOON as Level 2 is reached!
    if (levelIdx === 2) {
      if (!isLevel2Active) {
        isLevel2Active = true;
        triggerInstantSurgeOnArrival();
      }
    } else {
      isLevel2Active = false;
    }
  }

  // Smooth camera target
  cameraMotion.targetY = -scrollProgress * 104;
  cameraMotion.targetZ = 14 + Math.sin(scrollProgress * Math.PI) * 2.2;
}

window.addEventListener('scroll', onWindowScroll, { passive: true });

// IntersectionObserver on #section-hft to trigger surge immediately on viewport arrival
const hftSectionEl = document.getElementById('section-hft');
if (hftSectionEl) {
  const hftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        if (!isLevel2Active) {
          isLevel2Active = true;
          triggerInstantSurgeOnArrival();
        }
      } else if (!entry.isIntersecting) {
        isLevel2Active = false;
      }
    });
  }, { threshold: [0.1, 0.25, 0.5] });
  hftObserver.observe(hftSectionEl);
}

// ════════════════════════════════════════════════════════════════════════
// LEVEL 1: SUI PTB BYTECODE PULSE
// ════════════════════════════════════════════════════════════════════════
const pulseBlockBtn = document.getElementById('pulseBlockBtn');
const toggleWireframeBtn = document.getElementById('toggleWireframeBtn');
const suiTelemetryFeed = document.getElementById('suiTelemetryFeed');

pulseBlockBtn.addEventListener('click', () => {
  audio.playPtbPulse();

  gsap.to(centerPointLight, { intensity: 9.0, duration: 0.15, yoyo: true, repeat: 1 });
  gsap.to(suiLogoPivot.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.22, yoyo: true, repeat: 1 });
  gsap.to(suiHalo1.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 0.25, yoyo: true, repeat: 1 });
  gsap.to(suiHalo2.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 0.25, yoyo: true, repeat: 1 });

  const txHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...';
  const newRow = document.createElement('div');
  newRow.className = 'telemetry-row';
  newRow.innerHTML = `<span>[${txHash}] Move PTB Executed:</span><span class="telemetry-tag cyan">CONFIRMED · ${Math.floor(Math.random() * 600 + 350)} MIST</span>`;
  suiTelemetryFeed.prepend(newRow);
});

toggleWireframeBtn.addEventListener('click', () => {
  badgeMat.wireframe = !badgeMat.wireframe;
  realSuiLogoMat.wireframe = !realSuiLogoMat.wireframe;
  audio.playTone(600, 'sine', 0.08, 0.1);
});

// ════════════════════════════════════════════════════════════════════════
// LEVEL 2: COLOURFUL DYNAMIC CANDLESTICK CHART & AUTOMATED TRADE SURGE
// ════════════════════════════════════════════════════════════════════════
const candleCanvas = document.getElementById('candlestickCanvas');
const cCtx = candleCanvas.getContext('2d');
const resetChartBtn = document.getElementById('resetChartBtn');
const chartPriceVal = document.getElementById('chartPriceVal');
const marketVelocityVal = document.getElementById('marketVelocityVal');
const hftMarketStatus = document.getElementById('hftMarketStatus');
const obBidsList = document.getElementById('obBidsList');

let cachedCandleW = 520;
let cachedCandleH = 270;

function resizeCandleCanvas() {
  const parent = candleCanvas.parentElement;
  if (!parent) return;
  cachedCandleW = parent.clientWidth || 520;
  cachedCandleH = parent.clientHeight || 270;
  candleCanvas.width = cachedCandleW * window.devicePixelRatio;
  candleCanvas.height = cachedCandleH * window.devicePixelRatio;
  cCtx.setTransform(1, 0, 0, 1, 0, 0);
  cCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  drawCandlestickChart();
}
window.addEventListener('resize', resizeCandleCanvas);
setTimeout(resizeCandleCanvas, 80);

let candles = [];
let candleCount = 32;
let isSurging = false;
let surgeTicks = 0;
let surgeIntervalId = null;

function initCandles() {
  candles = [];
  let price = 12.50;
  for (let i = 0; i < candleCount; i++) {
    const open = price;
    const change = (Math.random() - 0.44) * 0.35;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 0.18;
    const low = Math.min(open, close) - Math.random() * 0.18;
    const vol = Math.random() * 60 + 20;
    candles.push({ open, close, high, low, vol });
    price = close;
  }
}
initCandles();

function triggerInstantSurgeOnArrival() {
  initCandles();
  drawCandlestickChart();
  startAutoSurge();
}

function startAutoSurge() {
  if (isSurging) {
    clearInterval(surgeIntervalId);
    isSurging = false;
  }
  isSurging = true;
  surgeTicks = 0;
  hftMarketStatus.textContent = '⚡ RAPID BUY SURGE ACTIVE ↑';
  hftMarketStatus.style.color = '#00ff88';
  marketVelocityVal.style.color = '#00ff88';
  audio.playSurgeRise();

  // Ultra-rapid 30ms tick rate for dynamic fast climb
  surgeIntervalId = setInterval(() => {
    if (!isSurging) {
      clearInterval(surgeIntervalId);
      return;
    }
    surgeTicks++;

    const last = candles[candles.length - 1];
    const open = last.close;
    // Rapid dramatic upward climb
    const gain = Math.random() * 2.6 + 1.3;
    const close = open + gain;
    const high = close + Math.random() * 0.5;
    const low = open - Math.random() * 0.12;
    const vol = Math.random() * 220 + 120;

    candles.shift();
    candles.push({ open, close, high, low, vol });

    chartPriceVal.textContent = `$${close.toFixed(3)}`;
    marketVelocityVal.textContent = `+${(surgeTicks * 31.8).toFixed(1)}% / SEC [PARABOLIC EXPANSION]`;

    if (obBidsList) {
      obBidsList.innerHTML = `
        <div class="ob-row bid"><span class="price green">${close.toFixed(3)}</span><span class="size">${(Math.random()*180+80).toFixed(1)}K</span></div>
        <div class="ob-row bid"><span class="price green">${(close-0.01).toFixed(3)}</span><span class="size">${(Math.random()*140+60).toFixed(1)}K</span></div>
        <div class="ob-row bid"><span class="price green">${(close-0.02).toFixed(3)}</span><span class="size">${(Math.random()*240+90).toFixed(1)}K</span></div>
      `;
    }

    if (surgeTicks % 2 === 0) {
      audio.playTradeTick();
    }

    drawCandlestickChart();

    if (surgeTicks > 52) {
      isSurging = false;
      clearInterval(surgeIntervalId);
      hftMarketStatus.textContent = 'STABILIZED (ATH)';
      hftMarketStatus.style.color = '#38bdf8';
      marketVelocityVal.textContent = '+512.4% PEAK VELOCITY [MAX CLOB]';
    }
  }, 30);
}

function drawCandlestickChart() {
  const w = cachedCandleW;
  const h = cachedCandleH;

  cCtx.clearRect(0, 0, w, h);

  // Subtle grid lines
  cCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  cCtx.lineWidth = 1;
  for (let y = 25; y < h; y += 40) {
    cCtx.beginPath();
    cCtx.moveTo(0, y);
    cCtx.lineTo(w, y);
    cCtx.stroke();
  }

  let minP = Math.min(...candles.map(c => c.low));
  let maxP = Math.max(...candles.map(c => c.high));
  const pad = (maxP - minP) * 0.12 || 0.5;
  minP -= pad;
  maxP += pad;

  const candleW = (w - 60) / candles.length;
  const ma20Points = [];

  candles.forEach((c, i) => {
    const x = 30 + i * candleW;
    const openY = h - ((c.open - minP) / (maxP - minP)) * (h - 55) - 25;
    const closeY = h - ((c.close - minP) / (maxP - minP)) * (h - 55) - 25;
    const highY = h - ((c.high - minP) / (maxP - minP)) * (h - 55) - 25;
    const lowY = h - ((c.low - minP) / (maxP - minP)) * (h - 55) - 25;

    const isBull = c.close >= c.open;

    // Wick (Green or Red)
    cCtx.strokeStyle = isBull ? '#00ff88' : '#ff3366';
    cCtx.lineWidth = 1.5;
    cCtx.beginPath();
    cCtx.moveTo(x + candleW * 0.5, highY);
    cCtx.lineTo(x + candleW * 0.5, lowY);
    cCtx.stroke();

    // Body (Solid crisp vibrant Green or Red)
    const bodyY = Math.min(openY, closeY);
    const bodyH = Math.max(Math.abs(closeY - openY), 2.5);

    cCtx.fillStyle = isBull ? '#00ff88' : '#ff3366';
    cCtx.fillRect(x + 2, bodyY, candleW - 4, bodyH);

    // Volume Bar at Bottom
    const volH = (c.vol / 220) * 45;
    cCtx.fillStyle = isBull ? 'rgba(0, 255, 136, 0.45)' : 'rgba(255, 51, 102, 0.4)';
    cCtx.fillRect(x + 2, h - volH, candleW - 4, volH);

    ma20Points.push({ x: x + candleW * 0.5, y: closeY });
  });

  // 20-period Moving Average line (Electric Cyan)
  if (ma20Points.length > 2) {
    cCtx.strokeStyle = '#38bdf8';
    cCtx.lineWidth = 2.0;
    cCtx.beginPath();
    cCtx.moveTo(ma20Points[0].x, ma20Points[0].y);
    for (let p = 1; p < ma20Points.length; p++) {
      cCtx.lineTo(ma20Points[p].x, ma20Points[p].y);
    }
    cCtx.stroke();
  }

  // Live Price Ticker Line
  const lastCandle = candles[candles.length - 1];
  const lastY = h - ((lastCandle.close - minP) / (maxP - minP)) * (h - 55) - 25;

  cCtx.strokeStyle = '#00ff88';
  cCtx.lineWidth = 1.2;
  cCtx.setLineDash([4, 4]);
  cCtx.beginPath();
  cCtx.moveTo(0, lastY);
  cCtx.lineTo(w, lastY);
  cCtx.stroke();
  cCtx.setLineDash([]);

  cCtx.fillStyle = '#00ff88';
  cCtx.font = 'bold 10px JetBrains Mono';
  cCtx.fillText(`$${lastCandle.close.toFixed(3)}`, w - 54, lastY - 4);
}

function updateMarketEngine() {
  if (state.currentLevel === 2 && !isSurging) {
    if (Math.random() < 0.25) {
      const last = candles[candles.length - 1];
      const change = (Math.random() - 0.44) * 0.12;
      last.close += change;
      last.high = Math.max(last.high, last.close);
      last.low = Math.min(last.low, last.close);
      chartPriceVal.textContent = `$${last.close.toFixed(3)}`;
      drawCandlestickChart();
    }
  }
}
setInterval(updateMarketEngine, 150);

resetChartBtn.addEventListener('click', () => {
  isSurging = false;
  if (surgeIntervalId) clearInterval(surgeIntervalId);
  surgeTicks = 0;
  isLevel2Active = false;
  marketVelocityVal.textContent = '+4.82% / MIN';
  marketVelocityVal.style.color = 'var(--text-low)';
  hftMarketStatus.textContent = 'IDLE / READY';
  hftMarketStatus.style.color = '#38bdf8';
  initCandles();
  drawCandlestickChart();
  audio.playTone(500, 'sine', 0.1, 0.1);
});

// ════════════════════════════════════════════════════════════════════════
// LEVEL 3: WALRUS VAULT & SEPARATE PROCESS VIEW
// (CLICK 3D GREEN BLOCK -> BURST FIRST -> SHOW PROCESS IN SEPARATE MODAL)
// ════════════════════════════════════════════════════════════════════════
const walrusProcessModal = document.getElementById('walrusProcessModal');
const closeWalrusModalBtn = document.getElementById('closeWalrusModalBtn');
const rerunProcessBtn = document.getElementById('rerunProcessBtn');
const modalTreeCanvas = document.getElementById('modalTreeCanvas');
const mCtx = modalTreeCanvas ? modalTreeCanvas.getContext('2d') : null;
const unlockAndSplitBtn = document.getElementById('unlockAndSplitBtn');
const walrusSampleFileBox = document.getElementById('walrusSampleFileBox');
const vaultStatusText = document.getElementById('vaultStatusText');
const insShardId = document.getElementById('insShardId');

// Step Breadcrumb Elements
const pSteps = [
  document.getElementById('pStep1'),
  document.getElementById('pStep2'),
  document.getElementById('pStep3'),
  document.getElementById('pStep4')
];

// Preload User's Official Sui Logo Image
const sampleSuiLogoImg = new Image();
sampleSuiLogoImg.src = 'sui_sample_logo.png';
sampleSuiLogoImg.onload = () => {
  if (modalTreeCanvas) drawModalTreeProcess();
};

function resizeModalTreeCanvas() {
  if (!modalTreeCanvas || !modalTreeCanvas.parentElement) return;
  const container = modalTreeCanvas.parentElement;
  modalTreeCanvas.width = container.clientWidth * window.devicePixelRatio;
  modalTreeCanvas.height = container.clientHeight * window.devicePixelRatio;
  if (mCtx) {
    mCtx.setTransform(1, 0, 0, 1, 0, 0);
    mCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  drawModalTreeProcess();
}
window.addEventListener('resize', resizeModalTreeCanvas);

const modalProcessState = {
  step: 1, // 1: Raw file, 2: Slicing into 8 shards, 3: Assembling Merkle Tree, 4: Root sealed
  progress: 0,
  shards: [],
  selectedShard: null,
  scanLineY: 0
};

function initModalShards() {
  modalProcessState.shards = [];
  if (!modalTreeCanvas || !modalTreeCanvas.parentElement) return;
  const w = modalTreeCanvas.parentElement.clientWidth;
  const h = modalTreeCanvas.parentElement.clientHeight;

  const leafCount = 8;
  const spacing = (w - 140) / (leafCount - 1);
  const startX = 70;

  // 4 columns x 2 rows in the Sui logo image = 8 distinct image fragment tiles
  for (let i = 0; i < leafCount; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);

    modalProcessState.shards.push({
      id: `Shard_${i + 1}`,
      displayId: `S#${i + 1}`,
      hash: `0x${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`,
      col: col,
      row: row,
      // Origin: centered where raw image was sliced
      originX: w / 2 - 60 + col * 36,
      originY: 100 + row * 40,
      // Target: Base of Merkle Tree
      targetX: startX + i * spacing,
      targetY: h - 45,
      x: startX + i * spacing,
      y: h - 45,
      width: 58,
      height: 34
    });
  }
}

function setStepActive(activeIdx) {
  pSteps.forEach((stepEl, idx) => {
    if (!stepEl) return;
    stepEl.classList.remove('active', 'completed');
    if (idx < activeIdx) {
      stepEl.classList.add('completed');
    } else if (idx === activeIdx) {
      stepEl.classList.add('active');
    }
  });
}

function drawModalTreeProcess() {
  if (!modalTreeCanvas || !modalTreeCanvas.parentElement || !mCtx) return;
  const w = modalTreeCanvas.parentElement.clientWidth;
  const h = modalTreeCanvas.parentElement.clientHeight;

  mCtx.clearRect(0, 0, w, h);

  const p = modalProcessState.progress;
  const step = modalProcessState.step;
  const shards = modalProcessState.shards;

  if (step === 1) {
    // ── STEP 1: RAW INGESTED FILE PAYLOAD ──
    const imgSize = 130;
    const cx = w / 2 - imgSize / 2;
    const cy = h / 2 - imgSize / 2 - 15;

    // Outer cyber frame
    mCtx.strokeStyle = '#22c55e';
    mCtx.lineWidth = 2;
    mCtx.shadowColor = 'rgba(34, 197, 94, 0.5)';
    mCtx.shadowBlur = 16;
    mCtx.strokeRect(cx, cy, imgSize, imgSize);
    mCtx.shadowBlur = 0;

    // Draw full Sui Logo image
    if (sampleSuiLogoImg.complete && sampleSuiLogoImg.naturalWidth > 0) {
      mCtx.drawImage(sampleSuiLogoImg, cx, cy, imgSize, imgSize);
    } else {
      mCtx.fillStyle = '#1a88f8';
      mCtx.fillRect(cx, cy, imgSize, imgSize);
    }

    // Scanning cyan laser beam
    modalProcessState.scanLineY = (modalProcessState.scanLineY + 2.5) % imgSize;
    const laserY = cy + modalProcessState.scanLineY;
    const grad = mCtx.createLinearGradient(cx, laserY, cx + imgSize, laserY);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 1)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    mCtx.strokeStyle = grad;
    mCtx.lineWidth = 2.5;
    mCtx.beginPath();
    mCtx.moveTo(cx, laserY);
    mCtx.lineTo(cx + imgSize, laserY);
    mCtx.stroke();

    // Labels
    mCtx.fillStyle = '#ffffff';
    mCtx.font = 'bold 12px JetBrains Mono';
    mCtx.textAlign = 'center';
    mCtx.fillText('RAW PAYLOAD: sui_brand_identity_vector.png (64 MB)', w / 2, cy + imgSize + 24);
    mCtx.fillStyle = '#22c55e';
    mCtx.font = '10px JetBrains Mono';
    mCtx.fillText('READY FOR ERASURE-CODING & MERKLE TREE SYNTHESIS', w / 2, cy + imgSize + 40);

  } else if (step === 2) {
    // ── STEP 2: IMAGE SHATTERING INTO 8 SHARDS ──
    const imgSize = 130;
    const cx = w / 2 - imgSize / 2;
    const cy = h / 2 - imgSize / 2 - 15;

    // Draw slices with exploding offset
    shards.forEach((s) => {
      const offsetX = (s.col - 1.5) * 22 * p;
      const offsetY = (s.row - 0.5) * 22 * p;
      const sW = imgSize / 4;
      const sH = imgSize / 2;
      const bx = cx + s.col * sW + offsetX;
      const by = cy + s.row * sH + offsetY;

      if (sampleSuiLogoImg.complete && sampleSuiLogoImg.naturalWidth > 0) {
        const srcW = sampleSuiLogoImg.width / 4;
        const srcH = sampleSuiLogoImg.height / 2;
        mCtx.save();
        mCtx.beginPath();
        mCtx.rect(bx, by, sW, sH);
        mCtx.clip();
        mCtx.drawImage(sampleSuiLogoImg, s.col * srcW, s.row * srcH, srcW, srcH, bx, by, sW, sH);
        mCtx.restore();
      }

      mCtx.strokeStyle = '#22c55e';
      mCtx.lineWidth = 1.5;
      mCtx.strokeRect(bx, by, sW, sH);

      // Shard badge
      mCtx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      mCtx.fillRect(bx, by + sH - 12, sW, 12);
      mCtx.fillStyle = '#00ff88';
      mCtx.font = 'bold 8px JetBrains Mono';
      mCtx.textAlign = 'center';
      mCtx.fillText(s.displayId, bx + sW / 2, by + sH - 3);
    });

    mCtx.fillStyle = '#00ff88';
    mCtx.font = 'bold 12px JetBrains Mono';
    mCtx.textAlign = 'center';
    mCtx.fillText('BURST: SLICING IMAGE INTO 8 ERASURE-CODED SHARDS...', w / 2, cy + imgSize + 36);

  } else {
    // ── STEPS 3 & 4: HIERARCHICAL MERKLE TREE & ROOT SEAL ──
    const parentLevel1 = [];

    // 1. Draw Branching Lines: Leaf Nodes to Level 1 Parents
    for (let i = 0; i < shards.length; i += 2) {
      const pX = (shards[i].targetX + shards[i + 1].targetX) / 2;
      const pY = h - 110;
      parentLevel1.push({ x: pX, y: pY, hash: `H(${i + 1},${i + 2})` });

      if (p > 0.3) {
        const lineAlpha = Math.min((p - 0.3) / 0.3, 1) * 0.7;
        mCtx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`;
        mCtx.lineWidth = 1.5;
        mCtx.beginPath();
        mCtx.moveTo(shards[i].x, shards[i].y - 20);
        mCtx.lineTo(pX, pY + 14);
        mCtx.moveTo(shards[i + 1].x, shards[i + 1].y - 20);
        mCtx.lineTo(pX, pY + 14);
        mCtx.stroke();
      }
    }

    // 2. Draw Branching Lines: Level 1 to Level 2 Parents
    const parentLevel2 = [];
    for (let i = 0; i < parentLevel1.length; i += 2) {
      const pX = (parentLevel1[i].x + parentLevel1[i + 1].x) / 2;
      const pY = h - 180;
      parentLevel2.push({ x: pX, y: pY, hash: `H(${i * 2 + 1}-${i * 2 + 4})` });

      if (p > 0.6) {
        const lineAlpha = Math.min((p - 0.6) / 0.25, 1) * 0.85;
        mCtx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`;
        mCtx.lineWidth = 1.8;
        mCtx.beginPath();
        mCtx.moveTo(parentLevel1[i].x, parentLevel1[i].y - 14);
        mCtx.lineTo(pX, pY + 14);
        mCtx.moveTo(parentLevel1[i + 1].x, parentLevel1[i + 1].y - 14);
        mCtx.lineTo(pX, pY + 14);
        mCtx.stroke();
      }
    }

    // 3. Draw Apex Root Node and Connectors
    const rootX = w / 2;
    const rootY = 40;
    if (p > 0.8) {
      const lineAlpha = Math.min((p - 0.8) / 0.2, 1);
      mCtx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha})`;
      mCtx.lineWidth = 2.2;
      mCtx.beginPath();
      mCtx.moveTo(parentLevel2[0].x, parentLevel2[0].y - 14);
      mCtx.lineTo(rootX, rootY + 18);
      mCtx.moveTo(parentLevel2[1].x, parentLevel2[1].y - 14);
      mCtx.lineTo(rootX, rootY + 18);
      mCtx.stroke();

      // Pulsing beacon aura around root
      mCtx.fillStyle = 'rgba(34, 197, 94, 0.15)';
      mCtx.beginPath();
      mCtx.arc(rootX, rootY, 34 + Math.sin(Date.now() * 0.005) * 5, 0, Math.PI * 2);
      mCtx.fill();

      // Apex Root Capsule
      mCtx.fillStyle = '#22c55e';
      mCtx.shadowColor = '#22c55e';
      mCtx.shadowBlur = 18;
      mCtx.beginPath();
      mCtx.roundRect ? mCtx.roundRect(rootX - 95, rootY - 14, 190, 28, 6) : mCtx.rect(rootX - 95, rootY - 14, 190, 28);
      mCtx.fill();
      mCtx.shadowBlur = 0;

      mCtx.fillStyle = '#000000';
      mCtx.font = 'bold 10px JetBrains Mono';
      mCtx.textAlign = 'center';
      mCtx.fillText('ON-CHAIN ROOT: 0x7c94aff6', rootX, rootY + 4);
    }

    // 4. Draw Parent Level 2 Nodes
    if (p > 0.6) {
      parentLevel2.forEach(node => {
        mCtx.fillStyle = '#022c22';
        mCtx.strokeStyle = '#22c55e';
        mCtx.lineWidth = 1.2;
        mCtx.fillRect(node.x - 45, node.y - 12, 90, 24);
        mCtx.strokeRect(node.x - 45, node.y - 12, 90, 24);

        mCtx.fillStyle = '#86efac';
        mCtx.font = 'bold 9px JetBrains Mono';
        mCtx.textAlign = 'center';
        mCtx.fillText(node.hash, node.x, node.y + 4);
      });
    }

    // 5. Draw Parent Level 1 Nodes
    if (p > 0.3) {
      parentLevel1.forEach(node => {
        mCtx.fillStyle = '#064e3b';
        mCtx.strokeStyle = '#34d399';
        mCtx.lineWidth = 1.2;
        mCtx.fillRect(node.x - 35, node.y - 11, 70, 22);
        mCtx.strokeRect(node.x - 35, node.y - 11, 70, 22);

        mCtx.fillStyle = '#a7f3d0';
        mCtx.font = 'bold 8.5px JetBrains Mono';
        mCtx.textAlign = 'center';
        mCtx.fillText(node.hash, node.x, node.y + 4);
      });
    }

    // 6. Draw Leaf Nodes WITH ACTUAL SLICES OF SUI LOGO IMAGE!
    shards.forEach(s => {
      // Interpolate from shattered position to tree base
      s.x = s.originX + (s.targetX - s.originX) * p;
      s.y = s.originY + (s.targetY - s.originY) * p;

      const tileW = s.width;
      const tileH = s.height;
      const bx = s.x - tileW / 2;
      const by = s.y - tileH / 2;

      // Draw the cropped slice of Sui Logo image inside this shard block!
      if (sampleSuiLogoImg.complete && sampleSuiLogoImg.naturalWidth > 0) {
        const sW = sampleSuiLogoImg.width / 4;
        const sH = sampleSuiLogoImg.height / 2;
        const sx = s.col * sW;
        const sy = s.row * sH;

        mCtx.save();
        mCtx.beginPath();
        mCtx.rect(bx, by, tileW, tileH);
        mCtx.clip();
        mCtx.drawImage(sampleSuiLogoImg, sx, sy, sW, sH, bx, by, tileW, tileH);
        mCtx.restore();
      }

      // Shard glowing border (highlight if selected)
      const isSelected = modalProcessState.selectedShard === s.id;
      mCtx.strokeStyle = isSelected ? '#38bdf8' : '#22c55e';
      mCtx.lineWidth = isSelected ? 2.5 : 1.5;
      if (isSelected) {
        mCtx.shadowColor = '#38bdf8';
        mCtx.shadowBlur = 12;
      }
      mCtx.strokeRect(bx, by, tileW, tileH);
      mCtx.shadowBlur = 0;

      // Shard ID Tag badge on bottom
      mCtx.fillStyle = 'rgba(0, 0, 0, 0.88)';
      mCtx.fillRect(bx, by + tileH - 12, tileW, 12);
      mCtx.fillStyle = isSelected ? '#38bdf8' : '#00ff88';
      mCtx.font = 'bold 8px JetBrains Mono';
      mCtx.textAlign = 'center';
      mCtx.fillText(`${s.displayId} · ${s.hash.slice(0, 6)}`, s.x, by + tileH - 3);
    });
  }
}

// Separate Modal Timeline Controller
function runModalProcessTimeline() {
  initModalShards();
  modalProcessState.step = 1;
  modalProcessState.progress = 0;
  modalProcessState.selectedShard = null;
  setStepActive(0);
  drawModalTreeProcess();

  // Step 1: Raw file ingestion scan (0.6s)
  setTimeout(() => {
    modalProcessState.step = 2;
    setStepActive(1);
    audio.playTone(520, 'triangle', 0.15, 0.12);

    // Step 2: Slicing image into 8 shards (0.8s)
    gsap.fromTo(modalProcessState, { progress: 0 }, {
      progress: 1,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: drawModalTreeProcess,
      onComplete: () => {
        // Step 3: Fly shards to base & construct tree (1.6s)
        modalProcessState.step = 3;
        setStepActive(2);
        audio.playTreeSynthesize();

        gsap.fromTo(modalProcessState, { progress: 0 }, {
          progress: 1,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: drawModalTreeProcess,
          onComplete: () => {
            modalProcessState.step = 4;
            setStepActive(3);
            audio.playTone(880, 'sine', 0.25, 0.15);
            drawModalTreeProcess();
          }
        });
      }
    });
  }, 700);
}

function openWalrusSeparateProcessModal() {
  if (!walrusProcessModal) return;
  walrusProcessModal.classList.add('active');
  setTimeout(() => {
    resizeModalTreeCanvas();
    runModalProcessTimeline();
  }, 100);
}

function closeWalrusSeparateProcessModal() {
  if (!walrusProcessModal) return;
  walrusProcessModal.classList.remove('active');
  resetWalrusGreenBlock();
}

if (closeWalrusModalBtn) {
  closeWalrusModalBtn.addEventListener('click', closeWalrusSeparateProcessModal);
}
if (rerunProcessBtn) {
  rerunProcessBtn.addEventListener('click', () => {
    audio.playTone(600, 'triangle', 0.1, 0.12);
    runModalProcessTimeline();
  });
}
if (walrusProcessModal) {
  walrusProcessModal.addEventListener('click', (e) => {
    if (e.target === walrusProcessModal) closeWalrusSeparateProcessModal();
  });
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && walrusProcessModal && walrusProcessModal.classList.contains('active')) {
    closeWalrusSeparateProcessModal();
  }
});

// Shard click inspection on canvas
if (modalTreeCanvas) {
  modalTreeCanvas.addEventListener('click', (e) => {
    if (modalProcessState.step < 3) return;
    const rect = modalTreeCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let hit = null;
    modalProcessState.shards.forEach(s => {
      const halfW = s.width / 2;
      const halfH = s.height / 2;
      if (clickX >= s.x - halfW && clickX <= s.x + halfW &&
          clickY >= s.y - halfH && clickY <= s.y + halfH) {
        hit = s;
      }
    });

    if (hit) {
      modalProcessState.selectedShard = hit.id;
      audio.playTone(920, 'sine', 0.08, 0.1);
      if (insShardId) {
        insShardId.textContent = `${hit.displayId} (Slice col ${hit.col}, row ${hit.row}) · Blake2b: ${hit.hash} · Quorum 3/4 Verified`;
      }
      drawModalTreeProcess();
    }
  });
}

// ── 3D GREEN VAULT BLOCK BURST SEQUENCE ──
let isWalrusBursting = false;

function triggerWalrusGreenBlockBurstAndProcess() {
  if (isWalrusBursting) return;
  isWalrusBursting = true;

  // 1. FIRST: The Green Block BURSTS violently!
  audio.playGreenBlockBurst();

  // Screen shake for tactile physical impact
  gsap.fromTo('.scroll-container', { x: -8, y: 6 }, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.3)' });

  // Outer wireframe cage detonates outward
  gsap.to(tesseractOuter.scale, { x: 3.6, y: 3.6, z: 3.6, duration: 0.65, ease: 'power2.out' });
  gsap.to(tesseractOuter.material, { opacity: 0, duration: 0.55 });

  gsap.to(tesseractMiddle.scale, { x: 3.2, y: 3.2, z: 3.2, duration: 0.6, ease: 'power2.out' });
  gsap.to(tesseractMiddle.material, { opacity: 0, duration: 0.5 });

  // Inner green core flashes brightly then explodes
  gsap.to(tesseractInner.material, { emissiveIntensity: 6.0, duration: 0.1 });
  gsap.to(tesseractInner.scale, {
    x: 2.4, y: 2.4, z: 2.4,
    duration: 0.45,
    ease: 'power3.out',
    onComplete: () => {
      gsap.to(tesseractInner.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.25 });
    }
  });

  gsap.to(vaultRing1.scale, { x: 2.6, y: 2.6, z: 2.6, duration: 0.55 });
  gsap.to(vaultRing1.material, { opacity: 0, duration: 0.55 });

  // Launch particle blast
  burstMat.opacity = 1.0;
  const pArr = burstGeom.attributes.position.array;
  for (let i = 0; i < burstCount; i++) {
    pArr[i * 3] = 0; pArr[i * 3 + 1] = 0; pArr[i * 3 + 2] = 0;
  }
  burstGeom.attributes.position.needsUpdate = true;
  gsap.to(burstMat, { opacity: 0, duration: 0.85, ease: 'power2.out' });

  vaultStatusText.textContent = '💥 VAULT DETONATED — OPENING SEPARATE PROCESS...';
  vaultStatusText.style.color = '#00ff88';

  // 2. THEN: After the green block burst completes, show the process in SEPARATE view!
  setTimeout(() => {
    openWalrusSeparateProcessModal();
    isWalrusBursting = false;
  }, 650);
}

function resetWalrusGreenBlock() {
  gsap.to(tesseractOuter.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(tesseractOuter.material, { opacity: 0.85, duration: 0.8 });
  gsap.to(tesseractMiddle.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(tesseractMiddle.material, { opacity: 0.5, duration: 0.8 });
  gsap.to(tesseractInner.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(tesseractInner.material, { emissiveIntensity: 0.8, duration: 0.8 });
  gsap.to(vaultRing1.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'power2.inOut' });
  gsap.to(vaultRing1.material, { opacity: 0.5, duration: 0.8 });
  vaultStatusText.textContent = 'CLICK 3D GREEN BLOCK TO BURST';
  vaultStatusText.style.color = '#22c55e';
}

if (unlockAndSplitBtn) {
  unlockAndSplitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerWalrusGreenBlockBurstAndProcess();
  });
}

if (walrusSampleFileBox) {
  walrusSampleFileBox.addEventListener('click', () => {
    triggerWalrusGreenBlockBurstAndProcess();
  });
}

// Raycaster & Viewport Click Detection for 3D Green Vault Block
const walrusRaycaster = new THREE.Raycaster();
const walrusMouse = new THREE.Vector2();

window.addEventListener('pointerdown', (e) => {
  // If user is viewing Level 3:
  if (state.currentLevel === 3 && walrusProcessModal && !walrusProcessModal.classList.contains('active')) {
    // If clicked on left half of viewport (where 3D green block is positioned)
    if (e.clientX < window.innerWidth * 0.48) {
      triggerWalrusGreenBlockBurstAndProcess();
      return;
    }

    // Precise raycast check
    const rect = renderer.domElement.getBoundingClientRect();
    walrusMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    walrusMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    walrusRaycaster.setFromCamera(walrusMouse, camera);

    const hits = walrusRaycaster.intersectObjects([tesseractOuter, tesseractMiddle, tesseractInner], true);
    if (hits.length > 0) {
      triggerWalrusGreenBlockBurstAndProcess();
    }
  }
});

// ════════════════════════════════════════════════════════════════════════
// LEVEL 4: AI SENTINEL DEFENSE (HOLDING MODEL IN HAND)
// ════════════════════════════════════════════════════════════════════════
const triggerPoisonBtn = document.getElementById('triggerPoisonBtn');
const triggerBotAttackBtn = document.getElementById('triggerBotAttackBtn');
const defenseTerminalLog = document.getElementById('defenseTerminalLog');
const interceptedCount = document.getElementById('interceptedCount');

function logDefenseEvent(msg, isThreat = true) {
  const now = new Date().toTimeString().split(' ')[0];
  const div = document.createElement('div');
  div.className = 'log-entry';
  div.innerHTML = `<span class="log-time">[${now}]</span><span class="${isThreat ? 'log-msg-intercepted red' : ''}">${msg}</span>`;
  defenseTerminalLog.prepend(div);

  if (isThreat) {
    state.threatsIntercepted++;
    interceptedCount.textContent = `${state.threatsIntercepted} DEFLECTED`;
  }
}

// 1. LLM Poisoning Attack Simulation
triggerPoisonBtn.addEventListener('click', () => {
  triggerPoisonBtn.classList.add('active');
  audio.playShieldDeflection();

  gsap.to(modelCoreMesh.material, { emissiveIntensity: 2.8, duration: 0.2, yoyo: true, repeat: 1 });
  gsap.to(centerPointLight, { intensity: 10, duration: 0.15, yoyo: true, repeat: 2 });
  shieldRings.forEach(ring => {
    gsap.to(ring.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.2, yoyo: true, repeat: 1 });
  });

  logDefenseEvent('[ALERT] Adversarial LLM Poisoning payload targeting model in hand.');
  setTimeout(() => {
    logDefenseEvent('[DEFENSE] Model in hand protected. Malicious tokens vaporized by shield.', false);
    triggerPoisonBtn.classList.remove('active');
  }, 400);
});

// 2. Bot Attacker Swarm Simulation
triggerBotAttackBtn.addEventListener('click', () => {
  triggerBotAttackBtn.classList.add('active');
  audio.playShieldDeflection();

  shieldRings.forEach((ring) => {
    gsap.to(ring.rotation, {
      z: ring.rotation.z + Math.PI * 2,
      duration: 0.6,
      ease: 'power3.out'
    });
  });

  logDefenseEvent('[SWARM ALERT] Inbound DDoS bot traffic targeting model endpoint.');
  setTimeout(() => {
    logDefenseEvent('[FIREWALL] Adaptive Rate Limiter enforced (100 req/min cap) &rarr; BOT FLOOD QUARANTINED.', false);
    triggerBotAttackBtn.classList.remove('active');
  }, 400);
});

// ── THREE.JS ANIMATION LOOP ──
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  // Cosmic Block Galaxy Orbital Drift & Galactic Swirl
  galaxyGroup.rotation.y = time * 0.018;
  galaxyGroup.rotation.x = Math.sin(time * 0.04) * 0.02;
  wireStarMesh.rotation.y = -time * 0.012;
  nebulaDust.rotation.y = time * 0.008;

  // 0. Intro Monolith Idle Rotation
  if (!state.isBlockDetonated) {
    introMonolithGroup.rotation.y += delta * 0.45;
    introMonolithGroup.rotation.x += delta * 0.25;
    monolithCore.rotation.z -= delta * 0.8;
    introRing1.rotation.z += delta * 0.4;
    introRing2.rotation.z -= delta * 0.5;
  } else {
    if (shockMat.opacity > 0.01) {
      const posArr = shockGeom.attributes.position.array;
      for (let i = 0; i < shockCount; i++) {
        const vel = shockVelocities[i];
        posArr[i * 3] += vel.x * delta;
        posArr[i * 3 + 1] += vel.y * delta;
        posArr[i * 3 + 2] += vel.z * delta;
      }
      shockGeom.attributes.position.needsUpdate = true;
    }
  }

  // 1. Level 1: Masterwork 3D Sui Token, Hover Floating & Non-Intersecting Orbits
  suiLogoPivot.position.y = Math.sin(time * 1.8) * 0.12;
  suiLogoPivot.rotation.y += delta * 0.75;
  suiLogoPivot.rotation.x = Math.sin(time * 1.2) * 0.05;
  suiHalo1.rotation.z += delta * 0.4;
  suiHalo2.rotation.z -= delta * 0.35;
  suiParticles.rotation.y += delta * 0.2;

  // 2. Level 2: HFT Matrix Rotations
  orderbookTower.rotation.y += delta * 0.8;
  hftRing1.rotation.z -= delta * 0.6;

  // 3. Level 3: Walrus Green Vault Tesseract Rotations & Burst Particles
  tesseractOuter.rotation.x += delta * 0.5;
  tesseractOuter.rotation.y += delta * 0.7;
  tesseractMiddle.rotation.z += delta * 0.6;
  tesseractInner.rotation.y -= delta * 0.9;
  vaultRing1.rotation.z += delta * 0.4;

  if (burstMat.opacity > 0.01) {
    const pArr = burstGeom.attributes.position.array;
    for (let i = 0; i < burstCount; i++) {
      const vel = burstVelocities[i];
      pArr[i * 3] += vel.x * delta;
      pArr[i * 3 + 1] += vel.y * delta;
      pArr[i * 3 + 2] += vel.z * delta;
    }
    burstGeom.attributes.position.needsUpdate = true;
  }

  // Modal Step 1 Laser Line Scan Animation
  if (walrusProcessModal && walrusProcessModal.classList.contains('active') && modalProcessState.step === 1) {
    drawModalTreeProcess();
  }

  // 4. Level 4: Cyber Hand & Model in Hand Floating & Shield Rotations
  modelInHandGroup.position.y = 0.3 + Math.sin(time * 2.0) * 0.08;
  modelCoreMesh.rotation.y += delta * 0.8;
  modelLatticeMesh.rotation.y -= delta * 0.5;
  modelOrbitRing1.rotation.z += delta * 0.9;

  handGroup.rotation.z = Math.sin(time * 1.2) * 0.04;
  visageMesh.rotation.y = Math.sin(time * 0.8) * 0.15;

  shieldRings.forEach((ring, idx) => {
    ring.rotation.z += delta * (0.4 + idx * 0.2);
  });

  // Silky Smooth Exponential Camera Dampening (Eliminates all scrolling lag & stutter across 60Hz/120Hz)
  const dampFactor = Math.min(1 - Math.exp(-12 * delta), 1);
  camera.position.y += (cameraMotion.targetY - camera.position.y) * dampFactor;
  camera.position.z += (cameraMotion.targetZ - camera.position.z) * dampFactor;

  renderer.render(scene, camera);
}

animate();
