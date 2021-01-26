<template>
    <h1>Users</h1>
    <!-- if it's done loading and there is data -->
    <ul v-if='!loading && data && data.length'> 
        <li v-for='user of data' :key = 'user.id'>
            <p>{{user.name}}, {{user.username}}, {{user.email}}</p>

            <button @click='toggleEditForm(user.id)'>edit user</button>
            <EditUser v-show='editingObj[user.id]' :user='user' @edit-user='editCurrentUser'></EditUser>
            <button @click='deleteUser(user)'>delete user</button>
        </li>
    </ul>
    <div v-if='!loading && data && data.length'>
        <NewUser :users='data' @add-to-users='addNewUser'></NewUser>
    </div>

    <p v-if='loading'>Loading...</p>
    <p v-if='error'>{{error}}</p>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'
import NewUser from './NewUser.vue'
import EditUser from './EditUser.vue'

export default {
    name: 'Users', 
    components: {
        NewUser,
        EditUser,
    },
    props: {
        
    },
    methods: {
        addNewUser(user) {
            this.data.push(user)
        },
        deleteUser(user){
            axios.delete(`${BASE_URL}/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(()=> {
                const index = this.data.indexOf(user)
                if (index > -1){
                    this.data.splice(index, 1)
                }
            })
        },
        toggleEditForm(id){
            this.editingObj[id] = !this.editingObj[id]
        },
        editCurrentUser(newUserData){
            // also hide edit form here! 
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].id === newUserData.id){
                    this.data.splice(i, 1, newUserData)
                }
            }

            this.toggleEditForm(newUserData.id)
        }
    },
    setup() {
        // ref() marks these variables as reactive data. 
        const data = ref(null);
        const loading = ref(true);
        const error = ref(null);
        const editingObj = ref({})

        function getUsers(){
            loading.value = true;
            axios.get(BASE_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res)=> {
                data.value = res.data
                for(let user of data){
                    editingObj[user.id] = false
                }
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
            error, 
            editingObj
        }
    }
}
</script>
