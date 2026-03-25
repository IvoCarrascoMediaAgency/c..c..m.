// document.addEventListener('DOMContentLoaded', function() {
//     // Leer parámetros del link
//     const params = new URLSearchParams(window.location.search);
    
//     // Obtener datos
//     const nombre = params.get("nombre") || "Invitado";
//     console.log("🚀 ~ nombre:", nombre);
//     const pases = params.get("pases") || "1";
//     const numero = params.get("numero") || "0000000000";
    
//     const link2 = params.get("Link-invitaciones") || "https";
    
//     // Determinar si es PASE o PASES
    
//     // Mostrar en pantalla con validación
//     const invitadoEl = document.getElementById("invitado");
//     if (invitadoEl) invitadoEl.innerText = nombre;
    
    
    
//     const passesEl = document.getElementById("pases");
//     if (passesEl) passesEl.innerText = pases;
    

//     const whatsapp_number ="https://api.whatsapp.com/send?phone="+ numero+ "&text=¡Hola! 💍 Es un honor invitarle a nuestra boda, nos encantaría contar con su presencia en este día tan importante para nosotros."
//     + "%0A"+"Aquí tiene su invitación:"+ "%0A"+link2+ "%0A"+" ";
    
// // var whatsapp_number2 = "&text=*Confirmación Boda Vanessa y Jaime*" + "%0A" + 
// //         "✨ ¡Muchas gracias por confirmar! ✨" + "%0A" + 
// //         "Nos alegra muchísimo saber que nos acompañarás en este día tan especial." + "%0A" + 
// //         "¡Será un placer compartir este momento contigo! 💍💫" + "%0A" + 
// //         "_________________________" + "%0A" + "%0A" + 
// //         "*😃 Nombre:*" + "%0A" + nombre + "%20" + "%0A" + 
// //         "*🎫Pases:*" + "%0A" + pases + "%20" + "%0A" + 
// //         "_________________________" + "%0A" + 
// //         nombre + "%20" + "nos vemos en la boda";

// //     var md = new MobileDetect(window.navigator.userAgent);
// //     if (md.mobile()) {
// //         window.open("https://api.whatsapp.com/send?phone=593979311002" + whatsapp_number);
// //     } else {
// //         window.open("https://web.whatsapp.com/send?phone=593979311002" + whatsapp_number);
// //     }



// // lo que se va insertar en el href WhatsApp

//  // Configurar enlace de WhatsApp
//     const numeroEl = document.getElementById("wainvitado");
//     if (numeroEl) {
//         numeroEl.href = whatsapp_number;
      
//     }

//     //  var md = new MobileDetect(window.navigator.userAgent);
//     // if (md.mobile()) {
//     //     window.open("https://api.whatsapp.com/send?phone=593979311002" + whatsapp_number);
//     // } else {
//     //     window.open("https://web.whatsapp.com/send?phone=593979311002" + whatsapp_number);
//     // }

// // para copiar el link


// });

function copiarURL() {
  const link = document.getElementById("wainvitado").href;

  navigator.clipboard.writeText(link).then(() => {
    const msg = document.getElementById("mensajeCopiado");

    msg.innerText = "✅ Link copiado al portapapeles";

    // Quitar el mensaje después de 2 segundos
    setTimeout(() => {
      msg.innerText = "";
    }, 2000);
  });
}

const numeroEl = document.getElementById("numerowa");
//     if (numeroEl) {
//         numeroEl.href = whatsapp_number;
      
//     }