export const CommonPostMixin = {
  computed: {
    getImageUrl() {
      if (this.post.image) {
        return this.post.image;
      } else {
        let imageName = this.post.gender === "female" ? "woman.png" : "man.png";
        return require("../assets/" + imageName);
      }
    }
  }
};
