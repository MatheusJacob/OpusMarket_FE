import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  FormControl,
  Button,
  Link,
} from "@material-ui/core";

import {
  MERCHANT_ACCOUNT_PROFILE_PATH
} from "../../routes/_pathDict";

import apiOpus from "../../utils/apiOpusMarket";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formRow: {
    display: 'flex',
  },
  rowInputs: {
    display: 'inline-flex',
    flexGrow: 1,
    margin: theme.spacing(2)
  }
}));

function NewProductConfiguration() {
  const history = useHistory();
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    description: '',
    base_price: ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiOpus.createProduct(values);
    
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    history.push(MERCHANT_ACCOUNT_PROFILE_PATH);
  };


  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Create New Product
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid item className={classes.formRow} xs={12}>
              <FormControl className={classes.rowInputs} variant="outlined">
                <OutlinedInput
                  required
                  id="product-name"
                  value={values.name}
                  onChange={handleChange('name')}
                  aria-describedby="product-name-helper-text"
                  inputProps={{
                    'aria-label': 'name',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="product-name-helper-text">Name</FormHelperText>
              </FormControl>

              <FormControl className={classes.rowInputs} variant="outlined">
                <OutlinedInput
                  required
                  id="product-base-price"
                  value={values.base_price}
                  onChange={handleChange('base_price')}
                  type='number'
                  aria-describedby="product-base-price-helper-text"
                  inputProps={{
                    'aria-label': 'base price',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="product-base-price-helper-text">Price</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item className={classes.formRow} xs={12}>
              <FormControl className={classes.rowInputs} variant="outlined">
                <OutlinedInput
                  multiline
                  id="product-description"
                  value={values.description}
                  onChange={handleChange('description')}
                  aria-describedby="product-description-helper-text"
                  inputProps={{
                    'aria-label': 'description',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="product-description-helper-text">Description</FormHelperText>
              </FormControl>

            </Grid>

            <Grid item xs={12}>
              <Button type="submit" aria-label="create new product" variant="contained" color="primary">
                  Create Product
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Link href="#" onClick={handleCancel}>Cancel</Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewProductConfiguration;