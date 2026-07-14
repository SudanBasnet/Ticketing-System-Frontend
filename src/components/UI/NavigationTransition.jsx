import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DELAY_MS = 360;

export default function NavigationTransition() {
  const navigate = useNavigate(); const location = useLocation(); const [active, setActive] = useState(false);
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest("a[href]");
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== window.location.origin || target.pathname === location.pathname || target.hash) return;
      event.preventDefault(); setActive(true);
      window.setTimeout(() => { navigate(`${target.pathname}${target.search}${target.hash}`); window.setTimeout(() => setActive(false), 180); }, DELAY_MS);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname, navigate]);
  return <div className={`route-transition ${active ? "route-transition--active" : ""}`} aria-hidden={!active}><div className="route-transition__mark"><span>CQ</span></div><p>Bringing your workspace into focus</p><div className="route-transition__line" /></div>;
}
