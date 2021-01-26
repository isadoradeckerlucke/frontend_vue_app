<template>
    <h1>Users</h1>
    <!-- if it's done loading and there is data -->
    <ul v-if='!loading && data && data.length'> 
        <li v-for='user of data' :key = 'user.id'>
            <p>{{user.name}}, {{user.username}}, {{user.email}}</p>

            <!-- add functionality to these buttons! -->
            <button>edit user</button>
            <button>delete user</button>
        </li>
    </ul>
    <div v-if='!loading && data && data.length'>
        <NewUser :users='data'></NewUser>
    </div>

    <p v-if='loading'>Loading...</p>
    <p v-if='error'>{{error}}</p>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'
import NewUser from './NewUser.vue'

export default {
    name: 'Users', 
    components: {
        NewUser,
    },
    props: {
        
    },
    setup() {
        // ref() marks these variables as reactive data. 
        const data = ref(null);
        const loading = ref(true);
        const error = ref(null);

        function getUsers(){
            loading.value = true;
            axios.get(BASE_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=> {
                data.value = res.data
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => {
                loading.value = false;
            })
        }

        // fetch data when the hook is mounted 
        onMounted(() => {
            getUsers()
        })

        // returning these variables from setup method makes them available in the component's template.
        return {
            data, 
            loading, 
            error
        }
    }
}
</script>