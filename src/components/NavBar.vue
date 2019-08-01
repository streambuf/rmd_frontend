<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" tag="a" :to="'/'">
        <img src="../assets/logo.png" alt="логотип" width="112" height="28"/>
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
          <a class="navbar-link" :class="rateOrderClass">
            Популярное
          </a>

          <div class="navbar-dropdown">
            <template v-for="(range, index) in ranges">
              <a :key="index" class="navbar-item" :class="range.class" @click="setOrderBestByRange(index, range.type)">
                {{range.name}}
              </a>
            </template>
          </div>
        </div>
        <a class="navbar-item" :class="dateOrderClass" @click="setOrderByDate">
          Свежее
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="isAuthenticated">
              <router-link :to="'/posts/add'" tag="a" class="button is-primary">
                <strong>Написать</strong>
              </router-link>

              <a @click.prevent="logout" class="button is-light">
                <strong>Выход</strong>
              </a>
            </template>
            <template v-else>
              <router-link :to="'/registration'" tag="a" class="button is-primary">
                <strong>Регистрация</strong>
              </router-link>

              <router-link :to="'/login'" tag="a" class="button is-light">
                <strong>Вход</strong>
              </router-link>
            </template>


          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

  import {mapGetters, mapMutations} from 'vuex';


  export default {
    data() {
      return {
        ranges: [
          {
            name: 'За день',
            type: 'DAY',
            class: ''
          },
          {
            name: 'За неделю',
            type: 'WEEK',
            class: ''
          },
          {
            name: 'За месяц',
            type: 'MONTH',
            class: ''
          },
          {
            name: 'За все время',
            type: 'ALL',
            class: ''
          }
        ],
        dateOrder: true
      }
    },
    computed: {
      ...mapGetters('user', {
        isAuthenticated: 'isAuthenticated'
      }),
      dateOrderClass() {
        return this.dateOrder ? 'is-active' : '';
      },
      rateOrderClass() {
        return this.dateOrder ? '' : 'is-active';
      }
    },
    methods: {
      ...mapMutations("postfilters", {
        setRangeDate: "setRangeDate"
      }),
      logout: function () {
        this.$store.dispatch('user/removeUser')
          .then(() => {
            this.$router.push('/')
          })
      },
      setOrderBestByRange(index, rateDate) {
        this.clearRangesClass();
        this.ranges[index].class = 'is-active';
        this.dateOrder = false;
        this.setRangeDate(rateDate);
        this.$emit('applyOrder', {});
        this.$router.push('/')
      },
      setOrderByDate() {
        this.dateOrder = true;
        this.clearRangesClass();
        this.setRangeDate(null);
        this.$emit('applyOrder', {});
        this.$router.push('/')
      },
      clearRangesClass() {
        for (let range of this.ranges) {
          range.class = ''
        }
      }
    }
  };
</script>

<style scoped></style>
