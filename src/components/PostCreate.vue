<template>
  <div>
    <div class="columns is-centered">
      <div class="column post-editor content">
        <div class="post-editor-form">
          <div class="field">
            <label class="label"
              >Ссылка на анкету человека
              <font-awesome-icon
                :class="checkClassLink"
                :icon="checkIconLink"
              />
            </label>
            <div class="control has-icons-left">
              <input
                @input="validateLink"
                v-model.trim="post.datingServiceProfileLink"
                class="input"
                type="text"
                placeholder="Ссылка на анкету человека о котором хотите написать отзыв"
              />
              <span class="icon is-small is-left">
                <font-awesome-icon icon="external-link-alt" />
              </span>
            </div>
            <p v-if="true" class="help is-info">
              Необязательное поле (должна начинаться с http или https)
            </p>
          </div>

          <div class="notification is-warning">
            <button class="delete"></button>
            Все нижеперечисленные поля <strong>обязательны</strong> для
            заполнения, они помогут другим найти ваш отзыв.
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label"
                >Сайт знакомства
                <font-awesome-icon
                  :class="checkClassDatingService"
                  :icon="checkIconDatingService"
                />
              </label>
              <p class="control has-icons-left ">
                <span class="select ">
                  <select
                    @change="validateDatingService"
                    v-model.trim="post.datingService"
                  >
                    <option selected>{{ defaultSelectOption }}</option>
                    <option>Mamba</option>
                    <option>Tinder</option>
                    <option>Badoo</option>
                    <option>Dating.ru</option>
                    <option>Chpoking.ru</option>
                    <option>Другое</option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="venus-mars" />
                </span>
              </p>
            </div>

            <div class="field">
              <label class="label"
                >Город
                <font-awesome-icon
                  :class="checkClassCity"
                  :icon="checkIconCity"
                />
              </label>
              <p class="control has-icons-left">
                <span class="select">
                  <select @change="validateCity" v-model.trim="post.city">
                    <option selected>{{ defaultSelectOption }}</option>
                    <option v-for="location in locations">
                      {{ location.city }}
                    </option>
                  </select>
                </span>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="globe" />
                </span>
              </p>
            </div>

            <div class="field">
              <label class="label">Пол</label>
              <div class="control">
                <label class="radio">
                  <input v-model="post.gender" type="radio" value="female" />
                  Женский
                </label>
                <label class="radio">
                  <input v-model="post.gender" type="radio" value="male" />
                  Мужской
                </label>
              </div>
            </div>
          </div>

          <div class="field-body">
            <div class="field">
              <label class="label"
                >Имя
                <font-awesome-icon
                  :class="checkClassName"
                  :icon="checkIconName"
                />
              </label>
              <div class="control has-icons-left">
                <input
                  @input="validateName"
                  v-model.trim="post.name"
                  class="input"
                  type="text"
                  placeholder="Имя"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="address-card" />
                </span>
              </div>
              <p class="help is-info">От 2 до 50 символов</p>
            </div>

            <div class="field post-editor-form-age">
              <label class="label"
                >Возраст
                <font-awesome-icon
                  :class="checkClassAge"
                  :icon="checkIconAge"
                />
              </label>
              <div class="control has-icons-left">
                <input
                  @input="validateAge"
                  v-model.trim="post.age"
                  class="input"
                  type="number"
                  placeholder="Возраст"
                />
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="hourglass-half" />
                </span>
              </div>
              <p class="help is-info">От 16 до 80 лет</p>
            </div>
          </div>

          <div class="field">
            <label class="label">Логин пользователя</label>
            <div class="control">
              <input
                @input="validateLogin($event)"
                v-model.trim="post.system.author"
                class="input"
                type="text"
                placeholder="От чьего имени пишется отзыв"
                pattern="[A-Za-z]*"
              />
            </div>
          </div>

          <br />

          <div class="notification">
            <button class="delete"></button>
            Загрузите фотогорафию для отображения в превью. Остальные фотографии
            можно добавить в самом отзыве. Для этого можно использовать ссылку
            на фото, буфер или
            <font-awesome-icon icon="plus" />
          </div>

          <div class="post-editor-block-image">
            <div class="media-left">
              <div class="post-image">
                <img :src="getImageUrl" alt="Image" />
              </div>
            </div>
            <div class="media-content">
              <div class="field">
                <div class="file is-primary">
                  <label class="file-label">
                    <input
                      @change="uploadImageByFile"
                      class="file-input"
                      type="file"
                      name="resume"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <font-awesome-icon icon="upload" />
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
                  <input
                    v-model.trim="urlImage"
                    class="input"
                    type="text"
                    placeholder="Ссылка на фото"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="file-image" />
                  </span>
                  <span class="icon is-small is-right">
                    <font-awesome-icon icon="check" />
                  </span>
                </div>
                <div class="control">
                  <a @click="uploadImageByUrl" class="button is-info"
                    >Загрузить по ссылке</a
                  >
                </div>
                <p v-if="false" class="help is-success">messae</p>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label"
            >Текстовый редактор
            <font-awesome-icon
              :class="checkClassMessage"
              :icon="checkIconMessage"
            />
          </label>
        </div>
        <div
          v-if="isCreateMode || post.system.loaded"
          class="post-editor-message"
        >
          <editor
            :autofocus="false"
            ref="editor"
            :init-data="post.message"
            @save="onSave"
            @change="onChange"
            :customTools="tools"
            :header="true"
            :list="true"
            :marker="true"
            :link="true"
            :paragraph="true"
          />
        </div>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column post-editor-save-button-wrapper buttons has-addons">
        <button
          @click="savePost"
          class="button is-primary post-editor-button"
          :disabled="!isValidFilled"
        >
          {{ saveButtonName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Editor } from "vue-editor-js";
import { CommonPostMixin } from "../mixins/CommonPostMixin";
import { PostRepository } from "../mixins/repository/PostRepository";
import { ImageRepository } from "../mixins/repository/ImageRepository";
import ImageTool from "@editorjs/image";
import PostView from "./PostView";

export default {
  components: {
    Editor,
    PostView
  },
  mixins: [CommonPostMixin, PostRepository, ImageRepository],
  data() {
    return {
      defaultSelectOption: "Выберите",
      post: {
        datingService: "Выберите",
        datingServiceProfileLink: null,
        city: "Выберите",
        name: null,
        age: null,
        gender: "female",
        image: null,
        message: {},
        system: {
          author: ""
        }
      },
      urlImage: "",
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
      inputStatusValid: {
        age: null,
        name: null,
        city: null,
        datingService: null,
        message: null
      },
      validDatingServiceProfileLink: true
    };
  },
  computed: {
    ...mapGetters("locations", {
      locations: "getLocations"
    }),
    postId() {
      return this.$route.params.id;
    },
    isCreateMode() {
      return this.$route.params.id === undefined;
    },
    saveButtonName() {
      if (!this.isValidFilled) {
        return "Корректно заполните обязательные поля";
      }
      return this.isCreateMode ? "Опубликовать" : "Сохранить изменения";
    },
    isValidFilled() {
      for (let prop in this.inputStatusValid) {
        if (!this.inputStatusValid[prop]) return false;
      }
      return this.validDatingServiceProfileLink !== false;
    },
    checkClassAge() {
      return this.getCheckClass(this.inputStatusValid.age);
    },
    checkIconAge() {
      return this.getCheckIcon(this.inputStatusValid.age);
    },
    checkClassName() {
      return this.getCheckClass(this.inputStatusValid.name);
    },
    checkIconName() {
      return this.getCheckIcon(this.inputStatusValid.name);
    },
    checkClassLink() {
      return this.getCheckClass(this.validDatingServiceProfileLink);
    },
    checkIconLink() {
      return this.getCheckIcon(this.validDatingServiceProfileLink);
    },
    checkClassCity() {
      return this.getCheckClass(this.inputStatusValid.city);
    },
    checkIconCity() {
      return this.getCheckIcon(this.inputStatusValid.city);
    },
    checkClassDatingService() {
      return this.getCheckClass(this.inputStatusValid.datingService);
    },
    checkIconDatingService() {
      return this.getCheckIcon(this.inputStatusValid.datingService);
    },
    checkClassMessage() {
      return this.getCheckClass(this.inputStatusValid.message);
    },
    checkIconMessage() {
      return this.getCheckIcon(this.inputStatusValid.message);
    }
  },
  mounted() {
    if (this.postId !== undefined) {
      this.fetchPost();
    }
  },
  methods: {
    savePost() {
      if (!this.isValidFilled) {
        return;
      }
      if (this.isCreateMode) {
        this.createPost();
      } else {
        this.updatePost();
      }
    },
    createPost() {
      this.apiCreatePost(this.post, data => {
        this.$router.push("/posts/" + data.id);
      });
    },
    updatePost() {
      this.apiUpdatePost(this.post, data => {
        this.$router.push("/posts/" + data.id);
      });
    },
    onSave(response) {
      this.post.message = response;

      this.inputStatusValid.message = false;

      for (let block of response.blocks) {
        if (block.type === "paragraph" && block.data.text.trim().length > 0) {
          this.inputStatusValid.message = true;
          break;
        }
      }
    },

    onChange(e) {
      this.$refs.editor.save();
    },

    fetchPost() {
      this.apiFetchPost(this.postId, data => {
        this.post = data;
        this.post["system"] = { author: this.post.author, loaded: true };
        this.validateDatingService();
        this.validateCity();
        this.validateName();
        this.validateAge();
        this.validateLink();
        this.onSave(data.message);
      });
    },

    uploadImageByFile($event) {
      let file = $event.target.files[0];
      this.apiUploadImageByFile(
        $event.target.files[0],
        data => (this.post.image = data.file.url)
      );
    },

    uploadImageByUrl() {
      this.apiUploadImageByUrl(
        this.urlImage,
        data => (this.post.image = data.file.url)
      );
    },

    getCheckClass(isValid) {
      if (isValid === null) {
        return "post-editor-form-input-default";
      }
      return isValid
        ? "post-editor-form-input-success"
        : "post-editor-form-input-error";
    },
    getCheckIcon(isValid) {
      return isValid || isValid === null
        ? "check-circle"
        : "exclamation-circle";
    },

    validateAge() {
      this.inputStatusValid.age = !(this.post.age < 16 || this.post.age > 80);
    },

    validateName() {
      this.post.name = this.capitalizeFirstLetter(this.post.name);
      this.inputStatusValid.name = !(
        this.post.name.length < 2 || this.post.name.length > 50
      );
    },

    validateLink() {
      if (this.post.datingServiceProfileLink.trim().length === 0) {
        this.validDatingServiceProfileLink = true;
        return;
      }
      let pattern = new RegExp(
        "^(https?:\\/\\/)" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      this.validDatingServiceProfileLink = !!pattern.test(
        this.post.datingServiceProfileLink
      );
    },

    validateCity() {
      this.inputStatusValid.city = this.post.city !== this.defaultSelectOption;
    },

    validateDatingService() {
      this.inputStatusValid.datingService =
        this.post.datingService !== this.defaultSelectOption;
    },

    validateLogin(e) {
      this.post.system.author = this.post.system.author.replace(
        /[^a-z0-9]+/,
        ""
      );
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped></style>
