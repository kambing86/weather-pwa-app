import { useEffect, useState } from "react";

/*
a helper hook to resolve promise
*/

interface PromiseState<ReturnData, ErrorThrown> {
  readonly data?: ReturnData;
  readonly error?: ErrorThrown;
  readonly init: boolean;
  readonly loading: boolean;
}

function getInitialState<ReturnData, ErrorThrown>(): PromiseState<
  ReturnData,
  ErrorThrown
> {
  return {
    init: false,
    loading: false,
  };
}

export default function usePromise<ReturnData, ErrorThrown = Error>(
  initialPromise?: () => Promise<ReturnData>,
): [
  PromiseState<ReturnData, ErrorThrown>,
  React.Dispatch<React.SetStateAction<Promise<ReturnData>>>,
] {
  const [promise, setPromise] = useState<Promise<ReturnData> | undefined>(
    initialPromise,
  );
  const [state, setState] = useState<PromiseState<ReturnData, ErrorThrown>>(
    getInitialState,
  );
  useEffect(() => {
    if (!promise) {
      return;
    }
    setState({ init: true, loading: true });
    let cleanup = false;
    promise.then(
      (data: ReturnData) => {
        if (!cleanup) {
          setState((val) => ({ ...val, data, loading: false }));
        }
      },
      (error: ErrorThrown) => {
        if (!cleanup) {
          setState((val) => ({ ...val, error, loading: false }));
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
