<template>
  <div>
    <vue-headful
        :title="title"
        :description="post.description"
    />

    <div class="columns is-centered ">
      <div class="column post-view-title is-10-desktop is-12-touch">
        <h1>
          <span class="post-view-title">
            <strong> {{ post.name }}, {{ post.age }} </strong>
          </span>
          <span class="post-view-title">
            <small>с сайта {{ post.datingService }}, </small>
          </span>
          <span class="icon is-small">
            <font-awesome-icon icon="home"/>
          </span>
          {{ post.city }}
        </h1>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-3-desktop is-4-tablet is-12-mobile">
        <div class="card ">
          <div class="card-image">
            <figure class="image is-1by1">
              <div class="post-view-image">
                <img v-if="post.id" :src="getImageUrl" :alt="imageDescription"/>
              </div>
            </figure>
          </div>
          <div class="card-content">
            <div class="content post-view-profile-link">
              <template v-if="post.datingServiceProfileLink">
                <a v-if="isAuthenticated" :href="post.datingServiceProfileLink">Посмотреть анкету на сайте</a>
                <router-link v-else :to="'/registration'" tag="a">
                  <strong>Ссылка на анкету доступна после регистрации</strong>
                </router-link>
              </template>
              <template v-else>
                Ссылка на анкету отсутствует
              </template>
            </div>
          </div>
          <footer v-if="isAuthorOrAdmin" class="card-footer">
            <!--<a href="#" class="card-footer-item">Сохранить</a>-->
            <a
                @click.stop.prevent="goToEditing"
                href="#"
                class="card-footer-item"
            >Редактировать</a
            >
            <a href="#" class="card-footer-item">Удалить</a>
          </footer>
        </div>
      </div>

      <div class="column is-7-desktop is-8-tablet post-view ">
          <div class="content post-view-content">
            <div v-for="(block, index) in postBlocks" :key="index">
              <div v-if="block.type === 'paragraph'" class="post-block content">
                <p>
                  <span v-html="block.data.text"></span>
                </p>
              </div>

              <div v-if="block.type === 'list'" class="post-block content">
                <ul>
                  <li v-for="(item, index) in block.data.items" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="block.type === 'header'" class="post-block content">
                <component :is="'h' + block.data.level">{{
                  block.data.text
                  }}
                </component>
              </div>

              <div
                  v-if="block.type === 'image'"
                  :class="imageWrapperDivClass(block.data)"
              >
                <img
                    :src="block.data.file.url"
                    :alt="block.data.caption"
                    :class="imageClass(block.data)"
                />
                <p>{{ block.data.caption }}</p>
              </div>
            </div>
            <div class="post-block content">
              <p> Это мое личное мнение и оценочное суждение.</p>
            </div>

          </div>
          <comment-list :postId="post.id"></comment-list>
        </div>
    </div>
  </div>
</template>

<script>
  import {CommonPostMixin} from "../mixins/CommonPostMixin";
  import {PostRepository} from "../mixins/repository/PostRepository";
  import {mapGetters} from 'vuex';
  import CommentList from "./CommentsList";
  import PostItem from "./PostItem";


  export default {
    mixins: [CommonPostMixin, PostRepository],
    components: {
      CommentList
    },
    data() {
      return {
        post: {},
      };
    },
    computed: {
      ...mapGetters('user', {
        isAdmin: 'isAdmin',
        currentLogin: 'getCurrentLogin',
        isAuthenticated: 'isAuthenticated'
      }),
      postId() {
        return this.$route.params.id;
      },
      postBlocks() {
        if (this.post.message === undefined) {
          return [];
        } else {
          return this.post.message.blocks;
        }
      },
      isAuthorOrAdmin() {
        return this.currentLogin === this.post.author || this.isAdmin;
      },
      title() {
        return "Отзыв с сайта знакомств " + this.post.datingService + " " + this.post.name + " возраст " + this.post.age +
          " город " + this.post.city;
      },
      imageDescription() {
        return 'фотография ' + this.post.name + ' с ' + this.post.datingService + ' о котором(ой) написан отзыв';
      }
    },
    methods: {
      imageWrapperDivClass(data) {
        if (data.isStretched) {
          return "post-block-stretched";
        } else if (data.withBackground) {
          return "post-block-background";
        } else {
          return "post-block";
        }
      },
      imageClass(data) {
        if (data.withBorder) {
          return "post-view-image-bordered";
        } else if (data.withBackground) {
          return "post-view-image-background";
        } else {
          return "";
        }
      },
      fetchPost() {
        this.apiFetchPost(this.postId, data => (this.post = data), resp => {
          if (resp.status === 404) {
            this.$router.push("/404.html");
          }
        });
      },
      goToEditing() {
        this.$router.push("/posts/edit/" + this.post.slug);
      }
    },
    created() {
      this.fetchPost();
    }
  };
</script>

<style scoped></style>
