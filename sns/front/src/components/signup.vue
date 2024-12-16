<template>
<div class="timeline">
    
    <form id="join-form" @submit.prevent="join()">
        <div class="input-group">
            <label for="join-email">이메일</label>
            <input type="email" id="join-email" v-model="joinData.email" required>
        </div>


    
        <div class="input-group">
            <label for="join-email">snsID</label>
            <input type="text" id="join-email" v-model="joinData.snsid" required>
        </div>
    

    
        <div class="input-group">
            <label for="join-email">비밀번호</label>
            <input type="password" id="join-email" v-model="joinData.password" required>
        </div>
    

    
        <div class="input-group">
            <label for="join-email">비밀번호 재확인</label>
            <input type="password" id="join-email" v-model="confirmPassword" required>
            <p v-if="confirmPassword && confirmPassword !== joinData.password" class="err-message">비밀번호가 다릅니다.</p>
        </div>
  

   
        <div class="input-group">
            <label for="join-email">닉네임</label>
            <input type="text" id="join-email" v-model="joinData.nick" required>
        </div>
 
    
        <div class="input-group">
            <label for="join-email">전화번호</label>
            <input type="text" id="join-email" v-model="joinData.phone" required>
        </div>

        <button id="join-btn" type="submit" class="btn">회원가입</button>
    </form>

</div>
</template>
<script>
import axios from 'axios'
export default{ 
    name:'JoinComponent',
    components:{},
    data(){
        return{
            joinData:{
                snsid:'', 
                password:'', 
                email:'', 
                phone:'', 
                nick:''
            },
            confirmPassword:'',
        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{

        async join(){
            if(this.joinData.password !== this.confirmPassword){
                alert('비밀번호가 일치하지 않습니다.')
                return
            }
            try{
                await axios.post('http://localhost:3000/auth/join',this.joinData)
                alert('회원가입 성공')
                this.joinData = {snsid:'', password:'',nick:'',phone:'',email:''}
                this.confirmPassword = '',
                await axios.get('http://localhost:3000/')
            }catch(err){
                console.error(err)
                if(err.response && err.response.data.error === 'exist') {
                    alert('이미 존재하는 회원정보 입니다.')
                } else {
                    alert('회원가입중 오류가 발생되었습니다.')
                }
            }
        }

    }
}
</script>

<style scoped>
.timeline {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
}
.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}

.err-message {
    color:red;
    font-size: 10px;
}
</style>