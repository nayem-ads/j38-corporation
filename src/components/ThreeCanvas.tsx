'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let alive = true;
    let animId: number;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const el = renderer.domElement;
    el.style.display = 'block';
    el.style.width = '100%';
    el.style.height = '100%';
    container.appendChild(el);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
    camera.position.set(0, 0, 14);

    /* Studio environment texture */
    const envC = document.createElement('canvas');
    envC.width = 1024;
    envC.height = 512;
    const ex = envC.getContext('2d');
    if (ex) {
      const grad = ex.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, '#d8d8d8');
      grad.addColorStop(0.3, '#4e4e4e');
      grad.addColorStop(0.48, '#1a1a1a');
      grad.addColorStop(0.7, '#0b0b0b');
      grad.addColorStop(1, '#2a2a2a');
      ex.fillStyle = grad;
      ex.fillRect(0, 0, 1024, 512);

      const blob = (x: number, y: number, r: number, a: number) => {
        const rg = ex.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, `rgba(255,255,255,${a})`);
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        ex.fillStyle = rg;
        ex.beginPath();
        ex.arc(x, y, r, 0, 7);
        ex.fill();
      };
      const strip = (x: number, y: number, w: number, h: number, a: number) => {
        const rg = ex.createLinearGradient(x, y - h / 2, x, y + h / 2);
        rg.addColorStop(0, 'rgba(255,255,255,0)');
        rg.addColorStop(0.5, `rgba(255,255,255,${a})`);
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        ex.fillStyle = rg;
        ex.fillRect(x - w / 2, y - h / 2, w, h);
      };
      blob(300, 70, 150, 1);
      blob(820, 60, 90, 0.7);
      strip(420, 195, 1024, 42, 1);
      strip(200, 300, 560, 20, 0.6);
      blob(600, 150, 200, 0.5);

      const envTex = new THREE.CanvasTexture(envC);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromEquirectangular(envTex).texture;
      pmrem.dispose();
    }

    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0x0d0d0d,
      metalness: 0.9,
      roughness: 0.26,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.7,
    });

    const ribbed = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.5,
    });

    const satin = new THREE.MeshPhysicalMaterial({
      color: 0x121212,
      metalness: 1,
      roughness: 0.3,
      envMapIntensity: 1.4,
      flatShading: true,
    });

    const emerald = new THREE.MeshStandardMaterial({
      color: 0x06d6a0,
      metalness: 0.4,
      roughness: 0.3,
      emissive: 0x032f24,
      emissiveIntensity: 1,
    });

    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(7, 8, 9);
    scene.add(key);

    const fill = new THREE.PointLight(0xffffff, 140, 60);
    fill.position.set(0, 2, 10);
    scene.add(fill);

    const side = new THREE.PointLight(0xffffff, 90, 50);
    side.position.set(-9, 1, 6);
    scene.add(side);

    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-8, -2, 3);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));

    /* Infinity Sculpture Lemniscate */
    const A = 3.5;
    const point = (t: number) =>
      new THREE.Vector3(A * Math.cos(t), A * 0.98 * Math.sin(t) * Math.cos(t), 0);

    class Lemniscate extends THREE.Curve<THREE.Vector3> {
      constructor() {
        super();
      }
      getPoint(u: number, target = new THREE.Vector3()) {
        return target.copy(point(u * Math.PI * 2));
      }
    }

    const infinity = new THREE.Group();
    const core = new THREE.Mesh(
      new THREE.TubeGeometry(new Lemniscate(), 720, 0.32, 48, true),
      new THREE.MeshPhysicalMaterial({
        color: 0x121212,
        metalness: 1,
        roughness: 0.36,
        envMapIntensity: 0.9,
      })
    );
    infinity.add(core);

    const FINS = 190;
    const finGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.06, 40, 1, false);
    const fins = new THREE.InstancedMesh(finGeo, ribbed, FINS);
    (() => {
      const up = new THREE.Vector3(0, 1, 0);
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const tan = new THREE.Vector3();
      const a = new THREE.Vector3();
      const b = new THREE.Vector3();
      const one = new THREE.Vector3(1, 1, 1);
      for (let i = 0; i < FINS; i++) {
        const t = (i / FINS) * Math.PI * 2;
        const p = point(t);
        a.copy(point(t - 0.004));
        b.copy(point(t + 0.004));
        tan.subVectors(b, a).normalize();
        q.setFromUnitVectors(up, tan);
        const s = 1 + Math.sin(t * 2) * 0.05;
        m.compose(p, q, one.set(s, 1, s));
        fins.setMatrixAt(i, m);
      }
      fins.instanceMatrix.needsUpdate = true;
    })();
    infinity.add(fins);
    scene.add(infinity);

    const pearl = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 1), satin);
    infinity.add(pearl);

    /* Per-service accessory objects */
    const accessories: THREE.Group[] = [];
    function accessory(build: (g: THREE.Group) => void) {
      const g = new THREE.Group();
      build(g);
      g.visible = false;
      scene.add(g);
      accessories.push(g);
      return g;
    }

    // 01 data columns
    accessory((g) => {
      for (let i = 0; i < 9; i++) {
        const h = 0.6 + Math.abs(Math.sin(i * 1.7)) * 3.2;
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.42, h, 0.42), i === 4 ? emerald : chrome);
        m.position.set((i - 4) * 0.72, h / 2 - 1.8, 0);
        g.add(m);
      }
    });
    // 02 neural sphere
    accessory((g) => {
      const geo = new THREE.IcosahedronGeometry(2.4, 3);
      const pts = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: 0xf5f5f2, size: 0.045 })
      );
      g.add(pts);
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), chrome));
      g.add(
        new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.4, 1)),
          new THREE.LineBasicMaterial({ color: 0x55575a })
        )
      );
    });
    // 03 automation node chain
    accessory((g) => {
      for (let i = 0; i < 6; i++) {
        const r = new THREE.Mesh(
          new THREE.TorusGeometry(0.85, 0.16, 24, 64),
          i % 3 === 1 ? satin : chrome
        );
        r.position.set((i - 2.5) * 1.5, Math.sin(i) * 0.5, 0);
        r.rotation.y = i * 0.5;
        g.add(r);
      }
    });
    // 04 branding morph
    accessory((g) => {
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(2, 0), chrome));
      g.add(new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 2.2), satin));
    });
    // 05 web panels
    accessory((g) => {
      for (let i = 0; i < 3; i++) {
        const p = new THREE.Mesh(
          new THREE.BoxGeometry(3.4, 2.1, 0.08),
          i === 1 ? satin : chrome
        );
        p.position.set(i * 0.5 - 0.5, -i * 0.6 + 0.6, i * 0.7);
        p.rotation.set(-0.12, 0.35, 0.02);
        g.add(p);
      }
    });

    /* Scroll Choreography Keyframes */
    const STATES = [
      { sel: '#hero', x: 4.4, y: -1, z: -22, s: [1.4, 1.4, 1.4], r: [0.05, 0.1, 0] },
      { sel: '[data-intro]', x: 0, y: 0, z: -8, s: [1.35, 1.35, 1.35], r: [0.06, 1.1, 0.04] },
      { sel: '[data-service="0"]', x: -4.4, y: 0.4, z: -6, s: [0.72, 0.72, 0.72], r: [0.2, 1.7, 0.1] },
      { sel: '[data-service="4"]', x: 4.4, y: -0.4, z: -6, s: [0.72, 0.72, 0.72], r: [-0.15, 2.5, -0.1] },
      { sel: '#work', x: 0, y: 0, z: -15, s: [1.8, 1.8, 1.8], r: [0.1, 3.1, 0] },
      { sel: '#numbers', x: 0, y: 3.4, z: -24, s: [0.25, 0.25, 0.25], r: [0, 3.7, 0] },
      { sel: '#process', x: 0, y: 0, z: -7, s: [2.5, 0.34, 1], r: [0.12, 4.0, 0.02] },
      { sel: '#about', x: 0, y: -0.2, z: -3, s: [2.2, 2.2, 2.2], r: [0.06, 4.6, 0] },
      { sel: '#contact', x: 0, y: 0, z: 3, s: [1.5, 1.5, 1.5], r: [0.02, 5.2, 0] },
      { sel: null, x: 0, y: 0, z: 6, s: [0.14, 0.14, 0.14], r: [0, 5.6, 0] },
    ];

    type KeyState = {
      sel: string | null;
      x: number;
      y: number;
      z: number;
      s: number[];
      r: number[];
      p: number;
    };

    let KEYS: KeyState[] = [];

    function buildKeys() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const out: KeyState[] = [];
      STATES.forEach((st, i) => {
        let p: number;
        if (!st.sel) {
          p = 1;
        } else {
          const n = document.querySelector(st.sel);
          if (!n) return;
          const rect = n.getBoundingClientRect();
          const center = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
          p = max > 0 ? Math.min(1, Math.max(0, center / max)) : i / STATES.length;
        }
        out.push({ ...st, p });
      });

      // Target position inside #j38-hero-slot
      const slot = document.querySelector('#j38-hero-slot');
      const hero = out.find((k) => k.sel === '#hero');
      if (slot && hero) {
        const r = slot.getBoundingClientRect();
        if (r.width > 40 && r.height > 40) {
          const dist = camera.position.z - hero.z;
          const visH = 2 * dist * Math.tan(((camera.fov * Math.PI) / 180) / 2);
          const pxPerUnit = window.innerHeight / visH;
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          hero.x = (cx - window.innerWidth / 2) / pxPerUnit;
          hero.y = (window.innerHeight / 2 - cy) / pxPerUnit;
          const fit =
            Math.min((r.width * 0.94) / (2 * A), (r.height * 0.94) / (A * 0.98)) / pxPerUnit;
          hero.s = [fit, fit, fit];
        }
      }

      out.sort((a, b) => a.p - b.p);
      if (out.length && out[0].p > 0) {
        out.unshift({ ...out[0], p: 0 });
      }
      KEYS = out;
    }

    buildKeys();
    window.addEventListener('resize', buildKeys);
    setTimeout(buildKeys, 600);
    setTimeout(buildKeys, 1800);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t * t * (3 - 2 * t);

    let target = 0;
    let current = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }

    function onMove(e: MouseEvent) {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    onScroll();

    let lastW = 0;
    let lastH = 0;
    function sync() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h || (w === lastW && h === lastH)) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 820 ? 46 : 34;
      camera.updateProjectionMatrix();
    }
    sync();

    function updateAccessories(t: number) {
      const nodes = document.querySelectorAll('[data-service]');
      let best = -1;
      let bestScore = 0;
      nodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - window.innerHeight * 0.5) / (window.innerHeight * 0.85);
        const score = 1 - d;
        if (score > bestScore) {
          bestScore = score;
          best = Number(n.getAttribute('data-service'));
        }
      });

      accessories.forEach((g, i) => {
        const on = i === best && bestScore > 0.05;
        g.visible = on;
        if (!on) return;
        const sideMult = infinity.position.x > 0 ? -1 : 1;
        const pop = ease(Math.min(1, bestScore * 1.6));
        g.position.set(3.4 * sideMult + mx * 0.4, -0.3 - my * 0.3, -0.6);
        g.scale.setScalar(0.3 + pop * 0.7);
        g.rotation.y = t * 0.2 + i;
        g.rotation.x = Math.sin(t * 0.22 + i) * 0.14;
        g.children.forEach((c: any, ci) => {
          if (c.geometry && c.geometry.type === 'IcosahedronGeometry') {
            c.rotation.y = t * 0.3 * (ci + 1);
          }
          if (c.geometry && c.geometry.type === 'BoxGeometry' && i === 3) {
            c.rotation.set(t * 0.24, t * 0.3, 0);
          }
        });
      });
    }

    function updateNumbers() {
      document.querySelectorAll('[data-znum]').forEach((n: any) => {
        const r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        const d = (r.top + r.height / 2 - window.innerHeight * 0.5) / window.innerHeight;
        const k = Math.max(0, 1 - Math.abs(d) * 1.6);
        n.style.transform = `perspective(900px) translateZ(${(k * 60 - 30).toFixed(1)}px) scale(${(
          0.86 +
          k * 0.16
        ).toFixed(3)})`;
        n.style.opacity = String(0.45 + k * 0.55);
      });
    }

    const clock = new THREE.Clock();
    function draw() {
      if (!alive) return;
      sync();
      const t = clock.getElapsedTime();
      current = lerp(current, target, reduced ? 1 : 0.075);
      mx = lerp(mx, tmx, 0.05);
      my = lerp(my, tmy, 0.05);

      if (KEYS.length >= 2) {
        let a = KEYS[0];
        let b = KEYS[KEYS.length - 1];
        for (let i = 0; i < KEYS.length - 1; i++) {
          if (current >= KEYS[i].p && current <= KEYS[i + 1].p) {
            a = KEYS[i];
            b = KEYS[i + 1];
            break;
          }
        }
        const f = ease(Math.min(1, Math.max(0, (current - a.p) / Math.max(0.0001, b.p - a.p))));
        infinity.position.set(
          lerp(a.x, b.x, f) + mx * 0.35,
          lerp(a.y, b.y, f) - my * 0.28,
          lerp(a.z, b.z, f)
        );
        infinity.scale.set(
          lerp(a.s[0], b.s[0], f),
          lerp(a.s[1], b.s[1], f),
          lerp(a.s[2], b.s[2], f)
        );
        infinity.rotation.set(
          lerp(a.r[0], b.r[0], f) + my * 0.06,
          lerp(a.r[1], b.r[1], f) + (reduced ? 0 : Math.sin(t * 0.14) * 0.3) + mx * 0.12,
          lerp(a.r[2], b.r[2], f)
        );
      }

      pearl.position.set(Math.cos(t * 0.35) * 4.4, Math.sin(t * 0.5) * 1.6, Math.sin(t * 0.35) * 1.2);
      pearl.rotation.set(t * 0.3, t * 0.22, 0);

      updateAccessories(t);
      updateNumbers();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      alive = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', buildKeys);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      if (el.parentElement) el.remove();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="j38-canvas-layer"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
