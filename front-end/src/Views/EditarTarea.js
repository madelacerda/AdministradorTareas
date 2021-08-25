import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarTareaAction } from "../actions/tareaActions";
import { useHistory } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import Button from "@material-ui/core/Button";
import { Save } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const EditarTareas = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tarea, setTarea] = useState({
    nombre: "",
    fechacreacion: "",
    vigente: false,
  });

  const tareaeditar = useSelector((state) => state.tareas.tareaeditar);

  useEffect(() => {
    setTarea(tareaeditar);
  }, [tareaeditar]);

  const onChangeFormulario = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre } = tarea;
  const submitEditarTarea = (e) => {
    e.preventDefault();
    console.log(tarea);
    dispatch(editarTareaAction(tarea));

    history.push("/");
  };

  return (
    <div className="containernueva">
      <div className="cardagregar">
        <h2 className="Txttitulo">Editar tarea</h2>

        <div className="contenedorinput">
          <TextField
            name="nombre"
            id="outlined-basic"
            label="Tarea"
            variant="outlined"
            value={nombre}
            onChange={onChangeFormulario}
          />
        </div>

        <div className="cardvigente">
          <Checkbox
            checked={tarea.vigente}
            label={"Vigente"}
            onChange={() => setTarea({ ...tarea, vigente: !tarea.vigente })}
          />
        </div>
        <div className="contboton">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            onClick={submitEditarTarea}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditarTareas;
