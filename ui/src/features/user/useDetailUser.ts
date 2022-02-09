import { useEffect, useMemo, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../api/users";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { IdpErrorResponse } from "../../models/httpCalls";
import { selectDetailUser, setDetailUser } from "./userDetailSlice";

function useDetailUser(id?: string) {
  const dispatch = useAppDispatch();
  const detailUser = useAppSelector(selectDetailUser);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<IdpErrorResponse | void>();
  const [getUser, result] = useLazyGetUserByIdQuery();

  async function loadUser(_id: string) {
    setIsFetching(true);
    setError();
    try {
      await getUser(_id);
    } catch (error) {
      setError(error as IdpErrorResponse);
    }
    setIsFetching(false);
  }

  useEffect(() => {
    if (id) loadUser(id);
  }, [id]);

  useEffect(() => {
    if (result.data && result.data.data.length) dispatch(setDetailUser(result.data.data[0]));
    setIsFetching(false);
  }, [result]);

  async function onRefetch() {
    if (detailUser) loadUser(detailUser.id);
  }

  return useMemo(
    () => ({ detailUser, isFetching, error, refetch: onRefetch }),
    [detailUser, isFetching, error],
  );
}

export default useDetailUser;
