import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ThemeContext from './context/ThemeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#dadada',
        flexWrap: 'wrap',
        '& > *': {
            width: '100%',
            minHeight: '100vh',
            padding: theme.spacing(2),
            paddingTop: '80px'
        },
    },
    backgroundLight:{        
        backgroundImage: 'linear-gradient(135deg, rgba(75,177,126,1) 0%, rgba(165,252,69,1) 51%, rgba(70,193,48,1) 100%)',
    },
    backgroundDark:{        
        backgroundImage: 'linear-gradient(135deg, rgba(75,177,126,0.742734593837535) 0%, rgba(42,73,58,1) 51%, rgba(75,177,126,0.6558998599439776) 100%)',
    }
}));
export default function Layout(props) {
    const { dark } = useContext(ThemeContext);
    const classes = useStyles();

    return (
        <div className={classes.root +" "+ (dark? classes.backgroundDark : classes.backgroundLight) }>
            <Container fixed>
                {props.children}
            </Container>
        </div>
    );
}
