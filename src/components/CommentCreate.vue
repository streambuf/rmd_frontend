<template>
  <div>
    <div v-if="isAdmin" class="field">
      <label class="label">Логин пользователя</label>
      <div class="control">
        <input
            v-model.trim="fakeAuthor"
            placeholder="От чьего имени пишется комментарий"
        />
      </div>
    </div>
    <div class="comment-editor-message">
      <editor
          :autofocus="false"
          ref="editor"
          @save="onSave"
          @change="onChange"
          :customTools="tools"
          :marker="true"
          :link="true"
          :paragraph="true"
      />

    </div>
    <div class="comment-editor-message-control">
      <button @click="createComment" class="button is-primary">Опубликовать</button>
    </div>
  </div>
</template>

<script>
  import {Editor} from "vue-editor-js";
  import {CommentRepository} from "../mixins/repository/CommentRepository";
  import {ImageRepository} from "../mixins/repository/ImageRepository";
  import ImageTool from "@editorjs/image";
  import {mapGetters} from "vuex";


  export default {
  props: ['postId'],
  components: {
    Editor
  },
  mixins: [CommentRepository, ImageRepository],
  data() {
    return {
      commentMessage: '',
      fakeAuthor: '',
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: process.env.VUE_APP_HOST + "/images/uploadByFile",
              byUrl: process.env.VUE_APP_HOST + "/images/uploadByUrl"
            },
            uploader: {
              uploadByFile: (file) => this.apiUploadImageByFile(file, data => {}),
              uploadByUrl: (url) => this.apiUploadImageByUrl(url, data => {})
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters('user', {
      isAdmin: 'isAdmin'
    }),
  },
  methods: {
    createComment() {
      this.apiCreateComment({postId: this.postId, message: this.commentMessage, fakeAuthor: this.fakeAuthor}, data => {
        this.$router.go();
      });
    },
    onSave(response) {
      this.commentMessage = response;
    },

    onChange() {
      this.$refs.editor.save();
    },

    uploadImageByFile($event) {
      this.apiUploadImageByFile(
        $event.target.files[0],
        data => (this.post.image = data.file.url)
      );
    },

    uploadImageByUrl() {
      this.apiUploadImageByUrl(
        this.urlImage,
        data => (this.post.image = data.file.url)
      );
    },
  }
};
</script>

<style scoped></style>
