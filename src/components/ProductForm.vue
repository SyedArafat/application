<template>
    <div class="product-form">
        <div class="container">
            <div class="row">
            <h2>Add New Product</h2>
            <form class="form">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="product_id">Product ID</label>
                        <input type="text" name="product_id" required class="form-control" id="product_id" placeholder="Product ID" @change="handleChange" :value="form.product_id">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="title">Title</label>
                        <input type="text" name="title" class="form-control" id="title" placeholder="Title" @change="handleChange" :value="form.title">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <label for="description">Description</label>
                        <input type="text" name="description" required class="form-control" id="description" placeholder="Description" @change="handleChange" :value="form.description">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="image">Product Image</label>
                        <input type="file" name="image" ref="image" required class="form-control" id="image" placeholder="Image" @change="handleChange" :value="form.image">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">Price</label>
                        <input type="number" name="price" required class="form-control" id="price" placeholder="Price" @change="handleChange" :value="form.price">
                    </div>
                </div>
                <div class="col-md-6">
                    <button type="submit" :class="btnClass" @click="onFormSubmit">{{ btnName }}</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert';

    export default {
        name : "ProductForm",
        props : {
            form : {
                type : Object
            }
        },
        data () {
            return {
                file : '',
                btnName : "Save",
                btnClass : "ui primary button submit-button"
            }
        },
        methods : {
            handleChange(event) {
                console.log(event.target);
                const {name, value} = event.target;
                let form = this.form;
                if (name === "image") this.file = ( this.$refs.image.files[0]);
                form [name] = value;
                this.form = form;
            },
            onFormSubmit (e) {
                e.preventDefault();
                if (this.formValidation()) {
                    this.$emit("onFormSubmit", this.form, this.file);
                    this.clearFormFields();
                }
            },
            formValidation() {
                if (document.getElementsByName('product_id')[0].value === '') {
                    swal("Product ID is required");
                    return false;
                }
                if (document.getElementsByName('title')[0].value === '') {
                    swal("Title is required");
                    return false;
                }
                if (document.getElementsByName('description')[0].value === '') {
                    swal("Description is required");
                    return false;
                }
                if (document.getElementsByName('price')[0].value === '') {
                    swal("Price is required");
                    return false;
                }
                return true;
            },

            clearFormFields() {
                this.form.title = '';
                this.form.description ='';
                this.form.product_id = '';
                this.form.price = '';
                this.form.is_edit = false;
                // this.$refs.image.value = null;

                // document.querySelector('.form').reset();
            }
        },
        updated() {
            if(this.form.is_edit)
                this.btnName = "Update";
                this.btnClass = "ui orange button submit-button"
        }
    }
</script>

<style scoped>
    .required {
        color: #ff0000;
    }
</style>
