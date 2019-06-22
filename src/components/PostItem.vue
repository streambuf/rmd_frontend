<template>
  <div class="columns post-list-item">
    <div class="column post-media">
      <figure class="image is-1by1">
        <div class="post-image">
          <a :href="postUrl">
            <img :src="getImageUrl" :alt="imageDescription" />
          </a>
        </div>
      </figure>
    </div>
    <div class="column post-list-item-media">
      <div class="post-list-item-content">
        <router-link :to="postUrl" tag="a">
          <strong>{{ post.name }} {{ post.age }}, </strong>
          <small>с сайта
            <img :src="datingServiceIcon" class="post-list-item-content-icon">
            {{ post.datingService }} </small>
          <small>
            &nbsp;
            <span class="icon is-small">
              <font-awesome-icon icon="map-marker-alt" />
            </span>
            {{ post.city }}
          </small>
          <div class="post-list-item-content-text">
            <span v-html="prepareText"></span>
          </div>
        </router-link>
      </div>
      <div class="level is-mobile post-list-item-footer">
        <div class="level-left">
          <a class="level-item post-list-item-footer-item" aria-label="comments">
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

        <div class="level-right">
          <a class="level-item post-list-item-footer-item-like" aria-label="like">
            <span class="icon is-small">
              <font-awesome-icon icon="chevron-up" />
            </span>
          </a>
          <span class="tag is-primary post-list-item-footer-item-score">1</span>
          <!--<div class="post-list-item-footer-item-score">-->
            <!--+1-->
          <!--</div>-->
          <a class="level-item post-list-item-footer-item-like" aria-label="dislike">
            <span class="icon is-small">
              <font-awesome-icon icon="chevron-down" />
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
    },
    imageDescription() {
      return 'фотография ' + this.post.name + ' с ' + this.post.datingService + ' о котором(ой) написан отзыв';
    },
    datingServiceIcon() {
      return this.getImageUrlByDatingServiceName(this.post.datingService);
    }
  }
};
</script>

<style scoped></style>
