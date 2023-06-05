import React from "react";
import Helmet from "react-helmet";

//using this in each page i can put this component and change title for each page
const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default MetaData;
