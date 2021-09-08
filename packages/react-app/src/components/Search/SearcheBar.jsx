/* eslint-disable no-use-before-define */
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const axios = require('axios');
 
const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
  

export default function SearchBar(props) {
  const { fetchItemsList } = props;


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  async function getMsg(api) {
    try {
      const response = await axios.get(api);
      console.log(response);
      fetchItemsList(response)
    } catch (error) {
      console.error(error);
    }
    handleClose()
  }


  return (
    <React.Fragment>
      <Autocomplete
        onChange={(_, newValue) => {
          console.log("NOW:", newValue)
          if(typeof newValue == 'string'){
            return newValue
          }else{
            handleToggle()
            getMsg(newValue.api)
          }
 
        }}
        id="search-bar"
        options={message}
        getOptionLabel={(option) => option.title}
        renderOption={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Crypto-Info" variant="outlined" />
        )}
      />
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}

 

const host = 'https://message-rss.vercel.app'

const message = [
    { title: '链闻快讯', api: `${host}/chainnews/news` },
    { title: '区块律动', api: `${host}/theblockbeats/news` },
    { title: '以太坊周刊', api: `${host}/weekly/ethereum` },
    { title: '瞬热榜', api: `${host}/matataki/posts/hot/:ipfsFlag?` },
    { title: '微博热搜', api: `${host}/weibo/search/hot` },
    { title: 'Rekt', api: `${host}/rekt/news` },
    { title: 'Jobs', api: `${host}/crypto/jobs` },
];
 