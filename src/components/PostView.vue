<template>
  <div class="post-view">
    <template v-for="block in post.blocks">
      <template v-if="block.type === 'paragraph'">
        <p><span v-html="block.data.text"></span></p>
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
