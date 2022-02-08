import { useEffect, useMemo } from "react";
import { useLazyGetClientsQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectClients, setClients } from "../coaches/coachesSlice";

const numResultsPerCall = 50;

interface IUseCoachClientsProps {
  coachId: string | undefined;
}

function useCoachClients({ coachId }: IUseCoachClientsProps) {
  const dispatch = useAppDispatch();
  const storedClients = useAppSelector(selectClients);
  const [getClients, result] = useLazyGetClientsQuery();

  useEffect(() => {
    if (!coachId) return;
    dispatch(setClients([]));
    getClients({ max: numResultsPerCall, coachUserID: coachId });
  }, [coachId]);

  useEffect(() => {
    if (result.data) {
      const {
        data,
        meta: { count, lastEvaluatedKey },
      } = result.data;
      dispatch(setClients(data));
      if (count === numResultsPerCall) {
        getClients({ max: numResultsPerCall, lastEvaluatedKey, coachUserID: coachId });
      }
    }
  }, [result]);

  return useMemo(
    () => ({
      clients: storedClients,
    }),
    [storedClients],
  );
}

export default useCoachClients;
