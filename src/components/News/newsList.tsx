import React from "react";
import { News } from "../../model";
import MediaCard from "./mediCard";
import { Stack, Typography } from "@mui/material";

type NewsListProps = {
  news: News[];
  title?: string;
};

const NewsList = ({ news, title = "Haberler" }: NewsListProps) => {
  return (
    <Stack>
      <Stack alignItems="center" justifyContent="center">
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </Stack>

      <Stack
        sx={{ height: "300px", overflowY: "scroll" }}
        flexDirection="row"
        flexWrap="wrap"
        gap="10px"
        paddingY="10px"
      >
        {news.map((item, index) => {
          return <MediaCard data={item} key={index} />;
        })}
      </Stack>
    </Stack>
  );
};
export default NewsList;
