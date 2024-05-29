import { addDoc,collection,getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

export const registrarPersona=async(persona)=>{
    console.log(persona);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "personas"),persona);
}
export const obtenerPersonas = async ()=>{
    // recupero la referencia
    const referencia = collection(db,'personas');
    // obtengo la captura 
    const querySnapshot = await getDocs(referencia);
    // console.log(querySnapshot);
    let personas = []
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // los ... desarma el diccionario para poner los datos por separado y ingresarlos al diccionario nuevo
        personas.push({...doc.data(), id:doc.id})
    }); 

    // console.log(personas)
    return personas
}
      
export const actualizarPersona = async(persona,id)=>{
    // console.log("ACA")
    // console.log(persona)
    // console.log(id)
    const ref = doc(db, 'personas', id);
    await updateDoc(ref, persona)
}


export const eliminarPersona = async(id)=>{
    const ref = doc(db,'personas',id);
    await deleteDoc(ref);
}
