<template>
    <div class="ui main container">
        <ProductForm :form = "form" @onFormSubmit = "onFormSubmit"/>
        <Loader v-if="loader" />
        <ProductList :products = "products" @onDelete = "onDelete" @onEdit = "onEdit"/>
    </div>
</template>

<script>
    import ProductForm from "./ProductForm";
    import ProductList from "./ProductList";
    import axios from 'axios';
    import Loader from "./Loader";
    import swal from 'sweetalert';

    export default {
        name : "Home",
        components: {ProductList, Loader, ProductForm},
        comments : {
            ProductForm,
            ProductList,
            Loader
        },
        data (){
            return {
                url : "http://localhost/products-api/public/api/products",
                products : [],
                form : { "product_id" : "", "title" : '', "description" : '', 'image' : '', "is_edit" : false },
                loader : false
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
        mounted() {
            this.getProducts();
        }
    }
</script>