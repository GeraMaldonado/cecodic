<template>
  <div class="contenedorAdmin">
    <img class="logoAdmin" src="@/assets/Picture2.png"
      alt="Logo del Centro de Comunicación y Divulgación de la Ciencia “Galileo Galilei”">
    <div class="formulario">
      <form class="login" @submit.prevent="login">
        <table>
          <tbody>
            <tr>
              <td class="columnaSesion"><label for="usuario"><i class="fas fa-user fa-xl"></i></label></td>
              <td class="columnaIngreso"><input type="text" name="usuario" v-model="usuario"> <br></td>
            </tr>
            <tr>
              <td class="columnaSesion"><label for="contrasena"><i class="fas fa-key fa-xl"></i></label></td>
              <td class="columnaIngreso"><input type="password" name="contrasena" v-model="contrasena"><br><br></td>
            </tr>
          </tbody>
        </table>
        <div class="botones"><button class="btn-acceder" type="submit"> Acceder</button></div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { url } from '../utils';
import { useToast } from 'primevue/usetoast';


const usuario = ref('');
const contrasena = ref('');
const router = useRouter();
const toast = useToast();

const login = async () => {
  try {
    const datosUsuairo = {
      usuario: usuario.value,
      contrasena: contrasena.value
    };

    const response = await fetch(`${url}/eventos/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosUsuairo),
    });

    const data = await response.json();
    if (data.token) {
      window.localStorage.setItem('credencial', data.token);
      router.push({ name: 'home' }).then(() => {
        window.location.reload();
      });
    }
    toast.add(data.message === 'Accesando' ? { severity: 'success', summary: 'Éxito', detail: data.message, life: 3500 }:
    { severity: 'warn', summary: '', detail: data.message, life: 3500 });
    usuario.value= '';
    contrasena.value = '';
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.contenedorAdmin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 350px;
}

.logoAdmin {
  width: 180px;
  margin-bottom: 20px;
}

.formulario {
  width: 390px;
  height: 200px;
  background-color: var(--color-base);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.botones {
  display: flex;
  justify-content: right;
}

.btn-acceder {
  background-color: var(--color-base-oscuro);
  color: var(--color-texto1);
  height: 40px;
  width: 100px;
  border-radius: 15px;
  border: none;
}

.columnaIngreso input {
  height: 40px;
  width: 300px;
  border-radius: 10px;
  border: 2px solid var(--color-base-oscuro);
  background-color: var(--color-background);
}
</style>