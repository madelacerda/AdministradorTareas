import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const createNewTask = () => {
    history.push("/tareas/nuevo");
  };
  return (
    <nav className="header">
      <div className="container">
        <h1>
          <Link to={"/"} className="titulo">
            Administrador de Tareas
          </Link>
        </h1>
      </div>

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<Add />}
        onClick={createNewTask}
      >
        Agregar Tarea
      </Button>
    </nav>
  );
};

export default Header;
