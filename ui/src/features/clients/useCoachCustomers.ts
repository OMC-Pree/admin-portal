import { useEffect, useMemo } from "react";
import { useGetUsersByCoachIdQuery, useLazyGetClientsQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectClients, setClients } from "../coaches/coachesSlice";
import { IUser } from "../user/userModels";

const MAX_CLIENTS_PER_CALL = 100;

interface UseCoachCustomersProps {
  coachId: string | undefined;
}

function useCoachCustomers({ coachId }: UseCoachCustomersProps) {
  const dispatch = useAppDispatch();
  const storedCustomers = useAppSelector(selectClients);

  const { data } = useGetUsersByCoachIdQuery(coachId);
  const [getClients, { isLoading }] = useLazyGetClientsQuery();

  const doLoad = async (firstBatch: IUser[] = []) => {
    let _clients = [...firstBatch];
    let keepLoading = _clients.length === MAX_CLIENTS_PER_CALL;
    let lastClientId: string | undefined = data?.meta.lastEvaluatedKey;

    while (keepLoading) {
      const result = await getClients({
        max: MAX_CLIENTS_PER_CALL,
        coachUserId: coachId,
        lastEvaluatedKey: lastClientId,
      }).unwrap();

      if (result.data.length) {
        lastClientId = result.meta.lastEvaluatedKey;
        _clients = _clients.concat(result.data);
      } else {
        lastClientId = undefined;
      }
      keepLoading = result.data.length === MAX_CLIENTS_PER_CALL;
    }
    dispatch(setClients(_clients));
  };
  useEffect(() => {
    if (data?.data) doLoad(data.data);
    return () => {
      dispatch(setClients([]));
    };
  }, [data]);

  return useMemo(
    () => ({
      customers: storedCustomers,
      isLoading,
    }),
    [storedCustomers, isLoading],
  );
}

export default useCoachCustomers;
