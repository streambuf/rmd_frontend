<template>
  <div class="columns is-centered">
    <div class="column post-view-bar">
      <img :src="post.image" alt="image">
    </div>
    <div class="column post-view">
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
</template>

<script>

    import Vue from 'vue';

    export default {
        // props: ['post'],
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
            }
        },
        created() {
            this.fetchPost();
        }
    }
</script>

<style scoped>

</style>
