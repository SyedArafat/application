<template>
    <nav v-if="user" class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Product Management</a>
            </div>
            <ul class="nav navbar-nav">
                <li><router-link to="/">Home</router-link></li>
                <li><a href="javascript:void(0)" @click="handleClick">Sign Out</a></li>
            </ul>
        </div>
    </nav>
    <nav v-else class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Product Management</a>
            </div>
            <ul class="nav navbar-nav">
                <li><router-link to="/login">Login</router-link></li>
                <li><a href="#">Page 3</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'NavBar',
        methods : {
            handleClick() {
                localStorage.removeItem('token');
                this.$store.dispatch('user', null);
                this.$router.push('/');
            }
        },
        computed : {
            ...mapGetters(['user'])
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
