<template>
<div>
    <h1>{{result}}</h1>
</div>
</template>
<script>
import axios from 'axios'
export default{ 
    name:'',
    components:{},
    data(){
        return{
            result:'',
        };
    },
    setup(){},
    created(){
        this.test()
    },
    mounted(){},
    unmounted(){},
    methods:{

            async test() {
                const respones = await axios.get('http://localhost:3000/')
                this.result = respones.data
            }

    }
}
</script>