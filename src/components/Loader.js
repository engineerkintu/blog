import React from "react";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import useGlobal from "./store";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  const [globalState] = useGlobal();
  return (
    <div className="sweet-loading">
      <ClockLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={globalState.loading}
      />
    </div>
  );
};

export default Loader;