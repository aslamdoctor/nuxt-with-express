<template>
  <div>
    <h1>Todos</h1>
    <hr>

    <div class="list-group"
      v-if="todos.length">
      <nuxt-link
        class="list-group-item list-group-item-action"
        :to="'/todos/' + todo._id"
        v-for="todo in todos"
        :key="todo._id">
        {{ todo.task }}
      </nuxt-link>
    </div>

    <div class="alert alert-info"
      v-else>
      No records found.
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context){
    const {data} = await context.$axios.get('/api/todos')
    return {
      todos : data
    }
  }
}
</script>
