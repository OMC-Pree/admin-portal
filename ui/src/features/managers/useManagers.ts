import { useEffect, useMemo } from "react";
import { useLazyGetManagersQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { addManagers, selectManagers } from "./managersSlice";

const numResultsPerCall = 50;

function useManagers() {
  const dispatch = useAppDispatch();
  const storedManagers = useAppSelector(selectManagers);
  const [getManagers, result] = useLazyGetManagersQuery();

  useEffect(() => {
    if (storedManagers.length) return;
    getManagers({ max: numResultsPerCall });
  }, []);

  useEffect(() => {
    if (result.data) {
      const {
        data,
        meta: { count, lastEvaluatedKey },
      } = result.data;
      dispatch(addManagers(data));
      if (count === numResultsPerCall) {
        getManagers({ max: numResultsPerCall, lastEvaluatedKey });
      }
    }
  }, [result]);

  return useMemo(
    () => ({
      managers: storedManagers,
    }),
    [storedManagers],
  );
}

export default useManagers;
