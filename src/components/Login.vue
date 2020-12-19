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

                <button type="submit" class="btn btn-default">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import swal from 'sweetalert';

    export default {
        name : 'Login',
        data () {
            return {
                email    : '',
                password : '',
            }
        },
        methods : {
            async handleSubmit() {
                let formData = new FormData();
                formData.append("email", this.email);
                formData.append("password", this.password);
                const response = await axios.post('http://localhost/products-api/public/api/login', formData);
                if (response.data.code === 200) {
                    localStorage.setItem('token', response.data.data.token);
                    await this.$store.dispatch('user', response.data.data.user);
                    await this.$router.push('/');

                }
                else {
                    swal("Wrong email or password!", {
                        icon: "error",
                    });
                }

            }
        }
    }
</script>