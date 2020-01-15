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
              v-model="task">
          </div>

          <div class="form-group">
            <label for="">Status</label>
            <input type="text" class="form-control"
              v-model="status">
          </div>

          <input type="submit" value="Submit" class="btn btn-primary">

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      task:null,
      status:0
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
            this.$router.push('/todos')
          }
        })
        .catch( (error) => {
          console.log(error)
        });
    }
  }
}
</script>
