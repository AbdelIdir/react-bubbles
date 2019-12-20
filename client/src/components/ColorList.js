import React, { useState } from "react";
import { AxiosAuth } from "./AxiosAuth";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getAllColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, id) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    AxiosAuth()
      .put(`/colors/${id}`, colorToEdit)
      .then(res => setColorToEdit(res.data))
      .catch(err => console.log(err));
    getAllColors();
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    AxiosAuth()
      .delete(`colors/${color}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    getAllColors();
  };

  const postColor = e => {
    e.preventDefault();
    AxiosAuth()
      .post("/colors", addColor)
      .then(res => getAllColors())
      .catch(err => console.log(err));
  };

  const useStyles = makeStyles({
    card: {
      maxWidth: 345
    }
  });

  const classes = useStyles();

  const pColor = addColor.color;

  return (
    <div className="colors-wrap">
      <p>colors</p>
      {/* <form onSubmit={postColor}>
        <input
          type="text"
          onChange={e => setAddColor({ ...addColor, color: e.target.value })}
          placeholder="colorName"
          value={addColor.color}
        />
        <input
          type="text"
          placeholder="hex"
          onChange={e =>
            setAddColor({
              ...addColor,
              code: { hex: e.target.value }
            })
          }
          value={addColor.code.hex}
        />
       
        <button>Add a color</button>
      </form> */}

      <form
        style={{ marginTop: "100px", marginBottom: "30px" }}
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={postColor}
      >
        <TextField
          id="outlined-basic"
          label="Add a color"
          variant="outlined"
          type="text"
          onChange={e => setAddColor({ ...addColor, color: e.target.value })}
          placeholder="colorName"
          value={addColor.color}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          id="outlined-basic"
          label="Add a hex"
          variant="outlined"
          type="text"
          placeholder="hex"
          onChange={e =>
            setAddColor({
              ...addColor,
              code: { hex: e.target.value }
            })
          }
          value={addColor.code.hex}
          style={{ marginBottom: "20px" }}
        />
        <Fab
          color="secondary"
          aria-label="add"
          type="submit"
          style={{ marginLeft: "20px" }}
        >
          <AddIcon />
        </Fab>
      </form>
      <p style={{ fontWeight: "900", color: pColor }}>{addColor.color}</p>
      <p style={{ fontWeight: "900", color: pColor }}>{addColor.code.hex}</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
              >
                x
              </span>
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={e => saveEdit(e, colorToEdit.id)}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
