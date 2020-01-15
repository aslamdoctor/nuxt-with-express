<template>
  <div>
    <h1>Update Article</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Title</label>
            <input type="text" class="form-control"
              v-model="title">
          </div>

          <div class="form-group">
            <label for="">Author</label>
            <input type="text" class="form-control"
              v-model="author">
          </div>

          <div class="form-group">
            <label for="">Body</label>
            <textarea cols="30" rows="4" class="form-control"
              v-model="body"></textarea>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary mr-3">
          <nuxt-link :to="'/articles/' + $route.params.id" class="btn btn-secondary mr-3">Cancel</nuxt-link>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context){
    const {data} = await context.$axios.get('/api/articles/' + context.route.params.id)
    return {
      article : data
    }
  },

  data(){
    return{
      title:null,
      author:null,
      body:null
    }
  },

  mounted(){
    this.fillFormData()
  },

  methods:{
    fillFormData(){
      this.title = this.article.title
      this.author = this.article.author
      this.body = this.article.body
    },

    submitForm(){
      this.$axios.put( '/api/articles/' + this.$route.params.id , {
          title: this.title,
          author: this.author,
          body: this.body,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push('/articles/' + this.$route.params.id)
          }
        })
        .catch( (error) => {
          console.log(error)
        });
    }
  }
}
</script>
