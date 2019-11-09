import { useContext, useCallback } from "react";
import { __RouterContext as RouterContext } from "react-router";

export const useRouter = () => {
  return useContext(RouterContext);
};

export const useParams = () => {
  const { match } = useRouter();
  return match.params;
};

export const useLocation = () => {
  const { location, history } = useRouter();

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

  return {
    location,
    navigate
  };
};
