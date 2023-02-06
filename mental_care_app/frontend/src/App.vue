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
  <router-view/>
  </div>
</template>
