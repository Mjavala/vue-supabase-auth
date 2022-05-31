<template>
  <main
    class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
    <section class="flex w-[30rem] flex-col">
      <div class="text-center text-4xl font-medium">Welcome</div>
      <LoginForm @emit-email="handleEmail" @emit-password="handlePassword" />
      <Button
        v-if="!showSignUp"
        text="LOG IN"
        styling="login"
        @click="signIn" />
      <Button
        v-if="showSignUp"
        text="REGISTER"
        styling="login"
        @click="signUp" />
      <div
        v-if="!showSignUp"
        href="#"
        class="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300 mt-10"
        @click="passwordReset">
        FORGOT PASSWORD?
      </div>
      <p v-if="!showSignUp" class="text-center text-lg mt-1">
        New here?
        <span
          class="font-medium text-indigo-500 underline-offset-4 hover:underline"
          @click="showSignUp = !showSignUp">
          Register
        </span>
      </p>
      <p v-if="showSignUp" class="text-center text-lg mt-1">
        Already Registered?
        <span
          class="font-medium text-indigo-500 underline-offset-4 hover:underline"
          @click="showSignUp = !showSignUp">
          Login
        </span>
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Button from './ui/Button.vue';
import { useSupabaseStore } from '../stores/SupabaseStore';
import LoginForm from './ui/LoginForm.vue';
import { setupValidation } from '../utils';

const store = useSupabaseStore();

const loggedIn = ref(false);

const showSignUp = ref(false);

const signIn = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    return;
  } else {
    alert('Form Valid');
  }
  // todo: success/failure notifications
  let { error } = await store.client.auth.signIn({
    email: state.email,
    password: state.password,
  });

  if (error) return;

  loggedIn.value = true;
  store.setUser(state.email);
};

const signUp = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    console.log('invalid');
    return;
  } else {
    alert('Form Valid');
  }
  // todo: input verification
  // todo: success/failure notifications
  let { error } = await store.client.auth.signUp({
    email: state.email,
    password: state.password,
  });

  if (error) return;

  store.setUser(state.email);
  state.password = '';
  state.password = '';
};

const passwordReset = async () => {
  const { data, error } = await store.client.auth.api.resetPasswordForEmail(
    store.email
  );

  console.log(data, error);
};

const state = reactive({
  email: '',
  password: '',
});

const $v = setupValidation(state);
// source - https://stackoverflow.com/questions/66410174/vuelidate-password-and-confirm-password-in-vuejs

const handleEmail = (value: string) => {
  state.email = value;
};

const handlePassword = (value: string) => {
  state.password = value;
};
</script>
