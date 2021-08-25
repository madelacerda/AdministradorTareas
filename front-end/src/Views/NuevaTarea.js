import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Save } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

//Actions de Redux
import { crearNuevoTareaAction } from "../actions/tareaActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const NuevaTarea = ({ history }) => {
  //State del componente
  const [nombre, guardarNombre] = useState("");

  //Utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.tareas.loading);
  const error = useSelector((state) => state.tareas.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //mandar llamar el action de productoAction
  const agregarTarea = (tarea) => dispatch(crearNuevoTareaAction(tarea));

  //Cuando el usuario haga submit
  const submitNuevoTarea = (e) => {
    e.preventDefault();

    //Validar formulario
    if (nombre.trim() === "") {
      const alerta = {
        msg: "Debe ingresar un nombre a la tarea",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());

    //Crear la nuevo Tarea
    agregarTarea({
      nombre,
      fechac: new Date(),
      vigente: true,
    });

    //Redireccionar
    history.push("/");
  };

  const classes = useStyles();

  return (
    <div className="containernueva">
      <div className="cardagregar">
        <h2 className="Txttitulo">Agregar Tarea</h2>

        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

        <div className="contenedorinput">
          <TextField
            id="outlined-basic"
            label="Nombre de Tarea"
            variant="outlined"
            value={nombre}
            onChange={(e) => guardarNombre(e.target.value)}
          />
        </div>
        <div className="contboton">
          <Button
            variant="contained"
            color="primary"
            size="large"
            // className={}
            startIcon={<Save />}
            onClick={submitNuevoTarea}
          >
            Save
          </Button>
        </div>

        {cargando ? <p>Cargando...</p> : null}
        {error ? <p className="">Hubo un Error</p> : null}
      </div>
    </div>
  );
};

export default NuevaTarea;
