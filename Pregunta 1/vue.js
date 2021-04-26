
// Instanciar Vue
const AppVue = {
  data() {
        return {
            titulo: 'Tablero Scrum',
            pending: [],
            finished: []
        }
  },
  methods:{
    addPending(){
      Swal.fire({
        title: "Agregar tarea pendiente",
        html:
        '<span class="label">Titulo</span>' +
        '<input id="swal-input0" type="text" class="swal2-input" required>' +
        '<span class="label">Descripción</span>' +
        '<input id="swal-input1" type="text" class="swal2-input" required>' +
        '<span class="label">Puntuación</span>' +
        '<select class="swal2-input" id="swal-input2" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        preConfirm: () => {
          if (document.getElementById('swal-input0').value=='') {
            Swal.showValidationMessage('titulo requerido')   
          }
          if (document.getElementById('swal-input1').value=='') {
            Swal.showValidationMessage('descripcion requerida')   
          }
          if (document.getElementById('swal-input2').value=='') {
            Swal.showValidationMessage('Puntaje requerido')   
          }
        }
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
          const title = document.getElementById('swal-input0').value
          const description = document.getElementById('swal-input1').value
          const points = document.getElementById('swal-input2').value
          this.pending.push({title: title,description:description,points:points})
        }
      })
    },
    finishedJob(index){
      Swal.fire({
        title: "¿Desea finalizar esta tarea?",
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.finished.push(this.pending[index])
          this.pending.splice(index, 1);
        }
      })
    }
  },
  watch(){

  }
  
}
Vue.createApp(AppVue).mount('#app')