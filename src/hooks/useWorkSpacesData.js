import { useEffect, useState } from "react";
import manageWorkApi from "core/API/manageWorkApi";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { UseSpinnerLoading } from "./useSpinnerLoading";

export const useGetWorkSpacesData = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [workSpaces, setworkSpaces] = useState(false);
  const { handleDisplaySpinner } = UseSpinnerLoading();
  const [filteredState, setfilteredState] = useState(() => {
    const param = queryString.parse(location.search);
    return param.status || "all";
  });

  const handleFilter = (filter) => {
    setfilteredState(filter);
    const queryParams = { status: filter };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleAddNewWorkSpaceClick = async (value) => {
    const newWorkSpace = { name: value.workSpace };
    const newWorkSpaces = [...workSpaces, newWorkSpace];
    const param = { name: value.workSpace };
    try {
      handleDisplaySpinner(true);
      const success = await manageWorkApi.postNewWorkSpace(param);
      const msg = t("work-space.successAddWorkSpace");
      enqueueSnackbar(msg, { variant: "success" });
      setworkSpaces(newWorkSpaces);
      handleDisplaySpinner(false);
    } catch (error) {
      handleDisplaySpinner(false);
      const msg = t("work-space.failedAddWorkSpace");
      enqueueSnackbar(msg, { variant: "error" });
    }

    //call api
  };

  useEffect(() => {
    async function getAllWorkSpaces() {
      try {
        handleDisplaySpinner(true);
        const paramReq = { status: filteredState };
        const data = await manageWorkApi.getAllWorkSpaces(paramReq);
        if (!!data.boards) {
          setworkSpaces(data.boards);
        }
        handleDisplaySpinner(false);
      } catch (err) {
        handleDisplaySpinner(false);
        console.log("workSpace", err);
      }
    }

    getAllWorkSpaces();
  }, [filteredState]);
  return { workSpaces, handleFilter, handleAddNewWorkSpaceClick };
};
