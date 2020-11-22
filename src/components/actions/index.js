export const displayLoader = (store) => {
    const loading = true;
    store.setState({ loading });
};

// export const removeLoader = (store) => {
//     const loading = false;
//     store.setState({ loading });
// };