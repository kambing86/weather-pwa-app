import { Card, CardContent, Grid, Stack } from "@mui/material";
import { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";

const MessageList = () => {
  const messages = useSelector((state: RootState) => state.bills.messages);
  const scrollableGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = scrollableGridRef.current;
    if (grid) {
      const maxHeight = grid.scrollHeight;
      grid.scrollTo({
        top: maxHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);
  return (
    <Grid
      ref={scrollableGridRef}
      item
      xs={12}
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        flex: "1 0 0 !important",
        overflow: "auto",
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ flex: "1 0 0 !important" }}
      >
        {messages.map(({ msg, isUser }, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              alignSelf: isUser ? "flex-end" : "flex-start",
              bgcolor: isUser ? "primary.main" : null,
              color: isUser ? "primary.contrastText" : null,
            }}
          >
            <CardContent sx={{ whiteSpace: "pre-line" }}>{msg}</CardContent>
          </Card>
        ))}
      </Stack>
    </Grid>
  );
};

export default memo(MessageList);
