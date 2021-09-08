import React from "react"
import SearchBar from  './SearcheBar'
import SearchItemsList from './SearchItems';
import {CssBaseline, Typography, Container, Link, Box} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useState} from 'react'

// interface Item {
//   "title": string,
//   "description": string,
//   "link": string,
//   "pubDate"?: string,
// }

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #F5E3F2 1%, #5FE3F2 96%)",
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  searchBar: {
    margin: "5rem",
  },
  search: {
    maxWidth: "100%",
    minHeight: "20vh",
    alignItems: "center",
    display: "flex",
  },
  items: {
    maxWidth: "95%",
    minHeight: "20vh",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center"
  }
});

function SearchPage() {
  const classes = useStyles();
  var XMLParser = require('react-xml-parser');
  const [itemsList, setItemsList] = useState()
  const fetchItemsList = (items) =>{
      const itemsList = []
      // XMLParser
      if(items === undefined) return;
      var xml = new XMLParser().parseFromString(items.data);    // Assume xmlText contains the example XML
      // console.log(xml.getElementsByTagName('item'));
      xml.getElementsByTagName('item').forEach((element) => {

        const item ={
            "title": element.getElementsByTagName('title')[0].value,
            "description": element.getElementsByTagName('description')[0].value,
            "link": element.getElementsByTagName('link')[0].value
        }
        itemsList.push(item)
      });
      setItemsList(itemsList)
  }
 
  return (
     <React.Fragment>
        <CssBaseline />
        <Grid
      className={classes.root}
      spacing={0}
      alignItems="center"
      justify="center"
    >
 
      <Box className={classes.searchBar} component="span" m={1}>
          <SearchBar className={classes.search} fetchItemsList={fetchItemsList} />
      </Box>
      <Container className={classes.items} component="main" maxWidth="lg">
        <SearchItemsList itemsList={itemsList} />
      </Container>
    </Grid>
     </React.Fragment>
  );
}

export default SearchPage;
