<template>
  <div class="post-list-item">
    <div class="media-left post-media">
      <div class="post-image">
        <a :href="postUrl">
          <img :src="getImageUrl" alt="Image" />
        </a>
      </div>
    </div>
    <div class="media-content post-list-item-media">
      <div class="post-list-item-content content">
        <a :href="postUrl">
          <strong>{{ post.name }} {{ post.age }}, </strong>
          <small>с сайта {{ post.datingService }} </small>
          <small>
            <span class="icon is-small">
              <font-awesome-icon icon="home" />
            </span>
            {{ post.city }}
          </small>
          <div class="post-list-item-content-text">
            <span v-html="prepareText"></span>
          </div>
        </a>
      </div>
      <div class="level is-mobile">
        <div class="level-left post-list-item-footer">
          <a
            class="level-item post-list-item-footer-item"
            aria-label="comments"
          >
            <span class="icon is-small">
              <font-awesome-icon icon="comments" />
            </span>
            &nbsp; 0
          </a>
          <a class="level-item post-list-item-footer-item" aria-label="user">
            <span class="icon is-small">
              <font-awesome-icon icon="user" />
            </span>
            &nbsp;{{ post.author }}
          </a>
        </div>

        <div class="level-right post-list-item-footer">
          <a
            class="level-item post-list-item-footer-item-like"
            aria-label="eye"
          >
            <span class="icon is-small">
              <font-awesome-icon icon="thumbs-up" />
            </span>
          </a>
          <div class="post-list-item-footer-item-score">
            +1
          </div>
          <a
            class="level-item post-list-item-footer-item-like"
            aria-label="user2"
          >
            <span class="icon is-small">
              <font-awesome-icon icon="thumbs-down" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CommonPostMixin } from "../mixins/CommonPostMixin";

export default {
  props: ["post"],
  mixins: [CommonPostMixin],
  computed: {
    prepareText() {
      let blocks = this.post.message.blocks;
      for (let block of blocks) {
        if (block.type === "paragraph") {
          let text = block.data.text;
          if (text.length > 230) {
            return text.substring(0, 230) + "...";
          } else {
            return text;
          }
        }
      }
      return "Отзыв содержит только медиа данные без текста";
    },
    postUrl() {
      return "/posts/" + this.post.slug;
    }
  }
};
</script>

<style scoped></style>
