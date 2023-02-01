import { useEffect, useMemo, useState } from "react";
import { useGetUsersByTypeQuery, useLazyGetUsersByTypeQuery } from "../../api/users";
import { GetUsersResponse } from "../../models/httpCalls";
import { UserType } from "../user/userEnums";
import { IUser } from "../user/userModels";

const numResultsPerCall = 50;

function useManagers() {
  const [managers, setManagers] = useState<IUser[]>([]);

  const { data: response } = useGetUsersByTypeQuery({
    type: UserType.MANAGER,
    max: numResultsPerCall,
  });
  const [loadManagers, { isLoading }] = useLazyGetUsersByTypeQuery();

  const doLoad = async (firstBatch: IUser[] = []) => {
    let _managers: IUser[] = [...firstBatch];
    let keepLoading = _managers.length === numResultsPerCall;
    let lastMangerId: string | undefined = _managers[_managers.length - 1]?.id;
    while (keepLoading) {
      const { data, meta } = (await loadManagers({
        type: UserType.MANAGER,
        max: numResultsPerCall,
        lastEvaluatedKey: lastMangerId,
      }).unwrap()) as GetUsersResponse;
      if (data.length) {
        lastMangerId = meta.lastEvaluatedKey;
        _managers = _managers.concat(data);
      } else {
        lastMangerId = undefined;
      }
      keepLoading = data.length === numResultsPerCall;
    }
    setManagers(_managers || []);
  };

  useEffect(() => {
    if (response?.data) doLoad(response.data);
    return () => {
      setManagers([]);
    };
  }, [response]);

  return useMemo(
    () => ({
      managers: managers,
    }),
    [managers, isLoading],
  );
}

export default useManagers;
