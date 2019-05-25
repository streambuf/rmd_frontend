export const AbstractRepository = {
    methods: {
        handleSuccess(data, onSuccess) {
            onSuccess(data);
        },

        handleFail(response, onFail) {
            if (!onFail) {
                console.log(response);
            } else {
                onFail(response);
            }
        }
    }
};


