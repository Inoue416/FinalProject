<script setup>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  const store = useStore();
  const getSuccessMessage = computed(() => {
    return store.getters["getSuccessMessage"].message;
  });
  const getErrorMessage = computed(() => {
    return store.getters["getErrorMessage"].message;
  });
  const getSuccessActive = computed(() => {
    return store.getters["getSuccessMessage"].is_active;
  });
  const getErrorActive = computed(() => {
    return store.getters["getErrorMessage"].is_active;
  });
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">はきだしケア</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">ホーム</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">ログイン</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link active">サインアップ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/form" class="nav-link active">はきだし</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/list" class="nav-link active">はきだし一覧</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div v-if="getSuccessActive" class="alert alert-success" role="alert">{{ getSuccessMessage }}</div>
    <div v-if="getErrorActive" class="alert alert-danger" role="alert">{{ getErrorMessage }}</div>
    <router-view/>
  </div>
</template>
