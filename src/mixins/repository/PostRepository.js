import Vue from "vue";
import {AbstractRepository} from "./AbstractRepository";

export const PostRepository = {
  mixins: [AbstractRepository],
  methods: {
    apiFetchPosts(size, page, onSuccess, onFail = false) {
      Vue.http
        .get("posts?size=" + size + "&page=" + page)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiFetchPost(id, onSuccess, onFail = false) {
      Vue.http
        .get("posts/" + id)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiCreatePost(post, onSuccess, onFail = false) {
      let postRequest = JSON.stringify(post);
      Vue.http
        .post("posts", postRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiUpdatePost(postId, post, onSuccess, onFail = false) {
      let postRequest = JSON.stringify(post);
      Vue.http
        .put("posts/" + postId, postRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    }
  }
};
