<template>
  <div>
    <div class="columns is-centered ">
      <div class="column post-view-title is-10-desktop is-12-touch">
        <h1>
        <span class="post-view-title">
          <strong>
            {{post.name}}, {{post.age}}
          </strong>
        </span>
          <span class="post-view-title">
          <small>с сайта {{post.datingService}}, </small>
        </span>
          <span class="icon is-small">
          <font-awesome-icon icon="home"/>
        </span> {{post.city}}
        </h1>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-3-desktop is-4-tablet is-12-mobile">
        <div class="card ">
          <div class="card-image">
            <figure class="image is-1by1">
              <div class="post-view-image">
                <img :src="getImageUrl" alt="Image">
              </div>
            </figure>
          </div>
          <div class="card-content">
            <div class="content post-view-profile-link">
              <template v-if="post.datingServiceProfileLink">
                <a :href="post.datingServiceProfileLink">Посмотреть анкету на сайте</a>
              </template>
              <template v-else>
                Ссылка на анкету отсутствует
              </template>
            </div>
          </div>
          <footer class="card-footer">
            <!--<a href="#" class="card-footer-item">Сохранить</a>-->
            <a @click.stop.prevent="goToEditing" href="#" class="card-footer-item">Редактировать</a>
            <a href="#" class="card-footer-item">Удалить</a>
          </footer>
        </div>
      </div>

      <div class="column post-view is-7-desktop is-8-tablet">
        <div class="content">
          <template v-for="block in postBlocks">

            <div v-if="block.type === 'paragraph'" class="post-block content">
              <p>
                <span v-html="block.data.text"></span>
              </p>
            </div>

            <div v-if="block.type === 'list'" class="post-block content">
              <ul>
                <li v-for="item in block.data.items">
                  {{item}}
                </li>
              </ul>
            </div>

            <div v-if="block.type === 'header'" class="post-block content">
              <component :is="'h' + block.data.level">{{block.data.text}}</component>
            </div>

            <div v-if="block.type === 'image'" :class="imageWrapperDivClass(block.data)">
              <img :src="block.data.file.url" :alt="block.data.caption"
                   :class="imageClass(block.data)">
              <p>{{block.data.caption}}</p>
            </div>

          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import Vue from 'vue';

    export default {
        data() {
            return {
                post: {}
            }
        },
        computed: {
            postId() {
                return this.$route.params.id;
            },
            postBlocks() {
                if (this.post.message === undefined) {
                    return []
                } else {
                    return this.post.message.blocks;
                }
            },
            getImageUrl() {
                if (!!this.post.image) {
                    return this.post.image;
                } else {
                    let imageName = this.post.gender === 'female' ? 'woman.png' : 'man.png';
                    return require('../assets/' + imageName);
                }
            }
        },
        methods: {
            imageWrapperDivClass(data) {
                if (data.isStretched) {
                    return 'post-block-stretched';
                } else if (data.withBackground) {
                    return 'post-block-background';
                } else {
                    return 'post-block';
                }
            },
            imageClass(data) {
                if (data.withBorder) {
                    return 'post-view-image-bordered';
                } else if (data.withBackground) {
                    return 'post-view-image-background';
                } else {
                    return '';
                }
            },
            fetchPost() {
                Vue.http.get('posts/' + this.postId)
                    .then(response => response.json())
                    .then(data => {
                        this.post = data;
                    }).catch(response => {
                    console.log(response);
                });
            },
            goToEditing() {
                this.$router.push("/posts/edit/" + this.post.id);
            }
        },
        created() {
            this.fetchPost();
        }
    }
</script>

<style scoped>

</style>
