import Vue from "vue";
import {AbstractRepository} from "./AbstractRepository";

export const CommentRepository = {
  mixins: [AbstractRepository],
  methods: {
    apiFetchComments(postId, onSuccess, onFail = false) {
      Vue.http
        .get("comments/" + postId)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiCreateComment(comment, onSuccess, onFail = false) {
      let postRequest = JSON.stringify(comment);
      Vue.http
        .post("comments", postRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    }
  }
};
