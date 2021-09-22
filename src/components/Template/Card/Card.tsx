import React from 'react';
// nod library that concatenates classes
import classNames from 'classnames';
// nod library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

// core components
import styles from '../../../assets/jss/material-dashboard-react/components/cardStyle';

export interface CardProps {
  className?: string;
  plain?: any;
  profile?: any;
  chart?: any;
}

const useStyles = makeStyles(styles);

const Card: React.FC<CardProps> = (props) => {
  const classes = useStyles();

  const { className, children, plain, profile, chart, ...rest } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;
