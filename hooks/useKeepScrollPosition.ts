import {useRef, useLayoutEffect, useMemo, DependencyList} from "react";

const useKeepScrollPosition = (deps:DependencyList = []) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollPosition = useRef(0);

  useMemo(() => {
    if (containerRef?.current) {
      const container = containerRef?.current;
      previousScrollPosition.current =
        container?.scrollHeight - container?.scrollTop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  useLayoutEffect(() => {
    if (containerRef?.current) {
      const container = containerRef?.current || {};
      container.scrollTop =
        container?.scrollHeight - previousScrollPosition.current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return {
    containerRef
  };
};

export default useKeepScrollPosition;
