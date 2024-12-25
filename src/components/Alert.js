import React, { useContext } from 'react';
import AlertContext from '../context/notes/alertContext';

function Alert() {
    const { alert, showAlert } = useContext(AlertContext);

    return (
        <div style={{ height: '50px' }}>
            {alert &&
                <div className={`alert alert-${alert.type}`} style={{ height: '50px' }}>
                    {alert.msg}
                </div>}
        </div>
    );
}

export default Alert;
