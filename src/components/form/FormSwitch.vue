<template>
  <div class="field">
    <input @change="onChange" :id="name" type="checkbox" :name="name" class="switch is-thin" v-model="localValue">
    <label :for="name"></label>
    <img :src="iconUrl" class="post-filter-menu-switch-icon">
    {{name}}
  </div>
</template>

<script>
  import 'bulma-switch/dist/css/bulma-switch.min.css';
  import Vue from "vue";


  export default {
        props: ['name', 'iconUrl', 'value'],
        data() {
            return {
              localValue: null
            }
        },
        computed: {
        },
        created() {
          this.localValue = this.value;
        },
        methods: {
          onChange(e) {
            this.$emit('update:value', this.localValue);
          }
        },
        watch: {
        }

    };
</script>
