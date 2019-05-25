<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div class="control has-icons-left has-icons-right">
      <input @input="onInput"
             :value="value"
             class="input"
             :type="type"
             :placeholder="placeholder"
      />
      <span class="icon is-small is-left">
        <font-awesome-icon :icon="icon"/>
      </span>
      <span class="icon is-small is-right">
        <font-awesome-icon :icon="statusIcon" :class="statusIconClass"/>
      </span>
    </div>
    <p v-if="true" class="help is-info">
      {{description}}
    </p>
  </div>
</template>

<script>
    import formstyles from "./../../assets/form-input-style.css";

    export default {
        props: ['value', 'type', 'label', 'icon', 'placeholder', 'validator', 'description'],
        data() {
            return {
                warningIcon: 'exclamation-circle',
                successIcon: 'check-circle',
                warningClass: 'status-icon-warning',
                successClass: 'status-icon-success'
            }
        },
        computed: {
            isValid(){
                if (this.value == null) {
                    return null;
                }
                return this.validator(this.value);
            },
            statusIcon() {
                if (!this.isValid) {
                    return this.warningIcon;
                } else {
                    return this.successIcon;
                }
            },
            statusIconClass() {
                if (this.isValid === false) {
                    return this.warningClass;
                } else if (this.isValid) {
                    return this.successClass;
                } else {
                    return '';
                }
            }
        },
        methods: {
            onInput(e) {
                this.$emit('update:value', e.target.value);
            }
        },
        watch: {
            isValid(){
                this.$emit('changeStatus', this.isValid);
            }
        }

    };
</script>
