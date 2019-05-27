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
        bottom: false,
        size: 25,
        page: 0,
        posts: []
      };
    },
    methods: {
      fetchPosts(size, page) {
        this.apiFetchPosts(size, page, data => (this.posts = this.posts.concat(data)));
      },
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        return bottomOfPage || pageHeight < visible
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      });
      this.fetchPosts(this.size, this.page);
    },
    watch: {
      bottom(bottom) {
        if (bottom) {
          this.page += 1;
          this.fetchPosts(this.size, this.page);
        }
      }
    }

  };
</script>

<style scoped></style>
