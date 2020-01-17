<template>
  <div>
    <h1>Task Details</h1>

    <hr>

    <div class="alert alert-success"
      v-if="$route.params.updated=='yes'">Record updated successfully</div>

    <h2>{{ todo.task }}</h2>

    <h6>Status: {{ status }}</h6>

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <nuxt-link :to="'/todos/' + todo._id + '/update'" class="btn btn-primary mr-3">Update</nuxt-link>
        <button class="btn btn-danger" @click="deleteRecord()">Delete</button>
      </div>
      <nuxt-link to="/todos" class="btn btn-secondary mr-3">Back to Todos</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData(context){
    const {data} = await context.$axios.get('/api/todos/' + context.route.params.id)
    return {
      todo : data
    }
  },

  computed:{
    status(){
      if(this.todo.status==true){
        return 'Completed'
      }
      else{
        return 'Not Completed'
      }
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/todos/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'todos', params:{ deleted:'yes' } })
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>
