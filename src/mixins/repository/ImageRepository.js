import Vue from "vue";
import {AbstractRepository} from "./AbstractRepository";

export const ImageRepository = {
  mixins: [AbstractRepository],
  methods: {
    apiUploadImageByFile(file, onSuccess, onFail = false) {
      let formData = new FormData();
      formData.append("image", file);
      return Vue.http
        .post("images/uploadByFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    },

    apiUploadImageByUrl(urlImage, onSuccess, onFail = false) {
      let request = JSON.stringify({ url: urlImage });
      return Vue.http
        .post("images/uploadByUrl", request)
        .then(response => response.json())
        .then(response => this.handleSuccess(response, onSuccess))
        .catch(response => this.handleFail(response, onFail));
    }
  }
};
