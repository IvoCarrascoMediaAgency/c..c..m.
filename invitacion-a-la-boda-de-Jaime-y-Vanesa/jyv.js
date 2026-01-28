// ============================================
// 🎵 REPRODUCCIÓN GARANTIZADA EN PC Y MÓVIL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("overlay");
  const audio = document.getElementById("player");
  const gate = document.getElementById("gate");

  // Validación
  if (!btn || !audio || !gate) return;

  // Configuración inicial
  audio.preload = "auto";
  audio.volume = 0.7;
  let isProcessing = false;
  let audioUnlocked = false; // Flag para saber si el audio está desbloqueado

  // ============================================
  // 🔓 DESBLOQUEO DE AUDIO (CRUCIAL PARA MÓVILES)
  // ============================================
  // En iOS/Android, el audio DEBE iniciarse por interacción directa del usuario
  
  const unlockAudio = () => {
    if (audioUnlocked) return;
    
    // Reproducir y pausar inmediatamente para "despertar" el audio
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioUnlocked = true;
        console.log("✅ Audio desbloqueado");
      }).catch(() => {
        // Si falla, lo intentaremos de nuevo en el click principal
        console.log("⚠️ Audio aún bloqueado, se intentará de nuevo");
      });
    }
  };

  // ============================================
  // 🎯 HANDLER PRINCIPAL - MÁXIMA COMPATIBILIDAD
  // ============================================
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) return;
    isProcessing = true;
    
    // Desactivar botón
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";

    // ============================================
    // 🎵 REPRODUCCIÓN AGRESIVA DEL AUDIO
    // ============================================
    
    // Método 1: Reproducción directa e inmediata
    audio.currentTime = 0;
    audio.muted = false; // Asegurarse que no está muteado
    
    // Intentar reproducir sin await para máxima velocidad
    const playAttempt = audio.play();
    
    if (playAttempt !== undefined) {
      playAttempt
        .then(() => {
          console.log("✅ Audio reproduciendo correctamente");
        })
        .catch((error) => {
          console.warn("⚠️ Primer intento falló:", error.name);
          
          // INTENTO 2: Reintentar inmediatamente
          setTimeout(() => {
            audio.play()
              .then(() => console.log("✅ Audio reproduciendo en segundo intento"))
              .catch((err) => {
                console.error("❌ No se pudo reproducir:", err.name);
                // Mostrar botón de reproducción manual como último recurso
                showManualPlayButton();
              });
          }, 100);
        });
    }

    // ============================================
    // 🎨 ANIMACIÓN (independiente del audio)
    // ============================================
    
    gate.classList.add("fade-out");
    
    // Vibración móvil
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Remover overlay
    setTimeout(() => {
      gate.style.display = "none";
      if (gate.parentNode) {
        gate.remove();
      }
    }, 800);
  };

  // ============================================
  // 🔘 BOTÓN MANUAL DE REPRODUCCIÓN (FALLBACK)
  // ============================================
  
  const showManualPlayButton = () => {
    // Solo mostrar si el audio realmente no está reproduciendo
    if (!audio.paused) return;
    
    const playBtn = document.createElement("button");
    playBtn.id = "manual-play-btn";
    playBtn.innerHTML = "🎵 Reproducir Música";
    playBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #d4af37;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-size: 16px;
      font-family: 'Georgia', serif;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: pulse 2s infinite;
    `;
    
    // Añadir animación de pulso
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.05); }
      }
    `;
    document.head.appendChild(style);
    
    playBtn.addEventListener("click", () => {
      audio.play()
        .then(() => {
          console.log("✅ Audio reproduciendo manualmente");
          playBtn.style.animation = "none";
          playBtn.style.transform = "translateX(-50%) scale(0)";
          playBtn.style.opacity = "0";
          playBtn.style.transition = "all 0.3s ease";
          setTimeout(() => playBtn.remove(), 300);
        })
        .catch((err) => {
          console.error("❌ Error crítico:", err);
          playBtn.textContent = "❌ Error al reproducir";
        });
    });
    
    document.body.appendChild(playBtn);
  };

  // ============================================
  // 📱 EVENTOS OPTIMIZADOS PARA MÓVIL Y PC
  // ============================================
  
  // Evento principal - usa 'click' en lugar de 'pointerdown' para mejor compatibilidad
  btn.addEventListener("click", handleClick, { once: true, passive: false });
  
  // Backup: También escuchar touchstart para iOS
  btn.addEventListener("touchstart", (e) => {
    unlockAudio();
  }, { once: true, passive: true });
  
  // Accesibilidad: teclado
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  }, { once: true });

  // ============================================
  // 🚀 PRECARGA INTELIGENTE
  // ============================================
  
  // Desktop: precarga en hover
  btn.addEventListener("mouseenter", () => {
    if (audio.readyState < 3) {
      audio.load();
    }
    unlockAudio();
  }, { once: true, passive: true });

  // Móvil: precarga en primer touch
  btn.addEventListener("touchstart", () => {
    if (audio.readyState < 3) {
      audio.load();
    }
  }, { once: true, passive: true });

  // ============================================
  // 🎵 MONITOREO DEL ESTADO DEL AUDIO
  // ============================================
  
  audio.addEventListener("play", () => {
    console.log("▶️ Audio comenzó a reproducirse");
  });

  audio.addEventListener("playing", () => {
    console.log("✅ Audio reproduciendo correctamente");
  });

  audio.addEventListener("pause", () => {
    console.log("⏸️ Audio pausado");
  });

  audio.addEventListener("error", (e) => {
    console.error("❌ Error de audio:", audio.error);
    showManualPlayButton();
  });

  // ============================================
  // 🔊 ASEGURAR VOLUMEN ADECUADO
  // ============================================
  
  // Algunos navegadores resetean el volumen
  const ensureVolume = () => {
    if (audio.volume < 0.5) {
      audio.volume = 0.7;
    }
  };

  audio.addEventListener("volumechange", ensureVolume);

  // ============================================
  // 📊 DIAGNÓSTICO (remover en producción)
  // ============================================
  
  console.log("🎵 Sistema de audio inicializado");
  console.log("📱 User Agent:", navigator.userAgent.includes("Mobile") ? "Móvil" : "Desktop");
  console.log("🔊 Estado inicial del audio:", {
    readyState: audio.readyState,
    paused: audio.paused,
    volume: audio.volume,
    muted: audio.muted
  });
});
// (function(){
//   const audio = document.getElementById('player');
//   const gate = document.getElementById('gate');
//   const btn = document.getElementById('btn-ingresar');
//   const canvas = document.getElementById('petals-canvas');
// //   const ctx = canvas.getContext('2d');
//   const KEY = 'invite_consent_v3';
//   audio.volume = 0.7;

