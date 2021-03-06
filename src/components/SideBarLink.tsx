import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useRoute } from "hooks/helpers/useRoute";
import React, { useCallback } from "react";

interface Props {
  path: string;
  text: string;
  icon: JSX.Element;
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
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default React.memo(SideBarLink);
