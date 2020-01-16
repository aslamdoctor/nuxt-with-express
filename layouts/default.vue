<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <nuxt-link to="/" class="navbar-brand">Express CRUD</nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link" exact-active-class="active">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/articles" class="nav-link" exact-active-class="active">Articles</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/todos" class="nav-link" exact-active-class="active">Todos</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-4">
      <nuxt />
    </div>
  </div>
</template>

