<template>
  <div class="container">
    <vue-headful
        title="Вход на сайт"
        description=""
    />
    <div class="columns is-centered">
      <div class="column sign-form is-4-desktop is-narrow-desktop is-6-tablet is-12-mobile">
        <header class="sign-form-header is-primary">
          <b>Вход</b>
        </header>
        <div class="sign-form-body">
          <form-input v-for="(input, index) in inputs"
                      :value.sync="input.value"
                      :type="input.type"
                      :key="input.name"
                      :label="input.label"
                      :icon="input.icon"
                      :placeholder="input.placeholder"
                      :validator="input.validator"
                      @changeStatus="onChangeData(index, $event)"
          >
          </form-input>
        </div>
        <div class="columns is-centered">
          <div class="column">
            <button @click="register" class="button is-primary is-medium" :disabled="!isFilled">
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import FormInput from '../form/FormInput';
    import { UserRepository } from "../../mixins/repository/UserRepository";
    import {mapActions} from 'vuex';

    export default {
        components: {FormInput},
        mixins: [UserRepository],
        data() {
            return {
                inputs: [
                    {
                        value: null,
                        type: 'text',
                        name: 'login',
                        label: 'Логин',
                        icon: 'address-card',
                        placeholder: 'ник',
                        validator: value => {
                            let pattern = /^[а-яА-ЯёЁa-zA-Z0-9]{2,}$/;
                            return pattern.test(value);
                        }
                    },
                    {
                        value: null,
                        type: 'password',
                        name: 'password',
                        label: 'Пароль',
                        icon: 'lock',
                        placeholder: 'пароль',
                        validator: value => value.length > 2
                    },
                ],
                controls: []
            }
        },
        created() {
            for (let input of this.inputs) {
                this.controls.push(false);
            }
        },
        computed: {
            isFilled() {
                for (let control of this.controls) {
                    if (!control) {
                        return false;
                    }
                }
                return true;
            }

        },
        methods: {
            ...mapActions('user', {
                setUser: 'setUser'
            }),

            onChangeData(index, status) {
                this.$set(this.controls, index, status);
            },

            register() {
                let loginRequest = {};
                for (let input of this.inputs) {
                    loginRequest[input.name]=input.value;
                }
                this.apiLoginUser(loginRequest, data => {
                    this.setUser(data);
                    this.$router.push("/");
                });
            }
        }
    };
</script>
