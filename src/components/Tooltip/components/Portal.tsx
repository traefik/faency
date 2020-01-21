import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: React.ReactNode;
};

const Portal = (props: PortalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const portalNode = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    portalNode.current.setAttribute('data-portal-id', 'tooltip');
    document.body.appendChild(portalNode.current);

    setIsMounted(true);

    return () => {
      if (portalNode.current) {
        document.body.removeChild(portalNode.current);
      }
    };
  }, []);

  return portalNode.current && isMounted
    ? createPortal(props.children, portalNode.current)
    : null;
};

export default Portal;
