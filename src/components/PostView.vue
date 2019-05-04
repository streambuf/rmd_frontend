<template>
  <div class="post-view content">
    <template v-for="block in post.blocks" >

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
</template>

<script>
    export default {
        props: ['post'],
        data() {
            return {
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
            }
        }
    }
</script>

<style scoped>

</style>
