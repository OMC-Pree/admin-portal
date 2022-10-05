import { useEffect, useMemo } from "react";
import { useLazyGetCoachesQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { addCoaches, selectCoaches } from "./coachesSlice";

const numResultsPerCall = 100;

function useCoaches() {
  const dispatch = useAppDispatch();
  const storedCoaches = useAppSelector(selectCoaches);
  const [getCoaches, result] = useLazyGetCoachesQuery();

  useEffect(() => {
    if (storedCoaches.length) return;
    getCoaches({ max: numResultsPerCall });
  }, []);

  useEffect(() => {
    if (result.data) {
      const {
        data,
        meta: { count, lastEvaluatedKey },
      } = result.data;
      dispatch(addCoaches(data));
      if (count === numResultsPerCall) {
        getCoaches({ max: numResultsPerCall, lastEvaluatedKey });
      }
    }
  }, [result]);

  return useMemo(
    () => ({
      coaches: storedCoaches,
      coachOptions: storedCoaches.map((coach) => ({
        label: `${coach.firstName} ${coach.lastName}`,
        id: coach.id,
      })),
    }),
    [storedCoaches],
  );
}

export default useCoaches;
