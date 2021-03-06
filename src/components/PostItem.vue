<template>
  <div class="columns post-list-item">
    <div class="column post-media">
      <figure class="image is-1by1">
        <div class="post-image">
          <a :href="postUrl">
            <img :src="getImageUrl" :alt="imageDescription"/>
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
            {{ post.datingService }}
          </small>
          <small>
            &nbsp;
            <span class="icon is-small">
              <font-awesome-icon icon="map-marker-alt"/>
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
              <font-awesome-icon icon="comments"/>
            </span>
            &nbsp; {{ postComments }}
          </a>
          <a class="level-item post-list-item-footer-item" aria-label="user">
            <span class="icon is-small">
              <font-awesome-icon icon="user"/>
            </span>
            &nbsp;{{ post.author }}
          </a>
        </div>

        <div class="level-right">
          <a @click="likePost" class="level-item post-list-item-footer-item-like" aria-label="like">
            <span class="icon is-small">
              <font-awesome-icon icon="chevron-up"/>
            </span>
          </a>
          <span class="tag post-list-item-footer-item-score" :class="postRatingClass">{{postRating}}</span>
          <a @click="dislikePost" class="level-item post-list-item-footer-item-like" aria-label="dislike">
            <span class="icon is-small">
              <font-awesome-icon icon="chevron-down"/>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {CommonPostMixin} from "../mixins/CommonPostMixin";
  import {PostRepository} from "../mixins/repository/PostRepository";


  export default {
    props: ["post"],
    mixins: [CommonPostMixin, PostRepository],
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
      },
      postRating() {
        if (this.post.rating === null) {
          return 0;
        }
        return this.post.rating;
      },
      postRatingClass() {
        let rating = this.post.rating;
        if (rating < 0) {
          return 'is-danger';
        } else {
          return 'is-primary';
        }
      },
      postComments() {
        if (this.post.comments === null) {
          return 0;
        }
        return this.post.comments;
      }
    },
    methods: {
      likePost() {
        this.updatePostRating(1, () => this.post.rating++)
      },
      dislikePost() {
        this.updatePostRating(-1, () => this.post.rating--)
      },
      updatePostRating(rating, success, fail) {
        let vote = {
          postId: this.post.id,
          rating: rating
        };
        this.votePost(vote, success, fail)
      }
    }
  };
</script>

<style scoped></style>
