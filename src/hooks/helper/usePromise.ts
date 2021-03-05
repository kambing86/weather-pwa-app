import { useEffect, useState } from "react";

/*
a helper hook to resolve promise
*/

interface PromiseState<ReturnData> {
  readonly data?: ReturnData;
  readonly error?: Error;
  readonly loading: boolean;
}

function getInitialState<ReturnData>(): PromiseState<ReturnData> {
  return {
    loading: false,
  };
}

export default function usePromise<ReturnData>(
  initialPromise?: () => Promise<ReturnData>,
): [
  PromiseState<ReturnData>,
  React.Dispatch<React.SetStateAction<Promise<ReturnData>>>,
] {
  const [promise, setPromise] = useState<Promise<ReturnData> | undefined>(
    initialPromise,
  );
  const [state, setState] = useState<PromiseState<ReturnData>>(getInitialState);
  useEffect(() => {
    if (!promise) {
      return;
    }
    setState({ loading: true });
    let cleanup = false;
    promise.then(
      (data: ReturnData) => {
        if (!cleanup) {
          setState({ data, loading: false });
        }
      },
      (error: Error) => {
        if (!cleanup) {
          setState({ error, loading: false });
        }
      },
    );
    return () => {
      cleanup = true;
      setState(getInitialState);
    };
  }, [promise]);

  return [
    state,
    setPromise as React.Dispatch<React.SetStateAction<Promise<ReturnData>>>,
  ];
}
