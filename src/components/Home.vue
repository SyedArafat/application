<template>
    <div>
        <div v-if="user" class="ui main container">
            <ProductForm :form = "form" @onFormSubmit = "onFormSubmit"/>
            <Loader v-if="loader" />
            <ProductList :products = "products" @onDelete = "onDelete" @onEdit = "onEdit"/>
        </div>
        <div v-if="!user" class="container">
            <Loader v-if="loader" />
            <div>
                Please Login to access ...<br>
                <router-link to="/login"><b>Login </b></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductForm from "./ProductForm";
    import ProductList from "./ProductList";
    import axios from 'axios';
    import Loader from "./Loader";
    import swal from 'sweetalert';
    import {mapGetters} from 'vuex';

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
                products : [],
                form : { "product_id" : "", "title" : '', "description" : '', 'image' : '', "is_edit" : false, 'id' : '' },
                loader : false,
                url : "http://localhost/products-api/public/api/products"
            }
        },
        methods: {
            getProducts() {
                this.loader = true;
                axios.get('products', {
                    headers : {
                        Authorization : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.products = response.data.data;
                    this.loader = false;
                });
            },
            deleteCustomer(id) {
                this.loader = true;
                axios.delete('products'+'/'+id, {
                    headers : {
                        Authorization : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(() => {
                    this.getProducts();
                }).catch(e => {alert(e)});
            },
            onEdit(data) {
                this.showModal = true;
                // this.form = data;
                window.scrollTo(0,0);
                this.form.is_edit = true;
                this.form.product_id = data.product_id;
                this.form.title = data.title;
                this.form.description = data.description;
                this.form.price = data.price;
                this.form.id = data.id;
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
            createProduct(data, image) {
                this.loader = true;
                let formData = new FormData();
                formData.append("product_id", data.product_id);
                formData.append("title", data.title);
                formData.append("price", data.price);
                formData.append("description", data.description);
                formData.append("image", image);
                axios.post('products', formData, {
                    headers : {
                        Authorization : 'Bearer ' + localStorage.getItem('token')
                    }

                }).then(response => {
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
            editProduct(data, image) {
                this.loader = true;
                let formData = new FormData();
                data.product_id === '' ? formData.append("product_id", this.form.product_id) : formData.append("product_id", data.product_id);
                data.title === '' ? formData.append("title", this.form.title) : formData.append("title", data.title);
                data.price === '' ? formData.append("price", this.form.price) : formData.append("price", data.price);
                data.description === '' ? formData.append("description", data.form.description) : formData.append("description", data.description);
                formData.append("image", image);
                axios.post(this.url+'/'+data.id+'/update', formData, {
                    headers : {
                        Authorization : 'Bearer ' + localStorage.getItem('token')
                    }

                }).then(response => {
                    if(response.data.code === 200) {
                        this.getProducts();
                        swal("Product updated!", "Product updated!", "success");
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
                    this.editProduct(data, image);
                } else {
                    this.createProduct(data, image);
                }
            }
        },
        computed : {
            ...mapGetters(['user'])
        },
        mounted() {
            this.getProducts();
        }
    }
</script>