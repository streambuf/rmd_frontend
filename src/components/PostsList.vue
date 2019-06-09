<template>
  <div>
    <vue-headful :title="title" description=""/>

    <a class="div-link">
    <div class="level app-menu-mobile-toggle is-mobile is-hidden-desktop-only is-hidden-widescreen-only is-hidden-tablet-only">
      <div class="level-left">
        <div class="level-item">
          Настроить фильтры
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

    <aside class="menu app-menu-mobile is-hidden">
    </aside>

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
            <template v-for="(datingService, index) in datingServices">
              <form-switch :name="datingService.name" :iconUrl="getImageUrlByDatingServiceName(datingService.name)"></form-switch>
            </template>
          <p class="menu-label">
            Город
          </p>
          <p class="control has-icons-left">
            <span class="select is-primary">
              <select>
                <option selected>Любой</option>
                <option v-for="location in locations" :key="location.city">
                  {{ location.city }}
                </option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <font-awesome-icon icon="map-marker-alt"/>
            </span>
          </p>
          <p class="menu-label">
            Возраст
          </p>
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
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import PostItem from "./PostItem";
  import FormSwitch from "./form/FormSwitch";
  import {PostRepository} from "../mixins/repository/PostRepository";
  import {CommonPostMixin} from "../mixins/CommonPostMixin";


  export default {
    components: {
      PostItem, FormSwitch
    },
    mixins: [PostRepository, CommonPostMixin],
    data() {
      return {
        bottom: false,
        size: 25,
        page: 0,
        posts: [],
        datingServices: [
          {
            name: 'Mamba'
          },
          {
            name: 'Tinder'
          },
          {
            name: 'Badoo'
          },
          {
            name: 'Dating.ru'
          },
          {
            name: 'Chpoking.ru'
          },
          {
            name: 'Остальные'
          },
        ]
      };
    },
    computed: {
      ...mapGetters("locations", {
        locations: "getLocations"
      }),
      title() {
        return 'RateMyDate - оцени мое свидание. Отзывы о людях с сайтов знакомтсв.'
      }
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
