  // Cursor
  // const cdot = document.getElementById('cdot');
  // const cring = document.getElementById('cring');
  // let mx=-200, my=-200, rx=-200, ry=-200;
  // document.addEventListener('mousemove', e => {
  //   mx = e.clientX; my = e.clientY;
  //   cdot.style.left = mx+'px'; cdot.style.top = my+'px';
  // });
  // (function animate() {
  //   rx += (mx-rx)*.12; ry += (my-ry)*.12;
  //   cring.style.left = rx+'px'; cring.style.top = ry+'px';
  //   requestAnimationFrame(animate);
  // })();
  // document.querySelectorAll('a,button,.g-card,.faq-item,.p-card').forEach(el => {
  //   el.addEventListener('mouseenter', () => cring.classList.add('hov'));
  //   el.addEventListener('mouseleave', () => cring.classList.remove('hov'));
  // });

  // codigo para bloquear click erecho
// document.oncontextmenu = function(){return false}

  // Navbar
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

  // Scroll reveal
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // FAQ
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if(!open) item.classList.add('active');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Pause marquee on hover
  // const mq = document.getElementById('mqt');
  // mq.addEventListener('mouseenter', () => mq.style.animationPlayState = 'paused');
  // mq.addEventListener('mouseleave', () => mq.style.animationPlayState = 'running');

  // Phone hover
  // document.querySelectorAll('.phone').forEach(p => {
  //   p.addEventListener('mouseenter', function(){
  //     const scale = this.classList.contains('phone-center') ? 1.14 : .9;
  //     const tx = this.classList.contains('phone-left') ? 24 : this.classList.contains('phone-right') ? -24 : 0;
  //     this.style.transform = `scale(${scale}) translateX(${tx}px)`;
  //     this.style.transition = 'transform .4s cubic-bezier(.25,.46,.45,.94)';
  //   });
  //   p.addEventListener('mouseleave', function(){
  //     const scale = this.classList.contains('phone-center') ? 1.1 : .86;
  //     const tx = this.classList.contains('phone-left') ? 28 : this.classList.contains('phone-right') ? -28 : 0;
  //     this.style.transform = `scale(${scale}) translateX(${tx}px)`;
  //   });
  // });


  // modal
  const modal = document.getElementById('modalContainer');
  const modal2 = document.getElementById('modalContainer2');
const btnOpen = document.getElementById('openModal');
const btnOpen2 = document.getElementById('openModal2');
const btnClose = document.getElementById('closeModal');
const btnClose2 = document.getElementById('closeModal2');
const iframe = document.getElementById('modalFrame');
const iframe2 = document.getElementById('modalFrame2');

// URL que quieres mostrar (debe ser de tu mismo dominio)
const urlInvitacion = "https://celebraconmigo.net/invitacion-a-la-boda-de-Jaime-y-Vanesa/"; 
const urlInvitacion2 = "http://192.168.100.26:5500/invitacion-XV-anos-Alejandra-Coronel/"; 
// Abrir modal
btnOpen2.onclick = function() {
    iframe2.src = urlInvitacion2; // Cargamos la URL solo al abrir para ahorrar recursos
    modal2.style.display = "flex";
    document.body.style.overflow = "hidden"; // Evita scroll en el fondo
}

btnOpen.onclick = function() {
    iframe.src = urlInvitacion; // Cargamos la URL solo al abrir para ahorrar recursos
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Evita scroll en el fondo
}

// Cerrar modal al dar clic en la X
btnClose.onclick = function() {
    cerrarModal();
}
btnClose2.onclick = function() {
    cerrarModal2();
}


// Cerrar modal al dar clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}
window.onclick = function(event) {
    if (event.target == modal2) {
        cerrarModa2();
    }
}


function cerrarModal() {
    modal.style.display = "none";
    iframe.src = ""; // Limpiamos el iframe
    document.body.style.overflow = "auto"; // Habilita el scroll de nuevo
}

