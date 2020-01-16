<template>
  <div>
    <h1>Add New Task</h1>
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
            <select class="form-control"
              :class="{ 'is-invalid': errors && errors.status }"
              v-model="status">
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
            <div class="invalid-feedback" v-if="errors && errors.status">
              {{ errors.status.msg }}
            </div>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link to="/todos" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      errors:null,
      task:null,
      status:false,
    }
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/todos', {
          task: this.task,
          status: this.status,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push({ name:'todos', params:{ created:'yes' } })
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
