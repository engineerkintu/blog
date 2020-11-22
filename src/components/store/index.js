import React from "react";
import useGlobalHook from "../hook";

import * as actions from "../actions";

const initialState = {
    loading: true
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;