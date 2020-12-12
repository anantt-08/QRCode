import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*useeffect RUNS WHEN LOCATIONNCHANGES IE. WHEN ROUTE  LOCATION CHANGES!*/
export default function ScrollToTop() {
  const  pathname  = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
