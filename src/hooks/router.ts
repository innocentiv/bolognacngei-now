import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const useNavigate = () => {
  const history = useHistory();
  const navigate = useCallback(
    (to: string, replace: boolean = false) => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    },
    [history]
  );

  return navigate;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
