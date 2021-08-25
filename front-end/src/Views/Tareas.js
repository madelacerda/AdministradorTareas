import React, { useEffect } from "react";
import Tarea from "../components/Tarea";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useSelector, useDispatch } from "react-redux";
import { obtenerTareaAction } from "../actions/tareaActions";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Tareas = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarTareas = () => dispatch(obtenerTareaAction());
    cargarTareas();
  }, []);

  //Obtener el STATEtareas
  const tareas = useSelector((state) => state.tareas.tareas);
  const error = useSelector((state) => state.tareas.error);
  const cargando = useSelector((state) => state.tareas.loading);
  console.log(tareas);

  return (
    <div className="containertareas">
      <h2 className="">Listado de Tareas</h2>
      {error ? <p className="">Hubo un error</p> : null}
      {cargando ? <p className="">Cargando..........</p> : null}
      <div className="tablerow">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="trow">
                <TableCell>Tareas</TableCell>
                <TableCell align="right">Fecha de Creacion</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tareas.length === 0
                ? "No hay tareas"
                : tareas.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Tareas;
