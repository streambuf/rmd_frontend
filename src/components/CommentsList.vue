<template>
  <div class="comments-view content">

    <h2>Комментарии</h2>

    <div class="is-divider" data-content="OR"></div>
    <article class="media">
      <div class="media-content comment-editor">
        <div v-if="showCreateComment" class="field">
          <p class="control">
            <comment-create :postId="postId"></comment-create>
          </p>
        </div>
        <div v-if="!showCreateComment" class="field">
          <p class="control">
            <textarea @click="showCreateComment=true" rows="1" class="textarea"
                      placeholder="Написать комментарий..."></textarea>
          </p>
        </div>
      </div>
    </article>
    <div v-for="comment in comments" :key="comment.id" class="content">
    <article class="media">
      <figure class="media-left comment-author-avatar">
        <p class="image is-64x64">
          <img src="../assets/128x128.png">
        </p>
      </figure>
      <div class="media-content">
          <strong>{{comment.author}}</strong> &nbsp;&nbsp;<small>{{moment(comment.createdAt, "YYYY-MM-D HH:mm:ss ZZ").fromNow()}}</small>
          <br>
          <div v-for="(block, index) in comment.message.blocks" :key="index">
            <div v-if="block.type === 'paragraph'" class="comment-block content">
              <p>
                <span v-html="block.data.text"></span>
              </p>
            </div>
            <div v-if="block.type === 'image'">
              <img :src="block.data.file.url" :alt="block.data.caption"/>
              <p>{{ block.data.caption }}</p>
            </div>
          </div>
          <hr>
        </div>
    </article>
    </div>



  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {CommentRepository} from "../mixins/repository/CommentRepository";
  import CommentCreate from "./CommentCreate";
  import Vue from "vue";


  export default {
    props: ['postId'],
    mixins: [CommentRepository],
    components: {
      CommentCreate
    },
    data() {
      return {
        comments: [],
        showCreateComment: false
      };
    },
    computed: {},
    methods: {
      fetchComments() {
        this.apiFetchComments(this.postId, data => {
          this.comments = data;
        });
      }
    },
    watch: {
      postId() {
        this.fetchComments();

      }
    }

  };
</script>

<style scoped></style>
