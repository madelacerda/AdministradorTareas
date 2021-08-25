import {
  AGREGAR_TAREA,
  AGREGAR_TAREA_EXITO,
  AGREGAR_TAREA_ERROR,
  COMENZAR_DESCARGA_TAREAS,
  DESCARGA_TAREAS_ERROR,
  DESCARGA_TAREAS_EXITO,
  OBTENER_TAREA_ELIMINAR,
  TAREA_ELIMINADO_EXITO,
  TAREA_ELIMINADO_ERROR,
  OBTENER_TAREA_EDITAR,
  TAREA_EDITADO_EXITO,
  TAREA_EDITADO_ERROR,
  COMENZAR_EDICION_TAREA,
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function crearNuevoTareaAction(tarea) {
  return async (dispatch) => {
    dispatch(agregarTarea());

    try {
      await clienteAxios.post("/create", tarea);

      dispatch(agregarTareaExito(tarea));

      Swal.fire("Correcto", "La tarea se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarTareaError(true));

      Swal.fire({
        icon: "error",
        title: "Hubo un error,",
        text: "Hubo un error, intenta nuevamente",
      });
    }
  };
}

const agregarTarea = () => ({
  type: AGREGAR_TAREA,
  payload: true,
});

const agregarTareaExito = (tarea) => ({
  type: AGREGAR_TAREA_EXITO,
  payload: tarea,
});

const agregarTareaError = (estado) => ({
  type: AGREGAR_TAREA_ERROR,
  payload: estado,
});

export function obtenerTareaAction() {
  return async (dispatch) => {
    dispatch(descargarTarea());

    try {
      const respuesta = await clienteAxios.get("/list");
      dispatch(descargaTareaExitosa(respuesta.data));
      console.log(respuesta.data);
    } catch (error) {
      console.log(error);
      dispatch(descargaTareaError());
    }
  };
}

const descargarTarea = () => ({
  type: COMENZAR_DESCARGA_TAREAS,
  payload: true,
});

const descargaTareaExitosa = (tarea) => ({
  type: DESCARGA_TAREAS_EXITO,
  payload: tarea,
});

const descargaTareaError = () => ({
  type: DESCARGA_TAREAS_ERROR,
  payload: true,
});

export function borrarTareaAction(id) {
  return async (dispatch) => {
    dispatch(obtenerTareaEliminar(id));
    console.log(id);
    try {
      await clienteAxios.delete(`/delete/${id}`);

      dispatch(eliminarTareaExito());

      Swal.fire("Eliminado!", "la tarea fue eliminado.", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarTareaError());
    }
  };
}

export const obtenerTareaEliminar = (id) => ({
  type: OBTENER_TAREA_ELIMINAR,
  payload: id,
});

const eliminarTareaExito = () => ({
  type: TAREA_ELIMINADO_EXITO,
});

const eliminarTareaError = () => ({
  type: TAREA_ELIMINADO_ERROR,
  payload: true,
});

export function obtenerTareaEditar(tarea) {
  return (dispatch) => {
    dispatch(obtenerTareasAction(tarea));
  };
}

const obtenerTareasAction = (tarea) => ({
  type: OBTENER_TAREA_EDITAR,
  payload: tarea,
});

export function editarTareaAction(tarea) {
  return async (dispatch) => {
    console.log(tarea);
    dispatch(editarTarea());
    try {
      await clienteAxios.put(`/update/${tarea.id}`, tarea);
      dispatch(editarTareaExito(tarea));
    } catch (error) {
      dispatch(editarTareaError());
    }
  };
}

const editarTarea = () => ({
  type: COMENZAR_EDICION_TAREA,
});

const editarTareaExito = (tarea) => ({
  type: TAREA_EDITADO_EXITO,
  payload: tarea,
});

const editarTareaError = () => ({
  type: TAREA_EDITADO_ERROR,
  payload: true,
});
