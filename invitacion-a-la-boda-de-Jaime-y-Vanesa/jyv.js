// ============================================
// 🎵 REPRODUCCIÓN GARANTIZADA EN iOS/ANDROID
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("animacionsobre");
  const audio = document.getElementById("music");
  const portal = document.getElementById("portal");

  if (!btn || !audio || !portal) return;

  // Configuración inicial
  audio.preload = "auto";
  audio.volume = 0.7;
  let isProcessing = false;

  // ============================================
  // 🎯 HANDLER PRINCIPAL - OPTIMIZADO PARA iOS
  // ============================================
  
  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) return;
    isProcessing = true;
    
    // Desactivar botón
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";

    // ============================================
    // 🎵 REPRODUCCIÓN PARA iOS (CRÍTICO)
    // ============================================
    
    try {
      // 1. Resetear audio
      audio.currentTime = 0;
      audio.muted = false;
      
      // 2. LOAD obligatorio en iOS antes de play()
      audio.load();
      
      // 3. Esperar un frame para que iOS procese el load
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // 4. Reproducir (DEBE estar en el mismo ciclo de eventos del click)
      await audio.play();
      
      console.log("✅ Audio reproduciendo");
      
    } catch (error) {
      console.error("❌ Error:", error.name);
      
      // Fallback: Intentar una vez más
      try {
        await audio.play();
      } catch (retryError) {
        console.error("❌ Reintento falló:", retryError.name);
        showManualPlayButton();
      }
    }

    // ============================================
    // 🎨 ANIMACIÓN
    // ============================================
    
    portal.classList.add("fade-out");
    
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setTimeout(() => {
      portal.style.display = "none";
      portal.remove();
    }, 800);
  };

  // ============================================
  // 🔘 BOTÓN MANUAL (FALLBACK)
  // ============================================
  
  const showManualPlayButton = () => {
    if (!audio.paused) return;
    
    const playBtn = document.createElement("button");
    playBtn.innerHTML = "🎵 Toca para reproducir música";
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
      font-size: 18px;
      font-weight: bold;
      font-family: 'Georgia', serif;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(212,175,55,0.5);
      z-index: 10000;
      animation: pulse 1.5s infinite;
    `;
    
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.08); }
      }
    `;
    document.head.appendChild(style);
    
    playBtn.addEventListener("click", async () => {
      try {
        audio.load();
        await audio.play();
        playBtn.style.opacity = "0";
        playBtn.style.transform = "translateX(-50%) scale(0)";
        playBtn.style.transition = "all 0.3s ease";
        setTimeout(() => playBtn.remove(), 300);
      } catch (err) {
        playBtn.textContent = "❌ No se pudo reproducir";
        playBtn.style.background = "#c0392b";
      }
    }, { once: true });
    
    document.body.appendChild(playBtn);
  };

  // ============================================
  // 📱 EVENTOS - SOLO CLICK (iOS requiere click directo)
  // ============================================
  
  // Evento único - click funciona en iOS y Android
  btn.addEventListener("click", handleClick, { once: true });
  
  // Accesibilidad
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  }, { once: true });

  // ============================================
  // 🔍 DIAGNÓSTICO
  // ============================================
  
  console.log("🎵 Sistema inicializado");
  console.log("📱 Dispositivo:", /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Móvil" : "Desktop");
});
// (function(){
//   const audio = document.getElementById('player');
//   const portal = document.getElementById('portal');
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
//     portal.classList.add('hidden');
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

//   portal.onclick = enter;
//   btn.onclick = e => { e.preventDefault(); e.stopPropagation(); enter(); };

//   // Si ya había entrado antes → permitir que vea los pétalos de nuevo al hacer clic
//   if (localStorage.getItem(KEY) === '1') {
//     // El animacionsobre permanece visible intencionalmente
//   }

