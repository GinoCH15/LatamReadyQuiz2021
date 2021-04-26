
// Instanciar Vue
const AppVue = {
  data() {
        return {
            cars: ['','','','','','','','','','','','']
        }
  },
  methods:{
    addCar(index){
      if (this.cars[index]!=''){
        const today = new Date()
        const enterDate = this.cars[index].enterDay.getDate()+'/'+(this.cars[index].enterDay.getMonth()+1)+'/'+this.cars[index].enterDay.getFullYear()+' '+this.cars[index].enterDay.getHours()+':'+this.cars[index].enterDay.getMinutes()
        const finishDate = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()
        const diffTime = Math.abs(today - this.cars[index].enterDay);
        const diffhours = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 60)); 
        const price = 5*diffhours
        Swal.fire({
          title: "Cobrar S/" +price,
          html:
          `<p class="label">Hora de entrada: ${enterDate}</p>` +
          `<p class="label">Hora de salida: ${finishDate}</p>` ,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            this.cars.splice(index, 1,'');
          }
        })
      }else{
        Swal.fire({
          title: "Asignar carro",
          html:
          '<span class="label">Apellidos</span>' +
          '<input id="swal-input0" type="text" class="swal2-input" required>' +
          '<span class="label">Nombres</span>' +
          '<input id="swal-input1" type="text" class="swal2-input" required>' +
          '<span class="label">Telefono</span>' +
          '<input id="swal-input2" type="text" class="swal2-input" required>' ,
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
              Swal.showValidationMessage('Telefono requerido')   
            }
          }
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            const lastName = document.getElementById('swal-input0').value
            const name = document.getElementById('swal-input1').value
            const phone = document.getElementById('swal-input2').value
            const today = new Date()
            const obj = {lastName: lastName,name:name,phone:phone,enterDay:today}
            this.cars.splice(index, 1, obj);
          }
        })
      }
    }
    
  },
  watch(){

  }
  
}
Vue.createApp(AppVue).mount('#app')