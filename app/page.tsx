"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Grid, Box, ListItem } from "@mui/material";
import CardComp from "./components/card/Card";
import { CircularProgress } from "@mui/material";

interface dataProp {
  id: number;
  title: string;
  desc: string;
  author: string;
  date: string;
  img: string;
}

interface blogProp {
  paramount:dataProp[]
  rest:dataProp[]
}


export default function Home() {
  const [blogdata, setBlogdata] = useState<null | blogProp>(null);
  const [paramount, setParamount] = useState<null | dataProp[]>(null);
  const [restdata, setRestdata] = useState<null | dataProp[]>(null);

  useEffect(() => {
    console.log("blogdata", blogdata);
    if (blogdata !== null) {
      setParamount(blogdata.paramount);
      setRestdata(blogdata.rest);
    }
  }, [blogdata]);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then((result) => result.json())
      .then((data) => setBlogdata(data.content));
  }, []);
  return (
    <main className={styles.main}>
      <Box>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
        {paramount ==null ? "" : paramount.map(item => <Box key={item.id}><CardComp title={item.title} desc={item.desc} date={item.date} author={item.author} img={item.img} /></Box>)}
        </Box>
        <Grid container spacing={2}>
          {restdata ==null ?  <CircularProgress color="secondary" size={30}/> :restdata.map(item => <Grid key={item.id} item xs={4}>
            <CardComp title={item.title} desc={item.desc} date={item.date} author={item.author} img={item.img} />
          </Grid>)}
        </Grid>
      </Box>
    </main>
  );
}
