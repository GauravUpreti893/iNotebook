import React, { useState } from 'react';
import ProgressContext from "./ProgressContext";
export default function ProgressState(props) {
  const [progress, setprogress] = useState(0);
  const changeprogress = (prog) => {
    setprogress(prog);
  }
  const [loading, setloading] = useState(false);
  const updateloading = (params) => {
    setloading(params);
  }
  return (
    <ProgressContext.Provider value={{ progress, changeprogress, loading, updateloading }}>
      {props.children}
    </ProgressContext.Provider>
  )
}
