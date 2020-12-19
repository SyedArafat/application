<template>
  <div id="app">
    <NavBar />
    <Login />
    <div class="ui main container">
      <ProductForm :form = "form" @onFormSubmit = "onFormSubmit"/>
      <loader v-if="loader" />
      <ProductList :products = "products" @onDelete = "onDelete" @onEdit = "onEdit"/>
    </div>

  </div>

</template>

<script>
import NavBar from "./components/NavBar";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import axios from 'axios';
import Loader from "./components/Loader";
import swal from 'sweetalert';
import Login from "./components/Login";

export default {
  name: 'App',
  components: {
    Login,
    NavBar,
    ProductForm,
    ProductList,
    Loader
  },
  data (){
    return {
      url : "http://localhost/products-api/public/api/products",
      products : [],
      form : { "product_id" : "", "title" : '', "description" : '', 'image' : '', "is_edit" : false },
      loader : false,
      modalOpen: false
    }
  },
  methods: {
    getProducts() {
      this.loader = true;
      axios.get(this.url).then(response => {
        this.products = response.data.data;
        this.loader = false;
      });
    },
    openModal() {
      console.log("sada");
      this.modalOpen = !this.modalOpen;
    },
    deleteCustomer(id) {
      this.loader = true;
      axios.delete(this.url+'/'+id).then(() => {
        this.getProducts();
      }).catch(e => {alert(e)});
    },
    onEdit(data) {
      this.showModal = true;
      // this.form = data;
      this.form.is_edit = true;
      console.log(data);
    },
    onDelete(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteCustomer(id);
            swal("Poof! Product file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your product is safe!");
          }
        });
    },
    createCustomer(data, image) {
      this.loader = true;
      let formData = new FormData();
      formData.append("product_id", data.product_id);
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("image", image);
      axios.post(this.url, formData).then(response => {
        console.log(response);
        if(response.data.code === 200) {
          this.getProducts();
          swal("Product Added!", "new product added in the list!", "success");
        }
        else {
          let msg = response.data.message;
          swal("Oppps!", msg, "error");
          this.loader = false;
        }
      }).catch(e => {
        alert(e);
      });
    },
    onFormSubmit(data, image) {
      if(data.is_edit) {
        //sd
      } else {
        this.createCustomer(data, image);
      }
    }
  },
  created() {
    this.getProducts();
  }
}
</script>

<style>
  .vue-color {
    background: #41b883 !important;
  }
  .main.container {
    margin-top: 60px;
  }
</style>
