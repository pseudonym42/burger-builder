import React from 'react';
import styles from './Spinner.module.css';


const spinner = () => {
    return (
        <div className={styles.Loader}>
            Processing ...
        </div>
    )
};

export default spinner;