<template>
  <div>
    <h1>Update Task</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Task</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.task }"
              v-model="task">
            <div class="invalid-feedback" v-if="errors && errors.task">
              {{ errors.task.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Status</label>
            <select class="form-control" v-model="status">
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link :to="'/todos/' + $route.params.id" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context){
    const {data} = await context.$axios.get('/api/todos/' + context.route.params.id)
    return {
      todo : data
    }
  },

  data(){
    return{
      errors:null,
      task:null,
      status:null,
    }
  },

  mounted(){
    this.fillFormData()
  },

  methods:{
    fillFormData(){
      this.task = this.todo.task
      this.status = this.todo.status
    },

    submitForm(){
      this.$axios.put( '/api/todos/' + this.$route.params.id , {
          task: this.task,
          status: this.status,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push('/todos/' + this.$route.params.id)
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>
