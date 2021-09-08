import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
 


// npm install xml2json
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    }
  }),
);
 

export default function SearchItemsList(props) {
  const { itemsList } = props;
  const classes = useStyles();
  if(itemsList === undefined) return null;
  console.log("List:", itemsList)
  // const item = itemsList[0]
 
  return (
    <List className={classes.root}>
      {itemsList.map((item) => (
          <React.Fragment>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.orange} alt={item.title} src="#" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <React.Fragment>
                        {item.description}
                      </React.Fragment>
                    }
                    onClick={()=>window.open(item.link)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
    </List>
  );
}