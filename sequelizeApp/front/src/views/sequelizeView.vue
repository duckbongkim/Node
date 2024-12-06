<template>
<div>

    <div>
      <form id="user-form" @submit.prevent="postUser()">
        <fieldset>
          <legend>사용자 등록</legend>
          <div><input type="text" placeholder="이름" v-model="newUser.name"></div>
          <div><input type="number" placeholder="나이" v-model="newUser.age"></div>
          <div><input type="text" placeholder="코멘트" v-model="newUser.comment"></div>
          <div><input id="married" type="checkbox" v-model="newUser.married"><label for="married">결혼 여부</label></div>
          
          <button type="submit">등록</button>
        </fieldset>
      </form>

        <br>

      <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>이름</th>
                <th>나이</th>
                <th>결혼여부</th>
                <th>코멘트</th>
            </tr>
        </thead>   
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.age}}</td>
                <td>{{user.married ? "기혼":"미혼"}}</td>
                <td>{{user.comment}}</td>
            </tr>
        </tbody> 
    </table>

    <br>

    <form action="" @submit.prevent="postComment">
      <fieldset>
            <legend>댓글등록</legend>
            <div><input v-model="newComment.userid" type="text" placeholder="사용자 아이디"></div>
            <div><input v-model="newComment.comment" type="text" placeholder="댓글"></div>
            <button type="submit">댓글등록</button>
        </fieldset>  
    </form>
        <br>

    <table>
        <thead>
            <tr>
                <th>아이디</th>
                <th>작성자</th>
                <th>댓글</th>
                <th>수정</th>
                <th>삭제</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="comment in comments" :key="comment.id">
                <td>{{comment.id}}</td>
                <td>{{comment.User.name}}</td>
                <td>{{comment.comment}}</td>
                <td><button @click="patchComment(comment.id)">수정</button></td>
                <td><button @click="deleteComment(comment.id)">삭제</button></td>
            </tr>
        </tbody>
    </table>

    <br>

    <form @submit.prevent="searchComment(searchUser)">
    <fieldset>
        <legend>댓글 검색</legend>
        <div>
            <input v-model="searchUser" type="text" placeholder="사용자 아이디 검색">
        </div>
        <button type="submit" >찾기</button>
    </fieldset>
    </form>
        <button type="submit" @click=" getComments()">모두보기</button>
    </div>
    
    

      

</div>
</template>

<script>
import axios from 'axios'
export default{ 
    name:'',
    components:{},
    data(){
        return{
            users:[],
            newComment:{
                userid:'',
                comment:'',
            },
            comments:[],
            newUser:{
                name:'',
                age:0,
                married:false,
                comment:'',
            },
            searchUser:'',
        };
    },
    setup(){},
    created(){
        this.getComments()
    },
    mounted(){
        this.getUsers()
    },
    unmounted(){},
    methods:{
        //사용자 조회(get)
        async getUsers(){
            try {
                const response = await axios.get('http://localhost:3000/user');
                this.users = response.data
            } catch(err) {
                console.error(err)
            }
        },

        //사용자 등록(post)
        async postUser(){
            if(!this.newUser.name || !this.newUser.age){
                alert("이름과 나이를 입력하세요.")
                return;
            }
            try {
                // const response = await axios.post('http://localhost:3000/user',this.newUser);
                // //리스폰스를 통해 데이터를 받는방법
                // this.users = response.data
                // this.newUser = {name:'', age:0, married:false} // 등록후 newUser 초기화

                await axios.post('http://localhost:3000/user',this.newUser);
                this.getUsers();
                this.newUser = {name:'', age:0, married:false}
            }catch(err){
                console.error(err)
            }

        },

        //댓글 조회(get)
        async getComments(){
            try {
                const response = await axios.get('http://localhost:3000/comment');
                this.comments = response.data;
                console.log(this.comments)
            }catch(err){
                console.error(err)
            }
        },

        //댓글 등록(post)
        async postComment(){
            if(!this.newComment.userid || !this.newComment.comment){
                alert('아이디와 댓글을 입력하세요')
                return;
            }
            try {
                await axios.post('http://localhost:3000/comment',this.newComment);
                this.getComments();
                this.newComment = {userid:'',comment:''}
            }catch(err){
                console.error(err)
            }
        },

        //댓글 수정(patch) pathComment
        async patchComment(commentID){
            const newText = prompt('수정할 내용 입력.')
            if(!newText){
                alert('수정할 내용을 입력하세요')
                return;
            }
            try{
                await axios.patch(`http://localhost:3000/comment/${commentID}`,{text:newText});
                this.getComments();
            }catch(err){
                console.error(err)
            }
        },

        //댓글 삭제(delete)
        async deleteComment(commentID){
            try {
                await axios.delete(`http://localhost:3000/comment/${commentID}`)
                this.getComments();
            }catch(err){
                console.error(err);
            }
        },

        //특정 아이디코멘트 조회
        async searchComment(userID){
            try {
                const response = await axios.get(`http://localhost:3000/user/${userID}/comments`)
                this.comments = response.data
                this.searchUser = ''
            } catch(err){
                console.error(err)
            }
        }

    }
}
</script>

<style>
table {
  border: 1px solid black;
  border-collapse: collapse;
}
table th,
table td {
  border: 1px solid black;
  padding: 5px;
}
</style>