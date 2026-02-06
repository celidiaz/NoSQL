import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { db } from "./firebase.js";

/* =======================
   CREATE
======================= */
window.crearUsuarioDesdeHTML = async function () {
  await addDoc(collection(db, "usuarios"), {
    nombre: "Juan Pérez",
    edad: 22,
    correo: "juan@gmail.com"
  });

  alert("Usuario registrado en Firestore");
};

/* =======================
   READ
======================= */
window.obtenerUsuariosDesdeHTML = async function () {
  const resultado = document.getElementById("resultado");
  resultado.textContent = "";

  const querySnapshot = await getDocs(collection(db, "usuarios"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    resultado.textContent +=
      `ID: ${doc.id}\n` +
      `Nombre: ${data.nombre}\n` +
      `Edad: ${data.edad}\n` +
      `Correo: ${data.correo}\n\n`;
  });
};

/* =======================
   UPDATE
======================= */
window.actualizarDesdeHTML = async function () {
  const idUsuario = document.getElementById("idActualizar").value;
  const edadNueva = document.getElementById("edadNueva").value;

  if (!idUsuario || !edadNueva) {
    alert("Faltan datos");
    return;
  }

  await updateDoc(doc(db, "usuarios", idUsuario), {
    edad: Number(edadNueva)
  });

  alert("Usuario actualizado correctamente");
};

/* =======================
   DELETE
======================= */
window.eliminarDesdeHTML = async function () {
  const idUsuario = document.getElementById("idEliminar").value;

  if (!idUsuario) {
    alert("Ingresa el ID del usuario");
    return;
  }

  await deleteDoc(doc(db, "usuarios", idUsuario));

  alert("Usuario eliminado correctamente");
};
