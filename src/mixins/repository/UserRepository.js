import Vue from "vue";
import {AbstractRepository} from "./AbstractRepository";

export const UserRepository = {
  mixins: [AbstractRepository],
  methods: {
    apiFetchUser(id, onSuccess, onFail = false) {
      Vue.http
        .get("users/" + id)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiRegisterUser(registerRequest, onSuccess, onFail = false) {
      let jsonRegisterRequest = JSON.stringify(registerRequest);
      Vue.http
        .post("users", jsonRegisterRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiLoginUser(loginRequest, onSuccess, onFail = false) {
      let jsonLoginRequest = JSON.stringify(loginRequest);
      Vue.http
        .post("users/login", jsonLoginRequest)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    }
  }
};
