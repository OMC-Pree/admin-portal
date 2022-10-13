import { useEffect, useMemo } from "react";
import { useGetClientsQuery, useLazyGetClientsQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectClients, setClients } from "../coaches/coachesSlice";
import { IUser } from "../user/user";

const MAX_CLIENTS_PER_CALL = 100;

interface IUseCoachClientsProps {
  coachId: string | undefined;
}

function useCoachClients({ coachId }: IUseCoachClientsProps) {
  const dispatch = useAppDispatch();
  const storedClients = useAppSelector(selectClients);
  const { data } = useGetClientsQuery({ max: MAX_CLIENTS_PER_CALL, coachUserId: coachId });
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
      clients: storedClients,
      isLoading,
    }),
    [storedClients, isLoading],
  );
}

export default useCoachClients;
