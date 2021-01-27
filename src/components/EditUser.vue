<template>
    <form @submit.prevent='editUser'>
        <h3>edit {{this.user.name}}</h3>
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <input id="name" v-model='name' alt='name' type='text' class = 'form-control' placeholder="name">
                </div>
                <div class="col-sm">
                    <input id="username" v-model='username' alt='username' type='text' class = 'form-control' placeholder="username">
                </div>
                <div class="col-sm">
                    <input id="email" v-model='email' alt='email' type='text' class = 'form-control' placeholder="email">
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