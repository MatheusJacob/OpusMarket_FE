import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    Grid
} from '@material-ui/core';
// import { 
//   RemoveShoppingCart,
//   AddCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { createOrder } from '../../actions/actionsCart';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    actionBar: {
      backgroundColor: '#F0FAFA'
    },
    stdPrice: {
      fontSize: '1rem'
    },
    savings: {
      color: '#AA0000',
      fontSize: '1rem'
    },
    finalPrice: {
      fontWeight: 'bold',
      fontSize: '1rem'
    }
}));


function OrderOverviewCard({productDataList}) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const history = useHistory();

  const handleProccedToCheckout = () => {
    console.log("Proceed to checkout triggered")

    // dispatch(createOrder(productDataList));
    history.push(`/cart/buy`);
  }

  const renderTotal = () => {
    const totalBasePrice = productDataList.reduce((acc, product) => {
      return acc + (product.base_price * product.quantity);
    }, 0)

    const totalFinalPrice = productDataList.reduce((acc, product) => {
      let pricePerQty = product.base_price;
      if (product.coupon_discount && product.promotion_price) {
        pricePerQty = Math.floor(product.promotion_price*(1-product.coupon_discount));
      } else if (product.coupon_discount) {
        pricePerQty = Math.floor(product.base_price*(1-product.coupon_discount));
      } else if (product.promotion_price) {
        pricePerQty = product.promotion_price;
      }
      return acc + (pricePerQty * product.quantity);
    }, 0)

    const totalSavings = totalBasePrice - totalFinalPrice;

    if (totalSavings > 0) {
      return (
        <React.Fragment>
          <Typography variant="body1" aria-label="sale price" className={classes.stdPrice}>
            Original Total: ${totalBasePrice/100}
          </Typography>
          <Typography variant="body1" aria-label="sale price" className={classes.savings}>
            Savings: ${totalSavings/100}
          </Typography>
          <Typography variant="body1" aria-label="sale price" className={classes.finalPrice}>
            Cart Total: ${totalFinalPrice/100}
          </Typography>
        </React.Fragment>
      )
    } else {
      return (
        <Typography variant="body1" aria-label="sale price" className={classes.finalPrice}>
          Cart Total: ${totalFinalPrice/100}
        </Typography>
      )
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {renderTotal()}
      </CardContent>
      <CardActions className={classes.actionBar}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Button onClick={handleProccedToCheckout}>
                Proceed to Checkout
              </Button>
            </Grid>
          </Grid>
      </CardActions>      
    </Card>
  );
}

export default OrderOverviewCard;