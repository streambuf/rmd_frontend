<template>
  <div>
    <div class="columns is-centered">
      <div class="column post-editor content">
        <editor v-show="isEditor"
                :autofocus="true"
                ref="editor"
                @save="onSave"
                @ready="onReady"
                @change="onChange"
                :customTools="tools"
                :header="true"
                :list="true"
                :marker="true"
                :link="true"
                :paragraph="true"
        />
        <post-view v-show="!isEditor" :post="post"></post-view>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column post-editor-save-button-wrapper buttons has-addons">
        <button @click="toggleViewEditor" class="button is-info post-editor-button">{{viewButton}}</button>
        <button @click="createPost" class="button is-primary post-editor-button">Опубликовать</button>
      </div>
    </div>
  </div>
</template>

<script>
    import {Editor} from 'vue-editor-js'
    import ImageTool from '@editorjs/image';
    import PostView from './PostView'

    export default {
        components: {
            Editor,
            PostView
        },
        data() {
            return {
                post: {},
                isEditor: true,
                tools: {
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: "http://localhost:8008/uploadFile",
                                byUrl: "http://localhost:8008/uploadFile"
                            }
                        }
                    }
                },
            }
        },
        computed: {
            viewButton() {
                return this.isEditor ? 'Предпросмотр' : 'Продолжить редактирование';
            }
        },
        methods: {
            createPost() {
                this.$refs.editor.save();
            },
            onSave(response) {
                console.log(JSON.stringify(response));
                this.post = response;
            },
            onReady(e) {
            },
            onChange(e) {

            },
            toggleViewEditor() {
                if (this.isEditor) {
                    this.$refs.editor.save();
                }

                this.isEditor = !this.isEditor;
            }
        }
    }
</script>

<style scoped>

</style>
