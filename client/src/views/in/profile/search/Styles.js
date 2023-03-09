import { makeStyles } from '@material-ui/core/styles'

const Styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
  },
  fontColor: {
    color: 'black',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  primary: {
    paddingBottom: '1rem',
    fontSize: '1.3rem',
  },
  secondary: {
    fontSize: '1rem',
  },
}))

export default Styles
