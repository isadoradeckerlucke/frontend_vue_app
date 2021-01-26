<template>
    <form @submit.prevent='addUser'>
        <h3>add a new user</h3>
        <label for="name"><b>Name:</b></label>
        <input id="name" v-model='name'>

        <label for="username"><b>Username:</b></label>
        <input id="username" v-model='username'>

        <label for="email"><b>Email:</b></label>
        <input id="email" v-model='email'>

        <label for="phone"><b>Phone Number:</b></label>
        <input id="phone" v-model='phone'>

        <label for="website"><b>Website:</b></label>
        <input id="website" v-model='website'>

        <label><b>Company</b></label>
        <label for="company_name">Company Name:</label>
        <input id="company_name" v-model='company_name'>

        <label for="company_catchPhrase">Company Catch Phrase:</label>
        <input id="company_catchPhrase" v-model='company_catchPhrase'>

        <label for="company_bs">Company BS:</label>
        <input id="company_bs" v-model='company_bs'>

        <label><b>Address:</b></label>
        <label for="street_address">Street:</label>
        <input id="street_address" v-model='street_address'>

        <label for="suite_address">Suite:</label>
        <input id="suite_address" v-model='suite_address'>

        <label for="city_address">City:</label>
        <input id="city_address" v-model='city_address'>

        <label for="zip_address">Zipcode:</label>
        <input id="zip_address" v-model='zip_address'>

        <label for="geo_lat_address">Latitude:</label>
        <input id="geo_lat_address" v-model='geo_lat_address'>

        <label for="geo_lng_address">Longitude:</label>
        <input id="geo_lng_address" v-model='geo_lng_address'>


        <input class = 'button' type = 'submit' value = 'submit'>

    </form>
</template>

<script>
// import {ref} from 'vue'
import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

export default {
    name: 'NewUser',
    props: {
        users: {
            type: Array, 
            required: true,
        }
    },
    data() {
        return {
            name: "",
            email: "",
            username: "",
            phone: "", 
            website: "",
            company_name: "",
            company_catchPhrase: "",
            company_bs: "",
            street_address: "",
            suite_address: "",
            city_address: "",
            zip_address: "",
            geo_lat_address: "",
            geo_lng_address: ""
        }
    }, 
    computed: {
        // address, company are both computed or make all formData computed? 
    },
    methods: {
        addUser() {
            let formData = {
                name: this.name, 
                username: this.username,
                email: this.email, 
                address: {
                    street: this.street_address,
                    suite: this.suite_address, 
                    city: this.city_address,
                    zipcode: this.zip_address,
                    geo: {
                        lat: this.geo_lat_address,
                        lng: this.geo_lng_address
                    }
                },
                phone: this.phone,
                website: this.website, 
                company: {
                    name: this.company_name,
                    catchPhrase: this.company_catchPhrase,
                    bs: this.company_bs
                }
            }
            axios.post(BASE_URL, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                // users.push(res.data)
                // when I console.log I get the new user object. I just need to make sure it's adding to the list of users that's on the page from Users.vue.
                console.log(res.data)
            })
            .catch((e)=> {
                console.log(e)
            })

            // set values back to null
            this.name = ""
            this.email= ""
            this.username= ""
            this.phone= ""
            this.website= ""
            this.company_name= ""
            this.company_catchPhrase= ""
            this.company_bs= ""
            this.street_address= ""
            this.suite_address= ""
            this.city_address= ""
            this.zip_address= ""
            this.geo_lat_address= ""
            this.geo_lng_address= ""
        }
    }
};

// adding the user is successful, but we need to add it to the users list too. 
</script>