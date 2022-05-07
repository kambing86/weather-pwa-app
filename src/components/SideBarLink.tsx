import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRoute } from "hooks/helpers/useRoute";
import React, { useCallback } from "react";

interface Props {
  path: string;
  text: string;
  icon: string;
}

const SideBarLink = ({ path, text, icon }: Props) => {
  const { pushHistory, location } = useRoute();
  const clickHandler = useCallback(() => {
    pushHistory(path);
  }, [path, pushHistory]);
  return (
    <ListItem
      button
      onClick={clickHandler}
      selected={location.pathname === path ? true : false}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default React.memo(SideBarLink);