function cerrarModal2() {
    modal2.style.display = "none";
    iframe2.src = ""; // Limpiamos el iframe
    document.body.style.overflow = "auto"; // Habilita el scroll de nuevo
}


  // chat

   $('.cardnegocionet').on('click', function(){
    $('#cardmenunet').addClass('mostrarcardmenunet');
  })
  
  // $('#cerrarchatnet').on('click', function(){
  //   $('#cardmenunet').toggleClass('mostrarcardmenunet');
  // })

     $('.btn-ghost2').click(function() {
   $('#cardmenunet').addClass('mostrarcardmenunet');
    
    });

$('#cerrarchatnet').on('click', function(){
    $('#cardmenunet').toggleClass('mostrarcardmenunet');
    document.getElementById('edad').value = '';
    // $('.cardmenu').css('left', '-100%');
  })

      
 setTimeout(function() {
          $(".unowhatnet").fadeIn(1000);
      },8500);




  function obtenerdatos(){
    var nombre = document.getElementById('edad').value;
  
 
  
    $('#cerrarchatnet').on('click', function(){
   
        document.getElementById("whaterror").style="display: none";
      })

    if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
       
        return (document.getElementById("whaterror").innerHTML =
        "¿Como podemos ayudarte? 👩🏻‍💻👇",document.getElementById("whaterror").style=" color: #25d366; position: relative; padding: 15px;  margin: 0 26px 20px; border-radius: 15px; background-color: #fff; color: #4a4a4a; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 30%); transition: 0.5s ease-in-out;")
      }

   
  

  

      document.getElementById('edad').value = '';
      document.getElementById('edad').style ="height 0";

    var myWindow = "&text="+nombre;
  
    var md = new MobileDetect(window.navigator.userAgent);
       if (md.mobile()) {
  
        window.open(document.getElementById("enviarwa2").href = "https://api.whatsapp.com/send?phone=593996517199" + myWindow);
  
      } else {
       
        window.open(document.getElementById("enviarwa2").href = "https://web.whatsapp.com/send?phone=593996517199" + myWindow);
   
       
   
   
      }
      
  
       $('#cardmenunet').toggleClass('mostrarcardmenunet');
     
   
 
 
  }




  // codigo para mostrar elpopup cada minuto
const myTimeout = setTimeout(myGreeting, 300000);
// setIntervales "repetir esta función cada N milisegundos". setTimeoutes "ejecutar esta función una vez después de N milisegundos"
function myGreeting() {
  $('#exit').addClass('visibletres');
}

//  código para mostrar el modal cuando quieres salir de la pagina

const mouseEvent = e => {
  const shouldShowExitIntent = 
      !e.toElement && 
      !e.relatedTarget &&
      e.clientY < 2;

  if (shouldShowExitIntent) {
      document.removeEventListener('mouseout', mouseEvent);
      
      document.querySelector('.exit-intent-popup').classList.add('visibletres');
  }
};

const exit = e => {
  if (e.target.className === 'close') {
      document.querySelector('.exit-intent-popup').classList.remove('visibletres');
  }

  if (e.target.className === 'masv') {
    document.querySelector('.exit-intent-popup').classList.remove('visibletres');
}
};

document.querySelector('.exit-intent-popup').addEventListener('click', exit);
 
setTimeout(() => {
  document.addEventListener('mouseout', mouseEvent);
  document.addEventListener('keydown', exit);
}, 2_000);



// slider

 const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  const bar    = document.getElementById('progress');
  const TOTAL  = slides.length;
  const DELAY  = 5000;
  let current  = 0;
  let timer    = null;
 
  function pad(n) { return String(n + 1).padStart(2, '0'); }
 
  function goTo(n, restart = true) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + TOTAL) % TOTAL;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (restart) resetProgress();
  }
 
  function resetProgress() {
    bar.classList.remove('running');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth;
    bar.style.transition = '';
    bar.classList.add('running');
  }
 
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
    resetProgress();
  }
 
  dots.forEach(d => d.addEventListener('click', () => {
    goTo(+d.dataset.i);
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DELAY);
  }));
 
  // Touch / swipe
  let startX = null;
  const s = document.getElementById('slider');
  s.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  s.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); clearInterval(timer); timer = setInterval(() => goTo(current + 1), DELAY); }
    startX = null;
  }, { passive: true });
 
  startAuto();

