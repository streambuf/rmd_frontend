import Vue from 'vue';

export const PostRepository = {
    methods: {
        apiFetchPosts(onSuccess, onFail = false) {
            Vue.http.get('posts')
                .then(response => response.json())
                .then(response => handleSuccess(response, onSuccess))
                .catch(response => handleFail(response, onFail));
        },

        apiFetchPost(id, onSuccess, onFail = false) {
            Vue.http.get('posts/' + id)
                .then(response => response.json())
                .then(response => handleSuccess(response, onSuccess))
                .catch(response => handleFail(response, onFail));
        },

        apiCreatePost(post, onSuccess, onFail = false) {
            let postRequest = JSON.stringify(post);
            Vue.http.post('posts', postRequest)
                .then(response => response.json())
                .then(response => handleSuccess(response, onSuccess))
                .catch(response => handleFail(response, onFail));
        },

        apiUpdatePost(post, onSuccess, onFail = false) {
            let postRequest = JSON.stringify(this.post);
            Vue.http.put('posts/' + this.postId, postRequest)
                .then(response => response.json())
                .then(response => handleSuccess(response, onSuccess))
                .catch(response => handleFail(response, onFail));
        }
    }
};

function handleSuccess(data, onSuccess) {
    onSuccess(data);
}

function handleFail(response, onFail) {
    if (!onFail) {
        console.log(response);
    } else {
        onFail(response);
    }
}