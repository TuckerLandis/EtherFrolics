import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Route } from 'react-router-dom';

function InfoCard() {

  return (
    <div>
      <Route path='/home/0'>
        <Card>
          <CardContent>
            <Typography className="cardHeading" variant="h5" color="textSecondary">Our Mission</Typography>
            <Typography variant="body1">The smallest acts of kindness can change the course of someone’s life forever. 
            We exist to provide those acts of kindness to people in underserved areas through delivering holistic, sustainable services.</Typography>
          </CardContent>
        </Card>
      </Route>
      <Route path='/home/1'>
        <Card>
          <CardContent>
            <Typography className="cardHeading" variant="h5" color="textSecondary">Our Vision</Typography>
            <Typography variant="body1">At our core is nourishing the world and the volunteers that make it better. 
            By delivering holistic human services to in-need populations, we enrich the lives of people and empower communities across the globe. </Typography>
            <Typography variant="body1">One day, there will be equitable access to healthcare and human services for all people across the world. </Typography>
          </CardContent>
        </Card>
      </Route>
      <Route path='/home/2'>
        <Card>
          <CardContent>
            <Typography className="cardHeading" variant="h5" color="textSecondary">Our Values</Typography>
            <List>
              {['Education', 'Empowerment', 'Adaptive delivery of services', 'Leverage the power of people and technology', 'Sustainable environmentally sound practices', 'Education is empowerment', 'Employee balance and health', 'Empowering innovation to more efficiently deliver current services and expand to new services', 'Spread good vibes']
              .map((value, i) => {
                  return (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <ChevronRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={value}/>
                    </ListItem>
                  )
              })}
            </List>
          </CardContent>
        </Card>
      </Route>
    </div>
  );
}

export default InfoCard;