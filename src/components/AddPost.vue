<template>
  <div>
    <h1>Add Post</h1>
    <editor
      autofocus
      holder-id="codex-editor"
      save-button-id="save-button"/>
      <!--:init-data="initData" -->
      <!--@save="save"-->
      <!--@ready="onReady"-->
      <!--@change="onChange"-->

  </div>
</template>

<script>
    import { Editor } from 'vue-editor-js'

    export default {
      components: {
        Editor,
      }
    }
</script>

<style scoped>

</style>
