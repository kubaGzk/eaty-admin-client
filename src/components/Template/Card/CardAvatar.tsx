import React from 'react';
// nod library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components

import styles from '../../../assets/jss/material-dashboard-react/components/cardAvatarStyle';

export interface CardAvatarProps {
  className?: string;
  profile?: boolean;
  plain?: boolean;
}

const useStyles = makeStyles(styles);

const CardAvatar: React.FC<CardAvatarProps> = (props) => {
  const classes = useStyles();
  const { children, className, plain, profile, ...rest } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className || '']: className !== undefined,
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
};

export default CardAvatar;
