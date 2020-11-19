import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export default function NewMerchantForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    displayname: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <p>New Merchant</p>
      <form>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            required
            id="outlined-adornment-email"
            value={values.email}
            onChange={handleChange('email')}
            aria-describedby="outlined-email-helper-text"
            inputProps={{
              'aria-label': 'email',
            }}
            labelWidth={0}
          />
          <FormHelperText id="outlined-email-helper-text">Email</FormHelperText>
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            required
            id="outlined-adornment-displayname"
            value={values.displayname}
            onChange={handleChange('displayname')}
            aria-describedby="outlined-displayname-helper-text"
            inputProps={{
              'aria-label': 'display name',
            }}
            labelWidth={0}
          />
          <FormHelperText id="outlined-displayname-helper-text">Display Name</FormHelperText>
        </FormControl>

        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </form>
    </Container>
  );
}
