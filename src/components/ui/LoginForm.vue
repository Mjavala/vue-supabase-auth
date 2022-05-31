<template>
  <div>
    <div
      class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-10">
      <input
        v-model="state.email"
        type="text"
        placeholder="Email"
        class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        @change="emitEmail" />
    </div>
    <div v-for="error of $val.email.$errors" :key="error.$uid" class="">
      <strong class="text-red-500 mt-0">{{ error.$message }}</strong>
    </div>
    <div
      class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-10">
      <input
        v-model="state.password"
        type="password"
        placeholder="Password"
        class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        @change="emitPassword" />
    </div>
    <div v-if="!loggedIn">
      <div v-for="error of $val.password.$errors" :key="error.$uid" class="">
        <strong class="text-red-500 mt-0">{{ error.$message }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { setupValidation } from '../../utils';

const loggedIn = ref(false);

const state = reactive({
  email: '',
  password: '',
});

const $val = setupValidation(state);
const emit = defineEmits(['emitEmail', 'emitPassword']);

const emitEmail = () => {
  emit('emitEmail', state.email);
};

const emitPassword = () => {
  emit('emitPassword', state.password);
};
</script>
