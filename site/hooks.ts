import { useRef, useState, useEffect } from "react";

export const useGraph = (GraphClass, data, config: any) => {
  const el = useRef();
  const [instance, setInstance] = useState();
  useEffect(() => {
    const target = new GraphClass(config);
    target.setData(data);
    target.mount(el.current);
    setInstance(target);
  }, []);

  return [el, instance];
};
