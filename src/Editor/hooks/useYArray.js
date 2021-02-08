import React from 'react';

const useYArray = (doc, name) => {
  const valueRef = React.useRef(doc.getArray(name));
  const [state, setState] = React.useState(null);
  React.useEffect(() => {
    valueRef.current.observe((event) => {
      setState(valueRef.current.toArray());
    });
  }, []);
  return {
    value: state,
    insertValue: (i, v) => valueRef.current.insert(i, [v]),
    pushValue: (v) => valueRef.current.push([v]),
  };
};

export default useYArray;
