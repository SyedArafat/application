<template>
    <div class="container">
        <div class="col-md-6 col-md-offset-3">
            <form @submit.prevent = "handleSubmit">
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" v-model = "email" class="form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" v-model = "password" class="form-control" id="pwd">
                </div>

                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name : 'Login',
        data () {
            return {
                email    : '',
                password : ''
            }
        },
        methods : {
             async handleSubmit() {
                const response = await axios.post('http://localhost/products-api/public/api/login', {
                    email : this.email,
                    password : this.password
                });
                localStorage.setItem('token', this.response.data.data.token);
                console.log(response);
            }
        }
    }
</script>