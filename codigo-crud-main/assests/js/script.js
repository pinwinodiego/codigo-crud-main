import {actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona} from "./promesas.js"


window.addEventListener("load",()=>{
    // llamar a la funcion registrar cuando precione el boton registrar 
    document.getElementById("btnRegistrar").addEventListener("click",registrar)

    // llamar la funcion que traiga los datos de la tabla
    traerDatos();
    document.getElementById('btnActualizar').addEventListener('click',actualizar);
})
const registrar=()=>{
    let eNombre=document.getElementById("nombre");
    let eApellido=document.getElementById("apellido");
    let eRut=document.getElementById("rut");
    let eCorreo=document.getElementById("correo");
    let eEdad=document.getElementById("edad");
    let eFnacimiento=document.getElementById("fnacimiento");

    let vNombre=eNombre.value;
    let vApellido=eApellido.value;
    let vRut=eRut.value;
    let vCorreo=eCorreo.value;
    let vEdad=eEdad.value;
    let vFnacimiento=eFnacimiento.value;

    let objeto={nombre:vNombre,
        apellido:vApellido,
        rut:vRut,
        correo:vCorreo,
        edad:vEdad,
        fnacimiento:vFnacimiento}
        // mostrar una alerta de exito al registrar o el error
    registrarPersona(objeto).then(()=>{
        alert("se registró con exito");
        traerDatos(); //se actualiza cada vez que se haga un cambio
    }).catch((r)=>{
        console.log(r)
    });
}

const traerDatos = ()=>{
    // el parametro que esta dentro del then es un listado de algo
    obtenerPersonas().then((personas)=>{
        let estructura = '';
        console.log(personas);
        personas.forEach((p)=>{
            estructura += '</tr>';
            estructura += '<td>'+p.nombre+'</td>';
            estructura += '<td>'+p.apellido+'</td>';
            estructura += '<td>'+p.rut+'</td>';
            estructura += '<td>'+p.correo+'</td>';
            estructura += '<td>'+p.edad+'</td>';
            estructura += '<td>'+p.fnacimiento+'</td>';

            estructura += '<td><button id="UPD'+p.id+'">Actualizar</button></td>'
            estructura += '<td><button id="DEL'+p.id+'">Eliminar</button></td>'

            estructura += '</tr>';

        });
        console.log(estructura);
        document.getElementById('tbPersonas').innerHTML = estructura;
        personas.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener('click',()=>{

                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("UPDfnacimiento").value = p.fnacimiento;
                document.getElementById('btnActualizar').value = p.id;
                // alert('diste click a:' +p.rut)
            });
            // aqui elimino a la persona
            let elementoEliminar = document.getElementById('DEL'+p.id);
            elementoEliminar.addEventListener('click', ()=>{
                eliminar(p.id);
            });
        });  
    }).catch((e)=>{
        console.log(e)
    })

};





const actualizar=()=>{
    let eNombre=document.getElementById("UPDnombre");
    let eApellido=document.getElementById("UPDapellido");
    let eRut=document.getElementById("UPDrut");
    let eCorreo=document.getElementById("UPDcorreo");
    let eEdad=document.getElementById("UPDedad");
    let eFnacimiento=document.getElementById("UPDfnacimiento");
    
    let vNombre=eNombre.value;
    let vApellido=eApellido.value;
    let vRut=eRut.value;
    let vCorreo=eCorreo.value;
    let vEdad=eEdad.value;
    let vFnacimiento=eFnacimiento.value;

    let objeto={nombre:vNombre,
        apellido:vApellido,
        rut:vRut,
        correo:vCorreo,
        edad:vEdad,
        fnacimiento:vFnacimiento}

    let id = document.getElementById('btnActualizar').value;
    actualizarPersona(objeto,id).then(()=>{
        alert('se actualizo correctamente')
        traerDatos(); //se actualiza cuando ocurre un cambio
    }).catch((e)=>{
        console.log(e)
    });
};


const eliminar = (id) => {
    eliminarPersona(id).then(() => {
        alert('Se eliminó correctamente');
        traerDatos(); // Actualizar la tabla después de eliminar
    }).catch((e) => {
        console.log(e);
    });
};


