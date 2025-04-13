<script setup lang="ts">
import { ref } from 'vue'

const collapse = ref(true)
const toggleSidebar = () => {
  collapse.value = !collapse.value
}
</script>

<template>
  <div :class="['sidebar', collapse ? 'closed' : '']">
    <div class="burger-menu" @click="toggleSidebar()">☰</div>

    <h2 class="home-sidebar">
      <router-link to="/">Home</router-link>
    </h2>
    <h2>Jeux</h2>
    <nav class="nav-sidebar">
      <router-link to="/motus">Motus</router-link>
    </nav>
    <div class="settings-icon">⚙️ Paramètres</div>
  </div>
  <div :class="['main-content', collapse ? 'expanded' : '']" id="main-content">
    <router-view />
  </div>
</template>

<style scoped>
/* Sidebar */
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #2c3e50;
  color: white;
  padding: 5rem 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
}

/* Icône burger */
.burger-menu {
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  background-color: #34495e;
  border-radius: 5px;
  position: fixed;
  left: 10px;
  top: 10px;
  transition: left 0.3s ease-in-out;
}

/* Déplacer l’icône burger */
.sidebar.closed .burger-menu {
  left: 10px;
}

/* Zone centrale */
.main-content {
  margin-left: 260px; /* Décalage pour sidebar ouverte */
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
}

/* Sidebar fermée */
.sidebar.closed {
  left: -250px;
}

/* Ajustement de la zone centrale */
.sidebar.closed + .main-content {
  margin-left: 20px; /* Se réajuste quand la sidebar disparaît */
}

/* Icône de paramétrage */
.settings-icon {
    font-size: 18px;
    text-align: center;
    padding: 15px;
    background-color: #34495E;
    border-radius: 5px;
    cursor: pointer;
    bottom: 0;
    position: absolute;
    width: 80%;
}
</style>
