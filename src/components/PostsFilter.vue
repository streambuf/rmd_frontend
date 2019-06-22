<template>

  <aside class="menu" :class="menuClass">
    <p class="menu-label">
      Площадки
    </p>
    <template v-for="datingService in datingServices">
      <form-switch :name="datingService.name"
                   :value.sync="datingService.checked"
                   :iconUrl="getImageUrlByDatingServiceName(datingService.name)"></form-switch>
    </template>
    <p class="menu-label">
      Город
    </p>
    <p class="control has-icons-left">
            <span class="select is-primary">
              <select v-model="city">
                <option selected>{{filters.city}}</option>
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

    <vue-slider v-model="ageRange" :min="18" :tooltip="'always'" :tooltip-placement="['top', 'bottom']"
                class="post-filter-menu-slider"></vue-slider>

    <p class="menu-label">
      Пол
    </p>
    <ul class="menu-list">
      <div class="field">
        <input v-model="isMale" class="is-checkradio is-circle" id="manCheckbox" type="checkbox" name="manCheckbox">
        <label for="manCheckbox">Отзывы о парнях</label>
      </div>
      <div class="field">
        <input v-model="isFemale" class="is-checkradio is-circle" id="womanCheckbox" type="checkbox" name="womanCheckbox">
        <label for="womanCheckbox">Отзывы о девушках</label>
      </div>
    </ul>

    <div class="post-filter-menu-button">
      <button @click="applyFilters" class="button is-info">
        Применить
      </button>
    </div>

  </aside>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";
  import FormSwitch from "./form/FormSwitch";
  import {CommonPostMixin} from "../mixins/CommonPostMixin";
  import Vue from "vue";


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
        ageRange: [],
        isMale: null,
        isFemale: null,
        city: '',
        datingServices: null
      };
    },
    computed: {
      ...mapGetters("locations", {
        locations: "getLocations"
      }),
      ...mapGetters("postfilters", {
        filters: "getFilters"
      }),
    },
    methods: {
      applyFilters() {
        console.log("apply");

        let gender;
        if (!(this.isMale ^ this.isFemale)) {
          gender = 'any';
        } else if (this.isMale) {
          gender = 'male';
        } else if (this.isFemale) {
          gender = 'female';
        }

        let filters = {
          datingServices: this.datingServices,
          city: this.city,
          ageMin: this.ageRange[0],
          ageMax: this.ageRange[1],
          gender: gender
        };

        this.setFilters(JSON.parse(JSON.stringify(filters)));

        this.$emit('applyPostFilters', {});
      },
      ...mapMutations("postfilters", {
        setFilters: "setFilters"
      }),
      handleCheckGender() {
        Vue.nextTick(()=>{
          if (!this.isMale && !this.isFemale) {
            this.isMale = true;
            this.isFemale = true;
          }
        });
      }
    },
    watch: {
      isMale() {
        this.handleCheckGender();
      },
      isFemale() {
        this.handleCheckGender();
      }
    },
    created() {
      this.$set(this.ageRange, 0, this.filters.ageMin);
      this.$set(this.ageRange, 1, this.filters.ageMax);
      this.city = this.filters.city;
      this.isMale = this.filters.gender === 'any' || this.filters.gender === 'male';
      this.isFemale = this.filters.gender === 'any' || this.filters.gender === 'female';
      this.datingServices = JSON.parse(JSON.stringify(this.filters.datingServices));
    }

  };
</script>

<style scoped></style>
