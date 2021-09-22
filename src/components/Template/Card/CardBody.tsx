import React from 'react';
// nod library that concatenates classes
import classNames from 'classnames';
// nod library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

// core components
import styles from '../../../assets/jss/material-dashboard-react/components/cardBodyStyle';

const useStyles = makeStyles(styles);

export interface CardBodyProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
}

const CardBody: React.FC<CardBodyProps> = (props) => {
  const classes = useStyles();
  const { className, children, plain, profile, ...rest } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardBody;
