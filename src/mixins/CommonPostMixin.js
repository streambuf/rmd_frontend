export const CommonPostMixin = {
  computed: {
    getImageUrl() {
      if (this.post.image) {
        return this.post.image;
      } else {
        let imageName = this.post.gender === "female" ? "woman.png" : "man.png";
        return require("../assets/" + imageName);
      }
    },
  },
  methods:{
    getImageUrlByDatingServiceName(name) {
      let imageName = null;
      switch(name) {
        case 'Mamba':
          imageName = 'mamba.png';
          break;
        case 'Tinder':
          imageName = 'tinder.png';
          break;
        case 'Badoo':
          imageName = 'badoo.png';
          break;
        case 'Dating.ru':
          imageName = 'dating.png';
          break;
        case 'Chpoking.ru':
          imageName = 'chpoking.png';
          break;
        default:
          imageName = 'different.png';
      }
      return require("../assets/dating-icons/" + imageName);
    }
  }
};
