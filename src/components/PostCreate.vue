<template>
  <div>
    <div class="columns is-centered">
      <div class="column post-editor content">


        <div class="post-editor-form">

          <div class="notification is-warning">
            <button class="delete"></button>
            Все поля являются <strong>необязательными</strong> для заполнения, однако они помогут другим найти ваш
            отзыв.
          </div>

          <div class="field">
            <label class="label">Ссылка на анкету человека</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="text"
                     placeholder="Ссылка на анкету человека о котором хотите написать отзыв">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="external-link-alt"/>
              </span>
              <span class="icon is-small is-right">
                <font-awesome-icon icon="check"/>
              </span>
            </div>
            <!--<p class="help is-success">This username is available</p>-->
          </div>

          <div class="field-body">


            <div class="field post-editor-form-selector">
              <label class="label">Сайт знакомства</label>
              <p class="control has-icons-left ">
              <span class="select ">
                <select>
                  <option selected>Выберите</option>
                  <option>Mamba</option>
                  <option>Tinder</option>
                  <option>Badoo</option>
                  <option>Dating.ru</option>
                  <option>Chpoking.ru</option>
                </select>
              </span>
                <span class="icon is-small is-left">
                <font-awesome-icon icon="venus-mars"/>
              </span>
              </p>
            </div>

            <div class="field post-editor-form-selector">
              <label class="label">Город</label>
              <p class="control has-icons-left">
              <span class="select">
                <select>
                  <option selected>Выберите</option>
                  <option v-for="location in locations">
                    {{location.city}}
                  </option>
                </select>
              </span>
                <span class="icon is-small is-left">
                <font-awesome-icon icon="globe"/>
              </span>
              </p>
            </div>





          </div>


          <div class="field-body">

            <div class="field">
              <label class="label">Имя</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Имя">
                <span class="icon is-small is-left">
                              <font-awesome-icon icon="address-card"/>

            </span>
                <span class="icon is-small is-right">
              <font-awesome-icon icon="check"/>
            </span>
              </div>
              <!--<p class="help is-success">This username is available</p>-->
            </div>




            <div class="field">
              <label class="label">Возраст</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="number" placeholder="Возраст">
                <span class="icon is-small is-left">
                                          <font-awesome-icon icon="hourglass-half"/>

            </span>
                <span class="icon is-small is-right">
              <font-awesome-icon icon="check"/>
            </span>
              </div>
              <!--<p class="help is-success">This username is available</p>-->
            </div>

          </div>

          <div class="field">
            <label class="label">Логин пользователя</label>
            <div class="control">
              <input class="input" type="text" placeholder="От чьего имени пишется отзыв">
            </div>
          </div>

          <br><br>

          <div class="notification">
            <button class="delete"></button>
            Загрузите фотогорафию для отображения в превью. Остальные фотографии можно добавить в самом отзыве.
            Для этого можно использовать ссылку на фото, буфер или <font-awesome-icon icon="plus"/>
          </div>

          <div class="post-editor-block-image">
            <div class="media-left">
              <div class="post-image">
                <img
                    src="https://avatars.mds.yandex.net/get-pdb/1357752/71fa0dd2-267e-406b-a420-651add8faf01/s1200?webp=false"
                    alt="Image">
              </div>
            </div>
            <div class="media-content">
              <div class="field">
                <div class="file is-primary">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                    <span class="file-icon">
                      <font-awesome-icon icon="upload"/>
                    </span>
                    <span class="file-label">
                      Загрузить фото с устройства
                    </span>
                  </span>
                  </label>
                </div>
              </div>

              <div class="field">
                <label class="label">или загрузить фото по ссылке</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" type="text"
                         placeholder="Ссылка на фото">
                  <span class="icon is-small is-left">
                      <font-awesome-icon icon="file-image"/>
                    </span>
                  <span class="icon is-small is-right">
                      <font-awesome-icon icon="check"/>
                    </span>
                </div>
                <!--<p class="help is-success">This username is available</p>-->
              </div>
            </div>
          </div>
        </div>


        <div class="post-editor-message">


          <editor v-show="isEditor"
                  :autofocus="false"
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
    import {mapGetters} from 'vuex';
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
                                byFile: "http://localhost:8008/images/uploadByFile",
                                byUrl: "http://localhost:8008/images/uploadByUrl"
                            }
                        }
                    }
                },
            }
        },
        computed: {
            ...mapGetters('locations', {
                locations: 'getLocations'
            }),
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
