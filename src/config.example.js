const development = {
    apiBaseUrl : `https://randomuser.me/api`
};

const staging = {
    apiBaseUrl : `https://staging.example.com/api`
};

const production = {
    apiBaseUrl : `https://example.com/api`    
};

const config = {
    development,
    staging,
    production
};

export default {
    // Write additional default configuration here
    //key : value,
    //key : value,
    
    // Spread config object corresponding to current environment
    ...config[ process.env.REACT_APP_ENV ]
};
