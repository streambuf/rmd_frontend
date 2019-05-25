<template>
  <div class="columns is-centered">
    <div class="column post-list">
      <div v-for="post in posts" :key="post.id">
        <post-item :post="post"></post-item>
      </div>
    </div>

    <div class="column is-narrow is-hidden-mobile is-centered">
      <aside class="menu app-menu">
        <p class="menu-label">
          Площадки
        </p>
        <ul class="menu-list">
          <li><a>Mamba</a></li>
          <li class="is-active"><a>Tinder</a></li>
        </ul>
        <p class="menu-label">
          Город
        </p>
        <ul class="menu-list">
          <li><a>Выбор возраста</a></li>
        </ul>
        <p class="menu-label">
          Пол
        </p>
        <ul class="menu-list">
          <li><a>Отзывы о девушках</a></li>
          <li><a>Отзывы о парнях</a></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
    import PostItem from "./PostItem";
    import {PostRepository} from "../mixins/repository/PostRepository";

    export default {
  components: {
    PostItem
  },
  mixins: [PostRepository],
  data() {
    return {
      posts: []
    };
  },
  methods: {
    fetchPosts() {
      this.apiFetchPosts(data => (this.posts = data));
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<style scoped></style>
