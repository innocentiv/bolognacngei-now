import { useRef, useEffect } from "react";

export const useScrollIntoView = <T extends Element>(deps: any = []) => {
  const elementRef = useRef<T>(null);
  useEffect(() => {
    elementRef.current && elementRef.current.scrollIntoView(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, ...deps]);
  return elementRef;
};
