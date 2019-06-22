<template>
  <div>
    <vue-headful :title="title"
                 description="Истории свиданий и отзывы о встречах с людьми с сайтов знакомств - читайте анонимные отзывы о свиданиях!
                 Лучшие анонимные отзывы о знакомствах в интернете - расскажите о своем свидании с сайта знакомств!"/>

    <a @click="toggleMobileMenuFilters" class="div-link">
    <div class="level post-filter-menu-mobile-toggle is-mobile is-hidden-desktop-only is-hidden-widescreen-only is-hidden-tablet-only">
      <div class="level-left">
        <div class="level-item">
          {{toggleMobileMenuFiltersLabel}}
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <span class="icon is-large fa-lg">
            <font-awesome-icon icon="sliders-h" />
          </span>
        </div>
      </div>
    </div>
    </a>

    <div class="columns is-centered">

      <div v-if="mobileMenuFiltersShow" class="is-mobile is-hidden-desktop-only is-hidden-widescreen-only is-hidden-tablet-only">
        <posts-filter :menuClass="'post-filter-menu-mobile'"></posts-filter>
      </div>

      <div class="column post-list">
        <div v-if="containsPosts" v-for="post in posts" :key="post.id">
          <post-item :post="post"></post-item>
        </div>
        <div v-if="!containsPosts">
          <strong><i>Отзывы с указанными параметрами на найдены. <br> Измените фильтры поиска или обновите страницу, чтобы они сбросились.</i></strong>
        </div>
      </div>

      <div class="column is-narrow is-hidden-mobile is-centered">
        <posts-filter
            @applyPostFilters="onApplyFilters"
            :menuClass="'post-filter-menu'"></posts-filter>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import PostItem from "./PostItem";
  import PostsFilter from "./PostsFilter";
  import {PostRepository} from "../mixins/repository/PostRepository";
  import {CommonPostMixin} from "../mixins/CommonPostMixin";


  export default {
    components: {
      PostItem, PostsFilter
    },
    mixins: [PostRepository, CommonPostMixin],
    data() {
      return {
        bottom: false,
        posts: [],
        size: 25,
        page: 0,
        mobileMenuFiltersShow: false,
        containsPosts: true
      };
    },
    computed: {
      title() {
        return 'RateMyDate - оцени мое свидание. Отзывы о людях с сайтов знакомтсв.'
      },
      toggleMobileMenuFiltersLabel() {
        return this.mobileMenuFiltersShow ? 'Скрыть фильтры' : 'Настроить фильтры'
      },
    },
    methods: {
      fetchPosts(size, page) {
        this.apiFetchPosts(size, page, data => {
          this.posts = this.posts.concat(data);
          this.containsPosts = this.posts.length > 0;
        });
      },
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        return bottomOfPage || pageHeight < visible
      },
      toggleMobileMenuFilters() {
        this.mobileMenuFiltersShow = !this.mobileMenuFiltersShow;
      },
      onApplyFilters(e) {
        this.posts = [];
        this.fetchPosts(25, 0);
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