//   // Ajustar canvas
//   function resize() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resize();
//   window.addEventListener('resize', resize);

//   // Precargar imágenes
//   const petal1 = new Image();
//   const petal2 = new Image();
//   petal1.src = 'https://invitartes.com/wp-content/uploads/2025/11/petalo1.webp';
//   petal2.src = 'https://invitartes.com/wp-content/uploads/2025/11/petalo2.webp';
//   const petalImages = [petal1, petal2];
//   const petals = [];

//   // === CONTROL DE VISIBILIDAD (para pausar cuando la pestaña no está activa) ===
//   let isPageVisible = !document.hidden;
//   document.addEventListener("visibilitychange", () => {
//     isPageVisible = !document.hidden;
//   });

//   // Crear un pétalo individual
//   function createPetal(force = false) {
//     if (!force && (!petalImages[0].complete || !petalImages[1].complete || !isPageVisible)) return;
//     const img = petalImages[Math.floor(Math.random() * 2)];
//     const size = 100 + Math.random() * 100;
//     petals.push({
//       x: canvas.width * (0.1 + Math.random() * 0.8),
//       y: canvas.height + 120,
//       size,
//       speed: 2.2 + Math.random() * 2,
//       zigzag: 1.5 + Math.random() * 2,
//       phase: Math.random() * Math.PI * 2,
//       rotation: Math.random() * Math.PI * 2,
//       rotSpeed: (Math.random() - 0.5) * 0.08,
//       img
//     });
//   }

