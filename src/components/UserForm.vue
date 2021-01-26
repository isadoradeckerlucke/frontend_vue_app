// <template>
//     <form @submit.prevent='onSubmit'>

//         <label for="name"><b>Name:</b></label>
//         <input id="name" v-model='name'>

//         <label for="username"><b>Username:</b></label>
//         <input id="username" v-model='username'>

//         <label for="email"><b>Email:</b></label>
//         <input id="email" v-model='email'>

//         <label for="phone"><b>Phone Number:</b></label>
//         <input id="phone" v-model='phone'>

//         <label for="website"><b>Website:</b></label>
//         <input id="website" v-model='website'>

//         <label><b>Company</b></label>
//         <label for="company_name">Company Name:</label>
//         <input id="company_name" v-model='company_name'>

//         <label for="company_catchPhrase">Company Catch Phrase:</label>
//         <input id="company_catchPhrase" v-model='company_catchPhrase'>

//         <label for="company_bs">Company BS:</label>
//         <input id="company_bs" v-model='company_bs'>

//         <label><b>Address:</b></label>
//         <label for="street_address">Street:</label>
//         <input id="street_address" v-model='street_address'>

//         <label for="suite_address">Suite:</label>
//         <input id="suite_address" v-model='suite_address'>

//         <label for="city_address">City:</label>
//         <input id="city_address" v-model='city_address'>

//         <label for="zip_address">Zipcode:</label>
//         <input id="zip_address" v-model='zip_address'>

//         <label for="geo_lat_address">Latitude:</label>
//         <input id="geo_lat_address" v-model='geo_lat_address'>

//         <label for="geo_lng_address">Longitude:</label>
//         <input id="geo_lng_address" v-model='geo_lng_address'>
        
//         <input class = 'button' type = 'submit' value = 'submit'>
//     </form>

// </template>
// <script>
// export default {
//     methods: {
//         onSubmit() {
//             this.$emit('on-submit', )
//         }
//     }
// }
// </script>