import React from 'react';
import * as Y from 'yjs';
//import Immutable from 'immutable';

const useYMap = (yDoc, yMapName) => {
  const [YMapState, setYMapState] = React.useState(new Y.YMap());

  React.useEffect(() => {
    const YMap = yDoc.getMap(yMapName);

    const YMapObserver = () => {
      requestAnimationFrame(() => {
        setYMapState(YMap.toJSON());
      });
      // requestAnimationFrame(() => {
      //   setYMapState((baseState) => Immutable.merge(baseState, YMap.toJSON()));
      // });
    };
    YMap.observeDeep(YMapObserver);

    return () => YMap.unobserve(YMapObserver);
  }, [yMapName, yDoc]);

  return [YMapState, setYMapState];
};

export default useYMap;
