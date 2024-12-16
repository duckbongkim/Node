<template>
<div>
    <Layout />
</div>
</template>
<script>
import Layout from '../components/layout.vue';
import signupVue from '../components/signup.vue';
export default{ 
    name:'',
    components:{signupVue, Layout},
    data(){
        return{
            sampleData:''
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>