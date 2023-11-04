import List from "@mui/material/List";
import React from "react";
import SideBarLink from "./SideBarLink";

const SideBarLinkList = () => {
  return (
    <List>
      <SideBarLink path="/" text="Home" icon="home" />
      <SideBarLink path="/favorite" text="Favorite" icon="favorite" />
      <SideBarLink path="/bills" text="Bills" icon="receipt" />
    </List>
  );
};

export default React.memo(SideBarLinkList);
