import React, { useState, useEffect } from "react";
import { AxiosAuth } from "./AxiosAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getAllColors = () => {
    AxiosAuth()
      .get("/colors")
      .then(res => setColorList(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAllColors();
  }, []);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getAllColors={getAllColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};
export default BubblePage;
