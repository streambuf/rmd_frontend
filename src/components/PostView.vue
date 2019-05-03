<template>
  <div class="post-view content">
    <template v-for="block in post.blocks">
      <template v-if="block.type === 'paragraph'">
        <p>
          <span v-html="block.data.text"></span>
        </p>
      </template>
      <template v-if="block.type === 'list'">
        <ul>
          <li v-for="item in block.data.items">
            {{item}}
          </li>
        </ul>
      </template>
      <template v-if="block.type === 'header'">
        <component :is="'h' + block.data.level">{{block.data.text}}</component>
      </template>
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

        }
    }
</script>

<style scoped>

</style>
