<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" tag="a" :to="'/'">
        <img src="../assets/logo.png" width="112" height="28"/>
      </router-link>

      <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu ">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Популярное
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              За день
            </a>
            <a class="navbar-item">
              За неделю
            </a>
            <a class="navbar-item">
              За месяц
            </a>
            <a class="navbar-item">
              За все время
            </a>
          </div>
        </div>
        <a class="navbar-item">
          Свежее
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="'/posts/add'" tag="a" class="button is-primary">
              <strong>Написать</strong>
            </router-link>

            <router-link :to="'/registration'" tag="a" class="button is-primary">
              <strong>Регистрация</strong>
            </router-link>

            <router-link :to="'/login'" tag="a" class="button is-light">
              <strong>Вход</strong>
            </router-link>

            <a v-if="isAuthenticated" @click.prevent="logout" class="button is-light">
              <strong>Выход</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

    import {mapGetters} from 'vuex';


    export default {

        computed: {
            ...mapGetters('user', {
                isAuthenticated: 'isAuthenticated'
            })
        },
        methods: {
            logout: function () {
                this.$store.dispatch('user/removeUser')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        }
    };
</script>

<style scoped></style>
