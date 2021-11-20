import { confirmAlert } from 'react-confirm-alert';

const Alert = (type, message, submit, request, func) => {
    if(type === 0) {
        confirmAlert({
            message: message,
            buttons: [
                {
                    label: submit,
                }
            ]
        });
    } else if(type === 1) {
        confirmAlert({
            message: message,
            buttons: [
                {
                    label: request,
                    onClick: func
                },
                {
                    label: submit
                }
            ]
        });
    }
}

export default Alert;