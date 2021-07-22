import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./styles.css";

function App() {
  const [ide, setIde] = useState(1);
  function incrementarId() {
    setIde(() => {
      return ide + 1;
    });
    return ide;
  }
  const [games, setGames] = useState([
    
  ]);

  const formik = useFormik({
    initialValues: {
      title: "",
      release: ""
    },
    onSubmit(values) {
      const data = {
        id: incrementarId(),
        title: values.title,
        release: values.release
      };
      setGames(games.concat(data));
    }
  });
  const handleAtualizar = useCallback(() => {
    setGames(
      games.map((cur) => {
        if (cur.id === "4") {
          return { ...cur, title: "hagleyson", release: "1996" };
        } else {
          return cur;
        }
      })
    );
  }, [setGames, games]);
  const handleRemove = useCallback(() => {
    setGames(
      games.filter((cur) => {
        return cur.id !== "4";
      })
    );
  }, [setGames, games]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          placeholder="nombre"
          type="text"
          {...formik.getFieldProps("title")}
        />
        <input
          placeholder="apellidos"
          type="text"
          {...formik.getFieldProps("release")}
        />
        <input type="submit" value="cadastrar" />
      </form>
      <table>
        <thead>
          <tr>
            <th>numero de lista</th>
            <th>nombre</th>
            <th>apellidos</th>
          </tr>
        </thead>
        <tbody>
          {games.map((cur, idx, arr) => {
            return (
              <tr key={cur.id}>
                <td>{cur.id}</td>
                <td>{cur.title}</td>
                <td>{cur.release}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