//   // Lanzar 7 pétalos al entrar (efecto inicial)
//   function lanzar7Petals() {
//     for (let i = 0; i < 7; i++) {
//       setTimeout(() => {
//         createPetal(true);
//       }, i * 420);
//     }
//   }

//   // Pétalos continuos cada ~1.7 segundos
//   let petalInterval = null;
//   function startContinuousPetals() {
//     if (petalInterval) return;
//     petalInterval = setInterval(() => {
//       if (isPageVisible) createPetal();
//     }, 1700);
//   }

//   // Animación continua
//   function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let i = petals.length - 1; i >= 0; i--) {
//       const p = petals[i];
//       p.y -= p.speed;
//       p.x += Math.sin(p.phase += 0.035) * p.zigzag;
//       p.rotation += p.rotSpeed;

//       if (p.y < -250) {
//         petals.splice(i, 1);
//         continue;
//       }

//       ctx.save();
//       ctx.globalAlpha = Math.min(1, (canvas.height - p.y + 400) / (canvas.height + 400));
//       ctx.translate(p.x, p.y);
//       ctx.rotate(p.rotation);
//       ctx.drawImage(p.img, -p.size/2, -p.size/2, p.size, p.size);
//       ctx.restore();
//     }

//     requestAnimationFrame(animate);
//   }
//   animate();

//   function openSite() {
//     gate.classList.add('hidden');
//     window.scrollTo({top:0, behavior:'smooth'});
//   }

//   async function startMusic() {
//     try { 
//       audio.currentTime = 14; // ← Comienza desde el segundo 14
//       audio.muted = false; 
//       await audio.play(); 
//     } catch(e) {}
//   }

//   function enter() {
//     localStorage.setItem(KEY, '1');
//     lanzar7Petals();           // Explosión inicial de 7 pétalos
//     setTimeout(() => {
//       openSite();
//       startMusic();
//       startContinuousPetals();   // ← Comienza la lluvia continua de pétalos
//     }, 1600);
//   }

//   gate.onclick = enter;
//   btn.onclick = e => { e.preventDefault(); e.stopPropagation(); enter(); };

//   // Si ya había entrado antes → permitir que vea los pétalos de nuevo al hacer clic
//   if (localStorage.getItem(KEY) === '1') {
//     // El overlay permanece visible intencionalmente
//   }

//   // Solo para pruebas rápidas
//   if (location.search.includes('skipGate=1')) {
//     openSite();
//     audio.muted = true;
//     audio.currentTime = 14; // ← También desde el segundo 14 en modo skipGate
//     audio.play().catch(()=>{}).then(()=>setTimeout(()=>audio.muted=false,300));
//     startContinuousPetals();
//   }
// }
// )();


// ]contador
// ============================================
// 🔧 CÓDIGO CORREGIDO Y MEJORADO
// ============================================

