<template>
    <form @submit.prevent='editUser'>
        <h3>edit {{this.user.name}}</h3>
        <label for="name"><b>Name:</b></label>
        <input id="name" v-model='name'><br>

        <label for="username"><b>Username:</b></label>
        <input id="username" v-model='username'><br>

        <label for="email"><b>Email:</b></label>
        <input id="email" v-model='email'><br>

        <label for="phone"><b>Phone Number:</b></label>
        <input id="phone" v-model='phone'><br>

        <label for="website"><b>Website:</b></label>
        <input id="website" v-model='website'><br>

        <label><b>Company</b></label><br>
        <label for="company_name">Company Name:</label>
        <input id="company_name" v-model='company_name'>

        <label for="company_catchPhrase">Company Catch Phrase:</label>
        <input id="company_catchPhrase" v-model='company_catchPhrase'>

        <label for="company_bs">Company BS:</label>
        <input id="company_bs" v-model='company_bs'><br>

        <label><b>Address:</b></label><br>
        <label for="street_address">Street:</label>
        <input id="street_address" v-model='street_address'>

        <label for="suite_address">Suite:</label>
        <input id="suite_address" v-model='suite_address'>

        <label for="city_address">City:</label>
        <input id="city_address" v-model='city_address'><br>

        <label for="zip_address">Zipcode:</label>
        <input id="zip_address" v-model='zip_address'>

        <label for="geo_lat_address">Latitude:</label>
        <input id="geo_lat_address" v-model='geo_lat_address'>

        <label for="geo_lng_address">Longitude:</label>
        <input id="geo_lng_address" v-model='geo_lng_address'><br>

        <input class = 'button' type = 'submit' value = 'submit'>

    </form>
</template>

<script>
/** a form for editing one user. 
displays only if editing variable is set to true for specific user. */

import axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

export default {
    name: 'EditUser',
    props: {
        user: {
            type: Object, 
            required: true,
        }
    },
    data() {
        /** initialize data for editing to the existing user values -- only need to change what you want to */
        return {
            name: this.user.name,
            email: this.user.email,
            username: this.user.username,
            phone: this.user.phone, 
            website: this.user.website,
            company_name: this.user.company.name,
            company_catchPhrase: this.user.company.catchPhrase,
            company_bs: this.user.company.bs,
            street_address: this.user.address.street,
            suite_address: this.user.address.suite,
            city_address: this.user.address.city,
            zip_address: this.user.address.zipcode,
            geo_lat_address: this.user.address.geo.lat,
            geo_lng_address: this.user.address.geo.lng,
        }
    }, 
    methods: {
        editUser() {
            /** patch request to edit the user (could have been put as well since we're technically updating every value even if they don't change it, but patch makes future refactoring/improvements to this process easier). */
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
            axios.patch(`${BASE_URL}/${this.user.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                this.$emit("edit-user", res.data)
                console.log(res.data)
            })
            .catch((e)=> {
                console.log(e)
            })
        }
    }
};

</script>