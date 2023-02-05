<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand"><router-link to="/">Home</router-link></span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <span class="nav-link active"><router-link to="/login">LogIn</router-link></span>
          </li>
          <li class="nav-item">
            <span class="nav-link active"><router-link to="/signup">SignUp</router-link></span>
          </li>
          <li class="nav-item">
            <span class="nav-link active"><router-link to="/form">Form</router-link></span>
          </li>
          <li class="nav-item">
            <span class="nav-link active"><router-link to="/list">List</router-link></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
  <router-view/>
  </div>
</template>
