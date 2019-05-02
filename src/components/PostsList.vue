<template>
  <div class="columns is-centered">
    <div class="column post-list">
      <div class="post-list-item" v-for="item in array">
        <post-item></post-item>
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
    import {mapGetters} from 'vuex';
    import PostItem from './PostItem';

    export default {
        components: {
            PostItem
        },
        data() {
            return {
                array: [1, 2, 3, 4, 5, 6, 7, 8]
            };
        },
        computed: {
            ...mapGetters('user', {
                userName: 'getName'
            })
        }
    }
</script>

<style scoped>

</style>
