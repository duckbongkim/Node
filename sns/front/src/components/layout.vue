<template>
<div class="container">
    <form id="login-form" action="" @submit.prevent="login">
        
        <div class="input-group">
            <label for="snsid">아이디</label>
            <input type="text" id="snsid" v-model="loginData.snsid">
        </div>

        <div class="input-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="loginData.password" >
        </div>
        <router-link to="/join" class="btn" >회원가입</router-link>
        <button id="login" type="submit" class="btn">로그인</button>

    </form>
</div>
</template>
<script>
import aixos from 'axios'
export default{ 
    name:'',
    components:{},
    data(){
        return{
            loginData:{
                snsid:'',
                password:'',
            }
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{
       async login (){
            const result = await aixos.post('http://localhost:3000/auth/login',this.loginData)
            console.log(result.data)
            this.loginData = {snsid:'', password:''}
        }
    }
}
</script>