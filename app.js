// 🔹 Configuración real de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCC5XJy3oqmDoTKgDMefB1zjp7XAFgTxWo",
  authDomain: "matchgym-e7df0.firebaseapp.com",
  projectId: "matchgym-e7df0",
  storageBucket: "matchgym-e7df0.firebasestorage.app",
  messagingSenderId: "766710296254",
  appId: "1:766710296254:web:a01ca1d2ee5d362b45b8ef",
  measurementId: "G-D4VWL0H0K9"
};

// 🔹 Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔹 Referencias al DOM
const btnLogin = document.getElementById("btn-login");
const btnSalir = document.getElementById("btn-salir");
const pantallaLogin = document.getElementById("pantalla-login");
const pantallaApp = document.getElementById("pantalla-app");
const nombreUsuario = document.getElementById("nombre-usuario");
const msgError = document.getElementById("msg-error");

// Dominio institucional permitido
const DOMINIO_PERMITIDO = "@mail.pucv.cl";

// 🔹 Escuchar cambios de sesión
auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email || "";

    // Si el correo NO es institucional, lo expulsamos
    if (!email.endsWith(DOMINIO_PERMITIDO)) {
      auth.signOut();
      mostrarError("Solo se permite acceso con correos " + DOMINIO_PERMITIDO);
      return;
    }

    // Usuario válido
    nombreUsuario.textContent = user.displayName || email;
    pantallaLogin.style.display = "none";
    pantallaApp.style.display = "block";
    msgError.style.display = "none";
  } else {
    // No hay sesión activa
    pantallaLogin.style.display = "block";
    pantallaApp.style.display = "none";
  }
});

// 🔹 Login con Google
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      // El resto lo maneja onAuthStateChanged
    } catch (err) {
      console.error(err);
      mostrarError("No se pudo iniciar sesión. Intenta nuevamente.");
    }
  });
}

// 🔹 Cerrar sesión
if (btnSalir) {
  btnSalir.addEventListener("click", () => {
    auth.signOut();
  });
}

// 🔹 Función para mostrar errores
function mostrarError(texto) {
  if (!msgError) return;
  msgError.textContent = texto;
  msgError.style.display = "block";
}


// resto del código...
