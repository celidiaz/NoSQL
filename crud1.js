// ===============================
// IMPORTACIONES
// ===============================
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { db } from "./firebase.js";

// ===============================
// CREATE
// Crear usuario + subcolección
// ===============================
//await setDoc(doc(db, "usuarios", idUsuario)
window.crearUsuarioConCurso = async function () {
  try {
    // 1. Crear documento padre (usuario)
    const usuarioRef = await addDoc(collection(db, "usuarios"), {
      nombre: "Juan Pérez",
      edad: 22,
      correo: "juan@gmail.com"
    });

    // 2. Crear documento en la subcolección
    await addDoc(
      collection(db, "usuarios", usuarioRef.id, "cursos"),
      {
        nombre: "NoSQL con Firebase",
        creditos: 6
      }
    );

    alert("Usuario y curso creados correctamente");
  } catch (error) {
    console.error(error);
    alert("Error al crear usuario");
  }
};

// ===============================
// READ
// Leer usuarios y subcolecciones
// ===============================
window.obtenerUsuariosYCurso = async function () {
  const resultado = document.getElementById("resultado");
  resultado.textContent = "";

  try {
    const usuariosSnapshot = await getDocs(collection(db, "usuarios"));

    if (usuariosSnapshot.empty) {
      resultado.textContent = "No hay usuarios registrados";
      return;
    }

    for (const usuarioDoc of usuariosSnapshot.docs) {
      const usuario = usuarioDoc.data();

      resultado.textContent +=
        `USUARIO ID: ${usuarioDoc.id}\n` +
        `Nombre: ${usuario.nombre}\n` +
        `Edad: ${usuario.edad}\n` +
        `Correo: ${usuario.correo}\n`;

      // Subcolección
      const cursosSnapshot = await getDocs(
        collection(db, "usuarios", usuarioDoc.id, "cursos")
      );

      if (cursosSnapshot.empty) {
        resultado.textContent += "  Sin cursos registrados\n";
      } else {
        cursosSnapshot.forEach((cursoDoc) => {
          const curso = cursoDoc.data();
          resultado.textContent +=
            `  CURSO ID: ${cursoDoc.id}\n` +
            `  Nombre: ${curso.nombre}\n` +
            `  Créditos: ${curso.creditos}\n`;
        });
      }

      resultado.textContent += "\n-----------------------------\n\n";
    }
  } catch (error) {
    console.error(error);
    resultado.textContent = "Error al obtener los datos";
  }
};

// ===============================
// UPDATE
// Actualizar curso (subcolección)
// ===============================
window.actualizarCurso = async function () {
  const userId = document.getElementById("userIdCurso").value;
  const cursoId = document.getElementById("cursoIdActualizar").value;
  const creditosNuevos = document.getElementById("creditosNuevos").value;

  if (!userId || !cursoId || !creditosNuevos) {
    alert("Faltan datos");
    return;
  }

  try {
    await updateDoc(
      doc(db, "usuarios", userId, "cursos", cursoId),
      {
        creditos: Number(creditosNuevos)
      }
    );

    alert("Curso actualizado correctamente");
  } catch (error) {
    console.error(error);
    alert("Error al actualizar el curso");
  }
};

// ===============================
// DELETE
// Eliminar curso (subcolección)
// ===============================
window.eliminarCurso = async function () {
  const userId = document.getElementById("userIdEliminar").value;
  const cursoId = document.getElementById("cursoIdEliminar").value;

  if (!userId || !cursoId) {
    alert("Faltan IDs");
    return;
  }

  try {
    await deleteDoc(
      doc(db, "usuarios", userId, "cursos", cursoId)
    );

    alert("Curso eliminado correctamente");
  } catch (error) {
    console.error(error);
    alert("Error al eliminar el curso");
  }
};
