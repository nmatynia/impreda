import React from 'react';
import clsxm from '../../utils/clsxm';
import styles from './Loader.module.scss';

export const Loader = ({ className }: { className?: string }) => {
  return <div className={clsxm(styles.loader, className)} />;
};
