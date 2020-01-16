<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>Todos</h1>
      <nuxt-link to="/todos/add" class="btn btn-success">Add New</nuxt-link>
    </div>
    <hr>

    <div class="alert alert-success"
      v-if="$route.params.created=='yes'">Record added successfully</div>
    <div class="alert alert-success"
      v-if="$route.params.deleted=='yes'">Record deleted successfully</div>

    <div class="list-group"
      v-if="todos.length">
      <nuxt-link
        class="list-group-item list-group-item-action"
        :to="'/todos/' + todo._id"
        v-for="todo in todos"
        :key="todo._id">
        <del v-if="todo.status == true">{{ todo.task }}</del>
        <template v-else>{{ todo.task }}</template>
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