(function() {
  'use strict';

  // ============================================
  // ⏱️ FUNCIÓN: CALCULAR TIEMPO RESTANTE
  // ============================================
  const getRemainingTime = (deadline) => {
    const now = new Date();
    const remainTime = (new Date(deadline) - now + 1000) / 1000;
    
    const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
    const remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2);
    const remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2);
    const remainDays = Math.floor(remainTime / (3600 * 24));

    return {
      remainSeconds,
      remainMinutes,
      remainHours,
      remainDays,
      remainTime
    };
  };

  // ============================================
  // ⏲️ FUNCIÓN: COUNTDOWN PRINCIPAL
  // ============================================
  const countdown = (deadline, elem, finalMessage) => {
    const el = document.getElementById(elem);
    
    if (!el) {
      console.error(`❌ Elemento con ID "${elem}" no encontrado`);
      return;
    }

    const timerUpdate = setInterval(() => {
      const t = getRemainingTime(deadline);
      
      // 🐛 FIX: Usar = en lugar de backticks para innerHTML
      el.innerHTML = `
        <div class="countf">
          <p class="pcount"><span>${t.remainDays}</span> Días</p>
          <p class="pcount"><span>${t.remainHours}</span> Horas</p>
          <p class="pcount"><span>${t.remainMinutes}</span> Mins.</p>
          <p class="pcount"><span>${t.remainSeconds}</span> Seg.</p>
        </div>
      `;

      // Cuando el tiempo se agota
      if (t.remainTime <= 1) {
        clearInterval(timerUpdate);
        el.innerHTML = finalMessage;
        
        // Abrir ventana y recargar después de un delay
        setTimeout(() => {
          window.open("https://whatsbulksender.com/oferta-50off", '_blank');
          location.reload();
        }, 1000);
      }
    }, 1000);
  };

  // ============================================
  // 🔐 SISTEMA DE AUTENTICACIÓN
  // ============================================
  
  const initAuthentication = () => {
    // Configuración de credenciales (considera moverlas a un backend)
    const VALID_USERNAME = 'CLAU';
    const VALID_PASSWORD = '6777';

    // Actualizar título
    const tituElement = document.querySelector('.titu');
    if (tituElement) {
      tituElement.innerHTML = "";
    }

    // Event listener para el botón de cerrar modal
    const cerrarBtn = document.getElementById('cerrarmodal');
    
    if (cerrarBtn) {
      cerrarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 🐛 FIX: Acceso correcto a los valores del formulario
        const loginInput = document.getElementById('txt-user');
        const passwordInput = document.getElementById('txt-password');
        
        if (!loginInput || !passwordInput) {
          console.error('❌ Campos de login no encontrados');
          return;
        }

        const loginValue = loginInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Validar credenciales
        if (loginValue === VALID_USERNAME && passwordValue === VALID_PASSWORD) {
          // Ocultar modales
          document.querySelectorAll('.modalv').forEach(function(element) {
            element.classList.add('nosvemos2');
          });

          // Guardar en localStorage
          localStorage.setItem('usuario', loginValue);
          localStorage.setItem('password', passwordValue);
          
          console.log('✅ Autenticación exitosa');
        } else {
          alert("Por favor ingresa tus credenciales correctas.");
        }
      });
    }

    // ============================================
    // 🔓 VERIFICAR SI YA ESTÁ AUTENTICADO
    // ============================================
    
    if (localStorage.getItem("usuario") === VALID_USERNAME && 
        localStorage.getItem("password") === VALID_PASSWORD) {
      
      document.querySelectorAll('.modalv').forEach(function(element) {
        element.classList.add('nosvemos2');
      });
      
      console.log("✅ Usuario autenticado previamente");
    }
  };

  // ============================================
  // 🔘 BOTONES EXTERNOS
  // ============================================
  
  const initExternalButtons = () => {
    document.querySelectorAll('.boton3').forEach(function(element) {
      element.addEventListener('click', function() {
        window.open('https://whatsbulksender.com/', '_blank');
      });
    });
  };

  // ============================================
  // 👁️ AUTO-OCULTAR ELEMENTOS
  // ============================================
  
  const autoHideElements = () => {
    const labelm = document.getElementById("labelm");
    const titu = document.getElementById("titu");
    
    setTimeout(function() {
      if (labelm) labelm.classList.add("oculto");
      if (titu) titu.classList.add("oculto");
    }, 8000);
  };

  // ============================================
  // 🚀 INICIALIZACIÓN
  // ============================================
  
  const init = () => {
    // Iniciar countdown
    countdown('Jun 13 2026 23:30:59 GMT-0500', 'labelm', '¡Ups! Comunícate con soporte.');
    
    // Inicializar autenticación
    initAuthentication();
    
    // Inicializar botones externos
    initExternalButtons();
    
    // Auto-ocultar elementos
    autoHideElements();
  };

  // ============================================
  // 🎬 EJECUTAR AL CARGAR EL DOM
  // ============================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();