//   // Solo para pruebas rápidas
//   if (location.search.includes('skipportal=1')) {
//     openSite();
//     audio.muted = true;
//     audio.currentTime = 14; // ← También desde el segundo 14 en modo skipportal
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
    const remainTime = Math.max((new Date(deadline) - now) / 1000, 0);

    const remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
    const remainMinutes = ('0' + Math.floor((remainTime / 60) % 60)).slice(-2);
    const remainHours   = ('0' + Math.floor((remainTime / 3600) % 24)).slice(-2);
    const remainDays    = Math.floor(remainTime / (3600 * 24));

    return { remainSeconds, remainMinutes, remainHours, remainDays, remainTime };
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

    const redirectUrl = 'https://api.whatsapp.com/send?phone=593979311002&text=Hola%20%F0%9F%91%8B%20Te%20escribo%20para%20informarte%20que%20la%20invitaci%C3%B3n%20que%20te%20envi%C3%A9%20ya%20ha%20caducado.%20Si%20a%C3%BAn%20te%20gustar%C3%ADa%20asistir%20o%20tienes%20alguna%20pregunta,%20no%20dudes%20en%20contactarme%20directamente%20y%20con%20gusto%20te%20ayudo.%20%C2%A1Gracias%20por%20tu%20comprensi%C3%B3n!%20%F0%9F%98%8A';

    // Si ya caducó desde el inicio, redirigir inmediatamente
    const initial = getRemainingTime(deadline);
    if (initial.remainTime <= 0) {
      el.innerHTML = finalMessage;
      window.location.href = redirectUrl;
      return;
    }

    const render = () => {
      const t = getRemainingTime(deadline);

      el.innerHTML = `
        <div class="countf">
          <p class="pcount"><span>${t.remainDays}</span> Días</p>
          <p class="pcount"><span>${t.remainHours}</span> Horas</p>
          <p class="pcount"><span>${t.remainMinutes}</span> Mins.</p>
          <p class="pcount"><span>${t.remainSeconds}</span> Seg.</p>
        </div>
      `;

      if (t.remainTime <= 0) {
        clearInterval(timerUpdate);
        el.innerHTML = finalMessage;

        // Pequeño delay para que el usuario vea el mensaje y luego redirige
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 2000);
      }
    };

    render();
    const timerUpdate = setInterval(render, 1000);
  };

  // ============================================
  // 🎬 INICIALIZACIÓN
  // ============================================
  const init = () => {
    const deadline = 'Jun 13 2026 23:30:59 GMT-0500';

    countdown(deadline, 'labelm', '<p style="color:#e74c3c; font-weight:bold; font-size:1.2em;">⏰ Esta invitación ha caducado. Redirigiendo...</p>');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();



function toggleBankData() {
            const bankData = document.getElementById('bankData');
            const toggleBtn = document.getElementById('toggleBtn');
            
            if (bankData.classList.contains('show')) {
                bankData.classList.remove('show');
                toggleBtn.textContent = 'VER DATOS BANCARIOS';
            } else {
                bankData.classList.add('show');
                toggleBtn.textContent = 'OCULTAR DATOS BANCARIOS';
            }
        }



//         function goToPage(){
//     var nombre = document.getElementById('entry.1203511507').value;
//      var pasesRadio = document.querySelector('input[name="entry.2144876583"]:checked');
//   var pases = pasesRadio ? pasesRadio.value : "";
 
 
//     if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
       
//       return (document.getElementById("demo").innerHTML =
//       "Ingresa tu nombre completo")
//     }
//     if( pases == null || pases.length == 0 || /^\s+$/.test(pases) ) {
       
//       return (document.getElementById("demo").innerHTML =
//       "Ingresa el nombre de tu negocio")
//     }



// var whatsapp_number ="&text=*Confirmación Boda Jaime y Vane 2026*"+ "%0A"+"✨ ¡Muchas gracias por confirmar! ✨"+ "%0A" +"Nos alegra muchísimo saber que nos acompañarás en este día tan especial."+ "%0A"+"¡Será un placer compartir este momento contigo! 💍💫" + "%0A"+"_________________________" + "%0A"+"%0A"+ "*😃 Nombre:*" +"%0A" + nombre + "%20"+"%0A" +"*🎫Pases:*" +"%0A" +  pases +  "%20"+"%0A"+"_________________________"+"%0A"+nombre+ "%20"+ "nos vemos en la boda";
  
// //4️⃣5️⃣6️⃣7️⃣
  



//    var md = new MobileDetect(window.navigator.userAgent);
//    if (md.mobile()) {
 
//     window.open(document.getElementById("enviarwa").href = "https://api.whatsapp.com/send?phone=593979311002" + whatsapp_number);
//   //  }
         
//    } else {
//         window.open(document.getElementById("enviarwa").href = "https://web.whatsapp.com/send?phone=593979311002" + whatsapp_number);
//        }

//       }


      document.addEventListener('DOMContentLoaded', function() {
  const animacionsobre = document.getElementById('animacionsobre');
  const haciaarriba = document.getElementById('haciaarriba');
  const abrirsobre = document.querySelector('.abrirsobre');
  const textosobre = document.querySelector('.textosobre');
  const portal = document.getElementById('portal');
  animacionsobre.addEventListener('click', function() {
    // Agregar clase para activar la apertura
    animacionsobre.classList.add('abrirsobrejyv');
    
    // Ocultar el hint de "toca para abrir"
    abrirsobre.style.display = 'none';
    
    // Opcional: Ocultar animacionsobre después de la animación
    setTimeout(() => {
      animacionsobre.style.display = 'none';
    portal.style.display = 'none';
    }, 2000); // Ajusta según duración de tu animación
  });
});

function goToPage(){
    // Obtener el nombre del invitado desde el div con clase 'invitado'
    var invitadoElement = document.querySelector('.invitado');
    var nombre = invitadoElement ? invitadoElement.textContent.trim() : '';
    
    // Obtener el número de pases desde el div con clase 'passesfull'
    var passesElement = document.querySelector('.passesfull');
    var pases = passesElement ? passesElement.textContent.trim() : '';
    
    // Llenar los campos ocultos del formulario antes de validar
    document.getElementById('entry.1203511507').value = nombre;
    document.getElementById('entry.2144876583').value = pases;
    
    // Validaciones (ahora son opcionales ya que los valores vienen del sistema)
    if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
        return (document.getElementById("demo").innerHTML = "Error: No se encontró el nombre del invitado");
    }
    
    if( pases == null || pases.length == 0 || /^\s+$/.test(pases) ) {
        return (document.getElementById("demo").innerHTML = "Error: No se encontró el número de pases");
    }

    var whatsapp_number = "&text=*Confirmación Boda Vanessa y Jaime*" + "%0A" + 
        "✨ ¡Muchas gracias por confirmar! ✨" + "%0A" + 
        "Nos alegra muchísimo saber que nos acompañarás en este día tan especial." + "%0A" + 
        "¡Será un placer compartir este momento contigo! 💍💫" + "%0A" + 
        "_________________________" + "%0A" + "%0A" + 
        "*😃 Nombre:*" + "%0A" + nombre + "%20" + "%0A" + 
        "*🎫Pases:*" + "%0A" + pases + "%20" + "%0A" + 
        "_________________________" + "%0A" + 
        nombre + "%20" + "nos vemos en la boda";

    var md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        window.open("https://api.whatsapp.com/send?phone=593979311002" + whatsapp_number);
    } else {
        window.open("https://web.whatsapp.com/send?phone=593979311002" + whatsapp_number);
    }
}


   // 📅 SISTEMA DE CALENDARIO UNIVERSAL
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const calendarBtn = document.getElementById("add-to-calendar");
  const modal = document.getElementById("calendar-modal");
  const closeModal = document.getElementById("close-calendar-modal");
  const calendarOptions = document.querySelectorAll(".calendar-option");

  if (!calendarBtn || !modal) return;

  // ============================================
  // 📝 CONFIGURACIÓN DEL EVENTO
  // ============================================
  
  const eventDetails = {
    title: "Boda de Vanessa & Jaime",
    description: "Ceremonia religiosa: 16:00 - Cóctel de bienvenida 17:00 - Palabras de bienvenida y entrada de los novios 17:30",
    location: "Villa Las Paulitas, Quito, Pomasqui",
    // FORMATO: YYYYMMDDTHHMMSS (en hora local)
 startDate: "20260613T160000", // 13 de Junio 2026, 4:00 PM
  endDate: "20260613T230000",   // 13 de Junio 2026, 11:00 PM
  
    timezone: "America/Guayaquil" // Ajusta según tu zona horaria
  };

  // ============================================
  // 🎯 ABRIR MODAL
  // ============================================
  
  calendarBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // ============================================
  // ❌ CERRAR MODAL
  // ============================================
  
  const closeModalFunc = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  closeModal.addEventListener("click", closeModalFunc);
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // ============================================
  // 🔧 FUNCIONES GENERADORAS DE ENLACES
  // ============================================
  
  const formatDateForGoogle = (date) => {
    // Convertir de YYYYMMDDTHHMMSS a YYYYMMDDTHHMMSSZ
    return date.replace(/[:-]/g, '');
  };

  const generateGoogleCalendar = () => {
    const baseUrl = "https://calendar.google.com/calendar/render";
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventDetails.title,
      details: eventDetails.description,
      location: eventDetails.location,
      dates: `${formatDateForGoogle(eventDetails.startDate)}/${formatDateForGoogle(eventDetails.endDate)}`,
      ctz: eventDetails.timezone
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const generateOutlookCalendar = () => {
    const baseUrl = "https://outlook.live.com/calendar/0/deeplink/compose";
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: eventDetails.title,
      body: eventDetails.description,
      location: eventDetails.location,
      startdt: eventDetails.startDate,
      enddt: eventDetails.endDate
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const generateYahooCalendar = () => {
    const baseUrl = "https://calendar.yahoo.com/";
    const params = new URLSearchParams({
      v: "60",
      view: "d",
      type: "20",
      title: eventDetails.title,
      desc: eventDetails.description,
      in_loc: eventDetails.location,
      st: eventDetails.startDate,
      et: eventDetails.endDate
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mi Sitio Web//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${eventDetails.startDate}
DTEND:${eventDetails.endDate}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
UID:${Date.now()}@misitio.com
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description.replace(/\n/g, '\\n')}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'evento.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar confirmación
    showNotification("✅ Archivo descargado. Ábrelo para agregar a tu calendario.");
  };

  // ============================================
  // 🍎 DETECCIÓN DE APPLE (iOS/macOS)
  // ============================================
  
  const isAppleDevice = () => {
    return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
  };

  const handleAppleCalendar = () => {
    if (isAppleDevice()) {
      // En dispositivos Apple, el archivo .ics se abre automáticamente
      generateICS();
    } else {
      alert("Para dispositivos Apple, descarga el archivo .ics y ábrelo en tu dispositivo.");
      generateICS();
    }
  };

  // ============================================
  // 🔔 NOTIFICACIÓN
  // ============================================
  
  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #2ecc71;
      color: white;
      padding: 15px 30px;
      border-radius: 50px;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
      z-index: 10001;
      animation: slideInUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutDown 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  // ============================================
  // 🎯 MANEJADORES DE EVENTOS
  // ============================================
  
  calendarOptions.forEach(option => {
    option.addEventListener("click", () => {
      const type = option.getAttribute("data-type");
      let url;

      switch(type) {
        case "google":
          url = generateGoogleCalendar();
          window.open(url, '_blank');
          showNotification("✅ Abriendo Google Calendar...");
          break;
          
        case "apple":
          handleAppleCalendar();
          break;
          
        case "outlook":
          url = generateOutlookCalendar();
          window.open(url, '_blank');
          showNotification("✅ Abriendo Outlook...");
          break;
          
        case "yahoo":
          url = generateYahooCalendar();
          window.open(url, '_blank');
          showNotification("✅ Abriendo Yahoo Calendar...");
          break;
          
        case "ics":
          generateICS();
          break;
      }

      closeModalFunc();
    });
  });

  // ============================================
  // 📱 ESTILO DE ANIMACIONES
  // ============================================
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
    
    @keyframes slideOutDown {
      from {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
  `;
  document.head.appendChild(style);

  console.log("📅 Sistema de calendario inicializado");
});   