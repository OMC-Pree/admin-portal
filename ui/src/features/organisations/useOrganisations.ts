import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import {
  useGetOrganisationsQuery,
  useLazyGetOrganisationsQuery,
} from "../../api/organisationIdentity";
import { GetOrganisationsResponse } from "../../models/httpCalls";
import { Organisation } from "./organisationModel";

const numResultsPerCall = 100;

function useOrganisations() {
  const [getOrganisations] = useLazyGetOrganisationsQuery();
  const { data } = useGetOrganisationsQuery();

  const [organisationRowData, setOrganisationRowData] = useState<Organisation[]>([]);

  const doLoad = async (firstBatch: Organisation[] = []) => {
    let organisations: Organisation[] = [...firstBatch];
    let keepLoading = organisations.length === numResultsPerCall;
    let lastOrganisationId: string | undefined = organisations[organisations.length - 1]?.id;
    while (keepLoading) {
      const { data, meta } = (await getOrganisations({
        max: numResultsPerCall,
        lastEvaluatedKey: lastOrganisationId,
      }).unwrap()) as GetOrganisationsResponse;
      if (data.length) {
        lastOrganisationId = meta.lastEvaluatedKey;
        organisations = organisations.concat(data);
      } else {
        lastOrganisationId = undefined;
      }
      keepLoading = data.length === numResultsPerCall;
    }
    setOrganisationRowData(organisations || []);
  };

  useEffect(() => {
    console.log("starting useEffect");
    if (data?.data) doLoad(data.data);
  }, [data]);

  const formattedOrganisationData: Organisation[] = organisationRowData.map((organisation) => {
    return {
      id: organisation.id,
      name: organisation.name,
      createdAt: format(parseISO(organisation.createdAt), "dd/MM/yyyy"),
      updatedAt: format(parseISO(organisation.updatedAt), "dd/MM/yyyy"),
    };
  });

  return formattedOrganisationData;
}

export default useOrganisations;
