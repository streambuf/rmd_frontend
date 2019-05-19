import Vue from "vue";

export const ImageRepository = {
  methods: {
    apiUploadImageByFile(file, onSuccess, onFail = false) {
      let formData = new FormData();
      formData.append("image", file);
      Vue.http
        .post("images/uploadByFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => response.json())
        .then(response => handleSuccess(response, onSuccess))
        .catch(response => handleFail(response, onFail));
    },

    apiUploadImageByUrl(urlImage, onSuccess, onFail = false) {
      let request = JSON.stringify({ url: urlImage });
      Vue.http
        .post("images/uploadByUrl", request)
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
