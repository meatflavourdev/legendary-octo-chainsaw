import React from "react";
import * as Y from "yjs";

const useYArray = (yDoc, yArrayName) => {
  const [yArrayState, setYArrayState] = React.useState([]);

  React.useEffect(() => {
    const yArray = yDoc.getArray(yArrayName);

    const yArrayObserver = (yArrayEvent, transaction) => {
      //console.log('yEvent: ', yEvent);

      /*       const changeIndex = yEvent.delta[0].retain;

      if (yEvent.changes.added.size) {
        const elements = yEvent.delta[1].insert;
        console.log(`Elements to insert at index[${changeIndex}]: `, elements);
      }
      if (yEvent.changes.deleted.size) {
        const elements = yEvent.delta[1].delete;
        console.log(`Elements to delete at index[${changeIndex}]: `, elements);
      } */
      //if (yEvent instanceof Y.YArrayEvent) {
      //const op = Object.keys(changesDelta[1]);
      //const node = Object.values(changesDelta[1])[0];
      //console.log(`Observed change -- index: ${index} op: ${op} node: `, node); */
      //}
      //console.log('yArrayObserver: ', yArrayEvent, transaction);

      requestAnimationFrame(() => {
        //console.log("yArray Conversion: ", yArray.toArray(), yArray.toJSON());
        setYArrayState(yArray.toJSON());
      });
    };
    yArray.observeDeep(yArrayObserver);

    return () => yArray.unobserve(yArrayObserver);
  }, [yDoc, yArrayName]);

  return [yArrayState, setYArrayState];
};

export default useYArray;
