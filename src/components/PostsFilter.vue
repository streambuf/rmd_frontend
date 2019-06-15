<template>

  <aside class="menu" :class="menuClass">
    <p class="menu-label">
      Площадки
    </p>
    <template v-for="datingService in datingServices">
      <form-switch :name="datingService.name"
                   :iconUrl="getImageUrlByDatingServiceName(datingService.name)"></form-switch>
    </template>
    <p class="menu-label">
      Город
    </p>
    <p class="control has-icons-left">
            <span class="select is-primary">
              <select>
                <option selected>Любой</option>
                <option v-for="location in locations" :key="location.city">
                  {{ location.city }}
                </option>
              </select>
            </span>
      <span class="icon is-small is-left">
              <font-awesome-icon icon="map-marker-alt"/>
            </span>
    </p>
    <p class="menu-label">
      Возраст
    </p>

    <vue-slider v-model="value" :min="18" :tooltip="'always'" :tooltip-placement="['top', 'bottom']"
                class="post-filter-menu-slider"></vue-slider>

    <p class="menu-label">
      Пол
    </p>
    <ul class="menu-list">
      <div class="field">
        <input class="is-checkradio is-circle" id="manCheckbox" type="checkbox" name="manCheckbox" checked="checked">
        <label for="manCheckbox">Отзывы о парнях</label>
      </div>
      <div class="field">
        <input class="is-checkradio is-circle" id="womanCheckbox" type="checkbox" name="womanCheckbox"
               checked="checked">
        <label for="womanCheckbox">Отзывы о девушках</label>
      </div>
    </ul>
  </aside>
</template>

<script>
  import {mapGetters} from "vuex";
  import FormSwitch from "./form/FormSwitch";
  import {CommonPostMixin} from "../mixins/CommonPostMixin";


  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';


  export default {
    components: {
      FormSwitch, VueSlider
    },
    mixins: [CommonPostMixin],
    props: ['menuClass'],

    data() {
      return {
        size: 25,
        page: 0,
        value: [18, 100],
        datingServices: [
          {
            name: 'Mamba'
          },
          {
            name: 'Tinder'
          },
          {
            name: 'Badoo'
          },
          {
            name: 'Dating.ru'
          },
          {
            name: 'Chpoking.ru'
          },
          {
            name: 'Остальные'
          },
        ]
      };
    },
    computed: {
      ...mapGetters("locations", {
        locations: "getLocations"
      })
    }

  };
</script>

<style scoped></style>
