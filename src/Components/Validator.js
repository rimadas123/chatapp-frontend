const Validator = {
    FirstName: {
        rules: [
            {
                test: /^[a-zA-Z]+$/,
                message: 'Firstname must be only alphabets'
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Firstname must min 3 characters'
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    LastName: {
        rules: [
            {
                test: /^[a-zA-Z]+$/,
                message: 'Lastname must be only alphabets'
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Lastname must min 3 characters'
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    password: {
        rules: [
            {
                test: (value) => {
                    return value.length >= 6;
                },
                message: 'Password must not be less than 6 characters'
            },
        ],
        errors:[],
        valid: false,
        state: ''
    },
};

export default Validator;