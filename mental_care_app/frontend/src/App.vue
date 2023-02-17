<script setup>
  import { useStore } from 'vuex';
  import { computed, onBeforeMount } from 'vue';
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
  const getIsLogin = computed(() => {
    return store.getters["getIsLogin"];
  })
  const logout = () => {
    store.dispatch("logout");
  };
  const closeSuccessMessage = () => {
    store.dispatch("closeSuccessMessage");
  };
  const closeErrorMessage = () => {
    store.dispatch("closeErrorMessage");
  }
  onBeforeMount(async() => {
      await store.dispatch("checkLogin");
    }
  );
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
            <router-link to="/login" class="nav-link active" v-if="!getIsLogin">ログイン</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link active" v-if="!getIsLogin">サインアップ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/form" class="nav-link active" v-if="getIsLogin">はきだし</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/list" class="nav-link active" v-if="getIsLogin">はきだし一覧</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="#" @click="logout" v-if="getIsLogin">ログアウト</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div v-if="getSuccessActive" class="alert alert-success d-flex justify-content-between" role="alert">{{ getSuccessMessage }}<button type="button" class="btn-close" aria-label="Close" @click="closeSuccessMessage"></button></div>
    <div v-if="getErrorActive" class="alert alert-danger d-flex justify-content-between" role="alert">{{ getErrorMessage }}<button type="button" class="btn-close" aria-label="Close" @click="closeErrorMessage"></button></div>
    <router-view/>
  </div>
</template>
