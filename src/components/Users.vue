<template>
    <h1>Users</h1>
    <!-- if it's done loading and there is data -->
    <table v-if='!loading && data && data.length' class="table table-hover">
    <thead>
        <tr>
        <th scope="col">Name</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for='user of data' :key = 'user.id' >
        <td>{{user.name}}</td>
        <td>{{user.username}}</td>
        <td>{{user.email}}</td>
        <td>
            <button @click='toggleEditForm(user.id)' class = 'btn btn-outline-info'><BIconPencil></BIconPencil></button>
            <EditUser v-show='editingObj[user.id]' :user='user' @edit-user='editCurrentUser'></EditUser>
            <button @click='deleteUser(user)' v-show='!editingObj[user.id]' class = 'btn btn-outline-danger'><BIconXCircle></BIconXCircle></button>
        </td>
        </tr>
    </tbody>
    </table>

    <div v-if='!loading && data && data.length'>
        <button @click='toggleAdding' class = 'btn btn-lg btn-block btn-outline-success'><BIconPersonPlus></BIconPersonPlus></button>
        <div v-show='addingUser'><NewUser :users='data' @add-to-users='addNewUser'></NewUser></div>
    </div>

    <p v-if='loading'>Loading...</p>
    <p v-if='error'>{{error}}</p>
</template>

<script>
/** show all users listed. also renders NewUser component to show form for adding user.
the editingObj at the specific user is toggled each time that the edit user button is clicked or the edit form is submitted. */

import {ref, onMounted} from 'vue'
import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'
import NewUser from './NewUser.vue'
import EditUser from './EditUser.vue'
import {BIconPencil, BIconXCircle, BIconPersonPlus} from 'bootstrap-icons-vue'

export default {
    name: 'Users', 
    components: {
        NewUser,
        EditUser,
        BIconPencil,
        BIconXCircle,
        BIconPersonPlus
    },
    methods: {
        addNewUser(user) {
            /** add new user to list of users */
            this.toggleAdding()
            this.data.push(user)
        },
        deleteUser(user){
            /** delete this user from list of users. */
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
            /** toggle the editing boolean based on whether we are currently editing that user. */
            this.editingObj[id] = !this.editingObj[id]
        },
        editCurrentUser(newUserData){
            /** replace the current user with their new edited values, while maintaining the same index in array. toggle editing bool off when complete. */
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].id === newUserData.id){
                    this.data.splice(i, 1, newUserData)
                }
            }

            this.toggleEditForm(newUserData.id)
        },
        toggleAdding() {
            this.addingUser = !this.addingUser
        }
    },
    setup() {
        /** set up data variable and populate it with users, create loading variable so that it waits to display users until they are all loaded, create variables for toggling editing and storing errors. */
        // ref() marks these variables as reactive data. 
        const data = ref(null);
        const loading = ref(true);
        const error = ref(null);
        const editingObj = ref({})
        const addingUser = ref(false)

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
            editingObj,
            addingUser
        }
    }
}
</script>
