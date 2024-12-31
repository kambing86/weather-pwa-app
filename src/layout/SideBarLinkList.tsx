import List from "@mui/material/List";
import React from "react";
import SideBarLink from "./SideBarLink";

const SideBarLinkList = () => {
  return (
    <List>
      <SideBarLink path="/" text="Home" icon="home" />
      <SideBarLink path="/favorite" text="Favorite" icon="favorite" />
      <SideBarLink path="/bills" text="Bills" icon="receipt" />
      <SideBarLink path="/nutrition" text="Nutrition" icon="medication" />
    </List>
  );
};

export default React.memo(SideBarLinkList);
