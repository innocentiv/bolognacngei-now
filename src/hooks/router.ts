import { useCallback } from "react";
import { useHistory } from "react-router";

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
