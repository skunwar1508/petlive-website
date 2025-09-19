import React from 'react';

const getErrorMessage = (formik, path) => {
    const touched = path.reduce((acc, key) => acc?.[key], formik.touched);
    const error = path.reduce((acc, key) => acc?.[key], formik.errors);
    return touched && error ? <div className="errorMsg">{error}</div> : null;
};

export const ErrorMessage = ({ formik, name }) => {
    return <>{getErrorMessage(formik, [name])}</>;
};

export const ErrorMessageOBJ = ({ formik, name, parent }) => {
    return <>{getErrorMessage(formik, [parent, name])}</>;
};

export const ErrorMessageARRAY = ({ formik, name, parent, index }) => {
    return <>{getErrorMessage(formik, [parent, index, name])}</>;
};

export const ErrorMessageNested = ({ formik, path }) => {
    return <>{getErrorMessage(formik, path)}</>;
};
