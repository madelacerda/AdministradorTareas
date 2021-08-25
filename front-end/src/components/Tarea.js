import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { useDispatch } from "react-redux";
import { borrarTareaAction, obtenerTareaEditar } from "../actions/tareaActions";

const Tarea = ({ tarea }) => {
  const { nombre, id, fechac, vigente } = tarea;
  console.log(id);
  console.log(tarea);
  const dispatch = useDispatch();
  const history = useHistory();

  const confirmarEliminarTarea = (id) => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Una tarea que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(borrarTareaAction(id));
      }
    });
  };

  const [date, setDate] = useState("");

  useEffect(() => {
    if (fechac) {
      setDate(
        new Date(fechac).getFullYear() +
          "-" +
          String(new Date(fechac).getMonth() + 1).padStart(2, 0) +
          "-" +
          String(new Date(fechac).getDate()).padStart(2, 0)
      );
    }
  }, [fechac]);

  const redireccionarEdicion = (tarea) => {
    dispatch(obtenerTareaEditar(tarea));
    history.push(`/tareas/editar/${tarea.id}`);
  };
  console.log(tarea);
  return (
    <TableRow className="tablerow">
      <TableCell className="cellname">{nombre}</TableCell>
      <TableCell className="celldate">
        <span className="font-weight-bold"> {date}</span>
      </TableCell>
      <TableCell className="cellestado">
        <span className="font-weight-bold">
          {" "}
          {vigente ? "Vigente" : " No Vigente"}
        </span>
      </TableCell>
      <TableCell className="cellbutton">
        <Button
          variant="contained"
          color="primary"
          className="btnaccion"
          onClick={() => redireccionarEdicion(tarea)}
          endIcon={<EditIcon></EditIcon>}
        >
          Editar
        </Button>

        <Button
          variant="contained"
          color="secondary"
          className="btnaccion"
          startIcon={<DeleteIcon />}
          onClick={() => confirmarEliminarTarea(id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Tarea;
