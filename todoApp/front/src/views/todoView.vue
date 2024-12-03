<template>
<div id="app" class="container mt-5">
    <h1>내 Todo App</h1>

    <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item"
    :class="{active: index === 0}"
    v-for="(image, index) in images" :key="index">
      <img src="image" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    <div>
            <form @submit.prevent="addTodo" class="input-group">
                <div class="input-group mb-3">
                    <input type="text" class="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2" v-model="newTodoText">
                    <button class="btn btn-outline-secondary input-group" type="submit" id="button-addon2">입력</button>
                </div>
            </form>
        

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Re-title</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo in todos" :key="todo.id">
                        <td>{{todo.id}}</td>
                        <td>{{todo.title}}</td>
                        <td>
                             <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" @change="changeStatus(todo)" v-model="todo.done">
                            </div>
                        </td>
                        <td><button class="btn btn-warning" @click="deleteTodo(todo.id)">삭제</button></td>
                        <td><button class="btn btn-info" @click="openModal(todo.id)">수정</button></td>
                    </tr>
                </tbody>
            </table>
            <form @submit.prevent="">
                <input type="file" @change="fileChange"/>
                <button type="submit" class="btn btn-primary" @click="uploadImage">Upload</button>
            </form>
    </div>

           <div v-if="isModalVisible" class="modal d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">타이틀 변경</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal()"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" v-model="editTitle">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal()" >닫기</button>
                    <button type="submit" class="btn btn-primary" @click="updateTodo()">타이틀 체인지</button>
                </div>
                </div>
            </div>
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
            todos:[],
            newTodoText:'',
            isModalVisible:false,
            choiceId:0,
            editTitle:'',

            file:null,
            images: [],
        };
    },
    setup(){},
    created(){
        this.getTodo(),
        this.getImages()
    },
    mounted(){},
    unmounted(){},
    methods:{
        async getTodo(){
            const response = await axios.get('http://localhost:3000')
            this.todos = response.data
            console.log(this.todos)
        },

        async addTodo(){
            const response = await axios.post('http://localhost:3000/',{title:this.newTodoText})
            this.todos = response.data
            console.log(response.data)
        },

        async changeStatus(todo){
            await axios.put(`http://localhost:3000/${todo.id}`,{done:todo.done})
            console.log(this.todos)
        },

        async deleteTodo(id){
            const response = await axios.delete(`http://localhost:3000/${id}`)
            // this.todos = this.todos.filter(todo=> todo.id !== id)
            this.todos = response.data
            
        },

        async updateTodo(){
            const response = await axios.put(`http://localhost:3000/update/${this.chioceId}`,{title:this.editTitle})
            this.todos = response.data
            this.closeModal()
            console.log(response)
        },

        openModal(id){
            this.isModalVisible=true
            this.chioceId = id
            console.log(this.chioceId)
        },

        closeModal(){
            this.isModalVisible=false
            this.editTitle=""
        },

          fileChange(event){
            this.file = event.target.files[0]
            console.log(event.target.files)
        },

        async uploadImage(){
            if (!this.file) return;
            
            const formData = new FormData();
            formData.append('image', this.file);

            axios.post('http://localhost:3000/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(formData)
        },

        async getImages(){
            const response = await axios.get('http://localhost:3000/image');
            this.images = response.data
            
        }

    }
}
</script>