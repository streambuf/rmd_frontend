import Vue from "vue";
import {AbstractRepository} from "./AbstractRepository";
import {mapGetters} from "vuex";

export const PostRepository = {
  mixins: [AbstractRepository],
  computed: {
    ...mapGetters("postfilters", {
      requestParams: "getRequestParams"
    })
  },
  methods: {
    apiFetchPosts(size, page, onSuccess, onFail = false) {
      console.log(this.requestParams);
      Vue.http
        .get("posts?size=" + size + "&page=" + page + this.requestParams)
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
    },

    votePost(vote, onSuccess, onFail = false) {
      let voteRequest = JSON.stringify(vote);
      Vue.http
        .post("posts/vote", voteRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    }
  }
};
