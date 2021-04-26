
// Instanciar Vue
const AppVue = {
  data() {
        return {
            titulo: 'COVID-19',
            list: [],
            total: {},
            status:'home',
            subTitles:['Casos en el mundo', 'Casos confirmados','Muertes confirmadas','Recuperados', 'Activos'],
            subTitle:'Casos en el mundo'
        }
  },
  created(){
    axios.get(`https://covid2019-api.herokuapp.com/v2/current`)
    .then(({ data }) => {
        this.list = data.data
    })
    .catch((err) => {
        alert(err)
        alert(`Error al obtener la lista.`)
    })
    axios.get(`https://covid2019-api.herokuapp.com/v2/total`)
    .then(({ data }) => {
        this.total = data.data
    })
    .catch((err) => {
        alert(err)
        alert(`Error al obtener la lista.`)
    })
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
    changeTab(status){
      this.status=status
    }
  },
  watch:{
    status: function() {
      switch (this.status){
        case 'home':  
          this.subTitle= this.subTitles[0]
          break;
        case 'confirmed': 
          this.subTitle= this.subTitles[1]
          break;
        case 'deaths': 
          this.subTitle= this.subTitles[2]
          break;
        case 'recovered': 
          this.subTitle= this.subTitles[3]
          break;
        case 'active': 
          this.subTitle= this.subTitles[4]
          break;
      }
    },
  }
  
}
Vue.createApp(AppVue).mount('#app')