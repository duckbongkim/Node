<template>
<div>

<div class="modal" tabindex="-1" id="userModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
            <sloat name="title"></sloat>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <sloat name="body"></sloat>
      </div>
      <div class="modal-footer">
        <sloat name="footer"></sloat>
      </div>
    </div>
  </div>
</div>

</div>
</template>
<script>

export default{ 
    name:'',
    components:{},
    data(){
        return{
            modalId:{
            type:String,
            default:'userModal'
        },

        };
    },
    setup(){},
    created(){},
    mounted(){},
    unmounted(){},
    methods:{}
}
</script>