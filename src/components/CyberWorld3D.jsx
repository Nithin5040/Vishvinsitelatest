import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './CyberWorld3D.css';

/*
  ================================================================
  CYBER WORLD 3D  –  Vishvin Technologies (CYBER TECH PARK BOULEVARD - DARK THEME)
  
  Matched to IT & Services Company Identity:
  - Deep space/indigo atmospheric sky with slow drifting starfield/particles
  - Asphalt Road with glowing neon-cyan data tracks (fiber optic pathways)
  - Cybernetic trees with glowing emissive green-cyan leaves (digital foliage)
  - Skyscrapers with PBR glass facades and glowing window blocks
  - 3D glowing billboard signs on tower roofs ("AI", "CLOUD", "SaaS", "DEV", "IoT")
  - Volumetric spotlight cones and overhead cable racks
  ================================================================
*/

export default function CyberWorld3D({ scrollProgress = 0 }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let renderer, scene, camera, animId;

    try {
      /* ── Renderer ─────────────────────────────────────────────── */
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = false;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      /* ── Scene & Atmospheric Cyber Fog ─────────────────────────── */
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020617); // Slate-950 Midnight
      const fog = new THREE.FogExp2(0x090d16, 0.0075);
      scene.fog = fog;

      /* ── Camera ───────────────────────────────────────────────── */
      camera = new THREE.PerspectiveCamera(
        53, window.innerWidth / window.innerHeight, 0.1, 550
      );

      /* Camera Spline Path */
      const camPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 0,  3.8,  180),
        new THREE.Vector3( 0,  3.5,  140),
        new THREE.Vector3( -0.4,  3.2,  100),
        new THREE.Vector3( -1.2,  3.0,   60),
        new THREE.Vector3( -2.2,  2.8,   20),
        new THREE.Vector3( -3.8,  2.8,  -20),
        new THREE.Vector3( -6.0,  3.0,  -60),
        new THREE.Vector3( -9.0,  3.5, -100),
        new THREE.Vector3( -13.0,  4.0, -140),
      ], false, 'catmullrom', 0.5);

      const tgtPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3( 0,  2.2,  120),
        new THREE.Vector3( -0.4,  2.0,   80),
        new THREE.Vector3( -1.2,  1.8,   40),
        new THREE.Vector3( -2.2,  1.8,    0),
        new THREE.Vector3( -3.8,  1.8,  -40),
        new THREE.Vector3( -6.0,  1.8,  -80),
        new THREE.Vector3( -9.0,  2.0, -120),
        new THREE.Vector3( -13.0,  2.2, -160),
        new THREE.Vector3( -18.0,  2.5, -200),
      ], false, 'catmullrom', 0.5);

      /* ================================================================
         LIGHTING (Futuristic Cyber Glow theme)
         ================================================================ */
      const sunLight = new THREE.DirectionalLight(0xa5f3fc, 1.8); // Cyan skylight
      sunLight.position.set(-60, 110, 30);
      scene.add(sunLight);

      const skyLight = new THREE.HemisphereLight(0x0e1b2f, 0x020617, 1.2);
      scene.add(skyLight);

      const ambient = new THREE.AmbientLight(0x0f172a, 0.4);
      scene.add(ambient);

      /* ================================================================
         PROCEDURAL TEXTURE GENERATOR
         ================================================================ */
      // 1. Asphalt Road Texture
      const createRoadTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0f172a'; // Deep slate road
        ctx.fillRect(0, 0, 512, 1024);
        
        // Fine grain noise
        for (let i = 0; i < 40000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 1024;
          const s = Math.random() * 1.5;
          ctx.fillStyle = Math.random() > 0.5 ? '#090d16' : '#1e293b';
          ctx.fillRect(x, y, s, s);
        }
        
        // Stains & cracks
        ctx.strokeStyle = '#020617';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (let c = 0; c < 4; c++) {
          let px = Math.random() * 512;
          let py = Math.random() * 1024;
          ctx.moveTo(px, py);
          for (let s = 0; s < 6; s++) {
            px += (Math.random() - 0.5) * 50;
            py += Math.random() * 80;
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 15);
        return tex;
      };

      // 2. Concrete Sidewalk Tile Texture
      const createSidewalkTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, 256, 256);
        
        // Joint lines
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.0;
        ctx.strokeRect(0, 0, 256, 256);
        ctx.beginPath();
        ctx.moveTo(128, 0); ctx.lineTo(128, 256);
        ctx.moveTo(0, 128); ctx.lineTo(256, 128);
        ctx.stroke();
        
        // Fine grain
        for (let i = 0; i < 4000; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          ctx.fillStyle = Math.random() > 0.5 ? '#0f172a' : '#334155';
          ctx.fillRect(x, y, 1, 1);
        }
        
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(2, 60);
        return tex;
      };

      // 3. Foliage Leaf Texture (Glowing Digital Dots)
      const createLeafTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 256, 256);
        
        // Draw clusters of leaves with glowing digital dot spots
        for (let i = 0; i < 75; i++) {
          const rx = 128 + (Math.random() - 0.5) * 170;
          const ry = 128 + (Math.random() - 0.5) * 170;
          const size = 18 + Math.random() * 22;
          
          ctx.fillStyle = `rgb(${10 + Math.floor(Math.random() * 20)}, ${90 + Math.floor(Math.random() * 40)}, ${80 + Math.floor(Math.random() * 40)})`;
          ctx.beginPath();
          ctx.ellipse(rx, ry, size, size * 0.52, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
        
        return new THREE.CanvasTexture(canvas);
      };

      // 4. Skyscraper Windows Facade Textures (Color, Metalness, Roughness)
      const createFacadeTextures = () => {
        const width = 256;
        const height = 256;
        
        // Facade color map (matte dark concrete frame + neon cyan window cells)
        const canvasColor = document.createElement('canvas');
        canvasColor.width = width;
        canvasColor.height = height;
        const ctxC = canvasColor.getContext('2d');
        ctxC.fillStyle = '#0f172a';
        ctxC.fillRect(0, 0, width, height);
        ctxC.fillStyle = '#00f2ff';
        for (let x = 6; x < width; x += 32) {
          for (let y = 6; y < height; y += 32) {
            ctxC.fillRect(x, y, 20, 20);
          }
        }
        
        // Facade roughness map
        const canvasRough = document.createElement('canvas');
        canvasRough.width = width;
        canvasRough.height = height;
        const ctxR = canvasRough.getContext('2d');
        ctxR.fillStyle = '#f8fafc';
        ctxR.fillRect(0, 0, width, height);
        ctxR.fillStyle = '#060606';
        for (let x = 6; x < width; x += 32) {
          for (let y = 6; y < height; y += 32) {
            ctxR.fillRect(x, y, 20, 20);
          }
        }

        // Facade metalness map
        const canvasMetal = document.createElement('canvas');
        canvasMetal.width = width;
        canvasMetal.height = height;
        const ctxM = canvasMetal.getContext('2d');
        ctxM.fillStyle = '#020617';
        ctxM.fillRect(0, 0, width, height);
        ctxM.fillStyle = '#ffffff';
        for (let x = 6; x < width; x += 32) {
          for (let y = 6; y < height; y += 32) {
            ctxM.fillRect(x, y, 20, 20);
          }
        }

        const mapColor = new THREE.CanvasTexture(canvasColor);
        mapColor.wrapS = THREE.RepeatWrapping;
        mapColor.wrapT = THREE.RepeatWrapping;
        
        const mapRough = new THREE.CanvasTexture(canvasRough);
        mapRough.wrapS = THREE.RepeatWrapping;
        mapRough.wrapT = THREE.RepeatWrapping;

        const mapMetal = new THREE.CanvasTexture(canvasMetal);
        mapMetal.wrapS = THREE.RepeatWrapping;
        mapMetal.wrapT = THREE.RepeatWrapping;

        return { mapColor, mapRough, mapMetal };
      };

      const roadTex = createRoadTexture();
      const sidewalkTex = createSidewalkTexture();
      const leafTex = createLeafTexture();
      const facadeMaps = createFacadeTextures();

      /* ================================================================
         UPGRADED MATERIALS
         =============================================================== */
      const roadMaterial = new THREE.MeshStandardMaterial({
        map: roadTex,
        roughness: 0.88,
        metalness: 0.05
      });

      const curbMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.65,
        metalness: 0.2
      });

      const sidewalkMaterial = new THREE.MeshStandardMaterial({
        map: sidewalkTex,
        roughness: 0.8,
        metalness: 0.1
      });

      const grassMaterial = new THREE.MeshStandardMaterial({
        color: 0x091b18, // dark cyber-green lawn
        roughness: 0.95
      });

      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x111827, // dark carbon fiber trunk
        roughness: 0.7,
        metalness: 0.4
      });

      // Cyber leaf material with alpha transparency & cyber green glow
      const foliageMaterial = new THREE.MeshStandardMaterial({
        map: leafTex,
        transparent: true,
        alphaTest: 0.18,
        shadowSide: THREE.DoubleSide,
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0.2,
        emissive: new THREE.Color(0x00f2ff),
        emissiveIntensity: 0.35
      });

      // Skyscraper reflective PBR facades (neon cyber grids)
      const buildingMaterial = new THREE.MeshStandardMaterial({
        map: facadeMaps.mapColor,
        roughnessMap: facadeMaps.mapRough,
        metalnessMap: facadeMaps.mapMetal,
        emissive: new THREE.Color(0x00d2ff),
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.85
      });

      const glassBlue = new THREE.MeshPhysicalMaterial({
        color: 0x00d2ff, roughness: 0.05, metalness: 0.9, transmission: 0.5, transparent: true, opacity: 0.8, ior: 1.55
      });
      
      const metalFrame = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.25, metalness: 0.8 });
      const darkMetal = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.7 });
      
      // Power Station Industrial Materials
      const industrialMetal = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45, metalness: 0.75 });
      const industrialRusty = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6, metalness: 0.5 });
      const neonOrangeEmissive = new THREE.MeshStandardMaterial({
        color: 0xffaa00, emissive: new THREE.Color(0xff8800), emissiveIntensity: 3.5
      });

      const neonRed = new THREE.MeshStandardMaterial({
        color: 0xef4444, emissive: new THREE.Color(0xef4444), emissiveIntensity: 4.0
      });

      const lobbyInteriorMat = new THREE.MeshStandardMaterial({
        color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.5
      });

      const neonCyanLine = new THREE.MeshBasicMaterial({
        color: 0x00f2ff
      });

      const neonYellowLine = new THREE.MeshBasicMaterial({
        color: 0xffcc00
      });

      /* ================================================================
         SKY STARFIELD (Slow floating stars)
         ================================================================ */
      const starsGeo = new THREE.BufferGeometry();
      const starsCount = 400;
      const starsPos = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount; i++) {
        starsPos[i * 3] = (Math.random() - 0.5) * 500;
        starsPos[i * 3 + 1] = 40 + Math.random() * 80;
        starsPos[i * 3 + 2] = (Math.random() - 0.5) * 500;
      }
      starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
      const starsMat = new THREE.PointsMaterial({
        color: 0xffffff, size: 0.25, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending
      });
      const starfield = new THREE.Points(starsGeo, starsMat);
      scene.add(starfield);

      /* ================================================================
         SKY CLOUDS
         ================================================================ */
      const cloudGroup = new THREE.Group();
      for (let i = 0; i < 15; i++) {
        const cloudGeo = new THREE.BoxGeometry(40 + Math.random() * 40, 1, 30 + Math.random() * 30);
        const cloudMat = new THREE.MeshBasicMaterial({
          color: 0x0ea5e9, transparent: true, opacity: 0.15, depthWrite: false // Glowing deep blue cyber clouds
        });
        const cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.set(
          (Math.random() - 0.5) * 300,
          65 + Math.random() * 15,
          (Math.random() - 0.5) * 350
        );
        cloudGroup.add(cloud);
      }
      scene.add(cloudGroup);

      /* ================================================================
         ROADWAY SYSTEM WITH DETAILS
         ================================================================ */
      const roadSegments = 60;
      const roadPoints = [];
      for (let i = 0; i <= roadSegments; i++) {
        const t = i / roadSegments;
        const z = 220 - t * 440;
        const x = -Math.pow((z - 220) / 180, 2) * 4.5;
        roadPoints.push(new THREE.Vector3(x, 0, z));
      }
      const roadSpline = new THREE.CatmullRomCurve3(roadPoints);
      const roadGeo = new THREE.TubeGeometry(roadSpline, roadSegments, 8.0, 4, false);
      const roadSegmentLength = 440 / roadSegments;

      const roadMesh = new THREE.Mesh(roadGeo, roadMaterial);
      roadMesh.scale.set(1, 0.02, 1);
      roadMesh.position.y = -0.06;
      roadMesh.receiveShadow = true;
      scene.add(roadMesh);

      // Curbs & Sidewalks
      [[-8.15], [8.15]].forEach(([xOff]) => {
        const curbPoints = roadPoints.map(p => new THREE.Vector3(p.x + xOff, 0.15, p.z));
        const curbSpline = new THREE.CatmullRomCurve3(curbPoints);
        const curbGeo = new THREE.TubeGeometry(curbSpline, roadSegments, 0.25, 4, false);
        const curb = new THREE.Mesh(curbGeo, curbMaterial);
        curb.scale.set(1, 0.4, 1);
        curb.castShadow = true;
        scene.add(curb);
      });

      [[-10.5], [10.5]].forEach(([xOff]) => {
        const sidePoints = roadPoints.map(p => new THREE.Vector3(p.x + xOff, 0.02, p.z));
        const sideSpline = new THREE.CatmullRomCurve3(sidePoints);
        const sideGeo = new THREE.TubeGeometry(sideSpline, roadSegments, 2.2, 4, false);
        const sidewalk = new THREE.Mesh(sideGeo, sidewalkMaterial);
        sidewalk.scale.set(1, 0.01, 1);
        sidewalk.receiveShadow = true;
        scene.add(sidewalk);
      });

      // Side Grass Lawns
      [[-24], [24]].forEach(([xOff]) => {
        const lawnPoints = roadPoints.map(p => new THREE.Vector3(p.x + xOff, 0.01, p.z));
        const lawnSpline = new THREE.CatmullRomCurve3(lawnPoints);
        const lawnGeo = new THREE.TubeGeometry(lawnSpline, roadSegments, 22.0, 4, false);
        const lawn = new THREE.Mesh(lawnGeo, grassMaterial);
        lawn.scale.set(1, 0.005, 1);
        lawn.receiveShadow = true;
        scene.add(lawn);
      });

      // Road Lane Markings (Neon Cyan & Yellow glowing trails)
      for (let i = 0; i < roadSegments; i++) {
        const p = roadPoints[i];
        const nextP = roadPoints[i + 1];
        const dir = new THREE.Vector3().subVectors(nextP, p).normalize();
        const angle = Math.atan2(dir.x, dir.z);

        // Dashed glowing center divider
        if (i % 2 === 0) {
          const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 3.2), neonCyanLine);
          dash.rotation.x = -Math.PI / 2;
          dash.rotation.z = angle;
          dash.position.set(p.x, 0.02, p.z);
          scene.add(dash);
        }

        // Double solid glowing yellow lines (left side)
        [-3.9, -3.7].forEach(yellowX => {
          const yellow = new THREE.Mesh(new THREE.PlaneGeometry(0.08, roadSegmentLength + 0.1), neonYellowLine);
          yellow.rotation.x = -Math.PI / 2;
          yellow.rotation.z = angle;
          yellow.position.set(p.x + yellowX, 0.02, p.z + dir.z * (roadSegmentLength / 2));
          scene.add(yellow);
        });

        // Add Zebra Crossings
        if (i === 10 || i === 35 || i === 50) {
          for (let w = -7; w <= 7; w += 1.4) {
            const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 5.0), neonCyanLine);
            stripe.rotation.x = -Math.PI / 2;
            stripe.rotation.z = angle;
            stripe.position.set(p.x + w, 0.022, p.z);
            scene.add(stripe);
          }
        }
      }

      /* ================================================================
         ZONE 1: INDUSTRIAL POWER STATION (z: 30 → 220)
         ================================================================ */
      const industrialGlows = [];

      function buildPowerStationRefinery(cx, cz) {
        const grp = new THREE.Group();

        // Major Chimney Tower 1 (Tall)
        const chimney1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 38, 12), industrialMetal);
        chimney1.position.set(-2, 19, 0);
        chimney1.castShadow = true;
        grp.add(chimney1);

        const cap1 = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 1.2, 12), industrialRusty);
        cap1.position.set(-2, 38.6, 0);
        grp.add(cap1);

        // Major Chimney Tower 2
        const chimney2 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 30, 12), industrialMetal);
        chimney2.position.set(2.8, 15, 1.5);
        chimney2.castShadow = true;
        grp.add(chimney2);

        // Structural scaffolding box
        const scaffold = new THREE.Mesh(new THREE.BoxGeometry(6.5, 24, 6.5), industrialRusty);
        scaffold.position.set(0, 12, -0.5);
        scaffold.castShadow = true;
        grp.add(scaffold);

        // Cylindrical storage tank next to chimneys
        const tank = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 14, 16), industrialMetal);
        tank.position.set(8.5, 7, -1.0);
        tank.castShadow = true;
        grp.add(tank);

        // Connect pipes
        const pipeGeo = new THREE.CylinderGeometry(0.3, 0.3, 11, 8);
        const pipe = new THREE.Mesh(pipeGeo, industrialRusty);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(4, 18, 0);
        grp.add(pipe);

        // Intense glowing neon floodlights on the structures
        const lightOffsets = [
          [-2, 10, 2.3], [-2, 22, 2.0], [2.8, 8, 3.2], [2.8, 18, 2.8], [0, 6, -3.8], [8.5, 12, 2.6]
        ];
        lightOffsets.forEach(([lx, ly, lz]) => {
          const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), neonOrangeEmissive.clone());
          bulb.position.set(lx, ly, lz);
          grp.add(bulb);
          industrialGlows.push(bulb);
        });

        grp.position.set(cx, 0, cz);
        scene.add(grp);
      }

      buildPowerStationRefinery(22, 150);
      buildPowerStationRefinery(26, 105);
      buildPowerStationRefinery(24, 60);

      // Transmission electric lines (Left side of road in Zone 1)
      function buildTransmissionPylon(cx, cz) {
        const pylon = new THREE.Group();
        const main = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, 22, 4), industrialRusty);
        main.position.y = 11;
        pylon.add(main);

        const bar1 = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.15, 0.15), industrialRusty);
        bar1.position.set(0, 18, 0);
        pylon.add(bar1);

        const bar2 = new THREE.Mesh(new THREE.BoxGeometry(8.0, 0.18, 0.18), industrialRusty);
        bar2.position.set(0, 21, 0);
        pylon.add(bar2);

        pylon.position.set(cx, 0, cz);
        scene.add(pylon);
      }
      buildTransmissionPylon(-18, 160);
      buildTransmissionPylon(-16, 110);
      buildTransmissionPylon(-17, 60);

      /* ================================================================
         ZONE 2: CORPORATE TECH PARK (z: -200 → 0)
         ================================================================ */
      function createHolographicSign(text, height) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, 128, 64);
        
        ctx.font = 'bold 36px monospace';
        ctx.fillStyle = '#00f2ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 32);
        
        const tex = new THREE.CanvasTexture(canvas);
        const signGeo = new THREE.PlaneGeometry(5.0, 2.5);
        const signMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(signGeo, signMat);
        mesh.position.y = height + 1.25;
        return mesh;
      }

      function buildHighFidelityTower(cx, cz, w, h, d, isCylindrical = false, serviceName = '') {
        const grp = new THREE.Group();

        // 1. Ground Floor recessed lobby with columns & reception lights
        const lobbyHeight = 4.2;
        const lobbyGeo = isCylindrical 
          ? new THREE.CylinderGeometry(w / 2 - 0.25, w / 2 - 0.25, lobbyHeight, 20)
          : new THREE.BoxGeometry(w - 0.5, lobbyHeight, d - 0.5);
        const lobbyGlass = new THREE.Mesh(lobbyGeo, lobbyInteriorMat);
        lobbyGlass.position.y = lobbyHeight / 2;
        grp.add(lobbyGlass);

        // Lobby columns
        if (isCylindrical) {
          for (let r = 0; r < 8; r++) {
            const angle = (r / 8) * Math.PI * 2;
            const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, lobbyHeight), metalFrame);
            col.position.set(Math.cos(angle) * (w / 2 - 0.05), lobbyHeight / 2, Math.sin(angle) * (w / 2 - 0.05));
            grp.add(col);
          }
        } else {
          [[-w/2, -d/2], [w/2, -d/2], [-w/2, d/2], [w/2, d/2]].forEach(([px, pz]) => {
            const col = new THREE.Mesh(new THREE.BoxGeometry(0.3, lobbyHeight, 0.3), metalFrame);
            col.position.set(px + (px > 0 ? -0.15 : 0.15), lobbyHeight / 2, pz + (pz > 0 ? -0.15 : 0.15));
            grp.add(col);
          });
        }

        // 2. Upper Floors: Physically Textured Facades
        const upperHeight = h - lobbyHeight;
        const upperGeo = isCylindrical
          ? new THREE.CylinderGeometry(w / 2, w / 2, upperHeight, 24)
          : new THREE.BoxGeometry(w, upperHeight, d);
        
        // Deep copy material properties to customize textures for this instance
        const instMaterial = buildingMaterial.clone();
        const facade = new THREE.Mesh(upperGeo, instMaterial);
        facade.position.y = lobbyHeight + upperHeight / 2;
        facade.castShadow = true;
        facade.receiveShadow = true;
        
        // Repeat texture coordinates relative to building height/width
        facade.material.map = facade.material.map.clone();
        facade.material.map.repeat.set(isCylindrical ? Math.floor(w / 2) : Math.floor(w / 3.2), Math.floor(upperHeight / 3.4));
        facade.material.map.needsUpdate = true;
        
        facade.material.roughnessMap = facade.material.roughnessMap.clone();
        facade.material.roughnessMap.repeat.set(isCylindrical ? Math.floor(w / 2) : Math.floor(w / 3.2), Math.floor(upperHeight / 3.4));
        facade.material.roughnessMap.needsUpdate = true;

        facade.material.metalnessMap = facade.material.metalnessMap.clone();
        facade.material.metalnessMap.repeat.set(isCylindrical ? Math.floor(w / 2) : Math.floor(w / 3.2), Math.floor(upperHeight / 3.4));
        facade.material.metalnessMap.needsUpdate = true;

        grp.add(facade);

        // 3. Rooftops (cooling units, antennas, service billboards, hazard beacons)
        const roofY = h;
        const hvac = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.8, 3.0), darkMetal);
        hvac.position.set(0, roofY + 0.9, 0);
        grp.add(hvac);

        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4.0), darkMetal);
        antenna.position.set(-w / 4, roofY + 2.0, -d / 4);
        grp.add(antenna);

        const warningLight = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), neonRed.clone());
        warningLight.position.set(w / 4, roofY + 0.18, d / 4);
        grp.add(warningLight);
        industrialGlows.push(warningLight);

        // Service glowing sign board (AI, CLOUD, SaaS, DEV, IoT)
        if (serviceName) {
          const sign = createHolographicSign(serviceName, h);
          grp.add(sign);
        }

        grp.position.set(cx, 0, cz);
        scene.add(grp);
      }

      // Populate tech corporate towers with glowing signs representing IT Services
      buildHighFidelityTower(-26, -20, 14, 42, 14, false, 'AI');
      buildHighFidelityTower( 26, -30, 16, 46, 16, true, 'CLOUD');
      buildHighFidelityTower(-28, -70, 15, 52, 15, true, 'IoT');
      buildHighFidelityTower( 26, -80, 14, 38, 14, false, 'SaaS');
      buildHighFidelityTower(-25,-120, 14, 44, 14, false, 'DEV');
      buildHighFidelityTower( 28,-130, 16, 56, 16, true, 'DATA');

      /* ================================================================
         REALISTIC ORGANIC CYBER TREES (Glowing digital canopies)
         ================================================================ */
      function createRealisticOrganicTree(cx, cz) {
        const treeGroup = new THREE.Group();

        // Planter box
        const boxGeo = new THREE.BoxGeometry(1.6, 0.35, 1.6);
        const box = new THREE.Mesh(boxGeo, curbMaterial);
        box.position.y = 0.175;
        box.castShadow = true;
        treeGroup.add(box);

        const dirtGeo = new THREE.BoxGeometry(1.4, 0.1, 1.4);
        const dirt = new THREE.Mesh(dirtGeo, roadMaterial);
        dirt.position.y = 0.3;
        treeGroup.add(dirt);

        // Trunk
        const treeHeight = 4.2 + Math.random() * 2.2;
        const trunkGeo = new THREE.CylinderGeometry(0.12, 0.22, treeHeight, 8);
        const trunk = new THREE.Mesh(trunkGeo, trunkMaterial);
        trunk.position.y = treeHeight / 2 + 0.2;
        trunk.castShadow = true;
        treeGroup.add(trunk);

        // Branching structures
        const branchCount = 4 + Math.floor(Math.random() * 3);
        for (let b = 0; b < branchCount; b++) {
          const bAngle = (b / branchCount) * Math.PI * 2;
          const branchLength = 1.2 + Math.random() * 0.8;
          const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, branchLength), trunkMaterial);
          branch.position.set(Math.cos(bAngle) * 0.3, treeHeight * 0.65, Math.sin(bAngle) * 0.3);
          branch.rotation.z = (Math.PI / 4) * (bAngle > Math.PI ? 1 : -1);
          treeGroup.add(branch);
        }

        // Intersecting Leaf Planes (GTA 3D leaf card technique)
        const planesCount = 14 + Math.floor(Math.random() * 6);
        for (let i = 0; i < planesCount; i++) {
          const pSize = 2.4 + Math.random() * 1.2;
          const leafPlane = new THREE.Mesh(new THREE.PlaneGeometry(pSize, pSize), foliageMaterial);
          leafPlane.position.set(
            (Math.random() - 0.5) * 1.8,
            treeHeight - 0.2 + (Math.random() * 2.4),
            (Math.random() - 0.5) * 1.8
          );
          leafPlane.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          leafPlane.castShadow = true;
          treeGroup.add(leafPlane);
        }

        // Street benches next to trees
        if (Math.random() > 0.65) {
          const bench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.6), darkMetal);
          bench.position.set(0, 0.225, 1.4);
          bench.castShadow = true;
          treeGroup.add(bench);
        }

        treeGroup.position.set(cx, 0, cz);
        scene.add(treeGroup);
      }

      // Populate detailed organic trees
      for (let z = -200; z < 200; z += 9.5) {
        const xOffset = -Math.pow((z - 220) / 180, 2) * 4.5;
        createRealisticOrganicTree(xOffset - 9.6 - Math.random() * 1.5, z);
        createRealisticOrganicTree(xOffset + 9.6 + Math.random() * 1.5, z);
      }

      /* ================================================================
         STREET LAMPPOSTS
         ================================================================ */
      function buildLamppost(cx, cz, flip = 1) {
        const post = new THREE.Group();
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 9), metalFrame);
        pole.position.y = 4.5;
        pole.castShadow = true;
        post.add(pole);

        const arm = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.1), metalFrame);
        arm.position.set(1.0 * flip, 9.0, 0);
        post.add(arm);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.35), darkMetal);
        head.position.set(2.0 * flip, 9.0, 0);
        post.add(head);

        const glow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00f2ff }));
        glow.position.set(2.0 * flip, 8.9, 0);
        post.add(glow);

        post.position.set(cx, 0, cz);
        scene.add(post);
      }

      for (let z = -180; z < 180; z += 40) {
        const xOffset = -Math.pow((z - 220) / 180, 2) * 4.5;
        buildLamppost(xOffset - 8.35, z, 1);
        buildLamppost(xOffset + 8.35, z, -1);
      }

      /* ================================================================
         PARALLAX MOUSE & RESIZE
         ================================================================ */
      const mouse = { x: 0, y: 0 };
      const onMM = e => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMM);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      /* ================================================================
         ANIMATION LOOP
         ================================================================ */
      const clock = new THREE.Clock();

      const animate = () => {
        try {
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();
          const sp = Math.min(Math.max(stateRef.current.scroll ?? 0, 0), 0.9999);

          // Translate camera along curved highway path
          const cPos = camPath.getPointAt(sp);
          const cTgt = tgtPath.getPointAt(Math.min(sp + 0.015, 0.9999));
          camera.position.lerp(cPos, 0.06);

          const look = cTgt.clone();
          look.x += mouse.x * 1.4;
          look.y += mouse.y * 0.7;
          camera.lookAt(look);

          // Scroll transitions: Dusk Power Station ➔ Daylight Tech Park
          let skyColor, fogColor, fogDensity;
          
          if (sp < 0.40) {
            // Zone 1: Cyber Power Station (Sunset orange/deep blue gradient)
            skyColor = new THREE.Color(0xfd9f52); // dusk orange
            fogColor = new THREE.Color(0xef4444).lerp(new THREE.Color(0xfd9f52), 0.55);
            fogDensity = 0.0075;

            sunLight.color.setHex(0xffaa66);
            sunLight.intensity = 3.2;
            skyLight.color.setHex(0xffcc99);
            skyLight.groundColor.setHex(0x1d3557);
          } 
          else if (sp >= 0.40 && sp <= 0.60) {
            // Zone 2: Smooth interpolation
            const blendFactor = (sp - 0.40) / 0.20;

            const duskSky = new THREE.Color(0xfd9f52);
            const daySky = new THREE.Color(0x020617); // Deep slate midnight sky
            skyColor = duskSky.lerp(daySky, blendFactor);

            const duskFog = new THREE.Color(0xef4444).lerp(new THREE.Color(0xfd9f52), 0.55);
            const dayFog = new THREE.Color(0x090d16);
            fogColor = duskFog.lerp(dayFog, blendFactor);
            fogDensity = 0.0075;

            const warmSun = new THREE.Color(0xffaa66);
            const cyanSun = new THREE.Color(0xa5f3fc);
            sunLight.color.copy(warmSun.lerp(cyanSun, blendFactor));
            sunLight.intensity = 3.2 - (blendFactor * 0.4);
          } 
          else {
            // Zone 3: Cyber Tech Park (Sleek Space Indigo-Midnight)
            skyColor = new THREE.Color(0x020617);
            fogColor = new THREE.Color(0x090d16);
            fogDensity = 0.0065;

            sunLight.color.setHex(0xa5f3fc); // Cool cyan daylight
            sunLight.intensity = 2.8;
            skyLight.color.setHex(0x0e1b2f);
            skyLight.groundColor.setHex(0x020617);
          }

          scene.background.copy(skyColor);
          fog.color.copy(fogColor);
          fog.density = fogDensity;

          // Blink industrial beacon bulbs & skyscraper warning lights
          for (let bulb of industrialGlows) {
            bulb.material.emissiveIntensity = 2.0 + Math.sin(t * 3.5) * 1.5;
          }

          // Slow drift for clouds
          cloudGroup.position.x = Math.sin(t * 0.05) * 5;
          cloudGroup.position.z = Math.cos(t * 0.05) * 5;

          // Slow rotation for stars
          starfield.rotation.y = t * 0.01;

          renderer.render(scene, camera);
        } catch (loopErr) {
          console.error("Three.js Animation Loop Crash:", loopErr);
          const errDiv = document.createElement('div');
          errDiv.style.position = 'fixed';
          errDiv.style.bottom = '10px';
          errDiv.style.left = '10px';
          errDiv.style.background = 'rgba(239, 68, 68, 0.9)';
          errDiv.style.color = 'white';
          errDiv.style.padding = '15px';
          errDiv.style.zIndex = '99999';
          errDiv.innerText = "Loop Error: " + loopErr.message + "\n" + loopErr.stack;
          document.body.appendChild(errDiv);
          cancelAnimationFrame(animId);
        }
      };

      animate();

      stateRef.current = {
        scroll: 0,
        cleanup: () => {
          cancelAnimationFrame(animId);
          window.removeEventListener('mousemove', onMM);
          window.removeEventListener('resize', onResize);
          renderer.dispose();
          if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
        },
      };

    } catch (initErr) {
      console.error("Three.js Init Crash:", initErr);
    }

    return () => stateRef.current.cleanup?.();
  }, []);

  useEffect(() => {
    stateRef.current.scroll = scrollProgress;
  }, [scrollProgress]);

  return (
    <div ref={mountRef} className="cyber-world-mount light">
      <div className="cyber-scanlines light" />
      <div className="cyber-vignette light" />
      <div className="hud-corner hud-tl light" />
      <div className="hud-corner hud-tr light" />
      <div className="hud-corner hud-bl light" />
      <div className="hud-corner hud-br light" />
    </div>
  );
}
