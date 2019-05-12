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
              <input v-model.trim="post.datingServiceProfileLink" class="input" type="text" placeholder="Ссылка на анкету человека о котором хотите написать отзыв">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="external-link-alt"/>
              </span>
              <span class="icon is-small is-right">
                <font-awesome-icon icon="check"/>
              </span>
            </div>
            <p v-if="false" class="help is-success">messae</p>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label">Сайт знакомства</label>
              <p class="control has-icons-left ">
                <span class="select ">
                  <select v-model.trim="post.datingService">
                    <option selected>Выберите</option>
                    <option>Mamba</option>
                    <option>Tinder</option>
                    <option>Badoo</option>
                    <option>Dating.ru</option>
                    <option>Chpoking.ru</option>
                    <option>Другое</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="venus-mars"/>
                </span>
              </p>
            </div>

            <div class="field">
              <label class="label">Город</label>
              <p class="control has-icons-left">
                <span class="select">
                  <select v-model.trim="post.city">
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

            <div class="field">
              <label class="label">Пол</label>
              <div class="control">
                <label class="radio">
                  <input v-model="post.gender" type="radio" value="female">
                  Женский
                </label>
                <label class="radio">
                  <input v-model="post.gender" type="radio" value="male">
                  Мужской
                </label>
              </div>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label">Имя</label>
              <div class="control has-icons-left has-icons-right">
                <input v-model.trim="post.name" class="input" type="text" placeholder="Имя">
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="address-card"/>
                </span>
                <span class="icon is-small is-right">
                  <font-awesome-icon icon="check"/>
                </span>
              </div>
              <p v-if="false" class="help is-success">message</p>
            </div>


            <div class="field post-editor-form-age">
              <label class="label">Возраст</label>
              <div class="control has-icons-left has-icons-right">
                <input v-model.trim="post.age" class="input" type="number" placeholder="Возраст">
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="hourglass-half"/>
                </span>
                <span class="icon is-small is-right">
                  <font-awesome-icon icon="check"/>
                </span>
              </div>
              <p v-if="false" class="help is-success">message</p>
            </div>


          </div>

          <div class="field">
            <label class="label">Логин пользователя</label>
            <div class="control">
              <input v-model.trim="post.system.author" class="input" type="text" placeholder="От чьего имени пишется отзыв">
            </div>
          </div>

          <br>

          <div class="notification">
            <button class="delete"></button>
            Загрузите фотогорафию для отображения в превью. Остальные фотографии можно добавить в самом отзыве.
            Для этого можно использовать ссылку на фото, буфер или
            <font-awesome-icon icon="plus"/>
          </div>

          <div class="post-editor-block-image">
            <div class="media-left">
              <div class="post-image">
                <img :src="getImageUrl" alt="Image">
              </div>
            </div>
            <div class="media-content">
              <div class="field">
                <div class="file is-primary">
                  <label class="file-label">
                    <input @change="uploadImageByFile" class="file-input" type="file" name="resume">
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

              <label class="label">или загрузить фото по ссылке</label>
              <div class="field has-addons">
                <div class="control has-icons-left has-icons-right">
                  <input v-model.trim="urlImage" class="input" type="text" placeholder="Ссылка на фото">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="file-image"/>
                  </span>
                  <span class="icon is-small is-right">
                    <font-awesome-icon icon="check"/>
                  </span>
                </div>
                <div class="control">
                  <a @click="uploadImageByUrl" class="button is-info">Загрузить по ссылке</a>
                </div>
                <p v-if="false" class="help is-success">messae</p>
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
                  :paragraph="true"/>
          <!--<post-view v-show="!isEditor" :post="post.message"></post-view>-->
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
    import Vue from 'vue';

    export default {
        components: {
            Editor,
            PostView
        },
        data() {
            return {
                post: {
                    datingService: '',
                    datingServiceProfileLink: '',
                    city: '',
                    name: '',
                    age: null,
                    gender: 'female',
                    image: null,
                    message: {},
                    system: {
                        author: ''
                    }
                },
                urlImage: '',
                isEditor: true,
                tools: {
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: process.env.VUE_APP_HOST + "/images/uploadByFile",
                                byUrl: process.env.VUE_APP_HOST + "/images/uploadByUrl"
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
            },
            getImageUrl() {
                if (this.post.image !== null) {
                    return this.post.image;
                } else {
                    let imageName = this.post.gender === 'female' ? 'woman.png' : 'man.png';
                    return require('../assets/' + imageName);
                }
            },
        },
        methods: {
            createPost() {
                let postRequest = JSON.stringify(this.post);
                Vue.http.post('posts', postRequest)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    }).catch(response => {
                    console.log(response);
                });
            },
            onSave(response) {
                this.post.message = response;
            },
            onReady(e) {
            },
            onChange(e) {
                this.$refs.editor.save();
            },
            toggleViewEditor() {
                if (this.isEditor) {
                    this.$refs.editor.save();
                }
                this.isEditor = !this.isEditor;
            },

            uploadImageByFile($event) {
                let file = $event.target.files[0];
                let formData = new FormData();
                formData.append('image', file);
                Vue.http.post('images/uploadByFile',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                    .then(response => response.json())
                    .then(data => {
                      this.post.image = data.file.url;
                    }).catch(response => {
                    console.log(response);
                });
            },

            uploadImageByUrl() {
                let request = JSON.stringify({url: this.urlImage});
                Vue.http.post('images/uploadByUrl', request)
                    .then(response => response.json())
                    .then(data => {
                        this.post.image = data.file.url;
                    }).catch(response => {
                    console.log(response);
                });
            }
        }
    }
</script>

<style scoped>

</style>
