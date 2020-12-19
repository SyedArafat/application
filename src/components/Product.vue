<template>
    <tr>
        <td>{{product.id}}</td>
        <td><img width="100px" :src='product.image' class="img-fluid img-thumbnail" alt="Product Image"></td>
        <td>{{product.title}}</td>
        <td>{{product.description}}</td>
        <td>{{product.price}}</td>
        <td>
            <button class="ui blue button" @click="onEdit">Edit</button>
            <button style="margin-left: 10px" class="ui red button" @click="onDelete">Delete</button>
        </td>
    </tr>
</template>

<script>
    export default {
        name : "Product",
        props : {
            product : {
                type : Object
            }
        },
        methods : {
            onDelete() {
                this.$emit("onDelete", this.product.id);
            },
            onEdit() {
                this.$emit('onEdit', this.product);
            }
        }
    }
</script>

<style scoped>
     td {
        padding: 8px;
        line-height: 1.42857143;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }
</style>
