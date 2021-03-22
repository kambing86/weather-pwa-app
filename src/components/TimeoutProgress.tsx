import LinearProgress from "@material-ui/core/LinearProgress";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Props {
  timeout: number;
  onDone?: () => void;
}

const TimeoutProgress = ({ timeout, onDone }: Props) => {
  const timeoutRef = useRef<number>(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const [progress, setProgress] = useState(0);

  const animate = useCallback((time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }
    const timePassed = time - startTimeRef.current;
    const progressValue = (timePassed / timeoutRef.current) * 100;
    setProgress(progressValue);
    if (progressValue < 100) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, []);

  useEffect(() => {
    timeoutRef.current = timeout;
    requestRef.current = requestAnimationFrame(animate);
    startTimeRef.current = undefined;
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [timeout, animate]);

  useLayoutEffect(() => {
    if (progress >= 100) {
      onDone?.();
    }
  }, [progress, onDone]);

  return <LinearProgress variant="determinate" value={progress} />;
};

export default memo(TimeoutProgress);
