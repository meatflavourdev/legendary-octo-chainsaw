import React from 'react';
import { useStore } from 'react-flow-renderer';
import { createObservableFromRedux } from '@veams/rx-store';
import { iif, of, interval, pipe } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
//import * as Y from 'yjs';

const StateObserver = () => {
  const store = useStore();

  const rxStore = createObservableFromRedux({
    useSingleton: false,
    store: store,
  });

  const nodesState$ = rxStore.select((state) => state.nodes);

  //const currentEvent$ = nodesState$.pipe(mergeMap(v => iif(() => v.type !== 'CursorNode', of(elm), x$)))
  const reactFlowNodes$ = nodesState$.pipe(map((values) => values.filter((elm => elm.type !== 'CursorNode'))))

  reactFlowNodes$.subscribe((data) => {
    console.log('nodesState$.subscribe: ', data);
  });

  /*   function handleUpdate() {
    const state = store.getState().nodes;
    setState(state);

    if (state && prevState) {
      var stateMap = Immutable.Map(state);
      var prevStateMap = Immutable.Map(prevState);

    }
  }

  store.subscribe(handleUpdate); */

  return <></>;
};

export default StateObserver;
