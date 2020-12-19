<template>
    <div class="product-list">
        <div class="container col-md-12">
            <div class="row">
                <h2>Product List</h2>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <Product v-for="product in products" :key="product.id" :product = "product" @onDelete = "onDelete" @onEdit="onEdit"/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import Product from "./Product";

    export default {
        name : "ProductList",
        components: {
            Product
        },
        props : {
            products : {
                type : Array
            }
        },
        methods : {
            onDelete(id) {
                this.$emit("onDelete", id);
            },
            onEdit(data) {
                this.$emit('onEdit', data);
            }
        }
    }
</script>

<style scoped>
    .product-list {
        margin-top: 20px;
    }
</style>
