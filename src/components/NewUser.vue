<template>
    <form @submit.prevent='addUser'>
        <h3>add a new user</h3>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <input id="name" v-model='name' alt='name' type='text' class = 'form-control' placeholder="name">
                    <div class = 'nameErrors'></div>
                </div>
                <div class="col-sm">
                    <input id="username" v-model='username' alt='username' type='text' class = 'form-control' placeholder="username">
                    <div class = 'usernameErrors'></div>
                </div>
                <div class="col-sm">
                    <input id="email" v-model='email' alt='email' type='text' class = 'form-control' placeholder="email">
                    <div class = 'emailErrors'></div>
                </div>
            </div><br>
            <div class="row">
                <div class="col-sm">
                    <input id="phone" v-model='phone' alt='phone number' type='text' class = 'form-control' placeholder="phone number">
                </div>
                <div class="col-sm">
                    <input id="website" v-model='website' alt='website' type='text' class = 'form-control' placeholder="website">
                </div>
            </div><br>
            <div class="row">
                <label><b>company:</b></label>
                <div class="col-sm">
                    <input id="company_name" v-model='company_name' alt='company name' type='text' class = 'form-control' placeholder="company name">
                </div>
                <div class="col-sm">
                    <input id="company_catchPhrase" v-model='company_catchPhrase' alt='company catch-phrase' type='text' class = 'form-control' placeholder="company catch-phrase">
                </div>
                <div class="col-sm">
                    <input id="company_bs" v-model='company_bs' alt='Company BS' type='text' class = 'form-control' placeholder="company bs">
                </div>
            </div><br>
            <div class="row">
                <label><b>address:</b></label>
                <div class="col-sm">
                    <input id="street_address" v-model='street_address' alt='street address' type='text' class = 'form-control' placeholder="street address">
                </div>
                <div class="col-sm">
                    <input id="suite_address" v-model='suite_address' alt='suite' type='text' class = 'form-control' placeholder="suite/apartment">
                </div>
                <div class="col-sm">
                    <input id="city_address" v-model='city_address' alt='city' type='text' class = 'form-control' placeholder="city">
                </div>
            </div><br>
            <div class="row">
                <div class="col-sm">
                    <input id="zip_address" v-model='zip_address' alt='zip code' type='text' class = 'form-control' placeholder="zip code">
                </div>
                <div class="col-sm">
                    <input id="geo_lat_address" v-model='geo_lat_address' alt='latitude' type='text' class = 'form-control' placeholder="latitude">
                </div>
                <div class="col-sm">
                    <input id="geo_lng_address" v-model='geo_lng_address' alt='longitude' type='text' class = 'form-control' placeholder="longitude">
                </div>
            </div><br>
        </div>

        <input class = 'btn btn-outline-success' type = 'submit' value = 'submit'>

    </form><br>
</template>

<script>
/** form to add a new user */
import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

export default {
    name: 'NewUser',
    emits: ['add-to-users'],
    props: {
        users: {
            type: Array, 
            required: true,
        }
    },
    data() {
        /** initialize data to empty */
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
    methods: {
        validate(data){
            /** check that there are values inputted for name, username and email. add error messages to all fields that are missing. return false if it fails validation, true if it passes*/
            let nameErrors = document.querySelector('.nameErrors')
            let usernameErrors = document.querySelector('.usernameErrors')
            let emailErrors = document.querySelector('.emailErrors')

            if(data.name === ''){
                nameErrors.innerHTML = 'please enter a value for name'
            } else {
                nameErrors.innerHTML = ''
            }

            if(data.username === ''){
                usernameErrors.innerHTML = 'please enter a value for username'
            } else {
                usernameErrors.innerHTML = ''
            }

            if(data.email === ''){
                emailErrors.innerHTML = 'please enter a value for email'
            } else {
                emailErrors.innerHTML = ''
            }

            if(data.email === '' || data.username === '' || data.name === ''){
                return false;
            } else {
                return true;
            }

        },
        addUser() {
            /** create formData object with all inputted values, and post it with axios. */
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

            if (!this.validate(formData)){
                return;
            }

            axios.post(BASE_URL, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                this.$emit("add-to-users", res.data)
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

</script>